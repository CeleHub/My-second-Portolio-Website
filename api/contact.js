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
    const { name, email, subject, message, altContacts } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields: Name, Email, and Message are required.",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        error: "Please enter a valid email address so I can get back to you.",
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

    // Parse and sanitize alternative contact methods if provided
    const formattedAltContacts = Array.isArray(altContacts)
      ? altContacts
          .filter((c) => c && typeof c.handle === "string" && c.handle.trim().length > 0)
          .map((c) => ({
            platform: String(c.platform || "Contact").trim().slice(0, 30),
            handle: String(c.handle).trim().slice(0, 100),
          }))
      : [];

    const escapeHtml = (text) => {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const altContactsHtml =
      formattedAltContacts.length > 0
        ? `
          <div style="background-color: #faf7fc; border: 1px solid #e9dff0; border-radius: 6px; padding: 12px 16px; margin-bottom: 28px; font-size: 14px; color: #334155;">
            <strong style="color: #623686;">Alternative Contact:</strong> ${formattedAltContacts
              .map(
                (c) =>
                  `${escapeHtml(c.platform)}: <strong>${escapeHtml(
                    c.handle
                  )}</strong>`
              )
              .join(" &bull; ")}
          </div>
        `
        : "";

    // 1. Deliver the notification to your inbox(es)
    // - From: [NAME] via your verified domain
    // - Subject: The actual subject from the form
    // - Reply-To: Client's direct email
    // - Body: Direct message body with subtle footer (thread-safe for replies)
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
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 0; color: #1e293b; line-height: 1.7;">
            <div style="white-space: pre-wrap; font-size: 16px; color: #0f172a; margin-bottom: 28px; line-height: 1.7;">${escapeHtml(message)}</div>
            ${altContactsHtml}
            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 13px; color: #94a3b8;">
              Sent via the contact form on <a href="https://www.celestineokonkwo.me" style="color: #623686; text-decoration: none; font-weight: 500;">celestineokonkwo.me</a>
            </div>
          </div>
        `,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API Error:", data);
      let userFriendlyError = "Unable to send your message right now. Please try again or reach out directly at celestine4321@gmail.com.";
      const msg = (data.message || "").toLowerCase();
      if (msg.includes("email") || msg.includes("reply_to")) {
        userFriendlyError = "Please enter a valid email address so I can get back to you.";
      }
      return res.status(resendResponse.status).json({
        error: userFriendlyError,
      });
    }

    // 2. Send an automated confirmation receipt back to the visitor
    // - From: Celestine Okonkwo <contact@celestineokonkwo.me>
    // - Subject: I have received your message, [NAME]
    // - Reply-To: Your primary inbox so if client replies, you receive it directly
    // - Body: Clean and direct acknowledgment starting with "Hi [NAME],"
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
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 0; color: #1e293b; line-height: 1.7;">
              <p style="font-size: 16px; color: #0f172a; margin: 0 0 16px 0;">
                Hi ${escapeHtml(cleanName)},
              </p>
              <p style="font-size: 15px; color: #334155; margin: 0 0 24px 0; line-height: 1.65;">
                This is an automated message acknowledging the contact form you just filled on my portfolio page. I have received your message and will get back to you shortly. Thank you for reaching out.
              </p>

              <div style="background-color: #faf7fc; border-left: 3px solid #8a49a8; padding: 18px 20px; border-radius: 4px; font-size: 15px; color: #334155; line-height: 1.65; white-space: pre-wrap; margin: 28px 0;">${escapeHtml(message)}</div>

              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9; line-height: 1.6;">
                <p style="margin: 0; color: #475569; font-size: 14px;">Warm regards,</p>
                <p style="margin: 4px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 700;">Celestine Okonkwo</p>
                <p style="margin: 0; color: #64748b; font-size: 13px;">Software Engineer</p>
                <p style="margin: 2px 0 0 0;">
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

    // 3. Dispatch Instant Mobile Alerts (Twilio WhatsApp & Telegram Bot)
    const alertPromises = [];

    // A. Twilio WhatsApp Alert
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.MY_WHATSAPP_NUMBER
    ) {
      alertPromises.push(
        (async () => {
          try {
            const twilioSid = process.env.TWILIO_ACCOUNT_SID.trim();
            const twilioToken = process.env.TWILIO_AUTH_TOKEN.trim();
            const twilioFrom = (
              process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886"
            ).trim();
            let twilioTo = process.env.MY_WHATSAPP_NUMBER.trim();
            if (!twilioTo.startsWith("whatsapp:")) {
              twilioTo = `whatsapp:${twilioTo}`;
            }

            let waBody = `🔔 *New Portfolio Message*\n\n*From:* ${cleanName}\n*Email:* ${email}\n*Subject:* ${
              cleanSubject || "General Inquiry"
            }`;
            if (formattedAltContacts.length > 0) {
              waBody += `\n*Alt Contact:* ${formattedAltContacts
                .map((c) => `${c.platform}: ${c.handle}`)
                .join(", ")}`;
            }
            waBody += `\n\n*Message:*\n${message}`;

            const params = new URLSearchParams();
            params.append("From", twilioFrom);
            params.append("To", twilioTo);
            params.append("Body", waBody);

            const twilioRes = await fetch(
              `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
              {
                method: "POST",
                headers: {
                  Authorization:
                    "Basic " +
                    Buffer.from(`${twilioSid}:${twilioToken}`).toString("base64"),
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
              }
            );

            if (!twilioRes.ok) {
              const twilioErr = await twilioRes.json();
              console.error("Twilio WhatsApp Error:", twilioErr);
            }
          } catch (twErr) {
            console.error("Twilio WhatsApp Dispatch Error:", twErr);
          }
        })()
      );
    }

    // B. Telegram Bot Alert
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      alertPromises.push(
        (async () => {
          try {
            const botToken = process.env.TELEGRAM_BOT_TOKEN.trim();
            const chatId = process.env.TELEGRAM_CHAT_ID.trim();

            let tgText = `🔔 <b>New Portfolio Message</b>\n\n<b>From:</b> ${escapeHtml(
              cleanName
            )}\n<b>Email:</b> ${escapeHtml(email)}\n<b>Subject:</b> ${escapeHtml(
              cleanSubject || "General Inquiry"
            )}`;
            if (formattedAltContacts.length > 0) {
              tgText += `\n<b>Alt Contact:</b> ${formattedAltContacts
                .map((c) => `${escapeHtml(c.platform)}: ${escapeHtml(c.handle)}`)
                .join(", ")}`;
            }
            tgText += `\n\n<b>Message:</b>\n${escapeHtml(message)}`;

            const tgRes = await fetch(
              `https://api.telegram.org/bot${botToken}/sendMessage`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: tgText,
                  parse_mode: "HTML",
                }),
              }
            );

            if (!tgRes.ok) {
              const tgErr = await tgRes.json();
              console.error("Telegram Bot Error:", tgErr);
            }
          } catch (tgErr) {
            console.error("Telegram Dispatch Error:", tgErr);
          }
        })()
      );
    }

    if (alertPromises.length > 0) {
      await Promise.allSettled(alertPromises);
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

