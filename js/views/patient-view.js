/**
 * RETINA AI - Patient Portal Interface
 * Implements Phase 5A:
 * - Patient screening overview & consent status
 * - Bilateral eye screening viewer (Right Eye vs Left Eye)
 * - Preliminary AI report with uncertainty disclaimer
 * - Doctor-reviewed report with clinical assessment
 * - Report download action and follow-up guidance
 */

import { MOCK_DATA } from '../mock-data.js';

export class PatientView {
  static render() {
    const patientCase = MOCK_DATA.cases[0]; // Rameshwar Gyanoba Kale

    return `
      <div class="dashboard-layout">
        <!-- Top Navigation Bar for Patient -->
        <div class="dashboard-header-bar">
          <div class="container dashboard-header-inner">
            <div class="dashboard-user-info">
              <span class="role-badge-pill">Patient Portal</span>
              <div>
                <h1 class="dashboard-title">${patientCase.patientName} (${patientCase.age}y / ${patientCase.gender})</h1>
                <p class="dashboard-context">Patient ID: <strong>${patientCase.patientId}</strong> &bull; Camp: ${patientCase.campName}</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary btn-sm" onclick="window.RetinaRouter.navigate('signin')">Switch Role</button>
              <button class="btn btn-primary btn-sm" onclick="window.RetinaRouter.downloadReport('${patientCase.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF Report
              </button>
            </div>
          </div>
        </div>

        <div class="container">
          <!-- Status Banner -->
          <div class="panel-card" style="border-left: 4px solid var(--color-primary); margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div>
                <span style="font-size: 0.8125rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">Screening Status</span>
                <h2 style="font-size: 1.25rem; color: var(--color-navy); margin-top: 2px;">Preliminary AI Screening Complete &bull; Awaiting Doctor Review</h2>
                <p style="font-size: 0.875rem; color: var(--color-text-muted);">Informed consent recorded at camp capture on ${patientCase.consentTimestamp}.</p>
              </div>
              <span class="grade-pill grade-2">Overall: Moderate DR Indicated</span>
            </div>
          </div>

          <!-- Bilateral Eye Screening (PRD FR-03, FR-04, FR-05) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Bilateral Retinal Examination</h3>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Independent Right &amp; Left Eye Assessment</span>
            </div>

            <div class="bilateral-grid">
              <!-- Right Eye Card -->
              <div class="eye-card">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-right">Right Eye (Oculus Dexter / OD)</span>
                  <span class="badge-quality quality-acceptable">Quality: ${patientCase.rightEye.qualityStatus}</span>
                </div>
                <div class="eye-image-wrap">
                  <img src="${patientCase.rightEye.imageKey}" alt="Right eye retinal fundus photograph">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-navy);">AI Grade Estimate:</span>
                  <span class="grade-pill grade-2">Grade 2: ${patientCase.rightEye.gradeLabel}</span>
                </div>
                <p style="font-size: 0.8125rem; color: var(--color-text-muted);">Model Confidence: ${(patientCase.rightEye.confidence * 100).toFixed(0)}% (${patientCase.rightEye.modelVersion})</p>
              </div>

              <!-- Left Eye Card -->
              <div class="eye-card">
                <div class="eye-card-header">
                  <span class="eye-tag eye-tag-left">Left Eye (Oculus Sinister / OS)</span>
                  <span class="badge-quality quality-acceptable">Quality: ${patientCase.leftEye.qualityStatus}</span>
                </div>
                <div class="eye-image-wrap">
                  <img src="${patientCase.leftEye.imageKey}" alt="Left eye retinal fundus photograph">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-navy);">AI Grade Estimate:</span>
                  <span class="grade-pill grade-1">Grade 1: ${patientCase.leftEye.gradeLabel}</span>
                </div>
                <p style="font-size: 0.8125rem; color: var(--color-text-muted);">Model Confidence: ${(patientCase.leftEye.confidence * 100).toFixed(0)}% (${patientCase.leftEye.modelVersion})</p>
              </div>
            </div>
          </div>

          <!-- Doctor-Reviewed Report Section (PRD FR-08, FR-09) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Doctor Review &amp; Clinical Follow-Up Plan</h3>
              <span class="badge-quality quality-acceptable" style="background: #e0f2fe; color: #0284c7;">Clinical Review Pending Final Sign-Off</span>
            </div>

            <div style="background: var(--color-bg-page); border: var(--border-light); border-radius: var(--radius-md); padding: 20px; margin-bottom: 20px;">
              <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">Next Recommended Steps for Patient</h4>
              <p style="font-size: 0.9375rem; color: var(--color-text-body); line-height: 1.6; margin-bottom: 12px;">
                Based on preliminary bilateral fundus screening, mild to moderate microvascular changes are identified. You are advised to schedule a comprehensive dilated eye evaluation with an ophthalmologist within <strong>3 to 4 weeks</strong>.
              </p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; font-size: 0.875rem;">
                <div>
                  <span style="color: var(--color-text-muted); display: block;">Recommended Facility:</span>
                  <strong>District Eye Hospital / Retina Clinic OPD</strong>
                </div>
                <div>
                  <span style="color: var(--color-text-muted); display: block;">Follow-Up Due Date:</span>
                  <strong>Before 28 November 2026</strong>
                </div>
                <div>
                  <span style="color: var(--color-text-muted); display: block;">Organizing NGO Support:</span>
                  <strong>Seva Netralaya Care Coordinator</strong>
                </div>
              </div>
            </div>

            <!-- Mandatory Clinical Disclaimer (PRD §1 & DECISIONS.md D-001) -->
            <div class="clinical-disclaimer-box">
              <strong>Medical Disclaimer:</strong> This report contains preliminary screening information generated by an AI assistance model to help organize clinical referrals. It does not constitute a definitive medical diagnosis. A comprehensive clinical examination by a qualified ophthalmologist is required before initiating medical intervention.
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
