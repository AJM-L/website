import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './DropdownMenu.css';

// Default physics constants for animation
const DEFAULT_PHYSICS = {
  damping: 15,
  mass: 1.2,
  stiffness: 150,
  bounce: 0.25
};

// MenuItem component for individual navigation options
const MenuItem = ({ item, onClose, index, total }) => {
  // Calculate staggered delay based on index
  const delay = 0.07 * index;
  const exitDelay = 0.04 * (total - index - 1);
  
  // Random values for subtle variation in animations if no custom animation is provided
  const randomX = React.useMemo(() => Math.random() * 40 - 20, []);
  const randomBounce = React.useMemo(() => 0.2 + Math.random() * 0.2, []);
  
  // Determine if we should use custom animation or default
  const hasCustomAnimation = item.animation !== undefined;

  // Save initial random tilt
  const randomTilt = React.useMemo(() => Math.random() * 40 - 20, []);
  
  // Responsive sizing for menu items based on screen width
  const [dimensions, setDimensions] = useState({ width: '180px', height: '90px' });

  // Update dimensions when window size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width > 1200) {
        setDimensions({ width: '180px', height: '90px' });
      } else if (width > 992) {
        setDimensions({ width: '160px', height: '80px' });
      } else if (width > 768) {
        setDimensions({ width: '140px', height: '70px' });
      } else if (width > 480) {
        setDimensions({ width: '120px', height: '60px' });
      } else if (width > 360) {
        setDimensions({ width: '100px', height: '50px' });
      } else {
        setDimensions({ width: '80px', height: '40px' });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set up initial animation properties
  const initialProps = hasCustomAnimation 
    ? { ...item.animation.initial, opacity: 0, scale: 0.8 }
    : { y: -100, x: randomX, opacity: 0, scale: 0.8 };
    
  // Set up animate properties
  const animateProps = hasCustomAnimation
    ? { 
        ...item.animation.animate, 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: DEFAULT_PHYSICS.stiffness,
          damping: DEFAULT_PHYSICS.damping,
          mass: item.animation.transition?.mass || DEFAULT_PHYSICS.mass,
          delay: delay,
        }
      }
    : { 
        y: 0, 
        x: 0, 
        opacity: 1, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: DEFAULT_PHYSICS.stiffness,
          damping: DEFAULT_PHYSICS.damping,
          mass: DEFAULT_PHYSICS.mass,
          delay: delay,
        }
      };
      
  // Set up exit properties
  const exitProps = hasCustomAnimation
    ? {
        ...item.animation.exit,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: item.animation.transition?.mass || 1.8,
          bounce: item.animation.transition?.bounce || randomBounce,
          delay: exitDelay
        }
      }
    : { 
        y: window.innerHeight + 100,
        rotate: randomX / 10,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 1.8,
          bounce: randomBounce,
          delay: exitDelay
        }
      };
  
  return (
    <motion.div
      className="menu-item-wrapper"
      initial={initialProps}
      animate={animateProps}
      exit={exitProps}
      whileHover={{ 
        scale: 1.1,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 10 
        }
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: item.animation?.size?.width || dimensions.width,
        height: item.animation?.size?.height || dimensions.height,
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: animateProps.x,
        y: animateProps.y,
        rotate: animateProps.rotate,
        transformOrigin: 'center center',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Link 
        to={item.path} 
        className="menu-item" 
        onClick={onClose}
        aria-label={`Navigate to ${item.name}`}
      >
        {item.name}
      </Link>
    </motion.div>
  );
};

// Main DropdownContainer component
const DropdownMenu = ({ isOpen, onClose, navigationLinks }) => {
  // Adjust circle radius based on screen size
  const [circleRadius, setCircleRadius] = useState(230);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const minDimension = Math.min(width, height);
      
      // Adjust radius based on screen dimensions to prevent overflow
      // Make sure there's enough space for buttons plus padding
      if (width < 576) {
        setCircleRadius(Math.min(minDimension * 0.25, 150));
      } else if (width < 768) {
        setCircleRadius(Math.min(minDimension * 0.3, 180));
      } else if (width < 992) {
        setCircleRadius(Math.min(minDimension * 0.35, 200));
      } else {
        setCircleRadius(Math.min(minDimension * 0.4, 230));
      }
    };
    
    // Set initial radius
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`dropdown-container ${isOpen ? 'open' : ''}`}>
          {/* Backdrop with fade animation */}
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Container for menu items */}
          <motion.div 
            className="menu-items-container"
          >
            {navigationLinks.map((item, index) => (
              <MenuItem 
                key={item.name}
                item={item}
                onClose={onClose}
                index={index}
                total={navigationLinks.length}
              />
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu; 