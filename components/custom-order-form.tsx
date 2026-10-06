'use client'

import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { errorMessage, isSupabaseConfigured, requireSupabase } from '@/lib/supabase'
import { BUDGET_OPTIONS, CUSTOM_REQUEST_BUCKET, MAX_UPLOAD_BYTES, MAX_UPLOAD_FILES, isAllowedUpload, uploadPath } from '@/lib/custom-requests'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none transition-colors font-[family-name:var(--font-inter)]'
const labelClass = 'block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)] mb-2'

export function CustomOrderForm() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    // Prefilled when arriving from a product's "Request Personalised Version" button.
    projectTitle: searchParams.get('project') ?? '',
    description: searchParams.get('details') ?? '',
    budget: '',
    deadline: '',
    website: '', // honeypot: real people never see or fill this
  })
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? [])
    e.target.value = '' // allow picking the same file again after removing it

    const problems: string[] = []
    const accepted = [...files]
    for (const file of picked) {
      if (!isAllowedUpload(file)) problems.push(`${file.name}: only images and PDFs are supported`)
      else if (file.size > MAX_UPLOAD_BYTES) problems.push(`${file.name}: larger than 10MB`)
      else if (accepted.length >= MAX_UPLOAD_FILES) problems.push(`Only ${MAX_UPLOAD_FILES} files can be attached`)
      else accepted.push(file)
    }
    setFiles(accepted)
    setError(problems.length ? [...new Set(problems)].join('. ') : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    // Bots tend to fill every field. Pretend it worked and send nothing.
    if (formData.website) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      const supabase = requireSupabase()

      // Upload first, so a saved request never points at files that failed to upload.
      const folder = crypto.randomUUID()
      const filePaths: string[] = []
      for (const file of files) {
        const path = uploadPath(folder, file.name)
        const { error: uploadError } = await supabase.storage
          .from(CUSTOM_REQUEST_BUCKET)
          .upload(path, file, { contentType: file.type })
        if (uploadError) throw new Error(`Could not upload ${file.name}: ${uploadError.message}`)
        filePaths.push(path)
      }

      const { error: insertError } = await supabase.from('custom_requests').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        project_title: formData.projectTitle.trim(),
        description: formData.description.trim(),
        budget: formData.budget || null,
        deadline: formData.deadline || null,
        file_paths: filePaths,
      })
      if (insertError) throw insertError

      setSubmitted(true)
      setFormData((prev) => ({ ...prev, name: '', email: '', phone: '', projectTitle: '', description: '', budget: '', deadline: '' }))
      setFiles([])
    } catch (err) {
      setError(errorMessage(err, "We couldn't send your request. Please try again."))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="custom-form" className="relative w-full py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-black text-gray-900 font-[family-name:var(--font-poppins)] text-balance tracking-tight"
          >
            Tell Us Your Vision
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)] max-w-2xl mx-auto"
          >
            Fill out the form below and our team will get back to you within 24 hours
          </motion.p>
        </motion.div>

        {submitted ? (
          <div role="status" className="text-center py-12 border border-green-200 bg-green-50 rounded-2xl px-6">
            <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Request received!</h3>
            <p className="mt-2 text-gray-600 font-[family-name:var(--font-inter)]">
              Thanks for sharing your idea. We&apos;ll review it and reply with a quote within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-3 rounded-full border border-gray-300 font-semibold text-gray-900 font-[family-name:var(--font-poppins)] hover:bg-white"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="co-name" className={labelClass}>Full Name</label>
                <input id="co-name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" maxLength={200} className={inputClass} placeholder="Your name" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="co-email" className={labelClass}>Email Address</label>
                <input id="co-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" maxLength={320} className={inputClass} placeholder="your@email.com" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="co-phone" className={labelClass}>Phone Number</label>
                <input id="co-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required autoComplete="tel" minLength={3} maxLength={40} className={inputClass} placeholder="+91 9876543210" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="co-title" className={labelClass}>Project Title</label>
                <input id="co-title" type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required maxLength={200} className={inputClass} placeholder="e.g., Custom Desk Organizer" />
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <label htmlFor="co-description" className={labelClass}>Project Description</label>
              <textarea
                id="co-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                maxLength={5000}
                className={`${inputClass} resize-none`}
                placeholder="Describe your project in detail. Share your ideas, inspirations, and any specific requirements..."
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="co-budget" className={labelClass}>Budget (Optional)</label>
                <select id="co-budget" name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                  <option value="">Select budget range</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="co-deadline" className={labelClass}>Deadline (Optional)</label>
                <input id="co-deadline" type="date" name="deadline" value={formData.deadline} onChange={handleChange} min={new Date().toISOString().slice(0, 10)} className={inputClass} />
              </motion.div>
            </div>

            {/* Honeypot, hidden from people and assistive tech */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
              </label>
            </div>

            {/* File Upload */}
            <motion.div variants={itemVariants}>
              <label htmlFor="co-files" className={labelClass}>Upload Files (Optional)</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer group">
                <input
                  id="co-files"
                  ref={fileInput}
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleFiles}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center pointer-events-none">
                  <div className="text-3xl mb-2">📎</div>
                  <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)]">Drag and drop your files here, or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1 font-[family-name:var(--font-inter)]">
                    Images and PDFs, up to {MAX_UPLOAD_FILES} files, 10MB each
                  </p>
                </div>
              </div>
              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((file, i) => (
                    <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-4 py-2 text-sm font-[family-name:var(--font-inter)]">
                      <span className="truncate text-gray-800">{file.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => setFiles((current) => current.filter((_, index) => index !== i))}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {!isSupabaseConfigured && (
              <p role="alert" className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
                Requests can&apos;t be sent yet because the store database isn&apos;t connected.
              </p>
            )}
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                {error}
              </p>
            )}

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting || !isSupabaseConfigured}
                className="w-full py-4 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full font-bold text-lg font-[family-name:var(--font-poppins)] shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending…
                  </>
                ) : (
                  'Submit Custom Order Request'
                )}
              </motion.button>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xs text-gray-500 text-center font-[family-name:var(--font-inter)]">
              By submitting this form, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
