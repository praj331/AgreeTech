# NAYAN AI 3D Eye Journey – Asset Documentation & Anatomical Pipeline

## 1. Integrated Photorealistic Assets

| Asset Name | Resolution | Description & Anatomical Features | Source & License |
| :--- | :---: | :--- | :--- |
| `assets/images/eye_stage1_closed.jpg` | 1376 x 768 | Extreme close-up macro photograph of a closed human eye. Eyelids completely touching along the palpebral fissure, interlaced dark eyelashes, micro skin pores, eyelid sulcus, soft cyan rim light against deep navy. | Photorealistic macro render pipeline, authorized for NAYAN AI. |
| `assets/images/eye_stage2_opening.jpg` | 1376 x 768 | Same eye parting into a narrow palpebral fissure/slit, revealing the moist tear meniscus along the margin and a sliver of hazel-blue iris stroma. | Photorealistic macro render pipeline, authorized for NAYAN AI. |
| `assets/images/eye_stage3_open.jpg` | 1376 x 768 | Same eye fully open in razor-sharp macro focus. Hazel-blue iris with radial collagen fibers, centered pupil, corneal softbox reflection, individually resolved eyelashes, and natural eyelid crease. | Photorealistic macro render pipeline, authorized for NAYAN AI. |
| `assets/images/retina_fundus_real.jpg` | 1411 x 1411 | High-resolution authentic clinical human retinal fundus photograph showing optic nerve head disc, macula lutea, fovea centralis, and branching superior/inferior temporal and nasal vascular arcades. | Mikael Häggström / National Eye Institute (NIH). Public Domain (CC0 1.0 Universal). |

---

## 2. Anatomical Shader & Multi-Stage Progression

1. **Stage 1 (Closed Eye):**
   - The opening frame displays the 100% completely closed human eye.
   - Positioned centrally, occupying the main visual area, unobstructed by overlay text.
2. **Stage 2 (Natural Eyelid Opening):**
   - As the visitor scrolls, the custom Three.js shader drives the palpebral fissure opening.
   - Follows human anatomical geometry: the upper eyelid margin rises along an elliptical arch while the lower margin depresses subtly.
   - Shows the progression: Closed $\rightarrow$ Narrow slit with tear meniscus $\rightarrow$ Iris appears $\rightarrow$ Pupil emerges $\rightarrow$ Fully open eye.
3. **Stage 3 (Beautiful Fully Open Eye):**
   - Held in sharp focus, revealing iris fibers, pupil, cornea, and individual eyelashes.
4. **Stage 4 (Iris Macro Approach):**
   - Dolly camera approach increasing magnification of iris collagen fibers and pupillary sphincter.
5. **Stage 5 (Internal Anatomical Cutaway):**
   - Transparent, anatomically informed cross-section:
     - Refractive Cornea ($n=1.376$)
     - Anterior Chamber (Aqueous Humor)
     - Crystalline Biconvex Lens ($n=1.406$)
     - Suspensory Ciliary Zonules (Zonules of Zinn)
     - Vitreous Chamber ($n=1.336$)
6. **Stage 6 (Retina Approach):**
   - Glides through vitreous chamber towards the posterior hemisphere.
7. **Stage 7 (Final Clinical Fundus Reveal):**
   - High-definition clinical fundus photograph locks on screen.
   - AI screening detection brackets highlight microvascular arcades and FAZ margins.
   - Smooth transition into the white-and-blue NAYAN AI healthcare website.
