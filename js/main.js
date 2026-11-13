/**
 * Public Portfolio Interactive Engine
 * Aslam Rashid Shaikh - Senior Software Developer Portfolio
 */

(function () {
  "use strict";

  const config = window.getActivePortfolioData ? window.getActivePortfolioData() : window.PORTFOLIO_DATA;
  if (!config) {
    console.error("Portfolio data not found.");
    return;
  }

  // DOM Helpers
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  // SVG Icons Store
  const ICONS = {
    csharp: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M14.22.09v5.96l-3.74.5v3.53l3.74-.5v3.57l3.5-.46V9.1L24 8.26l-.46-3.46-5.83.78V.09zM6.29 1.15v5.96L0 7.95l.46 3.46 5.86-.78 3.46-.47V1.15zm3.52 9.72l-3.49.46v3.58l-6.19.83.47 3.46 5.82-.78v5.5h3.49v-5.97l3.61-.48v-3.58l-3.71.49zm13.73 1.74l-5.82.78-3.5.47v9.02h3.5v-5.96L24 16.07z"/></svg>`,
    dotnet: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M24 8.77h-2.47v7.57h-1.42V8.77h-2.47V7.53H24zm-6.85 7.57h-4.82V7.53h4.63v1.24h-3.2v2.5h2.95v1.23h-2.95v2.6h3.4zm-6.71 0H8.88L4.78 9.86a2.9 2.9 0 01-.26-.5h-.04c.03.18.05.6.05 1.21v5.77H3.16V7.53h1.66l3.96 6.32c.17.26.28.44.33.54h.02c-.04-.23-.06-.63-.06-1.19V7.53h1.37zm-8.7-.69a.85.85 0 11-.01-1.66.85.85 0 010 1.66z"/></svg>`,
    angular: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M16.71 17.71H7.29l-1.2 2.92L12 24l5.92-3.37-1.21-2.92zM14.7 0l7.83 16.85.81-12.85L14.7 0zM9.3 0L.66 4l.82 12.85L9.3 0zm-.4 13.93h6.2L12 6.4l-3.1 7.53z"/></svg>`,
    typescript: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`,
    javascript: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M0 0h24v24H0V0zm22.03 18.28c-.17-1.1-.88-2.02-3-2.88-.74-.34-1.56-.58-1.8-1.14-.1-.33-.11-.51-.05-.7.15-.65.92-.84 1.52-.66.39.12.75.42.98.9 1.03-.68 1.03-.68 1.75-1.13-.27-.42-.4-.6-.59-.78-.63-.7-1.47-1.06-2.83-1.03l-.7.09c-.68.16-1.33.52-1.72 1-.14 1.3-.81 3.55.57 4.48 1.37 1.02 3.36 1.24 3.62 2.2.24 1.17-.87 1.55-1.97 1.42-.81-.19-1.26-.6-1.75-1.34l-1.83 1.05c.21.48.45.69.81 1.11 1.74 1.76 6.09 1.67 6.87-1 .03-.1.24-.71.07-1.66l.05.07zm-8.98-7.25h-2.25c0 1.94-.01 3.87-.01 5.8 0 1.24.06 2.37-.14 2.72-.33.69-1.18.6-1.57.48-.39-.2-.6-.47-.83-.86-.06-.1-.1-.2-.12-.2l-1.83 1.13c.3.63.75 1.17 1.32 1.51.86.51 2 .68 3.21.41.78-.23 1.46-.7 1.81-1.41.51-.93.4-2.07.4-3.35.01-2.05 0-4.11 0-6.18z"/></svg>`,
    sqlserver: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.34-7-3s3.13-3 7-3 7 1.34 7 3-3.13 3-7 3zm0 2c-4.97 0-9 1.79-9 4v2c0 2.21 4.03 4 9 4s9-1.79 9-4v-2c0-2.21-4.03-4-9-4zm0 8c-3.87 0-7-1.34-7-3v-.78c1.61 1.08 4.16 1.78 7 1.78s5.39-.7 7-1.78v.78c0 1.66-3.13 3-7 3z"/></svg>`,
    api: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17l6-6-6-6M12 19h8"/></svg>`,
    database: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    windows: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801"/></svg>`,
    azure: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M5.4 0L0 15.6h5.8l4.2-12zm2.8 4.8L4.6 24h13.6l5.8-19.2z"/></svg>`,
    git: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M23.55 10.93L13.07.45a1.55 1.55 0 00-2.19 0L8.71 2.63l2.76 2.76c.65-.22 1.38-.07 1.89.44.52.52.66 1.26.44 1.9l2.66 2.66c.64-.22 1.39-.08 1.9.44.72.72.72 1.88 0 2.6-.72.72-1.88.72-2.6 0-.54-.54-.67-1.34-.4-2L12.86 8.96v6.52c.18.09.34.2.49.35.71.72.71 1.88 0 2.6-.72.72-1.89.72-2.61 0-.72-.72-.72-1.88 0-2.6.18-.18.39-.32.6-.4V8.84c-.21-.09-.42-.22-.6-.4-.54-.55-.67-1.34-.4-2.01L7.64 3.7.45 10.88c-.6.6-.6 1.58 0 2.19l10.48 10.48c.6.6 1.58.6 2.19 0l10.43-10.43c.6-.6.6-1.58 0-2.19z"/></svg>`,
    jenkins: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    code: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    server: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    wrench: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    chart: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    mic: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  function getIcon(key) {
    return ICONS[key] || ICONS.code;
  }

  // 1. Initialize Profile & Hero Information
  function initProfile() {
    const prof = config.profile;
    const resumeUrl = prof.defaultResumeUrl || "assets/Aslam_Shaikh_Resume.pdf";
    const resumeName = prof.defaultResumeName || "Aslam_Shaikh_Senior_DotNet_Resume.pdf";

    // Update all resume download buttons
    $$(".resume-download-btn").forEach(btn => {
      btn.href = resumeUrl;
      btn.setAttribute("download", resumeName);
      btn.setAttribute("target", "_blank");
    });

    // Update availability pill
    const availPill = $("#availability-badge");
    if (availPill) {
      if (prof.available) {
        availPill.style.display = "inline-flex";
        const availText = availPill.querySelector(".avail-text");
        if (availText) availText.textContent = prof.availabilityText || "Available for Senior .NET / Full Stack Roles";
      } else {
        availPill.style.display = "none";
      }
    }

    // Social & Contact links
    const liLink = $("#nav-linkedin");
    if (liLink && prof.linkedin) liLink.href = prof.linkedin;
    const ghLink = $("#nav-github");
    if (ghLink && prof.github) ghLink.href = prof.github;

    // Contact info text
    const emailEl = $("#contact-email-text");
    if (emailEl) {
      emailEl.textContent = prof.email;
      emailEl.href = `mailto:${prof.email}`;
    }
    const phoneEl = $("#contact-phone-text");
    if (phoneEl) {
      phoneEl.textContent = prof.phone;
      phoneEl.href = `tel:${prof.phone.replace(/[^+\d]/g, "")}`;
    }
    const locEl = $("#contact-loc-text");
    if (locEl) locEl.textContent = prof.location;

    // Copyright year
    const yr = $("#copyright-year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  // 2. Render Hero Stats Bar
  function renderStats() {
    const container = $("#hero-stats-container");
    if (!container || !config.stats) return;
    container.innerHTML = config.stats
      .map(
        s => `
        <div class="stat-item">
          <h3>${s.value}</h3>
          <p>${s.label}</p>
        </div>
      `
      )
      .join("");
  }

  // 3. Render Technical Skills
  function renderSkills() {
    const container = $("#skills-section-container");
    if (!container || !config.skills) return;

    // Featured AI and Prompting highlight banner with Freelancing availability
    let html = `
      <div class="skills-highlight-banner glass-card">
        <div class="skills-highlight-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <div class="skills-highlight-content">
          <div class="skills-highlight-title-row">
            <span class="skills-highlight-title">AI and Prompting</span>
            <span class="skills-highlight-tag freelance-badge">⚡ Available for Freelancing</span>
          </div>
          <p class="skills-highlight-desc">
            Practical experience using AI tools such as <strong>ChatGPT</strong>, <strong>GitHub Copilot</strong>, and <strong>Claude</strong> for software development, code acceleration, architecture ideation, and rapid problem-solving.
          </p>
        </div>
      </div>
    `;

    Object.entries(config.skills).forEach(([category, skillsList]) => {
      html += `
        <div class="skills-category-group">
          <h3 class="skills-category-title">
            <span class="gradient-text">${category}</span>
          </h3>
          <div class="skills-grid">
            ${skillsList
              .map(
                sk => `
              <div class="skill-card">
                <div class="skill-header">
                  <div class="skill-icon-wrapper">${getIcon(sk.icon)}</div>
                  <span class="skill-name">${sk.name}</span>
                </div>
                <div class="skill-level-bar">
                  <div class="skill-level-fill" style="width: ${sk.level}%"></div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // 4. Render Experience Timeline
  function renderExperience() {
    const container = $("#experience-timeline-container");
    if (!container || !config.experience) return;

    container.innerHTML = `
      <div class="timeline-line"></div>
      ${config.experience
        .map(
          exp => `
        <div class="timeline-item ${exp.isCurrent ? "current" : ""}">
          <div class="timeline-dot"></div>
          <div class="glass-card timeline-card">
            <div class="timeline-card-header">
              <div>
                <h3 class="timeline-role">
                  ${exp.role}
                  ${exp.isCurrent ? '<span class="timeline-badge-current">Current Role</span>' : ""}
                </h3>
                <div class="timeline-company">${exp.company} &bull; ${exp.location}</div>
              </div>
              <span class="timeline-period">${exp.period}</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 12px;">${exp.summary}</p>
            <ul class="timeline-responsibilities">
              ${exp.responsibilities.map(r => `<li>${r}</li>`).join("")}
            </ul>
            <div class="tag-cloud">
              ${exp.technologies.map(t => `<span class="tag-pill">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    `;
  }

  // 5. Render Featured Projects
  function renderProjects() {
    const container = $("#projects-grid-container");
    if (!container || !config.projects) return;

    container.innerHTML = config.projects
      .map((proj, idx) => {
        // Build mock window UI
        let mockupInner = "";
        if (proj.mockupType === "kiosk") {
          mockupInner = `
            <div class="kiosk-grid-display">
              <div class="kiosk-node">KIOSK #01 ● OK</div>
              <div class="kiosk-node">KIOSK #02 ● OK</div>
              <div class="kiosk-node">KIOSK #03 ● SYNC</div>
              <div class="kiosk-node">BATCH: SUCCESS</div>
              <div class="kiosk-node">HOLIDAY: ON</div>
              <div class="kiosk-node">HEARTBEAT: LIVE</div>
            </div>
          `;
        } else if (proj.mockupType === "queue") {
          mockupInner = `
            <div class="queue-token-display">
              <div style="font-size: 0.75rem; color: var(--cyan-bright); letter-spacing: 0.1em;">NOW SERVING</div>
              <div class="token-big">A - 042</div>
              <div class="audio-waveform">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          `;
        } else if (proj.mockupType === "queue2") {
          mockupInner = `
            <div class="queue-token-display">
              <div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
                <div>
                  <div style="font-size: 0.7rem; color: var(--text-muted);">ENGLISH</div>
                  <div class="token-big" style="font-size: 1.4rem;">B - 017</div>
                </div>
                <div style="width: 1px; height: 32px; background: rgba(255,255,255,0.15);"></div>
                <div dir="rtl">
                  <div style="font-size: 0.7rem; color: var(--text-muted);">عربي</div>
                  <div class="token-big" style="font-size: 1.4rem;">ب - ٠١٧</div>
                </div>
              </div>
              <div class="audio-waveform" style="margin-top: 8px;">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          `;
        } else {
          mockupInner = `
            <div style="text-align: center; width: 100%;">
              <div style="font-size: 1.1rem; font-weight: 700; color: #6ee7b7; margin-bottom: 6px;">Angular 17 Web Portal</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Firebase Hosting ● EmailJS Gateway</div>
              <span class="mockup-badge-live">LIVE IN PRODUCTION</span>
            </div>
          `;
        }

        return `
        <div class="glass-card project-card" data-project-id="${proj.id}">
          <div>
            <div class="mockup-window">
              <div class="mockup-header">
                <span class="mockup-dot red"></span>
                <span class="mockup-dot yellow"></span>
                <span class="mockup-dot green"></span>
                <div class="mockup-title-bar"></div>
              </div>
              <div class="mockup-body">
                ${mockupInner}
              </div>
            </div>
            <span class="project-card-badge">${proj.badge}</span>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.shortDesc}</p>
            <div class="tag-cloud" style="margin-bottom: 20px;">
              ${proj.techStack.slice(0, 5).map(t => `<span class="tag-pill">${t}</span>`).join("")}
            </div>
          </div>
          <div class="project-card-footer">
            <button class="btn btn-secondary btn-sm open-case-study-btn" data-index="${idx}">
              View Architecture &amp; Case Study
            </button>
            ${
              proj.liveUrl
                ? `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Visit Site &nearr;</a>`
                : `<span style="font-size: 0.75rem; color: var(--text-dim);">Banking Confidential</span>`
            }
          </div>
        </div>
      `;
      })
      .join("");

    // Setup Case Study Modal listener
    setupCaseStudyModal();
  }

  // 6. Case Study Modal Setup
  function setupCaseStudyModal() {
    const dialog = $("#case-study-dialog");
    const modalContent = $("#case-study-modal-content");
    const closeBtn = $("#close-case-study-modal");

    if (!dialog || !modalContent) return;

    $$(".open-case-study-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        const p = config.projects[idx];
        if (!p) return;

        modalContent.innerHTML = `
          <div class="modal-header">
            <div>
              <span class="project-card-badge">${p.badge} &bull; ${p.client}</span>
              <h2 style="font-size: 1.5rem; margin-top: 4px;">${p.title}</h2>
            </div>
          </div>
          <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            ${p.fullOverview}
          </p>
          
          <h4 style="font-size: 1.05rem; margin: 18px 0 8px; color: var(--cyan-bright);">My Key Engineering Contributions</h4>
          <ul style="padding-left: 20px; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            ${p.contributions.map(c => `<li style="margin-bottom: 6px;">${c}</li>`).join("")}
          </ul>

          <h4 style="font-size: 1.05rem; margin: 18px 0 8px; color: var(--cyan-bright);">Key Features &amp; Modules</h4>
          <ul style="padding-left: 20px; color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            ${p.keyFeatures.map(k => `<li style="margin-bottom: 6px;">${k}</li>`).join("")}
          </ul>

          <h4 style="font-size: 1.05rem; margin: 18px 0 8px; color: var(--cyan-bright);">System Architecture Flow</h4>
          <div style="padding: 14px 18px; border-radius: 10px; background: rgba(0,0,0,0.3); border: 1px solid var(--card-border); font-family: var(--font-mono); font-size: 0.85rem; color: #93c5fd; margin-bottom: 20px;">
            ${p.architectureFlow.join(" &rarr; ")}
          </div>

          <h4 style="font-size: 1.05rem; margin: 18px 0 8px; color: var(--cyan-bright);">Technologies &amp; Tools Used</h4>
          <div class="tag-cloud" style="margin-bottom: 20px;">
            ${p.techStack.map(t => `<span class="tag-pill">${t}</span>`).join("")}
          </div>

          ${
            p.liveUrl
              ? `<div style="margin-top: 15px;"><a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Open Live Website &nearr;</a></div>`
              : `<p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 15px;">Note: In compliance with banking confidentiality, internal architecture diagrams, proprietary database schemas, and bank IP are strictly omitted.</p>`
          }
        `;

        dialog.showModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => dialog.close());
    }

    dialog.addEventListener("click", e => {
      if (e.target === dialog) dialog.close();
    });
  }

  // 7. Render "What I Do"
  function renderWhatIDo() {
    const container = $("#what-i-do-grid-container");
    if (!container || !config.whatIDo) return;

    container.innerHTML = config.whatIDo
      .map(
        item => `
        <div class="glass-card service-card">
          <div class="service-icon">${getIcon(item.icon)}</div>
          <h3 class="service-title">${item.title}</h3>
          <p class="service-desc">${item.desc}</p>
        </div>
      `
      )
      .join("");
  }

  // 8. Render Education & Certification
  function renderEducation() {
    const container = $("#education-grid-container");
    if (!container || !config.education) return;

    container.innerHTML = config.education
      .map(
        edu => `
        <div class="glass-card edu-card">
          <span class="edu-year">${edu.year}</span>
          <h3 class="edu-degree">${edu.degree}</h3>
          <div class="edu-institution">${edu.institution}</div>
          <div class="edu-score">${edu.score}</div>
          <p class="edu-desc">${edu.description}</p>
        </div>
      `
      )
      .join("");
  }

  // 9. Contact Form Engine (Validation, Spam Honeypot & Dual-Email Auto-Reply Gateway)
  function initContactForm() {
    const form = $("#recruiter-contact-form");
    if (!form) return;

    const nameInput = $("#contact-name");
    const emailInput = $("#contact-email");
    const subjectInput = $("#contact-subject");
    const messageInput = $("#contact-message");
    const hpInput = $("#contact-company-hp"); // Honeypot
    const submitBtn = $("#contact-submit-btn");
    const successAlert = $("#contact-success-alert");
    const errorAlert = $("#contact-error-alert");

    // Helper to completely clear alerts
    const hideAlerts = () => {
      if (successAlert) {
        successAlert.className = "form-status-alert";
        successAlert.innerHTML = "";
        successAlert.style.display = "none";
      }
      if (errorAlert) {
        errorAlert.className = "form-status-alert";
        errorAlert.innerHTML = "";
        errorAlert.style.display = "none";
      }
    };

    // Ensure hidden on initialization
    hideAlerts();

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Reset feedback alerts
      hideAlerts();

      const name = nameInput.value.trim();
      let email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();
      const honeypot = hpInput ? hpInput.value.trim() : "";

      // Auto-correct common mobile keyboard typos (.co instead of .com)
      if (email.toLowerCase().endsWith("@gmail.co")) {
        email = email.slice(0, -3) + ".com";
        emailInput.value = email;
      } else if (email.toLowerCase().endsWith("@yahoo.co")) {
        email = email.slice(0, -3) + ".com";
        emailInput.value = email;
      } else if (email.toLowerCase().endsWith("@hotmail.co") || email.toLowerCase().endsWith("@outlook.co")) {
        email = email.slice(0, -3) + ".com";
        emailInput.value = email;
      }

      // Spam Bot trap: if honeypot is filled, abort silently
      if (honeypot.length > 0) {
        console.warn("Spam submission blocked.");
        if (successAlert) {
          successAlert.innerHTML = `
            <div class="alert-icon" style="flex-shrink: 0; color: #34d399;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="alert-content">
              <strong>Thank you for reaching out!</strong>
            </div>
          `;
          successAlert.className = "form-status-alert active success";
          successAlert.style.display = "flex";
        }
        form.reset();
        return;
      }

      // Client-side Validation
      let isValid = true;

      const setError = (inputId, errId, msg, condition) => {
        const errEl = $(errId);
        if (errEl) errEl.textContent = condition ? "" : msg;
        if (!condition) isValid = false;
      };

      setError("#contact-name", "#err-name", "Please enter your full name (minimum 2 characters).", name.length >= 2);
      setError(
        "#contact-email",
        "#err-email",
        "Please enter a valid email address.",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      );
      setError("#contact-subject", "#err-subject", "Please provide a subject line (minimum 3 characters).", subject.length >= 3);
      setError("#contact-message", "#err-message", "Please enter your message (minimum 10 characters).", message.length >= 10);

      if (!isValid) return;

      // Loading state
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0110 10" stroke-linecap="round"/>
        </svg>
        <span>Submitting &amp; Sending Confirmation...</span>
      `;

      let deliverySuccessful = false;

      // Store in Local / Admin Inbox so no message is ever lost
      try {
        const inboxItem = {
          id: "msg_" + Date.now(),
          name: name,
          email: email,
          subject: subject,
          message: message,
          date: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem("aslam_recruiter_inbox") || "[]");
        existing.unshift(inboxItem);
        localStorage.setItem("aslam_recruiter_inbox", JSON.stringify(existing.slice(0, 50)));
      } catch (e) {
        console.warn("Could not save to local inbox:", e);
      }

      // Automated Acknowledgement Email Message for the sender
      const autoReplySubject = "Thank You for Connecting – Aslam Shaikh";
      const autoReplyText = `Dear ${name},

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

      // 1. Primary Priority Gateway: Google Apps Script Webhook (Direct Native Gmail Dispatch)
      const gasUrl = config.gasWebhookUrl || (function () {
        try {
          const saved = JSON.parse(localStorage.getItem("aslam_portfolio_custom_config") || "{}");
          return saved.gasWebhookUrl || "";
        } catch (e) {
          return "";
        }
      })() || "https://script.google.com/macros/s/AKfycbyXNo-CBwCWhQA17ro2mtDAm45qQRQZvDZK_sQt1uNdtRwtXm0oaFoRtHZHS0b0u1-b/exec";

      if (gasUrl) {
        try {
          await fetch(gasUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              name: name,
              email: email,
              subject: subject,
              message: message
            })
          });
          deliverySuccessful = true;
        } catch (gasErr) {
          console.warn("GAS webhook gateway attempt:", gasErr);
        }
      }

      // 2. Secondary Gateway: EmailJS (Dual-call: 1 to Aslam, 1 Auto-Reply to sender)
      if (!deliverySuccessful) {
        const emailjsConfig = config.emailjs || {};
        const serviceId = emailjsConfig.serviceId || "service_pbmmpmp";
        const templateId = emailjsConfig.templateId;
        const publicKey = emailjsConfig.publicKey;

        if (serviceId && templateId && publicKey && publicKey !== "user_public_key") {
          try {
            const p1 = fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                  from_name: name,
                  reply_to: email,
                  subject: `[Portfolio Inquiry] ${subject}`,
                  message: `Inquiry from: ${name} (${email})\nSubject: ${subject}\n\n${message}`,
                  to_email: config.profile.email
                }
              })
            });

            const p2 = fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                  from_name: "Aslam Rashid Shaikh",
                  reply_to: config.profile.email,
                  subject: autoReplySubject,
                  message: autoReplyText,
                  to_email: email
                }
              })
            });

            const [r1] = await Promise.all([p1, p2]);
            if (r1.ok) {
              deliverySuccessful = true;
            }
          } catch (apiErr) {
            console.warn("EmailJS gateway attempt:", apiErr);
          }
        }
      }

      // 3. Third Gateway: FormSubmit Relay
      if (!deliverySuccessful) {
        try {
          const formSubmitRes = await fetch("https://formsubmit.co/ajax/shaikhaslame0@gmail.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              name: name,
              email: email,
              _replyto: email,
              _subject: `${autoReplySubject}: ${subject}`,
              message: `New Inquiry Received from Portfolio:\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nSent via Aslam Shaikh Portfolio Contact Engine`,
              _autoresponse: autoReplyText,
              _template: "table",
              _captcha: "false"
            })
          });

          const resData = await formSubmitRes.json();
          if (formSubmitRes.ok && (resData.success === true || resData.success === "true" || resData.message)) {
            deliverySuccessful = true;
          }
        } catch (err) {
          console.warn("FormSubmit gateway attempt:", err);
        }
      }

      // Handle delivery outcome dynamically
      if (deliverySuccessful) {
        if (successAlert) {
          successAlert.innerHTML = `
            <div class="alert-icon" style="flex-shrink: 0; color: #34d399; margin-top: 2px;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div class="alert-content">
              <strong style="display: block; font-size: 0.98rem; margin-bottom: 4px; color: #ecfdf5;">Message Sent Successfully!</strong>
              <div style="font-size: 0.88rem; line-height: 1.5; color: #a7f3d0;">
                Thank you, <strong>${name}</strong>! Your inquiry has been routed to Aslam's inbox, and an automated acknowledgement email has been dispatched to <strong>${email}</strong>.
              </div>
            </div>
          `;
          successAlert.className = "form-status-alert active success";
          successAlert.style.display = "flex";
        }
        form.reset();
      } else {
        // Fallback: Direct Mailto
        const mailtoUrl = `mailto:${config.profile.email}?subject=${encodeURIComponent(
          autoReplySubject + ": " + subject
        )}&body=${encodeURIComponent(
          "From: " + name + " (" + email + ")\n\nMessage:\n" + message
        )}`;

        if (errorAlert) {
          errorAlert.innerHTML = `
            <div class="alert-icon" style="flex-shrink: 0; color: #f87171; margin-top: 2px;">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div class="alert-content">
              <strong style="display: block; font-size: 0.95rem; margin-bottom: 4px; color: #fef2f2;">Notice: Network Delivery Delay</strong>
              <div style="font-size: 0.86rem; color: #fecaca; line-height: 1.45;">
                Your message has been safely saved to Aslam's portfolio inbox.
                <a href="${mailtoUrl}" class="btn btn-outline btn-sm" style="margin-left: 8px; display: inline-flex; vertical-align: middle; padding: 4px 10px; font-size: 0.78rem;">
                  Click here to launch direct email &rarr;
                </a>
              </div>
            </div>
          `;
          errorAlert.className = "form-status-alert active error";
          errorAlert.style.display = "flex";
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  }

  // 10. Scroll Progress Bar & Active Navigation Highlighting
  function initScrollTriggers() {
    const progressBar = $("#scroll-progress");
    const sections = $$("section[id], header[id]");
    const navLinks = $$(".nav-links a");

    window.addEventListener(
      "scroll",
      () => {
        // Update top progress bar
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0 && progressBar) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = `${progress}%`;
        }

        // Active link highlight
        let currentSectionId = "";
        sections.forEach(sec => {
          const top = sec.offsetTop - 120;
          const height = sec.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            currentSectionId = sec.getAttribute("id");
          }
        });

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      },
      { passive: true }
    );
  }

  // 11. Custom Interactive Cursor
  function initCustomCursor() {
    const cursor = $("#custom-cursor");
    if (!cursor) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;
    let isRunning = false;

    window.addEventListener("pointermove", e => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.classList.add("active");

      if (!isRunning) {
        isRunning = true;
        (function renderCursor() {
          cursorX += (targetX - cursorX) * 0.22;
          cursorY += (targetY - cursorY) * 0.22;
          cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
          requestAnimationFrame(renderCursor);
        })();
      }
    });

    document.addEventListener("pointerover", e => {
      const isInteractive = !!e.target.closest("a, button, input, textarea, .glass-card");
      cursor.classList.toggle("hovering", isInteractive);
    });
  }

  // 12. Theme Switcher (Dark / Light)
  function initTheme() {
    const toggleBtn = $("#theme-toggle");
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("aslam_portfolio_theme") || "dark";
    root.setAttribute("data-theme", savedTheme);

    function updateThemeIcon(theme) {
      if (!toggleBtn) return;
      toggleBtn.innerHTML =
        theme === "dark"
          ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
          : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
    }
    updateThemeIcon(savedTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("aslam_portfolio_theme", next);
        updateThemeIcon(next);
      });
    }
  }

  // 13. Mobile Menu Toggle
  function initMobileMenu() {
    const btn = $("#mobile-menu-toggle");
    const links = $("#nav-links-menu");
    if (!btn || !links) return;

    btn.addEventListener("click", () => {
      links.classList.toggle("mobile-open");
    });

    // Close when clicking a link
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("mobile-open");
      });
    });
  }

  // 14. 3D Card Hover Perspective Tilt
  function initCard3DTilt() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    $$(".glass-card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotX = (0.5 - y) * 8;
        const rotY = (x - 0.5) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Visitor Welcome Greeting Toast
  function initVisitorWelcome() {
    const toast = $("#visitor-welcome-toast");
    if (!toast) return;

    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem("portfolio_welcome_dismissed");
    if (isDismissed === "true") return;

    // Reveal after 1.2s delay for seamless visitor welcome
    setTimeout(() => {
      toast.style.display = "block";
    }, 1200);

    const closeBtn = $("#close-welcome-toast");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        toast.style.animation = "toastSlideDown 0.3s ease forwards";
        sessionStorage.setItem("portfolio_welcome_dismissed", "true");
        setTimeout(() => {
          toast.style.display = "none";
        }, 300);
      });
    }

    const exploreBtn = $("#toast-explore-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        toast.style.display = "none";
      });
    }
  }

  // Document Ready
  document.addEventListener("DOMContentLoaded", () => {
    initProfile();
    renderStats();
    renderSkills();
    renderExperience();
    renderProjects();
    renderWhatIDo();
    renderEducation();
    initContactForm();
    initScrollTriggers();
    initCustomCursor();
    initTheme();
    initMobileMenu();
    initCard3DTilt();
    initVisitorWelcome();
  });
})();

