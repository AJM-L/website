import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const VideoGallery = ({ videos }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const videoRefs = useRef({});

  const handleVideoError = (e, index) => {
    const video = e.target;
    console.error('Video loading error details:', {
      index,
      video: videos[index],
      error: {
        type: e.type,
        message: video.error ? video.error.message : 'Unknown error',
        code: video.error ? video.error.code : 'No error code',
        networkState: video.networkState,
        readyState: video.readyState,
        currentSrc: video.currentSrc,
        src: video.src,
        crossOrigin: video.crossOrigin,
      }
    });
    setLoadingStates(prev => ({
      ...prev,
      [index]: 'error'
    }));
  };

  const handleVideoLoad = (e, index) => {
    const video = e.target;
    console.log('Video loaded successfully:', {
      index,
      src: video.currentSrc,
      duration: video.duration,
      readyState: video.readyState,
      networkState: video.networkState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    });
    setLoadingStates(prev => ({
      ...prev,
      [index]: 'loaded'
    }));
  };

  useEffect(() => {
    // Reset loading states when videos change
    setLoadingStates({});
  }, [videos]);

  return (
    <div className="cpp-art-gallery">
      {videos.map((video, index) => {
        console.log('Rendering video:', { 
          video, 
          index, 
          loadingState: loadingStates[index],
          videoRef: videoRefs.current[index]
        });
        return (
          <div key={index} className="cpp-art-gallery-item">
            {loadingStates[index] === 'error' && (
              <div className="video-error">
                Failed to load video. Please check the console for details.
              </div>
            )}
            <video 
              ref={el => videoRefs.current[index] = el}
              className={`cpp-art-gallery-video ${video.className || ''}`}
              autoPlay
              loop
              muted
              playsInline
              controls
              onError={(e) => handleVideoError(e, index)}
              onLoadedData={(e) => handleVideoLoad(e, index)}
              preload="auto"
            >
              <source src={video.src} type={video.type} />
              Your browser does not support the video tag.
            </video>
            {video.caption && (
              <p className="cpp-art-gallery-caption">{video.caption}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    caption: PropTypes.string
  })).isRequired,
};

export default VideoGallery; 