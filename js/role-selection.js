/**
 * RETINA AI - Sign-In Role Selection View
 * 4-Card Healthcare Gateway: Patient, Screening Operator, NGO/Hospital, Doctor
 */

export class RoleSelection {
  static render() {
    return `
      <div class="role-selection-wrapper">
        <div class="text-center" style="margin-bottom: 24px;">
          <span class="kicker-badge">
            <span class="dot"></span>
            Role-Based Clinical Access
          </span>
          <h2 class="section-title">Select Your RETINA AI Portal</h2>
          <p class="section-subtitle">
            Secure, authorized authentication scoped to your designated clinical responsibilities and care setting.
          </p>
        </div>

        <div class="roles-grid-4">
          <!-- Card 1: Patient -->
          <div class="role-card" onclick="window.RetinaRouter.navigate('patient')">
            <div>
              <div class="role-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 class="role-title">Patient</h3>
              <p class="role-desc">
                View your bilateral screening status, access preliminary AI results, read doctor-reviewed clinical reports, and download follow-up instructions.
              </p>
            </div>
            <button class="btn btn-secondary" style="width: 100%;">
              Continue as Patient &rarr;
            </button>
          </div>

          <!-- Card 2: Screening Operator -->
          <div class="role-card" onclick="window.RetinaRouter.navigate('operator')">
            <div>
              <div class="role-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <h3 class="role-title">Screening Operator</h3>
              <p class="role-desc">
                Access assigned field camps, register patients with informed consent, capture/upload bilateral retinal images, and review immediate image quality triage.
              </p>
            </div>
            <button class="btn btn-secondary" style="width: 100%;">
              Continue as Operator &rarr;
            </button>
          </div>

          <!-- Card 3: NGO / Hospital -->
          <div class="role-card" onclick="window.RetinaRouter.navigate('ngo')">
            <div>
              <div class="role-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 21h18"></path>
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
                  <path d="M9 7h6"></path>
                  <path d="M9 11h6"></path>
                  <path d="M9 15h6"></path>
                </svg>
              </div>
              <h3 class="role-title">NGO / Hospital</h3>
              <p class="role-desc">
                Coordinate diabetic screening camps, generate public registration links &amp; QR codes, assign operators and doctors, and track screening &amp; referral metrics.
              </p>
            </div>
            <button class="btn btn-secondary" style="width: 100%;">
              Continue as Organization &rarr;
            </button>
          </div>

          <!-- Card 4: Doctor -->
          <div class="role-card" onclick="window.RetinaRouter.navigate('doctor')">
            <div>
              <div class="role-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 class="role-title">Doctor / Ophthalmologist</h3>
              <p class="role-desc">
                Review assigned patient cases, inspect high-resolution fundus images, evaluate preliminary AI grades with Grad-CAM, and sign off independent clinical reports.
              </p>
            </div>
            <button class="btn btn-primary" style="width: 100%;">
              Enter Doctor Workspace &rarr;
            </button>
          </div>
        </div>

        <!-- Administrator Access Link -->
        <div class="text-center" style="margin-top: 40px; padding-top: 24px; border-top: var(--border-light);">
          <p style="font-size: 0.8125rem; color: var(--color-text-light);">
            Platform Administrator? 
            <a href="#admin" onclick="window.RetinaRouter.navigate('admin'); return false;" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">
              Access Administrative Console
            </a>
          </p>
        </div>
      </div>
    `;
  }
}
