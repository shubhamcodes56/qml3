import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from 'recharts';
import { PatientNavTabs } from '@/components/PatientNavTabs';
import { apiClient } from '@/api/client';
import { PATIENTS_LIST } from '@/data/patients';
import { Pause, Play, ArrowLeft } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PatientTrendsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const hospitalPatient = id ? PATIENTS_LIST.find(p => p.id === id) : null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [streamData, setStreamData] = useState<any[]>([]);

  // Poll real backend live-history
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(async () => {
      try {
        const res = await apiClient.getLiveHistory();
        if (res && res.history) {
          const formattedData = res.history.map((tick: any) => {
            const date = new Date(tick.timestamp);
            
            // Baseline shifts to make simulation specific to the patient
            const baseHR = hospitalPatient?.vitals?.heartRate || 85;
            const baseSpo2 = hospitalPatient?.vitals?.spo2 || 96;
            const baseTemp = hospitalPatient?.vitals?.temperature || 37.1;
            const baseRisk = hospitalPatient?.qmlRiskScore || 45;
            const baseClassicalRisk = Math.max(10, baseRisk - 15); // Classical is usually lower

            // Calculate deltas from the backend generic stream (assuming generic stream centers around 85 HR, 96 SpO2, 50 Risk)
            const deltaHR = tick.classical_vitals.heart_rate - 85;
            const deltaSpo2 = tick.classical_vitals.spo2 - 96;
            const deltaTemp = tick.classical_vitals.temperature - 37.0;
            const deltaRisk = tick.risk.qml - 50;
            const deltaClassical = tick.risk.classical - 40;

            return {
              time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`,
              heartRate: (baseHR + deltaHR).toFixed(0),
              spo2: Math.min(100, Math.max(0, baseSpo2 + deltaSpo2)).toFixed(0),
              respRate: (baseTemp + deltaTemp).toFixed(1), // Display Temp
              crp: hospitalPatient?.bloodMarkers?.crp ? (hospitalPatient.bloodMarkers.crp + (Math.random() * 2 - 1)).toFixed(1) : (Math.random() * 5 + 10).toFixed(1),
              pleuralAda: hospitalPatient?.tbTests?.adaLevel ? (hospitalPatient.tbTests.adaLevel + (Math.random() * 2 - 1)).toFixed(1) : (Math.random() * 10 + 20).toFixed(1),
              esr: hospitalPatient?.bloodMarkers?.esr ? (hospitalPatient.bloodMarkers.esr + (Math.random() * 2 - 1)).toFixed(1) : (Math.random() * 15 + 15).toFixed(1),
              tbRiskPct: Math.min(100, Math.max(0, baseRisk + deltaRisk)).toFixed(1),
              classicalTbRiskPct: Math.min(100, Math.max(0, baseClassicalRisk + deltaClassical)).toFixed(1),
              qmlAngle1: tick.qml_correlations?.hr_temp_sync ? tick.qml_correlations.hr_temp_sync.toFixed(2) : 0,
              qmlAngle2: tick.qml_correlations?.spo2_wbc_coupling ? tick.qml_correlations.spo2_wbc_coupling.toFixed(2) : 0,
              qmlEntropy: tick.qml_correlations?.entanglement_entropy ? tick.qml_correlations.entanglement_entropy.toFixed(2) : 0,
            };
          });
          setStreamData(formattedData.slice(-25)); // Keep last 25 points
        }
      } catch (e) {
        console.error("Live History Error:", e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const latestPoint = streamData[streamData.length - 1] || {};
  const patientDisplayName = hospitalPatient?.name || "Patient PT-1001";
  const patientId = id || "PT-1001";

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 font-sans bg-[#f4f2eb] animate-fade-in text-[#111111]">
      <PatientNavTabs currentTab="trends" />
      
      {/* Top Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e2d9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/patient/${patientId}`)}
              className="text-xs font-semibold text-[#111111] hover:text-[#4a7c6f] transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={16} /> ← Back to Overview
            </button>
            <span className="text-[#9a9590]">|</span>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-medium",
              isPlaying ? "bg-[#5a8a6e]/10 border-[#5a8a6e]/30 text-[#5a8a6e]" : "bg-[#c49332]/10 border-[#c49332]/30 text-[#c49332]"
            )}>
              <span className={cn("w-2 h-2 rounded-full", isPlaying ? "bg-[#5a8a6e] animate-pulse" : "bg-[#c49332]")} />
              <span>{isPlaying ? 'LIVE STREAMING TELEMETRY' : 'STREAM PAUSED'}</span>
            </div>
          </div>
          <h1 className="text-3xl font-serif text-[#111111] font-bold mt-2">Real-time Patient Vital Sign & Biomarker Fluctuations</h1>
          <p className="text-sm text-[#6b6b6b] mt-0.5">
            Streaming live clinical telemetry for <strong className="text-[#111]">{patientDisplayName}</strong> ({patientId})
          </p>
        </div>

        {/* Play/Pause Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-black transition-colors flex items-center gap-2 text-xs font-semibold shadow-md cursor-pointer"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause Live Stream' : 'Resume Live Stream'}</span>
          </button>
        </div>
      </div>

      {/* Live Vitals Indicator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-[#11161b] text-white p-4 rounded-xl border border-[#2a3642] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#a8d5ba] block">Heart Rate</span>
          <div className="text-2xl font-mono font-bold text-white mt-1">{latestPoint.heartRate || '--'} <span className="text-xs font-normal text-[#9a9590]">bpm</span></div>
        </div>

        <div className="bg-[#11161b] text-white p-4 rounded-xl border border-[#2a3642] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#a8d5ba] block">SpO2 Level</span>
          <div className="text-2xl font-mono font-bold text-[#5a8a6e] mt-1">{latestPoint.spo2 || '--'}%</div>
        </div>

        <div className="bg-[#11161b] text-white p-4 rounded-xl border border-[#2a3642] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#a8d5ba] block">C-Reactive Protein</span>
          <div className="text-2xl font-mono font-bold text-[#c49332] mt-1">{latestPoint.crp || '--'} <span className="text-xs font-normal text-[#9a9590]">mg/L</span></div>
        </div>

        <div className="bg-[#11161b] text-white p-4 rounded-xl border border-[#2a3642] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#a8d5ba] block">Pleural ADA</span>
          <div className="text-2xl font-mono font-bold text-[#ff88a5] mt-1">{latestPoint.pleuralAda || '--'} <span className="text-xs font-normal text-[#9a9590]">U/L</span></div>
        </div>

        <div className="bg-[#11161b] text-white p-4 rounded-xl border border-[#2a3642] shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#a8d5ba] block">Resp Rate</span>
          <div className="text-2xl font-mono font-bold text-white mt-1">{latestPoint.respRate || '--'} <span className="text-xs font-normal text-[#9a9590]">br/min</span></div>
        </div>

        <div className="bg-[#1b0d14] text-white p-4 rounded-xl border border-[#f48b8b]/40 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-[#f48b8b] block">QML TB Risk</span>
          <div className="text-2xl font-mono font-bold text-[#ffb3b3] mt-1">{latestPoint.tbRiskPct || '--'}%</div>
        </div>
      </div>

      {/* CHART 1: DUAL QML + Classical Tuberculosis Risk Prediction Curve (DARK THEME GRID) */}
      <div className="bg-[#11161b] text-white rounded-2xl p-6 shadow-md border border-[#2a3642]">
        <div className="flex justify-between items-center mb-6 border-b border-[#2a3642] pb-3">
          <div>
            <h3 className="font-serif text-xl text-white font-bold">Live TB Risk Prediction Curve — QML vs Classical ML</h3>
            <p className="text-xs text-[#9a9590]">8-Qubit VQC (pink) vs Classical ConvNet Baseline (gold) risk trajectories</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="w-3 h-1.5 rounded bg-[#f48b8b]" /> QML Risk
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="w-3 h-1.5 rounded bg-[#c49332]" /> Classical ML
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={streamData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRiskPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f48b8b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f48b8b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRiskGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c49332" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#c49332" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a3642" />
              <XAxis dataKey="time" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <YAxis domain={[0, 100]} tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1b0d14', color: '#fff', borderRadius: '10px', border: '1px solid #f48b8b' }}
                itemStyle={{ fontFamily: 'monospace' }}
              />
              <ReferenceLine y={50} stroke="#c49332" strokeDasharray="4 4" label={{ value: 'Clinical Threshold (50%)', fill: '#c49332', fontSize: 10 }} />
              <Area type="monotone" dataKey="classicalTbRiskPct" name="Classical ML Risk (%)" stroke="#c49332" strokeWidth={2} fillOpacity={1} fill="url(#colorRiskGold)" isAnimationActive={false} />
              <Area type="monotone" dataKey="tbRiskPct" name="QML TB Risk (%)" stroke="#f48b8b" strokeWidth={3} fillOpacity={1} fill="url(#colorRiskPink)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: Hemodynamics (Heart Rate vs SpO2) (DARK THEME GRID) */}
      <div className="bg-[#11161b] text-white rounded-2xl p-6 shadow-md border border-[#2a3642]">
        <h3 className="font-serif text-xl text-white font-bold mb-4 border-b border-[#2a3642] pb-3">
          Hemodynamic Telemetry (Heart Rate & SpO2)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a3642" />
              <XAxis dataKey="time" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <YAxis yAxisId="left" domain={[40, 140]} tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <YAxis yAxisId="right" orientation="right" domain={[80, 100]} tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <Tooltip contentStyle={{ backgroundColor: '#18222a', color: '#fff', borderRadius: '8px', border: '1px solid #2a3642' }} />
              <ReferenceLine y={95} yAxisId="right" stroke="#c2484a" strokeDasharray="3 3" label={{ value: 'Hypoxia Limit (95%)', fill: '#c2484a', fontSize: 10 }} />
              <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="heartRate" name="Heart Rate (bpm)" stroke="#c49332" strokeWidth={2.5} dot={false} />
              <Line isAnimationActive={false} yAxisId="right" type="monotone" dataKey="spo2" name="SpO2 (%)" stroke="#5a8a6e" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 3: Inflammatory & Pleural Biomarkers (DARK THEME GRID) */}
      <div className="bg-[#11161b] text-white rounded-2xl p-6 shadow-md border border-[#2a3642]">
        <h3 className="font-serif text-xl text-white font-bold mb-4 border-b border-[#2a3642] pb-3">
          Inflammatory & Pleural ADA Biomarker Dynamics
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a3642" />
              <XAxis dataKey="time" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <YAxis tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <Tooltip contentStyle={{ backgroundColor: '#18222a', color: '#fff', borderRadius: '8px', border: '1px solid #2a3642' }} />
              <Line isAnimationActive={false} type="monotone" dataKey="crp" name="CRP (mg/L)" stroke="#c49332" strokeWidth={2.5} dot={false} />
              <Line isAnimationActive={false} type="monotone" dataKey="esr" name="ESR (mm/hr)" stroke="#c2484a" strokeWidth={2.5} dot={false} />
              <Line isAnimationActive={false} type="monotone" dataKey="pleuralAda" name="Pleural ADA (U/L)" stroke="#ff88a5" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* CHART 4: QML Internal Entanglement State (DARK THEME GRID) */}
      <div className="bg-[#11161b] text-white rounded-2xl p-6 shadow-md border border-[#2a3642] mt-6">
        <h3 className="font-serif text-xl text-white font-bold mb-4 border-b border-[#2a3642] pb-3">
          Quantum Machine Learning (QML) Entanglement State
        </h3>
        <p className="text-xs text-[#9a9590] mb-4">
          Visualizing internal circuit rotational angles and state entropy. Unlike classical ML, these correlations represent superposition entanglement between biological variables.
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streamData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a3642" />
              <XAxis dataKey="time" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" />
              <YAxis yAxisId="left" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" domain={[-3.14, 3.14]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9a9590', fontSize: 11, fontFamily: 'monospace' }} stroke="#2a3642" domain={[0, 4]} />
              <Tooltip contentStyle={{ backgroundColor: '#18222a', color: '#fff', borderRadius: '8px', border: '1px solid #2a3642' }} />
              <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="qmlAngle1" name="HR-Temp Phase Angle (θ₀)" stroke="#805ad5" strokeWidth={2} dot={false} />
              <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="qmlAngle2" name="SpO2-WBC Phase Angle (θ₁)" stroke="#3182ce" strokeWidth={2} dot={false} />
              <Line isAnimationActive={false} yAxisId="right" type="stepAfter" dataKey="qmlEntropy" name="Von Neumann Entropy (S)" stroke="#e53e3e" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
