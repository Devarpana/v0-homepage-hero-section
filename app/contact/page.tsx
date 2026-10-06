import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { SITE } from '@/lib/site'

export default function ContactPage() {
  return (
    <main className="w-full bg-white pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] mb-4 tracking-tight">
          Get in touch
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
          Questions about an order, a product, or something you&apos;d like us to make? Send us a message and
          we&apos;ll get back to you within 24 hours.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="space-y-6 font-[family-name:var(--font-inter)]">
            {SITE.email && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</h2>
                <a href={`mailto:${SITE.email}`} className="text-gray-900 hover:text-primary">
                  {SITE.email}
                </a>
              </div>
            )}
            {SITE.phone && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</h2>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="text-gray-900 hover:text-primary">
                  {SITE.phone}
                </a>
              </div>
            )}
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 font-[family-name:var(--font-poppins)] mb-2">Have a project in mind?</h2>
              <p className="text-sm text-gray-600 mb-4">
                For personalised or one-off prints, the custom order form lets you attach sketches and get a quote.
              </p>
              <Link href="/custom-orders#custom-form" className="text-sm font-semibold text-primary hover:underline">
                Start a custom order →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
