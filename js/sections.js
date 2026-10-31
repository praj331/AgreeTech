/**
 * Netriva 3D Eye Journey - Landing Page Sections Manager
 * Controls interactive tabs for "Who We Serve", workflow highlights,
 * and intersection reveal animations for the healthcare content sections.
 */

export class SectionsManager {
  constructor() {
    this.audienceTabs = document.querySelectorAll('.audience-tab');
    this.audiencePanels = document.querySelectorAll('.audience-panel');
    this.workflowCards = document.querySelectorAll('.workflow-card');

    this._initAudienceTabs();
    this._initIntersectionAnimations();
  }

  _initAudienceTabs() {
    if (!this.audienceTabs.length) return;

    this.audienceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');

        // Active tab styling
        this.audienceTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Active panel display
        this.audiencePanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  _initIntersectionAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      revealObserver.observe(el);
    });
  }
}
