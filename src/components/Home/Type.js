import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer",
          "Backend Developer",
          "Frontend Developer",
          "Data Analyst",
          "Freelancer",
          "Student",
          // "MERN Stack Developer",
          // "Open Source Contributor",
          "Tech Enthusiast",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
