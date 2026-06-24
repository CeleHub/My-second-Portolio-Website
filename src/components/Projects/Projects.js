import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import mindbridge from "../../Assets/Projects/mindbridge.png";
import supabaseKeepAlive from "../../Assets/Projects/supabase_keep_alive.png";
import bulkMail from "../../Assets/Projects/bulk_mail.png";
import dire from "../../Assets/Projects/dire.png";
import subscriptionBot from "../../Assets/Projects/celestine_subscription_bot.png";
import movieBot from "../../Assets/Projects/telegram_movie_bot.png";
import courseflow from "../../Assets/Projects/courseflow.png";
import subscriptionOtp from "../../Assets/Projects/subscription_otp.png";
import reminderBot from "../../Assets/Projects/reminder_bot.png";
import otlWebsite from "../../Assets/Projects/otl_business_website.png";
import otlWms from "../../Assets/Projects/otl_wms.png";
import stemDb from "../../Assets/Projects/stem_db.png";
import cgpaChecker from "../../Assets/Projects/cgpa_checker.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are some of the primary projects I have designed and developed recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mindbridge}
              isBlog={false}
              title="MindBridge Chatbot"
              description="MindBridge is an AI-powered mental health triage and support platform designed specifically for university students. Built with React.js and FastAPI, the system integrates a Hybrid AI pipeline: a local Machine Learning model (Logistic Regression + TF-IDF) handles explainable sentiment analysis, while Google Gemini (with API key rotation) generates empathetic responses grounded in Cognitive Behavioral Therapy (CBT). Key features include LIME explainability charts to expose model feature weights, browser-based audio note recording with custom playback speeds, student email verification, and automated GMT session expiration guards for privacy."
              ghLink="https://github.com/CeleHub/mindbridge-chatbot"
              demoLink="https://mindbridgechatbot.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={otlWms}
              isBlog={false}
              title="OTL WMS"
              description="A production-grade mobile warehouse management system (WMS) custom-built for motor spare parts distribution. Developed with Flutter and Supabase, the application enforces a strict double-entry ledger system where all stock changes (offloading, removals, and transfers) are recorded as immutable stock movements. It features a secure passwordless login flow using Supabase Edge Functions with custom phone and PIN verification, role-based access controls, auto-complete search functionality for complex part numbers, and native Excel/PDF report generation for seamless inventory audits."
              isNDA="NDA compliance, can't disclose link"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={courseflow}
              isBlog={false}
              title="CourseFlow"
              description="A dynamic curriculum planning and course visualizer built with React.js, Go, and D3.js. It maps course prerequisite structures into interactive node flow graphs for students."
              ghLink="https://github.com/CeleHub/courseflow"
              demoLink="https://courseflow-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bulkMail}
              isBlog={false}
              title="Bulk Delivery Mail System"
              description="A scalable bulk mail delivery platform engineered with Python, FastAPI, and Redis. It handles scheduling, tracking, and transactional email deliveries via SMTP and SES."
              ghLink="https://github.com/CeleHub/bulk-mail-system"
              demoLink="https://bulk-mail-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dire}
              isBlog={false}
              title="DIRE"
              description="A modern network security dashboard built with Next.js, Tailwind CSS, and Python. It monitors routing nodes and flags security violations using real-time packet inspection techniques."
              ghLink="https://github.com/CeleHub/dire-security"
              demoLink="https://dire-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={otlWebsite}
              isBlog={false}
              title="OTL Business Website"
              description="A premium corporate landing page developed using React.js and vanilla CSS. It features glassmorphism panels, interactive financial charts, and fluid layout animations."
              ghLink="https://github.com/CeleHub/otl-business-website"
              demoLink="https://otl-business.netlify.app/"
            />
          </Col>
        </Row>

        <h1 className="project-heading" style={{ paddingTop: "50px" }}>
          Other <strong className="purple">Notable Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          A collection of bots, utilities, databases, and other tools I've built.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={supabaseKeepAlive}
              isBlog={false}
              title="Supabase Keep Alive"
              description="A lightweight automation cron script built with Node.js and GitHub Actions. It regularly pings Supabase DB instances to prevent them from entering auto-pause due to inactivity."
              ghLink="https://github.com/CeleHub/supabase-keep-alive"
              demoLink="https://github.com/CeleHub/supabase-keep-alive#readme"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={subscriptionBot}
              isBlog={false}
              title="Celestine's Subscription Bot"
              description="An automated Telegram subscription management bot written in Python and SQLite. It handles recurring user subscriptions, tracks payment statuses, and fires automated alerts."
              ghLink="https://github.com/CeleHub/subscription-telegram-bot"
              demoLink="https://t.me/CelesteSubscriptionBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={movieBot}
              isBlog={false}
              title="Telegram Movie Bot"
              description="A Telegram bot that aggregates, indexes, and serves download links for cinema movies. Engineered with Python, Telethon, and MongoDB for lightning-fast queries."
              ghLink="https://github.com/CeleHub/telegram-movie-bot"
              demoLink="https://t.me/CelesteMovieBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={subscriptionOtp}
              isBlog={false}
              title="SubscriptionOTP Bot"
              description="A security-first authentication bot built with Node.js and Express. It manages secure subscription verification by issuing time-sensitive one-time passcodes (OTPs)."
              ghLink="https://github.com/CeleHub/subscription-otp-bot"
              demoLink="https://t.me/SubscriptionOTPBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={reminderBot}
              isBlog={false}
              title="Reminder Bot"
              description="A productivity-focused Telegram reminder bot developed with Go and PostgreSQL. Users can schedule automated alerts, task reminders, and calendar notifications in chat."
              ghLink="https://github.com/CeleHub/telegram-reminder-bot"
              demoLink="https://t.me/CelesteReminderBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stemDb}
              isBlog={false}
              title="Stem DB"
              description="An educational database explorer engineered with Python and Flask. It indexes biological, chemical, and physical data, making STEM research materials easy to search."
              ghLink="https://github.com/CeleHub/stem-db"
              demoLink="https://stem-db-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cgpaChecker}
              isBlog={false}
              title="CGPA Checker"
              description="A web-based academic CGPA calculator built with React.js and CSS. It computes student grading points, charts performance trends, and helps plan semester targets."
              ghLink="https://github.com/CeleHub/cgpa-checker"
              demoLink="https://cgpa-checker-demo.netlify.app/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
