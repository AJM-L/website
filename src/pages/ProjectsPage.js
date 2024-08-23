import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects"
import Projects from "../components/Projects/Projects"
import NavBlocker from "../components/NavBlocking/NavBlocking"
import Divider from "../components/Divider/Divider"

export default function ProjectsPage() {
    return ( 
        <div>
            <NavBlocker />
            <FeaturedProjects />
            <Divider />
            <Projects />
        </div>
    )
};