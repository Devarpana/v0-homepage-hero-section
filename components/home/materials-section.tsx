'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { materials, type Material } from '@/lib/site-content'
import { cn } from '@/lib/utils'

export function MaterialsSection() {
  return (
    <section id="materials" className="w-full scroll-mt-24 bg-muted py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Materials"
          title="The right material for every part"
          description="We print with tried and trusted filaments. Here is how each one behaves, and how your finished object will look and feel."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {materials.map((material, index) => (
            <motion.div
              key={material.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MaterialCard material={material} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: materials.length * 0.1 }}
            className="flex flex-col justify-between rounded-[28px] border-2 border-dashed border-primary/20 bg-white/60 p-8"
          >
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Plus className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">Need something else?</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Flexible, heat-resistant or special finishes: tell us what your part has to do, and we will recommend
                and source the right material.
              </p>
            </div>
            <Link
              href="/custom-orders#custom-form"
              className="mt-8 inline-flex items-center gap-2 font-heading font-semibold text-primary hover:text-accent"
            >
              Ask about materials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Values are typical for each filament type and vary slightly by brand and colour.
        </p>
      </div>
    </section>
  )
}

function MaterialCard({ material }: { material: Material }) {
  const [color, setColor] = useState(material.swatches[0])

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-white shadow-soft">
      {/* Sample print, re-coloured live, or a real photo when one is set */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f6f7fa] to-[#eceff5]">
        {material.image ? (
          <img src={material.image} alt={`Object printed in ${material.name}`} className="h-full w-full object-cover" />
        ) : (
          <SamplePrint color={color} finish={material.finish} />
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-foreground">
          {material.finish} finish
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

// A layered vase drawn in the chosen colour. Glossy prints get a bright highlight, matte ones a soft one.
function SamplePrint({ color, finish }: { color: string; finish: 'matte' | 'glossy' }) {
  const layers = 22
  const id = `${finish}-${color.replace('#', '')}`
  return (
    <svg viewBox="0 0 300 225" className="h-full w-full" role="img" aria-label={`Sample print, ${finish} finish`}>
      <defs>
        <linearGradient id={`shade-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#fff" stopOpacity={finish === 'glossy' ? 0.55 : 0.12} />
          <stop offset="0.45" stopColor="#fff" stopOpacity={finish === 'glossy' ? 0.15 : 0.06} />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="200" rx="70" ry="9" fill="#1e2330" opacity="0.12" />
      {Array.from({ length: layers }, (_, i) => {
        const t = i / (layers - 1)
        const w = 70 + 55 * Math.sin(Math.PI * (0.12 + t * 0.8)) - 20 * t
        const y = 196 - (i + 1) * 7.4
        return (
          <g key={i}>
            <rect x={150 - w / 2} y={y} width={w} height={7} rx={3.5} fill={color} />
            <rect x={150 - w / 2} y={y} width={w} height={7} rx={3.5} fill={`url(#shade-${id})`} />
          </g>
        )
      })}
    </svg>
  )
}
