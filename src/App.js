import './App.css';
import React from "react";
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Home from "./pages/Home"
import ProjectsPage from './pages/ProjectsPage';
import ArtPage from "./pages/ArtPage"
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import AboutPage from './pages/AboutPage';
import PinterestPins from "./pages/Projects/PinterestPins/PinterestPins"


function App() {
  return (
    <HashRouter basename="/">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/pinterestgan" element={<PinterestPins />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
}

export default App;
