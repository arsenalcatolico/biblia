
import type { SVGProps } from 'react';

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        {...props}
    >
        <defs>
            <linearGradient id="cross-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
            </linearGradient>
            <filter id="cross-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="hsl(var(--primary))" floodOpacity="0.2" />
            </filter>
        </defs>

        {/* Cross Shape */}
        <g style={{ filter: 'url(#cross-shadow)' }}>
            <rect 
                x="35" 
                y="15" 
                width="30" 
                height="70" 
                rx="5" 
                ry="5" 
                fill="url(#cross-gradient)" 
            />
            <rect 
                x="15" 
                y="35" 
                width="70" 
                height="30" 
                rx="5" 
                ry="5" 
                fill="url(#cross-gradient)" 
            />
        </g>
    </svg>
);

AppLogo.displayName = 'AppLogo';
