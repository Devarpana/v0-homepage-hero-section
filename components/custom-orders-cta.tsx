'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ideas = ['Nameplates', 'Gifts', 'Personalised items', 'Your own idea']

export function CustomOrdersCTA() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] bg-primary px-8 py-16 text-white sm:px-14 lg:px-20 lg:py-24"
        >
          {/* Decorative logo mark */}
          <Image
            src="/logo-mark.png"
            alt=""
            width={181}
            height={216}
            className="pointer-events-none absolute -right-16 -top-10 h-[130%] w-auto opacity-[0.08] brightness-0 invert"
          />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent/40 blur-[100px]" />

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Custom orders</p>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-balance lg:text-6xl">
              Have an idea? We&apos;ll print it.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Tell us what you have in mind. We&apos;ll design it with you, print it layer by layer and deliver it to
              your door.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-6">
              {ideas.map((idea) => (
                <li key={idea} className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <Check className="h-4 w-4 text-accent" />
                  {idea}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-accent px-8 font-heading text-base font-semibold text-white hover:bg-accent/90"
              >
                <Link href="/custom-orders">
                  Start a custom order
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/30 bg-transparent px-8 font-heading text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/custom-orders#custom-form">Send us your idea</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
