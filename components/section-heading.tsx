'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  action?: React.ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        <h2
          className={cn(
            'font-heading text-4xl font-bold tracking-tight text-balance lg:text-5xl',
            tone === 'light' ? 'text-foreground' : 'text-white'
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn('mt-4 text-lg', tone === 'light' ? 'text-muted-foreground' : 'text-white/70')}>
            {description}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  )
}
