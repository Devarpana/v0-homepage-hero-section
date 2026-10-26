'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/section-heading'

const faqs = [
  {
    question: 'I don’t have a 3D file. Can you still help?',
    answer:
      'Yes. Send a sketch, a photo or just a description. Our 3D Design & Modelling service turns it into a print-ready model, and we show it to you before printing.',
  },
  {
    question: 'Which files can I send?',
    answer:
      '3D files (STL, STEP, OBJ, 3MF), PDFs, photos and sketches. If your file is larger than 20 MB, send what you can and we’ll ask for the rest.',
  },
  {
    question: 'How much will it cost?',
    answer:
      'It depends on the size, material, quantity and any design work. Asking for a quote is free, and you only pay once you agree to the price.',
  },
  {
    question: 'How long does it take?',
    answer: 'It depends on the size, quantity and material. We tell you the time together with the price, before you decide.',
  },
  {
    question: 'Can I order just one piece?',
    answer: 'Yes. There is no minimum order. We make single pieces, prototypes and small batches of a few hundred.',
  },
  {
    question: 'Which material should I choose?',
    answer:
      'If you’re unsure, choose “Help me choose”. Tell us what the part has to do (hold weight, stay outside, bend, look good) and we’ll recommend the right filament.',
  },
]

export function QuoteFAQ() {
  return (
    <section id="faq" className="w-full bg-white py-24">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          eyebrow="Questions"
          title="Before you ask"
          description="Quick answers to what most people want to know. Anything else, just write it in your request."
        />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-5 text-left font-heading text-lg font-semibold">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
