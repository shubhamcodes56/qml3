import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { validateLogin, type Doctor } from '@/data/doctors';

interface AuthContextType {
  user: Doctor | null;
  isAuthenticated: boolean;
  login: (id: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Doctor | null>(() => {
    const saved = sessionStorage.getItem('q-sentinel-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((id: string, password: string): boolean => {
    const doctor = validateLogin(id, password);
    if (doctor) {
      setUser(doctor);
      sessionStorage.setItem('q-sentinel-user', JSON.stringify(doctor));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('q-sentinel-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
