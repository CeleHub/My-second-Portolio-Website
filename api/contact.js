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

    const senderEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <contact@celestineokonkwo.me>";

    const escapeHtml = (text) => {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // 1. Deliver the message to your inbox(es)
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: recipientEmails,
        reply_to: email,
        subject: `[Portfolio Contact] ${subject || "New Message from " + name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="border-bottom: 2px solid #8a49a8; padding-bottom: 15px; margin-bottom: 20px;">
              <h2 style="color: #623686; margin: 0;">New Message from Portfolio Website</h2>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Received via celestineokonkwo.me</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #555; width: 80px; font-weight: bold;">From:</td>
                <td style="padding: 8px 0; color: #222;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #222;"><a href="mailto:${escapeHtml(email)}" style="color: #8a49a8;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #555; font-weight: bold;">Subject:</td>
                <td style="padding: 8px 0; color: #222;">${escapeHtml(subject || "No Subject")}</td>
              </tr>
            </table>

            <div style="background-color: #f7f4fa; border-left: 4px solid #8a49a8; padding: 15px; border-radius: 4px; margin-top: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #444; font-size: 15px;">Message Content:</h4>
              <p style="white-space: pre-wrap; margin: 0; color: #222; line-height: 1.6;">${escapeHtml(message)}</p>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
              You can hit 'Reply' to respond directly to ${escapeHtml(email)}.
            </p>
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
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [email],
          subject: `Thanks for reaching out, ${name}! - Celestine Okonkwo`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <div style="border-bottom: 2px solid #8a49a8; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="color: #623686; margin: 0;">Thanks for reaching out!</h2>
              </div>
              <p style="color: #333; font-size: 15px; line-height: 1.6;">Hi ${escapeHtml(name)},</p>
              <p style="color: #333; font-size: 15px; line-height: 1.6;">
                Thank you for contacting me through my portfolio website (<a href="https://www.celestineokonkwo.me" style="color: #8a49a8; text-decoration: none;">celestineokonkwo.me</a>). I have received your message and will review it and get back to you shortly.
              </p>
              
              <div style="background-color: #f7f4fa; border-left: 4px solid #8a49a8; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0; color: #555; font-size: 13px; font-weight: bold;">Summary of what you sent:</p>
                <p style="margin: 6px 0 0 0; color: #333; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <p style="color: #444; font-size: 14px; line-height: 1.6; margin-top: 25px;">
                Warm regards,<br />
                <strong style="color: #623686; font-size: 16px;">Celestine Okonkwo</strong><br />
                <span style="color: #777; font-size: 13px;">Software Engineer</span><br />
                <a href="https://www.celestineokonkwo.me" style="color: #8a49a8; font-size: 13px; text-decoration: none;">www.celestineokonkwo.me</a>
              </p>
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

