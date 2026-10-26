'use client'

import { motion } from 'framer-motion'
import { Building2, GraduationCap, Layers, MapPin } from 'lucide-react'
import { company, materials, services } from '@/lib/site-content'
import { cn } from '@/lib/utils'

// Our story told as printed layers, stacked from the first idea to today.
const layers = [
  {
    icon: GraduationCap,
    tag: 'Layer 01 · The idea',
    title: `Born at ${company.origin}`,
    text: `XYZ Layers started at ${company.origin}, one of India’s leading engineering institutes. Ideas there need real parts to be tested, and we bring that same spirit to every order: turn designs into real objects, quickly and carefully.`,
  },
  {
    icon: Building2,
    tag: 'Layer 02 · The company',
    title: company.legalName,
    text: `XYZ Layers is a brand of ${company.legalName}, a registered Indian company. Students, businesses and researchers work with a proper company behind every order.`,
  },
  {
    icon: Layers,
    tag: 'Layer 03 · The name',
    title: 'Why “XYZ Layers”?',
    text: 'X, Y and Z are the three directions every 3D printer moves in. Layers are how every object is built. Our name is simply how we work.',
  },
  {
    icon: MapPin,
    tag: 'Layer 04 · Today',
    title: 'Serving customers across India',
    text: `Today we offer ${services.length} services, from reverse engineering to custom gifts, in ${materials.length} materials, for customers all over India.`,
  },
]

export function StoryLayers() {
  return (
    <section id="our-story" className="w-full scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our story</p>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-5xl">
            Every great thing is built one layer at a time. <span className="text-primary">So were we.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            From a campus idea to a registered company serving all of India.
          </p>
        </div>

        <ol className="relative space-y-5">
          {/* The print line connecting the layers */}
          <span className="absolute bottom-6 left-[21px] top-6 w-px sm:left-[27px] bg-gradient-to-b from-accent via-accent/50 to-primary/40" aria-hidden />
          {layers.map(({ icon: Icon, tag, title, text }, index) => (
            <motion.li
              key={tag}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative flex gap-3 sm:gap-5"
            >
              <span
                className={cn(
                  'relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-soft sm:h-14 sm:w-14 sm:rounded-2xl',
                  index === 1 ? 'bg-primary text-white' : 'bg-accent text-white'
                )}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div
                className={cn(
                  'min-w-0 flex-1 rounded-[24px] border p-5 transition-shadow hover:shadow-soft-lg sm:p-7',
                  index === 1 ? 'border-primary/20 bg-primary/[0.04]' : 'border-border bg-white shadow-soft'
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{tag}</p>
                <h3 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
