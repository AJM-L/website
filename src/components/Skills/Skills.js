import "./Skills.css";
import PythonIcon from "../../assets/TechIcons/Python.svg";
import JavaScriptIcon from "../../assets/TechIcons/JavaScript.svg";
import ReactIcon from "../../assets/TechIcons/React.svg";
import PhotoshopIcon from "../../assets/TechIcons/Adobe Photoshop.svg";
import PremiereIcon from "../../assets/TechIcons/Adobe Premiere Pro.svg";
import CSS3Icon from "../../assets/TechIcons/CSS3.svg";
import FlaskIcon from "../../assets/TechIcons/Flask.svg";
import HTML5Icon from "../../assets/TechIcons/HTML5.svg";
import JavaIcon from "../../assets/TechIcons/Java.svg";
import PyTorchIcon from "../../assets/TechIcons/PyTorch.svg";
import UXIcon from "../../assets/TechIcons/UX.png";
import PMIcon from "../../assets/TechIcons/PM.png";




export default function Skills() {
    const technicalSkills = [
        { name: "Python", icon: PythonIcon },
        { name: "JavaScript", icon: JavaScriptIcon },
        { name: "Java", icon: JavaIcon },
        { name: "CSS3", icon: CSS3Icon },
        { name: "HTML5", icon: HTML5Icon },
        { name: "React", icon: ReactIcon },
        { name: "Flask", icon: FlaskIcon },
        { name: "PyTorch", icon: PyTorchIcon },
        { name: "Photoshop", icon: PhotoshopIcon },
        { name: "Premiere Pro", icon: PremiereIcon },
    ];

    return (
        <section id="skills" className="skillsSection">
            <h2 className="skillsTitle">My Skills</h2>
            <div className="skillsContainer">
                <div className="skillCategory">
                    <div className="skillsIcons">
                        {technicalSkills.map((skill) => (
                            <div className="skill" key={skill.name}>
                                <img src={skill.icon} alt={skill.name} className="skillIcon"></img>
                                <p>{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 