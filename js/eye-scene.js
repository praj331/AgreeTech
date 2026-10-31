/**
 * NAYAN AI 3D Eye Journey - Three.js Scene Manager
 * Handles WebGL rendering, cinematic lighting, eye anatomy integration,
 * camera updates, and GLTF asset compatibility.
 */

import * as THREE from 'three';
import { EyeAnatomy } from './eye-anatomy.js';
import { CameraAnimation } from './camera-animation.js';

export class EyeScene {
  constructor(canvasContainer, onReady) {
    this.container = canvasContainer;
    this.onReady = onReady;
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    this.aspect = this.width / this.height;

    this.isWebGLAvailable = this._checkWebGL();
    if (!this.isWebGLAvailable) {
      console.warn('WebGL is not supported or disabled in this environment.');
      return;
    }

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050b14); // Deep cinematic navy
    this.scene.fog = new THREE.FogExp2(0x050b14, 0.08);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(42, this.aspect, 0.05, 50);
    this.camera.position.set(0, 0, 2.30);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this._initLighting();

    // 5. Anatomical Eye Model
    this.eyeAnatomy = new EyeAnatomy(this.scene, () => {
      console.log('Eye anatomy & photographic assets loaded.');
      if (this.onReady) this.onReady();
    });

    // 6. Camera Controller
    this.cameraAnim = new CameraAnimation(this.camera);
    this.cameraAnim.update(0.0, this.aspect);

    this.clock = new THREE.Clock();
    this.currentProgress = 0.0;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Bind event listeners
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);

    // Render loop
    this._render = this._render.bind(this);
    this.animationFrameId = requestAnimationFrame(this._render);
  }

  _checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  /**
   * Professional medical lighting
   */
  _initLighting() {
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x0b192e, 1.4);
    this.scene.add(this.ambientLight);

    // Key light - crisp clinical daylight
    this.keyLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    this.keyLight.position.set(2.0, 3.0, 3.0);
    this.scene.add(this.keyLight);

    // Fill light - soft cyan / blue rim light
    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    this.fillLight.position.set(-2.5, -1.0, 2.0);
    this.scene.add(this.fillLight);

    // Internal ophthalmoscopic light for illuminating retinal fundus
    this.retinaLight = new THREE.PointLight(0xffedd5, 0.4, 4.0);
    this.retinaLight.position.set(0.0, 0.0, 0.1);
    this.scene.add(this.retinaLight);
  }

  setProgress(progress) {
    this.currentProgress = progress;

    if (this.cameraAnim) {
      this.cameraAnim.update(progress, this.aspect);
    }

    if (this.eyeAnatomy) {
      this.eyeAnatomy.updateAnimation(progress);
    }

    // Dynamic light balance
    if (this.retinaLight) {
      if (progress > 0.55) {
        const interiorP = Math.min(1.0, (progress - 0.55) / 0.35);
        this.retinaLight.intensity = THREE.MathUtils.lerp(0.4, 3.8, interiorP);
        this.keyLight.intensity = THREE.MathUtils.lerp(2.2, 0.6, interiorP);
      } else {
        this.retinaLight.intensity = 0.4;
        this.keyLight.intensity = 2.2;
      }
    }
  }

  _render() {
    this.animationFrameId = requestAnimationFrame(this._render);

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  _onResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    this.aspect = this.width / this.height;

    if (this.camera && this.renderer) {
      this.camera.aspect = this.aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.setProgress(this.currentProgress);
    }
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    cancelAnimationFrame(this.animationFrameId);
    if (this.eyeAnatomy) this.eyeAnatomy.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
