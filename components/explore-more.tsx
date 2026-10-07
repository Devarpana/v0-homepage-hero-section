'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { ProductImage } from '@/components/product-image'
import { formatPrice, type Product } from '@/lib/products'

// Varying heights give the Pinterest-style staggered grid.
const ratios = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/6]']

export function ExploreMore({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="w-full bg-muted py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Explore more"
          title="Discover something new"
          description="Wander through the full range. You might find your new favourite."
        />

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 lg:gap-5">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
              className="mb-4 break-inside-avoid lg:mb-5"
            >
              <Link
                href={`/product/${product.id}`}
                className={`group relative block overflow-hidden rounded-2xl bg-white shadow-soft ${ratios[index % ratios.length]}`}
              >
                <ProductImage src={product.image} alt={product.name} />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl bg-white/90 px-3 py-2 backdrop-blur transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="truncate font-heading text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="shrink-0 text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-foreground/15 bg-white px-8 font-heading font-semibold hover:border-primary hover:text-primary"
          >
            <Link href="/shop">
              Browse the full shop
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
