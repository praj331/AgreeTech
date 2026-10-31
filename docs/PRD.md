# Product Requirements Document (PRD)

**Product:** RETINA AI  
**Document status:** Baseline product requirements / proposed scope  
**Version:** 1.0  
**Date:** 31 October 2026

## 1. Product summary

RETINA AI is an AI-assisted retinal screening and doctor-supported care workflow. It is intended to help screening organizations coordinate community screening, collect right- and left-eye fundus images, check image suitability, present preliminary AI-supported DR screening information, route cases for professional review, and track follow-up.

The primary product value is the connected patient journey—not merely an image classifier.

**Clinical boundary:** AI output is preliminary screening information. It is not a confirmed diagnosis and does not replace an ophthalmologist.

## 2. Problem and users

### Problem

People with diabetes may have retinal changes before noticing vision symptoms. Rural and underserved communities can face limited access to retinal imaging and specialists. Screening activity can also be fragmented across registration forms, image files, reports, doctor queues, and follow-up records.

### Target users

| User | Need |
|---|---|
| Patient | Understand screening, provide consent, access own report and next steps |
| Screening operator | Register patients, capture/upload both eyes, resolve image-quality issues |
| NGO / hospital | Organize camps, manage staff, coordinate cases and follow-up |
| Doctor / ophthalmologist | Review assigned cases and record an independent clinical assessment |
| Platform administrator | Approve organizations, manage accounts and oversee access |

## 3. Product goals

1. Provide a structured camp-to-follow-up workflow.
2. Keep right-eye and left-eye images, quality states, and AI results distinct.
3. Prevent unsuitable or missing images from being misrepresented as normal.
4. Present AI output with uncertainty and clear limitations.
5. Keep doctor assessment separate from the AI prediction.
6. Restrict records to authorized users and organizations.
7. Make screening progress and follow-up status visible to the responsible organization.

## 4. Non-goals for the initial release

- Replacing clinical examination or issuing an autonomous diagnosis.
- Claiming clinical-grade accuracy without independent validation.
- Detecting every retinal disease.
- Treating Grad-CAM as lesion detection or proof of disease.
- Shipping lesion or vessel segmentation without a separately trained and evaluated model.
- Guaranteeing offline AI inference unless a local model and offline workflow are implemented and tested.
- Automatically applying clinical referral thresholds before approval by clinical partners.

## 5. Functional requirements

### FR-01: Organization and camp management
- An authorized NGO/hospital can create and manage its organization profile.
- It can create a screening camp with location, date, capacity, and assigned staff.
- It can share a camp registration link or QR code.
- Users must not access another organization's camps or records.

### FR-02: Patient registration and consent
- A patient can register through a camp link or be registered by an authorized operator.
- Collect only fields necessary for screening and follow-up.
- Record consent, consent version, timestamp, and the relevant purpose.
- Mobile verification/OTP is required only if the feature and provider are configured.
- Provide a process for correcting records and handling consent withdrawal requests.

### FR-03: Two-eye image capture and association
- Store each image with patient, screening, eye side (`LEFT` or `RIGHT`), capture time, and operator.
- Do not confuse or overwrite the two eyes.
- A missing eye must be marked `NOT_ASSESSED`, with a reason where available.

### FR-04: Image upload and suitability
- Validate file type, size, and image decoding.
- Assess focus/blur, illumination, contrast, and other validated quality criteria.
- Return an explicit state such as `ACCEPTABLE`, `RETAKE_REQUIRED`, or `UNABLE_TO_ASSESS`.
- Do not run or display a normal-grade prediction for an image that cannot be assessed.
- Preserve quality result and reason for audit and evaluation.

### FR-05: AI-assisted DR grading
- For an eligible eye image, the configured model may estimate one of five grades:

| Grade | Label |
|---|---|
| 0 | No DR detected by the model |
| 1 | Mild DR |
| 2 | Moderate DR |
| 3 | Severe DR |
| 4 | Proliferative DR |

- Store model/version, preprocessing version, inference timestamp, predicted grade, raw scores, and confidence information if available.
- Show the grade as an AI estimate, not a diagnosis.
- If the model is unavailable or fails, report `AI_UNAVAILABLE`; never fabricate an output.

### FR-06: Explainability
- Where supported, generate Grad-CAM for the classification prediction.
- Display original image and heatmap as separate, clearly labelled visual aids.
- State that highlighted regions influenced the model output and do not prove a lesion.

### FR-07: Preliminary screening report
Include, where available:
- Patient and camp reference.
- Right- and left-eye image and quality status.
- Eye-wise AI grade and confidence information.
- Supported heatmap/segmentation visualizations.
- Overall screening summary based on the more severe assessed eye, while retaining eye-wise results.
- Missing, unsuitable, low-confidence, or unavailable states.
- Clear “AI preliminary screening information—not a diagnosis” wording.

### FR-08: Doctor review
- Only organization-linked cases are routed to an organization's doctors.
- Cases may be assigned manually or automatically, subject to an explicit assignment policy.
- A doctor sees only cases assigned to them and permitted by organization scope.
- The doctor records clinical assessment, notes, recommendation, and sign-off separately from AI output.
- The doctor may agree or disagree with the AI grade; neither value overwrites the other.

### FR-09: Referral and follow-up
- Record recommended action, facility, date, and status.
- Proposed case states: `PENDING_REVIEW`, `UNDER_REVIEW`, `REVIEWED`, `FOLLOW_UP_PENDING`, `FOLLOW_UP_COMPLETED`.
- Track whether a patient attended the recommended follow-up.
- Clinical referral mapping and urgency thresholds require approval by clinical partners. Any draft mapping is configurable, not hard-coded as medical advice.

### FR-10: Patient report delivery
- The concept proposes SMS notification to a verified mobile number with a secure report link and PDF report access.
- AI preliminary report and doctor-reviewed report must be separate.
- SMS must not expose a diagnosis or sensitive clinical details.
- Delivery is conditional on a configured, approved SMS provider and secure link design.

### FR-11: Dashboards and monitoring
- Operator: assigned camps, registration/screening progress, retakes, missing-eye cases.
- Organization: own camps, staff, case queues, assignments, referral and follow-up status.
- Doctor: assigned cases, prioritized queue, review status.
- Administrator: organization approvals, accounts, access and service activity.
- All metrics must be computed from real records; no fabricated demo statistics.

### FR-12: Accessibility and connectivity
- Use simple, mobile-friendly screens suitable for camp workflows.
- Marathi and English are proposed interface languages.
- Low-bandwidth design is a requirement to investigate.
- Offline registration/synchronization and offline inference are separate capabilities; do not claim either until implemented and tested.

## 6. Business rules

1. Every screening case belongs to one patient and one camp/organization context.
2. Right and left eye are assessed independently.
3. The overall summary may use the more severe assessed eye, but both eye-level states remain visible.
4. Missing eye = `NOT_ASSESSED`, not Grade 0.
5. Unsuitable image = retake or `UNABLE_TO_ASSESS`, not Grade 0.
6. Low-confidence output follows an explicit review/uncertainty path.
7. Model unavailable = `AI_UNAVAILABLE`; no placeholder prediction.
8. AI prediction and doctor assessment are distinct, immutable historical records.
9. Only authorized users can access patient images, reports, and records.
10. Organization users are scoped to their own organization; doctors are further scoped to assigned cases.
11. Proposed referral thresholds must be approved by clinical partners before operational use.

## 7. Non-functional requirements

- **Security:** authenticated access, least privilege, private image storage, secure transport, auditability.
- **Privacy:** data minimization, consent, controlled retention, correction/withdrawal workflow.
- **Reliability:** explicit errors and unavailable states; no silent fallback to normal.
- **Usability:** clear instructions, accessible contrast, responsive layouts, low-literacy-friendly language.
- **Performance:** measure upload and inference latency on target devices and networks; do not promise untested response times.
- **Maintainability:** modular frontend, backend, AI inference, and storage layers.
- **Traceability:** record model and preprocessing versions for every inference.

## 8. Success measures

Measure during testing or a supervised pilot:
- Image acceptance rate, rejection reasons, and successful recapture rate.
- AI QWK, macro F1, per-grade recall, confusion matrix, and clinically relevant sensitivity/specificity.
- Time from registration to preliminary result.
- Unavailable/uncertain result frequency.
- Doctor review queue and time to review.
- Follow-up attendance and completion rate.
- Operator, doctor, and patient usability feedback.
- Record corrections, report corrections, and privacy/security incidents.

No target or achieved result is asserted in this PRD.

## 9. Assumptions and dependencies

- Suitable fundus cameras and trained operators are available through participating clinics/camps.
- Clinical partners define review and referral pathways.
- The team obtains lawful access to datasets and model weights.
- SMS, OTP, and PDF delivery require configured providers and security review.
- Applicable Indian privacy, health, and medical-software obligations require qualified legal/regulatory review.

## 10. Release priorities

**MVP:** organization/camp context, patient consent and registration, two-eye upload, quality/retake state, real DR model integration if validated for prototype use, AI report, doctor review, and referral status.

**Later:** SMS automation, offline synchronization, offline inference, voice guidance, lesion segmentation, vessel segmentation, additional diseases, and integrations with external health systems.
