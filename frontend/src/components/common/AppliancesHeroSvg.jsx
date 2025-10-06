import React from 'react';

const AppliancesHeroSvg = ({ 
  primaryColor = '#6366f1',
  secondaryColor = '#8b5cf6',
  accentColor = '#ec4899',
  lightColor = '#f0f9ff',
  darkColor = '#1e293b',
  opacity = 1
}) => {
  return (
    <svg 
      viewBox="0 0 1920 1080" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'block'
      }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: lightColor, stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>
      
      <rect width="1920" height="1080" fill="url(#heroGrad1)"/>
      
      {/* Ground/Base line */}
      <line x1="0" y1="880" x2="1920" y2="880" stroke={darkColor} strokeWidth="3" opacity={opacity * 0.15}/>
      
      {/* Oil Heater (Far Left) */}
      <g opacity={opacity * 0.18} transform="translate(150, 450)">
        <rect x="0" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="24" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="48" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="72" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="96" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="120" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <rect x="144" y="0" width="18" height="320" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <circle cx="12" cy="340" r="12" fill="none" stroke={darkColor} strokeWidth="3"/>
        <circle cx="152" cy="340" r="12" fill="none" stroke={darkColor} strokeWidth="3"/>
        <rect x="-8" y="-35" width="180" height="28" fill="none" stroke={darkColor} strokeWidth="3" rx="5"/>
        <circle cx="30" cy="-21" r="6" fill={primaryColor}/>
        <circle cx="55" cy="-21" r="6" fill={secondaryColor}/>
        <rect x="85" y="-28" width="45" height="14" fill="none" stroke={darkColor} strokeWidth="2" rx="3"/>
      </g>
      
      {/* Washing Machine (Left-Center) */}
      <g opacity={opacity * 0.22} transform="translate(320, 450)">
        <rect x="0" y="0" width="220" height="320" fill="none" stroke={darkColor} strokeWidth="4" rx="12"/>
        <rect x="15" y="15" width="190" height="55" fill="none" stroke={darkColor} strokeWidth="3" rx="6"/>
        <circle cx="165" cy="42" r="12" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <rect x="35" y="28" width="40" height="28" fill="none" stroke={secondaryColor} strokeWidth="2.5" rx="4"/>
        <rect x="85" y="28" width="40" height="28" fill="none" stroke={secondaryColor} strokeWidth="2.5" rx="4"/>
        <circle cx="110" cy="185" r="90" fill="none" stroke={darkColor} strokeWidth="4"/>
        <circle cx="110" cy="185" r="78" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <circle cx="110" cy="185" r="65" fill="none" stroke={darkColor} strokeWidth="2.5" strokeDasharray="10,10"/>
        <circle cx="110" cy="185" r="8" fill={darkColor}/>
        <line x1="110" y1="120" x2="110" y2="185" stroke={darkColor} strokeWidth="3"/>
        <line x1="110" y1="185" x2="165" y2="155" stroke={darkColor} strokeWidth="3"/>
        <rect x="15" y="290" width="190" height="20" fill="none" stroke={darkColor} strokeWidth="3" rx="4"/>
      </g>
      
      {/* Iron (Front-Left) */}
      <g opacity={opacity * 0.21} transform="translate(280, 710)">
        <path d="M0,35 L100,35 L115,65 L-15,65 Z" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <ellipse cx="50" cy="65" rx="58" ry="14" fill="none" stroke={darkColor} strokeWidth="3"/>
        <path d="M30,12 Q50,0 70,12 L76,35 L24,35 Z" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <line x1="35" y1="48" x2="65" y2="48" stroke={primaryColor} strokeWidth="2"/>
        <line x1="40" y1="55" x2="60" y2="55" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="42" cy="23" r="5" fill={accentColor}/>
        <circle cx="58" cy="23" r="5" fill={secondaryColor}/>
      </g>
      
      {/* Microwave (Center-Back) */}
      <g opacity={opacity * 0.19} transform="translate(560, 280)">
        <rect x="0" y="0" width="260" height="170" fill="none" stroke={darkColor} strokeWidth="4" rx="10"/>
        <rect x="20" y="25" width="155" height="120" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <circle cx="97" cy="85" r="42" fill="none" stroke={primaryColor} strokeWidth="2.5" strokeDasharray="8,8"/>
        <line x1="97" y1="85" x2="127" y2="85" stroke={primaryColor} strokeWidth="3"/>
        <line x1="97" y1="85" x2="97" y2="55" stroke={primaryColor} strokeWidth="3"/>
        <rect x="190" y="30" width="55" height="38" fill="none" stroke={secondaryColor} strokeWidth="3" rx="5"/>
        <line x1="198" y1="39" x2="209" y2="39" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="198" y1="49" x2="209" y2="49" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="198" y1="59" x2="209" y2="59" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="222" y1="39" x2="237" y2="39" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="222" y1="49" x2="237" y2="49" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="222" y1="59" x2="237" y2="59" stroke={secondaryColor} strokeWidth="2"/>
        <circle cx="217" cy="90" r="18" fill="none" stroke={accentColor} strokeWidth="3"/>
        <circle cx="217" cy="90" r="5" fill={accentColor}/>
        <circle cx="207" cy="127" r="10" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="232" cy="127" r="10" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <rect x="8" y="152" width="244" height="12" fill="none" stroke={darkColor} strokeWidth="3" rx="3"/>
      </g>
      
      {/* Water Heater (Center-Back Tall) */}
      <g opacity={opacity * 0.17} transform="translate(840, 100)">
        <rect x="0" y="0" width="170" height="460" fill="none" stroke={darkColor} strokeWidth="3.5" rx="10"/>
        <ellipse cx="85" cy="0" rx="85" ry="18" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <circle cx="85" cy="50" r="25" fill="none" stroke={darkColor} strokeWidth="3"/>
        <rect x="60" y="230" width="50" height="65" fill="none" stroke={primaryColor} strokeWidth="3" rx="4"/>
        <line x1="67" y1="242" x2="103" y2="242" stroke={primaryColor} strokeWidth="1.5"/>
        <line x1="67" y1="255" x2="103" y2="255" stroke={primaryColor} strokeWidth="1.5"/>
        <line x1="67" y1="268" x2="103" y2="268" stroke={primaryColor} strokeWidth="1.5"/>
        <line x1="67" y1="281" x2="103" y2="281" stroke={primaryColor} strokeWidth="1.5"/>
        <circle cx="85" cy="330" r="15" fill="none" stroke={accentColor} strokeWidth="3"/>
        <circle cx="85" cy="330" r="5" fill={accentColor}/>
        <rect x="25" y="435" width="120" height="18" fill="none" stroke={darkColor} strokeWidth="3" rx="4"/>
      </g>
      
      {/* Pressure Cooker (Front-Center) */}
      <g opacity={opacity * 0.23} transform="translate(780, 620)">
        <ellipse cx="75" cy="0" rx="75" ry="15" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <rect x="0" y="0" width="150" height="100" fill="none" stroke={darkColor} strokeWidth="4" rx="6"/>
        <ellipse cx="75" cy="100" rx="75" ry="15" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <rect x="57" y="-35" width="36" height="35" fill="none" stroke={darkColor} strokeWidth="3.5" rx="4"/>
        <circle cx="75" cy="-17" r="8" fill="none" stroke={accentColor} strokeWidth="3"/>
        <circle cx="75" cy="50" r="25" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <path d="M-8,38 Q-20,50 -8,62" fill="none" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M158,38 Q170,50 158,62" fill="none" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
      </g>
      
      {/* Refrigerator (Center-Right Back) */}
      <g opacity={opacity * 0.20} transform="translate(1020, 200)">
        <rect x="0" y="0" width="240" height="540" fill="none" stroke={darkColor} strokeWidth="4.5" rx="12"/>
        <line x1="0" y1="220" x2="240" y2="220" stroke={darkColor} strokeWidth="4"/>
        <rect x="190" y="85" width="32" height="90" fill="none" stroke={darkColor} strokeWidth="3.5" rx="5"/>
        <rect x="190" y="305" width="32" height="150" fill="none" stroke={darkColor} strokeWidth="3.5" rx="5"/>
        <rect x="20" y="20" width="100" height="38" fill="none" stroke={primaryColor} strokeWidth="3" rx="4"/>
        <circle cx="38" cy="39" r="7" fill={primaryColor}/>
        <circle cx="62" cy="39" r="7" fill={primaryColor}/>
        <circle cx="86" cy="39" r="7" fill={primaryColor}/>
        <line x1="25" y1="245" x2="215" y2="245" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="25" y1="263" x2="215" y2="263" stroke={secondaryColor} strokeWidth="2"/>
        <line x1="25" y1="281" x2="215" y2="281" stroke={secondaryColor} strokeWidth="2"/>
        <rect x="25" y="505" width="190" height="25" fill="none" stroke={darkColor} strokeWidth="3" rx="4"/>
        <circle cx="60" cy="517" r="6" fill={accentColor}/>
        <circle cx="95" cy="517" r="6" fill={accentColor}/>
      </g>
      
      {/* Stove/Oven (Center-Right) */}
      <g opacity={opacity * 0.21} transform="translate(1240, 380)">
        <rect x="0" y="0" width="240" height="360" fill="none" stroke={darkColor} strokeWidth="4.5" rx="10"/>
        <circle cx="70" cy="60" r="42" fill="none" stroke={primaryColor} strokeWidth="3.5"/>
        <circle cx="70" cy="60" r="34" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="70" cy="60" r="25" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="170" cy="60" r="42" fill="none" stroke={secondaryColor} strokeWidth="3.5"/>
        <circle cx="170" cy="60" r="34" fill="none" stroke={secondaryColor} strokeWidth="2"/>
        <circle cx="170" cy="60" r="25" fill="none" stroke={secondaryColor} strokeWidth="2"/>
        <circle cx="70" cy="145" r="37" fill="none" stroke={accentColor} strokeWidth="3.5"/>
        <circle cx="70" cy="145" r="29" fill="none" stroke={accentColor} strokeWidth="2"/>
        <circle cx="170" cy="145" r="37" fill="none" stroke={primaryColor} strokeWidth="3.5"/>
        <circle cx="170" cy="145" r="29" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <rect x="20" y="220" width="200" height="120" fill="none" stroke={darkColor} strokeWidth="4" rx="6"/>
        <circle cx="120" cy="280" r="35" fill="none" stroke={accentColor} strokeWidth="3" strokeDasharray="8,8"/>
        <rect x="210" y="25" width="20" height="180" fill="none" stroke={darkColor} strokeWidth="3" rx="4"/>
        <circle cx="220" cy="55" r="8" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="220" cy="90" r="8" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="220" cy="125" r="8" fill="none" stroke={primaryColor} strokeWidth="2"/>
        <circle cx="220" cy="160" r="8" fill="none" stroke={primaryColor} strokeWidth="2"/>
      </g>
      
      {/* Air Conditioner (Top-Right Back) */}
      <g opacity={opacity * 0.16} transform="translate(1420, 160)">
        <rect x="0" y="0" width="320" height="140" fill="none" stroke={darkColor} strokeWidth="4" rx="12"/>
        <line x1="12" y1="60" x2="308" y2="60" stroke={darkColor} strokeWidth="3.5"/>
        <rect x="25" y="25" width="75" height="25" fill="none" stroke={primaryColor} strokeWidth="3" rx="4"/>
        <circle cx="47" cy="37" r="6" fill={primaryColor}/>
        <circle cx="67" cy="37" r="6" fill={accentColor}/>
        <circle cx="87" cy="37" r="6" fill={secondaryColor}/>
        <line x1="25" y1="90" x2="295" y2="90" stroke={secondaryColor} strokeWidth="3" strokeDasharray="18,10"/>
        <line x1="32" y1="75" x2="32" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="55" y1="75" x2="55" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="78" y1="75" x2="78" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="101" y1="75" x2="101" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="124" y1="75" x2="124" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="147" y1="75" x2="147" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="170" y1="75" x2="170" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="193" y1="75" x2="193" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="216" y1="75" x2="216" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="239" y1="75" x2="239" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="262" y1="75" x2="262" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <line x1="285" y1="75" x2="285" y2="105" stroke={secondaryColor} strokeWidth="2.5"/>
        <rect x="12" y="120" width="296" height="12" fill="none" stroke={darkColor} strokeWidth="3" rx="3"/>
      </g>
      
      {/* Electric Kettle (Front-Center) */}
      <g opacity={opacity * 0.22} transform="translate(960, 680)">
        <path d="M25,100 L12,25 Q12,0 38,0 L87,0 Q113,0 113,25 L100,100 Z" fill="none" stroke={darkColor} strokeWidth="4"/>
        <ellipse cx="62" cy="100" rx="44" ry="13" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <path d="M106,38 Q125,38 132,56 Q125,74 106,74" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <circle cx="62" cy="50" r="10" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <rect x="43" y="-20" width="38" height="20" fill="none" stroke={darkColor} strokeWidth="3.5" rx="10"/>
        <rect x="20" y="113" width="84" height="8" fill="none" stroke={darkColor} strokeWidth="3" rx="3"/>
      </g>
      
      {/* Hand Mixer (Front-Right) */}
      <g opacity={opacity * 0.20} transform="translate(1520, 730)">
        <path d="M38,0 L52,0 L58,50 L32,50 Z" fill="none" stroke={darkColor} strokeWidth="3.5"/>
        <ellipse cx="45" cy="0" rx="16" ry="7" fill="none" stroke={darkColor} strokeWidth="3"/>
        <circle cx="45" cy="20" r="8" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <path d="M32,50 L25,100" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M45,50 L45,105" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M58,50 L65,100" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="25" cy="103" r="5" fill={accentColor}/>
        <circle cx="45" cy="108" r="5" fill={accentColor}/>
        <circle cx="65" cy="103" r="5" fill={accentColor}/>
      </g>
      
      {/* Vacuum Cleaner (Right) */}
      <g opacity={opacity * 0.19} transform="translate(1480, 440)">
        <circle cx="75" cy="150" r="68" fill="none" stroke={darkColor} strokeWidth="4"/>
        <circle cx="75" cy="150" r="52" fill="none" stroke={primaryColor} strokeWidth="3"/>
        <rect x="50" y="82" width="50" height="68" fill="none" stroke={darkColor} strokeWidth="3.5" rx="6"/>
        <path d="M75,25 L75,82" stroke={darkColor} strokeWidth="4" strokeLinecap="round"/>
        <path d="M75,25 L125,0" stroke={darkColor} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M125,0 L165,-15" stroke={darkColor} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="32" cy="218" r="13" fill="none" stroke={darkColor} strokeWidth="3"/>
        <circle cx="118" cy="218" r="13" fill="none" stroke={darkColor} strokeWidth="3"/>
        <rect x="56" y="95" width="38" height="20" fill="none" stroke={secondaryColor} strokeWidth="2.5" rx="3"/>
      </g>
    </svg>
  );
};

export default AppliancesHeroSvg;