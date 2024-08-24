import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home"
import ProjectsPage from './pages/ProjectsPage';
import ArtPage from "./pages/ArtPage"
import Footer from "./components/Footer/Footer"
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <div>
    <HashRouter>
      <Nav />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Projects" element={<ProjectsPage />} />
      <Route path="/Art" element={<ArtPage />} />
      <Route path="/Contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </HashRouter>
    </div>
  );
}

export default App;
