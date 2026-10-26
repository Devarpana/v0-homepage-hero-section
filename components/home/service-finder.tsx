'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { serviceIcons } from '@/components/home/service-icon'
import { serviceFinder, services } from '@/lib/site-content'
import { cn } from '@/lib/utils'

// Plain-language guide: pick the situation you are in, see which service fits and what happens next.
export function ServiceFinder() {
  const [index, setIndex] = useState(0)
  const choice = serviceFinder[index]
  const service = services.find((s) => s.slug === choice.service)!
  const Icon = serviceIcons[service.icon]

  return (
    <section id="which-service" className="w-full scroll-mt-24 bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Not sure what you need?"
          title="Tell us where you are. We’ll show you the way."
          description="No technical words needed. Choose the sentence that sounds most like you."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className="flex flex-col gap-3">
            {serviceFinder.map((item, i) => (
              <li key={item.situation}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all',
                    i === index
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border bg-white hover:border-primary/40 hover:bg-muted'
                  )}
                >
                  <CircleHelp className={cn('h-5 w-5 shrink-0', i === index ? 'text-accent' : 'text-foreground/30')} />
                  <span className={cn('font-medium', i === index ? 'text-foreground' : 'text-foreground/75')}>
                    “{item.situation}”
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={choice.situation}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col overflow-hidden rounded-[28px] bg-primary p-8 text-white lg:p-10"
            >
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/40 blur-[90px]" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">The right service for you</p>
              <div className="mt-5 flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-7 w-7 text-accent" />
                </span>
                <h3 className="font-heading text-3xl font-bold">{service.name}</h3>
              </div>
              <p className="relative mt-6 text-lg leading-relaxed text-white/85">{choice.answer}</p>

              <p className="relative mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">What happens next</p>
              <ol className="relative mt-3 grid gap-2 text-sm text-white/85 sm:grid-cols-3">
                {['You share what you have', 'We reply with advice and a quote', 'We make it and deliver'].map((step, i) => (
                  <li key={step} className="flex gap-2 rounded-xl bg-white/10 px-3 py-2.5">
                    <span className="font-heading font-bold text-accent">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="relative mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 font-heading font-semibold hover:bg-accent/90">
                  <Link href={`/custom-orders?service=${service.slug}#custom-form`}>
                    Ask for this
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/30 bg-transparent px-7 font-heading font-semibold text-white hover:bg-white/10 hover:text-white"
                >
                  {/* Plain link so the browser fires hashchange, which switches the services tab */}
                  <a href={`#service-${service.slug}`}>Learn about this service</a>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
