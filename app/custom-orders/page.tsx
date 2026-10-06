import { Suspense } from 'react'
import { CustomOrdersHero } from '@/components/custom-orders-hero'
import { WhatWeCanCreate } from '@/components/what-we-can-create'
import { CustomOrdersProcess } from '@/components/custom-orders-process'
import { CustomOrderForm } from '@/components/custom-order-form'
import { PreviousCustomProjects } from '@/components/previous-custom-projects'
import { CustomOrdersFAQ } from '@/components/custom-orders-faq'
import { CustomOrdersFinalCTA } from '@/components/custom-orders-final-cta'

export default function CustomOrdersPage() {
  return (
    <main className="w-full">
      <CustomOrdersHero />
      <WhatWeCanCreate />
      <CustomOrdersProcess />
      {/* The form reads ?project= and ?details= from the URL, which needs a Suspense boundary. */}
      <Suspense fallback={<div className="min-h-[40rem]" />}>
        <CustomOrderForm />
      </Suspense>
      <PreviousCustomProjects />
      <CustomOrdersFAQ />
      <CustomOrdersFinalCTA />
    </main>
  )
}
