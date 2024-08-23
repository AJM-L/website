import React, { useState } from "react";
import "./About.css";
import Headshot from "../../assets/AJSteps.jpeg"

export default function Nav() {
    const [hidden, setHidden] = useState(true);

    return (

        <div className="aboutSection">
            <div className="profileSection">
                <div
                    className="introTextContainer"
                    onMouseEnter={() => setHidden(false)}
                    onMouseLeave={() => setHidden(true)}
                >
                    {!hidden ? null : <h1 className="introText">About Me</h1>}
                    {hidden ? null : <h1 className="introText">Welcome!</h1>}
                </div>
                <img src={Headshot} className="Headshot" alt="Portrait of AJ"></img>
            </div>
            <div className="personalDescriptionContainer">
                <p className="personalDescription">
                    &emsp; Hello, and welcome to my website. My name is AJ Matheson-Lieber, and I am a Software Engineer, Artist, and Student from Portland, Oregon. I enjoy tackling difficult problems, understanding complex ideas, and producing interesting and novel creations. 
                    </p>
                    <p className="personalDescription">
                        &emsp; I am passionate about philosophy, computer science, art, and politics among other things. My interdisciplinary studies and wide range of interests have greatly aided my problem solving abilities and have helped me to develop a unique skillset and perspective. 
                    </p>
                    <p className="personalDescription">
                        &emsp; I hope to continue my learning, and begin to apply my perspective, dedication, and technical skills towards solving pressing issues, overcoming challenges, and designing fun and interesting systems.
                    </p>
            </div>
        </div>
    );
}