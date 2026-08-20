import { useEffect } from "react";

import { wedding } from "../data/wedding";

import { useCollaborativeGallery } from "../hooks/useCollaborativeGallery";
import { PhotoUploader } from "../components/PhotoUploader";
import { CollabGallery } from "../components/CollabGallery";

export default function Fotos() {
  const { album } = wedding;
  const { fotos } = album;
  const { couple, languages } = wedding;
  const { items, loading, error, configured, addItem } = useCollaborativeGallery({
    bucket: album.bucket,
    table: album.table,
  });

  useEffect(() => {
    document.title = `${fotos.title} — ${couple.bride} & ${couple.groom}`;
    document.documentElement.lang = languages[0];
  }, [fotos.title, couple.bride, couple.groom, languages]);

  if (!album) return null;

  return (
    <main className="fotos">
      <section className="fotos__hero">
        <p className="fotos__kicker">{album.fotos.kicker}</p>
        <h1 className="fotos__title">{album.fotos.title}</h1>
        <span className="section__divider" aria-hidden="true" />
        <p className="fotos__intro">{album.fotos.intro}</p>

        {configured ? (
          <PhotoUploader config={album} onUploaded={addItem} />
        ) : (
          <p className="album__unconfigured">{album.unconfiguredMessage}</p>
        )}
      </section>

      <section className="fotos__gallery">
        {loading && <p className="album__load-status">{album.loadingLabel}</p>}

        {!loading && error && (
          <p className="album__load-status album__load-status--error">{album.loadError}</p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="album__empty">{album.emptyMessage}</p>
        )}

        {!loading && items.length > 0 && <CollabGallery items={items} labels={album.labels} />}
      </section>

      <a className="fotos__back" href="/">
        ← {album.fotos.backLabel}
      </a>
    </main>
  );
}