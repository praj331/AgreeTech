/**
 * NAYAN AI 3D Eye Journey - GSAP ScrollTrigger Controller
 * Coordinates the scrubbed scroll timeline between:
 * 1. Closed Eye -> Natural Eyelid Opening
 * 2. Fully Open Eye -> Iris Macro Approach
 * 3. Internal Anatomical Cutaway
 * 4. Clinical Retinal Fundus Reveal
 * 5. White-and-blue NAYAN AI website transition
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ScrollController {
  /**
   * @param {import('./eye-scene.js').EyeScene} eyeScene
   */
  constructor(eyeScene) {
    this.eyeScene = eyeScene;

    // UI elements
    this.heroSection = document.getElementById('hero-3d-experience');
    this.heroOverlay = document.getElementById('hero-text-overlay');
    this.stageIndicator = document.getElementById('stage-indicator');
    this.stageName = document.getElementById('stage-name');
    this.stageNumber = document.getElementById('stage-number');
    this.transitionOverlay = document.getElementById('retina-transition-overlay');
    this.scrollPrompt = document.getElementById('scroll-prompt');
    this.navbar = document.getElementById('site-header');

    this.stageTitles = [
      'Closed Human Eye (Macro Photography)',
      'Natural Palpebral Opening',
      'Beautiful Open Eye & Ocular Moisture',
      'Iris Stroma Macro Approach',
      'Internal Anatomical Cutaway (Lens & Vitreous)',
      'Retinal Vascular Arcade Approach',
      'Clinical Fundus Reveal & NAYAN AI Analysis'
    ];

    this._initScrollTrigger();
  }

  _initScrollTrigger() {
    if (!this.heroSection) return;

    // Generous scroll distance (450vh) allows slow, natural, cinematic observation
    this.trigger = ScrollTrigger.create({
      trigger: this.heroSection,
      start: 'top top',
      end: '+=450%',
      pin: true,
      scrub: 1.0, // Smooth interpolation, no sudden jumps or teleporting
      onUpdate: (self) => {
        const p = self.progress;

        // 1. Update 3D Scene
        if (this.eyeScene) {
          this.eyeScene.setProgress(p);
        }

        // 2. Hero Overlay Visibility (fades out immediately as scroll begins)
        if (this.heroOverlay) {
          const heroOpacity = Math.max(0, 1 - p * 6.0);
          this.heroOverlay.style.opacity = heroOpacity.toString();
          this.heroOverlay.style.pointerEvents = heroOpacity <= 0.05 ? 'none' : 'auto';
        }

        // 3. Scroll Prompt Visibility
        if (this.scrollPrompt) {
          const promptOpacity = Math.max(0, 1 - p * 10.0);
          this.scrollPrompt.style.opacity = promptOpacity.toString();
        }

        // 4. Floating Stage HUD Indicator
        this._updateStageHUD(p);

        // 5. Retina to White-and-Blue NAYAN AI Transition (0.90 -> 1.00)
        if (this.transitionOverlay) {
          if (p > 0.88) {
            const transP = Math.min(1.0, (p - 0.88) / 0.12);
            this.transitionOverlay.style.opacity = transP.toString();
            this.transitionOverlay.style.pointerEvents = transP > 0.8 ? 'auto' : 'none';
          } else {
            this.transitionOverlay.style.opacity = '0';
            this.transitionOverlay.style.pointerEvents = 'none';
          }
        }

        // 6. Header Theme Adaptation
        if (this.navbar) {
          if (p > 0.91) {
            this.navbar.classList.add('nav-light-mode');
            this.navbar.classList.remove('nav-dark-mode');
          } else {
            this.navbar.classList.add('nav-dark-mode');
            this.navbar.classList.remove('nav-light-mode');
          }
        }
      }
    });
  }

  _updateStageHUD(p) {
    if (!this.stageIndicator || !this.stageName || !this.stageNumber) return;

    if (p > 0.02 && p < 0.95) {
      this.stageIndicator.classList.add('visible');
    } else {
      this.stageIndicator.classList.remove('visible');
    }

    const stageIndex = Math.min(6, Math.floor(p * 7));
    const stageNum = String(stageIndex + 1).padStart(2, '0');

    if (this.stageNumber.textContent !== stageNum) {
      this.stageNumber.textContent = stageNum;
      this.stageName.textContent = this.stageTitles[stageIndex];

      gsap.fromTo(
        this.stageIndicator,
        { scale: 0.96 },
        { scale: 1.0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }

  refresh() {
    ScrollTrigger.refresh();
  }

  dispose() {
    if (this.trigger) this.trigger.kill();
  }
}
