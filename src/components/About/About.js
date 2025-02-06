import "./About.css"
import { motion } from "framer-motion"
import educationIcon from "../../assets/icons/education.png"
import locationIcon from "../../assets/icons/location.png"
import interestsIcon from "../../assets/icons/interests.png"
import profileImage from "../../assets/AJSteps.jpeg"

export default function About() {
    return (
        <section className="aboutSection">
            <motion.h1 
                className="sectionTitle"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                About Me
            </motion.h1>
            
            <div className="aboutContainer">
                    <motion.div 
                    className="profileImageContainer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src={profileImage} alt="Profile" className="profileImage" />
                </motion.div>

                <motion.div 
                    className="bioHighlights"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="bioItem">
                        <img src={educationIcon} alt="Education" className="bioIcon" />
                        <div className="bioContent">
                            <h3>Education</h3>
                            <p>Claremont McKenna College</p>
                            <p>Mathematics, Philosophy, & Computer Science</p>
                        </div>
                    </div>
                    <div className="bioItem">
                        <img src={locationIcon} alt="Location" className="bioIcon" />
                        <div className="bioContent">
                            <h3>Location</h3>
                            <p>Portland, OR / Los Angeles, CA</p>
                        </div>
                    </div>
                    <div className="bioItem">
                        <img src={interestsIcon} alt="Interests" className="bioIcon" />
                        <div className="bioContent">
                            <h3>Interests</h3>
                            <p>Software Development</p>
                            <p>UI/UX Design</p>
                            <p>Digital Art</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="personalDescriptionContainer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    My Journey
                </motion.h2>
                
                {[
                    `I'm a passionate <span class="highlight">developer</span> and <span class="highlight">designer</span> with a unique blend of technical expertise 
                    and creative vision. My journey in technology began with a curiosity about 
                    working with software, which has evolved into a deep <span class="highlight">love for creating elegant solutions through code.</span>`,
                    
                    `At <span class="highlight">Claremont McKenna College</span>, I've been pursuing a dual major in <span class="highlight">Mathematics</span> 
                    and <span class="highlight">Philosophy</span> with a focus on <span class="highlight">Computer Science</span>, allowing me to approach problems with both <span class="highlight">technical precision</span> and 
                    <span class="highlight">deep philosophical and ethical understanding</span>. This interdisciplinary background helps me create solutions that 
                    are not just technically sound, but also well-reasoned and meaningful.`,
                    
                    `Other than coding, my interests include <span class="highlight">art</span>, <span class="highlight">reading</span>, <span class="highlight">philosophy</span>, and working on personal projects. 
                    I especially enjoy <span class="highlight">music</span>, <span class="highlight">fashion</span>, and <span class="highlight">painting</span>. In college, I am an editor for the satire paper, 
                    <a href="https://www.instagram.com/thegoldenantlers/">The Golden Antlers</a>, a <a href="https://p-ai.org/">P-ai fellow</a>, 
                    a <a href="https://www.productspace.org/">Product Space fellow</a>, a research assistant at <a href="https://gouldcenter.org/">
                    the Gould Center for Humanistic Studies</a> working on the intersection of technology and humanism, 
                    a member of the Claremont Men's Club Basketball team, a first year guide (FYG), and an MD at the Athenaeum.`,
                ].map((text, index) => (
                    <motion.p
                        key={index}
                        className="personalDescription"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 + (index * 0.2) }}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
            </motion.div>
        </section>
    );
}