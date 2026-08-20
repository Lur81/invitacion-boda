import { useEffect, useState } from "react";

import { isSupabaseConfigured } from "../lib/supabase";
import { listGalleryItems, subscribeToGalleryInserts } from "../lib/galleryApi";

function mergeItems(current, incoming) {
  const seen = new Set(current.map((item) => item.id));
  const fresh = incoming.filter((item) => item.id && !seen.has(item.id));
  return [...fresh, ...current];
}

export function useCollaborativeGallery(config) {
  const { bucket, table } = config;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured;

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    listGalleryItems({ bucket, table })
      .then((data) => {
        if (active) {
          setItems(data);
          setError("");
        }
      })
      .catch(() => {
        if (active) setError("load");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const unsubscribe = subscribeToGalleryInserts({ bucket, table }, (newItem) => {
      if (active) {
        setItems((current) => mergeItems(current, [newItem]));
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [configured, bucket, table]);

  function addItem(item) {
    if (!item || !item.id) return;
    setItems((current) => mergeItems(current, [item]));
  }

  return { items, loading, error, configured, addItem };
}