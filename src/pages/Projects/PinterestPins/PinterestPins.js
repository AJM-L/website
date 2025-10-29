import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import './PinterestPins.css';

export default function PinterestPins() {
    const [ajImages, setAjImages] = useState([]);
    const [maryImages, setMaryImages] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Import all images from both folders
        const importAllImages = (r) => r.keys().map(r);
        
        // Import AJ's images
        const ajContext = require.context(
            './AJPinterest_synthetic_images',
            false,
            /\.(png|jpe?g|svg)$/
        );
        setAjImages(importAllImages(ajContext));

        // Import Mary's images
        const maryContext = require.context(
            './MaryPinterest_synthetic_images',
            false,
            /\.(png|jpe?g|svg)$/
        );
        setMaryImages(importAllImages(maryContext));
    }, []);

    const breakpointColumns = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div className="pinterest-container">
            <div className="project-description">
                <h1>AI-Generated Pinterest Art</h1>
                
                <div className="intro-section">
                    <p>
                        What happens when AI attempts to replicate your Pinterest aesthetic? 
                        This project explores the intersection of personal data, machine learning, 
                        and artistic expression through AI-generated images based on Pinterest profiles.
                    </p>
                </div>

                <div className="methodology-section">
                    <h3>Data Collection <span className="tech-badge">Web Scraping</span></h3>
                    <p>
                        To reclaim some ownership over my digital footprint, I developed a custom 
                        web scraping tool that gathered approximately 1,000 pins (~115 MB of image data) 
                        from my personal Pinterest boards. An anonymous friend generously contributed 
                        their profile data for comparison.
                    </p>

                    <h3>Technical Implementation <span className="tech-badge">DCGAN</span> <span className="tech-badge">PyTorch</span></h3>
                    <p>
                        The heart of this project is a Deep Convolutional Generative Adversarial Network (DCGAN) 
                        built with PyTorch. This specialized neural network architecture uses two large competing 
                        networks made of convolutional layers to generate realistic synthetic images.
                    </p>

                    <div className="technical-details">
                        <button 
                            className="details-toggle"
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? "Hide technical details" : "Show technical details"}
                        </button>
                        {showDetails && (
                            <p>
                                DCGANs utilize convolutional layers for enhanced image processing capabilities. 
                                The network was trained for 100-150 epochs, during which it learned to generate 
                                images that capture the essence of the original Pinterest boards while creating 
                                entirely new, synthetic artwork. I used the Adam optimizer for both networks with a 
                                learning rate of 0.0005, and used Binary Cross-Entropy Loss (BCELoss) to measure 
                                the performance of both the generator and discriminator. For the generator, I used 
                                ReLU activations to improve efficiency since the generator is more computationally expensive. 
                                For the discriminator, I used LeakyReLU activations to avoid the vanishing gradient problem and a sigmoid function for the output layer. 
                                Batch Normalization was used to stabilize training and improve convergence. 
                                The model was trained on my macbook pro's GPU over the course of a few hours. 
                                PS thanks for clicking into the technical details, I'm not sure why you're here but I'm glad you are. 
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="gallery-section">
                <h2>My Generated Images</h2>
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {ajImages.map((image, index) => (
                        <div className="image-item" key={index}>
                            <img src={image} alt={`Generated image ${index + 1}`} />
                        </div>
                    ))}
                </Masonry>

                <h2>Friend's Generated Images</h2>
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {maryImages.map((image, index) => (
                        <div className="image-item" key={index}>
                            <img src={image} alt={`Generated image ${index + 1}`} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}