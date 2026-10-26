import type { Metadata } from 'next'
import { QuoteHero } from '@/components/quote/quote-hero'
import { QuoteForm } from '@/components/quote/quote-form'
import { QuoteFAQ } from '@/components/quote/quote-faq'

export const metadata: Metadata = {
  title: 'Get a quote | XYZ Layers',
  description: 'Tell us what you need: 3D design, reverse engineering, prototyping or 3D printing. Asking for a quote is free.',
}

export default function CustomOrdersPage() {
  return (
    <main className="w-full">
      <QuoteHero />
      <QuoteForm />
      <QuoteFAQ />
    </main>
  )
}
