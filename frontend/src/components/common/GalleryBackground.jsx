import React from 'react';

const GalleryBackground = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1920 1080" 
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    >
      <defs>
        {/* Enhanced gradient definitions */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#f8f9fa', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e9ecef', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="accentGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00D9FF', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#0088AA', stopOpacity: 0.4 }} />
        </linearGradient>
        
        <linearGradient id="accentGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#E63946', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#D62839', stopOpacity: 0.3 }} />
        </linearGradient>
        
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00D9FF', stopOpacity: 0.1 }} />
          <stop offset="50%" style={{ stopColor: '#E63946', stopOpacity: 0.15 }} />
          <stop offset="100%" style={{ stopColor: '#00D9FF', stopOpacity: 0.1 }} />
        </linearGradient>

        {/* Radial glows */}
        <radialGradient id="cyanGlow">
          <stop offset="0%" style={{ stopColor: '#00D9FF', stopOpacity: 0.3 }} />
          <stop offset="50%" style={{ stopColor: '#00D9FF', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#00D9FF', stopOpacity: 0 }} />
        </radialGradient>
        
        <radialGradient id="redGlow">
          <stop offset="0%" style={{ stopColor: '#E63946', stopOpacity: 0.25 }} />
          <stop offset="50%" style={{ stopColor: '#E63946', stopOpacity: 0.08 }} />
          <stop offset="100%" style={{ stopColor: '#E63946', stopOpacity: 0 }} />
        </radialGradient>

        {/* Advanced circuit pattern */}
        <pattern id="circuitPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
          <rect width="150" height="150" fill="none"/>
          
          {/* Main circuit lines */}
          <path d="M 0 40 L 45 40 L 45 80 L 90 80" stroke="#00D9FF" strokeWidth="1.5" fill="none" opacity="0.25"/>
          <path d="M 150 110 L 105 110 L 105 70 L 60 70" stroke="#E63946" strokeWidth="1.5" fill="none" opacity="0.2"/>
          <path d="M 75 0 L 75 35 L 120 35 L 120 100" stroke="#00A8CC" strokeWidth="1.2" fill="none" opacity="0.2"/>
          
          {/* Circuit nodes with glow */}
          <circle cx="45" cy="40" r="4" fill="#00D9FF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="45" cy="80" r="4" fill="#00D9FF" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="105" cy="110" r="4" fill="#E63946" opacity="0.45">
            <animate attributeName="opacity" values="0.45;0.75;0.45" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="105" cy="70" r="4" fill="#E63946" opacity="0.45">
            <animate attributeName="opacity" values="0.45;0.75;0.45" dur="2.8s" repeatCount="indefinite"/>
          </circle>
          
          {/* Microchips */}
          <rect x="40" y="35" width="10" height="10" rx="1" fill="none" stroke="#00D9FF" strokeWidth="1" opacity="0.3"/>
          <line x1="38" y1="38" x2="35" y2="38" stroke="#00D9FF" strokeWidth="0.8" opacity="0.3"/>
          <line x1="38" y1="42" x2="35" y2="42" stroke="#00D9FF" strokeWidth="0.8" opacity="0.3"/>
          <line x1="52" y1="38" x2="55" y2="38" stroke="#00D9FF" strokeWidth="0.8" opacity="0.3"/>
          <line x1="52" y1="42" x2="55" y2="42" stroke="#00D9FF" strokeWidth="0.8" opacity="0.3"/>
          
          <rect x="100" y="105" width="10" height="10" rx="1" fill="none" stroke="#E63946" strokeWidth="1" opacity="0.25"/>
          <line x1="98" y1="108" x2="95" y2="108" stroke="#E63946" strokeWidth="0.8" opacity="0.25"/>
          <line x1="98" y1="112" x2="95" y2="112" stroke="#E63946" strokeWidth="0.8" opacity="0.25"/>
          <line x1="112" y1="108" x2="115" y2="108" stroke="#E63946" strokeWidth="0.8" opacity="0.25"/>
          <line x1="112" y1="112" x2="115" y2="112" stroke="#E63946" strokeWidth="0.8" opacity="0.25"/>
        </pattern>

        {/* Geometric pattern */}
        <pattern id="geometricPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="25" fill="none" stroke="#00D9FF" strokeWidth="0.5" opacity="0.12"/>
          <circle cx="50" cy="50" r="15" fill="none" stroke="#E63946" strokeWidth="0.5" opacity="0.1"/>
          <path d="M 35 50 L 50 35 L 65 50 L 50 65 Z" fill="none" stroke="#00A8CC" strokeWidth="0.5" opacity="0.1"/>
        </pattern>

        {/* Dot grid pattern */}
        <pattern id="dotGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="#00D9FF" opacity="0.15"/>
        </pattern>

        {/* Animated wave pattern */}
        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#00D9FF', stopOpacity: 0.15 }}>
            <animate attributeName="stop-opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" style={{ stopColor: '#00A8CC', stopOpacity: 0.1 }}>
            <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" style={{ stopColor: '#00D9FF', stopOpacity: 0.15 }}>
            <animate attributeName="stop-opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        {/* Filter for depth */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Base clean gradient */}
      <rect width="1920" height="1080" fill="url(#bgGradient)"/>
      
      {/* Dot grid subtle overlay */}
      <rect width="1920" height="1080" fill="url(#dotGrid)" opacity="0.5"/>
      
      {/* Geometric pattern */}
      <rect width="1920" height="1080" fill="url(#geometricPattern)" opacity="0.4"/>
      
      {/* Circuit pattern overlay */}
      <rect width="1920" height="1080" fill="url(#circuitPattern)" opacity="0.7"/>
      
      {/* Large decorative circles */}
      <circle cx="150" cy="150" r="200" fill="url(#cyanGlow)" opacity="0.6">
        <animate attributeName="r" values="200;220;200" dur="8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1770" cy="930" r="220" fill="url(#redGlow)" opacity="0.5">
        <animate attributeName="r" values="220;240;220" dur="9s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1600" cy="200" r="180" fill="url(#cyanGlow)" opacity="0.5">
        <animate attributeName="r" values="180;200;180" dur="7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="320" cy="880" r="160" fill="url(#redGlow)" opacity="0.45">
        <animate attributeName="r" values="160;180;160" dur="8.5s" repeatCount="indefinite"/>
      </circle>

      {/* Flowing waves */}
      <path d="M 0 400 Q 480 350, 960 400 T 1920 400" fill="none" stroke="url(#wave1)" strokeWidth="2" opacity="0.6">
        <animate 
          attributeName="d" 
          values="M 0 400 Q 480 350, 960 400 T 1920 400;M 0 400 Q 480 450, 960 400 T 1920 400;M 0 400 Q 480 350, 960 400 T 1920 400" 
          dur="10s" 
          repeatCount="indefinite"
        />
      </path>
      
      <path d="M 0 700 Q 480 750, 960 700 T 1920 700" fill="none" stroke="url(#shimmer)" strokeWidth="2" opacity="0.5">
        <animate 
          attributeName="d" 
          values="M 0 700 Q 480 750, 960 700 T 1920 700;M 0 700 Q 480 650, 960 700 T 1920 700;M 0 700 Q 480 750, 960 700 T 1920 700" 
          dur="12s" 
          repeatCount="indefinite"
        />
      </path>

      {/* Enhanced tech icons */}
      <g opacity="0.25" filter="url(#glow)">
        {/* Camera icon */}
        <g transform="translate(200, 600)">
          <rect x="0" y="5" width="50" height="38" rx="5" fill="none" stroke="url(#accentGradient1)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="6s" repeatCount="indefinite"/>
          </rect>
          <circle cx="25" cy="24" r="12" fill="none" stroke="url(#accentGradient1)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="6s" repeatCount="indefinite"/>
          </circle>
          <circle cx="40" cy="12" r="3" fill="url(#accentGradient1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="6s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* Gallery grid icon */}
        <g transform="translate(1600, 380)">
          <rect x="0" y="0" width="22" height="22" rx="2" fill="none" stroke="url(#accentGradient2)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,12; 0,0" dur="7s" repeatCount="indefinite"/>
          </rect>
          <rect x="28" y="0" width="22" height="22" rx="2" fill="none" stroke="url(#accentGradient2)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,12; 0,0" dur="7s" repeatCount="indefinite"/>
          </rect>
          <rect x="0" y="28" width="22" height="22" rx="2" fill="none" stroke="url(#accentGradient2)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,12; 0,0" dur="7s" repeatCount="indefinite"/>
          </rect>
          <rect x="28" y="28" width="22" height="22" rx="2" fill="none" stroke="url(#accentGradient2)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,12; 0,0" dur="7s" repeatCount="indefinite"/>
          </rect>
        </g>

        {/* Image/Photo icon */}
        <g transform="translate(850, 80)">
          <rect x="0" y="0" width="55" height="42" rx="4" fill="none" stroke="url(#accentGradient1)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="8s" repeatCount="indefinite"/>
          </rect>
          <circle cx="14" cy="12" r="5" fill="url(#accentGradient1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="8s" repeatCount="indefinite"/>
          </circle>
          <path d="M 5 32 L 20 20 L 35 28 L 50 15" fill="none" stroke="url(#accentGradient1)" strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="8s" repeatCount="indefinite"/>
          </path>
        </g>

        {/* Play/Video icon */}
        <g transform="translate(1450, 650)">
          <circle cx="25" cy="25" r="24" fill="none" stroke="url(#accentGradient2)" strokeWidth="2">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="7.5s" repeatCount="indefinite"/>
          </circle>
          <path d="M 20 15 L 20 35 L 35 25 Z" fill="url(#accentGradient2)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,10; 0,0" dur="7.5s" repeatCount="indefinite"/>
          </path>
        </g>
      </g>

      {/* Floating particles with trails */}
      <g opacity="0.6">
        <circle cx="400" cy="250" r="3" fill="#00D9FF">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; 30,-30; 0,0" dur="10s" repeatCount="indefinite"/>
        </circle>
        <circle cx="1300" cy="600" r="3" fill="#E63946">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; -25,25; 0,0" dur="11s" repeatCount="indefinite"/>
        </circle>
        <circle cx="1500" cy="300" r="2.5" fill="#00A8CC">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; 15,35; 0,0" dur="9s" repeatCount="indefinite"/>
        </circle>
        <circle cx="250" cy="800" r="3" fill="#00D9FF">
          <animate attributeName="opacity" values="0.5;0.95;0.5" dur="4.5s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; -30,-15; 0,0" dur="12s" repeatCount="indefinite"/>
        </circle>
        <circle cx="1100" cy="200" r="2.5" fill="#E63946">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; 20,20; 0,0" dur="10.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="700" cy="900" r="3" fill="#00A8CC">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="4.2s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0,0; -20,30; 0,0" dur="11.5s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Accent corner decorations */}
      <g opacity="0.2">
        <path d="M 0 0 L 150 0 L 150 10 L 10 10 L 10 150 L 0 150 Z" fill="url(#accentGradient1)"/>
        <path d="M 1920 0 L 1770 0 L 1770 10 L 1910 10 L 1910 150 L 1920 150 Z" fill="url(#accentGradient2)"/>
        <path d="M 0 1080 L 150 1080 L 150 1070 L 10 1070 L 10 930 L 0 930 Z" fill="url(#accentGradient2)"/>
        <path d="M 1920 1080 L 1770 1080 L 1770 1070 L 1910 1070 L 1910 930 L 1920 930 Z" fill="url(#accentGradient1)"/>
      </g>

      {/* Subtle vignette for depth */}
      <rect width="1920" height="1080" fill="radial-gradient(circle, transparent 40%, rgba(0,0,0,0.05) 100%)" opacity="0.6"/>
    </svg>
  );
};

export default GalleryBackground;