'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ProductImage } from '@/components/product-image'
import { cn } from '@/lib/utils'

// Customer photos go here once we have them. Until then each tile shows the branded placeholder.
const photos: { src?: string; caption: string }[] = [
  { caption: 'On the desk' },
  { caption: 'In the living room' },
  { caption: 'Gifted with love' },
  { caption: 'Kids’ favourite' },
  { caption: 'Custom nameplate' },
]

export function CustomerShowcase() {
  return (
    <section className="w-full bg-white pb-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Customer showcase"
          title="Printed by us, loved by you"
          description="Tag us in your photos and your print could be featured here."
        />

        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4 lg:gap-5">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.caption}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                index === 0 && 'col-span-2 row-span-2'
              )}
            >
              <ProductImage src={photo.src} alt={photo.caption} />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Camera className="h-4 w-4 text-accent" />
          Share your print with <span className="font-semibold text-primary">#XYZLayers</span>
        </div>
      </div>
    </section>
  )
}
