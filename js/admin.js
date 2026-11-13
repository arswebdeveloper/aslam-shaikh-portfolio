/**
 * Admin Dashboard Engine
 * Aslam Rashid Shaikh - Portfolio Administration
 */

(function () {
  "use strict";

  const config = window.getActivePortfolioData ? window.getActivePortfolioData() : window.PORTFOLIO_DATA;
  const AUTHORIZED_EMAIL = "shaikhaslame0@gmail.com";
  const PASSWORD_SALT = "aslam_secure_salt_2026_";
  // Cryptographic SHA-256 one-way hash of default password with salt
  const DEFAULT_PASSWORD_HASH = "77986e092c1d021f0a21ef1b12c7d33ad8d5741de9ba40471c58fe724308c24d";

  // Web Crypto SHA-256 hashing helper
  async function hashPassword(pass) {
    const encoder = new TextEncoder();
    const data = encoder.encode(PASSWORD_SALT + pass);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function getStoredPasswordHash() {
    return localStorage.getItem("aslam_admin_pass_hash") || DEFAULT_PASSWORD_HASH;
  }

  // DOM Elements
  const authSection = document.getElementById("auth-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const loginForm = document.getElementById("admin-login-form");
  const loginEmailInput = document.getElementById("login-email");
  const loginPasswordInput = document.getElementById("login-password");
  const authAlert = document.getElementById("auth-alert");
  const logoutBtn = document.getElementById("admin-logout-btn");
  const updatePasswordTriggerBtn = document.getElementById("update-password-trigger");
  const toggleLoginPassBtn = document.getElementById("toggle-login-pass-btn");

  // Forgot Password Elements
  const forgotPasswordTrigger = document.getElementById("forgot-password-trigger");
  const forgotPasswordDialog = document.getElementById("forgot-password-dialog");
  const closeForgotPassModalBtn = document.getElementById("close-forgot-pass-modal");
  const forgotAlert = document.getElementById("forgot-alert");
  const forgotStep1 = document.getElementById("forgot-step-1");
  const forgotStep2 = document.getElementById("forgot-step-2");
  const sendResetCodeBtn = document.getElementById("send-reset-code-btn");
  const resetOtpInput = document.getElementById("reset-otp-input");
  const resetNewPassInput = document.getElementById("reset-new-pass");
  const resetConfirmPassInput = document.getElementById("reset-confirm-pass");

  // Update Password Elements
  const updatePasswordDialog = document.getElementById("update-password-dialog");
  const closeUpdatePassModalBtn = document.getElementById("close-update-pass-modal");
  const updatePassAlert = document.getElementById("update-pass-alert");
  const updatePasswordForm = document.getElementById("update-password-form");
  const currentPassInput = document.getElementById("current-pass-input");
  const newPassInput = document.getElementById("new-pass-input");
  const confirmNewPassInput = document.getElementById("confirm-new-pass-input");

  // Resume Management Elements
  const resumeDropzone = document.getElementById("resume-dropzone");
  const resumeFileInput = document.getElementById("resume-file-input");
  const resumeProgressBar = document.getElementById("resume-progress-bar");
  const resumeProgressContainer = document.getElementById("resume-progress-container");
  const resumeAlert = document.getElementById("resume-alert");
  const currentResumeNameEl = document.getElementById("current-resume-name");
  const currentResumeDateEl = document.getElementById("current-resume-date");
  const previewResumeBtn = document.getElementById("preview-resume-btn");
  const downloadResumeBtn = document.getElementById("download-resume-btn");
  const revertResumeBtn = document.getElementById("revert-resume-btn");
  const pdfPreviewContainer = document.getElementById("pdf-preview-container");
  const pdfPreviewIframe = document.getElementById("pdf-preview-iframe");

  // Availability & Settings Elements
  const availabilityToggle = document.getElementById("availability-toggle");
  const availabilityTextInput = document.getElementById("availability-text-input");
  const saveAvailabilityBtn = document.getElementById("save-availability-btn");
  const settingsAlert = document.getElementById("settings-alert");

  // Email & Gateway Elements
  const gasWebhookUrlInput = document.getElementById("gas-webhook-url");
  const copyGasCodeBtn = document.getElementById("copy-gas-code-btn");
  const testEmailBtn = document.getElementById("test-email-btn");
  const testEmailStatus = document.getElementById("test-email-status");
  const emailSettingsAlert = document.getElementById("email-settings-alert");
  const emailjsServiceIdInput = document.getElementById("emailjs-service-id");
  const emailjsTemplateIdInput = document.getElementById("emailjs-template-id");
  const emailjsPublicKeyInput = document.getElementById("emailjs-public-key");
  const saveEmailjsBtn = document.getElementById("save-emailjs-btn");

  // Inbox Elements
  const inboxListEl = document.getElementById("inbox-list");
  const inboxCountEl = document.getElementById("inbox-count");
  const clearInboxBtn = document.getElementById("clear-inbox-btn");
  const refreshInboxBtn = document.getElementById("refresh-inbox-btn");
  const inboxSyncAlert = document.getElementById("inbox-sync-alert");

  // Firebase Config Elements
  const fbApiKeyInput = document.getElementById("fb-api-key");
  const fbProjectIdInput = document.getElementById("fb-project-id");
  const fbStorageBucketInput = document.getElementById("fb-storage-bucket");
  const saveFirebaseBtn = document.getElementById("save-firebase-btn");
  const firebaseStatusPill = document.getElementById("firebase-status-pill");

  let currentAdminUser = null;
  let activeResumeUrl = config.profile.defaultResumeUrl || "assets/Aslam_Shaikh_Resume.pdf";
  let activeResumeName = config.profile.defaultResumeName || "Aslam_Shaikh_Senior_DotNet_Resume.pdf";
  let previousResumeUrl = null;

  // Firebase SDK instances
  let fbAuth = null;
  let fbStorage = null;
  let fbFirestore = null;

  // Initialize Firebase if credentials exist
  function initFirebase() {
    const fbConf = config.firebase && config.firebase.config;
    if (fbConf && fbConf.apiKey && typeof firebase !== "undefined") {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(fbConf);
        }
        fbAuth = firebase.auth();
        fbStorage = firebase.storage();
        fbFirestore = firebase.firestore();

        if (firebaseStatusPill) {
          firebaseStatusPill.className = "status-pill online";
          firebaseStatusPill.textContent = "Firebase Connected";
        }

        // Listen to Auth State
        fbAuth.onAuthStateChanged(user => {
          if (user) {
            if (user.email.toLowerCase() === AUTHORIZED_EMAIL.toLowerCase()) {
              handleLoginSuccess(user);
            } else {
              showAuthAlert("Access Denied: Only " + AUTHORIZED_EMAIL + " is authorized.", "error");
              fbAuth.signOut();
            }
          } else {
            handleLogoutState();
          }
        });
        return;
      } catch (e) {
        console.warn("Firebase initialization skipped:", e);
      }
    }

    if (firebaseStatusPill) {
      firebaseStatusPill.className = "status-pill offline";
      firebaseStatusPill.textContent = "Local Mode";
    }
  }

  // Check existing session (e.g. from local storage)
  function checkSession() {
    const session = localStorage.getItem("aslam_admin_session");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.email && parsed.email.toLowerCase() === AUTHORIZED_EMAIL.toLowerCase()) {
          handleLoginSuccess(parsed);
          return;
        }
      } catch (e) {}
    }
    handleLogoutState();
  }

  function handleLoginSuccess(user) {
    currentAdminUser = user;
    if (authSection) authSection.style.display = "none";
    if (dashboardSection) dashboardSection.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "inline-flex";
    if (updatePasswordTriggerBtn) updatePasswordTriggerBtn.style.display = "inline-flex";
    loadDashboardData();
  }

  function handleLogoutState() {
    currentAdminUser = null;
    if (authSection) authSection.style.display = "flex";
    if (dashboardSection) dashboardSection.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (updatePasswordTriggerBtn) updatePasswordTriggerBtn.style.display = "none";
  }

  function showAuthAlert(msg, type = "error") {
    if (!authAlert) return;
    authAlert.textContent = msg;
    authAlert.className = `admin-alert ${type}`;
    authAlert.style.display = "block";
  }

  function showResumeAlert(msg, type = "success") {
    if (!resumeAlert) return;
    resumeAlert.textContent = msg;
    resumeAlert.className = `admin-alert ${type}`;
    resumeAlert.style.display = "block";
  }

  function showSettingsAlert(msg, type = "success") {
    if (!settingsAlert) return;
    settingsAlert.textContent = msg;
    settingsAlert.className = `admin-alert ${type}`;
    settingsAlert.style.display = "block";
  }

  // Load and Populate Dashboard Data
  function loadDashboardData() {
    // Read saved custom overrides
    let custom = {};
    try {
      const saved = localStorage.getItem("aslam_portfolio_custom_config");
      if (saved) custom = JSON.parse(saved);
    } catch (e) {}

    activeResumeUrl = custom.resumeUrl || config.profile.defaultResumeUrl || "assets/Aslam_Shaikh_Resume.pdf";
    activeResumeName = custom.resumeName || config.profile.defaultResumeName || "Aslam_Shaikh_Senior_DotNet_Resume.pdf";
    previousResumeUrl = custom.previousResumeUrl || null;

    if (currentResumeNameEl) currentResumeNameEl.textContent = activeResumeName;
    if (currentResumeDateEl) {
      currentResumeDateEl.textContent = custom.resumeUpdatedAt
        ? new Date(custom.resumeUpdatedAt).toLocaleString()
        : "Initial base version";
    }

    if (downloadResumeBtn) {
      downloadResumeBtn.href = activeResumeUrl;
      downloadResumeBtn.setAttribute("download", activeResumeName);
    }

    if (revertResumeBtn) {
      revertResumeBtn.style.display = previousResumeUrl ? "inline-flex" : "none";
    }

    // Availability
    const isAvail = typeof custom.available === "boolean" ? custom.available : config.profile.available;
    if (availabilityToggle) availabilityToggle.checked = isAvail;
    if (availabilityTextInput) {
      availabilityTextInput.value = custom.availabilityText || config.profile.availabilityText || "Available for Senior .NET / Full Stack Roles";
    }

    // Email Gateway (Google Apps Script & EmailJS)
    if (gasWebhookUrlInput) {
      gasWebhookUrlInput.value = custom.gasWebhookUrl || (config.email && config.email.gasWebhookUrl) || "";
    }
    const ejs = custom.emailjs || config.emailjs || {};
    if (emailjsServiceIdInput) emailjsServiceIdInput.value = ejs.serviceId || "service_pbmmpmp";
    if (emailjsTemplateIdInput) emailjsTemplateIdInput.value = ejs.templateId || "";
    if (emailjsPublicKeyInput) emailjsPublicKeyInput.value = ejs.publicKey || "";

    // Firebase
    const fbc = custom.firebaseConfig || (config.firebase && config.firebase.config) || {};
    if (fbApiKeyInput) fbApiKeyInput.value = fbc.apiKey || "";
    if (fbProjectIdInput) fbProjectIdInput.value = fbc.projectId || "my-portfolio-website-4f201";
    if (fbStorageBucketInput) fbStorageBucketInput.value = fbc.storageBucket || "my-portfolio-website-4f201.appspot.com";

    // Recruiter Inbox
    renderInbox();
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function updateInboxDOM(messages) {
    if (!inboxListEl) return;
    if (inboxCountEl) inboxCountEl.textContent = messages.length;
    if (clearInboxBtn) clearInboxBtn.style.display = messages.length > 0 ? "inline-flex" : "none";

    if (!messages.length) {
      inboxListEl.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--admin-dim); font-size: 0.9rem;">
          No recruiter messages recorded yet. Any submissions from your "Let's Connect" form will be stored here.
        </div>
      `;
      return;
    }

    inboxListEl.innerHTML = messages
      .map(
        msg => `
      <div style="padding: 16px 20px; border-radius: 12px; background: rgba(10, 15, 30, 0.6); border: 1px solid var(--admin-border); display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
          <div>
            <strong style="color: #fff; font-size: 1rem;">${escapeHtml(msg.name)}</strong>
            <span style="color: var(--admin-cyan-bright); font-size: 0.88rem; margin-left: 8px;">&lt;${escapeHtml(msg.email)}&gt;</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--admin-dim);">${new Date(msg.date).toLocaleString()}</span>
        </div>
        <div style="font-weight: 600; color: #cbd5e1; font-size: 0.92rem;">Subject: ${escapeHtml(msg.subject)}</div>
        <p style="color: var(--admin-muted); font-size: 0.9rem; white-space: pre-wrap; margin: 4px 0 10px;">${escapeHtml(msg.message)}</p>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a href="mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent("Re: " + msg.subject)}" class="btn btn-primary btn-sm">
            Reply via Email &rarr;
          </a>
          <button class="btn btn-danger btn-sm delete-inbox-item-btn" data-id="${msg.id}">
            Delete
          </button>
        </div>
      </div>
    `
      )
      .join("");

    // Setup delete buttons
    inboxListEl.querySelectorAll(".delete-inbox-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let msgs = JSON.parse(localStorage.getItem("aslam_recruiter_inbox") || "[]");
        msgs = msgs.filter(m => m.id !== id);
        localStorage.setItem("aslam_recruiter_inbox", JSON.stringify(msgs));
        updateInboxDOM(msgs);
      });
    });
  }

  // JSONP requester - bypasses browser CORS restrictions for Google Apps Script Web Apps
  function fetchGasJsonp(url, params = {}, timeoutMs = 8000) {
    return new Promise((resolve, reject) => {
      const cbName = "gas_cb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
      const script = document.createElement("script");
      let timer = null;

      function cleanup() {
        if (timer) clearTimeout(timer);
        try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
      }

      window[cbName] = function (data) {
        cleanup();
        resolve(data);
      };

      timer = setTimeout(() => {
        cleanup();
        reject(new Error("Timeout waiting for Google Apps Script response"));
      }, timeoutMs);

      script.onerror = function () {
        cleanup();
        reject(new Error("Network or script error reaching Google Apps Script Web App"));
      };

      const queryParts = [];
      for (const [k, v] of Object.entries(params)) {
        queryParts.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
      queryParts.push("callback=" + cbName);
      queryParts.push("t=" + Date.now());

      const sep = url.includes("?") ? "&" : "?";
      script.src = url + sep + queryParts.join("&");
      document.head.appendChild(script);
    });
  }

  async function renderInbox(forceSync = false) {
    if (!inboxListEl) return;
    let localMessages = [];
    try {
      localMessages = JSON.parse(localStorage.getItem("aslam_recruiter_inbox") || "[]");
    } catch (e) {}

    // 1. Instantly render local messages so UI is immediately responsive
    updateInboxDOM(localMessages);

    // 2. Fetch live messages from Google Apps Script centralized cloud storage
    const gasUrl = (gasWebhookUrlInput && gasWebhookUrlInput.value.trim()) ||
      (config.gasWebhookUrl) ||
      (function () {
        try {
          const saved = JSON.parse(localStorage.getItem("aslam_portfolio_custom_config") || "{}");
          return saved.gasWebhookUrl || "";
        } catch (e) {
          return "";
        }
      })() || "https://script.google.com/macros/s/AKfycbyXNo-CBwCWhQA17ro2mtDAm45qQRQZvDZK_sQt1uNdtRwtXm0oaFoRtHZHS0b0u1-b/exec";

    if (gasUrl) {
      if (refreshInboxBtn && forceSync) {
        refreshInboxBtn.disabled = true;
        refreshInboxBtn.textContent = "🔄 Syncing...";
      }
      try {
        let data = null;
        try {
          // JSONP request - completely exempt from browser CORS policy
          data = await fetchGasJsonp(gasUrl, { action: "getInbox" }, 7000);
        } catch (jsonpErr) {
          // Handled gracefully without CORS error or uncaught exceptions
        }

        if (data && data.status === "success" && Array.isArray(data.inbox)) {
          if (inboxSyncAlert) inboxSyncAlert.style.display = "none";

          // Deduplicate incoming messages against local messages
          const map = new Map();
          data.inbox.forEach(m => {
            const key = m.id || (m.email + "_" + m.date + "_" + m.subject);
            map.set(key, m);
          });
          localMessages.forEach(m => {
            const key = m.id || (m.email + "_" + m.date + "_" + m.subject);
            if (!map.has(key)) {
              map.set(key, m);
            }
          });
          const merged = Array.from(map.values()).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
          localStorage.setItem("aslam_recruiter_inbox", JSON.stringify(merged.slice(0, 50)));
          updateInboxDOM(merged);
        } else if (forceSync) {
          if (inboxSyncAlert) {
            inboxSyncAlert.className = "admin-alert info";
            inboxSyncAlert.style.display = "block";
            inboxSyncAlert.innerHTML = `
              <strong>Google Apps Script Setup Needed:</strong> To sync inquiries centrally across devices, please make sure your Google Apps Script has the latest <code>Code.gs</code> code and is deployed as a <strong>New version</strong> (Deploy &rarr; Manage deployments &rarr; Edit &rarr; Version: New version &rarr; Deploy).
            `;
          }
        }
      } catch (err) {
        console.warn("Inbox sync notice:", err);
      } finally {
        if (refreshInboxBtn) {
          refreshInboxBtn.disabled = false;
          refreshInboxBtn.textContent = "🔄 Refresh Inbox";
        }
      }
    }
  }

  // Hook up manual refresh button
  if (refreshInboxBtn) {
    refreshInboxBtn.addEventListener("click", () => {
      renderInbox(true);
    });
  }

  // Clear all inbox messages
  if (clearInboxBtn) {
    clearInboxBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to clear all recruiter messages from the inbox?")) {
        localStorage.removeItem("aslam_recruiter_inbox");
        updateInboxDOM([]);

        const gasUrl = (gasWebhookUrlInput && gasWebhookUrlInput.value.trim()) ||
          (config.gasWebhookUrl) ||
          "https://script.google.com/macros/s/AKfycbyXNo-CBwCWhQA17ro2mtDAm45qQRQZvDZK_sQt1uNdtRwtXm0oaFoRtHZHS0b0u1-b/exec";
        if (gasUrl) {
          try {
            await fetchGasJsonp(gasUrl, { action: "clearInbox" }, 5000);
          } catch (e) {
            try {
              fetch(gasUrl + (gasUrl.includes("?") ? "&" : "?") + "action=clearInbox&t=" + Date.now(), { mode: "no-cors" });
            } catch (ignore) {}
          }
        }
      }
    });
  }

  // Toggle Login Password Visibility
  if (toggleLoginPassBtn && loginPasswordInput) {
    toggleLoginPassBtn.addEventListener("click", () => {
      const isPass = loginPasswordInput.type === "password";
      loginPasswordInput.type = isPass ? "text" : "password";
      toggleLoginPassBtn.textContent = isPass ? "🔒" : "👁️";
    });
  }

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = loginEmailInput.value.trim();
      const password = loginPasswordInput.value.trim();

      // Clear email and password fields immediately after submit
      if (loginEmailInput) loginEmailInput.value = "";
      if (loginPasswordInput) loginPasswordInput.value = "";

      // Strict Administrator Email Validation
      if (email.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
        showAuthAlert(`Access Denied: Only ${AUTHORIZED_EMAIL} is authorized to access this administration console.`, "error");
        return;
      }

      // Cryptographic SHA-256 Password Hash Validation
      const enteredHash = await hashPassword(password);
      const expectedHash = getStoredPasswordHash();

      if (enteredHash !== expectedHash) {
        showAuthAlert("Invalid password. Access denied.", "error");
        return;
      }

      // If Firebase Auth is connected, attempt sync
      if (fbAuth) {
        try {
          const cred = await fbAuth.signInWithEmailAndPassword(email, password);
          handleLoginSuccess(cred.user);
          return;
        } catch (err) {
          console.warn("Firebase Auth bypassed or not configured, using verified encrypted session:", err);
        }
      }

      const localUser = { email: email, uid: "admin-" + Date.now() };
      localStorage.setItem("aslam_admin_session", JSON.stringify(localUser));
      handleLoginSuccess(localUser);
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("aslam_admin_session");
      if (fbAuth) fbAuth.signOut();
      if (loginEmailInput) loginEmailInput.value = "";
      if (loginPasswordInput) loginPasswordInput.value = "";
      handleLogoutState();
    });
  }

  // Update Password Modal
  if (updatePasswordTriggerBtn && updatePasswordDialog) {
    updatePasswordTriggerBtn.addEventListener("click", () => {
      if (updatePassAlert) updatePassAlert.style.display = "none";
      if (updatePasswordForm) updatePasswordForm.reset();
      updatePasswordDialog.showModal();
    });
  }

  if (closeUpdatePassModalBtn && updatePasswordDialog) {
    closeUpdatePassModalBtn.addEventListener("click", () => updatePasswordDialog.close());
    updatePasswordDialog.addEventListener("click", e => {
      if (e.target === updatePasswordDialog) updatePasswordDialog.close();
    });
  }

  if (updatePasswordForm) {
    updatePasswordForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const curPass = currentPassInput.value;
      const newPass = newPassInput.value;
      const confPass = confirmNewPassInput.value;

      // Verify current password
      const curHash = await hashPassword(curPass);
      const expectedHash = getStoredPasswordHash();

      if (curHash !== expectedHash) {
        showUpdatePassAlert("Current password is incorrect.", "error");
        return;
      }

      if (newPass.length < 6) {
        showUpdatePassAlert("New password must be at least 6 characters long.", "error");
        return;
      }

      if (newPass !== confPass) {
        showUpdatePassAlert("New password and confirm password do not match.", "error");
        return;
      }

      // Encrypt and store new password hash
      const newHash = await hashPassword(newPass);
      localStorage.setItem("aslam_admin_pass_hash", newHash);

      showUpdatePassAlert("Password has been successfully updated and encrypted!", "success");
      updatePasswordForm.reset();
      setTimeout(() => {
        updatePasswordDialog.close();
      }, 1500);
    });
  }

  function showUpdatePassAlert(msg, type = "error") {
    if (!updatePassAlert) return;
    updatePassAlert.textContent = msg;
    updatePassAlert.className = `admin-alert ${type}`;
    updatePassAlert.style.display = "block";
  }

  // Forgot Password Modal
  if (forgotPasswordTrigger && forgotPasswordDialog) {
    forgotPasswordTrigger.addEventListener("click", () => {
      if (forgotAlert) forgotAlert.style.display = "none";
      if (forgotStep1) forgotStep1.style.display = "block";
      if (forgotStep2) forgotStep2.style.display = "none";
      forgotPasswordDialog.showModal();
    });
  }

  if (closeForgotPassModalBtn && forgotPasswordDialog) {
    closeForgotPassModalBtn.addEventListener("click", () => forgotPasswordDialog.close());
    forgotPasswordDialog.addEventListener("click", e => {
      if (e.target === forgotPasswordDialog) forgotPasswordDialog.close();
    });
  }

  if (sendResetCodeBtn) {
    sendResetCodeBtn.addEventListener("click", async () => {
      sendResetCodeBtn.disabled = true;
      const originalText = sendResetCodeBtn.innerHTML;
      sendResetCodeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0110 10" stroke-linecap="round"/></svg>
        <span>Sending Code to ${AUTHORIZED_EMAIL}...</span>
      `;

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem("aslam_reset_otp", otp);
      sessionStorage.setItem("aslam_reset_otp_exp", (Date.now() + 10 * 60 * 1000).toString());

      // Send to shaikhaslame0@gmail.com via FormSubmit
      try {
        await fetch("https://formsubmit.co/ajax/shaikhaslame0@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            name: "Portfolio Security System",
            email: "security@portfolio.local",
            _subject: `[Portfolio Security Alert] Password Reset Code: ${otp}`,
            message: `Hello Aslam,\n\nA password reset request was initiated for your portfolio admin dashboard.\n\nYour 6-Digit Password Reset Verification Code is:\n\n👉  ${otp}  👈\n\nThis verification code will expire in 10 minutes.\nIf you did not request this, your account remains secure and no action is required.\n\nPortfolio URL: https://my-portfolio-website-4f201.web.app/admin`,
            _captcha: "false"
          })
        });
      } catch (e) {
        console.warn("Reset code dispatch via FormSubmit:", e);
      }

      if (fbAuth) {
        try {
          await fbAuth.sendPasswordResetEmail(AUTHORIZED_EMAIL);
        } catch (e) {}
      }

      sendResetCodeBtn.disabled = false;
      sendResetCodeBtn.innerHTML = originalText;
      if (forgotStep1) forgotStep1.style.display = "none";
      if (forgotStep2) forgotStep2.style.display = "block";
    });
  }

  if (forgotStep2) {
    forgotStep2.addEventListener("submit", async function (e) {
      e.preventDefault();
      const enteredOtp = resetOtpInput.value.trim();
      const newPass = resetNewPassInput.value;
      const confPass = resetConfirmPassInput.value;

      const storedOtp = sessionStorage.getItem("aslam_reset_otp");
      const expTime = parseInt(sessionStorage.getItem("aslam_reset_otp_exp") || "0", 10);

      if (!storedOtp || Date.now() > expTime) {
        showForgotAlert("Verification code has expired. Please request a new code.", "error");
        return;
      }

      if (enteredOtp !== storedOtp) {
        showForgotAlert("Invalid 6-digit verification code. Please check your email.", "error");
        return;
      }

      if (newPass.length < 6) {
        showForgotAlert("New password must be at least 6 characters long.", "error");
        return;
      }

      if (newPass !== confPass) {
        showForgotAlert("Passwords do not match.", "error");
        return;
      }

      // Save encrypted password
      const newHash = await hashPassword(newPass);
      localStorage.setItem("aslam_admin_pass_hash", newHash);
      sessionStorage.removeItem("aslam_reset_otp");
      sessionStorage.removeItem("aslam_reset_otp_exp");

      showForgotAlert("Password reset successfully! You can now log in with your new password.", "success");
      forgotStep2.reset();
      setTimeout(() => {
        forgotPasswordDialog.close();
      }, 1800);
    });
  }

  function showForgotAlert(msg, type = "error") {
    if (!forgotAlert) return;
    forgotAlert.textContent = msg;
    forgotAlert.className = `admin-alert ${type}`;
    forgotAlert.style.display = "block";
  }

  // Resume File Upload & Validation
  function handleResumeFile(file) {
    if (!file) return;

    // Validate type (must be PDF)
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      showResumeAlert("Invalid file format. Only PDF files (.pdf) are permitted.", "error");
      return;
    }

    // Validate size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showResumeAlert("File exceeds the maximum 10MB size limit.", "error");
      return;
    }

    if (resumeProgressContainer) resumeProgressContainer.style.display = "block";
    if (resumeProgressBar) resumeProgressBar.style.width = "0%";

    // If Firebase Storage is initialized and user is authenticated
    if (fbStorage && currentAdminUser && currentAdminUser.uid && !currentAdminUser.uid.startsWith("local-admin")) {
      const storageRef = fbStorage.ref(`resumes/${Date.now()}_${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (resumeProgressBar) resumeProgressBar.style.width = `${progress}%`;
        },
        error => {
          console.error("Firebase Storage Upload Error:", error);
          showResumeAlert(`Upload failed: ${error.message}`, "error");
          if (resumeProgressContainer) resumeProgressContainer.style.display = "none";
        },
        async () => {
          const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          saveResumeMetadata(downloadUrl, file.name);
          if (resumeProgressBar) resumeProgressBar.style.width = "100%";
          setTimeout(() => {
            if (resumeProgressContainer) resumeProgressContainer.style.display = "none";
          }, 600);
          showResumeAlert("Resume uploaded to Firebase Cloud Storage and published successfully!", "success");
        }
      );
    } else {
      // Local Mode: Use Blob Object URL or Base64 FileReader
      const reader = new FileReader();
      reader.onprogress = e => {
        if (e.lengthComputable && resumeProgressBar) {
          const progress = (e.loaded / e.total) * 100;
          resumeProgressBar.style.width = `${progress}%`;
        }
      };
      reader.onload = function (e) {
        const localUrl = e.target.result;
        saveResumeMetadata(localUrl, file.name);
        if (resumeProgressBar) resumeProgressBar.style.width = "100%";
        setTimeout(() => {
          if (resumeProgressContainer) resumeProgressContainer.style.display = "none";
        }, 600);
        showResumeAlert(`Resume replaced successfully with "${file.name}"! Public website updated.`, "success");
      };
      reader.readAsDataURL(file);
    }
  }

  // Save metadata to local storage and Firestore if online
  function saveResumeMetadata(url, filename) {
    let custom = {};
    try {
      const saved = localStorage.getItem("aslam_portfolio_custom_config");
      if (saved) custom = JSON.parse(saved);
    } catch (e) {}

    // Track previous as backup
    if (custom.resumeUrl && custom.resumeUrl !== url) {
      custom.previousResumeUrl = custom.resumeUrl;
      custom.previousResumeName = custom.resumeName;
    }

    custom.resumeUrl = url;
    custom.resumeName = filename;
    custom.resumeUpdatedAt = new Date().toISOString();

    localStorage.setItem("aslam_portfolio_custom_config", JSON.stringify(custom));

    // Update in Firestore if available
    if (fbFirestore && currentAdminUser) {
      fbFirestore
        .collection("portfolio_config")
        .doc("resume")
        .set(
          {
            url: url,
            name: filename,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: currentAdminUser.email
          },
          { merge: true }
        )
        .catch(err => console.warn("Firestore sync error:", err));
    }

    loadDashboardData();
  }

  // Dropzone drag-and-drop events
  if (resumeDropzone && resumeFileInput) {
    resumeDropzone.addEventListener("click", () => resumeFileInput.click());

    resumeDropzone.addEventListener("dragover", e => {
      e.preventDefault();
      resumeDropzone.classList.add("dragover");
    });

    resumeDropzone.addEventListener("dragleave", () => {
      resumeDropzone.classList.remove("dragover");
    });

    resumeDropzone.addEventListener("drop", e => {
      e.preventDefault();
      resumeDropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        handleResumeFile(e.dataTransfer.files[0]);
      }
    });

    resumeFileInput.addEventListener("change", e => {
      if (e.target.files && e.target.files.length) {
        handleResumeFile(e.target.files[0]);
      }
    });
  }

  // Preview Resume Button
  if (previewResumeBtn) {
    previewResumeBtn.addEventListener("click", () => {
      if (pdfPreviewContainer && pdfPreviewIframe) {
        pdfPreviewIframe.src = activeResumeUrl;
        pdfPreviewContainer.style.display = pdfPreviewContainer.style.display === "none" ? "block" : "none";
      }
    });
  }

  // Revert / Rollback to previous resume
  if (revertResumeBtn) {
    revertResumeBtn.addEventListener("click", () => {
      let custom = {};
      try {
        const saved = localStorage.getItem("aslam_portfolio_custom_config");
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      if (custom.previousResumeUrl) {
        const tempUrl = custom.resumeUrl;
        const tempName = custom.resumeName;
        custom.resumeUrl = custom.previousResumeUrl;
        custom.resumeName = custom.previousResumeName || "Previous_Resume.pdf";
        custom.previousResumeUrl = tempUrl;
        custom.previousResumeName = tempName;
        custom.resumeUpdatedAt = new Date().toISOString();

        localStorage.setItem("aslam_portfolio_custom_config", JSON.stringify(custom));
        showResumeAlert("Reverted successfully to previous backup resume.", "success");
        loadDashboardData();
      }
    });
  }

  // Save Availability
  if (saveAvailabilityBtn) {
    saveAvailabilityBtn.addEventListener("click", () => {
      let custom = {};
      try {
        const saved = localStorage.getItem("aslam_portfolio_custom_config");
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      custom.available = availabilityToggle.checked;
      custom.availabilityText = availabilityTextInput.value.trim();

      localStorage.setItem("aslam_portfolio_custom_config", JSON.stringify(custom));
      showSettingsAlert("Availability status updated and reflected on the live site!", "success");
    });
  }

  // Save Email Gateway Settings (Google Apps Script & EmailJS)
  if (saveEmailjsBtn) {
    saveEmailjsBtn.addEventListener("click", () => {
      let custom = {};
      try {
        const saved = localStorage.getItem("aslam_portfolio_custom_config");
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      if (gasWebhookUrlInput) {
        custom.gasWebhookUrl = gasWebhookUrlInput.value.trim();
      }

      custom.emailjs = {
        serviceId: emailjsServiceIdInput ? emailjsServiceIdInput.value.trim() || "service_pbmmpmp" : "service_pbmmpmp",
        templateId: emailjsTemplateIdInput ? emailjsTemplateIdInput.value.trim() : "",
        publicKey: emailjsPublicKeyInput ? emailjsPublicKeyInput.value.trim() : "",
        recipientEmail: AUTHORIZED_EMAIL
      };

      localStorage.setItem("aslam_portfolio_custom_config", JSON.stringify(custom));
      showSettingsAlert("Email Gateway configuration saved successfully!", "success");
      if (emailSettingsAlert) {
        emailSettingsAlert.textContent = "✓ Email Gateway settings saved successfully! Active URL: " + (custom.gasWebhookUrl || "Default Production Script");
        emailSettingsAlert.className = "admin-alert success";
        emailSettingsAlert.style.display = "block";
      }
    });
  }

  // Copy Google Apps Script Code
  if (copyGasCodeBtn) {
    copyGasCodeBtn.addEventListener("click", async () => {
      const gasCode = `/**
 * Google Apps Script: Aslam Shaikh Portfolio Contact & Auto-Reply Dispatcher
 * Features:
 * 1. Dispatches recruiter inquiries to shaikhaslame0@gmail.com
 * 2. Sends auto-reply confirmation to the recruiter/visitor
 * 3. Persists inquiries centrally for the Admin Inbox Dashboard
 * 4. Serves inbox history via doGet with JSONP (zero CORS errors)
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }
    } else { data = e.parameter || {}; }

    var name = (data.name || "Colleague").trim();
    var senderEmail = (data.email || "").trim();
    var subject = (data.subject || "Portfolio Inquiry").trim();
    var message = (data.message || "").trim();
    var adminEmail = "shaikhaslame0@gmail.com";

    // Auto-correct common mobile keyboard typos (.co -> .com)
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

    // 1. Send Inquiry to Aslam
    var ownerSubject = "[Portfolio Inquiry] " + subject + " - from " + name;
    var ownerBody = "New contact message received from your portfolio website:\\n\\n" +
      "Name: " + name + "\\n" +
      "Email: " + senderEmail + "\\n" +
      "Subject: " + subject + "\\n\\n" +
      "Message:\\n" + message + "\\n\\n" +
      "---\\n" +
      "Delivered via Google Apps Script Backend\\n" +
      "Timestamp: " + new Date().toLocaleString();

    var ownerHtml = '<div style="font-family: -apple-system, BlinkMacSystemFont, \\'Segoe UI\\', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">' +
      '<h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">New Portfolio Inquiry</h2>' +
      '<p><strong>From:</strong> ' + name + ' &lt;<a href="mailto:' + senderEmail + '">' + senderEmail + '</a>&gt;</p>' +
      '<p><strong>Subject:</strong> ' + subject + '</p>' +
      '<div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 4px; font-size: 15px; line-height: 1.6; color: #334155;">' +
      message.replace(/\\n/g, "<br>") +
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

    // 2. Send Auto-Reply Confirmation to Sender
    var autoReplySubject = "Thank You for Connecting – Aslam Shaikh";
    var autoReplyText = "Dear " + name + ",\\n\\n" +
      "Thank you for reaching out through my portfolio website. I have received your message regarding:\\n" +
      "\\\"" + subject + "\\\"\\n\\n" +
      "I appreciate your interest in connecting. As a Senior Software Developer & Full Stack .NET Engineer with 4.6+ years of experience engineering enterprise banking solutions, I review every incoming inquiry carefully and will get back to you promptly.\\n\\n" +
      "In the meantime, feel free to explore my background, enterprise projects, or download my latest resume:\\n" +
      "• Portfolio: https://aslam-shaikh-portfolio.web.app\\n" +
      "• LinkedIn: https://www.linkedin.com/in/aslam-shaikh-4497581bb\\n" +
      "• GitHub: https://github.com/arswebdeveloper\\n" +
      "• Direct Email: shaikhaslame0@gmail.com\\n" +
      "• Phone / WhatsApp: +91 8104537679\\n\\n" +
      "Warm regards,\\n" +
      "Aslam Rashid Shaikh\\n" +
      "Senior Software Developer | Full Stack .NET Developer\\n" +
      "Navi Mumbai, Maharashtra, India";

    var autoReplyHtml = '<div style="font-family: -apple-system, BlinkMacSystemFont, \\'Segoe UI\\', Roboto, sans-serif; max-width: 620px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff; color: #1e293b;">' +
      '<div style="border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px;">' +
      '<h2 style="color: #0f172a; margin: 0; font-size: 20px;">Thank You for Connecting</h2>' +
      '<span style="font-size: 13px; color: #64748b;">Aslam Rashid Shaikh &bull; Senior Software Developer | Full Stack .NET Developer</span>' +
      '</div>' +
      '<p>Dear <strong>' + name + '</strong>,</p>' +
      '<p>Thank you for reaching out through my portfolio website. I have received your message regarding: <em>\\"' + subject + '\\"</em>.</p>' +
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

    // 3. Persist inquiry in cloud store for Admin Inbox Dashboard
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
      if (inboxList.length > 50) inboxList = inboxList.slice(0, 50);
      scriptProps.setProperty("ASLAM_INBOX_STORE", JSON.stringify(inboxList));
    } catch (saveErr) {
      console.warn("Storage warning: " + saveErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Dual emails dispatched." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

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
}`;
      try {
        await navigator.clipboard.writeText(gasCode);
        showSettingsAlert("Complete Google Apps Script code copied to clipboard! Paste it into script.google.com and deploy a New Version.", "success");
      } catch (err) {
        showSettingsAlert("Please copy the script from the google-apps-script/Code.gs file in your repository.", "info");
      }
    });
  }

  // Test Email Dispatch via Webhook
  if (testEmailBtn) {
    testEmailBtn.addEventListener("click", async () => {
      const url = gasWebhookUrlInput ? gasWebhookUrlInput.value.trim() : "";
      if (!url) {
        alert("Please enter a Google Apps Script Web App URL first.");
        return;
      }
      testEmailBtn.disabled = true;
      testEmailBtn.innerHTML = "<span>Sending Test...</span>";
      if (testEmailStatus) {
        testEmailStatus.style.display = "block";
        testEmailStatus.style.color = "var(--admin-muted)";
        testEmailStatus.textContent = "Dispatching test inquiry & auto-reply...";
      }

      try {
        await fetch(url, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name: "Test Recruiter",
            email: AUTHORIZED_EMAIL,
            subject: "Verification Test",
            message: "This is a test submission from the Aslam Shaikh Portfolio Admin Portal."
          })
        });

        if (testEmailStatus) {
          testEmailStatus.style.color = "#86efac";
          testEmailStatus.textContent = "✓ Test dispatched to " + AUTHORIZED_EMAIL + "! Check your Gmail inbox.";
        }
      } catch (e) {
        if (testEmailStatus) {
          testEmailStatus.style.color = "#f87171";
          testEmailStatus.textContent = "Error testing webhook: " + e.message;
        }
      } finally {
        testEmailBtn.disabled = false;
        testEmailBtn.innerHTML = "<span>✉️ Test Send</span>";
      }
    });
  }

  // Save Firebase Config Settings
  if (saveFirebaseBtn) {
    saveFirebaseBtn.addEventListener("click", () => {
      let custom = {};
      try {
        const saved = localStorage.getItem("aslam_portfolio_custom_config");
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      custom.firebaseConfig = {
        apiKey: fbApiKeyInput.value.trim(),
        projectId: fbProjectIdInput.value.trim(),
        storageBucket: fbStorageBucketInput.value.trim(),
        authDomain: `${fbProjectIdInput.value.trim()}.firebaseapp.com`
      };

      localStorage.setItem("aslam_portfolio_custom_config", JSON.stringify(custom));
      showSettingsAlert("Firebase configuration stored. Please reload to initialize Firebase.", "success");
    });
  }

  // Boot Engine
  document.addEventListener("DOMContentLoaded", () => {
    initFirebase();
    checkSession();
  });
})();

