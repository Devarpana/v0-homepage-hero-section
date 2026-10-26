'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, GraduationCap, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { company } from '@/lib/site-content'

const hexagon = (r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`
  }).join(' ')

const chips = [
  { icon: GraduationCap, text: `Born at ${company.origin}`, className: 'left-0 top-[12%]' },
  { icon: Building2, text: 'Registered company', className: 'right-0 top-[74%]' },
  { icon: MapPin, text: 'Serving all of India', className: 'bottom-[2%] left-[4%]' },
]

export function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#121417] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,60,0.28),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="container-site relative z-10 grid grid-cols-1 items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-40">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80"
          >
            <Building2 className="h-3.5 w-3.5 text-accent" />
            A brand of {company.legalName}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-heading text-4xl font-bold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Born at IIT Guwahati. <span className="text-accent">Built layer by layer.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            XYZ Layers is a 3D printing and design brand of {company.legalName}, a registered company that started at{' '}
            {company.origin}. We make reliable, affordable 3D printing easy for anyone in India with an idea.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="h-14 rounded-full bg-accent px-8 font-heading text-base font-semibold hover:bg-accent/90">
              <Link href="/custom-orders#custom-form">
                Start a project
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/25 bg-transparent px-8 font-heading text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#our-story">Read our story</Link>
            </Button>
          </motion.div>
        </div>

        {/* Logo inside concentric layers, echoing the brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[460px]"
        >
          <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            {[48, 40, 32, 24].map((r, i) => (
              <motion.polygon
                key={r}
                points={hexagon(r)}
                fill="none"
                stroke={i === 0 ? 'rgba(224,142,60,0.55)' : 'rgba(255,255,255,0.14)'}
                strokeWidth={i === 0 ? 0.6 : 0.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </svg>
          <div className="absolute inset-[30%] flex items-center justify-center rounded-full bg-white shadow-soft-lg">
            <Image src="/logo-mark.png" alt="XYZ Layers logo" width={120} height={144} className="h-[62%] w-auto" />
          </div>
          {chips.map(({ icon: Icon, text, className }, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
              className={`absolute flex items-center gap-2 rounded-full border border-white/10 bg-[#121417]/85 px-4 py-2 text-xs font-semibold text-white shadow-soft-lg backdrop-blur sm:text-sm ${className}`}
            >
              <Icon className="h-4 w-4 text-accent" />
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
