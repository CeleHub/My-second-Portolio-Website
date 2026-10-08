// Vercel Serverless Function to handle portfolio contact form via Resend API
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Only POST is accepted." });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields: Name, Email, and Message are required.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not configured.");
      return res.status(500).json({
        error: "Server email configuration error. RESEND_API_KEY is not set.",
      });
    }

    // Configurable recipient emails (comma-separated list, defaults to Celestine's email)
    const recipientEmails = (process.env.CONTACT_RECEIVER_EMAIL || "celestine4321@gmail.com")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    // Extract raw email address for dynamic sender formatting (e.g. contact@celestineokonkwo.me)
    const rawFromEmail = (process.env.RESEND_FROM_EMAIL || "contact@celestineokonkwo.me")
      .replace(/^.*<([^>]+)>.*$/, "$1")
      .trim();

    const cleanName = (name || "Visitor").replace(/[<>\r\n]/g, "").trim();
    const cleanSubject = subject ? subject.replace(/[\r\n]/g, "").trim() : "";

    const escapeHtml = (text) => {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // 1. Deliver the notification to your inbox(es)
    // - From: [NAME] via your verified domain
    // - Subject: The actual subject from the form
    // - Reply-To: Client's direct email
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${cleanName} <${rawFromEmail}>`,
        to: recipientEmails,
        reply_to: email,
        subject: cleanSubject || `New message from ${cleanName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
            <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; letter-spacing: -0.02em;">
                New message from ${escapeHtml(cleanName)}
              </h2>
              <p style="font-size: 13px; color: #64748b; margin: 0; font-weight: 500;">
                Received via celestineokonkwo.me
              </p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; width: 110px; font-weight: 600;">From:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${escapeHtml(cleanName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #623686; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Subject:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 500;">${escapeHtml(cleanSubject || "General Inquiry")}</td>
              </tr>
            </table>

            <div style="margin-top: 16px;">
              <p style="margin: 0 0 10px 0; color: #475569; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message body</p>
              <div style="background-color: #faf7fc; border: 1px solid #e9dff0; border-left: 4px solid #8a49a8; padding: 20px; border-radius: 6px; font-size: 15px; color: #1e293b; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>

            <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: right;">
              celestineokonkwo.me
            </div>
          </div>
        `,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API Error:", data);
      return res.status(resendResponse.status).json({
        error: data.message || "Failed to deliver email through Resend.",
      });
    }

    // 2. Send an automated confirmation receipt back to the visitor
    // - From: Celestine Okonkwo <contact@celestineokonkwo.me>
    // - Subject: I have received your message, [NAME]
    // - Reply-To: Your primary inbox so if client replies, you receive it directly
    try {
      const primaryInbox = recipientEmails[0] || "celestine4321@gmail.com";
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Celestine Okonkwo <${rawFromEmail}>`,
          to: [email],
          reply_to: primaryInbox,
          subject: `I have received your message, ${cleanName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
              <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px;">
                <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; letter-spacing: -0.02em;">
                  Thanks for reaching out!
                </h2>
                <p style="font-size: 13px; color: #64748b; margin: 0; font-weight: 500;">
                  Celestine Okonkwo &bull; celestineokonkwo.me
                </p>
              </div>

              <p style="color: #1e293b; font-size: 15px; line-height: 1.65; margin: 0 0 16px 0;">
                Hi ${escapeHtml(cleanName)},
              </p>
              <p style="color: #334155; font-size: 15px; line-height: 1.65; margin: 0 0 24px 0;">
                Thank you for contacting me through my portfolio website (<a href="https://www.celestineokonkwo.me" style="color: #623686; text-decoration: none; font-weight: 500;">celestineokonkwo.me</a>). I have received your message and will review it and get back to you shortly.
              </p>
              
              <div style="margin: 24px 0;">
                <p style="margin: 0 0 10px 0; color: #475569; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message body</p>
                <div style="background-color: #faf7fc; border: 1px solid #e9dff0; border-left: 4px solid #8a49a8; padding: 20px; border-radius: 6px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
              </div>

              <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
                <p style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0 0 2px 0;">
                  Celestine Okonkwo
                </p>
                <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0; font-weight: 500;">
                  Software Engineer
                </p>
                <p style="margin: 0;">
                  <a href="https://www.celestineokonkwo.me" style="color: #623686; font-size: 13px; text-decoration: none; font-weight: 500;">www.celestineokonkwo.me</a>
                </p>
              </div>
            </div>
          `,
        }),
      });
    } catch (autoReplyErr) {
      console.error("Non-fatal auto-reply error:", autoReplyErr);
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      id: data.id,
    });
  } catch (error) {
    console.error("Contact Form Server Error:", error);
    return res.status(500).json({
      error: "Internal server error while sending message.",
    });
  }
};

