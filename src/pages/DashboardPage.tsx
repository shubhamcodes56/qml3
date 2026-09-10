import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePatient } from '@/contexts/PatientContext';
import { PATIENTS_LIST } from '@/data/patients';
import { Search, ArrowRight, ArrowLeft, ShieldAlert, Activity, UserCheck } from 'lucide-react';
import { RiskGauge } from '@/components/RiskGauge';

type FilterType = 'All' | 'Critical' | 'Urgent' | 'Stable';

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  const { selectPatient } = usePatient();
  const navigate = useNavigate();

  const filteredPatients = useMemo(() => {
    return PATIENTS_LIST.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.mrn.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'All' || p.triageLevel === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const criticalCount = PATIENTS_LIST.filter(p => p.triageLevel === 'Critical').length;
  const avgQmlRisk = Math.round(PATIENTS_LIST.reduce((acc, p) => acc + p.qmlRiskScore, 0) / (PATIENTS_LIST.length || 1));

  const handleReviewPatient = (id: string) => {
    selectPatient(id);
    navigate(`/patient/${id}`);
  };

  const getBorderColor = (level: string) => {
    switch(level) {
      case 'Critical': return 'border-l-[#c2484a]';
      case 'Urgent': return 'border-l-[#c49332]';
      case 'Stable': return 'border-l-[#5a8a6e]';
      default: return 'border-l-[#d4d0ca]';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2eb] pt-6 pb-16 font-sans text-[#111111] animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Navigation & Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e2d9] pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link to="/login" className="text-xs font-semibold text-[#6b6b6b] hover:text-[#111] transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Home
              </Link>
              <span className="text-[#9a9590]">|</span>
              <span className="text-xs font-mono text-[#5a8a6e] font-semibold uppercase tracking-wider">Hospital Node #IN-DELHI-04</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">Active Patient Surveillance Queue</h1>
            <p className="text-sm text-[#6b6b6b] mt-1">Real-time QML Tuberculosis Risk Monitoring & Clinical Triage</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full border border-[#5a8a6e]/30 bg-[#5a8a6e]/10 text-[#5a8a6e] text-xs font-mono font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5a8a6e] animate-pulse" />
              <span>6 Active In-Patient Telemetry Feeds</span>
            </div>
          </div>
        </div>

        {/* Prominent Stats Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-7 rounded-2xl border border-[#d4d0ca] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b]">Total Cohort Patients</span>
              <div className="font-serif text-4xl font-bold text-[#111111] mt-1">{PATIENTS_LIST.length}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f4f2eb] flex items-center justify-center text-[#111111]">
              <UserCheck size={24} />
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#d4d0ca] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6b6b6b]">High Risk Critical Cases</span>
              <div className="font-serif text-4xl font-bold text-[#c2484a] mt-1">{criticalCount}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#c2484a]/10 flex items-center justify-center text-[#c2484a]">
              <ShieldAlert size={24} />
            </div>
          </div>

          <div className="bg-[#111111] text-white p-7 rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#a8d5ba]">Mean QML Risk Score</span>
              <div className="font-mono text-4xl font-bold text-[#a8d5ba] mt-1">{avgQmlRisk}%</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#222222] flex items-center justify-center text-[#a8d5ba]">
              <Activity size={24} />
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2">
            {(['All', 'Critical', 'Urgent', 'Stable'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#111111] text-white shadow'
                    : 'bg-white border border-[#d4d0ca] text-[#6b6b6b] hover:border-[#111111]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9590]" />
            <input
              type="text"
              placeholder="Search by patient name, MRN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#d4d0ca] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#111111] transition-colors text-[#111111] placeholder:text-[#9a9590]"
            />
          </div>
        </div>

        {/* Fully Clickable Patient Grid Cards */}
        <div className="space-y-5">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              onClick={() => handleReviewPatient(patient.id)}
              className={`bg-white rounded-2xl border border-[#d4d0ca] border-l-[6px] ${getBorderColor(patient.triageLevel)} shadow-sm hover:shadow-md hover:border-[#111111] transition-all p-7 flex flex-col md:flex-row items-center gap-8 cursor-pointer group`}
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#111111] group-hover:text-[#4a7c6f] transition-colors">
                    {patient.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    patient.triageLevel === 'Critical' ? 'bg-[#c2484a]/10 text-[#c2484a]' :
                    patient.triageLevel === 'Urgent' ? 'bg-[#c49332]/10 text-[#c49332]' : 'bg-[#5a8a6e]/10 text-[#5a8a6e]'
                  }`}>
                    {patient.triageLevel}
                  </span>
                </div>

                <div className="text-xs text-[#6b6b6b] flex flex-wrap items-center gap-3 font-mono">
                  <span>{patient.age} years</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span>MRN: {patient.mrn}</span>
                  <span>•</span>
                  <span>Bed: {patient.bed}</span>
                </div>
                
                <div className="bg-[#faf9f7] p-3.5 rounded-xl border border-[#e5e2d9] text-xs space-y-1">
                  <p className="text-[#111]"><strong className="text-[#6b6b6b]">Chief Complaint:</strong> {patient.chiefComplaint}</p>
                  <p className="text-[#111]"><strong className="text-[#6b6b6b]">Primary Diagnosis:</strong> {patient.primaryDiagnosis}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono pt-1 text-[#6b6b6b]">
                  <div>HR: <strong className="text-[#111]">{patient.vitals.heartRate} bpm</strong></div>
                  <div>SpO2: <strong className="text-[#111]">{patient.vitals.spo2}%</strong></div>
                  <div>Temp: <strong className="text-[#111]">{patient.vitals.temperature}°C</strong></div>
                  <div>RR: <strong className="text-[#111]">{patient.vitals.respRate} br/min</strong></div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 border-t md:border-t-0 md:border-l border-[#eae7e1] pt-6 md:pt-0 md:pl-8 shrink-0">
                <RiskGauge value={patient.qmlRiskScore} size="md" label="QML TB Risk" />
                <div className="text-[#111111] text-xs font-bold flex items-center gap-1 group-hover:text-[#4a7c6f] transition-colors">
                  Review Clinical Record <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-16 text-[#9a9590] bg-white border border-[#d4d0ca] rounded-2xl">
              No patients found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
