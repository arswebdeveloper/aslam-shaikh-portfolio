/**
 * ============================================================================
 * Google Apps Script: Aslam Shaikh Portfolio Contact & Auto-Reply Dispatcher
 * ============================================================================
 * 
 * 100% Free Forever Serverless Backend using Google's native infrastructure.
 * 
 * Dispatches TWO distinct emails:
 * 1. OWNER INQUIRY to shaikhaslame0@gmail.com (with full details from recruiter).
 * 2. AUTOMATED ACKNOWLEDGEMENT to the sender/recruiter (with subject "Thank You for Connecting – Aslam Shaikh").
 * ============================================================================
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var name = (data.name || "Colleague").trim();
    var senderEmail = (data.email || "").trim();
    var subject = (data.subject || "Portfolio Inquiry").trim();
    var message = (data.message || "").trim();
    var adminEmail = "shaikhaslame0@gmail.com";

    // Auto-correct common mobile keyboard typos (.co instead of .com)
    if (senderEmail.toLowerCase().endsWith("@gmail.co")) {
      senderEmail = senderEmail.slice(0, -3) + ".com";
    } else if (senderEmail.toLowerCase().endsWith("@yahoo.co")) {
      senderEmail = senderEmail.slice(0, -3) + ".com";
    } else if (senderEmail.toLowerCase().endsWith("@hotmail.co")) {
      senderEmail = senderEmail.slice(0, -3) + ".com";
    } else if (senderEmail.toLowerCase().endsWith("@outlook.co")) {
      senderEmail = senderEmail.slice(0, -3) + ".com";
    }

    if (!senderEmail || senderEmail.indexOf("@") === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Valid email is required." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // --------------------------------------------------------------------------
    // EMAIL 1: Sent to OWNER (Aslam) - Recruiter Inquiry Notification
    // --------------------------------------------------------------------------
    var ownerSubject = "[Portfolio Inquiry] " + subject + " - from " + name;
    var ownerBody = "New contact message received from your portfolio website:\n\n" +
      "Name: " + name + "\n" +
      "Email: " + senderEmail + "\n" +
      "Subject: " + subject + "\n\n" +
      "Message:\n" + message + "\n\n" +
      "---\n" +
      "Delivered via Google Apps Script Backend\n" +
      "Timestamp: " + new Date().toLocaleString();

    var ownerHtml = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">' +
      '<h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">New Portfolio Inquiry</h2>' +
      '<p><strong>From:</strong> ' + name + ' &lt;<a href="mailto:' + senderEmail + '">' + senderEmail + '</a>&gt;</p>' +
      '<p><strong>Subject:</strong> ' + subject + '</p>' +
      '<div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #334155;">' +
      message.replace(/\n/g, "<br>") +
      '</div>' +
      '<p style="font-size: 13px; color: #64748b; margin-bottom: 0;">Click Reply in Gmail to respond directly to ' + name + '.</p>' +
      '</div>';

    MailApp.sendEmail({
      to: adminEmail,
      replyTo: senderEmail,
      subject: ownerSubject,
      body: ownerBody,
      htmlBody: ownerHtml,
      name: "Portfolio Inquiry: " + name
    });

    // --------------------------------------------------------------------------
    // EMAIL 2: Sent to SENDER (Recruiter/Visitor) - Automated Acknowledgement
    // --------------------------------------------------------------------------
    var autoReplySubject = "Thank You for Connecting – Aslam Shaikh";
    var autoReplyText = "Dear " + name + ",\n\n" +
      "Thank you for reaching out through my portfolio website. I have received your message regarding:\n" +
      "\"" + subject + "\"\n\n" +
      "I appreciate your interest in connecting. As a Senior Software Developer & Full Stack .NET Engineer with 4.6+ years of experience engineering enterprise banking solutions, I review every incoming inquiry carefully and will get back to you promptly.\n\n" +
      "In the meantime, feel free to explore my background, enterprise projects, or download my latest resume:\n" +
      "• Portfolio: https://aslam-shaikh-portfolio.web.app\n" +
      "• LinkedIn: https://www.linkedin.com/in/aslam-shaikh-4497581bb\n" +
      "• GitHub: https://github.com/arswebdeveloper\n" +
      "• Direct Email: shaikhaslame0@gmail.com\n" +
      "• Phone / WhatsApp: +91 8104537679\n\n" +
      "Warm regards,\n" +
      "Aslam Rashid Shaikh\n" +
      "Senior Software Developer | Full Stack .NET Developer\n" +
      "Navi Mumbai, Maharashtra, India";

    var autoReplyHtml = '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 620px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; color: #1e293b;">' +
      '<div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">' +
      '<h2 style="color: #0f172a; margin: 0; font-size: 20px;">Thank You for Connecting</h2>' +
      '<span style="font-size: 13px; color: #64748b;">Aslam Rashid Shaikh &bull; Senior Software Developer | Full Stack .NET Developer</span>' +
      '</div>' +
      '<p>Dear <strong>' + name + '</strong>,</p>' +
      '<p>Thank you for reaching out through my portfolio website. I have received your message regarding: <em>"' + subject + '"</em>.</p>' +
      '<p>I appreciate your interest in connecting. As a Senior Software Developer with 4.6+ years of specialized experience engineering mission-critical banking systems for Tier-1 institutions, I review every incoming inquiry carefully and will get back to you promptly.</p>' +
      '<div style="background: #f1f5f9; padding: 16px 20px; border-radius: 10px; margin: 24px 0;">' +
      '<h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Explore My Profiles &amp; Work:</h4>' +
      '<ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #334155;">' +
      '<li><strong>Portfolio:</strong> <a href="https://aslam-shaikh-portfolio.web.app" style="color: #0284c7;">https://aslam-shaikh-portfolio.web.app</a></li>' +
      '<li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/aslam-shaikh-4497581bb" style="color: #0284c7;">linkedin.com/in/aslam-shaikh-4497581bb</a></li>' +
      '<li><strong>GitHub:</strong> <a href="https://github.com/arswebdeveloper" style="color: #0284c7;">github.com/arswebdeveloper</a></li>' +
      '<li><strong>Direct Email:</strong> <a href="mailto:shaikhaslame0@gmail.com" style="color: #0284c7;">shaikhaslame0@gmail.com</a></li>' +
      '<li><strong>Phone / WhatsApp:</strong> +91 8104537679</li>' +
      '</ul>' +
      '</div>' +
      '<p style="margin-bottom: 0;">Warm regards,<br>' +
      '<strong>Aslam Rashid Shaikh</strong><br>' +
      '<span style="color: #64748b; font-size: 13px;">Senior Software Developer | Full Stack .NET Developer<br>Navi Mumbai, Maharashtra, India</span></p>' +
      '</div>';

    MailApp.sendEmail({
      to: senderEmail,
      replyTo: adminEmail,
      subject: autoReplySubject,
      body: autoReplyText,
      htmlBody: autoReplyHtml,
      name: "Aslam Rashid Shaikh"
    });

    // --------------------------------------------------------------------------
    // 3. PERSIST INQUIRY IN CLOUD STORE FOR ADMIN INBOX DASHBOARD
    // --------------------------------------------------------------------------
    try {
      var scriptProps = PropertiesService.getScriptProperties();
      var rawInbox = scriptProps.getProperty("ASLAM_INBOX_STORE") || "[]";
      var inboxList = [];
      try { inboxList = JSON.parse(rawInbox); } catch (pe) { inboxList = []; }
      var newEntry = {
        id: "msg_" + new Date().getTime(),
        name: name,
        email: senderEmail,
        subject: subject,
        message: message,
        date: new Date().toISOString()
      };
      inboxList.unshift(newEntry);
      if (inboxList.length > 50) inboxList = inboxList.slice(0, 50); // Store up to 50 latest inquiries
      scriptProps.setProperty("ASLAM_INBOX_STORE", JSON.stringify(inboxList));
    } catch (saveErr) {
      console.warn("Storage warning: " + saveErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Dual emails dispatched.",
        ownerRecipient: adminEmail,
        senderRecipient: senderEmail
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests to fetch or clear the Recruiter Inquiries Inbox centrally
 * Supports both JSON and JSONP (via ?callback=...) to completely bypass CORS restrictions in modern browsers.
 */
function doGet(e) {
  try {
    var params = (e && e.parameter) || {};
    var action = params.action || "getInbox";
    var callback = params.callback || null;
    var scriptProps = PropertiesService.getScriptProperties();

    if (action === "clearInbox") {
      scriptProps.deleteProperty("ASLAM_INBOX_STORE");
      var clearResp = JSON.stringify({ status: "success", message: "Inbox cleared successfully." });
      if (callback) {
        return ContentService.createTextOutput(callback + "(" + clearResp + ")")
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      return ContentService.createTextOutput(clearResp).setMimeType(ContentService.MimeType.JSON);
    }

    var rawInbox = scriptProps.getProperty("ASLAM_INBOX_STORE") || "[]";
    var inboxList = [];
    try { inboxList = JSON.parse(rawInbox); } catch (err) { inboxList = []; }

    var responseData = {
      status: "success",
      count: inboxList.length,
      inbox: inboxList
    };
    var jsonText = JSON.stringify(responseData);

    if (callback) {
      return ContentService.createTextOutput(callback + "(" + jsonText + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(jsonText).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errText = JSON.stringify({ status: "error", message: err.toString() });
    if (e && e.parameter && e.parameter.callback) {
      return ContentService.createTextOutput(e.parameter.callback + "(" + errText + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(errText).setMimeType(ContentService.MimeType.JSON);
  }
}
