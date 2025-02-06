import React, { useState, useEffect } from 'react';
import './Projects.css';
import projectData from '../../ProjectData';
import Modal from '../Modal/Modal';
import useRowLayout from '../../hooks/useRowLayout';
import '../../styles/SharedGridStyles.css';

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [processedProjects, setProcessedProjects] = useState([]);

  // Process images to get dimensions
  useEffect(() => {
    Promise.all(
      projectData.map(project => new Promise((resolve) => {
        const img = new Image();
        img.src = project.image;
        img.onload = () => resolve({
          ...project,
          width: img.width,
          height: img.height
        });
        img.onerror = () => resolve(project); // Handle image load errors gracefully
      }))
    ).then(setProcessedProjects);
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
    <section className="projects-section">
      <h1 className="section-title">Projects</h1>
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
                  loading="lazy" // Improve performance with lazy loading
                />
                <div className="project-overlay"
                style={{
                  width: `${project.width}px`,
                  height: '100%'
                }}>
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