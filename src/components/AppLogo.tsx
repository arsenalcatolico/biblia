
import type { SVGProps } from 'react';

export const AppLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        {...props}
    >
        <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
            </linearGradient>
        </defs>
        
        {/* Book Shape */}
        <path 
            d="M50 15 C 20 15, 10 30, 10 50 C 10 70, 20 85, 50 85 C 80 85, 90 70, 90 50 C 90 30, 80 15, 50 15 Z" 
            fill="hsl(var(--primary))" 
        />
        <path 
            d="M50 20 C 25 20, 15 35, 15 50 C 15 65, 25 80, 50 80 L 50 20 Z" 
            fill="hsl(var(--background))" 
        />
        <path 
            d="M50 20 C 75 20, 85 35, 85 50 C 85 65, 75 80, 50 80 L 50 20 Z" 
            fill="hsl(var(--background))" 
        />
        <path 
            d="M50,18 L50,82" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2"
            strokeLinecap="round"
        />

        {/* Flame Shape */}
        <path
            d="M50 35 
               C 55 40, 55 50, 50 55
               C 45 50, 45 40, 50 35 Z
               M50 40
               C 53 45, 53 50, 50 53
               C 47 50, 47 45, 50 40 Z
               M50 60
               Q 58 50, 50 30
               Q 42 50, 50 60 Z"
            fill="url(#gold-gradient)"
        />
    </svg>
);

AppLogo.displayName = 'AppLogo';
