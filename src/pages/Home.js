import About from "../components/About/About"
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects"
import Divider from "../components/Divider/Divider"
import Landing from "../components/Landing/Landing"

export default function Home() {
    return ( 
        <div>
            <Landing />
            <About />
            <Divider />
            <FeaturedProjects />
        </div>
    )
};