import Landing from "../components/Landing/Landing";
import About from "../components/About/About";
import FeaturedProjects from "../components/FeaturedProjects/FeaturedProjects";
import Contact from "../components/Contact/Contact";
import Divider from "../components/Divider/Divider";

export default function Home() {
    return ( 
        <div>
            <Landing />
            <FeaturedProjects />
        </div>
    );
};