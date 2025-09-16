import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useScroll from "./useScroll";
import DropdownMenu from './DropdownMenu';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);
  const { scrollDirection } = useScroll();
  const [circleRadius, setCircleRadius] = useState(230);
  const [buttonPosition, setButtonPosition] = useState({ right: '16px', top: '16px' });

  // Update circle radius based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const minDimension = Math.min(width, height);
      
      // Adjust radius based on screen dimensions to prevent overflow
      // Make sure there's enough space for buttons plus padding
      if (width < 576) {
        setCircleRadius(Math.min(minDimension * 0.25, 150));
        setButtonPosition({ right: '8px', top: '8px' });
      } else if (width < 768) {
        setCircleRadius(Math.min(minDimension * 0.3, 180));
        setButtonPosition({ right: '12px', top: '12px' });
      } else if (width < 992) {
        setCircleRadius(Math.min(minDimension * 0.35, 200));
        setButtonPosition({ right: '16px', top: '16px' });
      } else {
        setCircleRadius(Math.min(minDimension * 0.4, 230));
        setButtonPosition({ right: '16px', top: '16px' });
      }
    };
    
    // Set initial radius and button position
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  // Add event listeners to handle escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && openNav) {
        setOpenNav(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openNav]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (openNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openNav]);

  const styles = {
    navbar: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      width: '100%',
      padding: 0,
      position: 'fixed',
      right: 0,
      left: 0,
      top: 0,
      pointerEvents: 'none', // Let clicks pass through the AppBar except for the button
      boxShadow: 'none !important',
      '--Paper-shadow': 'none !important',
      '--Paper-overlay': 'none !important',
    },
    hidden: {
      visibility: "hidden",
      transition: "all 0.2s",
      transform: "translateY(-100%)"
    },
    active: {
      visibility: "visible",
      backgroundColor: 'transparent',
      transition: "all 0.5s"
    },
    menuButtonContainer: {
      position: 'fixed', // Changed from absolute to fixed
      top: buttonPosition.top,
      right: buttonPosition.right,
      zIndex: 9999, // Higher z-index to guarantee it stays on top of everything
      pointerEvents: 'auto',
    },
    menuButton: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      pointerEvents: 'auto',
    },
  };

  // Function to generate random tilt between -20 and 20 degrees
  const randomTilt = () => Math.random() * 40 - 20;

  // Calculate positions in a circle
  const calculateCirclePosition = (index, total) => {
    // Calculate angle around the circle
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep - Math.PI / 2; // Start from top (subtract Pi/2)
    
    return {
      x: Math.cos(angle) * circleRadius - 100,
      y: Math.sin(angle) * circleRadius - 50,
    };
  };

  // Calculate center of screen
  const screenCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  // Navigation links with circle layout positions
  const navigationLinks = React.useMemo(() => {
    // Pre-generate random tilts for each menu item
    const tilts = Array(6).fill().map(() => randomTilt());
    
    return [
      {
        name: 'Projects',
        path: '/projects',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[0], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(0, 6), rotate: tilts[0], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 200, opacity: 0 },
          transition: { mass: 1.5, bounce: 0.4, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
      {
        name: 'Resume',
        path: '/resume',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[1], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(1, 6), rotate: tilts[1], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 150, opacity: 0 },
          transition: { mass: 1.2, bounce: 0.3, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
      {
        name: 'Home',
        path: '/',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[2], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(2, 6), rotate: tilts[2], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 100, opacity: 0 },
          transition: { mass: 1.8, bounce: 0.5, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
      {
        name: 'Contact',
        path: 'mailto:amatheson53@students.claremontmckenna.edu',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[3], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(3, 6), rotate: tilts[3], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 250, opacity: 0 },
          transition: { mass: 1.3, bounce: 0.6, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
      {
        name: 'About',
        path: '/about',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[4], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(4, 6), rotate: tilts[4], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 300, opacity: 0 },
          transition: { mass: 1.6, bounce: 0.35, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
      {
        name: 'Art',
        path: '/art',
        animation: {
          initial: { x: screenCenter.x, y: screenCenter.y, rotate: tilts[5], scale: 0.5, opacity: 0 },
          animate: { ...calculateCirclePosition(5, 6), rotate: tilts[5], scale: 1, opacity: 1 },
          exit: { scale: 0.5, y: window.innerHeight + 350, opacity: 0 },
          transition: { mass: 1.4, bounce: 0.45, duration: 0.6 },
          size: { width: "180px", height: "90px" }
        }
      },
    ];
  }, [circleRadius]);

  return (
    <>
      {/* Separated AppBar and menu button for better control */}
      <AppBar 
        className="navbar" 
        style={{
          ...styles.navbar,
          ...(scrollDirection !== "up" ? styles.active : styles.hidden)
        }} 
        position="fixed"
        elevation={0}
        sx={{
          boxShadow: 'none',
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
          '& .MuiPaper-root': {
            boxShadow: 'none',
            backgroundImage: 'none',
          }
        }}
      />
      
      {/* Separate fixed position for the menu button to prevent page-specific style conflicts */}
      <div className="menu-button-container" style={styles.menuButtonContainer}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <IconButton
            color="inherit"
            aria-label={openNav ? "close menu" : "open menu"}
            edge="end"
            onClick={toggleNav}
            style={styles.menuButton}
            className="menu-button"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={openNav ? 'close' : 'menu'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {openNav ? <CloseIcon /> : <MenuIcon />}
              </motion.div>
            </AnimatePresence>
          </IconButton>
        </motion.div>
      </div>
      
      {/* DropdownMenu component */}
      <DropdownMenu 
        isOpen={openNav} 
        onClose={() => setOpenNav(false)} 
        navigationLinks={navigationLinks} 
      />
    </>
  );
}
