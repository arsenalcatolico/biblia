
import type { SVGProps } from 'react';

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <defs>
      <filter id="logo-shadow-subtle" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="hsl(var(--primary))" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g style={{ filter: 'url(#logo-shadow-subtle)' }}>
      {/* Book Cover */}
      <rect 
        x="25" 
        y="20" 
        width="50" 
        height="60" 
        rx="5" 
        ry="5" 
        fill="hsl(var(--primary))"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
      />
      
      {/* Page Lines Hint */}
      <path d="M 72 25 L 72 75 M 70 25 L 70 75 M 68 25 L 68 75" stroke="hsl(var(--primary-foreground))" strokeWidth="0.5" opacity="0.3" />
      
      {/* Latin Cross on the cover */}
      <g fill="hsl(var(--accent))">
        {/* Vertical bar */}
        <rect x="47" y="35" width="6" height="30" rx="1.5" />
        {/* Horizontal bar */}
        <rect x="42" y="42" width="16" height="5" rx="1.5" />
      </g>
      
      {/* Bookmark Ribbon */}
      <path d="M 60 20 L 60 35 L 55 30 L 50 35 L 50 20 Z" fill="hsl(var(--accent))" />

    </g>
  </svg>
);

AppLogo.displayName = 'AppLogo';
