import "./Projects.css"
import  "../../assets/Projects/SpotifyImageGenerator/VMXMXXV.jpg"
import DCGANFashionImage from "../../assets/Projects/DCGANFashion/15EpochsSeed999 copy.png"
import projectData from "../../ProjectData"


export default function Projects() {
    return ( 
        <div>
            <h1 className="mainTitle">Projects</h1>
            <ul>
             { projectData.map((project) => {
                return(
                <a href={project.githubLink} className="projectLinkContainer">
                <li className="projectContainer" key={project.id}>
                
                <div className="rightTwoThirds">
                    <div className="projectTitleContainer">
                        <h2 className="projectTitleMain">{ project.title }</h2>
                        <p className="projectDate">{project.date}</p>
                    </div>
                    <ul>
                    { project.longDescripton.map((para) => (
                        <li key={para.id}>
                        <p className="projectDescription">&emsp; {para.para}</p>
                        </li>
                    ))}
                    </ul>
                    
                    </div>
                <div className="leftThird">
                    <img src={project.image} className="projectImage" alt="project image"/>
                </div>
                
            </li>
            </a>
)}) }
</ul>
        </div>
    )
};