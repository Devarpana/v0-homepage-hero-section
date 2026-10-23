'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, PenTool, Printer, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LayerPrintAnimation } from '@/components/home/layer-print-animation'

const highlights = [
  { icon: PenTool, label: 'Design & modelling' },
  { icon: ScanLine, label: 'Reverse engineering' },
  { icon: Printer, label: 'Prototyping & printing' },
]

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export function ServicesHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f1830] text-white">
      {/* Brand glow and print-bed grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(35,69,141,0.65),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full bg-accent/25 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-site relative z-10 pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            className="flex flex-col gap-8"
          >
            <motion.span
              variants={item}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              3D printing studio, India
            </motion.span>

            <motion.h1
              variants={item}
              className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              From idea to object, <span className="text-accent">layer by layer.</span>
            </motion.h1>

            <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-white/75">
              XYZ Layers designs, reverse-engineers, prototypes and 3D prints for people and businesses. Bring us a
              sketch, a broken part or a 3D file, and we will make it real.
            </motion.p>

            <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-accent px-8 font-heading text-base font-semibold text-white shadow-soft-lg hover:bg-accent/90"
              >
                <Link href="/custom-orders#custom-form">
                  Get a quote
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/25 bg-transparent px-8 font-heading text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#services">Explore our services</Link>
              </Button>
            </motion.div>

            <motion.ul variants={item} className="flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white/85"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-soft-lg backdrop-blur">
              <LayerPrintAnimation className="h-auto w-full" />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl border border-white/10 bg-[#0f1830]/90 px-5 py-3 backdrop-blur sm:-left-6">
              <p className="text-xs uppercase tracking-wider text-white/50">Printing now</p>
              <p className="font-heading text-sm font-semibold">One layer at a time, about 0.2 mm each</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
