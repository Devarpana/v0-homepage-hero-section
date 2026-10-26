import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, FlaskConical, GraduationCap, Lightbulb, User } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { WhyXYZLayers } from '@/components/why-xyz-layers'
import { CustomOrdersCTA } from '@/components/custom-orders-cta'
import { serviceIcons } from '@/components/home/service-icon'
import { contact, materials, services, team } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'About | XYZ Layers',
  description: 'XYZ Layers is a startup from IIT Guwahati, providing reliable and affordable 3D printing across India.',
}

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
        <PageHero
          eyebrow="About us"
          title={
            <>
              Born at IIT Guwahati. <span className="text-accent">Built layer by layer.</span>
            </>
          }
          description="XYZ Layers is a startup from IIT Guwahati, providing reliable and affordable 3D printing solutions for students, businesses, innovators, researchers and individuals across India."
        >
          <dl className="grid max-w-3xl grid-cols-3 gap-4">
            {[
              { value: services.length, label: 'services' },
              { value: materials.length, label: 'materials' },
              { value: 'All India', label: 'service area' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="whitespace-nowrap font-heading text-lg font-bold text-white sm:text-3xl">{stat.value}</dd>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/55 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* Mission */}
        <section className="w-full bg-white py-24">
          <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <SectionHeading
              eyebrow="Our mission"
              title="Make 3D printing simple for anyone with an idea"
              className="mb-0"
            />
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                3D printing can turn a sketch, a photo or a broken part into a real object. But for most people it still
                feels technical, expensive and hard to start.
              </p>
              <p>
                We change that. You tell us what you need in plain words, and we take care of the rest: the 3D design, the
                right material, careful printing and delivery to your door.
              </p>
              <p className="font-heading font-medium text-primary">Imagination, Layer by Layer.</p>
            </div>
          </div>
        </section>

        {/* Who we help */}
        <section className="w-full bg-muted py-24">
          <div className="container-site">
            <SectionHeading eyebrow="Who we help" title="Made for everyone who makes" align="center" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {audiences.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-[24px] border border-border bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
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
              description="Tap a service to read what it means and who it is for."
            />
            <ul className="flex flex-wrap gap-3">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon]
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/#service-${s.slug}`}
                      className="flex items-center gap-2.5 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground/85 transition-colors hover:border-primary/40 hover:bg-muted"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {s.name}
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

        <section className="w-full bg-white pb-8">
          <div className="container-site">
            <p className="text-center text-muted-foreground">
              Questions first?{' '}
              <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent">
                Talk to us on WhatsApp, phone or email
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="sr-only"> ({contact.phone})</span>
            </p>
          </div>
        </section>

        <CustomOrdersCTA />
      </main>
      <Footer />
    </>
  )
}
