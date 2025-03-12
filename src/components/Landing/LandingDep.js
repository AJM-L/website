import "./Landing.css"
import Hero from "../../assets/Hero.JPG"
import Headshot from "../../assets/Headshot.JPG"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ScrambledText({ text, delay = 100 }) {
    const [displayText, setDisplayText] = useState('');
    const characters = 'SDAabcdefghijklmnopqrstuvwxyz';

    useEffect(() => {
        let timeout = setTimeout(() => {
            let iterations = 0;
            const interval = setInterval(() => {
                setDisplayText(current => {
                    const result = text
                        .split('')
                        .map((letter, index) => {
                            if (index < iterations) {
                                return text[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join('');

                    if (iterations >= text.length) {
                        clearInterval(interval);
                    }
                    iterations += 1/3;
                    return result;
                });
            }, 60);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay]);

    return displayText;
}

export default function Landing() {
    return ( 
        <section className="landingSection">
            <div 
                style={{ backgroundImage: `url(${Hero})` }} 
                className="heroImage"
            >
                <div className="overlay">
                    <img src={Headshot} className="landingHeadshot" alt="AJ Matheson-Lieber"></img>
                    <h1 className="landingSiteTitle">AJ Matheson-Lieber</h1>
                    <p className="landingPersonalTitle">
                        <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ScrambledText text="Software" delay={0} />
                        </Link>
                        ,{' '}
                        <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ScrambledText text="Design" delay={500} />
                        </Link>
                        ,{' '}
                        <ScrambledText text="and" delay={750} />{' '}
                        <Link to="/art" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ScrambledText text="Art" delay={1000} />
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}