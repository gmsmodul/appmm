import React from 'react';

export type UiLoaderVariant =
  | 'spinner-arc'
  | 'dual-ring'
  | 'morph-blob'
  | 'newton-dots'
  | 'pulse-ripple'
  | 'bounce-trio'
  | 'eq-bars'
  | 'cube-flip'
  | 'infinity-stroke'
  | 'orbital-atom'
  | 'segmented-radar'
  | 'sliding-pill'
  | 'typing-wave'
  | 'square-chase'
  | 'hourglass'
  | 'helix-twist'
  | 'clock-sweep'
  | 'grid-matrix'
  | 'elastic-ring'
  | 'terminal-pulse';

export interface UiLoaderMeta {
  id: UiLoaderVariant;
  num: number;
  name: string;
  slug: string;
  category: 'Ring' | 'Kinetic' | 'Geometric' | 'Wave' | 'System';
  description: string;
}

export const UI_LOADERS_CATALOG: UiLoaderMeta[] = [
  {
    id: 'spinner-arc',
    num: 1,
    name: 'Spinner Arc',
    slug: 'loader/spinner-arc',
    category: 'Ring',
    description: 'Busur melingkar berujung bulat menyapu lintasan track dengan rotasi kontinyu.',
  },
  {
    id: 'dual-ring',
    num: 2,
    name: 'Dual Ring Orbit',
    slug: 'loader/dual-ring',
    category: 'Ring',
    description: 'Dua cincin konsentris berputar berlawanan arah untuk indikator sinkronisasi.',
  },
  {
    id: 'morph-blob',
    num: 3,
    name: 'Morphing Blob',
    slug: 'loader/morph-blob',
    category: 'Geometric',
    description: 'Siluet organik yang bermorfosis mulus antara lingkaran dan squircle.',
  },
  {
    id: 'newton-dots',
    num: 4,
    name: 'Newton Dots',
    slug: 'loader/newton-dots',
    category: 'Kinetic',
    description: 'Ayunan pendulum bergaya Newton’s cradle yang ritmis dan ringan.',
  },
  {
    id: 'pulse-ripple',
    num: 5,
    name: 'Pulse Ripple',
    slug: 'loader/pulse-ripple',
    category: 'Wave',
    description: 'Gelombang radar konsentris memancar keluar untuk status real-time.',
  },
  {
    id: 'bounce-trio',
    num: 6,
    name: 'Bouncing Trio',
    slug: 'loader/bounce-trio',
    category: 'Kinetic',
    description: 'Tiga titik memantul bertahap dengan jeda fase yang rapi.',
  },
  {
    id: 'eq-bars',
    num: 7,
    name: 'Equalizer Bars',
    slug: 'loader/eq-bars',
    category: 'Wave',
    description: 'Lima bilah vertikal berosilasi seperti spektrum audio modern.',
  },
  {
    id: 'cube-flip',
    num: 8,
    name: 'Cube Flip 3D',
    slug: 'loader/cube-flip',
    category: 'Geometric',
    description: 'Kubus perspektif 3D berbalik di sumbu X dan Y secara bergantian.',
  },
  {
    id: 'infinity-stroke',
    num: 9,
    name: 'Infinity Stroke',
    slug: 'loader/infinity-stroke',
    category: 'Geometric',
    description: 'Lintasan lemniscate tak terputus menggunakan animasi SVG stroke-dashoffset.',
  },
  {
    id: 'orbital-atom',
    num: 10,
    name: 'Orbital Atom',
    slug: 'loader/orbital-atom',
    category: 'Ring',
    description: 'Dua orbit elips bersilangan mengelilingi inti bercahaya di tengah.',
  },
  {
    id: 'segmented-radar',
    num: 11,
    name: 'Segmented Radar',
    slug: 'loader/segmented-radar',
    category: 'System',
    description: '12 bilah radial memudar berurutan seperti jarum jam presisi.',
  },
  {
    id: 'sliding-pill',
    num: 12,
    name: 'Sliding Pill',
    slug: 'loader/sliding-pill',
    category: 'System',
    description: 'Indikator linear indeterminate dengan kapsul halus meluncur bolak-balik.',
  },
  {
    id: 'typing-wave',
    num: 13,
    name: 'Typing Wave',
    slug: 'loader/typing-wave',
    category: 'Wave',
    description: 'Gelombang tiga titik lembut untuk status mengetik atau memproses AI.',
  },
  {
    id: 'square-chase',
    num: 14,
    name: 'Square Chase',
    slug: 'loader/square-chase',
    category: 'Geometric',
    description: 'Dua kotak membulat saling mengejar mengelilingi lintasan grid 2x2.',
  },
  {
    id: 'hourglass',
    num: 15,
    name: 'Hourglass Flip',
    slug: 'loader/hourglass',
    category: 'Geometric',
    description: 'Siluet jam pasir minimalis berputar 180° dengan jeda beat.',
  },
  {
    id: 'helix-twist',
    num: 16,
    name: 'Helix Twist',
    slug: 'loader/helix-twist',
    category: 'Kinetic',
    description: 'Pasangan titik sinusoidal ganda berayun berlawanan fase seperti untai DNA.',
  },
  {
    id: 'clock-sweep',
    num: 17,
    name: 'Clock Sweep',
    slug: 'loader/clock-sweep',
    category: 'System',
    description: 'Dial jam minimalis dengan jarum menit cepat dan jarum jam stabil.',
  },
  {
    id: 'grid-matrix',
    num: 18,
    name: 'Grid Matrix 3×3',
    slug: 'loader/grid-matrix',
    category: 'Geometric',
    description: 'Sembilan ubin mikro berdenyut secara diagonal membentuk riak matriks.',
  },
  {
    id: 'elastic-ring',
    num: 19,
    name: 'Elastic Ring',
    slug: 'loader/elastic-ring',
    category: 'Ring',
    description: 'Busur elastis yang memanjang dan menyusut dinamis sambil berotasi.',
  },
  {
    id: 'terminal-pulse',
    num: 20,
    name: 'Terminal Pulse',
    slug: 'loader/terminal-pulse',
    category: 'System',
    description: 'Prompt CLI >_ dengan kursor berkedip dan bilah progres ringkas.',
  },
];

export interface UiLoaderProps {
  variant?: UiLoaderVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  trackColor?: string;
  label?: string;
  className?: string;
}

const SIZE_PX: Record<NonNullable<UiLoaderProps['size']>, number> = {
  sm: 20,
  md: 32,
  lg: 52,
  xl: 76,
};

export const UiLoader: React.FC<UiLoaderProps> = ({
  variant = 'spinner-arc',
  size = 'lg',
  color = '#C6F135',
  trackColor = 'rgba(255, 255, 255, 0.14)',
  label = 'Memuat...',
  className = '',
}) => {
  const px = SIZE_PX[size];
  const scaleFactor = px / 52;

  const renderGraphic = () => {
    switch (variant) {
      case 'spinner-arc':
        return (
          <svg
            width={px}
            height={px}
            viewBox="0 0 56 56"
            className="overflow-visible"
            style={{ animation: 'loader-spin 0.95s linear infinite' }}
          >
            <circle
              cx="28"
              cy="28"
              r="21"
              fill="none"
              stroke={trackColor}
              strokeWidth="5.5"
            />
            <circle
              cx="28"
              cy="28"
              r="21"
              fill="none"
              stroke={color}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="88 132"
              strokeDashoffset="12"
            />
          </svg>
        );

      case 'dual-ring':
        return (
          <svg width={px} height={px} viewBox="0 0 56 56" className="overflow-visible">
            <g style={{ transformOrigin: '28px 28px', animation: 'loader-spin 1.15s linear infinite' }}>
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="68 72"
              />
            </g>
            <g
              style={{
                transformOrigin: '28px 28px',
                animation: 'loader-spin-reverse 0.85s linear infinite',
              }}
            >
              <circle
                cx="28"
                cy="28"
                r="13"
                fill="none"
                stroke={color}
                strokeOpacity={0.7}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="40 46"
              />
            </g>
          </svg>
        );

      case 'morph-blob':
        return (
          <div
            style={{
              width: px * 0.78,
              height: px * 0.78,
              backgroundColor: color,
              animation: 'loader-morph-blob 2.2s ease-in-out infinite',
            }}
          />
        );

      case 'newton-dots':
        return (
          <div
            className="flex items-start justify-center"
            style={{ width: px * 1.1, height: px * 0.85, transform: `scale(${scaleFactor})` }}
          >
            <div className="flex items-end gap-[2px] h-10">
              <div
                className="w-2.5 h-9 flex items-end justify-center origin-top"
                style={{ animation: 'loader-newton-left 1.15s ease-in-out infinite' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              </div>
              <div className="w-2.5 h-9 flex items-end justify-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, opacity: 0.9 }} />
              </div>
              <div className="w-2.5 h-9 flex items-end justify-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, opacity: 0.9 }} />
              </div>
              <div
                className="w-2.5 h-9 flex items-end justify-center origin-top"
                style={{ animation: 'loader-newton-right 1.15s ease-in-out infinite' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              </div>
            </div>
          </div>
        );

      case 'pulse-ripple':
        return (
          <div className="relative flex items-center justify-center" style={{ width: px, height: px }}>
            <span
              className="absolute inset-0 rounded-full border-[3px]"
              style={{
                borderColor: color,
                animation: 'loader-ripple 1.6s cubic-bezier(0.23, 1, 0.32, 1) infinite',
              }}
            />
            <span
              className="absolute inset-0 rounded-full border-[3px]"
              style={{
                borderColor: color,
                animation: 'loader-ripple 1.6s cubic-bezier(0.23, 1, 0.32, 1) infinite 0.75s',
              }}
            />
            <span
              className="rounded-full"
              style={{ width: px * 0.2, height: px * 0.2, backgroundColor: color }}
            />
          </div>
        );

      case 'bounce-trio':
        return (
          <div className="flex items-center justify-center gap-1.5" style={{ height: px }}>
            {[0, 0.16, 0.32].map((delay, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: Math.max(5, px * 0.2),
                  height: Math.max(5, px * 0.2),
                  backgroundColor: color,
                  animation: `loader-bounce-trio 1.1s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        );

      case 'eq-bars':
        return (
          <div className="flex items-center justify-center gap-1" style={{ height: px * 0.72 }}>
            {[0, 0.14, 0.28, 0.42, 0.56].map((delay, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: Math.max(3, px * 0.095),
                  height: '100%',
                  backgroundColor: color,
                  animation: `loader-eq-bar 0.95s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        );

      case 'cube-flip':
        return (
          <div
            style={{
              width: px * 0.68,
              height: px * 0.68,
              backgroundColor: color,
              borderRadius: Math.max(4, px * 0.12),
              animation: 'loader-cube-flip 1.35s cubic-bezier(0.23, 1, 0.32, 1) infinite',
            }}
          />
        );

      case 'infinity-stroke':
        return (
          <svg width={px * 1.25} height={px * 0.65} viewBox="0 0 80 40" className="overflow-visible">
            <path
              d="M22,20 C22,10 10,10 10,20 C10,30 22,30 28,20 L34,12 C40,4 58,4 66,12 C72,18 72,22 66,28 C58,36 40,36 34,28 L28,20"
              fill="none"
              stroke={trackColor}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M22,20 C22,10 10,10 10,20 C10,30 22,30 28,20 L34,12 C40,4 58,4 66,12 C72,18 72,22 66,28 C58,36 40,36 34,28 L28,20"
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="54 122"
              style={{ animation: 'loader-infinity-dash 1.35s linear infinite' }}
            />
          </svg>
        );

      case 'orbital-atom':
        return (
          <svg width={px} height={px} viewBox="0 0 56 56" className="overflow-visible">
            <circle cx="28" cy="28" r="5" fill={color} />
            <g style={{ transformOrigin: '28px 28px', transform: 'rotate(35deg)' }}>
              <ellipse cx="28" cy="28" rx="23" ry="9.5" fill="none" stroke={trackColor} strokeWidth="2.5" />
              <g style={{ transformOrigin: '28px 28px', animation: 'loader-spin 1.3s linear infinite' }}>
                <ellipse
                  cx="28"
                  cy="28"
                  rx="23"
                  ry="9.5"
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray="34 80"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <g style={{ transformOrigin: '28px 28px', transform: 'rotate(-35deg)' }}>
              <ellipse cx="28" cy="28" rx="23" ry="9.5" fill="none" stroke={trackColor} strokeWidth="2.5" />
              <g style={{ transformOrigin: '28px 28px', animation: 'loader-spin-reverse 1.3s linear infinite' }}>
                <ellipse
                  cx="28"
                  cy="28"
                  rx="23"
                  ry="9.5"
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray="34 80"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        );

      case 'segmented-radar':
        return (
          <svg width={px} height={px} viewBox="0 0 56 56">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x="26"
                y="5"
                width="4"
                height="11"
                rx="2"
                fill={color}
                transform={`rotate(${i * 30} 28 28)`}
                style={{
                  animation: `loader-radar-fade 1.05s linear ${(i * 1.05) / 12 - 1.05}s infinite`,
                }}
              />
            ))}
          </svg>
        );

      case 'sliding-pill':
        return (
          <div
            className="rounded-full overflow-hidden relative"
            style={{
              width: px * 1.5,
              height: Math.max(5, px * 0.14),
              backgroundColor: trackColor,
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: '44%',
                backgroundColor: color,
                animation: 'loader-sliding-pill 1.35s cubic-bezier(0.45, 0, 0.55, 1) infinite',
              }}
            />
          </div>
        );

      case 'typing-wave':
        return (
          <div
            className="rounded-full px-3 py-2 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: trackColor }}
          >
            {[0, 0.15, 0.3].map((delay, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: Math.max(4, px * 0.15),
                  height: Math.max(4, px * 0.15),
                  backgroundColor: color,
                  animation: `loader-typing-wave 1.1s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        );

      case 'square-chase':
        return (
          <div
            className="relative"
            style={{
              width: 34,
              height: 34,
              transform: `scale(${scaleFactor * 1.08})`,
            }}
          >
            <span
              className="absolute top-0 left-0 w-3.5 h-3.5 rounded-[4px]"
              style={{
                backgroundColor: color,
                animation: 'loader-square-chase-a 1.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
              }}
            />
            <span
              className="absolute top-0 left-0 w-3.5 h-3.5 rounded-[4px]"
              style={{
                backgroundColor: color,
                opacity: 0.55,
                animation: 'loader-square-chase-b 1.4s cubic-bezier(0.23, 1, 0.32, 1) infinite',
              }}
            />
          </div>
        );

      case 'hourglass':
        return (
          <svg
            width={px * 0.85}
            height={px * 0.85}
            viewBox="0 0 48 48"
            style={{ animation: 'loader-hourglass 1.8s cubic-bezier(0.23, 1, 0.32, 1) infinite' }}
          >
            <polygon points="10,8 38,8 24,24" fill={color} />
            <polygon points="24,24 38,40 10,40" fill={color} fillOpacity={0.45} />
            <line x1="8" y1="8" x2="40" y2="8" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="40" x2="40" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'helix-twist':
        return (
          <div className="flex items-center justify-center gap-1.5" style={{ height: px }}>
            {[0, 0.14, 0.28, 0.42].map((delay, i) => (
              <div key={i} className="relative flex items-center justify-center w-2.5 h-7">
                <span
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: color,
                    animation: `loader-helix-top 1.2s ease-in-out ${delay}s infinite`,
                  }}
                />
                <span
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: color,
                    opacity: 0.55,
                    animation: `loader-helix-bottom 1.2s ease-in-out ${delay}s infinite`,
                  }}
                />
              </div>
            ))}
          </div>
        );

      case 'clock-sweep':
        return (
          <svg width={px} height={px} viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="21" fill="none" stroke={trackColor} strokeWidth="3.5" />
            <line
              x1="28"
              y1="28"
              x2="28"
              y2="13"
              stroke={color}
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ transformOrigin: '28px 28px', animation: 'loader-spin 1.1s linear infinite' }}
            />
            <line
              x1="28"
              y1="28"
              x2="37"
              y2="28"
              stroke={color}
              strokeOpacity={0.65}
              strokeWidth="3"
              strokeLinecap="round"
              style={{ transformOrigin: '28px 28px', animation: 'loader-spin 4.4s linear infinite' }}
            />
            <circle cx="28" cy="28" r="3" fill={color} />
          </svg>
        );

      case 'grid-matrix': {
        const delays = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];
        return (
          <div
            className="grid grid-cols-3 gap-1"
            style={{ width: px * 0.78, height: px * 0.78 }}
          >
            {delays.map((delay, i) => (
              <span
                key={i}
                className="rounded-[2px]"
                style={{
                  backgroundColor: color,
                  animation: `loader-grid-matrix 1.25s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>
        );
      }

      case 'elastic-ring':
        return (
          <svg
            width={px}
            height={px}
            viewBox="0 0 56 56"
            style={{ animation: 'loader-spin 1.8s linear infinite' }}
          >
            <circle cx="28" cy="28" r="20" fill="none" stroke={trackColor} strokeWidth="4.5" />
            <circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke={color}
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ animation: 'loader-elastic-dash 1.45s ease-in-out infinite' }}
            />
          </svg>
        );

      case 'terminal-pulse':
        return (
          <div
            className="rounded-lg border px-2.5 py-1.5 flex flex-col gap-1.5 font-mono"
            style={{
              borderColor: trackColor,
              minWidth: Math.max(58, px * 1.45),
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            <div className="flex items-center gap-1 text-[11px] font-bold leading-none" style={{ color }}>
              <span>&gt;_</span>
              <span className="opacity-80">load</span>
              <span
                className="inline-block w-1.5 h-3 rounded-[1px]"
                style={{
                  backgroundColor: color,
                  animation: 'loader-blink 0.9s steps(2, start) infinite',
                }}
              />
            </div>
            <div
              className="h-1 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: trackColor }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '45%',
                  backgroundColor: color,
                  animation: 'loader-sliding-pill 1.2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      <span className="sr-only">{label}</span>
      {renderGraphic()}
    </span>
  );
};
