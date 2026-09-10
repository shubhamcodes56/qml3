import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function RiskGauge({ value, size = 'md', label }: RiskGaugeProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progressRatio, 4);
      
      setProgress(easeProgress * value);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const getColor = (val: number) => {
    if (val < 30) return '#5a8a6e'; // Sage green (Success)
    if (val < 60) return '#c49332'; // Warm amber (Warning)
    return '#c2484a'; // Burgundy (Danger)
  };

  const dimensions = {
    sm: { size: 64, strokeWidth: 4, textClass: 'text-xl', labelClass: 'text-[10px]' },
    md: { size: 120, strokeWidth: 6, textClass: 'text-4xl', labelClass: 'text-sm' },
    lg: { size: 180, strokeWidth: 8, textClass: 'text-6xl', labelClass: 'text-base' },
  };

  const { size: svgSize, strokeWidth, textClass, labelClass } = dimensions[size];
  
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const color = getColor(value);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: svgSize, height: svgSize }}>
        <svg
          className="transform -rotate-90 w-full h-full"
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="#eae7e1"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-linear"
          />
        </svg>
        <div className="absolute flex items-center justify-center">
          <span 
            className={`font-mono font-bold ${textClass}`}
            style={{ color: '#1a1a1a' }}
          >
            {Math.round(progress)}
          </span>
        </div>
      </div>
      {label && (
        <span className={`mt-2 font-sans text-[#9a9590] ${labelClass}`}>
          {label}
        </span>
      )}
    </div>
  );
}
