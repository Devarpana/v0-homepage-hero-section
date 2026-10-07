'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gift, Lamp, Puzzle, Ruler } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { categories } from '@/lib/sample-products'
import { cn } from '@/lib/utils'

const styles: Record<string, { icon: typeof Ruler; card: string; iconBox: string; href: string }> = {
  'daily-essentials': { icon: Ruler, card: 'bg-[#eef2fa]', iconBox: 'bg-primary text-white', href: '/shop?category=daily-essentials' },
  'home-decor': { icon: Lamp, card: 'bg-[#fdf3e9]', iconBox: 'bg-accent text-white', href: '/shop?category=home-decor' },
  toys: { icon: Puzzle, card: 'bg-[#f4f5f8]', iconBox: 'bg-foreground text-white', href: '/shop?category=toys' },
  custom: { icon: Gift, card: 'bg-primary text-white', iconBox: 'bg-white text-primary', href: '/custom-orders' },
}

export function FeaturedCollections() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Collections"
          title="Find your next favourite thing"
          description="Ready-made pieces for everyday life, or something made just for you."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const style = styles[category.slug]
            const Icon = style.icon
            const isCustom = category.slug === 'custom'
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={style.href}
                  className={cn(
                    'group relative flex h-60 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg sm:h-80 lg:h-[380px]',
                    style.card
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className={cn('flex h-12 w-12 items-center justify-center rounded-xl', style.iconBox)}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight
                      className={cn(
                        'h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1',
                        isCustom ? 'text-white' : 'text-foreground/40 group-hover:text-primary'
                      )}
                    />
                  </div>

                  {/* Large background icon */}
                  <Icon
                    className={cn(
                      'absolute -right-6 top-1/2 h-44 w-44 -translate-y-1/2 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110',
                      isCustom ? 'text-white/10' : 'text-foreground/[0.04]'
                    )}
                    strokeWidth={1.25}
                  />

                  <div className="relative">
                    <h3 className={cn('font-heading text-2xl font-bold', isCustom ? 'text-white' : 'text-foreground')}>
                      {category.name}
                    </h3>
                    <p className={cn('mt-2 text-sm leading-relaxed', isCustom ? 'text-white/80' : 'text-muted-foreground')}>
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
