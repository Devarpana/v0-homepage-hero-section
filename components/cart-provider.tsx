'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/lib/products'

const STORAGE_KEY = 'xyz-layers-cart-v1'
const MAX_PER_LINE = 99

export interface CartItem {
  productId: string
  name: string
  /** Display price only. The server recomputes every price when the order is placed. */
  price: number
  image: string | null
  color: string | null
  quantity: number
  /** Stock when the item was added or last synced; caps the quantity stepper. */
  maxQuantity: number
}

export type NewCartItem = Omit<CartItem, 'quantity' | 'maxQuantity'> & { stock: number }

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  /** False until the saved cart has been read, so pages don't flash "empty". */
  hydrated: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: NewCartItem, quantity?: number) => void
  updateQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  /** Refreshes prices and stock from the live catalogue; returns what changed. */
  syncWithCatalog: (products: Product[]) => { priceChanged: string[]; removed: string[] }
}

const CartContext = createContext<CartContextValue | null>(null)

export function lineKey(item: Pick<CartItem, 'productId' | 'color'>): string {
  return `${item.productId}::${item.color ?? ''}`
}

function clampQuantity(quantity: number, max: number): number {
  return Math.max(1, Math.min(Math.floor(quantity) || 1, Math.max(1, max), MAX_PER_LINE))
}

/** Saved carts are untrusted input: drop anything malformed rather than crash the page. */
function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((entry): CartItem[] => {
      if (!entry || typeof entry !== 'object') return []
      const e = entry as Record<string, unknown>
      if (typeof e.productId !== 'string' || typeof e.name !== 'string') return []
      if (typeof e.price !== 'number' || !Number.isFinite(e.price) || e.price < 0) return []
      const max = typeof e.maxQuantity === 'number' && e.maxQuantity >= 1 ? e.maxQuantity : MAX_PER_LINE
      return [
        {
          productId: e.productId,
          name: e.name,
          price: e.price,
          image: typeof e.image === 'string' ? e.image : null,
          color: typeof e.color === 'string' ? e.color : null,
          quantity: clampQuantity(typeof e.quantity === 'number' ? e.quantity : 1, max),
          maxQuantity: max,
        },
      ]
    })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setItems(readStoredCart())
    setHydrated(true)

    // Keep several open tabs in step.
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(readStoredCart())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Private mode / quota: the cart still works for this page view.
    }
  }, [items, hydrated])

  const addItem = useCallback((item: NewCartItem, quantity = 1) => {
    const { stock, ...line } = item
    const max = Math.min(Math.max(stock, 0), MAX_PER_LINE)
    if (max < 1) return
    setItems((current) => {
      const key = lineKey(line)
      const existing = current.find((i) => lineKey(i) === key)
      if (existing) {
        return current.map((i) =>
          lineKey(i) === key
            ? { ...i, price: line.price, maxQuantity: max, quantity: clampQuantity(i.quantity + quantity, max) }
            : i,
        )
      }
      return [...current, { ...line, quantity: clampQuantity(quantity, max), maxQuantity: max }]
    })
  }, [])

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((i) => (lineKey(i) === key ? { ...i, quantity: clampQuantity(quantity, i.maxQuantity) } : i)),
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((i) => lineKey(i) !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const syncWithCatalog = useCallback(
    (products: Product[]) => {
      const byId = new Map(products.map((p) => [p.id, p]))
      const priceChanged: string[] = []
      const removed: string[] = []

      const next = items.flatMap((item): CartItem[] => {
        const live = byId.get(item.productId)
        if (!live || live.stock < 1) {
          removed.push(item.name)
          return []
        }
        if (live.price !== item.price) priceChanged.push(live.name)
        return [
          {
            ...item,
            name: live.name,
            price: live.price,
            image: live.image,
            maxQuantity: Math.min(live.stock, MAX_PER_LINE),
            quantity: clampQuantity(item.quantity, live.stock),
          },
        ]
      })

      // Lines are small; a string compare is the simplest correct "did anything change" check.
      if (JSON.stringify(next) !== JSON.stringify(items)) setItems(next)
      return { priceChanged, removed }
    },
    [items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      hydrated,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clear,
      syncWithCatalog,
    }),
    [items, hydrated, isOpen, addItem, updateQuantity, removeItem, clear, syncWithCatalog],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
