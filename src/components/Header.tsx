import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-white border-b border-[#eae7e1] px-6 flex items-center justify-between font-sans">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span className="text-[#1a1a1a] font-serif text-xl tracking-wide">Q-Sentinel</span>
          <span className="text-[#9a9590] text-sm">⚕</span>
        </div>
        <span className="text-[#9a9590] text-[10px] uppercase tracking-wider">Quantum TB Diagnostics</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#eae7e1] flex items-center justify-center text-[#1a1a1a] font-medium text-sm">
            {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'DR'}
          </div>
          <div className="flex flex-col">
            <span className="text-[#1a1a1a] font-medium text-sm">{user?.name || 'Dr. Sarah Chen'}</span>
            <span className="text-[#9a9590] text-xs">{user?.department || 'Pulmonology'}</span>
          </div>
        </div>
        <div className="w-px h-6 bg-[#d4d0ca]" />
        <button
          onClick={logout}
          className="text-[#9a9590] hover:text-[#c2484a] text-sm font-medium transition-colors flex items-center gap-1"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
