import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Droplets, Wind, Thermometer, Scale, AlertCircle, X, TestTube, Pill, ArrowLeft } from 'lucide-react';
import { usePatient } from '@/contexts/PatientContext';
import { PATIENTS_LIST, PATIENT_QML_METRICS } from '@/data/patients';
import { getSynthForPatient, generateLiveVitalsStreamPoint } from '@/data/syntheticTbDataset';
import { PatientNavTabs } from '@/components/PatientNavTabs';

export const PatientOverviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedPatient } = usePatient();
  const navigate = useNavigate();
  const [hideBanner, setHideBanner] = useState(false);
  
  const patient = selectedPatient || (id ? PATIENTS_LIST.find(p => p.id === id) || PATIENTS_LIST[0] : PATIENTS_LIST[0]);
  const qmlMetrics = id ? PATIENT_QML_METRICS[id] : null;
  
  // Real-time live vitals telemetry state
  const [liveVitals, setLiveVitals] = useState({
    heartRate: patient.vitals?.heartRate || 85,
    spo2: patient.vitals?.spo2 || 96,
    respRate: patient.vitals?.respRate || 18,
    tempC: patient.vitals?.temperature || 37.1,
  });

  // Live fluctuating telemetry interval
  useEffect(() => {
    let step = 0;
    const synthPatient = getSynthForPatient(patient.id);

    const interval = setInterval(() => {
      step += 1;
      const point = generateLiveVitalsStreamPoint(synthPatient, step);
      setLiveVitals({
        heartRate: point.heartRate,
        spo2: point.spo2,
        respRate: point.respRate,
        tempC: point.tempC,
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [patient]);

  const qmlRiskScore = qmlMetrics?.riskScore || patient.qmlRiskScore || 0;
  const showBanner = qmlRiskScore > 60 && !hideBanner;

  return (
    <div className="w-full min-h-[calc(100vh-68px)] font-sans bg-[#f4f2eb] animate-fade-in text-[#111111]">
      <PatientNavTabs currentTab="overview" />
      
      <div className="px-6 sm:px-10 py-4 max-w-7xl mx-auto space-y-4">
        
        {/* Sub-header with Back Button & Alert */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#4a7c6f] transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} /> ← Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#6b6b6b]">Patient File: <strong className="text-[#111]">{patient.id}</strong></span>
            <span className="text-[#9a9590]">|</span>
            <span className="text-xs font-mono text-[#6b6b6b]">Bed: <strong className="text-[#111]">{patient.bed}</strong></span>
          </div>
        </div>

        {/* Elevated Alert Banner */}
        {showBanner && (
          <div className="bg-white border-l-4 border-l-[#c2484a] border border-[#d4d0ca] rounded-xl flex items-center justify-between px-4 py-2.5 shadow-xs">
            <div className="flex items-center gap-2.5 text-[#c2484a]">
              <AlertCircle size={18} />
              <span className="font-semibold text-xs">Elevated QML Tuberculosis Risk Pattern — Risk Score: {qmlRiskScore}%</span>
              <Link to={`/patient/${patient.id}/qml`} className="text-xs underline font-bold ml-2 hover:text-[#9a2a2c]">
                Open QML Analysis →
              </Link>
            </div>
            <button onClick={() => setHideBanner(true)} className="text-[#9a9590] hover:text-[#111111] p-1 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        )}

        {/* QML Diagnostic Rationale & Parameter Breakdown */}
        {patient.qmlRationale && (
          <div className="bg-[#111111] text-white border border-[#2a3642] rounded-2xl p-5 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f48b8b] animate-pulse"></span>
              Quantum Model (VQC) Diagnostic Rationale
            </h3>
            <p className="text-sm text-[#d4d0ca] leading-relaxed mb-4">
              {patient.qmlRationale}
            </p>
            
            {patient.parameterInsights && patient.parameterInsights.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {patient.parameterInsights.map((insight, idx) => (
                  <div key={idx} className="bg-[#1a222a] border border-[#2a3642] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-white">{insight.parameter}</span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        insight.status === 'normal' ? 'bg-[#5a8a6e]/20 text-[#a8d5ba]' :
                        insight.status === 'elevated' ? 'bg-[#c49332]/20 text-[#c49332]' :
                        insight.status === 'critical' ? 'bg-[#c2484a]/20 text-[#ffb3b3]' :
                        'bg-[#805ad5]/20 text-[#b794f4]' // entangled
                      }`}>
                        {insight.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9a9590] leading-snug">
                      {insight.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REAL-TIME LIVE FLUCTUATING VITALS CARDS (COMPACT SINGLE ROW) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <VitalCard icon={Heart} title="Heart Rate" value={liveVitals.heartRate} unit="bpm" status="Live" statusClass="bg-[#c49332]/10 text-[#c49332]" />
          <VitalCard icon={Droplets} title="SpO2" value={liveVitals.spo2} unit="%" status="Live" statusClass="bg-[#5a8a6e]/10 text-[#5a8a6e]" />
          <VitalCard icon={Wind} title="Resp Rate" value={liveVitals.respRate} unit="br/min" status="Live" statusClass="bg-[#c49332]/10 text-[#c49332]" />
          <VitalCard icon={Thermometer} title="Temperature" value={liveVitals.tempC} unit="°C" status="Live" statusClass="bg-[#5a8a6e]/10 text-[#5a8a6e]" />
          <VitalCard icon={Scale} title="BMI" value={patient.profile?.bmi || "21.4"} unit="kg/m²" status="Normal" statusClass="bg-[#5a8a6e]/10 text-[#5a8a6e]" />
        </div>

        {/* THREE-COLUMN INTEGRATED ZERO-SCROLL MEDICAL RECORD VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Column 1 (4 cols): Clinical Assessment */}
          <div className="lg:col-span-4 bg-white border border-[#d4d0ca] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#111111] mb-3 border-b border-[#f4f2eb] pb-2">
                Clinical Assessment
              </h3>
              <div className="space-y-2.5 text-xs text-[#333333]">
                <div>
                  <span className="text-[#6b6b6b] block font-mono uppercase text-[10px]">Chief Complaint</span>
                  <p className="font-medium text-[#111] mt-0.5">{patient.chiefComplaint}</p>
                </div>
                <div>
                  <span className="text-[#6b6b6b] block font-mono uppercase text-[10px]">Primary Diagnosis</span>
                  <p className="font-medium text-[#111] mt-0.5">{patient.primaryDiagnosis}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#6b6b6b] font-mono uppercase text-[10px]">Triage Status</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                    patient.triageLevel === 'Critical' ? 'bg-[#c2484a]/10 text-[#c2484a]' :
                    patient.triageLevel === 'Urgent' ? 'bg-[#c49332]/10 text-[#c49332]' : 'bg-[#5a8a6e]/10 text-[#5a8a6e]'
                  }`}>{patient.triageLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b6b6b] font-mono uppercase text-[10px]">ICD-10 Code</span>
                  <span className="font-mono font-bold text-[#111]">A15.0 (Pulmonary TB)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6b6b6b] font-mono uppercase text-[10px]">Attending Physician</span>
                  <span className="text-[#111] font-medium">{patient.attendingPhysician}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#f4f2eb] flex items-center justify-between text-xs">
              <span className="text-[#6b6b6b] text-[11px]">Treatment Day #{patient.profile?.treatmentDays ?? 1}</span>
              <span className="font-mono text-[11px] font-bold text-[#4a7c6f]">Ward IN-04</span>
            </div>
          </div>

          {/* Column 2 (5 cols): TB Lab Biomarkers Panel */}
          <div className="lg:col-span-5 bg-white border border-[#d4d0ca] rounded-2xl p-4 shadow-sm flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#f4f2eb]">
                <h3 className="font-serif text-base font-bold text-[#111111] flex items-center gap-1.5">
                  <TestTube size={16} className="text-[#4a7c6f]" /> TB Biomarkers Panel
                </h3>
                <span className="text-[10px] font-mono text-[#6b6b6b]">LAB: AUTOMATED VQC</span>
              </div>
              
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-mono uppercase text-[#9a9590] border-b border-[#f4f2eb]">
                    <th className="pb-1.5 font-medium">Marker</th>
                    <th className="pb-1.5 font-medium text-right">Value</th>
                    <th className="pb-1.5 font-medium text-center">Ref</th>
                    <th className="pb-1.5 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f4f2eb]/80 text-[#333333]">
                  <LabRowCompact name="ESR" value={`${patient.bloodMarkers.esr} mm/hr`} range="<20" status={patient.bloodMarkers.esr > 20 ? 'Elevated' : 'Normal'} isAlert={patient.bloodMarkers.esr > 20} />
                  <LabRowCompact name="CRP" value={`${patient.bloodMarkers.crp} mg/L`} range="<10" status={patient.bloodMarkers.crp > 10 ? 'Elevated' : 'Normal'} isAlert={patient.bloodMarkers.crp > 10} />
                  <LabRowCompact name="WBC" value={`${(patient.bloodMarkers.wbcCount / 1000).toFixed(1)}k/µL`} range="4.0-11" status="Normal" isAlert={false} />
                  <LabRowCompact name="Lymph %" value={`${patient.bloodMarkers.lymphocytePct}%`} range="20-40%" status="Normal" isAlert={false} />
                  <LabRowCompact name="Pleural ADA" value={`${patient.tbTests.adaLevel} U/L`} range="<30" status={patient.tbTests.adaLevel > 30 ? 'Critical' : 'Normal'} isAlert={patient.tbTests.adaLevel > 30} />
                  <LabRowCompact name="Mantoux" value={`${patient.tbTests.mantouxMm} mm`} range="<10" status={patient.tbTests.mantouxMm >= 10 ? 'Positive' : 'Negative'} isAlert={patient.tbTests.mantouxMm >= 10} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3 (3 cols): Active Medications */}
          <div className="lg:col-span-3 bg-white border border-[#d4d0ca] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#111111] mb-2 flex items-center gap-1.5 border-b border-[#f4f2eb] pb-2">
                <Pill size={16} className="text-[#4a7c6f]" /> Active Medications
              </h3>
              <div className="space-y-2 text-xs">
                <MedItemCompact name="Isoniazid (H)" dose="300mg daily" status="Active" />
                <MedItemCompact name="Rifampin (R)" dose="600mg daily" status="Active" />
                <MedItemCompact name="Pyrazinamide (Z)" dose="1500mg daily" status="Active" />
                <MedItemCompact name="Ethambutol (E)" dose="1200mg daily" status="Active" />
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#f4f2eb] bg-[#faf9f7] rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#6b6b6b] block">QML TB RISK</span>
                <span className="font-mono text-base font-bold text-[#111]">{qmlRiskScore}%</span>
              </div>
              <Link 
                to={`/patient/${patient.id}/qml`}
                className="text-[11px] font-bold text-[#4a7c6f] hover:underline"
              >
                Inspect →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const VitalCard = ({ icon: Icon, title, value, unit, status, statusClass }: any) => (
  <div className="bg-white border border-[#d4d0ca] rounded-xl p-3 shadow-xs flex flex-col justify-between">
    <div className="flex items-center gap-1.5 text-[#6b6b6b] mb-1">
      <Icon size={14} />
      <span className="text-[10px] font-semibold uppercase">{title}</span>
    </div>
    <div className="flex items-baseline gap-1 my-0.5">
      <span className="font-mono text-xl font-bold text-[#111111]">{value || '--'}</span>
      <span className="text-[10px] text-[#9a9590]">{unit}</span>
    </div>
    <div>
      <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full ${statusClass}`}>{status}</span>
    </div>
  </div>
);

const LabRowCompact = ({ name, value, range, status, isAlert }: any) => (
  <tr>
    <td className="py-1 font-medium">{name}</td>
    <td className="py-1 font-mono font-bold text-[#111] text-right">{value}</td>
    <td className="py-1 text-[11px] text-[#9a9590] text-center font-mono">{range}</td>
    <td className="py-1 text-right">
      <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full ${
        isAlert ? 'bg-[#c2484a]/10 text-[#c2484a]' : 'bg-[#5a8a6e]/10 text-[#5a8a6e]'
      }`}>{status}</span>
    </td>
  </tr>
);

const MedItemCompact = ({ name, dose, status }: any) => (
  <div className="flex items-center justify-between py-1 border-b border-[#f4f2eb]/60 last:border-0">
    <div>
      <p className="font-semibold text-[#111111] text-xs">{name}</p>
      <p className="text-[10px] text-[#6b6b6b] font-mono">{dose}</p>
    </div>
    <span className="bg-[#5a8a6e]/10 text-[#5a8a6e] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">{status}</span>
  </div>
);
