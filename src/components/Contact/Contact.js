import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Particle from "../Particle";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineMessage,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import {
  FaLinkedinIn,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import XIcon from "../XIcon";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || "Failed to send message. Please try again or reach out directly via email.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        submitting: false,
        success: false,
        error: "Unable to connect to the mail server. Please try again or email me directly.",
      });
    }
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Get In <strong className="purple">Touch</strong>
        </h1>
        <p style={{ color: "white", marginBottom: "40px" }}>
          Have a project in mind, an exciting role, or just want to connect? My inbox is always open!
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {/* Left Column: Direct Info & Socials */}
          <Col md={5} className="contact-info-col">
            <div className="contact-card">
              <h3 className="contact-card-title">Let's Talk</h3>
              <p className="contact-card-desc">
                I'm actively open to full-time opportunities, engineering contracts, and interesting collaborations.
              </p>

              <div className="contact-badge">
                <span className="pulse-indicator"></span>
                <span>Available for new opportunities</span>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <AiOutlineMail />
                </div>
                <div>
                  <div className="contact-detail-label">Email</div>
                  <a href="mailto:celestine4321@gmail.com" className="contact-detail-value">
                    celestine4321@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-value">Lagos, Nigeria</div>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <FaWhatsapp />
                </div>
                <div>
                  <div className="contact-detail-label">WhatsApp</div>
                  <a
                    href="https://wa.me/2349122651327"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-detail-value"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <FaTelegramPlane />
                </div>
                <div>
                  <div className="contact-detail-label">Telegram</div>
                  <a
                    href="https://t.me/jesuiscelestine"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-detail-value"
                  >
                    @jesuiscelestine
                  </a>
                </div>
              </div>

              <div style={{ marginTop: "35px" }}>
                <h5 style={{ color: "white", marginBottom: "15px" }}>Connect on Socials</h5>
                <ul className="contact-social-links">
                  <li className="social-icons">
                    <a
                      href="https://github.com/CeleHub"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <AiFillGithub />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://x.com/jesuiscelestine"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <XIcon />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://www.linkedin.com/in/celestine-okonkwo-37311b255/"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://www.instagram.com/jesuiscelestine_/"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <AiFillInstagram />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://wa.me/2348123456789"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <FaWhatsapp />
                    </a>
                  </li>
                  <li className="social-icons">
                    <a
                      href="https://t.me/jesuiscelestine"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
                    >
                      <FaTelegramPlane />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          {/* Right Column: Contact Form */}
          <Col md={7} className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="contact-card-title">Send A Message</h3>

              {status.success && (
                <Alert variant="success" className="contact-alert">
                  <strong>Success!</strong> Your message has been sent directly to my inbox. I'll get back to you shortly!
                </Alert>
              )}

              {status.error && (
                <Alert variant="danger" className="contact-alert">
                  {status.error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label className="contact-label">
                        <AiOutlineUser style={{ marginRight: "6px" }} /> Your Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="contact-input"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="contact-label">
                        <AiOutlineMail style={{ marginRight: "6px" }} /> Your Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="contact-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label className="contact-label">
                    <MdSubject style={{ marginRight: "6px" }} /> Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="contact-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMessage">
                  <Form.Label className="contact-label">
                    <AiOutlineMessage style={{ marginRight: "6px" }} /> Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Celestine, I came across your portfolio and wanted to reach out regarding..."
                    required
                    className="contact-input"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={status.submitting}
                  className="contact-submit-btn"
                >
                  <FaPaperPlane style={{ marginRight: "8px" }} />
                  {status.submitting ? "Sending Message..." : "Send Message"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;

