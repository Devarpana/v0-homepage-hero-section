'use client'

import { useState, useCallback } from 'react'
import { Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface ImageUploaderProps {
  label: string
  description: string
  onImagesSelected: (files: File[]) => void
  multiple?: boolean
  maxFiles?: number
}

export function ImageUploader({
  label,
  description,
  onImagesSelected,
  multiple = false,
  maxFiles = 1,
}: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>([])

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setIsDragActive(true)
      } else if (e.type === 'dragleave') {
        setIsDragActive(false)
      }
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      const files = Array.from(e.dataTransfer.files).filter(
        (file) => file.type.startsWith('image/')
      )

      const filesToAdd = multiple ? files.slice(0, maxFiles - previews.length) : files.slice(0, 1)
      processFiles(filesToAdd)
    },
    [multiple, maxFiles, previews.length]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const filesToAdd = multiple ? files.slice(0, maxFiles - previews.length) : files.slice(0, 1)
      processFiles(filesToAdd)
    }
  }

  const processFiles = (files: File[]) => {
    const newPreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    if (multiple) {
      setPreviews((prev) => [...prev, ...newPreviews])
      onImagesSelected([...previews.map((p) => p.file), ...files])
    } else {
      setPreviews(newPreviews)
      onImagesSelected(files)
    }
  }

  const removeImage = (index: number) => {
    setPreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      onImagesSelected(updated.map((p) => p.file))
      return updated
    })
  }

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2 font-[var(--font-poppins)]">
        {label}
      </label>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>

      {/* Upload Area */}
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        animate={isDragActive ? { backgroundColor: 'hsl(var(--primary) / 0.05)' } : {}}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 bg-background'
        }`}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          id={`file-input-${label}`}
        />
        <label
          htmlFor={`file-input-${label}`}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground font-[var(--font-poppins)]">
            Drag images here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
        </label>
      </motion.div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className={`grid gap-4 mt-4 ${multiple ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1'}`}>
          {previews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <img
                src={item.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-border"
              />
              <button
                onClick={() => removeImage(index)}
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
