import React from 'react';
import { getCategoryLabel, getPhotoAltText } from '../data/photos.js';

export default function PhotoGrid({ photos, onPhotoSelect }) {
  if (photos.length === 0) {
    return (
      <div className="photo-grid__empty">
        这个分类暂时没有显示中的作品。可以在 photos.js 中把想展示的照片改为 visible: true。
      </div>
    );
  }

  return (
    <div className="photo-grid">
      {photos.map((photo) => {
        const tags = Array.isArray(photo.tags) ? photo.tags : [];

        return (
          <article
            className="photo-card"
            data-featured={photo.featured}
            data-orientation={photo.orientation}
            key={photo.id}
            tabIndex="0"
            onClick={() => onPhotoSelect(photo)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onPhotoSelect(photo);
              }
            }}
          >
            <img src={photo.src} alt={getPhotoAltText(photo)} loading="lazy" />
            <div className="photo-card__overlay">
              <p>{getCategoryLabel(photo.category)}</p>
              <h3>{photo.title}</h3>
              <span>
                {photo.location || '未知地点'} / {photo.date || '未知时间'}
              </span>
              {(photo.camera || photo.lens) && (
                <small>
                  {photo.camera || '未知相机'} / {photo.lens || '未知镜头'}
                </small>
              )}
              {photo.description && <em>{photo.description}</em>}
              {tags.length > 0 && (
                <div className="photo-tags" aria-label={`${photo.title} 标签`}>
                  {tags.map((tag) => (
                    <b key={tag}>{tag}</b>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
