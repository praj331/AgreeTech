/**
 * NAYAN AI 3D Eye Journey - Texture & Asset Loader
 * Manages authentic photographic assets:
 * 1. eye_stage1_closed.jpg (Extreme macro closed human eye)
 * 2. eye_stage2_opening.jpg (Palpebral fissure narrow slit opening)
 * 3. eye_stage3_open.jpg (Fully open human eye with hazel/blue iris)
 * 4. retina_fundus_real.jpg (Genuine high-res clinical human retinal fundus)
 * Plus procedural fallback synthesis.
 */

import * as THREE from 'three';

export class TextureGenerator {
  /**
   * Loads a texture from URL with fallback promise
   * @param {string} url 
   * @returns {Promise<THREE.Texture>}
   */
  static loadTexture(url) {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          resolve(tex);
        },
        undefined,
        (err) => {
          console.warn(`Could not load texture ${url}, generating procedural fallback.`, err);
          resolve(null);
        }
      );
    });
  }

  /**
   * Generates a high-resolution, biologically detailed iris texture.
   * @param {number} size 
   * @returns {THREE.CanvasTexture}
   */
  static createIrisTexture(size = 2048) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;
    const radius = size / 2;

    // Base gradient
    const baseGrad = ctx.createRadialGradient(center, center, 0, center, center, radius);
    baseGrad.addColorStop(0.00, '#020617'); // Central pupil
    baseGrad.addColorStop(0.19, '#030712'); // Pupil margin
    baseGrad.addColorStop(0.21, '#1e293b'); // Pupillary sphincter zone
    baseGrad.addColorStop(0.36, '#2563eb'); // Collarette
    baseGrad.addColorStop(0.48, '#0284c7'); // Ciliary zone
    baseGrad.addColorStop(0.72, '#0369a1'); // Outer stroma
    baseGrad.addColorStop(0.92, '#0c2340'); // Limbal transition
    baseGrad.addColorStop(1.00, '#020617'); // Limbal ring

    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Radial stromal fibers
    const numFibers = 1200;
    ctx.save();
    ctx.translate(center, center);

    for (let i = 0; i < numFibers; i++) {
      const angle = (i / numFibers) * Math.PI * 2;
      const length = radius * (0.22 + Math.random() * 0.75);
      const startDist = radius * (0.19 + Math.random() * 0.08);

      const roll = Math.random();
      let strokeColor = 'rgba(56, 189, 248, 0.22)';
      if (roll > 0.85) strokeColor = 'rgba(224, 242, 254, 0.35)';
      else if (roll < 0.25) strokeColor = 'rgba(217, 119, 6, 0.16)'; // Amber flecks

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.8 + Math.random() * 1.5;

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = cos * startDist;
      const y1 = sin * startDist;
      const x2 = cos * length;
      const y2 = sin * length;

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    ctx.restore();

    // Central optical pupil aperture
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.19, 0, Math.PI * 2);
    ctx.fillStyle = '#010307';
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    return texture;
  }

  /**
   * Generates Sclera texture with fine micro-vessels.
   * @param {number} size 
   * @returns {THREE.CanvasTexture}
   */
  static createScleraTexture(size = 1024) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(size * 0.5, size * 0.5, 0, size * 0.5, size * 0.5, size * 0.5);
    grad.addColorStop(0.0, '#ffffff');
    grad.addColorStop(0.7, '#f8fafc');
    grad.addColorStop(0.9, '#f1f5f9');
    grad.addColorStop(1.0, '#e2e8f0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Episcleral capillaries
    ctx.save();
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.15)';
    ctx.lineWidth = 0.9;
    for (let i = 0; i < 90; i++) {
      let x = Math.random() * size;
      let y = Math.random() * size;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let s = 0; s < 4; s++) {
        x += (Math.random() - 0.5) * 35;
        y += (Math.random() - 0.5) * 35;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    return texture;
  }
}
