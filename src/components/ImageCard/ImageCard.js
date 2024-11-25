import React from 'react';
import './ImageCard.css';

export default function ImageCard({ item, onClick }) {
  return (
    <div
      className="image-card"
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick(item);
      }}
      aria-label={`View details for ${item.title}`}
    >
      <img src={item.image} alt={item.title} className="card-image" loading="lazy" />
      <div className="overlay">
        <h3 className="card-title">{item.title}</h3>
      </div>
    </div>
  );
}