import { wedding } from "../data/wedding";

import { useCollaborativeGallery } from "../hooks/useCollaborativeGallery";
import { PhotoUploader } from "../components/PhotoUploader";
import { CollabGallery } from "../components/CollabGallery";

function AlbumContent() {
  const { album } = wedding;
  const { items, loading, error, configured, addItem } = useCollaborativeGallery({
    bucket: album.bucket,
    table: album.table,
  });

  return (
    <section className="section album" id="album">
      <div className="section__inner">
        <header className="section__header">
          <p className="section__eyebrow">{album.eyebrow}</p>
          <h2 className="section__title">{album.title}</h2>
          <span className="section__divider" aria-hidden="true" />
        </header>

        <p className="album__intro">{album.intro}</p>

        {configured ? (
          <>
            <PhotoUploader config={album} onUploaded={addItem} />

            {loading && <p className="album__load-status">{album.loadingLabel}</p>}

            {!loading && error && (
              <p className="album__load-status album__load-status--error">
                {album.loadError}
              </p>
            )}

            {!loading && !error && items.length === 0 && (
              <p className="album__empty">{album.emptyMessage}</p>
            )}

            {!loading && items.length > 0 && <CollabGallery items={items} labels={album.labels} />}
          </>
        ) : (
          <p className="album__unconfigured">{album.unconfiguredMessage}</p>
        )}

        <div className="album__cta">
          <p className="album__cta-eyebrow">{album.cta.eyebrow}</p>
          <h3 className="album__cta-title">{album.cta.title}</h3>
          <p className="album__cta-text">{album.cta.text}</p>
          <a className="album__cta-button" href="/fotos">
            {album.cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Album() {
  const { album, modules } = wedding;

  if (!modules.album || !album) return null;

  return <AlbumContent />;
}