import React, { useState, useEffect } from 'react';
import './AspectRatioBox.css';

export default function AspectRatioBox({ image, title, onClick, rowHeight, maxWidth }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, ratio: 1 });

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height,
        ratio: img.height / img.width
      });
    };
  }, [image]);

  const calculatedWidth = dimensions.ratio 
    ? Math.min(rowHeight / dimensions.ratio, maxWidth || Infinity)
    : '100%';

  return (
    <div 
      className="aspect-ratio-box"
      style={{
        height: `${rowHeight}px`,
        width: calculatedWidth,
        maxWidth: '100%'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <div className="aspect-ratio-box-inside">
        <img 
          src={image} 
          alt={title} 
          className="responsive-image"
          loading="lazy"
        />
        <div className="image-overlay">
          <h3 className="image-title">{title}</h3>
        </div>
      </div>
    </div>
  );
} 