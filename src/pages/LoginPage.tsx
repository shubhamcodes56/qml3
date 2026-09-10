import { useState, useRef, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, Lock, Loader2, Copy, Check, Menu, X, Terminal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DoctorCharacter from '@/components/DoctorCharacter';
import ParticleBackground from '@/components/ParticleBackground';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isNearButton, setIsNearButton] = useState(false);
  const [physicianId, setPhysicianId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typewriter animation for headline
  const { displayed: typewriterText, done: typewriterDone } = useTypewriter('Ready to review patients?', 55, 600);

  const mainBtnRef = useRef<HTMLButtonElement>(null);

  // Mouse distance tracking for floating ? / ! indicator on robot
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mainBtnRef.current) return;
      const rect = mainBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      setIsNearButton(distance < 180);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("quantum@sentinel.med");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Nav link direct navigation without auto-login
  const handleNavLink = (targetRoute: string) => {
    navigate(targetRoute);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!physicianId || !password) {
      setError('Enter credentials');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(async () => {
      await login(physicianId, password);
      navigate('/dashboard');
    }, 750);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f2eb] flex flex-col relative overflow-hidden text-[#111111] font-sans">
      <ParticleBackground />

      {/* TOP NAVBAR (PROMINENT HIGH-VISIBILITY BRANDING) */}
      <nav className="w-full px-6 sm:px-12 py-5 flex justify-between items-center z-20 relative border-b border-[#e5e2d9]/80 bg-[#f4f2eb]/90 backdrop-blur-md shadow-xs">
        
        {/* PROMINENT LOGO BRANDING */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsZoomedIn(false)}>
          <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center font-serif text-2xl shadow-md">
            ⚕
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
                Q-Sentinel
              </span>
              <span className="text-xs font-mono font-bold bg-[#111111] text-white px-2 py-0.5 rounded ml-1">
                QML
              </span>
              <span className="text-2xl text-[#111111] select-none">✳︎</span>
            </div>
            <p className="text-[11px] font-mono text-[#6b6b6b] tracking-wider uppercase hidden sm:block">
              Quantum Tuberculosis Diagnostic Intelligence Platform
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links - Each links to its own dedicated page */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#222222]">
          <button onClick={() => handleNavLink('/qml-engine')} className="hover:text-[#4a7c6f] transition-colors cursor-pointer">
            QML Engine
          </button>
          <span className="text-[#9a9590]">,</span>
          <button onClick={() => handleNavLink('/qml-circuit')} className="hover:text-[#4a7c6f] transition-colors cursor-pointer">
            8-Qubit Circuit
          </button>
          <span className="text-[#9a9590]">,</span>
          <button onClick={() => handleNavLink('/tb-benchmarks')} className="hover:text-[#4a7c6f] transition-colors cursor-pointer">
            TB Benchmarks
          </button>
          <span className="text-[#9a9590]">,</span>
          <button onClick={() => handleNavLink('/qml-eda')} className="text-[#c2484a] hover:text-[#9a2a2c] transition-colors cursor-pointer">
            QML vs ML EDA
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#f4f2eb] p-8 flex flex-col justify-center gap-6 lg:hidden animate-fade-in">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2 text-[#111]">
            <X size={28} />
          </button>
          <div className="text-3xl font-serif font-bold text-[#111]">Q-Sentinel Medical AI</div>
          <button onClick={() => { setMobileMenuOpen(false); handleNavLink('/qml-engine'); }} className="text-left text-xl font-medium text-[#111]">
            QML Engine Overview →
          </button>
          <button onClick={() => { setMobileMenuOpen(false); handleNavLink('/qml-circuit'); }} className="text-left text-xl font-medium text-[#111]">
            8-Qubit Quantum Circuit →
          </button>
          <button onClick={() => { setMobileMenuOpen(false); handleNavLink('/tb-benchmarks'); }} className="text-left text-xl font-medium text-[#111]">
            TB Stage Benchmarks →
          </button>
          <button onClick={() => { setMobileMenuOpen(false); handleNavLink('/qml-eda'); }} className="text-left text-xl font-medium text-[#c2484a]">
            QML vs ML EDA (Charts) →
          </button>
        </div>
      )}

      {/* MAIN HERO & ZOOMING ROBOT CONTAINER */}
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-16 lg:px-24 z-10 py-6 max-w-7xl mx-auto">
        
        {/* LEFT HERO TEXT */}
        <div className={cn(
          "w-full md:w-[50%] flex flex-col justify-center max-w-xl z-10 py-4 transition-all duration-700",
          isZoomedIn ? "opacity-30 pointer-events-none scale-95" : "opacity-100 scale-100"
        )}>

          {/* Headline Copy: "Ready to review patients?" with TYPEWRITER ANIMATION */}
          <div className="mb-10">
            <h1 className="text-[36px] sm:text-[44px] leading-tight font-serif text-[#111111] font-bold">
              {typewriterText}
              {!typewriterDone && (
                <span className="inline-block w-[3px] h-[1em] bg-[#111111] ml-1 animate-pulse align-middle" />
              )}
            </h1>
          </div>

          {/* Enlarged Main Action Button */}
          <div className="mb-8">
            <button
              ref={mainBtnRef}
              onClick={() => setIsZoomedIn(true)}
              onMouseEnter={() => setIsNearButton(true)}
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#111111] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl group cursor-pointer border border-[#333]"
            >
              Access Clinical Workspace
              <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform text-[#f48b8b]" />
            </button>
          </div>

          {/* Email Contact Pill */}
          <div>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-transparent text-[#111111] border border-[#111111]/40 rounded-full text-[13px] sm:text-[14px] px-5 py-2 hover:bg-white transition-all cursor-pointer"
            >
              <span>Reach us: <span className="underline underline-offset-2">quantum@sentinel.med</span></span>
              {copied ? <Check size={14} className="text-[#5a8a6e]" /> : <Copy size={14} className="opacity-70" />}
            </button>
          </div>

        </div>

        {/* RIGHT HERO CONTAINER: CRT ROBOT WITH INTERACTIVE FACE ZOOM & PINK TERMINAL LOGIN */}
        <div className="w-full md:w-[50%] h-[480px] sm:h-[550px] relative z-10 flex items-center justify-center mt-6 md:mt-0">
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Return button if zoomed in — positioned ABOVE the CRT container to avoid overlay */}
            {isZoomedIn && (
              <button 
                onClick={() => setIsZoomedIn(false)}
                className="absolute -top-2 left-0 z-40 bg-[#111111] text-white text-xs font-mono px-4 py-2 rounded-full border border-white/20 hover:bg-black transition-colors shadow-lg cursor-pointer"
              >
                ← Return to Overview
              </button>
            )}

            {/* Robot character with zoom capability & cursor distance reactivity */}
            <DoctorCharacter isZoomed={isZoomedIn} isNearButton={isNearButton}>
              
              {/* EMBEDDED PINK CRT TERMINAL LOGIN FORM */}
              <div className="w-full h-full flex flex-col justify-between p-1.5 text-[#ffb3b3] font-mono text-[7px] leading-tight">
                
                {/* CRT Terminal Header */}
                <div className="flex items-center justify-between border-b border-[#f48b8b]/40 pb-1">
                  <span className="text-[#f48b8b] font-bold flex items-center gap-1 text-[7px]">
                    <Terminal size={9} /> CRT PINK TERMINAL
                  </span>
                  <button 
                    onClick={() => setIsZoomedIn(false)}
                    className="text-[#9a9590] hover:text-white text-[8px] font-sans px-1"
                  >
                    ✕
                  </button>
                </div>

                {loading ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
                    <Loader2 size={16} className="animate-spin text-[#f48b8b]" />
                    <span className="text-[#f48b8b] font-bold text-[8px]">AUTHENTICATING...</span>
                    <span className="text-[6px] text-[#ffb3b3]">ESTABLISHING 8-QUBIT VQC SESSION</span>
                  </div>
                ) : (
                  <form onSubmit={handleLoginSubmit} className="flex-1 flex flex-col justify-center space-y-2 py-1">
                    <div>
                      <span className="text-[#ffb3b3] block text-[6px] uppercase tracking-wider mb-0.5">PHYSICIAN ID / EMAIL:</span>
                      <input 
                        type="text"
                        value={physicianId}
                        onChange={(e) => setPhysicianId(e.target.value)}
                        className="w-full bg-[#0d0408] border border-[#f48b8b]/40 text-white px-1.5 py-1 text-[7px] font-mono rounded focus:outline-none focus:border-[#f48b8b]"
                        placeholder="e.g. DR-778"
                      />
                    </div>

                    <div>
                      <span className="text-[#ffb3b3] block text-[6px] uppercase tracking-wider mb-0.5">PASSWORD:</span>
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#0d0408] border border-[#f48b8b]/40 text-white px-1.5 py-1 text-[7px] font-mono rounded focus:outline-none focus:border-[#f48b8b]"
                        placeholder="••••••••"
                      />
                    </div>

                    {error && (
                      <div className="text-[6px] text-[#ff6b6b]">{error}</div>
                    )}

                    <button 
                      type="submit"
                      className="w-full py-1.5 bg-[#f48b8b] hover:bg-[#ff9e9e] text-[#111111] font-bold text-[7px] rounded transition-colors uppercase tracking-wider mt-1 cursor-pointer shadow-[0_0_10px_rgba(244,139,139,0.5)]"
                    >
                      ENTER CLINICAL WORKSPACE →
                    </button>
                  </form>
                )}

                {/* CRT Footer */}
                <div className="text-[6px] text-[#9a9590] border-t border-[#f48b8b]/30 pt-0.5 flex justify-between">
                  <span>SYSTEM: READY</span>
                  <span>TLS 1.3</span>
                </div>

              </div>
            </DoctorCharacter>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-12 py-4 border-t border-[#e5e2d9]/80 text-xs text-[#6b6b6b] flex flex-col sm:flex-row justify-between items-center gap-2 z-10">
        <div>Q-Sentinel Medical Platform · Quantum Machine Learning for Early Tuberculosis Prevention</div>
        <div>Designed for Pulmonologists, Radiologists & Infectious Disease Teams</div>
      </footer>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
