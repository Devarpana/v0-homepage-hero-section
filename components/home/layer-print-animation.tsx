'use client'

import { motion, useReducedMotion } from 'framer-motion'

// A printer nozzle building a vase one layer at a time: the simplest picture of what 3D printing is.
const LAYERS = 18
const LAYER_H = 12
const BED_Y = 330
const CENTER_X = 200
const LAYER_TIME = 0.28 // seconds per layer
const BUILD = LAYERS * LAYER_TIME
const CYCLE = BUILD + 2.2 // build, hold, then start again

// Vase profile: width of each layer from the bottom up.
const widths = Array.from({ length: LAYERS }, (_, i) => {
  const t = i / (LAYERS - 1)
  return 120 + 70 * Math.sin(Math.PI * (0.15 + t * 0.85)) - 30 * t
})

const layerColor = (i: number) => (i % 2 === 0 ? '#e08e3c' : '#eda15a')

export function LayerPrintAnimation({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const reduce = useReducedMotion()
  const line = tone === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(35,69,141,0.18)'
  const metal = tone === 'dark' ? '#d9dde6' : '#23458d'

  // Nozzle height follows the layer being printed, then lifts away while the vase is shown.
  const nozzleYs = [...widths.map((_, i) => BED_Y - (i + 1) * LAYER_H - 4), BED_Y - LAYERS * LAYER_H - 40, BED_Y - 16]
  const nozzleTimes = [...widths.map((_, i) => ((i + 0.5) * LAYER_TIME) / CYCLE), (BUILD + 0.4) / CYCLE, 1]

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="A 3D printer building an object layer by layer">
      {/* Frame and gantry */}
      <rect x="40" y="30" width="320" height="320" rx="18" fill="none" stroke={line} strokeWidth="2" />
      <line x1="40" y1={BED_Y + 6} x2="360" y2={BED_Y + 6} stroke={line} strokeWidth="2" />
      <rect x="70" y={BED_Y} width="260" height="8" rx="3" fill={tone === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(35,69,141,0.22)'} />

      {/* Layers */}
      {widths.map((w, i) => {
        const start = (i * LAYER_TIME) / CYCLE
        const end = ((i + 1) * LAYER_TIME) / CYCLE
        return (
          <motion.rect
            key={i}
            x={CENTER_X - w / 2}
            y={BED_Y - (i + 1) * LAYER_H}
            width={w}
            height={LAYER_H - 1.5}
            rx={LAYER_H / 2}
            fill={layerColor(i)}
            style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={reduce ? { scaleX: 1 } : { scaleX: [0, 0, 1, 1, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: CYCLE, times: [0, start, end, 0.96, 1], repeat: Infinity, ease: 'linear' }
            }
          />
        )
      })}

      {/* Nozzle */}
      {!reduce && (
        <motion.g
          animate={{ y: nozzleYs.map((y) => y - 60) }}
          transition={{ duration: CYCLE, times: nozzleTimes, repeat: Infinity, ease: 'linear' }}
        >
          <motion.g
            animate={{ x: [-70, 70] }}
            transition={{ duration: LAYER_TIME, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          >
            <rect x={CENTER_X - 22} y="0" width="44" height="34" rx="6" fill={metal} />
            <rect x={CENTER_X - 14} y="6" width="28" height="4" rx="2" fill="#23458d" opacity="0.5" />
            <path d={`M${CENTER_X - 10} 34 L${CENTER_X + 10} 34 L${CENTER_X + 3} 50 L${CENTER_X - 3} 50 Z`} fill={metal} />
            <circle cx={CENTER_X} cy="54" r="3" fill="#ffb066" />
          </motion.g>
        </motion.g>
      )}
    </svg>
  )
}
