import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
    <Router>
      <Nav />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/Projects" element={<ProjectsPage />} />
      <Route exact path="/Art" element={<ArtPage />} />
      <Route exact path="/Contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
