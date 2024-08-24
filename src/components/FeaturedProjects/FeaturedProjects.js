import "./FeaturedProjects.css"
import VMX from "../../assets/Projects/SpotifyImageGenerator/VMXMXXV.jpg"
import ArtReccomendationResult from "../../assets/Projects/PaintingReccomendation/Screenshot 2024-07-25 at 2.46.08 PM.png"
import DCGANResults from "../../assets/Projects/DCGANFashion/15EpochsSeed999 copy.png"

import PythonIcon from "../../assets/TechIcons/Python.svg"
import JupyterIcon from "../../assets/TechIcons/Jupyter.svg"
import SpotifyIcon from "../../assets/TechIcons/Spotify.svg"
import OpenAIIcon from "../../assets/TechIcons/openai-svgrepo-com.svg"
import FlaskIcon from "../../assets/TechIcons/Flask.svg"
import PyTorchIcon from "../../assets/TechIcons/PyTorch.svg"
import HTMLIcon from "../../assets/TechIcons/HTML5.svg"
import kaggleIcon from "../../assets/TechIcons/Kaggle.svg"

import projectData from "../../ProjectData"


const FEATURED_LENGTH = 3


export default function FeaturedProjects() {

    const FeaturedData = projectData.slice(0, FEATURED_LENGTH)

    return ( 

        <div>
            <h1 className="title">Featured Projects</h1>
            <div className="featuredProjectsContainer">

            <ul>
            { FeaturedData.map((project) => {
                return(
                <li className="project" key={project.id}>
                    <a href={project.githubLink} className="FeaturedContainer">
                        <h3 className="projectTitle">Playlist Cover Art Generator</h3>
                        <img src={project.image} alt="Spotify Playlist Cover Image" className="FeaturedPhoto"></img>
                        <div className="descriptionContainer">
                        <p className="description"> &emsp; {project.shortDescription}</p>
                        </div>
                        <div className="icons">
                        { project.techStack.map((tech) => (
                        <img className="techIcon" src = {tech}></img>
                    ))}
                        </div>
                    </a>
                </li>
                
                )})}
                </ul>
            </div>
        </div>
    )
};