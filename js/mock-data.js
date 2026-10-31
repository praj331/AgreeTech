/**
 * RETINA AI - Realistic Prototype Clinical Data
 * Formatted strictly according to PRD.md, SYSTEM_DESIGN.md, and DECISIONS.md:
 * - Bilateral eye assessment (Right vs Left)
 * - Missing eye = NOT_ASSESSED
 * - Unsuitable image = RETAKE_REQUIRED or UNABLE_TO_ASSESS
 * - Independent Doctor clinical notes kept separate from AI grade
 */

export const MOCK_DATA = {
  // Current active user session (simulated)
  currentUser: {
    role: 'doctor', // 'patient' | 'operator' | 'ngo' | 'doctor' | 'admin'
    name: 'Dr. Anjali Deshmukh',
    title: 'Senior Vitreoretinal Consultant',
    regNumber: 'MMC-2012-08492',
    orgName: 'Seva Netralaya Foundation',
    orgId: 'org-01'
  },

  // Organizations
  organizations: [
    {
      id: 'org-01',
      name: 'Seva Netralaya Foundation',
      type: 'NGO / Non-Profit Health Trust',
      region: 'Pune & Western Maharashtra',
      campsActive: 4,
      totalScreened: 1420,
      referralRate: '14.2%',
      verified: true
    },
    {
      id: 'org-02',
      name: 'Sahyadri District Rural Eye Hospital',
      type: 'Tertiary Charitable Hospital',
      region: 'Satara District',
      campsActive: 2,
      totalScreened: 890,
      referralRate: '12.8%',
      verified: true
    }
  ],

  // Screening Camps
  camps: [
    {
      id: 'camp-104',
      name: 'Shirur Rural Diabetes Screening Camp #104',
      location: 'Primary Health Center, Shirur, Pune District',
      date: '2026-11-04',
      capacity: 120,
      registeredPatients: 94,
      screenedPatients: 78,
      status: 'Active',
      operator: 'Suresh Patil (Cert. Ophthalmic Tech)',
      assignedDoctor: 'Dr. Anjali Deshmukh',
      qrCodeToken: 'camp_token_shirur_104_sec'
    },
    {
      id: 'camp-105',
      name: 'Baramati Community Diabetic Health Camp',
      location: 'Sub-District Hospital, Baramati',
      date: '2026-11-08',
      capacity: 150,
      registeredPatients: 62,
      screenedPatients: 0,
      status: 'Scheduled',
      operator: 'Pooja Shinde',
      assignedDoctor: 'Dr. Rajesh Kulkarni',
      qrCodeToken: 'camp_token_baramati_105_sec'
    }
  ],

  // Patient Screening Cases
  cases: [
    {
      id: 'case-2026-0891',
      patientId: 'PT-891',
      patientName: 'Rameshwar Gyanoba Kale',
      age: 58,
      gender: 'Male',
      phone: '+91 98220 •••••',
      campId: 'camp-104',
      campName: 'Shirur Rural Diabetes Screening Camp #104',
      captureDate: '2026-10-31',
      consentRecorded: true,
      consentTimestamp: '2026-10-31 09:42:15 IST',
      overallStatus: 'PENDING_REVIEW',
      urgency: 'MODERATE',

      // Bilateral Eye Assessment (PRD §5 FR-03, FR-04, FR-05)
      rightEye: {
        eye: 'RIGHT',
        imageKey: 'assets/images/retina_fundus_real.jpg',
        qualityStatus: 'ACCEPTABLE', // ACCEPTABLE | RETAKE_REQUIRED | UNABLE_TO_ASSESS | NOT_ASSESSED
        qualityReason: 'High macula-centered clarity, adequate contrast',
        aiStatus: 'AI_RESULT_READY',
        predictedGrade: 2, // Moderate DR
        gradeLabel: 'Moderate NPDR',
        confidence: 0.88,
        modelVersion: 'RetinaNet-V3.2.1-B0',
        hasGradCAM: true
      },
      leftEye: {
        eye: 'LEFT',
        imageKey: 'assets/images/retina_fundus_real.jpg',
        qualityStatus: 'ACCEPTABLE',
        qualityReason: 'Adequate optic disc and temporal arcade illumination',
        aiStatus: 'AI_RESULT_READY',
        predictedGrade: 1, // Mild DR
        gradeLabel: 'Mild NPDR',
        confidence: 0.92,
        modelVersion: 'RetinaNet-V3.2.1-B0',
        hasGradCAM: true
      },

      // Separate Doctor Review (PRD §5 FR-08)
      doctorReview: {
        reviewed: false,
        doctorName: null,
        agreesWithAI: null,
        clinicalGrade: null,
        clinicalNotes: '',
        recommendation: '',
        referralFacility: '',
        followUpDate: '',
        signedTimestamp: null
      }
    },
    {
      id: 'case-2026-0892',
      patientId: 'PT-892',
      patientName: 'Laxmibai Vithal Jadhav',
      age: 64,
      gender: 'Female',
      phone: '+91 94231 •••••',
      campId: 'camp-104',
      campName: 'Shirur Rural Diabetes Screening Camp #104',
      captureDate: '2026-10-31',
      consentRecorded: true,
      consentTimestamp: '2026-10-31 10:14:02 IST',
      overallStatus: 'REVIEWED',
      urgency: 'HIGH',

      rightEye: {
        eye: 'RIGHT',
        imageKey: 'assets/images/retina_fundus_real.jpg',
        qualityStatus: 'ACCEPTABLE',
        qualityReason: 'Adequate field of view',
        aiStatus: 'AI_RESULT_READY',
        predictedGrade: 3, // Severe DR
        gradeLabel: 'Severe NPDR',
        confidence: 0.91,
        modelVersion: 'RetinaNet-V3.2.1-B0',
        hasGradCAM: true
      },
      leftEye: {
        eye: 'LEFT',
        imageKey: 'assets/images/retina_fundus_real.jpg',
        qualityStatus: 'ACCEPTABLE',
        qualityReason: 'Adequate field of view',
        aiStatus: 'AI_RESULT_READY',
        predictedGrade: 2, // Moderate DR
        gradeLabel: 'Moderate NPDR',
        confidence: 0.85,
        modelVersion: 'RetinaNet-V3.2.1-B0',
        hasGradCAM: true
      },

      doctorReview: {
        reviewed: true,
        doctorName: 'Dr. Anjali Deshmukh',
        agreesWithAI: true,
        clinicalGrade: 3,
        clinicalNotes: 'Right eye exhibits intraretinal microvascular abnormalities (IRMA) across superior arcade. Multiple blot hemorrhages in 3 quadrants.',
        recommendation: 'Urgent referral for comprehensive dilated fundus examination and Optical Coherence Tomography (OCT) to rule out clinically significant macular edema.',
        referralFacility: 'Sassoon General Hospital Retina Specialty OPD, Pune',
        followUpDate: '2026-11-07',
        signedTimestamp: '2026-10-31 16:30:10 IST'
      }
    },
    {
      id: 'case-2026-0893',
      patientId: 'PT-893',
      patientName: 'Chandrakant Bapu More',
      age: 52,
      gender: 'Male',
      phone: '+91 97654 •••••',
      campId: 'camp-104',
      campName: 'Shirur Rural Diabetes Screening Camp #104',
      captureDate: '2026-10-31',
      consentRecorded: true,
      consentTimestamp: '2026-10-31 11:05:40 IST',
      overallStatus: 'RETAKE_REQUIRED',
      urgency: 'ROUTINE',

      rightEye: {
        eye: 'RIGHT',
        imageKey: 'assets/images/retina_fundus_real.jpg',
        qualityStatus: 'ACCEPTABLE',
        qualityReason: 'Good focus and illumination',
        aiStatus: 'AI_RESULT_READY',
        predictedGrade: 0,
        gradeLabel: 'No DR detected',
        confidence: 0.96,
        modelVersion: 'RetinaNet-V3.2.1-B0',
        hasGradCAM: false
      },
      leftEye: {
        eye: 'LEFT',
        imageKey: null,
        qualityStatus: 'RETAKE_REQUIRED', // Demonstrates Rule 5: Unsuitable image is NOT Grade 0!
        qualityReason: 'Severe motion blur & blink artifact. Center fovea ungradable.',
        aiStatus: 'NOT_ASSESSED',
        predictedGrade: null,
        gradeLabel: 'Quality Unsuitable — Recapture Required',
        confidence: 0.0,
        modelVersion: null,
        hasGradCAM: false
      },

      doctorReview: {
        reviewed: false,
        doctorName: null,
        agreesWithAI: null,
        clinicalGrade: null,
        clinicalNotes: '',
        recommendation: 'Awaiting left eye recapture before clinical sign-off.',
        referralFacility: '',
        followUpDate: '',
        signedTimestamp: null
      }
    }
  ]
};
