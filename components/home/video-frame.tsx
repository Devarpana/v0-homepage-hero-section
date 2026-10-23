'use client'

import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

// Shows the video when one is set; otherwise shows the fallback (an animation or "coming soon" card).
export function VideoFrame({
  src,
  poster,
  title,
  fallback,
  className,
}: {
  src: string | null
  poster?: string | null
  title: string
  fallback: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  if (!src) return <div className={cn('relative overflow-hidden', className)}>{fallback}</div>

  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <video
        ref={ref}
        src={src}
        poster={poster ?? undefined}
        controls={playing}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        aria-label={title}
      />
      {!playing && (
        <button
          type="button"
          onClick={() => ref.current?.play()}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          aria-label={`Play: ${title}`}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-primary shadow-soft-lg transition-transform group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
        </button>
      )}
    </div>
  )
}
