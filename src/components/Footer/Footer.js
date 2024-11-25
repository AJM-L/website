import "./Footer.css"
import instagram from "../../assets/social media icons/instagram.png"
import linkedin from "../../assets/social media icons/linkedin.png"
import github from "../../assets/social media icons/github.png"

export default function Footer() {
    return (
        <footer className="footerContainer">
            <div className="footerContent">
                <div className="footerLeft">
                    <p className="footerCopyright">© 2024 AJ Matheson-Lieber</p>
                </div>
                
                <div className="socialContainer">
                    <a href="https://www.linkedin.com/in/alexander-james-matheson-lieber-3193472a0" 
                       className="socialLink"
                       target="_blank"
                       rel="noopener noreferrer">
                        <img src={linkedin} className="socialIcon" alt="LinkedIn" />
                    </a>
                    <a href="https://github.com/AJM-L" 
                       className="socialLink"
                       target="_blank"
                       rel="noopener noreferrer">
                        <img src={github} className="socialIcon" alt="GitHub" />
                    </a>
                    <a href="https://www.instagram.com/aj_ml42/" 
                       className="socialLink"
                       target="_blank"
                       rel="noopener noreferrer">
                        <img src={instagram} className="socialIcon" alt="Instagram" />
                    </a>
                </div>
            </div>
        </footer>
    );
}