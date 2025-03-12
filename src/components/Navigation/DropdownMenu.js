import React from 'react';
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
        scale: 1.03,
        transition: { 
          type: 'spring', 
          stiffness: 400, 
          damping: 10 
        }
      }}
      whileTap={{ scale: 0.97 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 5 }}
      dragElastic={0.05}
    >
      <Link 
        to={item.path} 
        className="menu-item" 
        onClick={onClose}
        aria-label={`Navigate to ${item.name}`}
        style={{ width: item.animation?.size?.width || '100%', height: item.animation?.size?.height || '100%' }}
      >
        {item.name}
      </Link>
    </motion.div>
  );
};

// Main DropdownContainer component
const DropdownMenu = ({ isOpen, onClose, navigationLinks }) => {
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
            style={{
              width: '100%',
              height: '100%'
            }}
          />
          
          {/* Container for menu items */}
          <motion.div 
            className="menu-items-container"
            style={{ 
              width: '100%',
              height: '100%'
            }}
          >
            {navigationLinks.map((item, index) => (
              <MenuItem 
                key={item.name}
                item={item}
                onClose={onClose}
                index={index}
                total={navigationLinks.length}
                style={{
                  width: item.animation?.size?.width || '100%',
                  height: item.animation?.size?.height || '100%'
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu; 