import React, { useEffect, useRef } from 'react';
import { getCategoryLabel } from '../data/photos.js';

export default function PhotoDetailModal({ photo, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!photo) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose]);

  if (!photo) {
    return null;
  }

  const tags = Array.isArray(photo.tags) ? photo.tags : [];

  return (
    <div
      className="photo-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="photo-modal__panel">
        <button
          ref={closeButtonRef}
          className="photo-modal__close"
          type="button"
          aria-label="关闭照片详情"
          onClick={onClose}
        >
          ×
        </button>

        <figure className="photo-modal__image-wrap">
          <img src={photo.src} alt={photo.alt || photo.title} />
        </figure>

        <aside className="photo-modal__info">
          <p className="eyebrow">{getCategoryLabel(photo.category)}</p>
          <h2 id="photo-modal-title">{photo.title}</h2>

          <dl className="photo-modal__meta">
            <div>
              <dt>地点</dt>
              <dd>{photo.location || '未知地点'}</dd>
            </div>
            <div>
              <dt>时间</dt>
              <dd>{photo.date || '未知时间'}</dd>
            </div>
            <div>
              <dt>相机</dt>
              <dd>{photo.camera || '未知相机'}</dd>
            </div>
            <div>
              <dt>镜头</dt>
              <dd>{photo.lens || '未知镜头'}</dd>
            </div>
          </dl>

          {photo.description && (
            <p className="photo-modal__description">{photo.description}</p>
          )}

          {tags.length > 0 && (
            <div className="photo-modal__tags" aria-label={`${photo.title} 标签`}>
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
