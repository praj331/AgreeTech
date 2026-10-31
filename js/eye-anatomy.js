/**
 * NAYAN AI 3D Eye Journey - Anatomical Eye Model & Photorealistic Macro Compositor
 * Combines:
 * 1. Photorealistic macro human eye opening shader (Stage 1 Closed -> Slit -> Stage 3 Fully Open)
 * 2. High-precision 3D internal cutaway anatomy (Cornea, Anterior Chamber, Biconvex Lens, Ciliary Zonules)
 * 3. Authentic high-resolution clinical human retinal fundus (Mikael Häggström / NIH Public Domain)
 */

import * as THREE from 'three';
import { TextureGenerator } from './texture-generator.js';

export class EyeAnatomy {
  constructor(scene, onReady) {
    this.scene = scene;
    this.onReady = onReady;

    this.root = new THREE.Group();
    this.root.name = 'EyeRoot';

    // Groups for staged animation
    this.macroPhotoGroup = new THREE.Group();
    this.macroPhotoGroup.name = 'MacroPhotoGroup';

    this.internalGroup = new THREE.Group();
    this.internalGroup.name = 'InternalAnatomyGroup';

    this.retinaGroup = new THREE.Group();
    this.retinaGroup.name = 'RetinaFundusGroup';

    this.root.add(this.macroPhotoGroup);
    this.root.add(this.internalGroup);
    this.root.add(this.retinaGroup);
    this.scene.add(this.root);

    // References for GSAP timeline control
    this.macroPlane = null;
    this.macroMaterial = null;
    this.corneaMesh = null;
    this.lensMesh = null;
    this.cutawayShell = null;
    this.retinaMesh = null;
    this.retinaHUD = null;
    this.materials = [];
    this.textures = {};

    this._loadAssets();
  }

  async _loadAssets() {
    // Load authentic photography assets
    const [texClosed, texSlit, texOpen, texFundus] = await Promise.all([
      TextureGenerator.loadTexture('assets/images/eye_stage1_closed.jpg'),
      TextureGenerator.loadTexture('assets/images/eye_stage2_opening.jpg'),
      TextureGenerator.loadTexture('assets/images/eye_stage3_open.jpg'),
      TextureGenerator.loadTexture('assets/images/retina_fundus_real.jpg')
    ]);

    this.textures.closed = texClosed;
    this.textures.slit = texSlit;
    this.textures.open = texOpen;
    this.textures.fundus = texFundus;
    this.textures.sclera = TextureGenerator.createScleraTexture(1024);
    this.textures.iris = TextureGenerator.createIrisTexture(2048);

    this._buildMacroEyeSurface();
    this._buildInternalAnatomy();
    this._buildRetinalFundus();

    if (this.onReady) this.onReady();
  }

  /**
   * 1. Photorealistic Macro Eye Surface (Stages 1, 2, 3, 4)
   * High-resolution plane with custom GLSL shader that handles:
   * - 100% closed eye in initial resting frame
   * - Anatomically curved palpebral fissure opening as user scrolls
   * - Progressive reveal: closed -> slit -> iris appears -> pupil appears -> fully open eye
   * - Natural tear meniscus highlight along opening margin
   */
  _buildMacroEyeSurface() {
    // Large centered macro plane (16:9 ratio matching 1376x768 photographs)
    const planeGeo = new THREE.PlaneGeometry(3.6, 2.01, 64, 36);

    // Custom photorealistic eyelid opening shader
    const macroShader = {
      uniforms: {
        tClosed: { value: this.textures.closed },
        tSlit: { value: this.textures.slit },
        tOpen: { value: this.textures.open },
        uOpenProgress: { value: 0.0 }, // 0.0 = completely closed, 1.0 = fully open
        uZoom: { value: 1.0 },
        uOpacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tClosed;
        uniform sampler2D tSlit;
        uniform sampler2D tOpen;
        uniform float uOpenProgress;
        uniform float uZoom;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          // Centered macro zoom
          vec2 centeredUv = (vUv - 0.5) / uZoom + 0.5;
          if (centeredUv.x < 0.0 || centeredUv.x > 1.0 || centeredUv.y < 0.0 || centeredUv.y > 1.0) {
            discard;
          }

          vec4 colClosed = texture2D(tClosed, centeredUv);
          vec4 colSlit   = texture2D(tSlit, centeredUv);
          vec4 colOpen   = texture2D(tOpen, centeredUv);

          // Anatomical palpebral fissure opening curve:
          // In human eye photography, the eye opening centers near the optical axis (x ~ 0.50, y ~ 0.48)
          vec2 eyeCenter = vec2(0.50, 0.48);
          float dx = (centeredUv.x - eyeCenter.x) / 0.38;
          float dy = (centeredUv.y - eyeCenter.y) / 0.22;

          // Natural elliptical fissure height
          float fissureMask = 0.0;
          if (abs(dx) < 1.0) {
            float arch = sqrt(1.0 - dx * dx);
            float upperLid = eyeCenter.y + arch * 0.24 * uOpenProgress;
            float lowerLid = eyeCenter.y - arch * 0.16 * uOpenProgress;
            
            // Soft organic edge transition along eyelid margin
            if (centeredUv.y <= upperLid && centeredUv.y >= lowerLid) {
              fissureMask = 1.0;
            } else {
              float distToMargin = min(abs(centeredUv.y - upperLid), abs(centeredUv.y - lowerLid));
              fissureMask = smoothstep(0.015, 0.0, distToMargin);
            }
          }

          // Stage interpolation:
          vec4 finalColor;
          if (uOpenProgress <= 0.005) {
            // STAGE 1: 100% COMPLETELY CLOSED EYE
            finalColor = colClosed;
          } else if (uOpenProgress < 0.45) {
            // STAGE 2: Closed -> Slit opening
            float t = uOpenProgress / 0.45;
            float smoothT = smoothstep(0.0, 1.0, t);
            finalColor = mix(colClosed, colSlit, smoothT);
            
            // Add subtle moist tear meniscus glint along opening margin
            float glint = smoothstep(0.02, 0.0, abs(centeredUv.y - eyeCenter.y)) * (1.0 - smoothT) * 0.18;
            finalColor.rgb += vec3(glint * 0.8, glint * 0.9, glint);
          } else {
            // STAGE 2 -> STAGE 3: Slit -> Fully Open Beautiful Eye
            float t = (uOpenProgress - 0.45) / 0.55;
            float smoothT = smoothstep(0.0, 1.0, t);
            finalColor = mix(colSlit, colOpen, smoothT);
          }

          gl_FragColor = vec4(finalColor.rgb, finalColor.a * uOpacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    };

    this.macroMaterial = new THREE.ShaderMaterial(macroShader);
    this.materials.push(this.macroMaterial);

    this.macroPlane = new THREE.Mesh(planeGeo, this.macroMaterial);
    // Positioned front and center
    this.macroPlane.position.set(0, 0, 0.85);
    this.macroPhotoGroup.add(this.macroPlane);
  }

  /**
   * 2. Internal Cutaway Anatomy (Stages 4-5)
   * Revealed as camera transitions through the pupil optical axis
   */
  _buildInternalAnatomy() {
    // Cornea: Convex anterior dome protruding at +Z
    const corneaGeo = new THREE.SphereGeometry(0.62, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.42);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 0.0, // starts invisible, revealed in Stage 4
      transparent: true,
      roughness: 0.04,
      ior: 1.376, // true human corneal index of refraction
      clearcoat: 1.0
    });
    this.materials.push(corneaMat);
    this.corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
    this.corneaMesh.position.set(0, 0, 0.72);
    this.internalGroup.add(this.corneaMesh);

    // Crystalline Lens: True biconvex transparent lens
    const lensGeo = new THREE.SphereGeometry(0.38, 36, 24);
    lensGeo.scale(1.0, 1.0, 0.42);

    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xebf8ff,
      transmission: 0.94,
      opacity: 0.0,
      transparent: true,
      roughness: 0.08,
      ior: 1.406, // Crystalline lens refractive index
      clearcoat: 0.8
    });
    this.materials.push(lensMat);
    this.lensMesh = new THREE.Mesh(lensGeo, lensMat);
    this.lensMesh.position.set(0, 0, 0.52);
    this.internalGroup.add(this.lensMesh);

    // Suspensory Ciliary Zonules (Zonules of Zinn)
    const zonuleLinesGeo = new THREE.BufferGeometry();
    const zonulePositions = [];
    const numZonules = 120;
    for (let i = 0; i < numZonules; i++) {
      const angle = (i / numZonules) * Math.PI * 2;
      const x1 = Math.cos(angle) * 0.37;
      const y1 = Math.sin(angle) * 0.37;
      const z1 = 0.52;

      const x2 = Math.cos(angle) * 0.48;
      const y2 = Math.sin(angle) * 0.48;
      const z2 = 0.52 + (Math.random() - 0.5) * 0.03;

      zonulePositions.push(x1, y1, z1, x2, y2, z2);
    }
    zonuleLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(zonulePositions, 3));
    const zonuleMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.0
    });
    this.materials.push(zonuleMat);
    this.zonulesMesh = new THREE.LineSegments(zonuleLinesGeo, zonuleMat);
    this.internalGroup.add(this.zonulesMesh);

    // Vitreous Body
    const vitreousGeo = new THREE.SphereGeometry(0.96, 32, 24, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55);
    const vitreousMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transmission: 0.98,
      transparent: true,
      opacity: 0.0,
      roughness: 0.12,
      ior: 1.336 // Vitreous humor refractive index
    });
    this.materials.push(vitreousMat);
    this.vitreousMesh = new THREE.Mesh(vitreousGeo, vitreousMat);
    this.vitreousMesh.position.set(0, 0, 0);
    this.internalGroup.add(this.vitreousMesh);

    // Cutaway Sagittal Shell (Quarter section revealing layers)
    const cutawayGeo = new THREE.SphereGeometry(1.01, 48, 32, 0, Math.PI * 1.5, 0, Math.PI);
    const cutawayMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      roughness: 0.6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0
    });
    this.materials.push(cutawayMat);
    this.cutawayShell = new THREE.Mesh(cutawayGeo, cutawayMat);
    this.cutawayShell.rotation.y = -Math.PI * 0.25;
    this.internalGroup.add(this.cutawayShell);
  }

  /**
   * 3. Posterior Retinal Fundus (Stages 6 & 7)
   * High-resolution concave inner fundus using genuine clinical photography
   */
  _buildRetinalFundus() {
    // Hemispherical inner dome at posterior of globe (Z < 0)
    const retinaGeo = new THREE.SphereGeometry(
      0.97,
      64,
      48,
      0,
      Math.PI * 2,
      Math.PI * 0.48,
      Math.PI * 0.52
    );

    const retinaMat = new THREE.MeshStandardMaterial({
      map: this.textures.fundus || this.textures.iris,
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.0 // revealed as camera enters vitreous chamber
    });
    this.materials.push(retinaMat);
    this.retinaMesh = new THREE.Mesh(retinaGeo, retinaMat);
    this.retinaMesh.rotation.y = Math.PI; // orient facing visual axis
    this.retinaGroup.add(this.retinaMesh);

    // Flat high-definition fundus backdrop plane for final lock-on reveal (Stage 7)
    const fundusPlaneGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const fundusPlaneMat = new THREE.MeshBasicMaterial({
      map: this.textures.fundus,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    this.materials.push(fundusPlaneMat);
    this.fundusBackdrop = new THREE.Mesh(fundusPlaneGeo, fundusPlaneMat);
    this.fundusBackdrop.position.set(0.08, 0.0, -0.98);
    this.retinaGroup.add(this.fundusBackdrop);

    // AI Screening HUD Target Overlays
    const hudGroup = new THREE.Group();
    
    // Optic disc target circle
    const discRingGeo = new THREE.RingGeometry(0.12, 0.13, 36);
    const discRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    this.materials.push(discRingMat);
    this.discHUD = new THREE.Mesh(discRingGeo, discRingMat);
    this.discHUD.position.set(-0.28, 0.0, -0.96);
    hudGroup.add(this.discHUD);

    // Macular Foveal target circle
    const foveaRingGeo = new THREE.RingGeometry(0.16, 0.17, 48);
    const foveaRingMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    this.materials.push(foveaRingMat);
    this.foveaHUD = new THREE.Mesh(foveaRingGeo, foveaRingMat);
    this.foveaHUD.position.set(0.24, 0.0, -0.96);
    hudGroup.add(this.foveaHUD);

    this.retinaHUD = hudGroup;
    this.retinaGroup.add(this.retinaHUD);
  }

  /**
   * Synchronized update from ScrollController [0.0 ... 1.0]
   */
  updateAnimation(progress) {
    // -------------------------------------------------------------
    // STAGE 1, 2, 3: Eyelid Opening & Macro Exploration (0.00 -> 0.55)
    // -------------------------------------------------------------
    if (progress <= 0.60) {
      if (this.macroPlane && this.macroMaterial) {
        this.macroPlane.visible = true;

        // Opening progress: from 0.00 to 0.40 scroll distance
        // 0.00 = completely closed eye (Stage 1)
        // 0.40 = fully open eye (Stage 3)
        const openP = Math.min(1.0, Math.max(0.0, progress / 0.40));
        this.macroMaterial.uniforms.uOpenProgress.value = openP;

        // Macro camera zoom into iris: 0.40 -> 0.60
        if (progress > 0.40) {
          const zoomP = (progress - 0.40) / 0.20;
          this.macroMaterial.uniforms.uZoom.value = 1.0 + zoomP * 1.8;
          // Fade out as camera enters pupil
          this.macroMaterial.uniforms.uOpacity.value = 1.0 - Math.pow(zoomP, 2.5);
        } else {
          this.macroMaterial.uniforms.uZoom.value = 1.0;
          this.macroMaterial.uniforms.uOpacity.value = 1.0;
        }
      }
    } else {
      if (this.macroPlane) {
        this.macroPlane.visible = false;
      }
    }

    // -------------------------------------------------------------
    // STAGE 4 & 5: Transition into Internal Eye Structures (0.50 -> 0.78)
    // -------------------------------------------------------------
    if (progress >= 0.48 && progress <= 0.82) {
      const internalP = Math.min(1.0, (progress - 0.48) / 0.18);
      const fadeOutP = progress > 0.72 ? Math.min(1.0, (progress - 0.72) / 0.10) : 0.0;
      const opacity = internalP * (1.0 - fadeOutP);

      if (this.corneaMesh) this.corneaMesh.material.opacity = opacity * 0.95;
      if (this.lensMesh) this.lensMesh.material.opacity = opacity * 0.92;
      if (this.zonulesMesh) this.zonulesMesh.material.opacity = opacity * 0.65;
      if (this.vitreousMesh) this.vitreousMesh.material.opacity = opacity * 0.35;
      if (this.cutawayShell) this.cutawayShell.material.opacity = opacity * 0.75;
      this.internalGroup.visible = true;
    } else {
      this.internalGroup.visible = false;
    }

    // -------------------------------------------------------------
    // STAGE 6 & 7: Retina Approach & Full Clinical Fundus Reveal (0.75 -> 1.00)
    // -------------------------------------------------------------
    if (progress >= 0.72) {
      const retinaP = Math.min(1.0, (progress - 0.72) / 0.20);
      if (this.retinaMesh) this.retinaMesh.material.opacity = retinaP;
      if (this.fundusBackdrop) this.fundusBackdrop.material.opacity = Math.max(0.0, (progress - 0.85) / 0.15);

      // AI Detection HUD illumination
      if (this.discHUD && this.foveaHUD) {
        const hudOpacity = Math.max(0.0, (progress - 0.88) / 0.12) * 0.85;
        this.discHUD.material.opacity = hudOpacity;
        this.foveaHUD.material.opacity = hudOpacity;
        this.foveaHUD.rotation.z = progress * 1.5;
      }
      this.retinaGroup.visible = true;
    } else {
      this.retinaGroup.visible = false;
    }
  }

  dispose() {
    this.materials.forEach(mat => {
      if (mat.map) mat.map.dispose();
      mat.dispose();
    });
    Object.values(this.textures).forEach(tex => {
      if (tex && tex.dispose) tex.dispose();
    });
  }
}
