import {
  Building2,
  Cog,
  Drone,
  FlaskConical,
  Gift,
  Layers,
  PenTool,
  Printer,
  Ruler,
  ScanLine,
  Wrench,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceIcon } from '@/lib/site-content'

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  prototype: FlaskConical,
  reverse: ScanLine,
  design: PenTool,
  print: Printer,
  engineering: Cog,
  flexible: Waves,
  batch: Layers,
  parts: Wrench,
  jig: Ruler,
  drone: Drone,
  model: Building2,
  gift: Gift,
}
