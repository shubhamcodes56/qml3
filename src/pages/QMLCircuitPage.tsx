import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const COMPARISON_METRICS = [
  { metric: 'Overall Diagnostic Accuracy', qml: '94.8%', classical: '86.2%', delta: '+8.6%', advantage: 'QML handles multi-biomarker non-linear state spaces' },
  { metric: 'Early Stage TB Sensitivity (T1-T2)', qml: '91.3%', classical: '72.4%', delta: '+18.9%', advantage: 'Quantum kernel isolates subtle apical micro-opacities' },
  { metric: 'Specificity (Control Discrimination)', qml: '96.5%', classical: '90.1%', delta: '+6.4%', advantage: 'Lower false-positive treatment burden' },
  { metric: 'Trainable Parameter Efficiency', qml: '32 Params', classical: '25,600,000 Params', delta: '800,000x Fewer', advantage: 'Prevents overfitting on small clinical datasets' },
  { metric: 'Inference Execution Latency', qml: '18 ms', classical: '145 ms', delta: '8.1x Faster', advantage: 'Instant point-of-care feedback in field clinics' },
  { metric: 'NISQ Noise Resilience (Depolarizing)', qml: '93.1%', classical: 'N/A (Deterministic)', delta: 'Robust', advantage: 'Quantum error mitigation maintains stability' },
];

const STAGE_PERFORMANCE = [
  { stage: 'Stage T1', QML: 91.3, Classical: 72.4 },
  { stage: 'Stage T2', QML: 93.8, Classical: 79.1 },
  { stage: 'Stage T3', QML: 96.2, Classical: 88.5 },
  { stage: 'Stage T4', QML: 98.1, Classical: 94.0 },
  { stage: 'Stage T5', QML: 99.4, Classical: 97.2 },
];

const QUBITS = [
  { id: 0, label: 'q[0]: Heart Rate (bpm)', gate: 'H → RY(θ₀)', cnot: 'CNOT → q[1]' },
  { id: 1, label: 'q[1]: SpO2 Level (%)', gate: 'H → RY(θ₁)', cnot: 'CNOT → q[2]' },
  { id: 2, label: 'q[2]: CRP Biomarker (mg/L)', gate: 'H → RY(θ₂)', cnot: 'CNOT → q[3]' },
  { id: 3, label: 'q[3]: ESR Biomarker (mm/hr)', gate: 'H → RY(θ₃)', cnot: 'CNOT → q[4]' },
  { id: 4, label: 'q[4]: XR Cavitation Index', gate: 'H → RY(θ₄)', cnot: 'CNOT → q[5]' },
  { id: 5, label: 'q[5]: XR Infiltrate Opacity', gate: 'H → RY(θ₅)', cnot: 'CNOT → q[6]' },
  { id: 6, label: 'q[6]: Pleural ADA (U/L)', gate: 'H → RY(θ₆)', cnot: 'CNOT → q[7]' },
  { id: 7, label: 'q[7]: Mantoux Skin Test (mm)', gate: 'H → RY(θ₇)', cnot: 'CNOT → q[0]' },
];

export const QMLCircuitPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedQubit, setSelectedQubit] = useState<number | null>(null);

  const activeQubit = selectedQubit !== null ? QUBITS.find(q => q.id === selectedQubit) : null;

  return (
    <div className="min-h-screen bg-[#f4f2eb] p-8 md:p-12 text-[#111111]">
      <div className="max-w-6xl mx-auto space-y-8">
        <button 
          onClick={() => {
            logout();
            navigate('/login');
          }} 
          className="text-xs font-semibold text-[#111111] hover:text-[#4a7c6f] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>
        
        <header>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] tracking-tight">
            8-Qubit Variational Quantum Circuit (VQC)
          </h1>
          <p className="mt-4 text-lg text-[#6b6b6b] max-w-3xl">
            Interactive circuit visualization. Click on any qubit wire to inspect its variational gates, entanglements, and feature mapping.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#111111] rounded-2xl p-6 md:p-8 shadow-xl overflow-x-auto border border-[#333]">
            <div className="min-w-max font-mono text-sm text-[#9a9590]">
              <div className="flex mb-6 border-b border-[#333] pb-4 px-4 text-xs tracking-widest text-[#6b6b6b]">
                <div className="w-32"></div>
                <div className="flex-1 text-center border-l border-[#333] px-2">[INPUT ENCODING]</div>
                <div className="flex-1 text-center border-l border-[#333] px-2 text-[#3182ce]">[HADAMARD SUPERPOSITION]</div>
                <div className="flex-1 text-center border-l border-[#333] px-2 text-[#805ad5]">[VARIATIONAL RY ROTATION]</div>
                <div className="flex-1 text-center border-l border-[#333] px-2 text-[#dd6b20]">[CNOT ENTANGLEMENT RING]</div>
                <div className="w-24 text-center border-l border-[#333] px-2 text-[#e53e3e]">[⟨Z⟩ MEASUREMENT]</div>
              </div>

              {QUBITS.map((q) => (
                <div 
                  key={q.id} 
                  onClick={() => setSelectedQubit(q.id)}
                  className={`flex items-center group cursor-pointer transition-colors hover:bg-[#1a1a1a] rounded px-4 py-2 ${selectedQubit === q.id ? 'bg-[#222]' : ''}`}
                >
                  <div className="w-32 font-bold text-white truncate pr-4">
                    |q_{q.id}⟩
                  </div>
                  <div className="flex-1 text-center px-2 flex items-center">
                    <div className="h-px bg-[#444] w-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#222] text-[#9a9590] border border-[#444] px-2 py-0.5 rounded text-xs">
                        |0⟩
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center px-2 flex items-center">
                    <div className="h-px bg-[#444] w-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3182ce] text-white font-bold w-6 h-6 flex items-center justify-center rounded-sm">
                        H
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center px-2 flex items-center">
                    <div className="h-px bg-[#444] w-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#805ad5] text-white w-12 py-1 flex items-center justify-center rounded-sm text-xs">
                        RY(θ_{q.id})
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center px-2 flex items-center relative">
                    <div className="h-px bg-[#444] w-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#dd6b20] border-2 border-[#111111] z-10"></div>
                      <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#dd6b20] bg-[#111111] flex items-center justify-center z-10">
                        <div className="w-2 h-px bg-[#dd6b20]"></div>
                        <div className="h-2 w-px bg-[#dd6b20] absolute"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-center px-2 flex items-center">
                    <div className="h-px bg-[#444] w-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#e53e3e] text-white px-2 py-1 rounded-sm text-xs border border-red-800">
                        ⟨Z⟩
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-sm h-fit sticky top-8">
            <h3 className="text-xl font-serif border-b border-[#e5e2d9] pb-4 mb-4">Gate Inspector</h3>
            {activeQubit ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-[#9a9590] uppercase tracking-wider mb-1">Target Qubit</div>
                  <div className="font-mono text-lg font-bold text-[#c49332]">|q_{activeQubit.id}⟩</div>
                </div>
                <div>
                  <div className="text-xs text-[#9a9590] uppercase tracking-wider mb-1">Encoded Feature</div>
                  <div className="font-medium text-[#111111]">{activeQubit.label.split(': ')[1]}</div>
                </div>
                <div className="bg-[#f4f2eb] p-4 rounded-xl border border-[#e5e2d9] font-mono text-sm space-y-2 text-[#6b6b6b]">
                  <div className="flex justify-between border-b border-[#d4d0ca] pb-2">
                    <span className="text-[#3182ce]">Superposition:</span>
                    <span>H</span>
                  </div>
                  <div className="flex justify-between border-b border-[#d4d0ca] pb-2">
                    <span className="text-[#805ad5]">Rotation:</span>
                    <span>RY(θ_{activeQubit.id})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#d4d0ca] pb-2">
                    <span className="text-[#dd6b20]">Entanglement:</span>
                    <span>{activeQubit.cnot.split('→ ')[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#e53e3e]">Measurement:</span>
                    <span>Pauli-Z</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#6b6b6b]">
                <div className="w-12 h-12 rounded-full bg-[#f4f2eb] border-2 border-dashed border-[#d4d0ca] mx-auto mb-3 flex items-center justify-center font-mono text-xs">?</div>
                <p>Select a qubit wire from the circuit diagram to inspect its properties.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
