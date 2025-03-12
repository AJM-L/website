import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevious();
    }
  };

  useEffect(() => {
    let slideInterval;
    if (isPlaying) {
      slideInterval = setInterval(() => {
        goToNext();
      }, 3000);
    }

    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [isPlaying, currentIndex]);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderMediaItem = (item, index) => {
    if (item.type && item.type.startsWith('video/')) {
      return (
        <video
          className="carousel-video"
          src={item.src}
          alt={item.alt || `Slide ${index}`}
          autoPlay={index === currentIndex}
          loop
          muted
          playsInline
          controls
        >
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
          className="carousel-image"
          src={item.src}
          alt={item.alt || `Slide ${index}`}
        />
      );
    }
  };

  return (
    <div 
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-wrapper">
        <button className="left-arrow" onClick={goToPrevious}>
          &lt;
        </button>
        <div className="carousel-content-wrapper">
          <div className="carousel-content">
            {renderMediaItem(items[currentIndex], currentIndex)}
          </div>
        </div>
        <button className="right-arrow" onClick={goToNext}>
          &gt;
        </button>
      </div>
      
      <div className="carousel-controls">
        <button 
          className={`autoplay-button ${isPlaying ? 'playing' : ''}`} 
          onClick={toggleAutoPlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className="carousel-dots">
          {items.map((_, slideIndex) => (
            <div
              key={slideIndex}
              className={`carousel-dot ${slideIndex === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(slideIndex)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel; 