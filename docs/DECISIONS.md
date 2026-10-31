# Architecture and Product Decisions

This is the decision log. Add new entries rather than silently changing earlier decisions.

## D-001 — Screening support, not autonomous diagnosis
**Status:** Accepted  
**Decision:** The product presents AI output as preliminary screening information. A qualified doctor remains responsible for clinical assessment and decisions.  
**Reason:** The concept is doctor-supported and the prototype is not proof of clinical safety.

## D-002 — Separate right-eye and left-eye assessment
**Status:** Accepted  
**Decision:** Images, quality results, AI results, and statuses are stored per eye.  
**Reason:** Prevents laterality ambiguity and allows one eye to be missing or unsuitable without misrepresenting the other.

## D-003 — Preserve unable-to-assess and unavailable states
**Status:** Accepted  
**Decision:** Missing eye, unsuitable image, low confidence, and AI service failure have explicit states. None may be converted to Grade 0.  
**Reason:** A normal prediction must not be fabricated when no valid assessment exists.

## D-004 — Keep AI output separate from doctor assessment
**Status:** Accepted  
**Decision:** Store AI result and doctor review as separate records/reports. Doctor review does not overwrite the original prediction.  
**Reason:** Maintains traceability and avoids confusing algorithm output with clinical judgement.

## D-005 — Organization and doctor assignment boundaries
**Status:** Accepted  
**Decision:** Organization users access only their organization's camps/cases. Doctors access only cases assigned to them within authorized scope. Operators access assigned camps.  
**Reason:** Patient privacy and operational separation.

## D-006 — Grad-CAM is an explanation, not lesion segmentation
**Status:** Accepted  
**Decision:** Grad-CAM may visualize regions influencing a classifier's prediction. It is not described as proof of lesions or as a lesion segmentation model.  
**Reason:** These are different technical capabilities.

## D-007 — Technology stack remains subject to repository audit
**Status:** Provisional  
**Decision:** FastAPI/PyTorch may be used for Python AI inference, but existing application framework, backend, database, and hosting are not replaced until inspected and reviewed.  
**Reason:** The concept documents do not specify the current codebase stack.

## D-008 — Clinical referral rules require clinical approval
**Status:** Accepted  
**Decision:** Any grade-to-routine/referral/urgent mapping remains proposed until approved by qualified clinical partners.  
**Reason:** Referral thresholds are clinical workflow decisions, not assumptions for a coding agent.

## D-009 — SMS/PDF delivery is conditional
**Status:** Provisional  
**Decision:** SMS notification and PDF report delivery may be implemented after provider, consent, secure link, and access controls are confirmed.  
**Reason:** The extended concept describes this delivery approach, but provider configuration and security design are implementation dependencies.

## D-010 — Offline capabilities are not assumed
**Status:** Accepted  
**Decision:** Low-bandwidth design, offline registration/sync, and offline AI inference are separate capabilities and must be implemented/tested independently.  
**Reason:** Offline UI alone does not make server-hosted AI work without connectivity.

## Decision template

### D-XXX — Title
- **Status:** Proposed / Accepted / Superseded
- **Date:**
- **Context:**
- **Decision:**
- **Alternatives considered:**
- **Consequences:**
- **Owner:**
