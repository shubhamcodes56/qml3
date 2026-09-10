import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Patient, PATIENTS_LIST } from '@/data/patients';

interface PatientContextType {
  selectedPatient: Patient | null;
  selectPatient: (id: string) => void;
  clearPatient: () => void;
}

const PatientContext = createContext<PatientContextType | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const selectPatient = useCallback((id: string) => {
    const patient = PATIENTS_LIST.find(p => p.id === id) || null;
    setSelectedPatient(patient);
  }, []);

  const clearPatient = useCallback(() => {
    setSelectedPatient(null);
  }, []);

  return (
    <PatientContext.Provider value={{ selectedPatient, selectPatient, clearPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient(): PatientContextType {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used within PatientProvider');
  return ctx;
}
