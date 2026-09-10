import React, { useEffect, useState } from 'react';

interface DoctorCharacterProps {
  isZoomed?: boolean;
  isNearButton?: boolean;
  children?: React.ReactNode;
}

export default function DoctorCharacter({ isZoomed = false, isNearButton = false, children }: DoctorCharacterProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate subtle rotation and translation for realistic eye & head movement
  const deltaX = windowCenter.x !== 0 ? (mousePos.x - windowCenter.x) / windowCenter.x : 0;
  const deltaY = windowCenter.y !== 0 ? (mousePos.y - windowCenter.y) / windowCenter.y : 0;

  // CRT Robot Head tilt & translation (suppressed when zoomed in)
  const headRotation = isZoomed ? 0 : deltaX * 10;
  const headShiftX = isZoomed ? 0 : deltaX * 14;
  const headShiftY = isZoomed ? 0 : deltaY * 10;

  // Eyes tracking (when not zoomed)
  const eyeX = deltaX * 12;
  const eyeY = deltaY * 8;

  // Body Subtle Lean
  const bodyLean = isZoomed ? 0 : deltaX * 2.5;

  return (
    <div className="relative flex items-center justify-center h-full w-full select-none transition-all duration-700 ease-out">
      <div 
        className={cn(
          "relative transition-all duration-700 ease-out flex items-center justify-center",
          isZoomed ? "scale-[2.4] sm:scale-[2.6] translate-y-36 sm:translate-y-44" : "w-[480px] h-[560px] scale-100"
        )}
      >
        
        {/* Soft Background Radial Glow */}
        <div className={cn(
          "absolute rounded-full blur-3xl -z-10 transition-all duration-700",
          isZoomed ? "w-[550px] h-[550px] bg-pink-950/40 opacity-90" : "w-[340px] h-[340px] bg-neutral-200/50"
        )} />

        {/* FLOATING REACTIVE SYMBOL (? or !) AROUND THE ROBOT */}
        {!isZoomed && (
          <div 
            className={cn(
              "absolute -top-4 right-12 z-20 w-12 h-12 rounded-full font-bold font-mono text-xl flex items-center justify-center transition-all duration-300 shadow-lg border animate-bounce",
              isNearButton 
                ? "bg-[#f48b8b] text-white border-white scale-125 shadow-[0_0_20px_rgba(244,139,139,0.8)]" 
                : "bg-white text-[#111111] border-[#d4d0ca] opacity-80"
            )}
          >
            {isNearButton ? '!' : '?'}
          </div>
        )}

        <svg 
          width="480" 
          height="580" 
          viewBox="0 0 480 580" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="max-h-full drop-shadow-2xl transition-transform duration-700"
          style={{ transform: `rotate(${bodyLean}deg)` }}
        >
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a4d52" />
              <stop offset="100%" stopColor="#1e2023" />
            </linearGradient>

            <linearGradient id="crtBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eae8e1" />
              <stop offset="60%" stopColor="#d5d1c8" />
              <stop offset="100%" stopColor="#b8b3a7" />
            </linearGradient>

            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#181a1c" />
              <stop offset="100%" stopColor="#0b0c0d" />
            </linearGradient>

            <linearGradient id="pinkCrtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#200d14" />
              <stop offset="100%" stopColor="#0e0508" />
            </linearGradient>

            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#ffd4d4" />
              <stop offset="100%" stopColor="#f48b8b" />
            </radialGradient>

            <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* DOCTOR BODY (Suit & Stethoscope) */}
          <g filter="url(#shadowBlur)" className={cn("transition-opacity duration-500", isZoomed ? "opacity-20" : "opacity-100")}>
            <path d="M 110 320 C 110 260, 370 260, 370 320 L 430 580 L 50 580 Z" fill="url(#suitGrad)" />
            <path d="M 180 300 L 240 430 L 140 580" fill="#2a2c30" />
            <path d="M 300 300 L 240 430 L 340 580" fill="#32353a" />
            <path d="M 205 285 L 240 370 L 275 285 Z" fill="#ffffff" />
            <path d="M 233 300 L 247 300 L 250 400 L 240 415 L 230 400 Z" fill="#1b2530" />

            {/* Doctor ID Badge */}
            <rect x="135" y="380" width="45" height="65" rx="6" fill="#ffffff" stroke="#c2bebd" strokeWidth="2" />
            <rect x="142" y="390" width="31" height="24" rx="2" fill="#4a7c6f" />
            <line x1="142" y1="422" x2="173" y2="422" stroke="#6b6b6b" strokeWidth="2" />
            <line x1="142" y1="430" x2="165" y2="430" stroke="#9a9590" strokeWidth="2" />

            {/* Stethoscope */}
            <path d="M 190 280 C 180 370, 300 370, 290 280" fill="none" stroke="#111111" strokeWidth="7" strokeLinecap="round" />
            <path d="M 290 280 L 290 420 C 290 445, 270 460, 250 460 C 235 460, 225 448, 225 430 L 225 410" fill="none" stroke="#111111" strokeWidth="6" strokeLinecap="round" />
            <circle cx="225" cy="405" r="14" fill="#d1cdc4" stroke="#111111" strokeWidth="3" />
            <circle cx="225" cy="405" r="8" fill="#4a7c6f" />
          </g>

          {/* RETRO CRT ROBOT HEAD */}
          <g 
            style={{ 
              transform: `translate(${headShiftX}px, ${headShiftY}px) rotate(${headRotation}deg)`, 
              transformOrigin: '240px 160px',
              transition: 'transform 0.1s ease-out'
            }}
            filter="url(#shadowBlur)"
          >
            {/* Neck Joint */}
            <rect x="215" y="240" width="50" height="45" rx="6" fill="#9a9590" stroke="#4a4d52" strokeWidth="3" />

            {/* Outer CRT Casing */}
            <rect x="120" y="60" width="240" height="200" rx="36" fill="url(#crtBodyGrad)" stroke="#8e897e" strokeWidth="4" />
            
            {/* CRT Bezel Inner Inset */}
            <rect x="138" y="76" width="204" height="168" rx="24" fill="#bfbaa9" stroke="#757166" strokeWidth="2" />

            {/* CRT Screen Display Surface (Pink tinted when zoomed) */}
            <rect 
              x="150" y="86" width="180" height="148" rx="18" 
              fill={isZoomed ? "url(#pinkCrtGrad)" : "url(#screenGrad)"} 
              stroke={isZoomed ? "#f48b8b" : "#111111"} 
              strokeWidth="3" 
            />

            {/* Screen Glass Reflection */}
            {!isZoomed && (
              <path d="M 155 92 Q 240 92 320 120 L 320 100 Q 240 92 155 92 Z" fill="#ffffff" opacity="0.12" />
            )}

            {/* Q-Sentinel Retro Badge */}
            <rect x="200" y="228" width="80" height="12" rx="3" fill="#a39e91" />
            <text x="240" y="237" textAnchor="middle" fill="#2b2a27" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
              Q-SENTINEL
            </text>

            {/* Floppy Drive Slot */}
            <rect x="145" y="228" width="40" height="4" fill="#383633" rx="1" />
            <circle cx="320" cy="230" r="3" fill={isZoomed ? "#f48b8b" : "#5a8a6e"} />

            {/* EYES (when not zoomed) */}
            {!isZoomed && (
              <g>
                <g style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}>
                  <ellipse cx="195" cy="150" rx="26" ry="32" fill="url(#eyeGlow)" />
                  <ellipse cx="188" cy="142" rx="8" ry="10" fill="#ffffff" opacity="0.9" />
                </g>
                <g style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}>
                  <ellipse cx="285" cy="150" rx="26" ry="32" fill="url(#eyeGlow)" />
                  <ellipse cx="278" cy="142" rx="8" ry="10" fill="#ffffff" opacity="0.9" />
                </g>
              </g>
            )}
          </g>
        </svg>

        {/* EMBEDDED CRT TERMINAL SCREEN FOR LOGIN FORM (Pink CRT Theme) */}
        {isZoomed && children && (
          <div className="absolute top-[88px] left-[152px] w-[176px] h-[144px] z-30 flex items-center justify-center p-1.5 overflow-hidden animate-fade-in pointer-events-auto">
            <div className="w-full h-full bg-[#1b0a12] rounded-lg text-[#ffb3b3] font-mono flex flex-col justify-between p-2 text-[8px] leading-tight border border-[#f48b8b]/60 shadow-[0_0_15px_rgba(244,139,139,0.3)]">
              {children}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
