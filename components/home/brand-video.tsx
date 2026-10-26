'use client'

import { motion } from 'framer-motion'
import { Clapperboard } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { LayerPrintAnimation } from '@/components/home/layer-print-animation'
import { VideoFrame } from '@/components/home/video-frame'
import { videos } from '@/lib/site-content'

export function BrandVideo() {
  return (
    <section id="our-work" className="relative w-full scroll-mt-24 overflow-hidden bg-[#121417] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(224,142,60,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-[110px]" />
      <div className="container-site relative">
        <SectionHeading
          eyebrow="See us at work"
          title="Meet XYZ Layers"
          description="Watch how an idea travels through our studio, from the first sketch on screen to a finished piece in someone’s hands."
          tone="dark"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <VideoFrame
            src={videos.brand}
            poster={videos.brandPoster}
            title="XYZ Layers brand film"
            className="aspect-video rounded-[28px] border border-white/10 bg-white/[0.04] shadow-soft-lg"
            fallback={
              <div className="flex h-full w-full items-center justify-center gap-10 px-8">
                <LayerPrintAnimation className="hidden h-[80%] w-auto sm:block" />
                <div className="max-w-xs text-center sm:text-left">
                  <Clapperboard className="mx-auto h-10 w-10 text-accent sm:mx-0" />
                  <p className="mt-4 font-heading text-2xl font-bold">Our brand film is in production</p>
                  <p className="mt-2 text-white/65">A short look inside the studio is coming soon.</p>
                </div>
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  )
}
