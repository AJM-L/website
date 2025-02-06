import { useState, useEffect } from 'react';

export default function useGridDimensions() {
  const [dimensions, setDimensions] = useState({
    columns: 3,
    rowHeight: 300,
    containerWidth: 0
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth;
      let columns;
      let rowHeight;

      // Calculate number of columns based on screen width
      if (width < 725) {
        columns = 2;
        rowHeight = width * 0.9; // 80% of screen width on mobile
      } else if (width < 1200) {
        columns = 2;
        rowHeight = (width * 0.9) / 2.5; // Adjust for 2 columns with gap
      } else {
        columns = 3;
        rowHeight = (width * 0.9) / 3.5; // Adjust for 3 columns with gap
      }

      setDimensions({
        columns,
        rowHeight,
        containerWidth: width
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return dimensions;
} 