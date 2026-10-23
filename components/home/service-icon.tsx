import {
  Building2,
  FlaskConical,
  Gift,
  Layers,
  PenTool,
  Printer,
  Ruler,
  ScanLine,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceIcon } from '@/lib/site-content'

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  prototype: FlaskConical,
  reverse: ScanLine,
  design: PenTool,
  print: Printer,
  batch: Layers,
  parts: Wrench,
  jig: Ruler,
  model: Building2,
  gift: Gift,
}
