import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Celestine Okonkwo. </span>
            {/* from <span className="purple"> Anambra, Nigeria. </span> */}
            <br />
            I am a software engineer with 2+ years of experience in designing, developing, and maintaining software applications.
            I am proficient in a variety of programming languages including Java, Python, and JavaScript,
            and I have experience with various software development methodologies.
            I am passionate about building high-quality software and am always looking for opportunities to learn new technologies and improve my skills.
            <br />
            <br />
            I am currently employed as a software engineer at <span className="purple">GoPro Integrated Technologies</span>, Lagos.
            <br />
            I am also currently pursuing a BSc. in Computer Science at <span className="purple">Mountain Top University</span>, Nigeria.
            <br />
            <br />
            Apart from coding and manipulating data, some other activities that I love to do are:
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
            {/* "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"{" "} */}
            “If a man is called to be a street sweeper, he should sweep streets even as a Michaelangelo painted, or Beethoven composed music or Shakespeare wrote poetry.
            He should sweep streets so well that all the hosts of heaven and earth will pause to say, 'Here lived a great street sweeper who did his job well'.”{" "}
          </p>
          <footer
            className="blockquote-footer">
            {/* Colossians 3:23 */}
            <cite title="Source Title">Martin Luther King Jr.</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
