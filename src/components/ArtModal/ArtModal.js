import React, { useEffect, useRef } from 'react';
import './ArtModal.css';

export default function Modal({ isOpen, onClose, project }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the modal when it opens
    modalRef.current.focus();

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Listen for escape key to close the modal
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const {
    title,
    date,
    dimensions,
    medium,
    shortDescription,
    longDescription,
    image1,
    image2,
    image3,
  } = project;

  return (
    <div
      className="art-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="art-modal-title"
    >
      <div
        className="art-modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
        ref={modalRef}
      >
        <button
          className="art-modal-close"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div className="art-art-modal-image-container">
          <img src={image1} alt={title} className="art-modal-image" />
          {image2 && image2.trim() !== "" && (
            <img src={image2} alt={`${title} alternate view`} className="art-modal-image" />
          )}
          {image3 && image3.trim() !== "" && (
            <img src={image3} alt={`${title} alternate view`} className="art-modal-image" />
          )}
        </div>
        <div className="modal-details">
          <h2 id="art-modal-title" className="art-modal-title">{title}</h2>
          {date && <p><strong>Date:</strong> {date}</p>}
          {dimensions && <p><strong>Dimensions:</strong> {dimensions}</p>}
          {medium && <p><strong>Medium:</strong> {medium}</p>}
          {shortDescription && <p><strong>Description:</strong> {shortDescription}</p>}
          {longDescription && <p>{longDescription}</p>}
        </div>
      </div>
    </div>
  );
}