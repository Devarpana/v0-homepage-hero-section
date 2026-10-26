import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import { contact } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Contact | XYZ Layers',
  description: `Talk to XYZ Layers on WhatsApp, phone or email. ${contact.serving}.`,
}

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: contact.phone,
    note: 'Fastest. Send photos of your part or idea.',
    href: contact.whatsappHref,
    action: 'Chat on WhatsApp',
    external: true,
  },
  {
    icon: Phone,
    label: 'Call us',
    value: contact.phone,
    note: 'Talk it through with our team.',
    href: contact.phoneHref,
    action: 'Call now',
  },
  {
    icon: Mail,
    label: 'Email',
    value: contact.email,
    note: 'Good for 3D files and longer briefs.',
    href: `mailto:${contact.email}`,
    action: 'Send an email',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Let’s talk about <span className="text-accent">your idea.</span>
            </>
          }
          description="Questions, a quick price check or a full project: reach us the way that suits you."
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              {contact.responseTime}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {contact.serving}
            </span>
          </div>
        </PageHero>

        <section className="w-full bg-muted py-16 lg:py-24">
          <div className="container-site">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {channels.map(({ icon: Icon, label, value, note, href, action, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex flex-col rounded-[28px] border border-border bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft-lg"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                  <p className="mt-1 font-heading text-xl font-bold text-foreground [overflow-wrap:anywhere]">{value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{note}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-heading text-sm font-semibold text-primary group-hover:text-accent">
                    {action}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="relative overflow-hidden rounded-[28px] bg-primary p-8 text-white sm:p-10">
                <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/40 blur-[90px]" />
                <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent">Have a project?</p>
                <h2 className="relative mt-3 font-heading text-3xl font-bold">Get a free quote</h2>
                <p className="relative mt-3 max-w-lg text-white/80">
                  Pick a service, describe what you need and add a photo or file. We reply with advice and a clear price.
                </p>
                <Button asChild size="lg" className="relative mt-8 h-12 rounded-full bg-accent px-7 font-heading font-semibold hover:bg-accent/90">
                  <Link href="/custom-orders#custom-form">
                    Get a quote
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-[28px] border border-border bg-white p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Follow our work</p>
                <ul className="mt-5 space-y-4">
                  {[
                    { icon: Instagram, label: 'Instagram', ...contact.instagram },
                    { icon: Linkedin, label: 'LinkedIn', ...contact.linkedin },
                  ].map(({ icon: Icon, label, handle, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-muted"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.07] text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-sm text-muted-foreground">{label}</span>
                          <span className="font-heading font-semibold text-foreground">{handle}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
