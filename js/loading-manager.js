/**
 * Netriva 3D Eye Journey - Loading Manager
 * Manages procedural asset generation progress, loading screen transitions,
 * and graceful fallback handling if 3D initialization fails.
 */

export class LoadingManager {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.loadingScreen = document.getElementById('loading-screen');
    this.progressBar = document.getElementById('loading-progress-bar');
    this.progressPercent = document.getElementById('loading-percent');
    this.statusText = document.getElementById('loading-status-text');

    this.steps = [
      { text: 'Initializing WebGL viewport & lighting...', progress: 20 },
      { text: 'Synthesizing iris stroma & pupillary sphincter...', progress: 45 },
      { text: 'Mapping retinal fundus & vascular arcades...', progress: 75 },
      { text: 'Configuring GSAP scroll interpolation...', progress: 95 },
      { text: 'Calibrating Netriva AI screening journey...', progress: 100 }
    ];

    this.currentStep = 0;
  }

  start() {
    this._runStep();
  }

  _runStep() {
    if (this.currentStep >= this.steps.length) {
      this._finish();
      return;
    }

    const step = this.steps[this.currentStep];
    if (this.statusText) this.statusText.textContent = step.text;
    if (this.progressBar) this.progressBar.style.width = `${step.progress}%`;
    if (this.progressPercent) this.progressPercent.textContent = `${step.progress}%`;

    this.currentStep++;

    // Small delay between procedural stages to allow browser repaint and feel smooth
    const delay = this.currentStep === 1 ? 250 : (150 + Math.random() * 100);
    setTimeout(() => this._runStep(), delay);
  }

  _finish() {
    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          this.loadingScreen.style.display = 'none';
          if (this.onComplete) this.onComplete();
        }, 600);
      } else {
        if (this.onComplete) this.onComplete();
      }
    }, 200);
  }

  showError(message) {
    if (this.statusText) {
      this.statusText.textContent = `Initialization Error: ${message}`;
      this.statusText.style.color = '#ef4444';
    }
    const fallbackBanner = document.getElementById('webgl-fallback-banner');
    if (fallbackBanner) fallbackBanner.style.display = 'block';
  }
}
