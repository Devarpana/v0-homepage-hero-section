import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Briefcase, Building2, FlaskConical, GraduationCap, Layers, Lightbulb, MapPin, User } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about/about-hero'
import { StoryLayers } from '@/components/about/story-layers'
import { SectionHeading } from '@/components/section-heading'
import { WhyXYZLayers } from '@/components/why-xyz-layers'
import { CustomOrdersCTA } from '@/components/custom-orders-cta'
import { serviceIcons } from '@/components/home/service-icon'
import { company, materials, services, team } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'About | XYZ Layers',
  description: `XYZ Layers is a 3D printing and design brand of ${company.legalName}, born at ${company.origin} and serving customers across India.`,
}

const facts = [
  { icon: GraduationCap, value: company.origin, label: 'Where we started' },
  { icon: Building2, value: company.shortName, label: 'Registered company' },
  { icon: Layers, value: `${services.length} services · ${materials.length} materials`, label: 'Under one roof' },
  { icon: MapPin, value: 'Across India', label: 'Serving customers' },
]

const audiences = [
  { icon: GraduationCap, title: 'Students', text: 'Project parts, models and prototypes for college work and competitions.' },
  { icon: Briefcase, title: 'Businesses', text: 'Spare parts, jigs, enclosures and small production runs.' },
  { icon: Lightbulb, title: 'Innovators', text: 'From first sketch to a working prototype you can show and test.' },
  { icon: FlaskConical, title: 'Researchers', text: 'Custom lab fixtures, holders and one-off experimental parts.' },
  { icon: User, title: 'Individuals', text: 'Replacement parts, personalised gifts and ideas for home.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <AboutHero />

        {/* Quick facts */}
        <section className="w-full border-b border-border bg-white">
          <div className="container-site grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {facts.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 py-7 lg:px-6 lg:first:pl-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 font-heading font-semibold text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <StoryLayers />

        {/* Mission statement */}
        <section className="relative w-full overflow-hidden bg-[#121417] py-24 text-white lg:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(224,142,60,0.25),transparent_55%)]" />
          <div className="container-site relative text-center">
            <Image src="/logo-mark.png" alt="" width={48} height={58} className="mx-auto h-14 w-auto opacity-90" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our mission</p>
            <blockquote className="mx-auto mt-5 max-w-4xl font-heading text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">
              Make 3D printing <span className="text-accent">simple, reliable and affordable</span> for everyone in India
              with an idea.
            </blockquote>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              You tell us what you need in plain words. We take care of the rest: the 3D design, the right material,
              careful printing and delivery to your door.
            </p>
          </div>
        </section>

        {/* Who we help */}
        <section className="w-full bg-muted py-24">
          <div className="container-site">
            <SectionHeading eyebrow="Who we help" title="Made for everyone who makes" align="center" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {audiences.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group rounded-[24px] border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="w-full bg-white py-24">
          <div className="container-site">
            <SectionHeading
              eyebrow="What we do"
              title="Everything 3D printing, under one roof"
              description="Tap a service to see what it means and who it is for."
              action={
                <Link href="/custom-orders#custom-form" className="inline-flex items-center gap-1.5 font-heading font-semibold text-primary hover:text-accent">
                  Get a quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon]
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/#service-${s.slug}`}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-border p-5 transition-all hover:border-primary/30 hover:bg-muted/60"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-heading font-semibold text-foreground">{s.name}</span>
                        <span className="mt-1 block text-sm leading-snug text-muted-foreground">{s.chooseIf}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {team.length > 0 && (
          <section className="w-full bg-muted py-24">
            <div className="container-site">
              <SectionHeading eyebrow="Our team" title="The people behind the printers" align="center" />
              <div className="flex flex-wrap justify-center gap-6">
                {team.map((member) => (
                  <div key={member.name} className="w-64 rounded-[24px] border border-border bg-white p-6 text-center shadow-soft">
                    {member.photo && (
                      <img src={member.photo} alt={member.name} className="mx-auto h-28 w-28 rounded-full object-cover" />
                    )}
                    <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <WhyXYZLayers />
        <CustomOrdersCTA />
      </main>
      <Footer />
    </>
  )
}
