import { useId } from 'react'
import type { MaterialVisual as Kind } from '@/lib/site-content'

// One drawing per material, all in the same style: a typical object for that material,
// printed in the chosen colour with visible layer lines, plus a small cue for what it is good at.
export function MaterialVisual({ kind, color, finish }: { kind: Kind; color: string; finish: 'matte' | 'glossy' }) {
  const uid = useId().replace(/:/g, '')
  const shade = `shade-${uid}`
  const lines = `lines-${uid}`
  const fill = { fill: color }
  const over = (props: React.SVGProps<SVGPathElement>) => (
    <>
      <path {...props} fill={`url(#${lines})`} />
      <path {...props} fill={`url(#${shade})`} />
    </>
  )

  return (
    <svg viewBox="0 0 300 225" className="h-full w-full" role="img" aria-label={`Sample ${kind} print, ${finish} finish`}>
      <defs>
        <linearGradient id={shade} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#fff" stopOpacity={finish === 'glossy' ? 0.55 : 0.12} />
          <stop offset="0.45" stopColor="#fff" stopOpacity={finish === 'glossy' ? 0.15 : 0.06} />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        {/* Fine horizontal layer lines, the signature of a 3D print */}
        <pattern id={lines} width="6" height="3.2" patternUnits="userSpaceOnUse">
          <rect width="6" height="0.9" fill="#000" opacity="0.14" />
        </pattern>
        <pattern id={`weave-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#fff" opacity="0.07" />
          <rect x="4" y="4" width="4" height="4" fill="#fff" opacity="0.07" />
        </pattern>
      </defs>
      <ellipse cx="150" cy="200" rx="78" ry="9" fill="#1e2330" opacity="0.12" />

      {kind === 'vase' && <Vase color={color} shade={shade} />}

      {kind === 'bottle' && (
        <g>
          {/* Glossy, slightly see-through container with water inside */}
          <path d="M128 40h44v14c0 6 22 12 22 30v104a10 10 0 0 1-10 10h-68a10 10 0 0 1-10-10V84c0-18 22-24 22-30z" {...fill} opacity="0.78" />
          <path d="M112 120c12-6 24 6 38 0s26-6 38 0v68a8 8 0 0 1-8 8h-60a8 8 0 0 1-8-8z" fill="#9fd3ff" opacity="0.45" />
          {over({ d: 'M128 40h44v14c0 6 22 12 22 30v104a10 10 0 0 1-10 10h-68a10 10 0 0 1-10-10V84c0-18 22-24 22-30z' })}
          <rect x="124" y="30" width="52" height="14" rx="4" fill="#1e2330" opacity="0.85" />
          <path d="M214 92c0 6-4 10-8 10s-8-4-8-10 8-16 8-16 8 10 8 16z" fill="#7fc3ff" />
          <path d="M232 128c0 4-3 7-6 7s-6-3-6-7 6-11 6-11 6 7 6 11z" fill="#7fc3ff" opacity="0.8" />
        </g>
      )}

      {kind === 'enclosure' && (
        <g>
          {/* Electronics box: strong and heat-resistant */}
          <path d="M70 110l80-34 80 34-80 34z" {...fill} />
          <path d="M70 110v58l80 34v-58z" {...fill} />
          <path d="M230 110v58l-80 34v-58z" {...fill} />
          <path d="M70 110l80-34 80 34-80 34z" fill="#fff" opacity="0.22" />
          {over({ d: 'M70 110v58l80 34v-58z' })}
          {over({ d: 'M230 110v58l-80 34v-58z' })}
          <path d="M70 110v58l80 34v-58z" fill="#000" opacity="0.12" />
          <circle cx="104" cy="110" r="3.5" fill="#1e2330" opacity="0.5" />
          <circle cx="196" cy="110" r="3.5" fill="#1e2330" opacity="0.5" />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${126 + i * 24} 64c-6-8 6-14 0-22s6-14 0-22`}
              fill="none"
              stroke="#e08e3c"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          ))}
        </g>
      )}

      {kind === 'sign' && (
        <g>
          {/* Outdoor sign: keeps its colour in the sun */}
          <circle cx="240" cy="46" r="18" fill="#f2b33d" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (Math.PI / 4) * i
            return (
              <line
                key={i}
                x1={240 + 25 * Math.cos(a)}
                y1={46 + 25 * Math.sin(a)}
                x2={240 + 34 * Math.cos(a)}
                y2={46 + 34 * Math.sin(a)}
                stroke="#f2b33d"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )
          })}
          <rect x="138" y="128" width="10" height="72" fill="#7f8c8d" />
          <rect x="74" y="72" width="138" height="66" rx="10" {...fill} />
          <rect x="74" y="72" width="138" height="66" rx="10" fill={`url(#${lines})`} />
          <rect x="74" y="72" width="138" height="66" rx="10" fill={`url(#${shade})`} />
          <rect x="92" y="94" width="72" height="8" rx="4" fill="#fff" opacity="0.6" />
          <rect x="92" y="110" width="48" height="8" rx="4" fill="#fff" opacity="0.4" />
        </g>
      )}

      {kind === 'flex' && (
        <g>
          {/* A flexible strap, bent, with arrows showing it springs back */}
          <path d="M60 170c30-90 150-90 180 0" fill="none" stroke={color} strokeWidth="34" strokeLinecap="round" />
          {[-12, -4, 4, 12].map((o) => (
            <path
              key={o}
              d={`M${60 - o * 0.3} ${170 - o * 0.2}c30-${90 + o} 150-${90 + o} ${180 + o * 0.6} 0`}
              fill="none"
              stroke="#000"
              strokeOpacity="0.12"
              strokeWidth="1.2"
            />
          ))}
          <path d="M60 170c30-90 150-90 180 0" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="8" transform="translate(0 -8)" />
          <path
            d="M108 52q42-22 84 0M116 42l-8 10 12 4M184 42l8 10-12 4"
            fill="none"
            stroke="#23458d"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {kind === 'frame' && (
        <g>
          {/* Drone frame from above: stiff, light arms with a carbon weave */}
          {[45, -45].map((r) => (
            <g key={r} transform={`rotate(${r} 150 112)`}>
              <rect x="62" y="100" width="176" height="24" rx="12" {...fill} />
              <rect x="62" y="100" width="176" height="24" rx="12" fill={`url(#weave-${uid})`} />
            </g>
          ))}
          {[
            [88, 50],
            [212, 50],
            [88, 174],
            [212, 174],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="24" fill="none" stroke="#9aa3b2" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx={x} cy={y} r="11" {...fill} />
              <circle cx={x} cy={y} r="4" fill="#9aa3b2" />
            </g>
          ))}
          <rect x="124" y="88" width="52" height="48" rx="10" {...fill} />
          <rect x="124" y="88" width="52" height="48" rx="10" fill={`url(#weave-${uid})`} />
          <rect x="124" y="88" width="52" height="48" rx="10" fill={`url(#${shade})`} />
        </g>
      )}
    </svg>
  )
}

// A layered vase. Glossy prints get a bright highlight, matte ones a soft one.
function Vase({ color, shade }: { color: string; shade: string }) {
  const layers = 22
  return (
    <g>
      {Array.from({ length: layers }, (_, i) => {
        const t = i / (layers - 1)
        const w = 70 + 55 * Math.sin(Math.PI * (0.12 + t * 0.8)) - 20 * t
        const y = 196 - (i + 1) * 7.4
        return (
          <g key={i}>
            <rect x={150 - w / 2} y={y} width={w} height={7} rx={3.5} fill={color} />
            <rect x={150 - w / 2} y={y} width={w} height={7} rx={3.5} fill={`url(#${shade})`} />
          </g>
        )
      })}
    </g>
  )
}
