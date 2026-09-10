import React, { useState } from 'react';
import { PatientNavTabs } from '@/components/PatientNavTabs';
import { useAuth } from '@/contexts/AuthContext';
import { usePatient } from '@/contexts/PatientContext';
import { PATIENT_CLINICAL_NOTES } from '@/data/patients';
import { Plus, CheckCircle2, X, FileText, User, Calendar, Tag } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Note {
  id: string;
  author: string;
  role: string;
  category: string;
  content: string;
  timestamp: string;
  icd10?: string;
  tags?: string[];
}

export const ClinicalNotesPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedPatient: currentPatient } = usePatient();
  
  const initialNotes = (currentPatient && PATIENT_CLINICAL_NOTES[currentPatient.id]) || [
    {
      id: 'note-1',
      author: 'Dr. Sarah Chen',
      role: 'Pulmonology Chief',
      category: 'Progress Note',
      tags: ['Cavitary TB', 'Stage T5', 'HRZE Regimen'],
      content: `SUBJECTIVE:
Patient presents for follow-up of TB treatment. Reports feeling improved, with decreased night sweats over the past 48 hours. Adherence to HRZE quad-therapy is confirmed.

OBJECTIVE:
Vitals: HR 85 bpm, SpO2 98.0%, Temp 37.3°C, RR 15, CRP 3.51 mg/L, ESR 24.5 mm/hr.
Chest X-Ray: QML 9-zone segmentation highlights 3.2cm cavitary lesion in right upper apical zone.

ASSESSMENT:
Active Pulmonary Tuberculosis (T5 Stage) - early clinical stabilization noted under QML risk monitoring.

PLAN:
1. Continue intensive phase HRZE quad-therapy.
2. Repeat sputum smear & QML biomarker telemetry in 14 days.
3. Patient isolation protocol maintained.`,
      timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      icd10: 'A15.0'
    },
    {
      id: 'note-2',
      author: 'Dr. James Wilson',
      role: 'Attending Radiologist',
      category: 'Radiological Consultation',
      tags: ['X-Ray Segmentation', 'Cavitation Index'],
      content: `RADIOLOGY FINDINGS:
DenseNet & QML Variational Quantum Classifier (VQC) multi-scale scan evaluation.
High opacity density localized to Zone 1 (Right Apex). Quantum Kernel Hilbert space mapping reveals 89.4% probability of active cavitary mycobacterial infection vs 76.1% classical ConvNet baseline.`,
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      icd10: 'A15.0'
    }
  ];

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isComposing, setIsComposing] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('Progress Note');
  const [tagsInput, setTagsInput] = useState('Cavitary TB, Follow-up 14d');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAutofill = () => {
    const vitalsStr = currentPatient?.vitals 
      ? `HR ${currentPatient.vitals.heartRate} bpm, SpO2 ${currentPatient.vitals.spo2}%, Temp ${currentPatient.vitals.temperature}°C, RR ${currentPatient.vitals.respRate}`
      : `HR 85 bpm, SpO2 98.0%, Temp 37.3°C, RR 15`;
      
    const template = `SUBJECTIVE:
Patient reports mild productive cough without hemoptysis. Denies fever spike today.

OBJECTIVE:
Vitals: ${vitalsStr}
QML Risk Score: 92.4% (Quantum Variational Circuit)

ASSESSMENT:
${currentPatient?.primaryDiagnosis || 'Pulmonary Tuberculosis'} - Responding to treatment.

PLAN:
1. Continue anti-TB quad-therapy (HRZE)
2. Monitor live biomarker stream (CRP/ESR)
3. Follow up in 7 days`;

    setNoteContent(template);
  };

  const handleSave = () => {
    if (!noteContent.trim()) return;

    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const newNote: Note = {
      id: `note-${Date.now()}`,
      author: user?.name || 'Dr. Sarah Chen',
      role: user?.role || 'Pulmonology Chief',
      category: noteCategory,
      content: noteContent,
      tags: parsedTags,
      timestamp: new Date().toISOString(),
      icd10: 'A15.0'
    };

    setNotes([newNote, ...notes]);
    setIsComposing(false);
    setNoteContent('');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 font-sans animate-fade-in">
      <PatientNavTabs currentTab="notes" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2d9] pb-6">
        <div>
          <h1 className="text-3xl font-serif text-[#111111]">Clinical Consultation & Peer Notes</h1>
          <p className="text-sm text-[#6b6b6b] mt-1">Physician Documentation & Multidisciplinary Case Notes</p>
        </div>
        
        {!isComposing && (
          <button 
            onClick={() => setIsComposing(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#111111] bg-[#111111] text-white hover:bg-black transition-all font-medium text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Compose Physician Note
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="bg-[#5a8a6e]/10 border border-[#5a8a6e]/30 text-[#2c523d] px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#5a8a6e]" />
          Physician Clinical Note signed and saved to hospital electronic health record (EHR).
        </div>
      )}

      {/* Composition Modal Box */}
      {isComposing && (
        <div className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-md mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#f4f2eb]">
            <div className="flex items-center gap-3">
              <select 
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="bg-[#f4f2eb] border border-[#d4d0ca] text-[#111111] text-xs font-semibold rounded-lg focus:outline-none focus:border-[#111111] p-2.5"
              >
                <option value="Progress Note">Progress Note</option>
                <option value="Pulmonology Consult">Pulmonology Consult</option>
                <option value="Radiological Consultation">Radiological Consultation</option>
                <option value="TB Multidisciplinary Review">TB Multidisciplinary Review</option>
              </select>
            </div>
            
            <button 
              onClick={handleAutofill}
              className="text-xs font-medium text-[#4a7c6f] hover:text-[#111] transition-colors underline underline-offset-2"
            >
              Auto-fill SOAP Medical Template
            </button>
          </div>

          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Document clinical observations, QML radiological findings, treatment adjustments..."
            className="w-full h-56 p-4 text-[#111111] bg-[#faf9f7] border border-[#d4d0ca] rounded-xl focus:outline-none focus:border-[#111111] font-sans text-sm leading-relaxed"
          />

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#6b6b6b] uppercase mb-1">Diagnostic Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-[#faf9f7] border border-[#d4d0ca] rounded-lg text-xs text-[#111]"
                placeholder="e.g. Cavitary TB, Stage T5"
              />
            </div>

            <div className="flex items-end justify-end gap-3">
              <button 
                onClick={() => { setIsComposing(false); setNoteContent(''); }}
                className="px-5 py-2 text-xs font-medium text-[#6b6b6b] hover:text-[#111111]"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!noteContent.trim()}
                className="px-6 py-2.5 rounded-full bg-[#111111] text-white hover:bg-black transition-all text-xs font-medium disabled:opacity-50"
              >
                Electronically Sign & Publish Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feed of Clinical Notes */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white border border-[#d4d0ca] rounded-2xl p-6 shadow-sm hover:border-[#111111]/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#f4f2eb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-base">
                  {note.author.split(' ')[1]?.[0] || 'D'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-[#111111]">{note.author}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5a8a6e]" />
                  </div>
                  <p className="text-xs text-[#6b6b6b]">{note.role}</p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                <span className="px-3 py-1 rounded-full bg-[#f4f2eb] border border-[#e5e2d9] text-xs font-mono text-[#111111]">
                  {note.category}
                </span>
                <span className="text-[11px] text-[#9a9590]">{formatDate(note.timestamp)}</span>
              </div>
            </div>

            <div className="text-sm text-[#2a2a2a] leading-relaxed whitespace-pre-wrap font-sans mb-4">
              {note.content}
            </div>

            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#e8f0ed] text-[#4a7c6f] text-[11px] font-mono border border-[#4a7c6f]/20">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-[#f4f2eb] flex items-center justify-between text-xs text-[#9a9590]">
              <span className="font-mono">ICD-10 Code: {note.icd10 || 'A15.0'}</span>
              <span className="italic">Signed & Encrypted via Node #IN-DELHI-04</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
