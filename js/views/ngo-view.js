/**
 * RETINA AI - NGO / Hospital Organization Interface
 * Implements Phase 5C:
 * - Camp management (location, date, capacity, staff)
 * - Public camp registration link & QR code generation
 * - Staff assignment workflow (operators, ophthalmologists)
 * - Screening throughput & referral follow-up tracker
 */

import { MOCK_DATA } from '../mock-data.js';

export class NgoView {
  static render() {
    const org = MOCK_DATA.organizations[0];

    return `
      <div class="dashboard-layout">
        <div class="dashboard-header-bar">
          <div class="container dashboard-header-inner">
            <div class="dashboard-user-info">
              <span class="role-badge-pill" style="background: #e0f2fe; color: #0284c7;">NGO / Hospital Organization</span>
              <div>
                <h1 class="dashboard-title">${org.name}</h1>
                <p class="dashboard-context">${org.type} &bull; Region: ${org.region}</p>
              </div>
            </div>
            <div style="display: flex; gap: 12px;">
              <button class="btn btn-secondary btn-sm" onclick="window.RetinaRouter.navigate('signin')">Switch Role</button>
              <button class="btn btn-primary btn-sm" onclick="window.RetinaRouter.showCreateCampModal()">+ Organize New Camp</button>
            </div>
          </div>
        </div>

        <div class="container">
          <!-- Organization Stats -->
          <div class="stats-grid-4">
            <div class="stat-card">
              <div class="stat-val">${org.totalScreened}</div>
              <div class="stat-lbl">Total Patients Screened</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-primary);">${org.campsActive}</div>
              <div class="stat-lbl">Active &amp; Scheduled Camps</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-warning);">${org.referralRate}</div>
              <div class="stat-lbl">Referral Recommendation Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" style="color: var(--color-status-success);">82.4%</div>
              <div class="stat-lbl">Follow-Up Attendance Tracked</div>
            </div>
          </div>

          <!-- Camp Registration Link & QR Generator (PRD FR-01) -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Community Camp Pre-Registration Link &amp; QR Access</h3>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Scoped Camp Token: <code>camp_token_shirur_104_sec</code></span>
            </div>

            <div class="qr-container">
              <div class="qr-placeholder">
                <!-- SVG QR Code Icon -->
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="var(--color-navy)" stroke-width="1.8">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="6" y="6" width="1" height="1" fill="currentColor"></rect>
                  <rect x="17" y="6" width="1" height="1" fill="currentColor"></rect>
                  <rect x="6" y="17" width="1" height="1" fill="currentColor"></rect>
                </svg>
              </div>

              <div style="flex-grow: 1;">
                <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--color-navy); margin-bottom: 6px;">
                  Shirur Rural Diabetes Screening Camp #104
                </h4>
                <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 12px;">
                  Share this verified registration link or print the QR poster for frontline community health workers (ASHAs) and local diabetes support groups.
                </p>
                <div style="display: flex; gap: 10px; max-width: 520px;">
                  <input type="text" class="form-input" value="https://retina-ai.example/register/camp-104?token=shirur_sec_99" readonly>
                  <button class="btn btn-secondary btn-sm" onclick="alert('Camp pre-registration URL copied to clipboard.')">Copy Link</button>
                  <button class="btn btn-outline btn-sm" onclick="window.print()">Print Poster</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Camps Management -->
          <div class="panel-card">
            <div class="panel-card-header">
              <h3 class="panel-card-title">Screening Camps Management</h3>
              <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Organization Scope: ${org.name}</span>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Camp Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Capacity</th>
                    <th>Registered</th>
                    <th>Screened</th>
                    <th>Lead Operator</th>
                    <th>Assigned Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${MOCK_DATA.camps.map(camp => `
                    <tr>
                      <td><strong>${camp.name}</strong></td>
                      <td>${camp.location}</td>
                      <td>${camp.date}</td>
                      <td>${camp.capacity}</td>
                      <td>${camp.registeredPatients}</td>
                      <td><strong>${camp.screenedPatients}</strong></td>
                      <td>${camp.operator}</td>
                      <td>${camp.assignedDoctor}</td>
                      <td>
                        <span class="badge-quality ${camp.status === 'Active' ? 'quality-acceptable' : 'quality-retake'}">
                          ${camp.status}
                        </span>
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
