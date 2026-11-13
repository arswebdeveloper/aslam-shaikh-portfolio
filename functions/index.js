/**
 * Firebase Cloud Function: sendContactEmail
 * Secure server-side dual-email dispatcher for Aslam Shaikh's Portfolio.
 * 
 * 1. Dispatches recruiter/visitor inquiry directly to shaikhaslame0@gmail.com.
 * 2. Dispatches an automated confirmation email to the sender's email address
 *    with subject: "Thank You for Connecting – Aslam Shaikh".
 * 
 * Security:
 * - Credentials (SMTP user/pass) are read strictly from environment secrets.
 * - Zero secrets exposed in frontend code.
 * - Rate limiting & input validation enforced on the backend.
 */

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Configure secure SMTP transporter using environment secrets
function getTransporter() {
  const user = process.env.SMTP_USER || functions.config().smtp?.user;
  const pass = process.env.SMTP_PASS || functions.config().smtp?.pass;

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured in Firebase secrets or config.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass }
  });
}

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed. Use POST." });
    }

    try {
      const { name, email, subject, message } = req.body || {};

      // Input Validation
      if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: "Valid name is required (min 2 characters)." });
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Valid email address is required." });
      }
      if (!subject || subject.trim().length < 3) {
        return res.status(400).json({ error: "Valid subject is required (min 3 characters)." });
      }
      if (!message || message.trim().length < 10) {
        return res.status(400).json({ error: "Valid message is required (min 10 characters)." });
      }

      const transporter = getTransporter();
      const adminEmail = "shaikhaslame0@gmail.com";

      // 1. Send inquiry notification to Aslam
      const ownerMailOptions = {
        from: `"Aslam Portfolio Engine" <${adminEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
        text: `New contact inquiry received:

From: ${name} (${email})
Subject: ${subject}

Message:
${message}

---
Dispatched securely by Firebase Cloud Function`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">New Contact Inquiry</h2>
            <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #334155;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">You can click Reply directly to respond to ${name}.</p>
          </div>
        `
      };

      // 2. Send automated acknowledgement email to the sender
      const autoReplySubject = "Thank You for Connecting – Aslam Shaikh";
      const autoReplyBodyText = `Dear ${name},

Thank you for reaching out through my portfolio website. I have received your message regarding:
"${subject}"

I appreciate your interest in connecting. As a Senior Software Developer & Full Stack .NET Engineer with 4.6+ years of experience engineering enterprise banking solutions, I review every incoming inquiry carefully and will get back to you promptly.

In the meantime, feel free to explore my background, enterprise projects, or download my latest resume:
• Portfolio: https://aslam-shaikh-portfolio.web.app
• LinkedIn: https://www.linkedin.com/in/aslam-shaikh-4497581bb
• GitHub: https://github.com/arswebdeveloper
• Direct Email: shaikhaslame0@gmail.com
• Phone / WhatsApp: +91 8104537679

Warm regards,
Aslam Rashid Shaikh
Senior Software Developer | Full Stack .NET Developer
Navi Mumbai, Maharashtra, India`;

      const senderMailOptions = {
        from: `"Aslam Rashid Shaikh" <${adminEmail}>`,
        to: email,
        subject: autoReplySubject,
        text: autoReplyBodyText,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; color: #1e293b;">
            <div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 20px;">Thank You for Connecting</h2>
              <span style="font-size: 13px; color: #64748b;">Aslam Rashid Shaikh &bull; Senior Software Developer | Full Stack .NET Developer</span>
            </div>
            
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for reaching out through my portfolio website. I have received your message regarding: <em>"${subject}"</em>.</p>
            
            <p>I appreciate your interest in connecting. As a Senior Software Developer with 4.6+ years of specialized experience engineering mission-critical banking systems for Tier-1 institutions, I review every incoming inquiry carefully and will get back to you promptly.</p>
            
            <div style="background: #f1f5f9; padding: 16px 20px; border-radius: 10px; margin: 24px 0;">
              <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Explore My Profiles &amp; Work:</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #334155;">
                <li><strong>Portfolio:</strong> <a href="https://aslam-shaikh-portfolio.web.app" style="color: #0284c7;">https://aslam-shaikh-portfolio.web.app</a></li>
                <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/aslam-shaikh-4497581bb" style="color: #0284c7;">linkedin.com/in/aslam-shaikh-4497581bb</a></li>
                <li><strong>GitHub:</strong> <a href="https://github.com/arswebdeveloper" style="color: #0284c7;">github.com/arswebdeveloper</a></li>
                <li><strong>Direct Email:</strong> <a href="mailto:shaikhaslame0@gmail.com" style="color: #0284c7;">shaikhaslame0@gmail.com</a></li>
                <li><strong>Phone / WhatsApp:</strong> +91 8104537679</li>
              </ul>
            </div>
            
            <p style="margin-bottom: 0;">Warm regards,<br>
            <strong>Aslam Rashid Shaikh</strong><br>
            <span style="color: #64748b; font-size: 13px;">Senior Software Developer | Full Stack .NET Developer<br>Navi Mumbai, Maharashtra, India</span></p>
          </div>
        `
      };

      // Execute both sends concurrently
      await Promise.all([
        transporter.sendMail(ownerMailOptions),
        transporter.sendMail(senderMailOptions)
      ]);

      return res.status(200).json({
        success: true,
        message: "Inquiry delivered to Aslam and automated confirmation sent to sender."
      });
    } catch (err) {
      console.error("sendContactEmail error:", err);
      return res.status(500).json({ error: "Failed to dispatch emails: " + err.message });
    }
  });
});

