'use client'

import { motion } from 'framer-motion'
import { Clock, Layers, Box } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { LayerPrintAnimation } from '@/components/home/layer-print-animation'
import { VideoFrame } from '@/components/home/video-frame'
import { videos } from '@/lib/site-content'
import { cn } from '@/lib/utils'

const steps = [
  {
    title: 'Design it',
    text: 'Every print starts as a 3D model on a computer, made from your sketch, photo, file or an existing part.',
  },
  {
    title: 'Slice it',
    text: 'Software cuts the model into hundreds of very thin horizontal layers and plans the printer’s path.',
  },
  {
    title: 'Print it',
    text: 'The printer melts filament and draws each layer on top of the last, until the object stands complete.',
  },
]

const facts = [
  { icon: Layers, text: 'Layers about 0.1–0.3 mm thin' },
  { icon: Box, text: 'No moulds or tooling needed' },
  { icon: Clock, text: 'From file to object in hours' },
]

export function WhatIs3DPrinting() {
  return (
    <section id="what-is-3d-printing" className="relative w-full scroll-mt-24 overflow-hidden bg-[#121417] py-24 text-white">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="container-site relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What is 3D printing?"
              title="Building real objects, one thin layer at a time"
              description="3D printing makes an object by adding material layer by layer, instead of carving it away or pouring it into a mould. That is why one-off and custom pieces become affordable."
              tone="dark"
              className="mb-10"
            />

            <ol className="space-y-6">
              {steps.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className="flex gap-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-base font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-white/65">{step.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <ul className="mt-10 flex flex-wrap gap-3">
              {facts.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/80"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <VideoFrame
              src={videos.whatIs3dPrinting}
              poster={videos.whatIs3dPrintingPoster}
              title="What is 3D printing"
              className={cn(
                'rounded-[28px] border border-white/10 bg-white/[0.04] shadow-soft-lg',
                // The real video is 16:9 with captions at the bottom, so show it uncropped
                videos.whatIs3dPrinting ? 'aspect-video' : 'aspect-square sm:aspect-[4/3]'
              )}
              fallback={
                <div className="flex h-full w-full items-center justify-center p-6">
                  <LayerPrintAnimation className="h-full max-h-[440px] w-auto" />
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
