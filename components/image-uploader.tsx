'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'

const MAX_BYTES = 10 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

export interface ImageSelection {
  /** URLs of images that are already saved and the admin chose to keep. */
  existing: string[]
  /** Newly picked files that still need uploading. */
  files: File[]
}

interface ImageUploaderProps {
  label: string
  description: string
  onChange: (selection: ImageSelection) => void
  /** Saved image URLs (edit mode). The admin can remove them or add more. */
  existing?: string[]
  multiple?: boolean
  maxFiles?: number
}

interface Preview {
  file: File
  url: string
}

export function ImageUploader({
  label,
  description,
  onChange,
  existing: initialExisting = [],
  multiple = false,
  maxFiles = 1,
}: ImageUploaderProps) {
  const inputId = useId()
  const [isDragActive, setIsDragActive] = useState(false)
  const [existing, setExisting] = useState<string[]>(initialExisting)
  const [previews, setPreviews] = useState<Preview[]>([])
  const [error, setError] = useState<string | null>(null)
  const previewsRef = useRef<Preview[]>([])
  previewsRef.current = previews

  // Free the blob: URLs when the component goes away.
  useEffect(() => () => previewsRef.current.forEach((p) => URL.revokeObjectURL(p.url)), [])

  const commit = (nextExisting: string[], nextPreviews: Preview[]) => {
    setExisting(nextExisting)
    setPreviews(nextPreviews)
    onChange({ existing: nextExisting, files: nextPreviews.map((p) => p.file) })
  }

  const addFiles = (incoming: File[]) => {
    const problems: string[] = []
    const valid = incoming.filter((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        problems.push(`${file.name}: use PNG, JPG, WebP or GIF`)
        return false
      }
      if (file.size > MAX_BYTES) {
        problems.push(`${file.name}: larger than 10MB`)
        return false
      }
      return true
    })

    const room = multiple ? Math.max(0, maxFiles - existing.length - previews.length) : 1
    if (valid.length > room) problems.push(multiple ? `Up to ${maxFiles} images allowed` : 'Only one image allowed')
    const accepted = valid.slice(0, room)

    setError(problems.length ? problems.join('. ') : null)
    if (accepted.length === 0) return

    const added = accepted.map((file) => ({ file, url: URL.createObjectURL(file) }))
    if (multiple) {
      commit(existing, [...previews, ...added])
    } else {
      // A single-image slot: the new file replaces whatever was there.
      previews.forEach((p) => URL.revokeObjectURL(p.url))
      commit([], added)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true)
    else if (e.type === 'dragleave') setIsDragActive(false)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files ?? []))
    e.target.value = '' // lets the same file be picked again after removing it
  }

  const removeExisting = (index: number) => commit(existing.filter((_, i) => i !== index), previews)

  const removePreview = (index: number) => {
    URL.revokeObjectURL(previews[index].url)
    commit(existing, previews.filter((_, i) => i !== index))
  }

  const tiles = [
    ...existing.map((url, i) => ({ key: `existing-${url}`, src: url, remove: () => removeExisting(i), name: `saved image ${i + 1}` })),
    ...previews.map((p, i) => ({ key: `new-${p.url}`, src: p.url, remove: () => removePreview(i), name: p.file.name })),
  ]

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-2 font-[family-name:var(--font-poppins)]">
        {label}
      </label>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>

      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-background'
        }`}
      >
        <input
          id={inputId}
          type="file"
          multiple={multiple}
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />
        <label htmlFor={inputId} className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground font-[family-name:var(--font-poppins)]">Drag images here or click to browse</p>
          <p className="text-xs text-muted-foreground">PNG, JPG, WebP or GIF, up to 10MB</p>
        </label>
      </motion.div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {tiles.length > 0 && (
        <div className={`grid gap-4 mt-4 ${multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
          {tiles.map((tile) => (
            <motion.div key={tile.key} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <img src={tile.src} alt={tile.name} className="w-full h-24 object-cover rounded-lg border border-border" />
              <button
                type="button"
                aria-label={`Remove ${tile.name}`}
                onClick={tile.remove}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
