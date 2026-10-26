'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CircleCheck, CircleHelp, FileUp, Loader2, Lock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { serviceIcons } from '@/components/home/service-icon'
import { materials, services } from '@/lib/site-content'
import { ACCEPTED_FILES, MAX_FILE_MB, MAX_FILES, submitQuoteRequest } from '@/lib/quote-requests'
import { cn } from '@/lib/utils'

const NOT_SURE = 'not-sure'
const HELP_ME_CHOOSE = 'Help me choose'

const budgets = ['Under ₹1,000', '₹1,000 – ₹5,000', '₹5,000 – ₹25,000', 'Above ₹25,000', 'Not sure yet']
const contactOptions = ['WhatsApp', 'Phone call', 'Email']

const emptyForm = {
  description: '',
  material: HELP_ME_CHOOSE,
  quantity: '1',
  deadline: '',
  budget: '',
  name: '',
  email: '',
  phone: '',
  contactPreference: 'WhatsApp',
}

const inputClass =
  'w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15'

export function QuoteForm() {
  const [service, setService] = useState<string>('')
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [error, setError] = useState('')
  const [reference, setReference] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  // "Ask about this service" buttons link here with ?service=<slug>
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service')
    if (slug && services.some((s) => s.slug === slug)) setService(slug)
  }, [])

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const addFiles = (list: FileList | null) => {
    if (!list) return
    setFileError('')
    const tooBig = Array.from(list).filter((f) => f.size > MAX_FILE_MB * 1024 * 1024)
    const ok = Array.from(list).filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024)
    const next = [...files, ...ok].slice(0, MAX_FILES)
    if (tooBig.length) setFileError(`${tooBig.map((f) => f.name).join(', ')} is larger than ${MAX_FILE_MB} MB.`)
    else if (files.length + ok.length > MAX_FILES) setFileError(`You can add up to ${MAX_FILES} files.`)
    setFiles(next)
    if (fileInput.current) fileInput.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service) {
      setError('Please choose a service, or pick “Not sure yet”.')
      setStatus('error')
      document.getElementById('quote-service')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setStatus('sending')
    setError('')
    const chosen = services.find((s) => s.slug === service)
    try {
      const ref = await submitQuoteRequest(
        {
          service: chosen?.slug ?? null,
          serviceName: chosen?.name ?? 'Not sure yet',
          description: form.description.trim(),
          material: form.material,
          quantity: Math.max(1, Number(form.quantity) || 1),
          deadline: form.deadline,
          budget: form.budget,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          contactPreference: form.contactPreference,
        },
        files
      )
      setReference(ref)
      setStatus('idle')
      document.getElementById('custom-form')?.scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const startAgain = () => {
    setForm(emptyForm)
    setFiles([])
    setService('')
    setReference(null)
  }

  return (
    <section id="custom-form" className="w-full scroll-mt-24 bg-muted py-16 lg:py-24">
      <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {reference ? (
          <SuccessCard name={form.name} reference={reference} onAgain={startAgain} />
        ) : (
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-border bg-white p-6 shadow-soft sm:p-10">
            {/* 1. Service */}
            <Step number={1} title="What do you need?" hint="Choose the closest match. You can change it later.">
              <div id="quote-service" role="radiogroup" aria-label="Service" className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
                {services.map((s) => {
                  const Icon = serviceIcons[s.icon]
                  return (
                    <ServiceOption key={s.slug} selected={service === s.slug} onSelect={() => setService(s.slug)} label={s.name}>
                      <Icon className="h-5 w-5" />
                    </ServiceOption>
                  )
                })}
                <ServiceOption selected={service === NOT_SURE} onSelect={() => setService(NOT_SURE)} label="Not sure yet">
                  <CircleHelp className="h-5 w-5" />
                </ServiceOption>
              </div>
              {service && service !== NOT_SURE && (
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Choose this if: </span>
                  {services.find((s) => s.slug === service)?.chooseIf}
                </p>
              )}
            </Step>

            {/* 2. Details */}
            <Step number={2} title="Tell us about it" hint="Plain words are perfect. What is it, what is it for, and roughly how big?">
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={update('description')}
                className={cn(inputClass, 'resize-y')}
                placeholder="For example: The knob on my washing machine broke. It is about 4 cm wide. I have the broken pieces."
              />
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Material">
                  <select value={form.material} onChange={update('material')} className={inputClass}>
                    <option>{HELP_ME_CHOOSE}</option>
                    {materials.map((m) => (
                      <option key={m.name}>{m.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="How many?">
                  <input type="number" min={1} value={form.quantity} onChange={update('quantity')} className={inputClass} />
                </Field>
                <Field label="Needed by (optional)">
                  <input type="date" value={form.deadline} onChange={update('deadline')} className={inputClass} />
                </Field>
                <Field label="Budget (optional)">
                  <select value={form.budget} onChange={update('budget')} className={inputClass}>
                    <option value="">Choose a range</option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </Step>

            {/* 3. Files */}
            <Step number={3} title="Add photos or files (optional)" hint="Photos, sketches, PDFs or 3D files (STL, STEP, OBJ, 3MF).">
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  addFiles(e.dataTransfer.files)
                }}
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/25 bg-primary/[0.03] px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/[0.06]"
              >
                <FileUp className="h-8 w-8 text-primary" />
                <span className="mt-3 font-medium text-foreground">Drop files here or tap to choose</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  Up to {MAX_FILES} files, {MAX_FILE_MB} MB each
                </span>
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  accept={ACCEPTED_FILES}
                  onChange={(e) => addFiles(e.target.files)}
                  className="sr-only"
                />
              </label>
              {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl bg-muted px-4 py-2.5 text-sm">
                      <span className="truncate text-foreground">{file.name}</span>
                      <span className="flex shrink-0 items-center gap-3 text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                        <button
                          type="button"
                          onClick={() => setFiles(files.filter((_, j) => j !== i))}
                          className="rounded-full p-1 hover:bg-white hover:text-foreground"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Step>

            {/* 4. Contact */}
            <Step number={4} title="How can we reach you?" last>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your name">
                  <input required value={form.name} onChange={update('name')} className={inputClass} placeholder="Full name" autoComplete="name" />
                </Field>
                <Field label="Phone or WhatsApp number">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Email" className="sm:col-span-2">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </Field>
              </div>
              <p className="mt-5 text-sm font-medium text-foreground">Best way to reply to you</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {contactOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, contactPreference: option }))}
                    aria-pressed={form.contactPreference === option}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                      form.contactPreference === option
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-white text-foreground/75 hover:border-primary/40'
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </Step>

            {status === 'error' && error && (
              <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === 'sending'}
              className="mt-8 h-14 w-full rounded-full bg-accent font-heading text-base font-semibold text-white hover:bg-accent/90"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending your request…
                </>
              ) : (
                <>
                  Send my request
                  <ArrowRight className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Asking is free. Your details and files are only seen by the XYZ Layers team.
            </p>
          </form>
        )}

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[28px] bg-primary p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What happens next</p>
            <ol className="mt-4 space-y-3 text-sm text-white/85">
              {['We read your request and look at your files.', 'We reply with advice, a price and a time.', 'You say yes, and we design, print and deliver.'].map(
                (step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-heading font-bold text-accent">{i + 1}</span>
                    {step}
                  </li>
                )
              )}
            </ol>
          </div>
          <div className="rounded-[28px] border border-border bg-white p-7">
            <p className="font-heading text-lg font-semibold text-foreground">Not sure which service?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Choose “Not sure yet” and describe your situation. We’ll point you the right way.
            </p>
            <Link href="/#which-service" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent">
              See which service fits you
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Step({
  number,
  title,
  hint,
  last,
  children,
}: {
  number: number
  title: string
  hint?: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <fieldset className={cn('min-w-0', !last && 'mb-10 border-b border-border pb-10')}>
      <legend className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-white">{number}</span>
        <span className="font-heading text-xl font-bold text-foreground">{title}</span>
      </legend>
      {hint && <p className="mb-4 mt-2 text-sm text-muted-foreground">{hint}</p>}
      {!hint && <div className="mb-4" />}
      {children}
    </fieldset>
  )
}

function Field({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function ServiceOption({
  selected,
  onSelect,
  label,
  children,
}: {
  selected: boolean
  onSelect: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-[13px] font-medium leading-snug transition-all sm:gap-3 sm:px-4 sm:text-sm',
        selected
          ? 'border-primary bg-primary/5 text-foreground shadow-soft ring-1 ring-primary'
          : 'border-border bg-white text-foreground/75 hover:border-primary/40 hover:bg-muted/50'
      )}
    >
      <span className={cn('shrink-0', selected ? 'text-accent' : 'text-foreground/40')}>{children}</span>
      {label}
    </button>
  )
}

function SuccessCard({ name, reference, onAgain }: { name: string; reference: string; onAgain: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start rounded-[28px] border border-border bg-white p-8 shadow-soft sm:p-12"
    >
      <CircleCheck className="h-14 w-14 text-accent" />
      <h2 className="mt-6 font-heading text-3xl font-bold text-foreground">Thank you{name ? `, ${name.split(' ')[0]}` : ''}!</h2>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
        We’ve received your request. We’ll look at it and get back to you with advice and a price.
      </p>
      <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-sm text-foreground">
        Your reference: <span className="font-mono font-semibold">{reference}</span>
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12 rounded-full px-7 font-heading font-semibold">
          <Link href="/">Back to home</Link>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onAgain} className="h-12 rounded-full px-7 font-heading font-semibold">
          Send another request
        </Button>
      </div>
    </motion.div>
  )
}
