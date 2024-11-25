import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useState } from "react";
import useScroll from "./useScroll";

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);
  const { scrollDirection } = useScroll();

  const styles = {
    navbar: {
      backgroundColor: '#1a1a1a',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    hidden: {
      visibility: "hidden",
      transition: "all 0.2s",
      transform: "translateY(-100%)"
    },
    active: {
      visibility: "visible",
      transition: "all 0.5s"
    },
  };

  return (
    <AppBar 
      className="navbar" 
      style={{
        ...styles.navbar,
        ...(scrollDirection !== "up" ? styles.active : styles.hidden)
      }} 
      position="sticky"
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            AJ
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/art">
          Art
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}
