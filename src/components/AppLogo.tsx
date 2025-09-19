
import type { SVGProps } from 'react';

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        {...props}
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
            </linearGradient>
            <filter id="logo-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="hsl(var(--primary))" floodOpacity="0.15" />
            </filter>
        </defs>

        <g style={{ filter: 'url(#logo-shadow)' }}>
            {/* Book Cover */}
            <rect 
                x="15" 
                y="10" 
                width="70" 
                height="80" 
                rx="8" 
                ry="8" 
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
            />
            
            {/* Spine */}
            <rect 
                x="18" 
                y="10" 
                width="10" 
                height="80"
                rx="2"
                ry="2" 
                fill="hsl(var(--secondary))"
            />

            {/* Cross */}
            <rect 
                x="48" 
                y="35" 
                width="24" 
                height="8" 
                rx="2" 
                ry="2" 
                fill="url(#logo-gradient)" 
            />
            <rect 
                x="56" 
                y="27" 
                width="8" 
                height="24" 
                rx="2" 
                ry="2" 
                fill="url(#logo-gradient)" 
            />
        </g>
    </svg>
);

AppLogo.displayName = 'AppLogo';
