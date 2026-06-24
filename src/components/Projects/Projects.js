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
              description="MindBridge is an AI-powered mental health triage and support platform designed specifically for university students. Built with React 19 and FastAPI, it integrates a Hybrid AI pipeline combining a local machine learning model (Logistic Regression + TF-IDF) for explainable sentiment classification and Google Gemini Pro (with API key-rotation) for empathetic, CBT-grounded dialogues. Features include a LIME explainability dashboard displaying term-weight charts, browser-based vocal audio note recording with a custom speed player, MTU domain verification, and guest session daily expiration guards."
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
              isNDA="NDA compliance, can't disclose links"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={courseflow}
              isBlog={false}
              title="CourseFlow"
              description="An enterprise-grade academic management and timetable scheduling platform. Built with Next.js, NestJS, TypeScript, Tailwind CSS, and PostgreSQL (with Prisma ORM), the system features an automated, constraint-based scheduling engine that generates conflict-free lecture and exam timetables while preventing double-bookings. It provides Heads of Department (HODs) and admins with interactive calendar views, manual scheduling override controls, slot-pinning capabilities, a complaints system, and a multi-format export engine (PDF, Excel, and dual-layer PNG reports)."
              ghLink="https://github.com/CeleHub/courseflow"
              demoLink="https://courseflow-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bulkMail}
              isBlog={false}
              title="Bulk Delivery Mail System"
              description="A secure, local client-server email broadcast application. Built with HTML5/CSS3 (modern glassmorphism design), Vanilla JS, Node.js, Express, and Nodemailer, it enables local in-memory parsing of CSV/Excel recipient files (via SheetJS and Multer buffers) and broadcasting of personalized templates. Features include secure local SMTP credentials configuration, a drag-and-drop ingestion preview, a template composer injecting column header placeholders, live pagination previews, throttling delay controls, and a real-time system delivery terminal log."
              ghLink="https://github.com/CeleHub/bulk-mail-system"
              demoLink="https://bulk-mail-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dire}
              isBlog={false}
              title="DIRE"
              description="A Windows-first, offline peer-to-peer (P2P) communication application. Engineered with Electron, React, Vite, Node.js, and TCP Sockets, it enables device discovery, messaging, and real-time voice calls over a Local Area Network (LAN) without requiring an internet connection. It features a premium glassmorphic dark mode UI, mock/simulated Bluetooth discovery, and direct TCP socket networking to establish reliable communication between connected peers."
              ghLink="https://github.com/CeleHub/dire-security"
              demoLink="https://dire-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={otlWebsite}
              isBlog={false}
              title="OTL Business Website"
              description="The official corporate web application for Obijons Trade Link Limited. Built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Supabase (for SSR and secure DB connections), it provides a complete product catalog interface. It features secure admin dashboard authentication, forms integration using React Hook Form and Zod validation schemas, email routing via Resend API, automated product data migrations, and performance analytics tracking."
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
              description="A lightweight automation cron script configured as a GitHub Actions workflow. Built with Bash, curl, and jq, it reads configurations from encrypted secrets to regularly ping REST API endpoints of Supabase projects, preventing database instances from entering auto-pause due to inactivity. Tracks success/failure rates per project and sends real-time status reports directly to Telegram using the Telegram Bot API."
              ghLink="https://github.com/CeleHub/supabase-keep-alive"
              demoLink="https://github.com/CeleHub/supabase-keep-alive#readme"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={subscriptionBot}
              isBlog={false}
              title="Celestine's Subscription Bot"
              description="An automated Telegram subscription management bot built with Node.js, Telegraf, and Mongoose (connecting to MongoDB Atlas). It tracks active customer subscriptions, amounts due, payment methods, and renewal histories. Using node-cron and dayjs, the bot schedules automated payment reminders sent at specific intervals (7, 3, 2, and 1 days before expiration) to alert users of upcoming renewals."
              ghLink="https://github.com/CeleHub/subscription-telegram-bot"
              demoLink="https://t.me/CelesteSubscriptionBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={movieBot}
              isBlog={false}
              title="Telegram Movie Bot"
              description="An asynchronous Telegram bot that aggregates, indexes, and delivers download links for cinema movies. Engineered with Python, Telethon, MongoDB, and the TMDB API, it allows users to search for films and instantly retrieves poster artwork, ratings, synopsis, and year release details. It performs parallel web scraping across multiple custom media providers concurrently using asyncio and httpx to gather download links."
              ghLink="https://github.com/CeleHub/telegram-movie-bot"
              demoLink="https://t.me/CelesteMovieBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={subscriptionOtp}
              isBlog={false}
              title="SubscriptionOTP Bot"
              description="A security-first OTP retrieval Telegram bot. Built with Python and python-telegram-bot, it connects securely to a dedicated mailbox via IMAP SSL protocols using email/imaplib, and monitors incoming messages from shared streaming accounts (Netflix, Disney+, Prime Video, Crunchyroll). It automatically processes mail bodies in-memory, extracts 4-to-6 digit verification OTPs via regular expressions, and delivers them instantly to active subscribers."
              ghLink="https://github.com/CeleHub/subscription-otp-bot"
              demoLink="https://t.me/SubscriptionOTPBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={reminderBot}
              isBlog={false}
              title="Reminder Bot"
              description="A lightweight productivity Telegram bot developed with Python, python-telegram-bot, and python-dotenv. Utilizing the built-in JobQueue scheduler, it allows users to configure automated reminders. It supports absolute daily alerts (e.g., /remind 08:40 Breakfast) or relative durations (e.g., /remind 10m Take a break) with error handling, dynamic job configuration, and multi-format duration parsing."
              ghLink="https://github.com/CeleHub/telegram-reminder-bot"
              demoLink="https://t.me/CelesteReminderBot"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={stemDb}
              isBlog={false}
              title="Stem DB"
              description="An educational STEM database explorer built with Python, Flask, and SQLite. It indexes chemical properties, biological taxonomies, and physics constants, offering students and educators a clean search UI to quickly find scientific datasets, formulae, and reference sheets."
              ghLink="https://github.com/CeleHub/stem-db"
              demoLink="https://stem-db-demo.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={cgpaChecker}
              isBlog={false}
              title="CGPA Checker"
              description="A responsive academic performance calculator built with React.js and CSS. It computes cumulative grade point averages (CGPA) and semester GPAs, charts performance trends, and enables students to input mock grades to simulate academic targets and plan semester workloads."
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
