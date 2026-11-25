import React from 'react';

export function downloadOrgSvg(svgId: string, filename: string, onSuccess?: () => void): void {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  onSuccess?.();
}

export function downloadOrgPng(svgId: string, filename: string, onSuccess?: () => void): void {
  const svg = document.getElementById(svgId) as SVGSVGElement | null;
  if (!svg) return;
  const vb = svg.viewBox?.baseVal;
  const width = (vb && vb.width ? vb.width : 1160) * 2;
  const height = (vb && vb.height ? vb.height : 660) * 2;
  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = filename;
      a.click();
    }
    URL.revokeObjectURL(url);
    onSuccess?.();
  };
  img.src = url;
}

interface OrgSvgProps {
  onSelectNode: (nodeId: string) => void;
}

export const SynodalV2OrgSvg: React.FC<OrgSvgProps> = ({ onSelectNode }) => {
  const opItems = [
    { id: 'v2-live-prod', label: 'LIVE PRODUCTION', sub: 'Ibadah & Siaran Live' },
    { id: 'v2-vid-pro', label: 'VID PRO', sub: 'Video & Animasi' },
    { id: 'v2-documentation', label: 'DOCUMENTATION', sub: 'Foto & Arsip' },
    { id: 'v2-tech-support', label: 'TECH SUPPORT', sub: 'Infrastruktur & MCR' },
  ];
  const devItems = [
    { id: 'v2-system', label: 'SYSTEM', sub: 'SOP & Compliance' },
    { id: 'v2-tools', label: 'TOOLS', sub: 'Maintenance & Aset' },
    { id: 'v2-advancement', label: 'ADVANCEMENT', sub: 'Skill Development' },
    { id: 'v2-relation', label: 'RELATION', sub: 'Pastoral & CG' },
    { id: 'v2-servolution', label: 'SERVOLUTION', sub: 'Onboarding School' },
  ];
  const regInItems = [
    { id: 'v2-regin-ek', label: 'EK' },
    { id: 'v2-regin-aog', label: 'AOG' },
    { id: 'v2-regin-senior', label: 'SENIOR' },
    { id: 'v2-regin-msp', label: 'MSP' },
  ];
  const regOutCol1 = [
    { id: 'v2-regout-indo', label: 'SUMATRA' },
    { id: 'v2-regout-indo', label: 'JJB' },
    { id: 'v2-regout-indo', label: 'JATENG' },
    { id: 'v2-regout-indo', label: 'JATIM 1' },
    { id: 'v2-regout-indo', label: 'JATIM 2' },
    { id: 'v2-regout-intl', label: 'EUROPE' },
  ];
  const regOutCol2 = [
    { id: 'v2-regout-indo', label: 'KALIMANTAN' },
    { id: 'v2-regout-indo', label: 'SULAMPAPUA' },
    { id: 'v2-regout-indo', label: 'BALI' },
    { id: 'v2-regout-intl', label: 'AUSTRALIA' },
    { id: 'v2-regout-intl', label: 'USA & CANADA' },
    { id: 'v2-regout-intl', label: 'ASIA' },
  ];

  const renderSplitBox = (
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    title: string,
    sub: string,
    headerFill: string,
    bodyFill: string,
    stroke: string,
    nodeId: string
  ) => {
    const headerH = Math.round(h * 0.52);
    return (
      <g
        key={key}
        onClick={() => onSelectNode(nodeId)}
        className="cursor-pointer transition-opacity hover:opacity-90"
      >
        <rect x={x} y={y} width={w} height={h} rx="9" fill={bodyFill} stroke={stroke} strokeWidth="1.3" />
        <path
          d={`M${x + 9},${y} h${w - 18} a9,9 0 0 1 9,9 v${headerH - 9} h-${w} v-${
            headerH - 9
          } a9,9 0 0 1 9,-9 z`}
          fill={headerFill}
        />
        <text
          x={x + w / 2}
          y={y + Math.round(h * 0.36)}
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="800"
          fill="#ffffff"
        >
          {title}
        </text>
        <text
          x={x + w / 2}
          y={y + Math.round(h * 0.8)}
          textAnchor="middle"
          fontSize="8.8"
          fontWeight="600"
          fill="#1e293b"
        >
          {sub}
        </text>
      </g>
    );
  };

  const renderMiniPill = (
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    title: string,
    headerFill: string,
    nodeId: string
  ) => (
    <g
      key={key}
      onClick={() => onSelectNode(nodeId)}
      className="cursor-pointer transition-opacity hover:opacity-90"
    >
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.2" />
      <path
        d={`M${x + 8},${y} h${w - 16} a8,8 0 0 1 8,8 v14 h-${w} v-14 a8,8 0 0 1 8,-8 z`}
        fill={headerFill}
      />
      <text x={x + w / 2} y={y + 15.5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ffffff">
        {title}
      </text>
      <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="7.8" fontWeight="600" fill="#475569">
        Klik untuk Jobdesk
      </text>
    </g>
  );

  return (
    <svg
      id="org-chart-v2-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 680"
      className="w-full h-auto block bg-white"
    >
      <rect width="1200" height="680" fill="#ffffff" />
      <text
        x="600"
        y="34"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="19"
        fontWeight="800"
        fill="#0f3d56"
        letterSpacing="0.8"
      >
        MULTIMEDIA SYNODAL STRUCTURE (V2)
      </text>
      <text
        x="600"
        y="54"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#EE2E65"
      >
        &quot;Capturing &amp; Spreading God&apos;s Presence&quot; • Posisi Resmi Tanpa Nama Personal
      </text>

      {/* Main Top Connectors */}
      <line x1="600" y1="126" x2="600" y2="202" stroke="#475569" strokeWidth="1.7" />
      <line x1="600" y1="160" x2="718" y2="160" stroke="#475569" strokeWidth="1.7" />
      <line x1="205" y1="202" x2="915" y2="202" stroke="#475569" strokeWidth="1.7" />
      <line x1="205" y1="202" x2="205" y2="226" stroke="#475569" strokeWidth="1.7" />
      <line x1="510" y1="202" x2="510" y2="226" stroke="#475569" strokeWidth="1.7" />
      <line x1="915" y1="202" x2="915" y2="226" stroke="#475569" strokeWidth="1.7" />

      {renderSplitBox(
        'head',
        495,
        74,
        210,
        52,
        'HEAD OF MM',
        'Pimpinan Sinodal',
        '#1d6f96',
        '#e0e7ff',
        '#3b82f6',
        'v2-head-mm'
      )}
      {renderSplitBox(
        'sec',
        718,
        136,
        185,
        48,
        'SECRETARY',
        'Administrasi & Arsip',
        '#0f3d56',
        '#bae6fd',
        '#0284c7',
        'v2-secretary'
      )}

      {renderSplitBox(
        'div-op',
        105,
        226,
        200,
        50,
        'OPERATIONAL',
        'Eksekusi Ibadah & Produksi',
        '#0f3d56',
        '#bae6fd',
        '#0284c7',
        'v2-operational'
      )}
      {renderSplitBox(
        'div-dev',
        410,
        226,
        200,
        50,
        'DEVELOPMENT',
        '5 Pilar Ekosistem',
        '#0f3d56',
        '#bae6fd',
        '#0284c7',
        'v2-development'
      )}
      {renderSplitBox(
        'div-reg',
        815,
        226,
        200,
        50,
        'REGIONAL SUPPORT',
        'Regional In & Regional Out',
        '#0f3d56',
        '#bae6fd',
        '#0284c7',
        'v2-regional-support'
      )}

      {/* Operational Spine & 4 Units */}
      <path d="M205,276 v18 h-113 v244" fill="none" stroke="#475569" strokeWidth="1.5" />
      {opItems.map((item, i) => {
        const y = 314 + i * 62;
        return (
          <React.Fragment key={item.id}>
            <line x1="92" y1={y + 24} x2="112" y2={y + 24} stroke="#475569" strokeWidth="1.5" />
            {renderSplitBox(
              `op-${item.id}`,
              112,
              y,
              198,
              48,
              item.label,
              item.sub,
              '#1d6f96',
              '#bae6fd',
              '#38bdf8',
              item.id
            )}
          </React.Fragment>
        );
      })}

      {/* Development Spine & 5 Pillars */}
      <path d="M510,276 v18 h-112 v306" fill="none" stroke="#475569" strokeWidth="1.5" />
      {devItems.map((item, i) => {
        const y = 314 + i * 62;
        return (
          <React.Fragment key={item.id}>
            <line x1="398" y1={y + 24} x2="418" y2={y + 24} stroke="#475569" strokeWidth="1.5" />
            {renderSplitBox(
              `dev-${item.id}`,
              418,
              y,
              198,
              48,
              item.label,
              item.sub,
              '#1d6f96',
              '#bae6fd',
              '#38bdf8',
              item.id
            )}
          </React.Fragment>
        );
      })}

      {/* Regional Support Split */}
      <line x1="915" y1="276" x2="915" y2="306" stroke="#475569" strokeWidth="1.5" />
      <line x1="686" y1="306" x2="1032" y2="306" stroke="#475569" strokeWidth="1.5" />
      <text x="850" y="299" textAnchor="end" fontSize="8.5" fontWeight="800" fill="#0f3d56">
        REGIONAL IN
      </text>
      <text x="926" y="299" textAnchor="start" fontSize="8.5" fontWeight="800" fill="#0f3d56">
        REGIONAL OUT
      </text>

      <line x1="686" y1="306" x2="686" y2="506" stroke="#475569" strokeWidth="1.4" />
      {regInItems.map((item, i) => {
        const y = 330 + i * 52;
        return (
          <React.Fragment key={item.label}>
            <line x1="686" y1={y + 20} x2="702" y2={y + 20} stroke="#475569" strokeWidth="1.4" />
            {renderMiniPill(`regin-${item.label}`, 702, y, 134, 40, item.label, '#135c7d', item.id)}
          </React.Fragment>
        );
      })}

      <line x1="862" y1="306" x2="862" y2="610" stroke="#475569" strokeWidth="1.4" />
      {regOutCol1.map((item, i) => {
        const y = 330 + i * 52;
        return (
          <React.Fragment key={item.label}>
            <line x1="862" y1={y + 20} x2="878" y2={y + 20} stroke="#475569" strokeWidth="1.4" />
            {renderMiniPill(`regout1-${item.label}`, 878, y, 134, 40, item.label, '#1d6f96', item.id)}
          </React.Fragment>
        );
      })}

      <line x1="1032" y1="306" x2="1032" y2="610" stroke="#475569" strokeWidth="1.4" />
      {regOutCol2.map((item, i) => {
        const y = 330 + i * 52;
        return (
          <React.Fragment key={item.label}>
            <line x1="1032" y1={y + 20} x2="1048" y2={y + 20} stroke="#475569" strokeWidth="1.4" />
            {renderMiniPill(`regout2-${item.label}`, 1048, y, 134, 40, item.label, '#1d6f96', item.id)}
          </React.Fragment>
        );
      })}

      <rect x="40" y="646" width="1120" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="600" y="661.5" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#64748b">
        Klik kotak mana pun di bagan untuk membuka Jobdesk lengkap • Divisi Development terintegrasi dengan 5 Pilar (System, Tools, Advancement, Relation, Servolution)
      </text>
    </svg>
  );
};

export const OfficialV1OrgSvg: React.FC<OrgSvgProps> = ({ onSelectNode }) => {
  const crewRow1 = [
    'CAMERAMEN',
    'JIMMY JIB OPERATOR',
    'TEXT OPERATOR',
    'TIME KEEPER',
    'STREAMING OPERATOR',
    'TECHNICAL SUPPORT',
  ];
  const crewRow2 = [
    'VIDEO DIRECTOR',
    'TECHNICAL DIRECTOR',
    'BROADCAST DIRECTOR',
    'QC AUDIO VIDEO',
    'PHOTOGRAPHER',
    'WEEKLY NEWS CREW',
    'CLIP CONTENT OPERATOR',
  ];

  return (
    <svg
      id="org-chart-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1160 660"
      className="w-full h-auto block bg-white"
    >
      <rect width="1160" height="660" fill="#ffffff" />
      <text
        x="580"
        y="34"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="800"
        fill="#111827"
      >
        STRUKTUR DEPT. MULTIMEDIA
      </text>
      <text
        x="580"
        y="54"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="11.5"
        fontWeight="600"
        fill="#EE2E65"
      >
        &quot;Capturing &amp; Spreading God&apos;s Presence&quot;
      </text>

      <line x1="580" y1="126" x2="580" y2="210" stroke="#64748b" strokeWidth="1.6" />
      <line x1="580" y1="164" x2="755" y2="164" stroke="#64748b" strokeWidth="1.6" strokeDasharray="5,4" />
      <line x1="295" y1="210" x2="985" y2="210" stroke="#64748b" strokeWidth="1.6" />
      <line x1="295" y1="210" x2="295" y2="236" stroke="#64748b" strokeWidth="1.6" />
      <line x1="655" y1="210" x2="655" y2="236" stroke="#64748b" strokeWidth="1.6" />
      <line x1="985" y1="210" x2="985" y2="236" stroke="#64748b" strokeWidth="1.6" />

      <g onClick={() => onSelectNode('pos-multimedia')} className="cursor-pointer hover:opacity-90">
        <rect x="480" y="76" width="200" height="50" rx="10" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="580" y="106" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e3a8a">
          MULTIMEDIA
        </text>
      </g>

      <g onClick={() => onSelectNode('pos-sekretaris')} className="cursor-pointer hover:opacity-90">
        <rect x="755" y="140" width="175" height="46" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.4" />
        <text x="842" y="168" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4c1d95">
          SEKRETARIS
        </text>
      </g>

      <g onClick={() => onSelectNode('pos-ministry')} className="cursor-pointer hover:opacity-90">
        <rect x="205" y="236" width="180" height="48" rx="10" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
        <text x="295" y="265" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#713f12">
          MINISTRY
        </text>
      </g>

      <g onClick={() => onSelectNode('pos-video-prod')} className="cursor-pointer hover:opacity-90">
        <rect x="565" y="236" width="180" height="48" rx="10" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
        <text x="655" y="265" textAnchor="middle" fontSize="12" fontWeight="800" fill="#713f12">
          VIDEO PRODUCTION
        </text>
      </g>
      <line x1="655" y1="284" x2="655" y2="314" stroke="#64748b" strokeWidth="1.5" />
      <line x1="590" y1="314" x2="720" y2="314" stroke="#64748b" strokeWidth="1.5" />
      <line x1="590" y1="314" x2="590" y2="334" stroke="#64748b" strokeWidth="1.5" />
      <line x1="720" y1="314" x2="720" y2="334" stroke="#64748b" strokeWidth="1.5" />
      <g onClick={() => onSelectNode('pos-video-editor')} className="cursor-pointer hover:opacity-90">
        <rect x="530" y="334" width="120" height="42" rx="8" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="590" y="359" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1f2937">
          VIDEO EDITOR
        </text>
      </g>
      <g onClick={() => onSelectNode('pos-animator')} className="cursor-pointer hover:opacity-90">
        <rect x="660" y="334" width="120" height="42" rx="8" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="720" y="359" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1f2937">
          ANIMATOR
        </text>
      </g>

      <g onClick={() => onSelectNode('pos-tech-support')} className="cursor-pointer hover:opacity-90">
        <rect x="895" y="236" width="180" height="48" rx="10" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
        <text x="985" y="265" textAnchor="middle" fontSize="12" fontWeight="800" fill="#713f12">
          TECH. SUPPORT
        </text>
      </g>
      <line x1="985" y1="284" x2="985" y2="334" stroke="#64748b" strokeWidth="1.5" />
      <g onClick={() => onSelectNode('pos-ts-scope')} className="cursor-pointer hover:opacity-90">
        <rect x="875" y="334" width="220" height="58" rx="9" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="985" y="358" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1f2937">
          Hardware, Software,
        </text>
        <text x="985" y="375" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1f2937">
          Maintenance, Purchasing
        </text>
      </g>

      <line x1="295" y1="284" x2="295" y2="314" stroke="#64748b" strokeWidth="1.5" />
      <line x1="150" y1="314" x2="420" y2="314" stroke="#64748b" strokeWidth="1.5" />
      <line x1="150" y1="314" x2="150" y2="334" stroke="#64748b" strokeWidth="1.5" />
      <line x1="420" y1="314" x2="420" y2="334" stroke="#64748b" strokeWidth="1.5" />

      <g onClick={() => onSelectNode('pos-ml-cc')} className="cursor-pointer hover:opacity-90">
        <rect x="60" y="334" width="180" height="52" rx="9" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.4" />
        <text x="150" y="356" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#1f2937">
          MINISTRY LEADER
        </text>
        <text x="150" y="373" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4b5563">
          CREW CHIEF
        </text>
      </g>
      <line x1="150" y1="386" x2="150" y2="480" stroke="#64748b" strokeWidth="1.5" />

      <g onClick={() => onSelectNode('pos-crew-13')} className="cursor-pointer hover:opacity-90">
        <rect x="95" y="480" width="110" height="32" rx="8" fill="#EE2E65" />
        <text x="150" y="500" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">
          CREW (13)
        </text>
      </g>
      <line x1="150" y1="512" x2="150" y2="538" stroke="#64748b" strokeWidth="1.4" />

      {crewRow1.map((label, i) => {
        const x = 24 + i * 116;
        return (
          <g
            key={label}
            onClick={() => onSelectNode('pos-crew-13')}
            className="cursor-pointer hover:opacity-90"
          >
            <rect x={x} y="538" width="108" height="38" rx="7" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.2" />
            <text x={x + 54} y="561" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#1f2937">
              {label}
            </text>
          </g>
        );
      })}
      {crewRow2.map((label, i) => {
        const x = 24 + i * 116;
        return (
          <g
            key={label}
            onClick={() => onSelectNode('pos-crew-13')}
            className="cursor-pointer hover:opacity-90"
          >
            <rect x={x} y="586" width="108" height="38" rx="7" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.2" />
            <text x={x + 54} y="609" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#1f2937">
              {label}
            </text>
          </g>
        );
      })}

      <g onClick={() => onSelectNode('pos-ml-dev')} className="cursor-pointer hover:opacity-90">
        <rect x="330" y="334" width="180" height="52" rx="9" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.4" />
        <text x="420" y="356" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#1f2937">
          MINISTRY LEADER
        </text>
        <text x="420" y="373" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#4b5563">
          Pengembangan &amp; Event
        </text>
      </g>
      <line x1="420" y1="386" x2="420" y2="408" stroke="#64748b" strokeWidth="1.5" />
      <line x1="290" y1="408" x2="550" y2="408" stroke="#64748b" strokeWidth="1.5" />
      <line x1="290" y1="408" x2="290" y2="424" stroke="#64748b" strokeWidth="1.5" />
      <line x1="420" y1="408" x2="420" y2="424" stroke="#64748b" strokeWidth="1.5" />
      <line x1="550" y1="408" x2="550" y2="424" stroke="#64748b" strokeWidth="1.5" />

      <g onClick={() => onSelectNode('pos-program-events')} className="cursor-pointer hover:opacity-90">
        <rect x="230" y="424" width="120" height="40" rx="8" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="290" y="448" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1f2937">
          PROGRAM EVENTS
        </text>
      </g>
      <g onClick={() => onSelectNode('pos-apostolic')} className="cursor-pointer hover:opacity-90">
        <rect x="360" y="424" width="120" height="40" rx="8" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="420" y="448" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1f2937">
          APOSTOLIC
        </text>
      </g>
      <g onClick={() => onSelectNode('pos-skill-dev')} className="cursor-pointer hover:opacity-90">
        <rect x="490" y="424" width="120" height="40" rx="8" fill="#d9f99d" stroke="#84cc16" strokeWidth="1.3" />
        <text x="550" y="448" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1f2937">
          SKILL &amp; DEVELOP.
        </text>
      </g>
    </svg>
  );
};

export const SinodalRegionalOrgSvg: React.FC = () => {
  const regShort = [
    { title: 'Sumatera', center: 'Medan' },
    { title: 'Jabodetabek', center: 'Jakarta' },
    { title: 'Jawa Tengah', center: 'Semarang' },
    { title: 'Jatim & Ind. Timur', center: 'Sidoarjo' },
    { title: 'Jawa Barat', center: 'Bandung' },
    { title: 'Sulampapua', center: 'Makassar' },
    { title: 'Kalimantan', center: 'Balikpapan' },
    { title: 'South East Asia', center: 'Singapore' },
  ];

  const categories = [
    { cat: 'KATEGORI A', sub: 'Perintisan', cap: '< 250 Orang', fill: '#f8fafc', stroke: '#94a3b8', text: '#334155' },
    { cat: 'KATEGORI B', sub: 'Satelit Awal', cap: '250 – 500 Orang', fill: '#f0fdf4', stroke: '#22c55e', text: '#166534' },
    { cat: 'KATEGORI C', sub: 'Lokal Menengah', cap: '500 – 750 Orang', fill: '#eff6ff', stroke: '#3b82f6', text: '#1e40af' },
    { cat: 'KATEGORI D', sub: 'Lokal Besar', cap: '750 – 1.000 Orang', fill: '#faf5ff', stroke: '#a855f7', text: '#6b21a8' },
    { cat: 'KATEGORI E', sub: 'Distrik / Regional', cap: '+/- 1.000+ • Staff FT', fill: '#fdf2f5', stroke: '#EE2E65', text: '#be123c' },
  ];

  return (
    <svg
      id="sinodal-chart-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1160 490"
      className="w-full h-auto block bg-white"
    >
      <rect width="1160" height="490" fill="#ffffff" />
      <text
        x="580"
        y="34"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#111827"
      >
        HIERARKI SINODAL &amp; 8 GMS REGIONAL
      </text>
      <text
        x="580"
        y="53"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#EE2E65"
      >
        Platform GMS II Rev II — Sinode Surabaya Barat → 8 Regional → GMS Lokal &amp; Perintisan (Kategori A–E)
      </text>

      <rect x="390" y="76" width="380" height="62" rx="12" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.6" />
      <text x="580" y="102" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e3a8a">
        SINODE GEREJA MAWAR SHARON II
      </text>
      <text x="580" y="122" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#1d4ed8">
        Pusat: GMS Surabaya Barat • Dept. Multimedia Sinode
      </text>

      <line x1="580" y1="138" x2="580" y2="184" stroke="#64748b" strokeWidth="1.6" />
      <line x1="90" y1="184" x2="1070" y2="184" stroke="#64748b" strokeWidth="1.6" />

      {regShort.map((r, i) => {
        const x = 26 + i * 140;
        const cx = x + 64;
        return (
          <React.Fragment key={r.title}>
            <line x1={cx} y1="184" x2={cx} y2="210" stroke="#64748b" strokeWidth="1.4" />
            <line x1={cx} y1="276" x2={cx} y2="306" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3,3" />
            <rect x={x} y="210" width="128" height="66" rx="9" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.3" />
            <text x={cx} y="236" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#1e1b4b">
              {r.title}
            </text>
            <rect x={x + 20} y="246" width="88" height="20" rx="10" fill="#ffffff" stroke="#c7d2fe" strokeWidth="1" />
            <text x={cx} y="259" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#4f46e5">
              {r.center}
            </text>
          </React.Fragment>
        );
      })}

      <line x1="90" y1="306" x2="1070" y2="306" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="580" y1="306" x2="580" y2="322" stroke="#64748b" strokeWidth="1.6" />
      <rect x="370" y="322" width="420" height="30" rx="15" fill="#EE2E65" />
      <text x="580" y="341" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">
        GMS LOKAL &amp; GEREJA PERINTISAN (KATEGORI A – E)
      </text>
      <line x1="580" y1="352" x2="580" y2="364" stroke="#64748b" strokeWidth="1.5" />
      <line x1="140" y1="364" x2="1020" y2="364" stroke="#64748b" strokeWidth="1.5" />

      {categories.map((c, i) => {
        const x = 40 + i * 220;
        const cx = x + 100;
        return (
          <React.Fragment key={c.cat}>
            <line x1={cx} y1="364" x2={cx} y2="386" stroke="#64748b" strokeWidth="1.4" />
            <rect x={x} y="386" width="200" height="72" rx="10" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
            <text x={cx} y="410" textAnchor="middle" fontSize="11" fontWeight="800" fill={c.text}>
              {c.cat}
            </text>
            <text x={cx} y="427" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#374151">
              {c.sub}
            </text>
            <text x={cx} y="445" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6b7280">
              {c.cap}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
};
