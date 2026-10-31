# RETINA AI

**AI-Assisted Retinal Screening and Doctor-Supported Care Workflow**

RETINA AI is a proposed platform for organizing diabetic retinopathy (DR) screening, particularly in rural and underserved communities. It connects patients, screening organizations (NGOs/hospitals), trained screening operators, doctors, and platform administrators.

The platform is intended to support—not replace—qualified healthcare professionals. AI outputs are preliminary screening information, not a confirmed diagnosis.

## Core journey

1. An NGO or hospital creates a screening camp and shares a registration link or QR code.
2. A patient registers, verifies their mobile number where enabled, and provides informed consent.
3. A trained operator captures or uploads separate right-eye and left-eye fundus images.
4. The system checks image suitability. Unsuitable images are sent for recapture or marked **Unable to assess**.
5. Available AI services assess each eligible eye and may return a DR grade, confidence information, and supported visual explanations.
6. A preliminary AI screening report is generated.
7. Organisation-linked cases enter an authorized doctor's review queue.
8. The doctor records a separate clinical assessment, recommendation, and follow-up plan.
9. The patient receives the relevant report and follow-up information; the organization tracks completion.

## Proposed roles

- **Patient:** register, consent, view own reports and follow-up guidance.
- **Screening operator:** access assigned camps, register patients, capture/upload images, handle retakes, and track progress.
- **NGO / hospital:** manage its camps and staff, assign cases, and track its own screening and follow-up activity.
- **Doctor:** view only assigned cases, review images and AI information, record clinical notes and sign off a doctor-reviewed report.
- **Platform administrator:** approve organizations, manage accounts and access, and oversee service activity.

## AI capabilities

The proposed AI scope includes:
- DR severity classification, Grade 0–4, per eye.
- Retinal image-quality assessment.
- Grad-CAM or another supported explainability visualization for classification.
- Lesion segmentation only if a suitable trained model is integrated and evaluated.

A heatmap is not proof of a lesion. A missing eye, unsuitable image, low-confidence prediction, or unavailable model must never be silently converted into Grade 0.

## Proposed technology direction

The concept documents do not lock a specific stack. A candidate implementation is:
- Web frontend: existing project framework (confirm from repository).
- API/backend: Python FastAPI if Python-based AI inference is used.
- AI: PyTorch and a documented, evaluated model.
- Data: PostgreSQL/Supabase or the database already used by the project.
- Image/report storage: private object storage with access controls.
- SMS: an approved provider, only after credentials, consent, and delivery rules are configured.

Do not replace an existing working stack without an explicit architecture decision.

## Repository documentation

Detailed project documentation is in [`docs/`](docs/):
- [PRD](docs/PRD.md)
- [System design](docs/SYSTEM_DESIGN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development rules](docs/RULES.md)
- [Tasks and roadmap](docs/TASKS.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Security](docs/SECURITY.md)
- [AI model documentation](docs/AI_MODEL_DOCUMENTATION.md)

## Current status and honesty

This repository documentation describes the **proposed product and requirements**. It does not assert that any feature, model, dataset, API, SMS integration, offline mode, or clinical validation already exists. Update implementation status only after inspecting and testing the code.

## Safety notice

RETINA AI is a screening-support concept, not a medical device claim or substitute for an eye examination. Clinical pathways, referral thresholds, data retention, legal obligations, and deployment approval must be reviewed with qualified clinical, privacy, and regulatory stakeholders before real-patient use.
