import "./Footer.css"
import instagram from "../../assets/social media icons/instagram.png"
import linkedin from "../../assets/social media icons/linkedin.png"
import github from "../../assets/social media icons/github.png"

export default function Footer () {
    return (
        <footer className="footerContainer">
            <div className="infoContainer">
                <a href="/" className="footerName">AJ Matheson-Lieber</a>
                <a href="/#/Art" className="footerPage">Art</a>
                <a href="/#/Projects" className="footerPage">Projects</a>
                <a href="/#/Contact" className="footerPage">Contact</a>
            </div>
            <div className="socialContainer">
                <a href="https://www.instagram.com/aj_ml42/" className="socialLink">
                    <img src={instagram} className="socialIcon"></img>
                </a>
                <a href="www.linkedin.com/in/alexander-james-matheson-lieber-3193472a0" className="socialLink">
                    <img src={linkedin} className="socialIcon"></img>
                </a>
                <a href="https://github.com/AJM-L" className="socialLink">
                    <img src={github} className="socialIcon"></img>
                </a>
            
            </div>
        </footer>
    );
}