import React, { useEffect, useRef } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, project }) {
    const modalRef = useRef(null);

    // Handle closing the modal when the Escape key is pressed
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Handle focus trapping
    useEffect(() => {
        if (isOpen) {
            const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTab = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            window.addEventListener('keydown', handleTab);
            firstElement.focus();

            return () => {
                window.removeEventListener('keydown', handleTab);
            };
        }
    }, [isOpen]);

    if (!isOpen || !project) return null;

    return (
        <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
            <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalRef}>
                <button className="modal-close" onClick={onClose} aria-label="Close Modal">&times;</button>
                <h2 className="modal-title">{project.title}</h2>
                <img src={project.image} alt={`${project.title} Screenshot`} className="modal-image" />
                <p className="modal-short-description">{project.shortDescription}</p>
                <div className="modal-long-description">
                    {project.longDescripton.map((para) => (
                        <p key={para.id}>{para.para}</p>
                    ))}
                </div>
                <div className="modal-tech-stack">
                    {project.techStack.map((tech, index) => (
                        <img 
                            className="modal-tech-icon" 
                            src={tech} 
                            alt={`Technology ${index + 1}`} 
                            key={index}
                            loading="lazy"
                        />
                    ))}
                </div>
                {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="modal-github-link">
                        More info
                    </a>
                )}
            </div>
        </div>
    );
}; 