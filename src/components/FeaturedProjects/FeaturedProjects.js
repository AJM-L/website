import React, { useState, useEffect } from 'react';
import './FeaturedProjects.css';
import projectData from '../../ProjectData';
import Modal from '../Modal/Modal';
import useRowLayout from '../../hooks/useRowLayout';
import '../../styles/SharedGridStyles.css';

const MAX_HEIGHT_THRESHOLD = window.innerHeight; // Maximum desired height in pixels
const MIN_FEATURED_LENGTH = 3; // Minimum number of featured projects
const MAX_FEATURED_LENGTH = 8; // Maximum number of featured projects
const TARGET_HEIGHT = 300; // Ideal row height in pixels
const HEIGHT_TOLERANCE = 50; // Acceptable deviation from target height

export default function FeaturedProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [processedProjects, setProcessedProjects] = useState([]);
  const [featuredLength, setFeaturedLength] = useState(6); // Default value

  // Calculate optimal featured length based on image dimensions
  useEffect(() => {
    const calculateOptimalLength = async () => {
      // Process all potential featured projects first
      const processedData = await Promise.all(
        projectData.slice(0, MAX_FEATURED_LENGTH).map(project => 
          new Promise(resolve => {
            const img = new Image();
            img.src = project.image;
            img.onload = () => resolve({
              ...project,
              width: img.width,
              height: img.height,
              aspectRatio: img.width / img.height
            });
          })
        )
      );

      // Calculate container width (80% of screen width)
      const screenWidth = window.innerWidth;
      const containerWidth = screenWidth * 0.8;
      const gap = 20; // Gap between images

      let optimalLength = MIN_FEATURED_LENGTH;
      let minMSE = Infinity;

      // Try different lengths to find optimal one
      for (let i = MIN_FEATURED_LENGTH; i <= MAX_FEATURED_LENGTH; i++) {
        const currentProjects = processedData.slice(0, i);
        let totalAspectRatio = 0;
        let currentRow = [];
        let rowHeights = [];

        // Calculate heights for each row
        currentProjects.forEach(project => {
          currentRow.push(project);
          totalAspectRatio += project.aspectRatio;

          const rowWidth = containerWidth - (gap * (currentRow.length - 1));
          const rowHeight = rowWidth / totalAspectRatio;

          if (rowHeight < MAX_HEIGHT_THRESHOLD) {
            rowHeights.push(rowHeight);
            currentRow = [];
            totalAspectRatio = 0;
          }
        });

        // Handle last row
        if (currentRow.length > 0) {
          const rowWidth = containerWidth - (gap * (currentRow.length - 1));
          const rowHeight = rowWidth / totalAspectRatio;
          rowHeights.push(rowHeight);
        }

        // Calculate mean squared error
        const mse = rowHeights.reduce((sum, height) => {
          const error = height - TARGET_HEIGHT;
          return sum + (error * error);
        }, 0) / rowHeights.length;

        // Update optimal length if this configuration is better
        if (mse < minMSE && 
            rowHeights.every(height => height >= TARGET_HEIGHT - HEIGHT_TOLERANCE)) {
          minMSE = mse;
          optimalLength = i;
        }

        // If we've found a very good fit, we can stop
        if (minMSE < (HEIGHT_TOLERANCE * HEIGHT_TOLERANCE)) {
          break;
        }
      }

      setFeaturedLength(optimalLength);
      setProcessedProjects(processedData.slice(0, optimalLength));
    };

    calculateOptimalLength();
    
    // Recalculate on window resize
    const handleResize = () => {
      calculateOptimalLength();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { rows, containerWidth } = useRowLayout(processedProjects);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="featured-projects-section">
      <h2 className="section-title">Featured Projects</h2>
      <div 
        className="projects-container"
        style={{ width: `${containerWidth}px`, margin: '0 auto' }}
      >
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="projects-row"
            style={{ 
              height: `${row.height}px`,
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            {row.images.map((project) => (
              <div
                key={project.id}
                className="project-item"
                style={{
                  width: `${project.width}px`,
                  height: '100%'
                }}
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') openModal(project); }}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <h3 className="project-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
    </section>
  );
}