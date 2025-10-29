import React from 'react';
import './StudySync.css';

export default function StudySync() {
    return (
        <div className="project-container">
            <header className="project-header">
                <h1>StudySync</h1>
                <p>
                    A web application that helps students find optimal <strong>collaboration times</strong> based on their 
                    <strong> schedules</strong> and <strong>assignments</strong>—built at 5C Hack.
                </p>
            </header>
            <div className="project-content">
                <main className="project-description">
                    <section className="overview">
                        <h2>Problem Statement</h2>
                        <p>
                            For time-strapped students, the effort to coordinate with classmates often feels harder than doing 
                            the work alone. The pandemic normalized <strong>asynchronous course loads</strong> and <strong>remote learning</strong>, 
                            and now with rapid advancements in technology—AI tools, digital learning platforms, and instant solutions—
                            <strong>solo work has become even easier</strong>. As a result, meaningful peer connection is becoming less common.
                        </p>
                        <p>
                            This issue was brought to our attention by two of our founders who are grading tutors at Harvey Mudd College. 
                            Over their last 4 semesters, they've noticed a <strong>continuous decline</strong> in students coming in for help.
                        </p>
                    </section>
                    <section className="solution">
                        <h2>Our Solution</h2>
                        <p>
                            Our project is a step toward reversing this trend. We facilitate collaboration by <strong>matching students</strong> who 
                            have shared assignment due dates and overlapping free time, making it easier to plan co-working sessions.
                        </p>
                        <p>
                            When users sign in with <strong>Google OAuth</strong>, they grant access to their Google Calendar. The app scans 
                            the calendar to identify:
                        </p>
                        <ul>
                            <li><strong>Upcoming assignments</strong> based on event names and keywords</li>
                            <li><strong>Free time blocks</strong> where no events are scheduled</li>
                        </ul>
                        <p>
                            The platform then suggests study partners based on:
                        </p>
                        <ul>
                            <li>Matching or similar <strong>assignment due dates</strong></li>
                            <li>Shared blocks of <strong>free time</strong></li>
                        </ul>
                    </section>
                    <section className="privacy">
                        <h2>Privacy & Security</h2>
                        <p>
                            To protect user data, we:
                        </p>
                        <ul>
                            <li>Avoid storing unnecessary personal data</li>
                            <li>Allow users to opt out or pause matching at any time</li>
                            <li>Only show suggested study times, never full availability</li>
                        </ul>
                    </section>
                    <section className="tech-stack">
                        <h2>Technical Implementation</h2>
                        <p>
                            This project was built during the <strong>5C Hack</strong> hackathon with a team of four. 
                            I focused on <strong>frontend development</strong> and contributed to <strong>full-stack features</strong>.
                        </p>
                        <p>
                            <strong>Frontend:</strong> React.js, React Router, React Icons, CSS3<br />
                            <strong>Backend:</strong> Python, Flask, MongoDB, Firebase Admin SDK, Google Calendar API
                        </p>
                    </section>
                    <section className="impact">
                        <h2>Impact</h2>
                        <p>
                            By removing the friction from finding collaboration opportunities, we hope to encourage more students to 
                            work together, ask for help, and build meaningful academic relationships—reversing the trend toward 
                            isolated learning.
                        </p>
                    </section>
                </main>
                <aside className="project-prototype">
                    <h2>Design Walkthrough</h2>
                    <div className="video-container">
                        <iframe
                            title="StudySync Design Walkthrough"
                            src="https://www.youtube.com/embed/dDC9-SWw81c"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </aside>
            </div>
        </div>
    );
}

