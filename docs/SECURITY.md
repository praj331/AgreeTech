# Security, Privacy and Responsible Data Handling

**Status:** Security requirements; not a legal opinion or certification.

## 1. Data categories

Potential data includes:
- Patient identifiers and contact details.
- Consent and optional medical history.
- Retinal images and derived heatmaps.
- AI screening results and model metadata.
- Doctor notes, recommendations, reports and follow-up status.
- Organization, camp, user, assignment and audit records.

Treat retinal images and related screening records as sensitive health information.

## 2. Core principles

- Collect only information necessary for screening and follow-up.
- Explain purpose and obtain informed consent before collection/use.
- Restrict data to authorized users and organizations.
- Keep storage private and transfer encrypted.
- Maintain traceable access and change history.
- Define retention, correction, withdrawal, and deletion procedures.
- Do not use real patient data in development/demo environments without an approved basis and safeguards.

## 3. Authentication and authorization

| Role | Required scope |
|---|---|
| Patient | Own records and reports only |
| Operator | Assigned camps and their permitted patients |
| NGO / hospital | Own organization, camps, staff and cases |
| Doctor | Cases assigned to the doctor within authorized organization |
| Platform administrator | Privileged cross-service access with strong audit |

Requirements:
- Enforce permissions server-side and in database policies where supported.
- Deny by default.
- Check object ownership on every image, report, case and download.
- Do not rely on frontend route guards.
- Revoke access when staff leave or accounts are suspended.
- Use secure password hashing through a trusted identity provider; never store plaintext passwords.
- Require appropriate stronger authentication for privileged administrators where available.

## 4. Image and report storage

- Store original images, heatmaps and PDFs in private buckets/containers.
- Store object keys in the database; avoid permanent public URLs.
- Use short-lived signed URLs or authenticated streaming.
- Validate file extension, MIME type, size, and actual file decoding.
- Generate server-side filenames; do not trust user-provided paths.
- Restrict image/report retrieval to the associated patient/case scope.
- Consider malware scanning and image metadata removal where appropriate.
- Do not expose images in logs, analytics, public issue trackers, or demo screenshots.

## 5. API and application security

- Use HTTPS in deployed environments.
- Keep secrets in server-side environment/secret management.
- Never ship database service-role keys, SMS credentials, or model credentials to the browser.
- Apply request validation, rate limiting, upload limits, and safe error messages.
- Protect public camp links with scoped, revocable tokens and abuse controls.
- Apply CSRF protections where cookie-based sessions are used.
- Configure CORS narrowly.
- Avoid leaking whether a patient record exists to unauthorized callers.

## 6. Consent and patient rights

- Record consent text/version, timestamp, purpose, and method.
- Make consent understandable and accessible.
- Provide a documented process for correction, withdrawal, and deletion requests.
- Define what happens to already-generated reports and legally required records after withdrawal.
- Obtain parent/guardian consent where legally required for minors.
- Provide a grievance/contact channel before deployment.

## 7. Audit and accountability

Audit security-relevant actions:
- Login failures and privileged access.
- Organization approval and account suspension.
- Patient record creation/correction/deletion.
- Consent changes.
- Image upload/access/deletion.
- AI inference and report generation.
- Doctor review and sign-off.
- Referral and follow-up changes.
- Report link creation and access.

Audit records should identify actor, action, target, timestamp, outcome, and correlation ID. Do not store unnecessary health details in audit text.

## 8. Retention, backup and incident response

Before pilot:
- Approve retention periods for images, reports, and logs.
- Define backup encryption, access, restore testing, and deletion behavior.
- Define incident reporting, containment, investigation, and notification process.
- Test account revocation and compromised report-link handling.
- Assign a responsible security/privacy contact.

## 9. India-specific compliance review

The extended concept references India's Digital Personal Data Protection Act, 2023. Obtain qualified legal review of applicable law, commencement/rules, health-sector requirements, medical-software obligations, contracts, and participating organizations' responsibilities before real-patient deployment. This document does not certify compliance.

## 10. Release checklist

- [ ] No secrets committed.
- [ ] Private image/report storage verified.
- [ ] Role, organization and doctor-assignment tests pass.
- [ ] Direct-object access attempts are denied.
- [ ] Consent is recorded and retrievable.
- [ ] Correction/withdrawal/deletion process is documented.
- [ ] Logs avoid patient content.
- [ ] Signed links expire and can be revoked.
- [ ] Backups and incident response are defined.
- [ ] Clinical, privacy and legal review completed.
