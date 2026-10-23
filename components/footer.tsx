import Link from 'next/link'
import Image from 'next/image'

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
      { label: 'About Us', href: '/#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

const socials = ['Instagram', 'Twitter', 'LinkedIn']

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
              3D design, prototyping and printing services. Designed and made in India.
            </p>
            <div className="mt-6 flex gap-5">
              {socials.map((name) => (
                <a key={name} href="#" className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary">
                  {name}
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

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} XYZ Layers. All rights reserved.</p>
          <p>Designed &amp; printed in India</p>
        </div>
      </div>
    </footer>
  )
}
