import { useRef, useState } from "react";

import { uploadToGallery } from "../lib/galleryApi";

function getVideoDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video.duration || 0);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    video.src = url;
  });
}

export function PhotoUploader({ config, onUploaded }) {
  const multipleRef = useRef(null);
  const cameraRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  async function validateFile(file) {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) return config.errors.fileType;

    const maxImageBytes = config.maxImageMb * 1024 * 1024;
    if (isImage && file.size > maxImageBytes) return config.errors.imageTooBig;

    const maxVideoBytes = config.maxVideoMb * 1024 * 1024;
    if (isVideo && file.size > maxVideoBytes) return config.errors.videoTooBig;

    if (isVideo && config.maxVideoSeconds > 0) {
      const duration = await getVideoDuration(file);
      if (duration > config.maxVideoSeconds) return config.errors.videoTooLong;
    }

    return "";
  }

  async function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setUploading(true);
    setStatus("");
    setMessage("");
    setProgress(0);

    let lastItem = null;
    let firstError = "";

    for (const file of files) {
      const validationMessage = await validateFile(file);
      if (validationMessage) {
        firstError = firstError || validationMessage;
        continue;
      }

      setFileName(file.name);

      try {
        const item = await uploadToGallery(config, file, (pct) => setProgress(pct));
        lastItem = item;
      } catch {
        firstError = firstError || config.errors.generic;
      }
    }

    setUploading(false);
    setProgress(0);
    setFileName("");

    if (lastItem && onUploaded) {
      onUploaded(lastItem);
      setStatus("ok");
      setMessage(config.successLabel);
    } else if (firstError) {
      setStatus("error");
      setMessage(firstError);
    }
  }

  function onPick(event) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  return (
    <div className="album__uploader">
      <div className="album__upload-actions">
        <button
          type="button"
          className="album__upload-button"
          disabled={uploading}
          onClick={() => multipleRef.current?.click()}
        >
          📷 {config.button}
        </button>

        <button
          type="button"
          className="album__upload-button album__camera-button"
          disabled={uploading}
          onClick={() => cameraRef.current?.click()}
        >
          📸 {config.cameraButton}
        </button>
      </div>

      <p className="album__hint">{config.hint}</p>

      <input
        ref={multipleRef}
        className="album__input"
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={onPick}
      />
      <input
        ref={cameraRef}
        className="album__input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onPick}
      />

      {uploading && (
        <div className="album__progress-wrap" role="status" aria-live="polite">
          <p className="album__progress-name">
            {config.uploadingLabel} — {fileName}
          </p>
          <div className="album__progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {status === "ok" && (
        <p className="album__status album__status--ok" role="status">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="album__status album__status--error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}