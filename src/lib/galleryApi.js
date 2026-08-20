import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
  supabase,
} from "./supabase";

function encodeStoragePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function storagePublicUrl(bucket, path) {
  if (!isSupabaseConfigured) return "";
  const { data } = supabase().storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || "";
}

function uploadFile({ file, bucket, path, onProgress }) {
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeStoragePath(path)}`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
    xhr.setRequestHeader("apikey", SUPABASE_ANON_KEY);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.setRequestHeader("x-upsert", "false");

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText || "{}"));
        } catch {
          resolve({});
        }
      } else {
        reject(new Error(`Subida fallida (HTTP ${xhr.status})`));
      }
    };

    xhr.onerror = () => reject(new Error("No se ha podido conectar con el almacén de fotos"));
    xhr.ontimeout = () => reject(new Error("La subida ha superado el tiempo de espera"));

    xhr.send(file);
  });
}

export function sanitizeFileName(name) {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const extMatch = name.match(/\.[a-zA-Z0-9]{1,5}$/);
  const ext = (extMatch && extMatch[0].toLowerCase()) || "";
  const core = base.toLowerCase().replace(/\.[a-zA-Z0-9]{1,5}$/, "");
  return `${core || "foto"}${ext || ".jpg"}`;
}

export async function uploadToGallery(config, file, onProgress) {
  if (!isSupabaseConfigured) {
    throw new Error("NOT_CONFIGURED");
  }

  const storagePath = `${config.folder || "uploads"}/${Date.now()}-${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

  await uploadFile({
    file,
    bucket: config.bucket,
    path: storagePath,
    onProgress,
  });

  const fileUrl = storagePublicUrl(config.bucket, storagePath);

  const payload = {
    file_name: file.name,
    file_path: storagePath,
    file_url: fileUrl,
    file_type: file.type || "application/octet-stream",
  };

  const { data, error } = await supabase()
    .from(config.table)
    .insert(payload)
    .select("id, file_name, file_url, file_type, created_at")
    .single();

  if (error) throw error;

  return data;
}

export async function listGalleryItems(config) {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase()
    .from(config.table)
    .select("id, file_name, file_url, file_type, created_at")
    .order("created_at", { ascending: false })
    .limit(config.maxItems || 120);

  if (error) throw error;

  return data || [];
}

export function subscribeToGalleryInserts(config, onInsert) {
  if (!isSupabaseConfigured) return () => {};

  const channel = supabase()
    .channel("gallery-live")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: config.table },
      (payload) => onInsert(payload.new),
    )
    .subscribe();

  return () => {
    supabase().removeChannel(channel);
  };
}
