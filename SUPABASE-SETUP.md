# Configuración de Supabase para el álbum colaborativo

La web guarda las fotos de los invitados en **Supabase Storage** y la lista de
archivos en una **tabla** de Postgres. Todo el código ya está preparado
(`src/lib/supabase.js` y `src/lib/galleryApi.js`); aquí tienes exactamente lo
que hay que crear en tu proyecto de Supabase.

> Si algún paso ya existe o tienes nombres personalizados, ajusta los mismos
> valores en `wedding.js` → `album.bucket` / `album.table`.

---

## 1. Variables de entorno

Copia `.env.example` a `.env` (y a las variables de entorno de Vercel):

| Variable | Descripción |
| --- | --- |
| `VITE_SITE_URL` | Dominio público de la boda (se usa para los QR de `/fotos`). |
| `VITE_SUPABASE_URL` | URL del proyecto: `https://TU-PROYECTO.supabase.co`. |
| `VITE_SUPABASE_ANON_KEY` | Clave **anon** pública (Dashboard → Settings → API). |

La **anon key es pública** por diseño: es la que usan los invitados para subir.
Los permisos reales se controlan con las políticas RLS de abajo, nunca con la clave.

---

## 2. Bucket de Storage

Crea un bucket **público** llamado `wedding-gallery`.

Desde el SQL Editor (más reproducible):

```sql
insert into storage.buckets (id, name, public)
values ('wedding-gallery', 'wedding-gallery', true)
on conflict (id) do nothing;
```

`public=true` permite que las fotos se sirvan por URL directa (más rápido y
aprovecha la CDN). Los nombres de archivo se generan con `fecha + uuid`, por lo
que no hay colisiones entre invitados.

---

## 3. Tabla `wedding_gallery`

```sql
create table if not exists public.wedding_gallery (
  id          uuid primary key default gen_random_uuid(),
  file_name   text not null,
  file_url    text not null,
  file_type   text not null default 'image/jpeg',
  file_path   text not null,
  created_at  timestamptz not null default now()
);
```

- `file_name` → nombre original del archivo (para el `alt`/UX).
- `file_url` → URL pública final (la usa la galería, ordenadas por `created_at desc`).
- `file_path` → ruta interna en el bucket (para borrar/supervisar desde el panel
  con la clave `service_role`, nunca expuesta en el cliente).

---

## 4. RLS: permitir subir, impedir borrar

Cualquiera puede **leer y subir** (sin cuenta), pero **nadie puede
modificar/borrar** desde el cliente:

```sql
alter table public.wedding_gallery enable row level security;

create policy "wedding_gallery_select"
  on public.wedding_gallery for select
  using (true);

create policy "wedding_gallery_insert"
  on public.wedding_gallery for insert
  with check (true);

-- NO crear políticas de update ni delete:
-- los invitados solo pueden insertar filas.
```

Almacenamiento (bucket):

```sql
create policy "wedding_storage_insert"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'wedding-gallery');

-- Para `public`: no hace falta política de select.
-- ¡No crear políticas de update/delete para anon!
```

Con esto un invitado puede subir fotos con la anon key pero no listar, borrar
ni sobrescribir archivos ajenos.

---

## 5. Realtime (opcional pero recomendado)

Para que la galería se actualice sola cuando alguien sube una foto:

```sql
alter publication supabase_realtime add table public.wedding_gallery;
```

O en el panel: *Table Editor → wedding_gallery → ⚡ Toggle "Realtime"*.

Si no lo activas, la web sigue funcionando: la foto recién subida aparece al
instante igualmente (se inserta en la galería local tras la subida).

---

## 6. Revisar tras el deploy

1. `npm run dev` y comprobar la sección **"Nuestro álbum"** en la web.
2. Subir una foto → debe aparecer la barra de progreso y el ✔ de confirmación.
3. La foto debe verse en la galería y abrirse en grande al pulsarla.
4. Probar la ruta `/fotos` (en local: `http://localhost:5173/fotos`; en
   Vercel: `https://tudominio.com/fotos`).
5. Una vez fijado el dominio, ejecutar `npm run qr` y comprobar los QR.

---

## Límites configurados (editable en `wedding.js` → `album`)

| Parámetro | Valor por defecto |
| --- | --- |
| Imagen | máx. 20 MB, formatos `image/*` |
| Vídeo | máx. 50 MB y 60 s, formatos `video/*` |

La validación es en el cliente (rápida y cómoda para el invitado). Si quieres
blindar más, en el panel de Supabase puedes añadir un límite de tamaño por
archivo en el bucket (Storage → Settings).