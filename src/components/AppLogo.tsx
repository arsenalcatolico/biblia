
import type { SVGProps } from 'react';

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <defs>
      <linearGradient id="logo-bg-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.7 }} />
      </linearGradient>
       <radialGradient id="gold-sphere-gradient" cx="0.3" cy="0.3" r="0.7">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.6 }} />
      </radialGradient>
      <filter id="logo-shadow-subtle" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="hsl(var(--primary))" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g style={{ filter: 'url(#logo-shadow-subtle)' }}>
      {/* Background Rounded Square */}
      <rect 
        x="15" 
        y="15" 
        width="70" 
        height="70" 
        rx="12" 
        ry="12" 
        fill="hsl(var(--primary))"
      />
      {/* Sheen effect */}
      <path d="M 15 15 H 55 L 15 55 V 15 Z" fill="white" opacity="0.1" />

      {/* Book Icon */}
      <g stroke="hsl(var(--accent))" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Book Outline */}
        <path d="M 30 70 C 30 65, 45 62, 50 62 C 55 62, 70 65, 70 70" />
        <path d="M 30 30 V 70" />
        <path d="M 70 30 V 70" />
        <path d="M 30 30 C 35 35, 45 38, 50 38 C 55 38, 65 35, 70 30" />
        
        {/* Cross */}
        <path d="M 46 45 H 54" />
        <path d="M 50 41 V 49" />
      </g>
    </g>

    {/* Decorative Elements */}
    <circle cx="80" cy="22" r="8" fill="url(#gold-sphere-gradient)" />
    <circle cx="20" cy="30" r="2" fill="hsl(var(--accent))" opacity="0.8" />
    <circle cx="85" cy="55" r="2.5" fill="hsl(var(--accent))" opacity="0.8" />
    <circle cx="22" cy="78" r="1.5" fill="hsl(var(--accent))" opacity="0.6" />
    <circle cx="82" cy="80" r="1" fill="hsl(var(--primary))" opacity="0.7" />

  </svg>
);

AppLogo.displayName = 'AppLogo';
