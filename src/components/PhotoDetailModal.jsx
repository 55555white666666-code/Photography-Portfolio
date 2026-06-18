import React, { useEffect, useRef } from 'react';
import { getCategoryLabel, getPhotoAltText } from '../data/photos.js';

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

    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    closeButtonRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
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
          <img src={photo.src} alt={getPhotoAltText(photo)} />
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
