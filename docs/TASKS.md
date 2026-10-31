# Tasks and Delivery Roadmap — RETINA AI

**Status convention:** `[ ]` not started · `[-]` in progress / partially implemented · `[x]` completed and verified.  
*Source of truth: Updated post-repository inspection on 31 October 2026.*

---

## Phase 0 — Repository Baseline & Architecture Audit
- [x] Inspect repository and record actual frontend/backend/database stack (HTML5, CSS3, Vanilla JS ES6 modules, Vite, Three.js, GSAP ScrollTrigger).
- [x] Map existing routes, roles, tables, storage buckets, and API contracts (currently static frontend prototype at `/`; no backend/DB connected yet).
- [x] Identify implemented, partial, and missing features against `PRD.md` and `ARCHITECTURE.md`.
- [x] Confirm project name: **RETINA AI** (standardized across all documentation).
- [-] Confirm clinical partner and intended screening pathway (documented in `PRD.md` and `SYSTEM_DESIGN.md`).

---

## Phase 1 — Landing Page Redesign & Brand Alignment
- [-] **Hero Section — Scroll-Controlled Eye-Opening Animation**:
  - [x] High-resolution photographic closed-to-open eye assets loaded.
  - [x] GSAP ScrollTrigger pinned timeline setup.
  - [ ] Refine animation to transition directly and smoothly into the authentic clinical fundus photograph without lingering 3D cutaway layers.
  - [ ] Ensure the authentic clinical retinal fundus remains prominent and clearly visible as the destination visual.
- [ ] **Landing Page Content & Copywriting**:
  - [ ] Update hero heading: *"Early Detection. Better Vision. Healthier Futures."*
  - [ ] Update supporting text: *"An AI-assisted retinal screening platform designed to support diabetic retinopathy screening, improve access to preliminary retinal assessment, and connect patients with healthcare professionals."*
  - [ ] Add Primary CTA (*Get Started / Sign In*) and Secondary CTA (*Explore How It Works*).
  - [ ] Update sections: About RETINA AI, Why Early Screening Matters, 7-Step Screening Process, AI Assessment, Doctor Review & NGO Camps.
- [ ] **7-Step Screening Process Section**:
  - [ ] Step 1: Patient registration & consent.
  - [ ] Step 2: Retinal image capture (bilateral).
  - [ ] Step 3: Image quality assessment (acceptable vs. retake required).
  - [ ] Step 4: AI-assisted DR severity classification (Grade 0–4).
  - [ ] Step 5: Preliminary screening report generation.
  - [ ] Step 6: Doctor review & clinical notes.
  - [ ] Step 7: Patient report delivery & follow-up tracking.
- [ ] **Landing Page Clean-Up**:
  - [ ] Remove the bottom registration form completely (patient/doctor/org forms belong in role auth workflows).
  - [ ] Remove phone number and physical address placeholders from the footer.
  - [ ] Ensure blue-and-white medical styling (pure white, light blue, dark navy typography).

---

## Phase 2 — Sign-In Role Selection & Authentication Gateway
- [ ] **Role Selection Screen**:
  - [ ] Build 4-card role selection screen upon clicking *Sign In*:
    1. **Patient**: View screening status, reports, and follow-up guidance.
    2. **Screening Operator**: Camp management, bilateral image capture, quality triage.
    3. **NGO / Hospital**: Camp coordination, staff assignment, screening analytics.
    4. **Doctor**: Case review queue, AI assessment review, clinical sign-off.
  - [ ] Professional healthcare card layout with distinct icons, descriptions, and continue actions.
- [-] **Authentication & Role Navigation**:
  - [-] Client-side role routing / modal gateway.
  - [ ] Integration with backend authentication (Supabase Auth / JWT) when API credentials are provided.
  - [ ] Platform administrator access link/route (segregated from general patient-facing roles).

---

## Phase 3 — Role-Based Frontend Interfaces

### A. Patient Interface
- [ ] Patient Dashboard with active screening status.
- [ ] Personal profile and consent verification badge.
- [ ] Bilateral eye screening viewer (Right Eye vs. Left Eye).
- [ ] Preliminary AI Report card (Grade 0–4 with uncertainty disclaimer).
- [ ] Doctor-Reviewed Report card with independent clinical notes.
- [ ] Report PDF download trigger and follow-up instruction card.

### B. Screening Operator Interface
- [ ] Operator Dashboard with assigned camps.
- [ ] Patient Registration & Search module (minimal required fields, consent timestamp).
- [ ] Screening Queue with status tracking.
- [ ] Bilateral Image Upload / Capture interface with explicit `RIGHT` / `LEFT` tags.
- [ ] Image Quality Triage feedback (`ACCEPTABLE`, `RETAKE_REQUIRED`, `UNABLE_TO_ASSESS`).
- [ ] Case submission to AI inference pipeline.

### C. NGO / Hospital Interface
- [ ] Organization Dashboard with aggregate screening analytics.
- [ ] Camp Management: create/edit camp (location, date, capacity, staff).
- [ ] Camp Registration Link / QR Code generator.
- [ ] Staff & Doctor assignment workflow.
- [ ] Screening case queues: pending review, completed, follow-up required.
- [ ] Organization-level exportable reports.

### D. Doctor Interface
- [ ] Doctor Dashboard with prioritized case queue.
- [ ] Filterable case list (urgent, unable-to-assess, general).
- [ ] Case Review Workspace:
  - [ ] Side-by-side bilateral fundus viewer with zoom/pan.
  - [ ] Image quality validation status.
  - [ ] AI preliminary DR grade (0–4) with confidence scores.
  - [ ] Grad-CAM explainability visualization toggle.
  - [ ] Independent Clinical Assessment form (separate from AI grade).
  - [ ] Clinical recommendations, referral facility, and follow-up date input.
  - [ ] Doctor digital sign-off and report finalize trigger.

### E. Platform Administrator Interface
- [ ] Organization approval / pending verification table.
- [ ] User role and access management.
- [ ] System audit event log viewer.

---

## Phase 4 — AI & Backend Integration (Dependencies & Gaps)
- [ ] Image Quality Assessment service integration (`assess_image_quality`).
- [ ] DR Severity Classification inference integration (`classify_dr` -> Grade 0–4).
- [ ] Grad-CAM heatmap overlay generation service (`generate_gradcam`).
- [ ] Secure private object storage integration (signed URLs for fundus images).
- [ ] Audit logging for clinical assessments and consent events.
- [ ] SMS provider integration for report readiness notifications (optional/conditional).

---

## Phase 5 — Responsive Design & Accessibility
- [ ] Responsive navigation drawer on mobile and tablet.
- [ ] Mobile-optimized eye-opening scroll animation (touch-friendly, no overflow).
- [ ] Accessible color contrast (WCAG AA compliance for clinical blue & white).
- [ ] Semantic HTML and ARIA labels on medical viewers and forms.
- [ ] `prefers-reduced-motion` static fundus fallback.

---

## Phase 6 — Verification, Testing & Release
- [ ] End-to-end route navigation testing for all 4 roles.
- [ ] Eye-opening scroll test across desktop, laptop, tablet, and mobile.
- [ ] Form validation testing (patient registration, doctor review, camp setup).
- [ ] Asset integrity check (no broken image links, high-res fundus display).
- [ ] Console audit (0 runtime errors or warnings).
- [ ] Final implementation report and demo preparation.
