import React from 'react';
import { getCategoryLabel } from '../data/photos.js';

export default function FeaturedMosaic({ photos }) {
  return (
    <div className="featured-mosaic">
      {photos.map((photo, index) => (
        <article
          className={`mosaic-card mosaic-card--${index + 1}`}
          data-orientation={photo.orientation}
          key={photo.id}
        >
          <img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} />
          <div className="mosaic-card__meta">
            <p>{getCategoryLabel(photo.category)}</p>
            <h3>{photo.title}</h3>
            <span>
              {photo.location} / {photo.date}
            </span>
            <small>
              {photo.camera} · {photo.lens}
            </small>
          </div>
        </article>
      ))}
    </div>
  );
}
