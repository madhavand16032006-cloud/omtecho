import React from 'react';

interface OmtechoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  monochrome?: boolean;
  onClick?: () => void;
}

export const OmtechoLogo: React.FC<OmtechoLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  onClick
}) => {
  const iconDimensions = {
    sm: { width: 34, height: 24, fontSize: 'text-lg', subSize: 'text-[9px]' },
    md: { width: 44, height: 30, fontSize: 'text-xl', subSize: 'text-[10px]' },
    lg: { width: 56, height: 38, fontSize: 'text-2xl', subSize: 'text-xs' },
    xl: { width: 72, height: 48, fontSize: 'text-3xl', subSize: 'text-sm' }
  }[size];

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official Omtecho Emblem: Interlocking Yellow & Green rings with rising Red Arrow */}
      <svg 
        viewBox="0 0 100 70" 
        width={iconDimensions.width} 
        height={iconDimensions.height} 
        className="shrink-0 overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Omtecho Official Logo"
      >
        {/* Left Yellow Ring */}
        <circle 
          cx="28" 
          cy="42" 
          r="20" 
          stroke="#F4B400" 
          strokeWidth="7" 
          fill="none" 
        />

        {/* Right Green Ring */}
        <circle 
          cx="58" 
          cy="42" 
          r="20" 
          stroke="#0F9D58" 
          strokeWidth="7" 
          fill="none" 
        />

        {/* Diagonal Rising Red Arrow passing through intersection */}
        <g>
          {/* Arrow shaft */}
          <line 
            x1="32" 
            y1="56" 
            x2="70" 
            y2="18" 
            stroke="#EA4335" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          {/* Arrow head */}
          <polygon 
            points="58,14 78,14 78,34" 
            fill="#EA4335" 
          />
        </g>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight font-sans text-[#3B82F6] dark:text-[#60A5FA] ${iconDimensions.fontSize}`}>
            omtecho
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase font-sans mt-0.5 ${iconDimensions.subSize}`}>
            Service & Product Studio
          </span>
        )}
      </div>
    </div>
  );
};
