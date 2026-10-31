/**
 * Netriva 3D Eye Journey - Navigation Controller
 * Manages responsive menu, smooth anchor scrolling, mobile drawer,
 * and header state transitions.
 */

export class Navigation {
  constructor() {
    this.header = document.getElementById('site-header');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileDrawer = document.getElementById('mobile-drawer');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.loginBtns = document.querySelectorAll('.btn-open-login');
    this.demoBtns = document.querySelectorAll('.btn-open-demo');

    this._bindEvents();
  }

  _bindEvents() {
    // Mobile hamburger menu toggle
    if (this.mobileMenuBtn && this.mobileDrawer) {
      this.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = this.mobileDrawer.classList.contains('open');
        if (isOpen) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });
    }

    // Smooth anchor navigation
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.closeMobileMenu();
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = this.header ? this.header.offsetHeight : 80;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Close mobile menu on outside click or Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    if (this.mobileDrawer && this.mobileMenuBtn) {
      this.mobileDrawer.classList.add('open');
      this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
      this.mobileMenuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileMenu() {
    if (this.mobileDrawer && this.mobileMenuBtn) {
      this.mobileDrawer.classList.remove('open');
      this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      this.mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}
