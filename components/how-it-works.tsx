'use client'

import { motion } from 'framer-motion'
import { Lightbulb, PenTool, Printer, SearchCheck, Truck } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const steps = [
  { icon: Lightbulb, title: 'Share', description: 'Send a sketch, photo, 3D file or the part itself, and tell us what it needs to do.' },
  { icon: PenTool, title: 'Design', description: 'We model or scan it in 3D and suggest the right material.' },
  { icon: SearchCheck, title: 'Approve', description: 'You see previews and a clear quote before anything is printed.' },
  { icon: Printer, title: 'Print', description: 'Printed layer by layer, then cleaned, finished and checked.' },
  { icon: Truck, title: 'Deliver', description: 'Packed with care and delivered to your door, with the file if you want it.' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full scroll-mt-24 bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title="From your idea to your doorstep"
          align="center"
        />

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* Connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 origin-left bg-gradient-to-r from-primary via-primary/60 to-accent lg:block"
          />

          {steps.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-white text-primary shadow-soft">
                <Icon className="h-8 w-8" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent font-heading text-xs font-bold text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">{title}</h3>
              <p className="mt-2 max-w-60 leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
