/**
 * NAYAN AI 3D Eye Journey - Camera Animation Controller
 * Smooth C1 continuous Catmull-Rom spline trajectory coordinating
 * closed eye macro view -> eyelid opening -> iris macro -> internal cutaway -> retina reveal.
 */

import * as THREE from 'three';

export class CameraAnimation {
  constructor(camera) {
    this.camera = camera;
    this.baseFov = 42;
    this.mobileFov = 58;

    // Define 7-stage waypoints for Camera Position
    this.positionWaypoints = [
      // Stage 1: Closed eye - extreme macro photography close-up
      new THREE.Vector3(0.0, 0.0, 2.30),

      // Stage 2: Eyelids opening - smooth natural hold
      new THREE.Vector3(0.0, 0.0, 2.15),

      // Stage 3: Fully open eye - beautiful macro inspection
      new THREE.Vector3(0.0, 0.0, 1.95),

      // Stage 4: Iris macro approach - zooming into pupil aperture
      new THREE.Vector3(0.0, 0.0, 1.45),

      // Stage 5: Internal cutaway - glides past cornea and biconvex lens
      new THREE.Vector3(0.02, 0.01, 0.70),
      new THREE.Vector3(0.01, 0.005, 0.15),

      // Stage 6: Vitreous transit towards posterior fundus
      new THREE.Vector3(0.02, 0.0, -0.22),

      // Stage 7: Retina reveal - settled perpendicular to the clinical fundus
      new THREE.Vector3(0.0, 0.0, -0.42)
    ];

    // Define LookAt Target Waypoints
    this.targetWaypoints = [
      new THREE.Vector3(0.0, 0.0, 0.85),   // Stage 1: Macro eye plane center
      new THREE.Vector3(0.0, 0.0, 0.85),   // Stage 2: Center
      new THREE.Vector3(0.0, 0.0, 0.85),   // Stage 3: Iris & pupil center
      new THREE.Vector3(0.0, 0.0, 0.80),   // Stage 4: Pupil optical axis
      new THREE.Vector3(0.0, 0.0, 0.52),   // Stage 5: Crystalline lens
      new THREE.Vector3(0.0, 0.0, -0.75),  // Stage 6: Vitreous to retina
      new THREE.Vector3(0.0, 0.0, -0.98)   // Stage 7: Fundus plane
    ];

    // Smooth Catmull-Rom splines
    this.posSpline = new THREE.CatmullRomCurve3(this.positionWaypoints, false, 'catmullrom', 0.2);
    this.targetSpline = new THREE.CatmullRomCurve3(this.targetWaypoints, false, 'catmullrom', 0.2);

    this.currentPosition = new THREE.Vector3();
    this.currentTarget = new THREE.Vector3();
  }

  /**
   * Evaluates camera position and lookAt target for normalized progress [0.0 ... 1.0]
   * @param {number} t - progress 0 to 1
   * @param {number} aspect - canvas aspect ratio (w/h)
   */
  update(t, aspect = 1.0) {
    const clampedT = THREE.MathUtils.clamp(t, 0.0, 1.0);

    // Sample continuous spline positions
    this.posSpline.getPoint(clampedT, this.currentPosition);
    this.targetSpline.getPoint(clampedT, this.currentTarget);

    // Responsive FOV adjustment: portrait (mobile) widening
    if (aspect < 1.0) {
      const mobileFactor = THREE.MathUtils.clamp((1.0 - aspect) * 1.3, 0.0, 1.0);
      this.camera.fov = THREE.MathUtils.lerp(this.baseFov, this.mobileFov, mobileFactor);

      // In macro stages, adjust Z slightly for portrait framing
      if (clampedT < 0.45) {
        this.currentPosition.z += mobileFactor * 0.35 * (1.0 - clampedT);
      }
    } else {
      this.camera.fov = this.baseFov;
    }
    this.camera.updateProjectionMatrix();

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentTarget);
  }

  reset() {
    this.update(0.0);
  }
}
