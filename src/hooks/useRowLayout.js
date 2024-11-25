import { useState, useEffect } from 'react';

const TARGET_HEIGHT = 500;
const CONTAINER_WIDTH_PERCENT = 0.8; // 80% of screen width
const MIN_IMAGES_PER_ROW = 1;
const MAX_IMAGES_PER_ROW = 4;
const GAP = 20; // Gap between images in pixels

export default function useRowLayout(images) {
  const [rows, setRows] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const calculateLayout = () => {
      const screenWidth = window.innerWidth;
      const availableWidth = screenWidth * CONTAINER_WIDTH_PERCENT;
      setContainerWidth(availableWidth);

      if (!images?.length) return [];

      const processedImages = images.map(img => ({
        ...img,
        aspectRatio: img.width / img.height
      }));

      const rows = [];
      let currentRow = [];
      let currentRowAspectRatioSum = 0;

      processedImages.forEach((image) => {
        currentRow.push(image);
        currentRowAspectRatioSum += image.aspectRatio;

        // Calculate current row height if we were to fit it to available width
        const potentialHeight = (availableWidth - (GAP * (currentRow.length - 1))) 
          / currentRowAspectRatioSum;

        // Check if adding another image would make the row too short
        if (potentialHeight < TARGET_HEIGHT || 
            currentRow.length === MAX_IMAGES_PER_ROW) {
          // Complete the row
          const rowHeight = (availableWidth - (GAP * (currentRow.length - 1))) 
            / currentRowAspectRatioSum;

          const rowImages = currentRow.map(img => ({
            ...img,
            width: img.aspectRatio * rowHeight,
            height: rowHeight
          }));

          rows.push({
            images: rowImages,
            height: rowHeight
          });

          // Reset for next row
          currentRow = [];
          currentRowAspectRatioSum = 0;
        }
      });

      // Handle any remaining images
      if (currentRow.length > 0) {
        const rowHeight = (availableWidth - (GAP * (currentRow.length - 1))) 
          / currentRowAspectRatioSum;

        const rowImages = currentRow.map(img => ({
          ...img,
          width: img.aspectRatio * rowHeight,
          height: rowHeight
        }));

        rows.push({
          images: rowImages,
          height: rowHeight
        });
      }

      setRows(rows);
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [images]);

  return { rows, containerWidth };
} 