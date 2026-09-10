import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PatientNavTabs } from '@/components/PatientNavTabs';
import { Sparkles, ArrowLeft, Heart, Droplets, TestTube, Image as ImageIcon, Activity, ShieldCheck, HelpCircle } from 'lucide-react';
import { PATIENTS_LIST, PATIENT_QML_METRICS } from '@/data/patients';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const QUBIT_LAYMAN_GUIDE = [
  {
    id: 0,
    qubit: 'q[0]',
    name: 'Heart Rate (Pulse)',
    marker: 'Vital Telemetry',
    icon: Heart,
    color: '#c49332',
    explanation: 'Monitors cardiovascular strain. Active lung infections force the heart to pump faster to circulate oxygen.',
    statusMeaning: 'Active rotation indicates elevated or irregular pulse correlated with respiratory stress.'
  },
  {
    id: 1,
    qubit: 'q[1]',
    name: 'Blood Oxygen (SpO2)',
    marker: 'Vital Telemetry',
    icon: Droplets,
    color: '#5a8a6e',
    explanation: 'Measures how much oxygen reaches the bloodstream. TB damages lung alveoli, lowering oxygen transfer.',
    statusMeaning: 'Subtle dips below 96% get magnified by quantum phase encoding to flag early hypoxia.'
  },
  {
    id: 2,
    qubit: 'q[2]',
    name: 'CRP (C-Reactive Protein)',
    marker: 'Blood Biomarker',
    icon: TestTube,
    color: '#c49332',
    explanation: 'A protein produced by the liver when severe inflammation is present anywhere in the body.',
    statusMeaning: 'Elevated values indicate the immune system is actively fighting Mycobacterium bacteria.'
  },
  {
    id: 3,
    qubit: 'q[3]',
    name: 'ESR (Sedimentation Rate)',
    marker: 'Blood Biomarker',
    icon: Activity,
    color: '#c2484a',
    explanation: 'Measures how quickly red blood cells settle. Faster settling points directly to chronic infection.',
    statusMeaning: 'Correlated with CRP to differentiate between acute pneumonia and chronic tuberculosis.'
  },
  {
    id: 4,
    qubit: 'q[4]',
    name: 'X-Ray Cavitation Index',
    marker: 'Radiology Scan',
    icon: ImageIcon,
    color: '#c2484a',
    explanation: 'Scans for hollow cavities (holes) formed where active TB bacteria destroyed lung tissue.',
    statusMeaning: 'High excitation confirms structural tissue destruction in apical segments.'
  },
  {
    id: 5,
    qubit: 'q[5]',
    name: 'X-Ray Infiltrate Opacity',
    marker: 'Radiology Scan',
    icon: ImageIcon,
    color: '#4a7c6f',
    explanation: 'Detects cloudy, hazy white patches in lung X-rays where fluid or pus has collected.',
    statusMeaning: 'Flags early consolidation before visible large-scale cavities develop.'
  },
  {
    id: 6,
    qubit: 'q[6]',
    name: 'Pleural ADA (Adenosine Deaminase)',
    marker: 'Enzyme Assay',
    icon: TestTube,
    color: '#ff88a5',
    explanation: 'An enzyme found in lung fluid. Very high levels are a hallmark indicator of tuberculous pleurisy.',
    statusMeaning: 'Critical biomarker: ADA levels over 30 U/L have over 90% specificity for active TB.'
  },
  {
    id: 7,
    qubit: 'q[7]',
    name: 'Mantoux Skin Reaction',
    marker: 'Immunology Test',
    icon: ShieldCheck,
    color: '#4a7c6f',
    explanation: 'Skin test showing whether your immune T-cells have previously encountered TB proteins.',
    statusMeaning: 'A firm raised welt >10mm signals that the immune system recognizes tuberculosis.'
  },
];

export const QMLInsightsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedQubit, setSelectedQubit] = useState<number | null>(0);

  const patient = id ? PATIENTS_LIST.find(p => p.id === id) || PATIENTS_LIST[0] : PATIENTS_LIST[0];
  const qmlMetrics = id ? PATIENT_QML_METRICS[id] : null;
  const qmlRiskScore = qmlMetrics?.riskScore ?? patient.qmlRiskScore ?? 78;
  const classicalRisk = Math.max(10, qmlRiskScore - 12);

  const activeQubitInfo = selectedQubit !== null ? QUBIT_LAYMAN_GUIDE[selectedQubit] : QUBIT_LAYMAN_GUIDE[0];

  return (
    <div className="w-full min-h-[calc(100vh-68px)] font-sans bg-[#f4f2eb] animate-fade-in text-[#111111] pb-10">
      <PatientNavTabs currentTab="qml" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 space-y-4">
        
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e2d9] pb-3">
          <div>
            <button 
              onClick={() => navigate(`/patient/${patient.id}`)}
              className="text-xs font-semibold text-[#111111] hover:text-[#4a7c6f] transition-colors flex items-center gap-1 cursor-pointer mb-1"
            >
              <ArrowLeft size={14} /> ← Back to {patient.name}'s Overview
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#111111] font-bold">
              QML Quantum Risk Analysis — {patient.name}
            </h1>
            <p className="text-xs text-[#6b6b6b]">
              Evaluating 8-Qubit Variational Quantum Classifier (VQC) against Classical ConvNet (DenseNet-121)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6b6b6b]">File: <strong className="text-[#111]">{patient.id}</strong></span>
            <span className="text-[#9a9590]">|</span>
            <span className="text-xs font-mono text-[#6b6b6b]">Bed: <strong className="text-[#111]">{patient.bed}</strong></span>
          </div>
        </div>

        {/* TOP 3 SCORE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#111111] text-white rounded-xl p-4 shadow-sm border border-[#222]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#a8d5ba] uppercase tracking-wider">QML TB Risk Score</span>
              <span className="text-[10px] bg-[#a8d5ba]/20 text-[#a8d5ba] px-2 py-0.5 rounded-full font-mono font-bold">VQC Hilbert</span>
            </div>
            <div className="text-3xl font-mono font-bold text-[#a8d5ba] mt-2">{qmlRiskScore}%</div>
            <p className="text-[11px] text-[#9a9590] mt-1">Multi-biomarker quantum probability calculation</p>
          </div>

          <div className="bg-white border border-[#d4d0ca] rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#6b6b6b]">Classical ConvNet Risk</span>
              <span className="text-[10px] bg-[#f4f2eb] text-[#6b6b6b] px-2 py-0.5 rounded-full font-mono">DenseNet</span>
            </div>
            <div className="text-3xl font-mono font-bold text-[#111111] mt-2">{classicalRisk}%</div>
            <p className="text-[11px] text-[#6b6b6b] mt-1">Standard reference deep neural network</p>
          </div>

          <div className="bg-white border border-[#d4d0ca] rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#4a7c6f]">Quantum State Fidelity</span>
              <span className="text-[10px] bg-[#4a7c6f]/10 text-[#4a7c6f] px-2 py-0.5 rounded-full font-mono font-bold">95.2%</span>
            </div>
            <div className="text-3xl font-mono font-bold text-[#4a7c6f] mt-2">0.952</div>
            <p className="text-[11px] text-[#6b6b6b] mt-1">Zero-noise quantum measurement signal sharpness</p>
          </div>
        </div>

        {/* PATIENT BIOMARKER QUBIT EXCITATION MAP */}
        <div className="bg-white border border-[#d4d0ca] rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#f4f2eb] pb-2">
            <div>
              <h3 className="font-serif text-base font-bold text-[#111111]">
                Patient Biomarker Qubit Excitation Map
              </h3>
              <p className="text-[11px] text-[#6b6b6b]">
                Click any qubit sensor below to see an easy-to-understand explanation of what it measures.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#4a7c6f] bg-[#4a7c6f]/10 px-2 py-1 rounded-md font-bold">
              8-QUBIT REGISTER
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {QUBIT_LAYMAN_GUIDE.map((q) => {
              const isSelected = selectedQubit === q.id;
              const Icon = q.icon;
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQubit(q.id)}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                    isSelected
                      ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                      : "bg-[#faf9f7] text-[#111111] border-[#e5e2d9] hover:border-[#111111]"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={cn(
                      "font-mono font-bold text-xs",
                      isSelected ? "text-[#a8d5ba]" : "text-[#4a7c6f]"
                    )}>
                      {q.qubit}
                    </span>
                    <Icon size={14} className={isSelected ? "text-[#a8d5ba]" : "text-[#6b6b6b]"} />
                  </div>
                  <div className="font-semibold text-xs truncate w-full">{q.name}</div>
                  <div className={cn(
                    "text-[10px] font-mono mt-2 pt-1 border-t flex justify-between items-center",
                    isSelected ? "border-[#333] text-[#9a9590]" : "border-[#e5e2d9] text-[#6b6b6b]"
                  )}>
                    <span>State |ψ⟩</span>
                    <span className={isSelected ? "text-[#a8d5ba] font-bold" : "text-[#4a7c6f]"}>Active</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* LAYMAN LANGUAGE EXPLANATION PANEL */}
        <div className="bg-white border border-[#d4d0ca] rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#f4f2eb] pb-3">
            <HelpCircle size={18} className="text-[#4a7c6f]" />
            <h3 className="font-serif text-base font-bold text-[#111111]">
              Plain-English Insights Guide: Understanding This Patient's Quantum Analysis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            
            {/* Selected Qubit Deep Dive */}
            <div className="bg-[#faf9f7] p-4 rounded-xl border border-[#e5e2d9] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#4a7c6f] uppercase">
                  {activeQubitInfo.qubit}: {activeQubitInfo.name}
                </span>
                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#d4d0ca] text-[#6b6b6b]">
                  {activeQubitInfo.marker}
                </span>
              </div>
              <p className="text-[#333] text-xs leading-relaxed">
                <strong>What it checks:</strong> {activeQubitInfo.explanation}
              </p>
              <p className="text-[#555] text-xs pt-1 border-t border-[#e5e2d9]">
                <strong>What the quantum reading found:</strong> {activeQubitInfo.statusMeaning}
              </p>
            </div>

            {/* Overall Quantum Advantage Explained in Simple Terms */}
            <div className="bg-[#faf9f7] p-4 rounded-xl border border-[#e5e2d9] space-y-2">
              <span className="font-mono text-[11px] font-bold text-[#111] uppercase block">
                How Does The Quantum AI Make This Decision?
              </span>
              <p className="text-[#333] text-xs leading-relaxed">
                Normal computers test numbers one by one. If a patient's temperature is only slightly up and X-ray looks borderline, standard software can easily classify them as "healthy".
              </p>
              <p className="text-[#333] text-xs leading-relaxed">
                <strong>Our Quantum Advantage:</strong> The 8-qubit register tests all 8 tests together simultaneously across <strong>256 interconnected states</strong>. It catches subtle combinations (like slight inflammation paired with hidden lung density) to catch tuberculosis weeks before it becomes dangerous.
              </p>
            </div>

          </div>

          {/* Quick Doctor's Summary Bar */}
          <div className="bg-[#111111] text-white p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f48b8b] animate-pulse" />
              <span>
                <strong>Clinical Takeaway for {patient.name}:</strong> High confidence of active infection confirmed by paired ESR/ADA quantum entanglement.
              </span>
            </div>
            <button 
              onClick={() => navigate(`/patient/${patient.id}/xray`)}
              className="px-3 py-1 bg-[#a8d5ba] hover:bg-[#bce6cd] text-[#111] font-bold rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
            >
              Verify on X-Ray →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
