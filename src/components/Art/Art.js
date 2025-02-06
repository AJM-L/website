import React, { useState, useEffect } from 'react';
import './Art.css';
import artData from '../../ArtData';
import ArtModal from '../ArtModal/ArtModal';
import useRowLayout from '../../hooks/useRowLayout';
import '../../styles/SharedGridStyles.css';

export default function Art() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [processedArt, setProcessedArt] = useState([]);

  useEffect(() => {
    Promise.all(
      artData.map(art => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = art.image1;
        img.onload = () => resolve({
          ...art,
          image: art.image1,
          width: img.width,
          height: img.height
        });
        img.onerror = () => reject(`Failed to load image: ${art.image1}`);
      }))
    )
    .then(setProcessedArt)
    .catch(error => {
      console.error(error);
      // Optionally, set an error state to inform the user
    });
  }, []);

  const { rows, containerWidth } = useRowLayout(processedArt);

  const openModal = (art) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArt(null);
    setIsModalOpen(false);
  };

  return (
    <section className="art-section">
      <h1 className="section-title">Art</h1>
      <div className="art-container dynamic-width">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="art-row"
            style={{ 
              height: `${row.height}px`,
              gap: '20px',
              marginBottom: '20px'
            }}
          >
            {row.images.map((art) => (
              <div
                key={art.id}
                className="art-item"
                style={{
                  width: `${art.width}px`,
                  height: '100%'
                }}
                onClick={() => openModal(art)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { 
                  if (e.key === 'Enter' || e.key === ' ') openModal(art); 
                }}
              >
                <img 
                  src={art.image}
                  alt={art.title}
                  className="art-image"
                  loading="lazy"
                />
                <div className="art-overlay">
                  <h3 className="art-title">{art.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ArtModal isOpen={isModalOpen} onClose={closeModal} project={selectedArt} />
    </section>
  );
}