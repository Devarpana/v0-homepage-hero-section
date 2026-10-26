'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { serviceIcons } from '@/components/home/service-icon'
import { services, type Service } from '@/lib/site-content'
import { cn } from '@/lib/utils'

// Tabs across the top, a large picture on the left and the explanation on the right.
export function ServicesShowcase() {
  const [active, setActive] = useState(services[0].slug)
  const service = services.find((s) => s.slug === active) ?? services[0]

  // "#service-reverse-engineering" in the URL (used by the service finder) opens that tab.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace('#service-', '')
      if (!services.some((s) => s.slug === slug)) return
      setActive(slug)
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  // Once the section is close to the screen, fetch the other tabs' photos so switching tabs is instant.
  useEffect(() => {
    const section = document.getElementById('services')
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        services.forEach((s) => {
          if (s.image) new Image().src = s.image
        })
      },
      { rootMargin: '400px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="w-full scroll-mt-24 bg-muted py-20">
      <div className="container-site">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our services"
            title="Everything 3D printing, under one roof"
            description="From the first sketch to a finished part in your hands. Pick a service to see what it means and who it is for."
            action={
              <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 font-heading font-semibold hover:bg-accent/90">
                <Link href="/custom-orders#custom-form">
                  Get a quote
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            }
          />

          {/* Tabs */}
          <div className="no-scrollbar -mx-6 mb-6 overflow-x-auto px-6 md:mx-0 md:px-0 lg:overflow-visible">
            <div role="tablist" className="inline-flex gap-1 rounded-2xl bg-white p-1.5 shadow-soft lg:flex lg:flex-wrap">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={s.slug === active}
                  onClick={() => setActive(s.slug)}
                  className={cn(
                    'whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                    s.slug === active ? 'bg-primary text-white shadow-soft' : 'text-foreground/65 hover:bg-muted hover:text-foreground'
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr]"
              role="tabpanel"
            >
              <ServiceVisual service={service} />

              <div className="flex flex-col rounded-[28px] border border-border bg-white p-7 shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-foreground">{service.name}</h3>
                <p className="mt-2 font-heading text-lg font-medium text-primary">{service.tagline}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>

                <div className="mt-5 rounded-2xl bg-accent/10 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Choose this if</p>
                  <p className="mt-1 font-medium text-foreground">{service.chooseIf}</p>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Ideal for</p>
                    <ul className="mt-2 space-y-1.5">
                      {service.idealFor.map((who) => (
                        <li key={who} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                          <Check className="h-4 w-4 text-accent" />
                          {who}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Materials</p>
                    <p className="mt-2 text-sm font-medium text-foreground/85">{service.materials}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <Button asChild className="h-12 w-full rounded-full font-heading font-semibold sm:w-auto sm:px-7">
                    <Link href={`/custom-orders?service=${service.slug}#custom-form`}>
                      Ask about this service
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ServiceVisual({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon]
  if (service.image) {
    return (
      <div className="relative min-h-[260px] overflow-hidden rounded-[28px] shadow-soft lg:min-h-[380px]">
        <img src={service.image} alt={service.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <ExampleChips examples={service.examples} />
      </div>
    )
  }

  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-[#0f1830] shadow-soft lg:min-h-[380px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(35,69,141,0.9),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/30 blur-[90px]" />
      {/* Concentric layered hexagons, echoing the logo */}
      <svg viewBox="-50 -50 100 100" className="absolute -right-10 top-1/2 h-[120%] -translate-y-1/2 text-white/10" aria-hidden>
        {[46, 38, 30, 22, 14].map((r) => (
          <polygon
            key={r}
            points={Array.from({ length: 6 }, (_, i) => {
              const a = (Math.PI / 3) * i - Math.PI / 2
              return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </svg>
      <div className="relative flex h-full flex-col justify-center p-8 pb-24 sm:p-10 sm:pb-24">
        <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-accent backdrop-blur">
          <Icon className="h-12 w-12" strokeWidth={1.5} />
        </span>
        <p className="mt-8 hidden max-w-md font-heading text-3xl font-bold leading-tight text-white sm:block lg:text-4xl">{service.tagline}</p>
      </div>
      <ExampleChips examples={service.examples} />
    </div>
  )
}

function ExampleChips({ examples }: { examples: string[] }) {
  return (
    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
      {examples.map((example) => (
        <span key={example} className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
          {example}
        </span>
      ))}
    </div>
  )
}
