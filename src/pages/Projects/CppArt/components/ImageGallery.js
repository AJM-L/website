import React from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <div className="cpp-art-gallery">
      {images.map((image, index) => (
        <div key={index} className="cpp-art-gallery-item">
          <img 
            src={image.src} 
            alt={image.alt || ''} 
            className={`cpp-art-gallery-image ${image.className || ''}`}
          />
          <p className="cpp-art-gallery-caption">{image.caption}</p>
        </div>
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
  })).isRequired,
};

export default ImageGallery; 