import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { usePatient } from '@/contexts/PatientContext';
import { PATIENTS_LIST } from '@/data/patients';
import { ArrowLeft } from 'lucide-react';

interface PatientNavTabsProps {
  currentTab?: string;
}

export function PatientNavTabs({ currentTab }: PatientNavTabsProps) {
  const { id } = useParams<{ id: string }>();
  const { selectedPatient } = usePatient();
  const navigate = useNavigate();

  const patient = selectedPatient || (id ? PATIENTS_LIST.find(p => p.id === id) : null) || PATIENTS_LIST[0];

  if (!patient) return null;

  return (
    <div className="bg-white border-b border-[#eae7e1] pt-4 px-8 font-sans w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <div className="h-4 w-px bg-[#d4d0ca]" />
            <div className="flex items-baseline gap-3">
              <h1 className="font-serif text-2xl text-[#1a1a1a]">{patient.name}</h1>
              <span className="text-[#6b6b6b] text-sm">{patient.age}y • {patient.gender}</span>
              <span className="font-mono text-[#9a9590] text-sm">MRN: {patient.mrn}</span>
              <span className="font-mono text-[#9a9590] text-sm">Bed: {patient.bed}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full border border-[#d4d0ca] text-xs flex gap-2 items-center bg-white">
              <span className="text-[#9a9590]">HR</span>
              <span className="font-mono font-medium text-[#1a1a1a]">{patient.vitals.heartRate}</span>
            </div>
            <div className="px-3 py-1 rounded-full border border-[#d4d0ca] text-xs flex gap-2 items-center bg-white">
              <span className="text-[#9a9590]">SpO2</span>
              <span className="font-mono font-medium text-[#1a1a1a]">{patient.vitals.spo2}%</span>
            </div>
            <div className="px-3 py-1 rounded-full border border-[#d4d0ca] text-xs flex gap-2 items-center bg-white">
              <span className="text-[#9a9590]">Temp</span>
              <span className="font-mono font-medium text-[#1a1a1a]">{patient.vitals.temperature}°C</span>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          {[
            { id: 'overview', label: 'Overview', path: `/patient/${patient.id}` },
            { id: 'qml', label: 'QML Comparison', path: `/patient/${patient.id}/qml` },
            { id: 'trends', label: 'Live Vitals & Trends', path: `/patient/${patient.id}/trends` },
            { id: 'xray', label: 'Radiology X-Ray', path: `/patient/${patient.id}/xray` },
            { id: 'notes', label: 'Clinical Notes', path: `/patient/${patient.id}/notes` },
          ].map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              end
              className={({ isActive }) =>
                `pb-3 text-sm transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#2a2a2a] text-[#1a1a1a] font-semibold'
                    : 'border-transparent text-[#9a9590] hover:text-[#444444]'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
