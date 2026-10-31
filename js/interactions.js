/**
 * Netriva 3D Eye Journey - User Interactions Controller
 * Manages Portal Login modal, Contact form validation, demo toasts,
 * and clinical audience demonstration interactions.
 */

export class Interactions {
  constructor() {
    this.modalOverlay = document.getElementById('portal-modal-overlay');
    this.loginModal = document.getElementById('login-modal');
    this.closeModalBtn = document.getElementById('modal-close-btn');
    this.portalForm = document.getElementById('portal-demo-form');
    this.contactForm = document.getElementById('contact-form');
    this.toast = document.getElementById('app-toast');
    this.toastMessage = document.getElementById('toast-message');

    this._bindEvents();
  }

  _bindEvents() {
    // Open Portal Modal buttons (Header & in-page buttons)
    document.querySelectorAll('.btn-open-login').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal('login');
      });
    });

    document.querySelectorAll('.btn-open-demo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal('demo');
      });
    });

    // Close Modal button
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeModal());
    }

    // Close on backdrop click
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Portal Form Submit (Frontend demo only)
    if (this.portalForm) {
      this.portalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = this.portalForm.querySelector('input[name="user-role"]:checked')?.value || 'Clinician';
        this.closeModal();
        this.showToast(`Simulated Portal Access granted as [${role}]. (Frontend demonstration only — no real session is initiated).`, 'success');
      });
    }

    // Contact Form Submit with client-side validation
    if (this.contactForm) {
      this.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleContactSubmit();
      });
    }
  }

  openModal(type = 'login') {
    if (!this.modalOverlay) return;

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const submitBtn = document.getElementById('modal-submit-btn');

    if (type === 'demo') {
      if (modalTitle) modalTitle.textContent = 'Request Screening Pilot';
      if (modalSubtitle) modalSubtitle.textContent = 'Schedule a technical demonstration of Netriva AI for your clinical facility.';
      if (submitBtn) submitBtn.textContent = 'Launch Demo Request';
    } else {
      if (modalTitle) modalTitle.textContent = 'Netriva Clinical Portal';
      if (modalSubtitle) modalSubtitle.textContent = 'Secure clinician access for authorized ophthalmic screening centers.';
      if (submitBtn) submitBtn.textContent = 'Access Portal (Demo)';
    }

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  _handleContactSubmit() {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const orgInput = document.getElementById('contact-org');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Reset error states
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('input-error'));

    // Validate Name
    if (!nameInput.value.trim()) {
      this._setError(nameInput, 'Full name is required.');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      this._setError(emailInput, 'Work email is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      this._setError(emailInput, 'Please provide a valid email address.');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
      this._setError(messageInput, 'Please provide a message with at least 15 characters.');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission state
    const submitBtn = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      this.contactForm.reset();
      this.showToast('Thank you for contacting Netriva. Your inquiry has been registered for clinical triage review.', 'success');
    }, 800);
  }

  _setError(input, msg) {
    input.classList.add('input-error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.textContent = msg;
  }

  showToast(message, type = 'info') {
    if (!this.toast || !this.toastMessage) return;

    this.toastMessage.textContent = message;
    this.toast.className = `app-toast toast-${type} active`;

    setTimeout(() => {
      this.toast.classList.remove('active');
    }, 4500);
  }
}
