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
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
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
        }
    }, [isOpen]);

    // Prevent body from scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    const {
        title,
        date,
        shortDescription,
        longDescription,
        image,
        techStack,
        githubLink,
        pageLink
    } = project;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                tabIndex="-1"
                ref={modalRef}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    &times;
                </button>
                <div className="modal-image-container">
                    <img src={image} alt={`${title} Screenshot`} className="modal-image" />
                </div>
                <div className="modal-details">
                    <h2 id="modal-title" className="modal-title">{title}</h2>
                    {date && <p><strong>Date:</strong> {date}</p>}
                    {shortDescription && <p><strong>Description:</strong> {shortDescription}</p>}
                    {longDescription && (
                        <div>
                            {longDescription.map((para) => (
                                <p key={para.id}>{para.para}</p>
                            ))}
                        </div>
                    )}
                </div>
                {techStack && (
                    <div className="modal-tech-stack">
                        {techStack.map((tech, index) => (
                            <img 
                                className="modal-tech-icon" 
                                src={tech} 
                                alt={`Technology ${index + 1}`} 
                                key={index}
                                loading="lazy"
                            />
                        ))}
                    </div>
                )}
                {pageLink && (
                    <a href={pageLink} target="_blank" rel="noopener noreferrer" className="modal-github-link">
                        More info
                    </a>
                ) ||
                githubLink && (
                    <a href={githubLink} target="_blank" rel="noopener noreferrer" className="modal-github-link">
                        More info
                    </a>
                ) 
                }

            </div>
        </div>
    );
}; 