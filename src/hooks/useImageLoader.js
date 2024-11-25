import { useState, useEffect } from 'react';

export const useImageLoader = (imageSrc) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      setLoading(false);
    };
    
    img.onerror = () => {
      setLoading(false);
      setError('Failed to load image');
    };
  }, [imageSrc]);

  return { loading, error };
}; 