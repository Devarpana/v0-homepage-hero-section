import { cn } from '@/lib/utils'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  tone?: 'light' | 'dark'
}

// Concentric hexagons, echoing the layered lines of the XYZ Layers logo.
function LayeredHexagon({ className }: { className?: string }) {
  const rings = [44, 36, 28, 20]
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {rings.map((r) => {
        const points = Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2
          return `${(r * Math.cos(angle)).toFixed(2)},${(r * Math.sin(angle)).toFixed(2)}`
        }).join(' ')
        return (
          <polygon
            key={r}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}

/**
 * Product photo with a branded placeholder for products that have no photo yet.
 * Fills its parent, so the parent sets the aspect ratio (4:5 for product cards).
 */
export function ProductImage({ src, alt, className, tone = 'light' }: ProductImageProps) {
  if (src) {
    return <img src={src} alt={alt} className={cn('h-full w-full object-cover', className)} />
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        tone === 'light'
          ? 'bg-gradient-to-br from-[#eef2fa] via-[#f6f7fa] to-[#fdf3e9] text-primary/25'
          : 'bg-gradient-to-br from-white/10 to-white/0 text-white/25',
        className
      )}
    >
      <LayeredHexagon className="w-1/2 max-w-48 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[30deg]" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
    </div>
  )
}
