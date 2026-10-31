/**
 * RETINA AI - Main Application Entry Point
 * Mounts Router, Navigation, and Design System
 */

import { RetinaRouter } from './router.js';

class App {
  constructor() {
    this.appRoot = document.getElementById('app-root');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileDrawer = document.getElementById('mobile-drawer');

    this._bindMobileNav();
    this._initRouter();
  }

  _initRouter() {
    if (this.appRoot) {
      window.RetinaRouter = new RetinaRouter(this.appRoot);
    }
  }

  _bindMobileNav() {
    if (this.mobileMenuBtn && this.mobileDrawer) {
      this.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = this.mobileDrawer.classList.contains('open');
        if (isOpen) {
          this.closeMobileDrawer();
        } else {
          this.openMobileDrawer();
        }
      });

      // Close on drawer link click
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileDrawer();
        });
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileDrawer();
      }
    });
  }

  openMobileDrawer() {
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.add('open');
      this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileDrawer() {
    if (this.mobileDrawer) {
      this.mobileDrawer.classList.remove('open');
      this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.RetinaApp = new App();
});
