import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

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

export const TBBenchmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
            Tuberculosis Stage Performance Benchmarks
          </h1>
          <p className="mt-4 text-lg text-[#6b6b6b] max-w-3xl">
            Empirical validation of the 8-qubit Variational Quantum Classifier (VQC) against optimized classical deterministic ensemble models, stratified by TB progression stages.
          </p>
        </header>

        {/* 3 Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111111] text-white rounded-2xl p-6 shadow-md border border-[#111111]">
            <h3 className="text-sm text-[#9a9590] uppercase tracking-wider font-semibold">QML Overall Accuracy</h3>
            <div className="text-4xl font-mono mt-2 mb-1 text-[#a8d5ba]">94.8%</div>
            <p className="text-sm text-[#6b6b6b]">Across all progression stages (T1-T5)</p>
          </div>
          <div className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm text-[#6b6b6b] uppercase tracking-wider font-semibold">Classical Overall Accuracy</h3>
            <div className="text-4xl font-mono mt-2 mb-1 text-[#111111]">86.2%</div>
            <p className="text-sm text-[#9a9590]">Standard reference benchmark</p>
          </div>
          <div className="bg-[#4a7c6f] text-white rounded-2xl p-6 shadow-md border border-[#4a7c6f]">
            <h3 className="text-sm text-[#a8d5ba] uppercase tracking-wider font-semibold">Early Stage (T1) Advantage</h3>
            <div className="text-4xl font-mono mt-2 mb-1">+18.9%</div>
            <p className="text-sm text-[#d1e5d8]">Sensitivity delta in initial progression</p>
          </div>
        </section>

        {/* Bar Chart */}
        <section className="bg-white border border-[#d4d0ca] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-serif mb-6 text-[#111111]">Stage-by-Stage Accuracy Analysis</h2>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STAGE_PERFORMANCE} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e2d9" vertical={false} />
                <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fill: '#6b6b6b', fontSize: 12, fontFamily: 'monospace' }} dy={10} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#9a9590', fontSize: 12, fontFamily: 'monospace' }} domain={[60, 100]} />
                <Tooltip 
                  cursor={{ fill: '#f4f2eb' }}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#333', color: '#fff', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontFamily: 'sans-serif', fontSize: '13px' }} />
                <Bar dataKey="QML" name="Quantum VQC Model" fill="#4a7c6f" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Bar dataKey="Classical" name="Classical Ensemble" fill="#c49332" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Head to Head Benchmark Table */}
        <section className="bg-white border border-[#d4d0ca] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[#e5e2d9]">
            <h2 className="text-2xl font-serif text-[#111111]">Comprehensive Architecture Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f4f2eb] text-[#6b6b6b] font-semibold text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-[#d4d0ca]">Evaluation Metric</th>
                  <th className="py-4 px-6 border-b border-[#d4d0ca] text-[#4a7c6f]">QML (VQC)</th>
                  <th className="py-4 px-6 border-b border-[#d4d0ca] text-[#c49332]">Classical</th>
                  <th className="py-4 px-6 border-b border-[#d4d0ca]">Delta</th>
                  <th className="py-4 px-6 border-b border-[#d4d0ca]">Architectural Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2d9] font-mono text-sm text-[#111111]">
                {COMPARISON_METRICS.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f9f8f6] transition-colors">
                    <td className="py-4 px-6 font-medium text-[#111111]">{row.metric}</td>
                    <td className="py-4 px-6 font-bold text-[#4a7c6f]">{row.qml}</td>
                    <td className="py-4 px-6">{row.classical}</td>
                    <td className="py-4 px-6 font-bold text-[#111111]">{row.delta}</td>
                    <td className="py-4 px-6 text-xs text-[#6b6b6b] font-sans">{row.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
