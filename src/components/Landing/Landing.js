import "./Landing.css"
import Hero from "../../assets/Hero.JPG"
import Headshot from "../../assets/Headshot.JPG"

export default function Landing() {
    return ( 
        <div style={{ 
            backgroundImage: `url(${Hero})`
          }} className="heroImage">

            <img src={Headshot} className="landingHeadshot"></img>
            <h1 className="landingSiteTitle">AJ Matheson-Lieber</h1>
            <p className="landingPersonalTitle">Software Engineer, Artist, and Student @ Claremont McKenna College</p>
        </div>
    );
}