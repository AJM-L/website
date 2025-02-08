import React from 'react';
import './LiveBrary.css';
//import LiveBraryImage from "../../Projects/LiveBrary/LiveBrary.png";

export default function LiveBrary() {
    return (
        <div className="project-container">
            <header className="project-header">
                <h1>LiveBrary</h1>
                <p>
                    <strong>Livebrary</strong> recreates those precious moments with your older loved ones—a <strong>live-streaming platform</strong> designed for seniors
                    to share their <strong>skills</strong>, <strong>crafts</strong>, <strong>recipes</strong>, <strong>life stories</strong>, and more.
                </p>
            </header>
            <div className="project-content">
                <main className="project-description">
                    <section className="overview">
                        <h2>Project Overview</h2>
                        <p>
                            Think of the last time you took time to learn a new <strong>skill</strong> from your grandpa or sat down to let your great-uncle
                            tell you a <strong>story</strong> from his younger years. When will these stories be lost to time forever?
                        </p>
                        <p>
                            As technology becomes more integrated into daily interactions, aging populations face increasing challenges in
                            connecting with their families and communities. <strong>Livebrary</strong> ensures that a legacy of <strong>wisdom</strong> and <strong>experience</strong> is captured
                            and shared, bridging generational gaps.
                        </p>
                    </section>
                    <section className="research">
                        <h2>Research Process and Findings</h2>
                        <p>
                            Our primary and secondary research identified several key needs among seniors, including:
                        </p>
                        <ul>
                            <li><strong>Community</strong></li>
                            <li><strong>Continued hobbies</strong></li>
                            <li><strong>Respect</strong> &amp; <strong>feeling seen</strong></li>
                            <li><strong>Patience</strong></li>
                            <li><strong>To be remembered</strong></li>
                        </ul>
                        <p>
                            We conducted in-person field research and interviews with seniors in <strong>Claremont, California</strong>, as well as interviews
                            with younger students. These insights highlighted the necessity for <strong>community connection</strong>, as well as the importance of 
                            <strong>intuitive design</strong> to reduce frustration when using technology.
                        </p>
                        <p>
                            Secondary research, including discussions on <strong>Quora</strong> and <strong>Reddit</strong> (r/Aging) and studies like the <strong>National Poll on Healthy Aging</strong>,
                            underscored the prevalence of <strong>isolation</strong> and <strong>loneliness</strong> among older adults.
                        </p>
                    </section>
                    <section className="design-decisions">
                        <h2>Design Decisions</h2>
                        <p>
                            In contrast to existing social media platforms which primarily cater to younger users, <strong>Livebrary's design</strong> addresses the
                            unique needs of seniors. Our decisions focused on:
                        </p>
                        <ul>
                            <li>Creating a clear, simple interface to reduce <strong>cognitive overload</strong>.</li>
                            <li>Ensuring <strong>intuitive navigation</strong> with assisted tutorials and comprehensive setup guides.</li>
                            <li>Leveraging <strong>live streaming</strong> and <strong>pre-recorded video</strong> to simulate face-to-face interactions.</li>
                        </ul>
                        <p>
                            Prototype testing with seniors confirmed that features such as toggling between <strong>"sharing"</strong> and <strong>"learning"</strong> modes are best
                            implemented using clear, distinct button states.
                        </p>
                    </section>
                </main>
                <aside className="project-prototype">
                    <h2>Prototype</h2>
                    <iframe
                        title="LiveBrary Prototype"
                        style={{ 
                            border: '1px solid rgba(0, 0, 0, 0.1)', 
                            width: '100%', 
                            height: '800px',
                            backgroundColor: 'white',
                            borderRadius: '8px'
                        }}
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIPfx1qhwFyUZX9KjF6c7fd%2FLiveBrary%3Ftype%3Ddesign%26node-id%3D2203-3110%26t%3DXxGGGXXwxPxhPwxw-1%26scaling%3Dscale-down%26page-id%3D2203%253A3109%26starting-point-node-id%3D2203%253A3110%26mode%3Ddesign"
                        allowFullScreen
                    ></iframe>
                </aside>
            </div>
        </div>
    );
}