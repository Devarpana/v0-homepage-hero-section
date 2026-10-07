'use client'

import { motion } from 'framer-motion'
import { Crosshair, MapPin, Wand2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const reasons = [
  {
    icon: MapPin,
    title: 'Designed & printed in India',
    description: 'Every piece is designed and printed by our own team in India, supporting local makers and innovation.',
  },
  {
    icon: Crosshair,
    title: 'Precision in every layer',
    description: 'Each product is checked for fit, finish and strength before it leaves our workshop.',
  },
  {
    icon: Wand2,
    title: 'Made to be yours',
    description: 'Choose colours, add names or bring your own idea. Personalisation is built into what we do.',
  },
]

export function WhyXYZLayers() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why XYZ Layers"
          title="Small brand. Serious craft."
          description="A modern Indian brand creating smart products through 3D printing."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/[0.07] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
