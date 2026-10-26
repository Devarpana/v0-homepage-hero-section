'use client'

import { motion } from 'framer-motion'
import { FileUp, MessageSquareText, PackageCheck } from 'lucide-react'

const steps = [
  { icon: MessageSquareText, title: 'Tell us what you need', text: 'Pick a service and describe it in your own words.' },
  { icon: FileUp, title: 'Add a photo or file', text: 'A sketch, a photo of a broken part or a 3D file all help.' },
  { icon: PackageCheck, title: 'Get advice and a price', text: 'We reply with the best material, a price and a time.' },
]

export function QuoteHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#121417] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,142,60,0.28),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />

      <div className="container-site relative z-10 pb-16 pt-32 lg:pb-20 lg:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
        >
          Get a quote
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Tell us your idea. <span className="text-accent">We’ll make it real.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75"
        >
          No technical knowledge needed. Share what you have, and we come back with advice and a clear price. Asking is
          free.
        </motion.p>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold">
                  <span className="text-accent">{index + 1}.</span> {title}
                </p>
                <p className="mt-1 text-sm text-white/65">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
