import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Celestine Okonkwo </span>
            from <span className="purple"> Anambra, Nigeria. </span>
            <br />
            I am currently employed as a data analysis intern at GPIT Limited.
            <br />
            {/* I have completed Integrated MSc (IMSc) in Maths and Computing at BIT */}
            {/* Mesra. */}
            <br />
            <br />
            Apart from coding and manipulating data, some other activities that I love to do:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading
            </li>
            <li className="about-activity">
              <ImPointRight /> Sleeping 😂
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"{" "}
          </p>
          <footer className="blockquote-footer">Colossians 3:23</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
