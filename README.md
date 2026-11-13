# Aslam Rashid Shaikh — Senior Full Stack .NET Developer Portfolio

> **Production-Ready &bull; Recruiter-Focused &bull; 3D Interactive &bull; Zero-Cost Firebase Hosting**

Welcome to the official repository for **Aslam Rashid Shaikh**'s personal portfolio website. This project has been upgraded into a modern, cinematic web application with real-time 3D Three.js graphics, interactive project architecture case studies, a recruiter contact form, and a dedicated administrative console for resume management.

---

## 🌟 Key Features

### 1. 📄 Easy Resume Upload & Management (`/admin`)
- **Secure Portal**: Access restricted strictly to **`shaikhaslame0@gmail.com`**.
- **Upload & Replace**: Upload new PDF resumes anytime with drag-and-drop or file picker.
- **Instant Website Sync**: Replacing the resume in `/admin` immediately updates the public "Download Resume" links across the entire website.
- **Validation**: Strict validation of PDF MIME type and size limit (&le; 10 MB).
- **Rollback / Backup**: Option to revert to the previous backup version with one click.
- **In-Browser Preview**: Embedded PDF preview frame directly in the dashboard.
- **Availability Toggle**: Switch between *"Available for Senior .NET / Full Stack Roles"* and custom availability statuses in real-time.

### 2. 📬 Working Recruiter Contact Form ("Let's Connect")
- **Direct Delivery**: Sends recruiter messages directly to **`shaikhaslame0@gmail.com`**.
- **EmailJS Integration**: Pre-configured with Service ID `service_pbmmpmp`.
- **Anti-Spam Honeypot**: Hidden honeypot field catches automated bots without disrupting legitimate recruiters.
- **Validation & Duplicate Protection**: Client-side validation with real-time error messages and submit button loading states.
- **Graceful Fallback**: If EmailJS is temporarily unreachable, provides an instant 1-click `mailto:` launch with prefilled subject and message.

### 3. 🎨 Cinematic 3D Design & Smooth Animations
- **Palette**: Deep space navy (`#050816`), cyan (`#22d3ee`), electric blue (`#3b82f6`), and violet (`#8b5cf6`).
- **Three.js 3D Hero**: Interactive floating geometric core (wireframe Icosahedron + Torus Knot) with 600+ particle constellation nodes responding smoothly to cursor movement.
- **WebGL Fallback**: Graceful CSS gradient fallback on devices without WebGL support.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` for accessibility.
- **Dashboard Mockups**: 3D-angled glassmorphic window mockups illustrating real-world banking kiosk monitoring, queue displays, and bilingual workflows.

### 4. 💼 10 Recruiter-Focused Sections
1. **Hero / Introduction** (Punchy value proposition, live availability status, primary CTAs, key stats)
2. **About Me** (4.6+ years experience, Tier-1 banking clients, full-stack SDLC ownership)
3. **Technical Skills** (Categorized into Backend, Frontend, Databases, Desktop, Cloud/DevOps, and Engineering Practices)
4. **Professional Experience** (Aurionpro Solutions [Current], Kadvekar Consultancy, NeoQuant Solutions)
5. **Featured Projects** (SBI Kiosk System, Union Bank QMS, Bank of Muscat QMS, Little Champs)
6. **What I Do** (Full-Stack Architecture, REST APIs, Banking Enterprise Systems, SQL Tuning, Production Support)
7. **Freelance Project** (Live Production: Little Champs Pre-Primary School with Angular 17 & Firebase)
8. **Education & Certification** (B.Sc. IT Mumbai University Grade A 8.25 CGPI, .NET Certification)
9. **Let's Connect** (Working recruiter contact form + direct email & phone)
10. **Footer** (Copyright, quick navigation, back to top, discreet `/admin` portal link)

---

## 📁 Project Structure

```
d:\Self Portfolio Website\
├── index.html                  # Public recruiter portfolio website
├── admin.html                  # Secure admin console for resume & profile management
├── package.json                # NPM convenience scripts (start, deploy, login)
├── firebase.json               # Firebase Hosting & SPA routing configuration
├── .firebaserc                 # Firebase project alias ("my-portfolio-website")
├── firestore.rules             # Firestore security rules (read public, write admin only)
├── storage.rules               # Storage security rules (read public, upload admin only)
├── css/
│   ├── main.css                # Cinematic dark theme, glassmorphism, responsive grid
│   └── admin.css               # Admin dashboard styling, drag-and-drop zone, form inputs
├── js/
│   ├── config.js               # Centralized data store (resume data, skills, projects, email config)
│   ├── three-scene.js          # Three.js 3D canvas engine with mouse parallax & particles
│   ├── main.js                 # Public site engine, modal popups, contact form validation
│   └── admin.js                # Admin auth, PDF validation, upload & settings engine
└── assets/
    ├── Aslam_Shaikh_Resume.pdf # Pre-bundled initial PDF resume
    ├── resume_preview.jpg      # High-resolution resume preview
    └── d_hero.png              # Hero graphic asset
```

---

## 🚀 Running Locally

You can preview the portfolio locally in any browser:

```powershell
# Method 1: Using the npm start command
npm start
# Opens at: http://localhost:3000

# Method 2: Simply double click or open index.html directly in any web browser!
```

---

## ☁️ Free Firebase Hosting Deployment Guide

Your project is pre-configured for the Firebase project **`my-portfolio-website`**.

### Step 1: Login to Firebase CLI
Run the following command in your terminal. A browser window will open asking you to sign in with the Google account where you created the Firebase project:

```powershell
npx firebase-tools login
```

### Step 2: Deploy to Firebase Hosting
Deploy your portfolio with a single command:

```powershell
npm run deploy:hosting
# Or: npx firebase-tools deploy --only hosting
```

Your site is published worldwide at:
- **`https://my-portfolio-website-4f201.web.app`**
- **`https://my-portfolio-website-4f201.firebaseapp.com`**
- **`https://my-portfolio-website-4f201.web.app/admin`** (Admin Console)

### Step 3: Deploy Security Rules (Optional / If Firestore & Storage are enabled)
```powershell
npm run deploy:rules
```

---

## ✉️ EmailJS Setup (30-Second Configuration)

Your EmailJS Service ID is already configured as **`service_pbmmpmp`**.

To receive recruiter messages via EmailJS:
1. Log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. Go to **Email Templates** &rarr; **Create New Template**.
   - Set the email content to use: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`.
   - Copy your **Template ID** (e.g. `template_xxxxxxx`).
3. Go to **Account** &rarr; Copy your **Public Key** (User ID).
4. Go to **`http://localhost:3000/admin`** (or your live site at `/admin`), paste the Template ID and Public Key, and click **Save EmailJS Settings**.

*Note: If the form is submitted before EmailJS keys are added, the website automatically falls back to opening your recruiter's email client directly with prefilled details, ensuring zero lost messages.*

---

## 🔒 Security & Free-Tier Safety

1. **100% Free**: Firebase Hosting offers 10 GB of free storage and 360 MB/day transfer. Firebase Storage offers 5 GB free. EmailJS provides 200 free emails/month. No paid billing is ever required.
2. **Access Control**: Only `shaikhaslame0@gmail.com` can access the `/admin` portal or upload files.
3. **No Secrets Exposed**: No private keys or passwords are committed to frontend code.

