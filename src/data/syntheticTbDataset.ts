export interface PatientRecord {
  id: string;
  patientName: string;
  age: number;
  gender: 'M' | 'F';
  hrBpm: number;
  spO2Pct: number;
  rrBrMin: number;
  tempC: number;
  wbc: number;
  esr: number;
  crp: number;
  lymphPct: number;
  hgb: number;
  alb: number;
  xrOpacity: number;
  xrCavitation: number;
  xrNodules: number;
  pleuralEffusion: number;
  pleuralAda: number;
  mantouxMm: number;
  diagnosis: 'TB' | 'Healthy';
  severity: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5';
  qmlTbRiskScore: number;
  classicalTbRiskScore: number;
  admissionDate: string;
}

export const SYNTHETIC_PATIENTS: PatientRecord[] = [
  { id: 'PT-1001', patientName: 'Aarav Sharma', age: 42, gender: 'M', hrBpm: 85, spO2Pct: 98.0, rrBrMin: 15, tempC: 37.3, wbc: 8.2, esr: 24.5, crp: 3.51, lymphPct: 31.0, hgb: 11.7, alb: 4.2, xrOpacity: 7.4, xrCavitation: 2.8, xrNodules: 10.6, pleuralEffusion: 6.4, pleuralAda: 31.2, mantouxMm: 20.0, diagnosis: 'TB', severity: 'T5', qmlTbRiskScore: 92.4, classicalTbRiskScore: 84.1, admissionDate: '2026-08-28' },
  { id: 'PT-1002', patientName: 'Priya Patel', age: 29, gender: 'F', hrBpm: 91, spO2Pct: 95.5, rrBrMin: 20, tempC: 37.7, wbc: 6.3, esr: 8.5, crp: 2.91, lymphPct: 31.7, hgb: 13.6, alb: 3.0, xrOpacity: 14.3, xrCavitation: 5.6, xrNodules: 7.0, pleuralEffusion: 5.8, pleuralAda: 9.0, mantouxMm: 9.8, diagnosis: 'TB', severity: 'T2', qmlTbRiskScore: 68.2, classicalTbRiskScore: 61.5, admissionDate: '2026-09-01' },
  { id: 'PT-1003', patientName: 'Rajesh Kumar', age: 58, gender: 'M', hrBpm: 85, spO2Pct: 97.7, rrBrMin: 17, tempC: 37.0, wbc: 8.3, esr: 11.8, crp: 2.72, lymphPct: 36.5, hgb: 14.0, alb: 3.0, xrOpacity: 15.3, xrCavitation: 5.7, xrNodules: 13.6, pleuralEffusion: 11.8, pleuralAda: 31.5, mantouxMm: 8.8, diagnosis: 'TB', severity: 'T3', qmlTbRiskScore: 79.5, classicalTbRiskScore: 73.0, admissionDate: '2026-08-30' },
  { id: 'PT-1004', patientName: 'Sunita Reddy', age: 34, gender: 'F', hrBpm: 77, spO2Pct: 97.0, rrBrMin: 15, tempC: 36.7, wbc: 7.9, esr: 22.5, crp: 1.41, lymphPct: 30.0, hgb: 9.9, alb: 3.5, xrOpacity: 10.4, xrCavitation: 3.2, xrNodules: 6.9, pleuralEffusion: 6.2, pleuralAda: 15.4, mantouxMm: 7.0, diagnosis: 'TB', severity: 'T1', qmlTbRiskScore: 54.8, classicalTbRiskScore: 51.2, admissionDate: '2026-09-02' },
  { id: 'PT-1005', patientName: 'Vikram Singh', age: 51, gender: 'M', hrBpm: 83, spO2Pct: 96.5, rrBrMin: 18, tempC: 37.6, wbc: 5.6, esr: 21.2, crp: 2.31, lymphPct: 34.5, hgb: 11.4, alb: 4.0, xrOpacity: 13.7, xrCavitation: 5.1, xrNodules: 6.3, pleuralEffusion: 9.6, pleuralAda: 27.0, mantouxMm: 13.7, diagnosis: 'TB', severity: 'T2', qmlTbRiskScore: 71.3, classicalTbRiskScore: 66.8, admissionDate: '2026-09-03' },
  { id: 'PT-1006', patientName: 'Ananya Gupta', age: 26, gender: 'F', hrBpm: 80, spO2Pct: 96.0, rrBrMin: 17, tempC: 37.0, wbc: 7.8, esr: 7.1, crp: 3.37, lymphPct: 39.9, hgb: 14.2, alb: 3.4, xrOpacity: 13.8, xrCavitation: 10.9, xrNodules: 14.2, pleuralEffusion: 7.9, pleuralAda: 20.5, mantouxMm: 7.8, diagnosis: 'TB', severity: 'T3', qmlTbRiskScore: 82.1, classicalTbRiskScore: 76.4, admissionDate: '2026-08-25' },
  { id: 'PT-1007', patientName: 'Deepak Verma', age: 63, gender: 'M', hrBpm: 75, spO2Pct: 96.8, rrBrMin: 14, tempC: 36.7, wbc: 6.6, esr: 7.8, crp: 0.13, lymphPct: 32.8, hgb: 12.6, alb: 4.0, xrOpacity: 8.5, xrCavitation: 5.1, xrNodules: 2.7, pleuralEffusion: 7.8, pleuralAda: 9.5, mantouxMm: 6.0, diagnosis: 'Healthy', severity: 'T0', qmlTbRiskScore: 12.4, classicalTbRiskScore: 14.2, admissionDate: '2026-09-04' },
  { id: 'PT-1008', patientName: 'Meera Iyer', age: 47, gender: 'F', hrBpm: 96, spO2Pct: 96.0, rrBrMin: 17, tempC: 36.9, wbc: 9.5, esr: 8.4, crp: 2.66, lymphPct: 34.9, hgb: 10.3, alb: 3.0, xrOpacity: 9.0, xrCavitation: 10.4, xrNodules: 8.5, pleuralEffusion: 12.4, pleuralAda: 41.3, mantouxMm: 10.4, diagnosis: 'TB', severity: 'T5', qmlTbRiskScore: 94.6, classicalTbRiskScore: 88.0, admissionDate: '2026-08-29' },
  { id: 'PT-1009', patientName: 'Amitabh Roy', age: 55, gender: 'M', hrBpm: 74, spO2Pct: 95.7, rrBrMin: 16, tempC: 37.3, wbc: 9.3, esr: 19.3, crp: 3.49, lymphPct: 37.8, hgb: 14.0, alb: 3.5, xrOpacity: 9.8, xrCavitation: 2.6, xrNodules: 5.8, pleuralEffusion: 10.5, pleuralAda: 27.3, mantouxMm: 5.2, diagnosis: 'TB', severity: 'T4', qmlTbRiskScore: 88.0, classicalTbRiskScore: 81.3, admissionDate: '2026-08-27' },
  { id: 'PT-1010', patientName: 'Kavita Nair', age: 38, gender: 'F', hrBpm: 76, spO2Pct: 94.4, rrBrMin: 17, tempC: 37.9, wbc: 14.3, esr: 10.1, crp: 5.17, lymphPct: 60.0, hgb: 9.9, alb: 2.7, xrOpacity: 21.8, xrCavitation: 12.0, xrNodules: 17.7, pleuralEffusion: 4.5, pleuralAda: 24.1, mantouxMm: 5.4, diagnosis: 'TB', severity: 'T5', qmlTbRiskScore: 97.8, classicalTbRiskScore: 91.2, admissionDate: '2026-08-26' }
];

/**
 * Maps each hospital patient (PATIENTS_LIST) to a synthetic patient record.
 * The synthetic data drives the live telemetry streams on each patient's page.
 *
 * Mapping:
 *   PT-1001 (Rahul Sharma)    ← Aarav Sharma     (Active TB, QML ~92%)
 *   PT-1002 (Marcus Chen)     ← Meera Iyer       (Severe Active TB, QML ~94.6%)
 *   PT-1003 (Sarah O'Connor)  ← Rajesh Kumar      (Suspected Urgent TB, QML ~79.5%)
 *   PT-1004 (David Reynolds)  ← Vikram Singh      (TB + COPD, QML ~71.3%)
 *   PT-1005 (Anita Patel)     ← Deepak Verma      (Latent/Healthy Control, QML ~12.4%)
 *   PT-1006 (Vikram Kumar)    ← Kavita Nair       (Treated/Low Risk, QML ~97.8% → adjusted to 15%)
 */
export const PATIENT_SYNTH_MAP: Record<string, PatientRecord> = {
  'PT-1001': SYNTHETIC_PATIENTS[0],   // Aarav Sharma
  'PT-1002': SYNTHETIC_PATIENTS[7],   // Meera Iyer (severe active TB)
  'PT-1003': SYNTHETIC_PATIENTS[2],   // Rajesh Kumar
  'PT-1004': SYNTHETIC_PATIENTS[4],   // Vikram Singh
  'PT-1005': SYNTHETIC_PATIENTS[6],   // Deepak Verma (healthy control)
  'PT-1006': { ...SYNTHETIC_PATIENTS[6], qmlTbRiskScore: 15, classicalTbRiskScore: 18, severity: 'T0', diagnosis: 'Healthy' }, // Treated control
};

/**
 * Get the mapped synthetic patient for a given hospital patient ID.
 * Falls back to the first synthetic patient if no mapping exists.
 */
export function getSynthForPatient(patientId: string): PatientRecord {
  return PATIENT_SYNTH_MAP[patientId] || SYNTHETIC_PATIENTS[0];
}

export function generateLiveVitalsStreamPoint(basePatient: PatientRecord, step: number) {
  const sinFactor = Math.sin(step * 0.3);
  const cosFactor = Math.cos(step * 0.2);
  const noise = (Math.random() - 0.5) * 1.5;

  return {
    time: new Date(Date.now() - (30 - step) * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    heartRate: Math.round(Math.max(50, Math.min(130, basePatient.hrBpm + sinFactor * 4 + noise))),
    spo2: Number((Math.max(85, Math.min(100, basePatient.spO2Pct + cosFactor * 0.5 + noise * 0.2))).toFixed(1)),
    respRate: Math.round(Math.max(10, Math.min(32, basePatient.rrBrMin + sinFactor * 2 + noise * 0.4))),
    tempC: Number((Math.max(35.8, Math.min(39.5, basePatient.tempC + sinFactor * 0.2 + noise * 0.05))).toFixed(1)),
    crp: Number((Math.max(0.1, Math.min(12.0, basePatient.crp + sinFactor * 0.3))).toFixed(2)),
    esr: Number((Math.max(2.0, Math.min(50.0, basePatient.esr + cosFactor * 1.2))).toFixed(1)),
    pleuralAda: Number((Math.max(1.0, Math.min(65.0, basePatient.pleuralAda + sinFactor * 2.5))).toFixed(1)),
    tbRiskPct: Number((Math.max(5.0, Math.min(99.0, basePatient.qmlTbRiskScore + sinFactor * 2))).toFixed(1)),
    classicalTbRiskPct: Number((Math.max(5.0, Math.min(99.0, basePatient.classicalTbRiskScore + cosFactor * 1.8 + noise * 0.3))).toFixed(1)),
  };
}
