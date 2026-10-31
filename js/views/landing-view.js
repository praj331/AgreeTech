/**
 * RETINA AI - Landing Page View Component
 * Follows Phase 3 & PRD specifications:
 * - Hero: "Early Detection. Better Vision. Healthier Futures."
 * - Sticky realistic eye-opening animation -> direct authentic fundus photograph
 * - 7-Step Screening Process section
 * - Clinical rationale, AI assessment, Doctor review, NGO screening camps
 * - Zero bottom registration form
 * - Clean footer (no phone or physical address)
 */

export class LandingView {
  static render() {
    return `
      <!-- 1. Hero Section -->
      <section class="hero-section" id="hero">
        <div class="container hero-content-wrapper">
          <div class="kicker-badge">
            <span class="dot"></span>
            AI-Assisted Retinal Screening Platform
          </div>
          <h1 class="hero-heading">Early Detection. Better Vision. Healthier Futures.</h1>
          <p class="hero-subtext">
            An AI-assisted retinal screening platform designed to support diabetic retinopathy screening, improve access to preliminary retinal assessment, and connect patients with healthcare professionals.
          </p>

          <div class="hero-cta-group">
            <button class="btn btn-primary btn-lg" onclick="window.RetinaRouter.navigate('signin')">
              Get Started / Sign In &rarr;
            </button>
            <a href="#screening-process" class="btn btn-secondary btn-lg">
              Explore How It Works
            </a>
          </div>

          <!-- Realistic Eye-Opening Experience Container -->
          <div class="hero-eye-experience" id="hero-eye-experience" aria-label="Interactive Eye Opening and Retinal Fundus Animation">
            <div class="eye-canvas-container">
              <canvas id="eye-hero-canvas"></canvas>
              <!-- Accessible Fallback -->
              <div class="eye-static-fallback">
                <img src="assets/images/retina_fundus_real.jpg" alt="Clinical Retinal Fundus Photograph showing Optic Disc and Blood Vessels">
              </div>
            </div>
            <div class="eye-caption-bar">
              <div class="eye-status-badge">
                <span class="badge-dot"></span>
                <span id="eye-stage-badge">Stage 1 / 3</span>
              </div>
              <span id="eye-stage-caption" style="font-weight: 500;">Scroll to open the eye &amp; reveal the clinical retinal fundus</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. About RETINA AI Section -->
      <section class="section-padding" id="about" style="background-color: #ffffff; border-bottom: var(--border-light);">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
            <div>
              <span class="kicker-badge">
                <span class="dot"></span>
                About the Platform
              </span>
              <h2 class="section-title">Bridging Primary Care &amp; Retinal Specialists</h2>
              <p style="font-size: 1.125rem; color: var(--color-navy-muted); margin-bottom: 16px; line-height: 1.6;">
                Diabetic retinopathy (DR) is a leading cause of preventable adult blindness worldwide. In rural and underserved communities, access to specialized ophthalmologists and fundus examination equipment is severely limited.
              </p>
              <p style="color: var(--color-text-muted); font-size: 0.9375rem; line-height: 1.65; margin-bottom: 24px;">
                RETINA AI is engineered to support qualified healthcare workers, NGOs, and hospitals in organizing structured community screening camps, performing rapid quality checks, assessing bilateral fundus images with validated AI models, and routing referable cases directly to ophthalmologists for timely clinical intervention.
              </p>
              <div style="display: flex; gap: 20px;">
                <div style="border-left: 3px solid var(--color-primary); padding-left: 14px;">
                  <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary); display: block;">Bilateral</span>
                  <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Independent Right &amp; Left Eye Analysis</span>
                </div>
                <div style="border-left: 3px solid var(--color-primary); padding-left: 14px;">
                  <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary); display: block;">Doctor-Led</span>
                  <span style="font-size: 0.8125rem; color: var(--color-text-muted);">AI Supports, Never Replaces Qualified Physicians</span>
                </div>
              </div>
            </div>

            <!-- Graphic Card -->
            <div style="background: var(--color-bg-page); border: var(--border-card); border-radius: var(--radius-xl); padding: 32px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-navy); margin-bottom: 12px;">Core Clinical Principles</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px;">
                <li style="display: flex; gap: 10px; font-size: 0.9375rem; color: var(--color-text-body);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Preliminary Information:</strong> AI outputs represent screening estimations, not confirmed diagnoses.</span>
                </li>
                <li style="display: flex; gap: 10px; font-size: 0.9375rem; color: var(--color-text-body);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Preserving Uncertainty:</strong> Unsuitable or ungradable images require recapture and are never converted to Grade 0.</span>
                </li>
                <li style="display: flex; gap: 10px; font-size: 0.9375rem; color: var(--color-text-body);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span><strong>Independent Clinical Notes:</strong> Doctor evaluations remain separate from AI predictions in patient records.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Screening Process Section (7-Step Workflow) -->
      <section class="section-padding" id="screening-process" style="background-color: var(--color-bg-page); border-bottom: var(--border-light);">
        <div class="container text-center">
          <span class="kicker-badge">
            <span class="dot"></span>
            End-to-End Workflow
          </span>
          <h2 class="section-title">Standardized 7-Step Screening Process</h2>
          <p class="section-subtitle">
            A structured pathway connecting community camp registration, image quality assurance, preliminary AI grading, and specialist clinical sign-off.
          </p>

          <div class="process-grid-7">
            <!-- Step 1 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">1</span>
              <h3 class="step-card-title">Patient Registration</h3>
              <p class="step-card-desc">
                Patients register via camp link or onsite operator assistance. Minimal required details and informed consent timestamps are securely recorded.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">2</span>
              <h3 class="step-card-title">Retinal Image Capture</h3>
              <p class="step-card-desc">
                Certified screening operators capture separate Right Eye (OD) and Left Eye (OS) fundus photography using non-mydriatic cameras.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">3</span>
              <h3 class="step-card-title">Image Quality Check</h3>
              <p class="step-card-desc">
                Immediate validation of illumination, focus, and field centering. Poor-quality scans prompt an immediate recapture instead of false analysis.
              </p>
            </div>

            <!-- Step 4 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">4</span>
              <h3 class="step-card-title">AI DR Classification</h3>
              <p class="step-card-desc">
                Eligible images are processed by deep learning models for DR severity grading (Grade 0 to 4) per eye with Grad-CAM explainability heatmaps.
              </p>
            </div>

            <!-- Step 5 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">5</span>
              <h3 class="step-card-title">Preliminary Report</h3>
              <p class="step-card-desc">
                Instant generation of a structured preliminary report with bilateral eye grades, confidence data, and clear non-diagnostic screening notices.
              </p>
            </div>

            <!-- Step 6 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">6</span>
              <h3 class="step-card-title">Doctor Review</h3>
              <p class="step-card-desc">
                Organization-linked cases enter an authorized ophthalmologist's queue for independent clinical evaluation, notes, and referral advice.
              </p>
            </div>

            <!-- Step 7 -->
            <div class="process-step-card text-left">
              <span class="step-num-pill">7</span>
              <h3 class="step-card-title">Report &amp; Follow-Up</h3>
              <p class="step-card-desc">
                Patients receive access to their finalized doctor-reviewed report and referral instructions; organizations track treatment adherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Clinical Rationale & Early Screening Matters -->
      <section class="section-padding" id="why-it-matters" style="background-color: #ffffff; border-bottom: var(--border-light);">
        <div class="container">
          <div class="text-center" style="margin-bottom: 48px;">
            <span class="kicker-badge">
              <span class="dot"></span>
              Public Health Impact
            </span>
            <h2 class="section-title">Why Early Diabetic Screening Matters</h2>
            <p class="section-subtitle">
              Timely detection of diabetic retinopathy can prevent up to 90% of severe vision loss when treated before irreversible microvascular damage occurs.
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
            <div class="panel-card" style="margin-bottom: 0;">
              <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-navy); margin-bottom: 10px;">The Asymptomatic Silent Phase</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6;">
                In Mild and Moderate Non-Proliferative DR (NPDR), microaneurysms and small dot-blot hemorrhages develop without affecting central visual acuity. Patients feel no pain and notice no change in vision until advanced macular edema or proliferative neovascularization begins.
              </p>
            </div>

            <div class="panel-card" style="margin-bottom: 0;">
              <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-navy); margin-bottom: 10px;">Frontline Tele-Ophthalmology</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6;">
                By empowering screening operators and community camps with non-mydriatic fundus capture and immediate AI triage, rural patients are screened at primary health centers, avoiding unnecessary travel while identifying patients in urgent need of hospital care.
              </p>
            </div>

            <div class="panel-card" style="margin-bottom: 0;">
              <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-navy); margin-bottom: 10px;">Closed-Loop Care Tracking</h3>
              <p style="font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.6;">
                Screening is only beneficial if high-risk patients receive treatment. RETINA AI tracks follow-up status, ensuring that patients recommended for laser photocoagulation or anti-VEGF therapy actually attend tertiary hospital appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Footer (Sanitized: No Phone, No Physical Address) -->
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="nav-brand" style="margin-bottom: 14px;">
                <svg class="brand-icon-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="21" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="6 4"/>
                  <circle cx="24" cy="24" r="14" stroke="#38bdf8" stroke-width="2"/>
                  <circle cx="24" cy="24" r="6" fill="#0284c7"/>
                </svg>
                <span class="brand-text">RETINA <span>AI</span></span>
              </div>
              <p class="footer-brand-desc">
                An AI-assisted retinal screening and doctor-supported care workflow designed to coordinate diabetic retinopathy screening in community and clinic settings.
              </p>
            </div>

            <div>
              <h4 class="footer-heading">Platform</h4>
              <ul class="footer-links">
                <li><a href="#hero">Overview</a></li>
                <li><a href="#about">About Solution</a></li>
                <li><a href="#screening-process">Screening Process</a></li>
                <li><a href="#why-it-matters">Clinical Rationale</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Portals</h4>
              <ul class="footer-links">
                <li><a href="#signin" onclick="window.RetinaRouter.navigate('patient'); return false;">Patient Portal</a></li>
                <li><a href="#signin" onclick="window.RetinaRouter.navigate('operator'); return false;">Operator Portal</a></li>
                <li><a href="#signin" onclick="window.RetinaRouter.navigate('ngo'); return false;">NGO &amp; Hospital</a></li>
                <li><a href="#signin" onclick="window.RetinaRouter.navigate('doctor'); return false;">Doctor Workspace</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Compliance &amp; Ethics</h4>
              <ul class="footer-links">
                <li><a href="#" onclick="alert('RETINA AI complies with patient consent guidelines and data minimization principles.'); return false;">Informed Consent Policy</a></li>
                <li><a href="#" onclick="alert('Images and clinical notes are held privately with strict role-based access controls.'); return false;">Data Privacy Notice</a></li>
                <li><a href="#" onclick="alert('AI predictions represent screening information and require independent medical review.'); return false;">Medical Disclaimer</a></li>
                <li><a href="#" onclick="alert('Developed for clinical screening and research validation.'); return false;">Terms &amp; Evaluation</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; 2026 RETINA AI Project. All rights reserved. Clinical screening assistance concept.</p>
            <p>Designed for Healthcare Professionals, NGOs &amp; Patients</p>
          </div>
        </div>
      </footer>
    `;
  }
}
