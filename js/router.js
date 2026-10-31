/**
 * RETINA AI - Client-Side View Router & Application Controller
 * Handles hash-based routing between:
 * - landing (Landing page with realistic eye-opening animation)
 * - signin (4-Card Role Selection Gateway)
 * - patient (Patient Portal)
 * - operator (Screening Operator Workspace)
 * - ngo (NGO / Hospital Dashboard)
 * - doctor (Doctor Workspace with Grad-CAM)
 * - admin (Platform Administrator Console)
 */

import { LandingView } from './views/landing-view.js';
import { RoleSelection } from './role-selection.js';
import { PatientView } from './views/patient-view.js';
import { OperatorView } from './views/operator-view.js';
import { NgoView } from './views/ngo-view.js';
import { DoctorView } from './views/doctor-view.js';
import { AdminView } from './views/admin-view.js';
import { EyeHeroAnimation } from './eye-hero-animation.js';

export class RetinaRouter {
  constructor(appRootElement) {
    this.root = appRootElement;
    this.currentRoute = 'landing';
    this.eyeAnimation = null;

    // Bind hash change
    window.addEventListener('hashchange', () => this._handleRoute());
    this._handleRoute();
  }

  _handleRoute() {
    const hash = window.location.hash.replace('#', '').trim() || 'landing';
    this.navigate(hash, false);
  }

  navigate(route, updateHash = true) {
    if (updateHash) {
      window.location.hash = route === 'landing' ? '' : route;
    }

    this.currentRoute = route;
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (route === 'landing' && (href === '#hero' || href === '#')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render corresponding view
    switch (route) {
      case 'signin':
        this.root.innerHTML = RoleSelection.render();
        break;

      case 'patient':
        this.root.innerHTML = PatientView.render();
        break;

      case 'operator':
        this.root.innerHTML = OperatorView.render();
        break;

      case 'ngo':
        this.root.innerHTML = NgoView.render();
        break;

      case 'doctor':
        this.root.innerHTML = DoctorView.render();
        break;

      case 'admin':
        this.root.innerHTML = AdminView.render();
        break;

      case 'landing':
      default:
        this.root.innerHTML = LandingView.render();
        this._initLandingEyeAnimation();
        break;
    }
  }

  _initLandingEyeAnimation() {
    // Give DOM a microtask tick to insert canvas
    setTimeout(() => {
      const canvas = document.getElementById('eye-hero-canvas');
      const caption = document.getElementById('eye-stage-caption');
      const badge = document.getElementById('eye-stage-badge');

      if (canvas) {
        this.eyeAnimation = new EyeHeroAnimation(canvas, caption, badge);
      }
    }, 50);
  }

  // Clinical Workspace Interactivity Helpers
  toggleGradCAM() {
    const rightOverlay = document.getElementById('gradcam-overlay-right');
    const leftOverlay = document.getElementById('gradcam-overlay-left');
    const btn = document.getElementById('btn-toggle-gradcam');

    if (rightOverlay && leftOverlay) {
      const isNowActive = !rightOverlay.classList.contains('active');
      rightOverlay.classList.toggle('active');
      leftOverlay.classList.toggle('active');

      if (btn) {
        btn.classList.toggle('btn-primary', isNowActive);
        btn.classList.toggle('btn-secondary', !isNowActive);
      }

      this.showToast(
        isNowActive
          ? 'Grad-CAM Attention Heatmap enabled: Visualizing model activation regions.'
          : 'Grad-CAM overlay hidden: Displaying raw fundus photography.',
        'info'
      );
    }
  }

  simulateRecapture(caseId, eye) {
    this.showToast(`Capturing ${eye} eye with automated autofocus & illumination validation...`, 'info');
    setTimeout(() => {
      this.showToast(`Recapture successful! ${eye} eye marked ACCEPTABLE for diagnostic evaluation.`, 'success');
      this.navigate('operator', false);
    }, 1200);
  }

  submitDoctorReview(event, caseId) {
    if (event) event.preventDefault();
    const docAgree = document.getElementById('doc-agree')?.value;
    const docGrade = document.getElementById('doc-grade')?.value;
    const docNotes = document.getElementById('doc-notes')?.value;

    this.showToast(
      `Clinical assessment signed off by Dr. Anjali Deshmukh (Grade ${docGrade}). Separate clinical report generated.`,
      'success'
    );

    setTimeout(() => {
      alert(`DOCTOR SIGN-OFF COMPLETED:\n\nCase ID: ${caseId}\nDoctor Grade: Grade ${docGrade}\nAssessment: "${docNotes.substring(0, 100)}..."\n\nIndependent report preserved separately from AI prediction.`);
    }, 400);
  }

  downloadReport(patientId) {
    this.showToast('Generating signed PDF clinical screening report...', 'info');
    setTimeout(() => {
      this.showToast('Clinical report downloaded: RETINA_AI_Report_PT-891.pdf', 'success');
    }, 1000);
  }

  showNewPatientModal() {
    const name = prompt('Enter Patient Full Name:');
    if (!name) return;
    const age = prompt('Enter Patient Age:', '55');
    this.showToast(`Registered patient "${name}" (${age}y) with informed consent recorded. Ready for fundus capture.`, 'success');
  }

  showCreateCampModal() {
    const campName = prompt('Enter Camp Name:', 'Indapur Rural Diabetes Camp');
    if (!campName) return;
    const location = prompt('Enter Camp Location / PHC:', 'Primary Health Center, Indapur');
    this.showToast(`Camp "${campName}" created with location "${location}". Pre-registration QR generated.`, 'success');
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.className = `app-toast active`;
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}
