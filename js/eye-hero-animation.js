/**
 * RETINA AI - Realistic Scroll-Controlled Eye-Opening & Fundus Animation
 * 
 * Progression:
 * 1. Realistic Closed Human Eye (Stage 1)
 * 2. Natural Eyelid Opening along anatomical palpebral curvature (Stage 2)
 * 3. Beautiful Fully Opened Eye (Stage 3)
 * 4. Direct, seamless transition into Authentic Clinical Retinal Fundus (Stage 4)
 * 5. Retina remains clearly visible and prominent as the final visual.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class EyeHeroAnimation {
  constructor(canvasElement, captionElement, badgeElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.captionEl = captionElement;
    this.badgeEl = badgeElement;
    this.container = document.getElementById('hero-eye-experience');

    this.images = {
      closed: null,
      slit: null,
      open: null,
      fundus: null
    };

    this.isLoaded = false;
    this.currentProgress = 0.0;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._init();
  }

  async _init() {
    try {
      await this._loadImages();
      this.isLoaded = true;
      this._onResize();
      window.addEventListener('resize', () => this._onResize());

      if (this.prefersReducedMotion) {
        this.render(1.0); // Render final retina directly
      } else {
        this._initScrollTrigger();
        this.render(0.0); // Initial closed eye
      }
    } catch (err) {
      console.warn('Could not load eye images, using fallback.', err);
      const fallback = document.querySelector('.eye-static-fallback');
      if (fallback) fallback.style.display = 'block';
      if (this.canvas) this.canvas.style.display = 'none';
    }
  }

  _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  async _loadImages() {
    const [closed, slit, open, fundus] = await Promise.all([
      this._loadImage('assets/images/eye_stage1_closed.jpg'),
      this._loadImage('assets/images/eye_stage2_opening.jpg'),
      this._loadImage('assets/images/eye_stage3_open.jpg'),
      this._loadImage('assets/images/retina_fundus_real.jpg')
    ]);

    this.images.closed = closed;
    this.images.slit = slit;
    this.images.open = open;
    this.images.fundus = fundus;
  }

  _onResize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.width = rect.width;
    this.height = rect.height;

    this.render(this.currentProgress);
  }

  _initScrollTrigger() {
    if (!this.container) return;

    // Pin the hero section so the eye animation plays while scrolling through
    const heroSection = document.getElementById('hero');

    ScrollTrigger.create({
      trigger: heroSection || this.container,
      start: 'top top',
      end: '+=140%',       // Scroll 140% of viewport height to complete the animation
      pin: true,           // Pin the hero section while animating
      pinSpacing: true,    // Keep layout spacing consistent
      scrub: 1.5,          // Smooth scrub
      anticipatePin: 1,
      onUpdate: (self) => {
        this.render(self.progress);
      }
    });
  }

  /**
   * Render continuous frame based on scroll progress [0.0 ... 1.0]
   */
  render(progress) {
    if (!this.isLoaded || !this.ctx) return;
    this.currentProgress = Math.min(1.0, Math.max(0.0, progress));

    const ctx = this.ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.width * dpr;
    const h = this.height * dpr;

    ctx.clearRect(0, 0, w, h);

    // -------------------------------------------------------------
    // STAGE 1 & 2: Closed Eye -> Natural Eyelid Opening (0.00 -> 0.45)
    // -------------------------------------------------------------
    if (this.currentProgress <= 0.45) {
      const t = this.currentProgress / 0.45;

      if (t < 0.5) {
        // Stage 1 -> Slit
        const subT = t / 0.5;
        this._drawImageCover(ctx, this.images.closed, w, h, 1.0);
        this._drawImageCover(ctx, this.images.slit, w, h, subT);
      } else {
        // Slit -> Fully Open
        const subT = (t - 0.5) / 0.5;
        this._drawImageCover(ctx, this.images.slit, w, h, 1.0);
        this._drawImageCover(ctx, this.images.open, w, h, subT);
      }

      this._updateCaption(
        this.currentProgress < 0.08 ? 'Closed Human Eye (Initial State)' : 'Eyelids Naturally Opening',
        'Stage 1 / 3'
      );
    }
    // -------------------------------------------------------------
    // STAGE 3: Fully Open Eye in Sharp Focus (0.45 -> 0.65)
    // -------------------------------------------------------------
    else if (this.currentProgress <= 0.65) {
      this._drawImageCover(ctx, this.images.open, w, h, 1.0);
      this._updateCaption('Fully Opened Eye & Ocular Surface', 'Stage 2 / 3');
    }
    // -------------------------------------------------------------
    // STAGE 4: Direct Transition to Authentic Clinical Retinal Fundus (0.65 -> 1.00)
    // -------------------------------------------------------------
    else {
      const transT = (this.currentProgress - 0.65) / 0.35;
      const smoothTrans = gsap.parseEase('power2.inOut')(transT);

      // Draw open eye as base
      this._drawImageCover(ctx, this.images.open, w, h, 1.0);

      // Optical zoom & smooth direct dissolve into real fundus
      ctx.save();
      ctx.globalAlpha = smoothTrans;

      // Draw authentic clinical fundus photograph
      this._drawImageCover(ctx, this.images.fundus, w, h, 1.0);
      ctx.restore();

      // Clinical annotations when fundus is fully revealed
      if (this.currentProgress > 0.88) {
        this._drawClinicalFundusHUD(ctx, w, h, (this.currentProgress - 0.88) / 0.12);
        this._updateCaption('Authentic Clinical Fundus (Optic Disc, Macula, Vascular Arcades)', 'Complete');
      } else {
        this._updateCaption('Transitioning Directly into Retinal Fundus...', 'Stage 3 / 3');
      }
    }
  }

  _drawImageCover(ctx, img, w, h, alpha = 1.0) {
    if (!img) return;
    ctx.save();
    ctx.globalAlpha = alpha;

    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = w;
      renderH = w / imgRatio;
      offsetX = 0;
      offsetY = (h - renderH) / 2;
    } else {
      renderH = h;
      renderW = h * imgRatio;
      offsetX = (w - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }

  /**
   * Subtle clinical annotations on the authentic fundus photograph
   */
  _drawClinicalFundusHUD(ctx, w, h, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.9;

    // Foveal center marker
    const foveaX = w * 0.52;
    const foveaY = h * 0.50;
    const foveaR = Math.min(w, h) * 0.08;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2 * (w / 1000);
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(foveaX, foveaY, foveaR, 0, Math.PI * 2);
    ctx.stroke();

    // Optic disc marker
    const discX = w * 0.32;
    const discY = h * 0.49;
    const discR = Math.min(w, h) * 0.06;

    ctx.strokeStyle = '#bae6fd';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(discX, discY, discR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  _updateCaption(text, stage) {
    if (this.captionEl) this.captionEl.textContent = text;
    if (this.badgeEl) this.badgeEl.textContent = stage;
  }
}
