export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  bed: string;
  mrn: string;
  admissionTime: string;
  chiefComplaint: string;
  primaryDiagnosis: string;
  triageLevel: 'Critical' | 'Urgent' | 'Stable';
  qmlRiskScore: number;
  qmlRationale?: string;
  parameterInsights?: { parameter: string; status: 'normal' | 'elevated' | 'critical' | 'entangled'; explanation: string }[];
  vitals: PatientVitals;
  bloodMarkers: BloodMarkers;
  xrayIndicators: XRayIndicators;
  tbTests: TBTests;
  profile: PatientProfile;
  allergies: string[];
  attendingPhysician: string;
  nurse: string;
  medications: Medication[];
}

export interface PatientVitals {
  heartRate: number;
  spo2: number;
  respRate: number;
  temperature: number;
}

export interface BloodMarkers {
  wbcCount: number;
  esr: number;
  crp: number;
  lymphocytePct: number;
  hemoglobin: number;
  albumin: number;
  plateletCount: number;
  bloodSugar: number;
}

export interface XRayIndicators {
  opacity: number;
  cavity: number;
  nodule: number;
  pleural: number;
}

export interface TBTests {
  adaLevel: number;
  mantouxMm: number;
  sputumAfb: number;
  genexpertCt: number;
}

export interface PatientProfile {
  bmi: number;
  treatmentDays: number;
}

export interface Medication {
  name: string;
  dose: string;
  status: 'Active' | 'Scheduled' | 'Completed';
}

export interface VitalTrendPoint {
  time: string;
  heartRate: number;
  spo2: number;
  respRate: number;
  temperature: number;
  esr: number;
  crp: number;
  event?: string;
}

export interface ClinicalNote {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  category: 'Progress Note' | 'Pulmonology Consult' | 'TB Review' | 'Nursing Assessment';
  content: string;
  icdCodes: string[];
}

export interface QMLMetrics {
  riskScore: number;
  severity: string;
  confidence: number;
  tbProbability: number;
  vonNeumannEntropy: number;
  isModelTrained: boolean;
  perQubitAnalysis: { label: string; pauliz: number; probExcited: number; status: string }[];
  quantumAttentionMap: { pair: string; strength: number; normalized: number }[];
  xrayQuantumFocus: Record<string, { angle: number; focusScore: number; rawValue: number }>;
}

export const PATIENTS_LIST: Patient[] = [
  {
    id: 'PT-1001',
    name: 'Sharma, Rahul',
    age: 54,
    gender: 'M',
    bed: 'ICU-04',
    mrn: 'MRN-89234',
    admissionTime: '2024-05-10T08:30:00Z',
    chiefComplaint: 'Chronic cough, weight loss, night sweats',
    primaryDiagnosis: 'Tier-1 Hidden TB',
    triageLevel: 'Critical',
    qmlRiskScore: 78,
    qmlRationale: 'Classical ML models categorized this patient as "Stable" because heart rate and SpO2 are completely normal. However, the Quantum Kernel detected a critical high-dimensional entanglement between the slightly elevated ESR (45 mm/hr) and the hidden apical X-ray opacity (0.5). This specific superposition state strongly correlates with early-stage, asymptomatic active Tuberculosis. Immediate isolation recommended.',
    parameterInsights: [
      { parameter: 'SpO2 & Heart Rate', status: 'normal', explanation: 'Classical baseline missed the TB risk because these primary vitals are 96% and 88bpm respectively, suppressing standard ML risk weights.' },
      { parameter: 'ESR (45) + Opacity (0.5)', status: 'entangled', explanation: 'The 8-qubit VQC flagged a non-linear phase correlation (θ₀) between this mild inflammation and the micro-nodule, classifying it as a Tier-1 hidden TB signature.' },
      { parameter: 'Nodule Density (0.6)', status: 'elevated', explanation: 'Quantum attention maps localized strongly on this feature, pulling the risk score up from 12% (ML) to 78% (QML).' }
    ],
    vitals: { heartRate: 88, spo2: 96, respRate: 18, temperature: 37.1 }, // Normal-looking vitals but critical hidden TB
    bloodMarkers: { wbcCount: 11000, esr: 45, crp: 22, lymphocytePct: 18, hemoglobin: 12.5, albumin: 3.2, plateletCount: 250000, bloodSugar: 110 },
    xrayIndicators: { opacity: 0.5, cavity: 0.1, nodule: 0.6, pleural: 0.2 },
    tbTests: { adaLevel: 35, mantouxMm: 12, sputumAfb: 0, genexpertCt: 30 },
    profile: { bmi: 18.5, treatmentDays: 2 },
    allergies: ['Penicillin'],
    attendingPhysician: 'Dr. Aris Vance',
    nurse: 'Nurse J. Smith',
    medications: [{ name: 'Isoniazid', dose: '300mg', status: 'Active' }, { name: 'Rifampin', dose: '600mg', status: 'Active' }]
  },
  {
    id: 'PT-1002',
    name: 'Chen, Marcus',
    age: 62,
    gender: 'M',
    bed: 'TB-ISOL-01',
    mrn: 'MRN-77341',
    admissionTime: '2024-05-08T14:15:00Z',
    chiefComplaint: 'Hemoptysis, severe shortness of breath',
    primaryDiagnosis: 'Active Pulmonary TB',
    triageLevel: 'Critical',
    qmlRiskScore: 92,
    qmlRationale: 'This is a straightforward clinical presentation of Active Pulmonary TB. Both Classical ML and QML agree on a highly critical state. The quantum model assigns a 92% risk, heavily influenced by the high X-ray cavitation (0.75) and extreme inflammatory markers (CRP 68, ESR 85), which form a localized high-density cluster in the quantum Hilbert space.',
    parameterInsights: [
      { parameter: 'Cavitation (0.75) & Opacity (0.85)', status: 'critical', explanation: 'Strongest predictors. The quantum circuit maps these macroscopic lung damages as an irreversible phase shift in Qubit 4 and 5.' },
      { parameter: 'CRP (68) & ESR (85)', status: 'critical', explanation: 'Extreme systemic inflammation. Correlates perfectly with the structural lung damage.' },
      { parameter: 'SpO2 (89%)', status: 'elevated', explanation: 'Hypoxia confirms compromised lung function, acting as an amplifier in the final quantum measurement operator.' }
    ],
    vitals: { heartRate: 115, spo2: 89, respRate: 28, temperature: 38.9 },
    bloodMarkers: { wbcCount: 16500, esr: 85, crp: 68, lymphocytePct: 12, hemoglobin: 10.2, albumin: 2.8, plateletCount: 380000, bloodSugar: 135 },
    xrayIndicators: { opacity: 0.85, cavity: 0.75, nodule: 0.4, pleural: 0.6 },
    tbTests: { adaLevel: 58, mantouxMm: 18, sputumAfb: 3, genexpertCt: 16 },
    profile: { bmi: 17.2, treatmentDays: 5 },
    allergies: ['Sulfa Drugs'],
    attendingPhysician: 'Dr. Aris Vance',
    nurse: 'Nurse K. Lee',
    medications: [{ name: 'HRZE fixed dose', dose: '4 tablets', status: 'Active' }, { name: 'Oxygen', dose: '4L/min', status: 'Active' }]
  },
  {
    id: 'PT-1003',
    name: 'O\'Connor, Sarah',
    age: 47,
    gender: 'F',
    bed: 'WD-A-12',
    mrn: 'MRN-55219',
    admissionTime: '2024-05-11T09:45:00Z',
    chiefComplaint: 'Persistent cough for 4 weeks',
    primaryDiagnosis: 'Suspected TB',
    triageLevel: 'Urgent',
    qmlRiskScore: 55,
    qmlRationale: 'This patient presents a complex boundary case. While clinical vitals are mostly stable (SpO2 94%), the Quantum Support Vector Machine identified a developing probability amplitude in the symptom space. The algorithm found a moderately entangled state between her persistent 4-week cough and a slight elevation in ESR (32).',
    parameterInsights: [
      { parameter: 'Opacity (0.3) & Cavity (0.0)', status: 'normal', explanation: 'No major structural damage detected. X-ray indicators are keeping the risk score from escalating to Critical.' },
      { parameter: 'Lymphocyte Pct (22%)', status: 'entangled', explanation: 'The model identified a minor immune response shift. While not diagnostic on its own, it entangled with her fever history to trigger a 55% warning.' },
      { parameter: 'Treatment Days (0)', status: 'elevated', explanation: 'Since this is a new suspected case without any intervention, the quantum kernel assigns a higher uncertainty weight to the risk.' }
    ],
    vitals: { heartRate: 92, spo2: 94, respRate: 20, temperature: 37.8 },
    bloodMarkers: { wbcCount: 9800, esr: 32, crp: 15, lymphocytePct: 22, hemoglobin: 11.8, albumin: 3.5, plateletCount: 290000, bloodSugar: 98 },
    xrayIndicators: { opacity: 0.3, cavity: 0.0, nodule: 0.2, pleural: 0.1 },
    tbTests: { adaLevel: 25, mantouxMm: 15, sputumAfb: 1, genexpertCt: 28 },
    profile: { bmi: 21.4, treatmentDays: 0 },
    allergies: ['None'],
    attendingPhysician: 'Dr. Elena Rostova',
    nurse: 'Nurse R. Davis',
    medications: [{ name: 'Azithromycin', dose: '500mg', status: 'Active' }]
  },
  {
    id: 'PT-1004',
    name: 'Reynolds, David',
    age: 71,
    gender: 'M',
    bed: 'WD-B-05',
    mrn: 'MRN-33490',
    admissionTime: '2024-05-09T16:20:00Z',
    chiefComplaint: 'Exacerbation of COPD, suspect superimposed infection',
    primaryDiagnosis: 'TB + COPD comorbidity',
    triageLevel: 'Urgent',
    qmlRiskScore: 64,
    qmlRationale: 'A highly challenging case for Classical ML due to COPD confounding factors (low SpO2, high HR). Classical models flagged this as a 90%+ TB risk based on hypoxia alone. However, the QML model successfully decoupled the COPD baseline from the TB signature. The 64% risk is derived from the specific geometric phase of the Pleural ADA (30) entangling with the Opacity (0.6), indicating a true superimposed infection rather than just COPD exacerbation.',
    parameterInsights: [
      { parameter: 'SpO2 (91%) & Heart Rate (102)', status: 'normal', explanation: 'QML successfully identified these as COPD artifacts rather than acute TB indicators, suppressing a false-positive critical alarm.' },
      { parameter: 'Pleural ADA (30)', status: 'elevated', explanation: 'The deciding factor. This specific biochemical marker entangled with the X-ray opacity to push the diagnosis from standard COPD into Urgent TB territory.' },
      { parameter: 'Opacity (0.6)', status: 'entangled', explanation: 'Differentiated from standard emphysematous changes by the quantum feature map due to its correlation with the elevated CRP (28).' }
    ],
    vitals: { heartRate: 102, spo2: 91, respRate: 24, temperature: 37.5 },
    bloodMarkers: { wbcCount: 12400, esr: 50, crp: 28, lymphocytePct: 15, hemoglobin: 13.0, albumin: 3.1, plateletCount: 310000, bloodSugar: 142 },
    xrayIndicators: { opacity: 0.6, cavity: 0.2, nodule: 0.3, pleural: 0.4 },
    tbTests: { adaLevel: 30, mantouxMm: 10, sputumAfb: 1, genexpertCt: 25 },
    profile: { bmi: 24.1, treatmentDays: 3 },
    allergies: ['Latex'],
    attendingPhysician: 'Dr. Marcus Webb',
    nurse: 'Nurse T. Wilson',
    medications: [{ name: 'Salbutamol', dose: '2.5mg neb', status: 'Active' }, { name: 'Isoniazid', dose: '300mg', status: 'Active' }]
  },
  {
    id: 'PT-1005',
    name: 'Patel, Anita',
    age: 38,
    gender: 'F',
    bed: 'WD-C-08',
    mrn: 'MRN-44821',
    admissionTime: '2024-05-12T10:00:00Z',
    chiefComplaint: 'Routine checkup, close contact with active TB case',
    primaryDiagnosis: 'Latent TB',
    triageLevel: 'Stable',
    qmlRiskScore: 22,
    qmlRationale: 'This patient is classified as having Latent TB with very low immediate risk. The Quantum Kernel found minimal probability amplitudes in the symptom space. The 22% baseline risk is purely derived from her historical contact with an active case and a slightly elevated Mantoux test (14mm). No active phase entanglement was detected.',
    parameterInsights: [
      { parameter: 'Mantoux (14mm) & Contact History', status: 'elevated', explanation: 'This creates the baseline 22% risk, confirming latent exposure without active replication.' },
      { parameter: 'ESR (12) & CRP (3)', status: 'normal', explanation: 'Complete absence of systemic inflammation. This anchors the quantum state to a "Stable" classification.' },
      { parameter: 'Opacity (0.05)', status: 'normal', explanation: 'No structural lung damage found, ensuring the quantum entanglement entropy remains near zero.' }
    ],
    vitals: { heartRate: 76, spo2: 98, respRate: 16, temperature: 36.8 },
    bloodMarkers: { wbcCount: 7200, esr: 12, crp: 3, lymphocytePct: 32, hemoglobin: 13.5, albumin: 4.2, plateletCount: 220000, bloodSugar: 90 },
    xrayIndicators: { opacity: 0.05, cavity: 0.0, nodule: 0.05, pleural: 0.0 },
    tbTests: { adaLevel: 15, mantouxMm: 14, sputumAfb: 0, genexpertCt: 38 },
    profile: { bmi: 22.8, treatmentDays: 14 },
    allergies: ['None'],
    attendingPhysician: 'Dr. Priya Nair',
    nurse: 'Nurse M. Clark',
    medications: [{ name: 'Isoniazid', dose: '300mg', status: 'Active' }]
  },
  {
    id: 'PT-1006',
    name: 'Kumar, Vikram',
    age: 29,
    gender: 'M',
    bed: 'OPD',
    mrn: 'MRN-99102',
    admissionTime: '2024-03-15T09:00:00Z',
    chiefComplaint: 'Follow-up for TB treatment',
    primaryDiagnosis: 'TB under treatment',
    triageLevel: 'Stable',
    qmlRiskScore: 15,
    qmlRationale: 'The QML model strongly confirms successful treatment progression. The patient has completed 60 days of HRZE therapy, and the quantum measurement operator shows a complete collapse of previous disease signatures. The 15% residual risk reflects standard clinical caution during the maintenance phase.',
    parameterInsights: [
      { parameter: 'Treatment Days (60)', status: 'normal', explanation: 'The model heavily weights the duration of treatment, acting as a strong negative phase shift against active TB.' },
      { parameter: 'Sputum AFB (0) & GeneXpert (40)', status: 'normal', explanation: 'Negative bacterial load corroborates the stable classification.' },
      { parameter: 'Lymphocyte Pct (35%)', status: 'normal', explanation: 'Normal immune state indicates recovery from the initial infection phase.' }
    ],
    vitals: { heartRate: 72, spo2: 99, respRate: 14, temperature: 36.6 },
    bloodMarkers: { wbcCount: 6500, esr: 8, crp: 1.5, lymphocytePct: 35, hemoglobin: 14.8, albumin: 4.5, plateletCount: 190000, bloodSugar: 85 },
    xrayIndicators: { opacity: 0.1, cavity: 0.0, nodule: 0.0, pleural: 0.0 },
    tbTests: { adaLevel: 10, mantouxMm: 8, sputumAfb: 0, genexpertCt: 40 },
    profile: { bmi: 23.5, treatmentDays: 60 },
    allergies: ['Ibuprofen'],
    attendingPhysician: 'Dr. Marcus Webb',
    nurse: 'Nurse L. Evans',
    medications: [{ name: 'HRZE', dose: 'Completed phase 1', status: 'Completed' }, { name: 'Isoniazid + Rifampin', dose: 'Maintenance', status: 'Active' }]
  }
];

export const PATIENT_VITALS_TIMELINES: Record<string, VitalTrendPoint[]> = {};
export const PATIENT_CLINICAL_NOTES: Record<string, ClinicalNote[]> = {};
export const PATIENT_QML_METRICS: Record<string, QMLMetrics> = {};

PATIENTS_LIST.forEach(p => {
  PATIENT_VITALS_TIMELINES[p.id] = [
    { time: '00:00', heartRate: p.vitals.heartRate + 2, spo2: p.vitals.spo2 - 1, respRate: p.vitals.respRate, temperature: p.vitals.temperature + 0.1, esr: p.bloodMarkers.esr, crp: p.bloodMarkers.crp },
    { time: '04:00', heartRate: p.vitals.heartRate, spo2: p.vitals.spo2, respRate: p.vitals.respRate + 1, temperature: p.vitals.temperature, esr: p.bloodMarkers.esr, crp: p.bloodMarkers.crp },
    { time: '08:00', heartRate: p.vitals.heartRate - 2, spo2: p.vitals.spo2 + 1, respRate: p.vitals.respRate - 1, temperature: p.vitals.temperature - 0.2, esr: p.bloodMarkers.esr, crp: p.bloodMarkers.crp },
    { time: '12:00', heartRate: p.vitals.heartRate + 5, spo2: p.vitals.spo2, respRate: p.vitals.respRate, temperature: p.vitals.temperature + 0.3, esr: p.bloodMarkers.esr - 1, crp: p.bloodMarkers.crp - 0.5 },
    { time: '16:00', heartRate: p.vitals.heartRate, spo2: p.vitals.spo2, respRate: p.vitals.respRate, temperature: p.vitals.temperature, esr: p.bloodMarkers.esr, crp: p.bloodMarkers.crp },
    { time: '20:00', heartRate: p.vitals.heartRate - 1, spo2: p.vitals.spo2, respRate: p.vitals.respRate, temperature: p.vitals.temperature - 0.1, esr: p.bloodMarkers.esr, crp: p.bloodMarkers.crp }
  ];

  PATIENT_CLINICAL_NOTES[p.id] = [
    { id: 'n1', timestamp: p.admissionTime, author: p.attendingPhysician, role: 'Physician', category: 'Pulmonology Consult', content: `Patient admitted with ${p.chiefComplaint}. Initial assessment: ${p.primaryDiagnosis}.`, icdCodes: ['A15.9'] },
    { id: 'n2', timestamp: '2024-05-12T08:00:00Z', author: p.nurse, role: 'Nurse', category: 'Nursing Assessment', content: `Vitals stable. Patient resting comfortably. Administered scheduled medications.`, icdCodes: [] }
  ];

  PATIENT_QML_METRICS[p.id] = {
    riskScore: p.qmlRiskScore,
    severity: p.triageLevel,
    confidence: 85 + Math.random() * 10,
    tbProbability: p.qmlRiskScore / 100,
    vonNeumannEntropy: Math.random(),
    isModelTrained: true,
    perQubitAnalysis: [
      { label: 'Q0', pauliz: 0.1, probExcited: 0.8, status: 'Active' },
      { label: 'Q1', pauliz: -0.2, probExcited: 0.2, status: 'Stable' }
    ],
    quantumAttentionMap: [
      { pair: 'Q0-Q1', strength: 0.9, normalized: 1.0 }
    ],
    xrayQuantumFocus: {
      'Upper Lobe': { angle: 0.5, focusScore: 0.8, rawValue: 0.9 }
    }
  };
});

export function getPatientFeatures(patient: Patient): number[] {
  return [
    patient.vitals.heartRate, patient.vitals.spo2, patient.vitals.respRate, patient.vitals.temperature,
    patient.bloodMarkers.wbcCount, patient.bloodMarkers.esr, patient.bloodMarkers.crp, patient.bloodMarkers.lymphocytePct,
    patient.bloodMarkers.hemoglobin, patient.bloodMarkers.albumin, patient.bloodMarkers.plateletCount, patient.bloodMarkers.bloodSugar,
    patient.xrayIndicators.opacity, patient.xrayIndicators.cavity, patient.xrayIndicators.nodule, patient.xrayIndicators.pleural,
    patient.tbTests.adaLevel, patient.tbTests.mantouxMm, patient.tbTests.sputumAfb, patient.tbTests.genexpertCt,
    patient.profile.bmi, patient.profile.treatmentDays
  ];
}
