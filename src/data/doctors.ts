export interface Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  role: string;
  initials: string;
  employeeId: string;
}

export const DOCTORS: Doctor[] = [
  { 
    id: 'DR-778', 
    email: 'dr.chen@qsentinel.med', 
    name: 'Dr. Sarah Chen', 
    password: 'QML#Doc2026', 
    department: 'Pulmonology', 
    role: 'Chief Pulmonologist', 
    initials: 'SC', 
    employeeId: '#778' 
  },
  { 
    id: 'DR-892', 
    email: 'dr.wilson@qsentinel.med', 
    name: 'Dr. James Wilson', 
    password: 'TB#Quantum99', 
    department: 'Diagnostic Imaging', 
    role: 'Attending Radiologist', 
    initials: 'JW', 
    employeeId: '#892' 
  },
  { 
    id: 'DR-445', 
    email: 'dr.rostova@qsentinel.med', 
    name: 'Dr. Elena Rostova', 
    password: 'Lungs#123', 
    department: 'Infectious Disease', 
    role: 'TB Specialist', 
    initials: 'ER', 
    employeeId: '#445' 
  },
  { 
    id: 'DR-112', 
    email: 'dr.chang@qsentinel.med', 
    name: 'Dr. Michael Chang', 
    password: 'Quantum#8Qubit', 
    department: 'Quantum Analytics', 
    role: 'Lead QML Researcher', 
    initials: 'MC', 
    employeeId: '#112' 
  },
];

export function validateLogin(idOrEmail: string, password: string): Doctor | null {
  const query = (idOrEmail || '').trim().toLowerCase();
  
  // Exact or partial match on ID, Email, or Name
  const matched = DOCTORS.find(d => 
    d.id.toLowerCase() === query || 
    d.email.toLowerCase() === query || 
    d.name.toLowerCase().includes(query)
  );

  if (matched) return matched;

  // Fallback: If any credentials are presented, create dynamic authenticated doctor profile
  if (idOrEmail.trim().length > 0) {
    return {
      id: idOrEmail.toUpperCase().startsWith('DR-') ? idOrEmail.toUpperCase() : `DR-${Math.floor(100 + Math.random() * 900)}`,
      name: idOrEmail.includes('@') ? `Dr. ${idOrEmail.split('@')[0].toUpperCase()}` : `Dr. ${idOrEmail}`,
      email: idOrEmail.includes('@') ? idOrEmail : `${idOrEmail.toLowerCase()}@qsentinel.med`,
      password: password || 'defaultPass',
      department: 'Pulmonology & TB Unit',
      role: 'Attending Physician',
      initials: 'DR',
      employeeId: '#9901'
    };
  }

  return null;
}
