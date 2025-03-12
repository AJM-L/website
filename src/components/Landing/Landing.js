import * as React from "react";
import "./Landing.css";
import { useEffect, useRef, useState } from 'react';

function Landing() {
  
  return (
    <main className="container">
      <header className="header">
        <h2 className="academicCredentials">
          Math, <br />Philosophy, <br />Computer Science
        </h2>
        <p className="institution">@Claremont McKenna College</p>
      </header>

      <section className="heroSection">
        <h1 className="AJ">AJ</h1>
        <article className="profileInfo">
          <p className="professionalTitles">
            Artist, <br />Designer, <br />Software Engineer
          </p>
          <h1 className="lastName">Matheson-Lieber</h1>
          <div></div>
        </article>
      </section>
    </main>
  );
}

export default Landing;
