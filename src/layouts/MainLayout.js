import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import theme from '../theme';
import './MainLayout.css'; // Create this file next

const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout; 