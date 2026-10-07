'use client'

import { motion } from 'framer-motion'
import { Lightbulb, PenTool, Printer, Truck } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const steps = [
  { icon: Lightbulb, title: 'Idea', description: 'It starts with a need, a sketch or a spark. Yours or ours.' },
  { icon: PenTool, title: 'Design', description: 'We model it in 3D and refine every detail until it is right.' },
  { icon: Printer, title: 'Print', description: 'Printed layer by layer, then cleaned, checked and finished.' },
  { icon: Truck, title: 'Deliver', description: 'Packed with care and delivered to your doorstep.' },
]

export function HowItWorks() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it's made"
          title="From idea to your doorstep"
          align="center"
        />

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-0.5 origin-left bg-gradient-to-r from-primary via-primary/60 to-accent lg:block"
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
