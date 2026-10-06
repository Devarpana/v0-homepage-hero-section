export const CUSTOM_REQUEST_BUCKET = 'custom-request-files'
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
export const MAX_UPLOAD_FILES = 5

export const BUDGET_OPTIONS = [
  { value: 'under-5000', label: 'Under ₹5,000' },
  { value: '5000-10000', label: '₹5,000 - ₹10,000' },
  { value: '10000-25000', label: '₹10,000 - ₹25,000' },
  { value: '25000-50000', label: '₹25,000 - ₹50,000' },
  { value: 'above-50000', label: 'Above ₹50,000' },
] as const

export function budgetLabel(value: string | null | undefined): string {
  return BUDGET_OPTIONS.find((o) => o.value === value)?.label ?? 'Not specified'
}

/** The bucket accepts these types; checking here gives a friendly message before the upload. */
export function isAllowedUpload(file: File): boolean {
  return file.type.startsWith('image/') || file.type === 'application/pdf'
}

/** Storage keys must be plain ASCII-ish; keep the extension so admins can open the file. */
export function uploadPath(folder: string, fileName: string): string {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^\.+/, '').slice(-100) || 'file'
  return `${folder}/${safe}`
}
