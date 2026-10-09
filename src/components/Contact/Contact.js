import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Particle from "../Particle";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineClose,
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

  const [altContacts, setAltContacts] = useState([]);
  const [showAltContacts, setShowAltContacts] = useState(false);

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleToggleAltContacts = () => {
    if (!showAltContacts && altContacts.length === 0) {
      setAltContacts([{ id: Date.now(), platform: "WhatsApp", customPlatform: "", handle: "" }]);
    }
    setShowAltContacts((prev) => !prev);
  };

  const handleAddAltContact = () => {
    if (altContacts.length < 5) {
      setAltContacts((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), platform: "WhatsApp", customPlatform: "", handle: "" },
      ]);
    }
  };

  const handleRemoveAltContact = (id) => {
    setAltContacts((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length === 0) {
        setShowAltContacts(false);
      }
      return updated;
    });
  };

  const handleAltContactChange = (id, field, value) => {
    setAltContacts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side email validation so users get instant, friendly feedback
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter a valid email address so I can get back to you.",
      });
      return;
    }

    if (formData.name.trim().length < 2) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter your name (at least 2 characters).",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please enter a message with at least 10 characters.",
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    const formattedAltContacts = altContacts
      .filter((c) => c.handle && c.handle.trim().length > 0)
      .map((c) => ({
        platform: c.platform === "Other" ? (c.customPlatform.trim() || "Other") : c.platform,
        handle: c.handle.trim(),
      }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          altContacts: formattedAltContacts,
        }),
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
        setAltContacts([]);
        setShowAltContacts(false);
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || "Unable to send your message right now. Please try again or reach out directly via email.",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        submitting: false,
        success: false,
        error: "Unable to connect to the mail server. Please check your connection or reach out directly via email.",
      });
    }
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container style={{ position: "relative", zIndex: 5 }}>
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

              <div style={{ marginTop: "35px" }}>
                <h5 style={{ color: "white", marginBottom: "15px" }}>Connect on Socials</h5>
                <ul className="contact-social-links">
                  <li className="social-icons">
                    <a
                      href="https://wa.me/2349122651327"
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
                  Thanks for reaching out, I'll respond to you shortly.
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
                        minLength={2}
                        maxLength={60}
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
                        minLength={5}
                        maxLength={100}
                        className="contact-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Collapsible Alternative Contact Section */}
                <div className="mb-3">
                  {!showAltContacts ? (
                    <button
                      type="button"
                      className="contact-alt-toggle-btn"
                      onClick={handleToggleAltContacts}
                    >
                      <AiOutlinePlus style={{ marginRight: "5px" }} /> Add alternative contact method (WhatsApp, Telegram, etc.)
                    </button>
                  ) : (
                    <div className="contact-alt-box">
                      <div className="contact-alt-box-header">
                        <span className="contact-alt-box-title">
                          Alternative Contact Methods{" "}
                          <span className="contact-alt-box-optional">(Optional)</span>
                        </span>
                        <button
                          type="button"
                          className="contact-alt-close-btn"
                          onClick={() => setShowAltContacts(false)}
                          title="Hide alternative contacts"
                        >
                          <AiOutlineClose />
                        </button>
                      </div>

                      {altContacts.map((contact) => (
                        <div key={contact.id} className="contact-alt-row">
                          <Form.Select
                            className="contact-alt-select"
                            value={contact.platform}
                            onChange={(e) =>
                              handleAltContactChange(contact.id, "platform", e.target.value)
                            }
                          >
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Telegram">Telegram</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="X (Twitter)">X (Twitter)</option>
                            <option value="WeChat">WeChat</option>
                            <option value="Discord">Discord</option>
                            <option value="Phone">Phone</option>
                            <option value="Other">Other</option>
                          </Form.Select>

                          {contact.platform === "Other" && (
                            <Form.Control
                              type="text"
                              className="contact-input contact-alt-custom-input"
                              placeholder="Platform name"
                              maxLength={30}
                              value={contact.customPlatform}
                              onChange={(e) =>
                                handleAltContactChange(
                                  contact.id,
                                  "customPlatform",
                                  e.target.value
                                )
                              }
                            />
                          )}

                          <Form.Control
                            type="text"
                            className="contact-input contact-alt-input"
                            placeholder={
                              contact.platform === "WhatsApp" || contact.platform === "Phone"
                                ? "e.g. +234 912 265 1327"
                                : "e.g. @username or profile URL"
                            }
                            maxLength={100}
                            value={contact.handle}
                            onChange={(e) =>
                              handleAltContactChange(contact.id, "handle", e.target.value)
                            }
                          />

                          <button
                            type="button"
                            className="contact-alt-remove-btn"
                            onClick={() => handleRemoveAltContact(contact.id)}
                            title="Remove"
                          >
                            <AiOutlineClose />
                          </button>
                        </div>
                      ))}

                      {altContacts.length < 5 && (
                        <button
                          type="button"
                          className="contact-alt-add-btn"
                          onClick={handleAddAltContact}
                        >
                          <AiOutlinePlus style={{ marginRight: "4px" }} /> Add another platform
                        </button>
                      )}
                    </div>
                  )}
                </div>

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
                    maxLength={120}
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
                    minLength={10}
                    maxLength={4000}
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

