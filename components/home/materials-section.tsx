'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Droplets, Feather, Flame, Leaf, Plus, Sun, Waves } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { MaterialVisual } from '@/components/home/material-visual'
import { materials, type Material, type MaterialCue } from '@/lib/site-content'
import { cn } from '@/lib/utils'

export function MaterialsSection() {
  return (
    <section id="materials" className="w-full scroll-mt-24 bg-muted py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Materials"
          title="Choose your material"
          description="Not sure? Tell us what the part needs to do and we’ll pick for you. Here is how each filament behaves, and how your finished object will look and feel."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <MaterialCard material={material} />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-[28px] border-2 border-dashed border-primary/20 bg-white/60 p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Plus className="h-7 w-7" />
            </span>
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Need something else?</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                Special colours, finishes or properties: tell us what your part has to do, and we will recommend and
                source the right material.
              </p>
            </div>
          </div>
          <Link
            href="/custom-orders#custom-form"
            className="inline-flex shrink-0 items-center gap-2 font-heading font-semibold text-primary hover:text-accent"
          >
            Ask about materials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Values are typical for each filament type and vary slightly by brand and colour.
        </p>
      </div>
    </section>
  )
}

const cueIcons: Record<MaterialCue, typeof Leaf> = {
  plant: Leaf,
  water: Droplets,
  heat: Flame,
  sun: Sun,
  flex: Waves,
  light: Feather,
}

function MaterialCard({ material }: { material: Material }) {
  const [color, setColor] = useState(material.swatches[0])
  const CueIcon = cueIcons[material.cue.icon]

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-white shadow-soft">
      {/* Sample print, re-coloured live, or a real photo when one is set */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f6f7fa] to-[#eceff5]">
        {material.image ? (
          <img src={material.image} alt={`Object printed in ${material.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <MaterialVisual kind={material.visual} color={color} finish={material.finish} />
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-foreground">
          {material.finish} finish
        </span>
        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          <CueIcon className="h-3.5 w-3.5" />
          {material.cue.label}
        </span>
        {!material.image && (
          <div className="absolute bottom-4 right-5 flex gap-2" aria-label="Preview colours">
            {material.swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => setColor(swatch)}
                className={cn(
                  'h-6 w-6 rounded-full border-2 transition-transform hover:scale-110',
                  swatch === color ? 'border-primary ring-2 ring-primary/30' : 'border-white'
                )}
                style={{ backgroundColor: swatch }}
                aria-label={`Show in ${swatch}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-3xl font-bold text-foreground">{material.name}</h3>
          <p className="text-right text-xs text-muted-foreground">{material.fullName}</p>
        </div>
        <p className="mt-3 font-heading font-medium text-primary">{material.speciality}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">How it looks: </span>
          {material.look}
        </p>

        <dl className="mt-6 space-y-2.5">
          {material.ratings.map((rating) => (
            <div key={rating.label} className="grid grid-cols-[120px_1fr] items-center gap-3">
              <dt className="text-sm text-foreground/75">{rating.label}</dt>
              <dd className="flex gap-1" aria-label={`${rating.value} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={cn('h-2 flex-1 rounded-full', i < rating.value ? 'bg-accent' : 'bg-muted')} />
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6">
          {material.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">{spec.label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-foreground">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {material.bestFor.map((use) => (
            <span key={use} className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              {use}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
