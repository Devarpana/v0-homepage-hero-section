'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Layers, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/product-image'
import Image from 'next/image'
import { formatPrice, type Product } from '@/lib/products'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const trustPoints = [
  { icon: MapPin, label: 'Designed & printed in India' },
  { icon: Layers, label: 'Made with precision' },
  { icon: Sparkles, label: 'Custom orders available' },
]

export function HeroSection({ featured }: { featured?: Product }) {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Soft brand glow */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/[0.08] blur-3xl" />

      <div className="container-site relative z-10 pb-20 pt-32 lg:pb-28 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: copy */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Smart products, printed layer by layer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl"
            >
              Objects of <span className="text-primary">Intent</span>
              <span className="text-accent">.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Every layer matters. We design and print products that merge form with function, creating pieces
              that last.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full px-8 font-heading text-base font-semibold shadow-soft-lg transition-transform hover:-translate-y-0.5"
              >
                <Link href="/shop">
                  Explore the shop
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-foreground/15 px-8 font-heading text-base font-semibold hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <Link href="/custom-orders">Design something custom</Link>
              </Button>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8"
            >
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: large featured product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="relative mx-auto w-full max-w-[480px]"
          >
            {featured ? (
              <Link href={`/product/${featured.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-soft-lg">
                  <ProductImage src={featured.featuredImage} alt={featured.name} />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                    Featured
                  </span>
                </div>

                {/* Product caption card */}
                <div className="absolute -bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-border bg-white/95 px-5 py-4 shadow-soft backdrop-blur sm:-left-8 sm:right-auto sm:min-w-72">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{featured.category}</p>
                    <p className="font-heading text-base font-semibold text-foreground">{featured.name}</p>
                  </div>
                  <p className="ml-6 font-heading text-lg font-bold text-primary">{formatPrice(featured.price)}</p>
                </div>
              </Link>
            ) : (
              // No featured product chosen in admin yet: show the brand mark instead.
              <div className="flex aspect-[4/5] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#eef2fa] via-[#f6f7fa] to-[#fdf3e9] shadow-soft-lg">
                <Image src="/logo-mark.png" alt="XYZ Layers" width={181} height={216} priority className="w-2/5" />
              </div>
            )}

            {/* Floating badge */}
            {featured?.isSignature && (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 top-10 hidden rounded-2xl bg-accent px-4 py-3 text-white shadow-soft-lg sm:block"
            >
              <p className="text-xs text-white/85">From the</p>
              <p className="font-heading text-base font-bold leading-tight">Signature Collection</p>
            </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
