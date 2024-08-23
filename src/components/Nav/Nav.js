import React, { useState, useEffect } from "react";
import "./nav.css";
import dropdown from "../../assets/dropdownDG.svg";
import contactIcon from "../../assets/contactimg.png";
import useScroll from "./useScroll";

export default function Nav () {
  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const { y, x, scrollDirection } = useScroll();  

  const styles = {
    
    hidden: {
      visibility: "hidden",
      transition: "all 0.2s",
      transform: "translateY(-100%)"
    },

    active: {
      visibility: "visible",
      transition: "all 0.5s"
    },
  }

    return (
        <header className="navbar" style={scrollDirection != "up" ? styles.active: styles.hidden}   >
          <div className="navbar" >
            <a href="/" className="navbarName">
                AJ Matheson-Lieber
            </a>
            <p className="navbarSeparator">|</p>
            <nav className={`navbarItems ${openNav ? "open" : "closed"}`}>
              <a href="/projects" className="navbarItem">
                Projects
              </a>
              <a href="/Art" className="navbarItem">
                Art
              </a>
            </nav>
            <a
              href="/Contact"
              className="navbarContactBtn">
                <img src={contactIcon} className="contactIcon" alt="contact"></img>
              Contact
            </a>
            <div onClick={toggleNav} className={`navDropdownMenu ${openNav ? "open" : "closed"}`}>
            <img src={dropdown} alt="drop down menu icon" className="navDropdownMenuIcon"></img>
            </div>
          </div>
        </header>
      );
}