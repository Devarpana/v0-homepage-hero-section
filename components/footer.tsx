import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'
import { company, contact } from '@/lib/site-content'

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Rapid Prototyping', href: '/#service-prototyping' },
      { label: 'Reverse Engineering', href: '/#service-reverse-engineering' },
      { label: '3D Design & Modelling', href: '/#service-3d-design' },
      { label: '3D Printing', href: '/#service-3d-printing' },
      { label: 'Get a Quote', href: '/custom-orders#custom-form' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Materials', href: '/#materials' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Shop', href: '/shop' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Questions (FAQ)', href: '/custom-orders#faq' },
      { label: 'Which service do I need?', href: '/#which-service' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Your account', href: '/login' },
    ],
  },
]

const socials = [
  { label: 'Instagram', icon: Instagram, href: contact.instagram.href },
  { label: 'LinkedIn', icon: Linkedin, href: contact.linkedin.href },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="w-full border-t border-border bg-muted">
      <div className="container-site py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo-mark.png" alt="" width={36} height={43} className="h-11 w-auto" />
              <span className="font-heading text-xl font-bold tracking-wide text-primary">XYZ LAYERS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              3D design, prototyping and printing services. A startup from IIT Guwahati, serving customers across India.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/75 hover:text-primary">
                  <MessageCircle className="h-4 w-4 text-accent" />
                  WhatsApp {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-foreground/75 hover:text-primary">
                  <Phone className="h-4 w-4 text-accent" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all text-foreground/75 hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-heading text-sm font-semibold text-foreground">{column.title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-center text-sm text-muted-foreground md:flex-row md:text-left">
          <p>© {currentYear} XYZ Layers, a brand of {company.legalName}. All rights reserved.</p>
          <p>Designed &amp; printed in India</p>
        </div>
      </div>
    </footer>
  )
}
