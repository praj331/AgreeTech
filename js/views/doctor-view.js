/**
 * RETINA AI - Doctor / Ophthalmologist Workspace
 * Implements Phase 5D:
 * - Prioritized assigned case queue (urgent, unable-to-assess, general)
 * - Side-by-side bilateral fundus image viewer
 * - AI preliminary grade (0–4) with confidence and model metadata
 * - Grad-CAM explainability visualization toggle
 * - Independent clinical assessment form (never overwriting AI output)
 * - Digital sign-off and referral recommendations
 */

import { MOCK_DATA } from '../mock-data.js';

export class DoctorView {
  static render() {
    const selectedCase = MOCK_DATA.cases[0]; // Active case for review

    return `
      <div class="dashboard-layout">
        <div class="dashboard-header-bar">
          <div class="container dashboard-header-inner">
            <div class="dashboard-user-info">
              <span class="role-badge-pill" style="background: #e0f2fe; color: #0284c7;">Ophthalmologist Workspace</span>
              <div>
                <h1 class="dashboard-title">${MOCK_DATA.currentUser.name} (${MOCK_DATA.currentUser.title})</h1>
                <p class="dashboard-context">Reg: <strong>${MOCK_DATA.currentUser.regNumber}</strong> &bull; Scope: ${MOCK_DATA.currentUser.orgName}</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary btn-sm" onclick="window.RetinaRouter.navigate('signin')">Switch Role</button>
              <button class="btn btn-outline btn-sm" onclick="alert('Doctor Queue Refreshed.')">Refresh Queue</button>
            </div>
          </div>
        </div>

        <div class="container">
          <!-- Doctor Queue Overview -->
          <div class="panel-card" style="margin-bottom: 24px;">
            <div class="panel-card-header">
              <div>
                <h3 class="panel-card-title">Assigned Case Queue (Prioritized Triage)</h3>
                <p style="font-size: 0.8125rem; color: var(--color-text-muted);">Queue order: Urgent cases &gt; Unable-to-assess cases &gt; Oldest first (PRD §6)</p>
              </div>
              <span class="grade-pill grade-2" style="font-size: 0.8125rem;">3 Pending Review</span>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Patient Name</th>
                    <th>Age / Sex</th>
                    <th>Camp Location</th>
                    <th>Right Eye (OD)</th>
                    <th>Left Eye (OS)</th>
                    <th>AI Prediction</th>
                    <th>Triage Urgency</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${MOCK_DATA.cases.map((c, i) => `
                    <tr style="${i === 0 ? 'background: #f0f9ff; font-weight: 500;' : ''}">
                      <td><strong>${c.id}</strong></td>
                      <td>${c.patientName}</td>
                      <td>${c.age}y / ${c.gender}</td>
                      <td>${c.campName}</td>
                      <td>${c.rightEye.gradeLabel}</td>
                      <td>${c.leftEye.gradeLabel}</td>
                      <td>
                        <span class="grade-pill grade-${c.rightEye.predictedGrade !== null ? c.rightEye.predictedGrade : '0'}" style="font-size: 0.75rem;">
                          ${c.rightEye.gradeLabel}
                        </span>
                      </td>
                      <td>
                        <span class="badge-quality ${c.urgency === 'HIGH' ? 'quality-unable' : c.urgency === 'MODERATE' ? 'quality-retake' : 'quality-acceptable'}">
                          ${c.urgency}
                        </span>
                      </td>
                      <td>
                        <button class="btn ${i === 0 ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="alert('Viewing Case: ${c.id}')">
                          ${i === 0 ? 'Active Case' : 'Review'}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Active Case Clinical Review Workspace (PRD FR-08, FR-09) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <div>
                <h3 class="panel-card-title">Clinical Review Workspace: ${selectedCase.patientName}</h3>
                <p style="font-size: 0.8125rem; color: var(--color-text-muted);">ID: ${selectedCase.patientId} &bull; Case: ${selectedCase.id} &bull; Camp: ${selectedCase.campName}</p>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-toggle-gradcam" onclick="window.RetinaRouter.toggleGradCAM()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path></svg>
                Toggle Grad-CAM Explainability Heatmap
              </button>
            </div>

            <!-- Bilateral Image Comparison with Grad-CAM -->
            <div class="bilateral-grid" style="margin-bottom: 28px;">
              <!-- Right Eye Viewer -->
              <div class="eye-card">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-right">Right Eye (OD)</span>
                  <span class="badge-quality quality-acceptable">Quality: ${selectedCase.rightEye.qualityStatus}</span>
                </div>
                <div class="eye-image-wrap">
                  <img src="${selectedCase.rightEye.imageKey}" alt="Right eye fundus">
                  <div class="eye-gradcam-overlay" id="gradcam-overlay-right"></div>
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5;">
                  <div>AI Prediction: <strong style="color: var(--color-navy);">Grade 2 (${selectedCase.rightEye.gradeLabel})</strong></div>
                  <div>Model Confidence: <strong>${(selectedCase.rightEye.confidence * 100).toFixed(0)}%</strong> &bull; Version: <code>${selectedCase.rightEye.modelVersion}</code></div>
                  <div style="font-size: 0.75rem; color: var(--color-text-light); margin-top: 4px;">*Grad-CAM highlights regions influencing the model; does not constitute lesion segmentation.</div>
                </div>
              </div>

              <!-- Left Eye Viewer -->
              <div class="eye-card">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-left">Left Eye (OS)</span>
                  <span class="badge-quality quality-acceptable">Quality: ${selectedCase.leftEye.qualityStatus}</span>
                </div>
                <div class="eye-image-wrap">
                  <img src="${selectedCase.leftEye.imageKey}" alt="Left eye fundus">
                  <div class="eye-gradcam-overlay" id="gradcam-overlay-left"></div>
                </div>
                <div style="font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5;">
                  <div>AI Prediction: <strong style="color: var(--color-navy);">Grade 1 (${selectedCase.leftEye.gradeLabel})</strong></div>
                  <div>Model Confidence: <strong>${(selectedCase.leftEye.confidence * 100).toFixed(0)}%</strong> &bull; Version: <code>${selectedCase.leftEye.modelVersion}</code></div>
                  <div style="font-size: 0.75rem; color: var(--color-text-light); margin-top: 4px;">*Grad-CAM highlights regions influencing the model; does not constitute lesion segmentation.</div>
                </div>
              </div>
            </div>

            <!-- Independent Doctor Assessment Form (DECISIONS.md D-004: Separate Records) -->
            <form id="doctor-assessment-form" onsubmit="window.RetinaRouter.submitDoctorReview(event, '${selectedCase.id}')">
              <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 16px;">
                Independent Clinical Assessment &amp; Final Sign-Off
              </h4>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Clinical Agreement with AI Grade</label>
                  <select class="form-select" id="doc-agree" required>
                    <option value="AGREE" selected>Agree with AI Severity Rating (Grade 2 Moderate DR)</option>
                    <option value="DISAGREE_UPGRADE">Disagree &mdash; Upgrade to Severe NPDR (Grade 3)</option>
                    <option value="DISAGREE_DOWNGRADE">Disagree &mdash; Downgrade to Mild NPDR (Grade 1)</option>
                    <option value="UNABLE">Clinical Inconclusive &mdash; In-Person Slit-Lamp Exam Required</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Independent Doctor Confirmed Grade</label>
                  <select class="form-select" id="doc-grade" required>
                    <option value="0">Grade 0: No Apparent Diabetic Retinopathy</option>
                    <option value="1">Grade 1: Mild Non-Proliferative DR (Microaneurysms only)</option>
                    <option value="2" selected>Grade 2: Moderate Non-Proliferative DR</option>
                    <option value="3">Grade 3: Severe Non-Proliferative DR (4-2-1 rule)</option>
                    <option value="4">Grade 4: Proliferative Diabetic Retinopathy</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Clinical Observations &amp; Microvascular Findings</label>
                <textarea class="form-textarea" id="doc-notes" rows="3" placeholder="Enter clinical impressions: microaneurysms, blot hemorrhages, hard exudates, cotton-wool spots, venous beading, or macular involvement..." required>Right eye demonstrates moderate microaneurysms with small intraretinal blot hemorrhages along superior and inferior temporal arcades. Left eye reveals early focal microaneurysms. Central foveal reflex preserved bilaterally; no overt clinically significant macular edema (CSME) visible on fundus photography.</textarea>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Clinical Recommendation &amp; Referral Triage</label>
                  <select class="form-select" id="doc-recommendation" required>
                    <option value="REFERRAL_OPD" selected>Refer to District Hospital Eye OPD for Dilated Exam (Within 3–4 Weeks)</option>
                    <option value="URGENT_OCT">Urgent Vitreoretinal OPD + Macular OCT (Within 1 Week)</option>
                    <option value="ROUTINE_6MO">Routine Retinal Follow-Up in 6 Months (Primary Care Clinic)</option>
                    <option value="ANNUAL">Annual Diabetic Screening Checkup</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Follow-Up Recommended Date</label>
                  <input type="date" class="form-input" id="doc-date" value="2026-11-28" required>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 18px; border-top: var(--border-light); margin-top: 20px;">
                <span style="font-size: 0.8125rem; color: var(--color-text-muted);">
                  Signing as: <strong>${MOCK_DATA.currentUser.name}</strong> (${MOCK_DATA.currentUser.regNumber})
                </span>
                <button type="submit" class="btn btn-primary btn-lg">
                  Sign &amp; Finalize Clinical Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
