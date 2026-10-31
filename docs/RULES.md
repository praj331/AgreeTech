# Development Rules for Human Developers and Coding Agents

These rules apply to Antigravity and other coding agents working in this repository.

## 1. Inspect before changing
1. Read `README.md` and relevant files in `docs/` before implementation.
2. Inspect the existing repository, package scripts, framework, database schema, environment setup, and current routes.
3. Identify what is implemented, partial, planned, or missing.
4. Do not assume the concept document describes the current code.

## 2. Preserve the existing project
- Do not create a second project or duplicate the application.
- Do not replace the existing framework, router, database, authentication, or deployment setup without an approved decision recorded in `DECISIONS.md`.
- Do not delete working features or unrelated code.
- Do not overwrite migrations or production data.
- Make focused, reviewable changes.

## 3. Medical and AI integrity
- Never invent a prediction, confidence value, heatmap, segmentation mask, model metric, or patient record.
- Do not label synthetic/demo output as a real screening result.
- A missing eye is `NOT_ASSESSED`, not Grade 0.
- An unsuitable image is `RETAKE_REQUIRED` or `UNABLE_TO_ASSESS`, not Grade 0.
- An unavailable model must return an explicit unavailable state.
- Keep AI predictions separate from doctor assessments.
- Grad-CAM shows regions influencing a model prediction; it does not prove lesions.
- Do not claim clinical readiness or diagnostic accuracy without appropriate independent validation and clinical review.

## 4. AI reproducibility
- Keep training and inference preprocessing consistent.
- Record dataset source, license/terms, split strategy, model version, preprocessing version, and evaluation procedure.
- Prevent patient-level leakage between train/validation/test sets where patient identifiers are available.
- Keep a held-out test set untouched during model selection.
- Report per-grade metrics and class imbalance; do not report accuracy alone.
- Do not silently change model weights or preprocessing.

## 5. Data and access
- Enforce authorization on the server/database, not just by hiding UI elements.
- Scope operators to assigned camps, organizations to their own records, and doctors to assigned cases.
- Store images and reports privately.
- Never put secrets in frontend code or commit `.env` files.
- Avoid logging patient names, phone numbers, image bytes, or report contents.
- Validate file type, size, decoding, and ownership before processing.

## 6. Code quality
- Follow existing language/framework conventions.
- Use clear names and small reusable modules.
- Validate all external input.
- Handle loading, empty, success, and error states.
- Avoid broad exception swallowing.
- Keep dependencies minimal and pinned where appropriate.
- Add tests for business rules, permissions, and failure paths.
- Do not disable linting, type checking, security checks, or tests merely to make a build pass.

## 7. UI and accessibility
- Design for desktop and mobile, including camp use on phones/tablets.
- Use clear language, accessible contrast, labels, and keyboard navigation.
- Provide Marathi/English text only where translations are reviewed.
- Make image side (right/left), quality status, and AI-vs-doctor information unmistakable.
- Do not use colour as the only status indicator.

## 8. Documentation and workflow
- Update `TASKS.md` when task status changes.
- Record significant technical changes in `DECISIONS.md`.
- Update API and AI documentation when contracts or models change.
- State files changed, tests run, and known limitations in completion summaries.
- Never claim tests passed unless they were run and passed.
