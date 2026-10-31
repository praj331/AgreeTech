/**
 * RETINA AI - Platform Administrator Interface
 * Implements Phase 5E:
 * - Organization verification and approval workflow
 * - User account and role management
 * - System audit event log monitoring (PRD FR-11 & SECURITY.md §7)
 */

import { MOCK_DATA } from '../mock-data.js';

export class AdminView {
  static render() {
    return `
      <div class="dashboard-layout">
        <div class="dashboard-header-bar">
          <div class="container dashboard-header-inner">
            <div class="dashboard-user-info">
              <span class="role-badge-pill" style="background: #ede9fe; color: #6d28d9;">Platform Administrator</span>
              <div>
                <h1 class="dashboard-title">System Administration &amp; Governance</h1>
                <p class="dashboard-context">Cross-Organization Oversight &bull; Audit &amp; Compliance</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary btn-sm" onclick="window.RetinaRouter.navigate('signin')">Switch Role</button>
              <button class="btn btn-outline btn-sm" onclick="alert('Exporting verified audit log...')">Export Audit Log</button>
            </div>
          </div>
        </div>

        <div class="container">
          <!-- Administrator Stats -->
          <div class="stats-grid-4">
            <div class="stat-card">
              <div class="stat-val">12</div>
              <div class="stat-lbl">Registered Organizations</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-warning);">2</div>
              <div class="stat-lbl">Pending Org Verifications</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-primary);">48</div>
              <div class="stat-lbl">Authorized Clinicians</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-success);">100%</div>
              <div class="stat-lbl">Audit Coverage (Append-Only)</div>
            </div>
          </div>

          <!-- Organization Approval Table -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Participating Organization Approvals (PRD FR-01)</h3>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">2 Applications Awaiting Verification</span>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Organization Name</th>
                    <th>Type</th>
                    <th>Region / District</th>
                    <th>Camps Active</th>
                    <th>Total Screened</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${MOCK_DATA.organizations.map(org => `
                    <tr>
                      <td><strong>${org.name}</strong></td>
                      <td>${org.type}</td>
                      <td>${org.region}</td>
                      <td>${org.campsActive}</td>
                      <td>${org.totalScreened}</td>
                      <td>
                        <span class="badge-quality quality-acceptable">Verified Active</span>
                      </td>
                      <td>
                        <button class="btn btn-outline btn-sm" onclick="alert('Viewing audit record for ${org.name}')">Audit</button>
                      </td>
                    </tr>
                  `).join('')}
                  <tr>
                    <td><strong>Vidarbha Rural Health Mission</strong></td>
                    <td>Non-Profit Society</td>
                    <td>Nagpur &amp; Wardha Districts</td>
                    <td>0</td>
                    <td>0</td>
                    <td>
                      <span class="badge-quality quality-retake">Pending Review</span>
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="alert('Approved organization: Vidarbha Rural Health Mission')">Approve</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- System Security & Audit Log (SECURITY.md §7) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Security &amp; Clinical Audit Trail (Append-Only)</h3>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Real-Time Event Ledger</span>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Actor Role / ID</th>
                    <th>Action</th>
                    <th>Target Resource</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2026-10-31 16:30:10 IST</td>
                    <td>Doctor (Dr. Anjali Deshmukh)</td>
                    <td>CLINICAL_REVIEW_SIGNED</td>
                    <td>Case PT-892 (Right Grade 3, Left Grade 2)</td>
                    <td><strong style="color: var(--color-status-success);">SUCCESS</strong></td>
                  </tr>
                  <tr>
                    <td>2026-10-31 11:05:40 IST</td>
                    <td>Operator (Suresh Patil)</td>
                    <td>IMAGE_QUALITY_CHECK</td>
                    <td>Case PT-893 / Left Eye (OS)</td>
                    <td><strong style="color: var(--color-status-warning);">RETAKE_FLAGGED</strong></td>
                  </tr>
                  <tr>
                    <td>2026-10-31 09:42:15 IST</td>
                    <td>Patient (Rameshwar Kale)</td>
                    <td>INFORMED_CONSENT_RECORDED</td>
                    <td>Camp #104 Consent Form v2.1</td>
                    <td><strong style="color: var(--color-status-success);">SUCCESS</strong></td>
                  </tr>
                  <tr>
                    <td>2026-10-31 08:30:00 IST</td>
                    <td>NGO Admin (Seva Netralaya)</td>
                    <td>CAMP_ACTIVATED</td>
                    <td>Shirur Camp #104</td>
                    <td><strong style="color: var(--color-status-success);">SUCCESS</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
