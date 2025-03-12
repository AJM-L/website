import React from 'react';
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import { motion } from 'framer-motion';
import './SWE.css';

export default function SWE() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="swe-container">
            <motion.header 
                className="swe-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Software Engineering</h1>
                <p className="header-subtitle">
                    Full-stack Development • Machine Learning • UI/UX Design
                </p>
            </motion.header>

            <div className="swe-content">
                <motion.section 
                    className="summary-section"
                    {...fadeIn}
                    transition={{ delay: 0.2 }}
                >
                    <h2>Professional Summary</h2>
                    <p>
                        Full-stack software engineer with expertise in AI/ML systems and user-centric design. 
                        Combining technical precision with creative problem-solving to build elegant, 
                        practical solutions. Background in mathematics and philosophy informing a unique 
                        approach to software architecture and system design.
                    </p>
                </motion.section>

                <motion.section 
                    className="expertise-section"
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                >
                    <h2>Core Expertise</h2>
                    <div className="expertise-grid">
                        <div className="expertise-card">
                            <h3>Full-Stack Development</h3>
                            <ul>
                                <li>React/JavaScript</li>
                                <li>Python/Flask</li>
                                <li>API Integration</li>
                                <li>Cloud Architecture</li>
                            </ul>
                        </div>
                        <div className="expertise-card">
                            <h3>Machine Learning</h3>
                            <ul>
                                <li>PyTorch</li>
                                <li>Neural Networks</li>
                                <li>Computer Vision</li>
                                <li>Natural Language Processing</li>
                            </ul>
                        </div>
                        <div className="expertise-card">
                            <h3>Product Development</h3>
                            <ul>
                                <li>UI/UX Design</li>
                                <li>System Architecture</li>
                                <li>Technical Strategy</li>
                                <li>Project Management</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>
                <div className="featured-projects-container">
                    <FeaturedProjects />
                </div>
            </div>
        </div>
    );
}
