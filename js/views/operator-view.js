/**
 * RETINA AI - Screening Operator Interface
 * Implements Phase 5B:
 * - Camp selection and queue management
 * - Patient registration with consent capture
 * - Bilateral image capture & upload with explicit RIGHT/LEFT labeling
 * - Instant image-quality assessment feedback (ACCEPTABLE, RETAKE_REQUIRED, UNABLE_TO_ASSESS)
 * - Retake workflows preventing ungradable scans from false normal results
 */

import { MOCK_DATA } from '../mock-data.js';

export class OperatorView {
  static render() {
    const activeCamp = MOCK_DATA.camps[0];

    return `
      <div class="dashboard-layout">
        <div class="dashboard-header-bar">
          <div class="container dashboard-header-inner">
            <div class="dashboard-user-info">
              <span class="role-badge-pill" style="background: #fef3c7; color: #b45309;">Screening Operator</span>
              <div>
                <h1 class="dashboard-title">Operator Field Workspace &bull; ${MOCK_DATA.currentUser.orgName}</h1>
                <p class="dashboard-context">Active Camp: <strong>${activeCamp.name}</strong> (${activeCamp.location})</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary btn-sm" onclick="window.RetinaRouter.navigate('signin')">Switch Role</button>
              <button class="btn btn-primary btn-sm" onclick="window.RetinaRouter.showNewPatientModal()">+ Register New Patient</button>
            </div>
          </div>
        </div>

        <div class="container">
          <!-- Operator Summary Stats -->
          <div class="stats-grid-4">
            <div class="stat-card">
              <div class="stat-val">${activeCamp.registeredPatients}</div>
              <div class="stat-lbl">Camp Registered Patients</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-primary);">${activeCamp.screenedPatients}</div>
              <div class="stat-lbl">Bilateral Scans Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-warning);">3</div>
              <div class="stat-lbl">Retakes Required</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-success);">94.8%</div>
              <div class="stat-lbl">Image Suitability Rate</div>
            </div>
          </div>

          <!-- Active Bilateral Capture / Upload Interface (PRD FR-03, FR-04) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <div>
                <h3 class="panel-card-title">Bilateral Fundus Capture &amp; Image Quality Triage</h3>
                <p style="font-size: 0.8125rem; color: var(--color-text-muted);">Current Subject: <strong>Chandrakant Bapu More</strong> (ID: PT-893 &bull; 52y Male)</p>
              </div>
              <span class="badge-quality quality-retake">Attention: Retake Required on Left Eye</span>
            </div>

            <div class="bilateral-grid">
              <!-- Right Eye Slot -->
              <div class="eye-card">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-right">Right Eye (OD)</span>
                  <span class="badge-quality quality-acceptable">Quality: ACCEPTABLE</span>
                </div>
                <div class="eye-image-wrap">
                  <img src="assets/images/retina_fundus_real.jpg" alt="Captured Right eye fundus">
                </div>
                <div style="background: #ffffff; border: var(--border-light); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 12px; font-size: 0.8125rem;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="color: var(--color-text-muted);">Illumination &amp; Contrast:</span>
                    <strong style="color: var(--color-status-success);">Optimal (0.94)</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-text-muted);">Focus Clarity:</span>
                    <strong style="color: var(--color-status-success);">Clear Fovea Reflex</strong>
                  </div>
                </div>
                <button class="btn btn-outline btn-sm" onclick="alert('Image is already acceptable. You can recapture if required.')">Recapture OD</button>
              </div>

              <!-- Left Eye Slot (Demonstrates Rule 3 & D-003: Retake Required, Not Grade 0!) -->
              <div class="eye-card" style="border: 2px dashed #f59e0b;">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-left">Left Eye (OS)</span>
                  <span class="badge-quality quality-retake">RETAKE REQUIRED</span>
                </div>
                <div class="eye-image-wrap" style="background: #1e293b; color: #94a3b8; display: flex; flex-direction: column; gap: 8px; text-align: center; padding: 24px;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  <strong style="color: #ffffff;">Motion Blur &amp; Blink Detected</strong>
                  <span style="font-size: 0.75rem;">Center foveal avascular zone obscured. Unsuitable for diagnostic grading.</span>
                </div>
                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-sm); padding: 12px; margin-bottom: 12px; font-size: 0.8125rem; color: #92400e;">
                  <strong>Guidance:</strong> Please ask patient to blink, reposition chin rest, stabilize fixation light, and capture OS again.
                </div>
                <button class="btn btn-primary btn-sm" onclick="window.RetinaRouter.simulateRecapture('case-2026-0893', 'LEFT')">
                  Capture Left Eye (OS) Now
                </button>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 18px; border-top: var(--border-light);">
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">
                Rule: Both eyes must be acceptable or explicitly marked UNABLE_TO_ASSESS before clinical routing.
              </span>
              <button class="btn btn-secondary" onclick="alert('Submission queued: Right eye assessed; awaiting left eye recapture.')">
                Submit Screening Package
              </button>
            </div>
          </div>

          <!-- Camp Patient Screening Queue Table -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Camp Screening Queue (${activeCamp.name})</h3>
              <input type="text" class="form-input" placeholder="Search patient by ID or Name..." style="max-width: 260px;">
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Full Name</th>
                    <th>Age / Sex</th>
                    <th>OD (Right Eye)</th>
                    <th>OS (Left Eye)</th>
                    <th>Consent</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${MOCK_DATA.cases.map(c => `
                    <tr>
                      <td><strong>${c.patientId}</strong></td>
                      <td>${c.patientName}</td>
                      <td>${c.age}y / ${c.gender}</td>
                      <td>
                        <span class="badge-quality ${c.rightEye.qualityStatus === 'ACCEPTABLE' ? 'quality-acceptable' : 'quality-retake'}">
                          ${c.rightEye.qualityStatus}
                        </span>
                      </td>
                      <td>
                        <span class="badge-quality ${c.leftEye.qualityStatus === 'ACCEPTABLE' ? 'quality-acceptable' : 'quality-retake'}">
                          ${c.leftEye.qualityStatus}
                        </span>
                      </td>
                      <td>
                        <span style="color: var(--color-status-success); font-weight: 600;">Recorded</span>
                      </td>
                      <td>
                        <span class="grade-pill ${c.overallStatus === 'REVIEWED' ? 'grade-0' : 'grade-2'}" style="font-size: 0.75rem;">
                          ${c.overallStatus}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-outline btn-sm" onclick="alert('Viewing case details for ${c.patientId}')">View</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
