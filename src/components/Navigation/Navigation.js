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
      width: 'auto',
      right: '0px',
      left: 'auto',
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
    menuButton: {
      margin: '16px',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      zIndex: 2000, // Higher z-index to ensure it stays on top
    },
  };

  // Enhanced navigation links with custom animation properties
  const navigationLinks = [
    { 
      name: 'Projects', 
      path: '/projects', 
      animation: {
        initial: { x: 400, y: 300, rotate: -10 },
        animate: { x: 0, y: 0 },
        exit: { x: -100, y: window.innerHeight + 200 },
        transition: { mass: 1.5, bounce: 0.4 },
        size: { width: "400px", height: "200px" }
      }
    },
    { 
      name: 'Resume', 
      path: '/resume',
      animation: {
        initial: { x: 200, y: 150, rotate: -10 },
        animate: { x: 150, y: 130 },
        exit: { x: 150, y: window.innerHeight + 150 },
        transition: { mass: 1.2, bounce: 0.3 },
        size: { width: "200px", height: "200px" }
      }
    },
    { 
      name: 'Home', 
      path: '/',
      animation: {
        initial: { x: 150, y: 200, rotate: -5 },
        animate: { x: -130, y: 200 },
        exit: { x: -200, y: window.innerHeight + 100 },
        transition: { mass: 1.8, bounce: 0.5 },
        size: { width: "200px", height: "200px"}
      }
    },
    { 
      name: 'Contact', 
      path: 'mailto:amatheson53@students.claremontmckenna.edu',
      animation: {
        initial: { x: 150, y: 250, rotate: 5 },
        animate: { x: -150, y: -60 },
        exit: { x: 250, y: window.innerHeight + 250 },
        transition: { mass: 1.3, bounce: 0.6 },
        size: { width: "200px", height: "200px" }
      }
    },
    { 
      name: 'About', 
      path: '/about',
      animation: {
        initial: { x: -200, y: 330, rotate: -15 },
        animate: { x: -20, y: 160 },
        exit: { x: -150, y: window.innerHeight + 300 },
        transition: { mass: 1.6, bounce: 0.35 },
        size: { width: "200px", height: "200px" }
      }
    },
    { 
      name: 'Art', 
      path: '/art',
      animation: {
        initial: { x: 0, y: -250, rotate: 15 },
        animate: { x: 70, y: 20 },
        exit: { x: 100, y: window.innerHeight + 350 },
        transition: { mass: 1.4, bounce: 0.45 },
        size: { width: "200px", height: "200px" }
      }
    },
  ];

  return (
    <>
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
      >
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
      </AppBar>
      
      {/* New DropdownMenu component */}
      <DropdownMenu 
        isOpen={openNav} 
        onClose={() => setOpenNav(false)} 
        navigationLinks={navigationLinks} 
      />
    </>
  );
}
