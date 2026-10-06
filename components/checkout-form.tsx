'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Loader2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { lineKey, useCart, type CartItem } from '@/components/cart-provider'
import { errorMessage, isSupabaseConfigured, requireSupabase } from '@/lib/supabase'
import { formatPrice, getCatalog, gradientFor } from '@/lib/products'

const LAST_ORDER_KEY = 'xyz-layers-last-order'

interface Confirmation {
  orderNumber: number
  total: number
  name: string
  email: string
  items: Pick<CartItem, 'productId' | 'name' | 'color' | 'quantity' | 'price'>[]
}

const emptyForm = { name: '', email: '', phone: '', address_line: '', city: '', state: '', pincode: '', notes: '' }

function readLastOrder(): Confirmation | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_KEY)
    return raw ? (JSON.parse(raw) as Confirmation) : null
  } catch {
    return null
  }
}

export function CheckoutForm() {
  const { items, subtotal, hydrated, clear, syncWithCatalog } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const [synced, setSynced] = useState(false)
  const syncStarted = useRef(false)

  // Before the customer commits, bring cart prices and stock in line with the live catalogue.
  useEffect(() => {
    if (!hydrated || syncStarted.current) return
    syncStarted.current = true
    setConfirmation(readLastOrder())

    if (items.length === 0 || !isSupabaseConfigured) {
      setSynced(true)
      return
    }
    getCatalog().then(({ products, failed }) => {
      if (!failed) {
        const { priceChanged, removed } = syncWithCatalog(products)
        if (priceChanged.length) toast.info(`Price updated: ${priceChanged.join(', ')}`)
        if (removed.length) toast.warning(`No longer available and removed from your cart: ${removed.join(', ')}`)
      }
      setSynced(true)
    })
  }, [hydrated, items.length, syncWithCatalog])

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting || items.length === 0) return
    setSubmitting(true)
    setError(null)

    try {
      const { data, error: rpcError } = await requireSupabase().rpc('place_order', {
        customer: form,
        items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity, color: i.color })),
      })
      if (rpcError) throw rpcError

      const result = data as { order_number: number; total: number }
      const placed: Confirmation = {
        orderNumber: result.order_number,
        total: Number(result.total),
        name: form.name.trim(),
        email: form.email.trim(),
        items: items.map(({ productId, name, color, quantity, price }) => ({ productId, name, color, quantity, price })),
      }
      try {
        window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(placed))
      } catch {
        // Only used to survive a page refresh; the order itself is already saved.
      }
      setConfirmation(placed)
      clear()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const message = errorMessage(err, "We couldn't place your order. Please try again.")
      setError(message)
      // A stock or availability problem means our cart is stale: refresh it, and say what changed.
      if (/stock|available/i.test(message)) {
        getCatalog().then(({ products, failed }) => {
          if (failed) return
          const { priceChanged, removed } = syncWithCatalog(products)
          if (removed.length) toast.warning(`Removed from your cart: ${removed.join(', ')}`)
          if (priceChanged.length) toast.info(`Price updated: ${priceChanged.join(', ')}`)
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!hydrated) return <div className="min-h-[50vh]" aria-busy="true" />

  if (confirmation) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-black text-gray-900 font-[family-name:var(--font-poppins)]">Thank you, {confirmation.name.split(' ')[0]}!</h1>
        <p className="mt-4 text-lg text-gray-600 font-[family-name:var(--font-inter)]">
          Your order <strong className="text-gray-900">#{confirmation.orderNumber}</strong> has been placed.
        </p>
        <p className="mt-2 text-gray-600 font-[family-name:var(--font-inter)]">
          We&apos;ll email <strong>{confirmation.email}</strong> to confirm availability, shipping and payment details.
        </p>

        <ul className="mt-8 text-left divide-y divide-gray-100 border border-gray-200 rounded-2xl px-6">
          {confirmation.items.map((item) => (
            <li key={lineKey(item)} className="flex justify-between gap-4 py-4 font-[family-name:var(--font-inter)]">
              <span className="text-gray-800">
                {item.name}
                {item.color ? <span className="text-gray-500 capitalize"> · {item.color}</span> : null}
                <span className="text-gray-500"> × {item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
          <li className="flex justify-between py-4 font-bold font-[family-name:var(--font-poppins)] text-gray-900">
            <span>Total</span>
            <span>{formatPrice(confirmation.total)}</span>
          </li>
        </ul>

        <Button asChild size="lg" className="mt-10 rounded-full px-8 font-[family-name:var(--font-poppins)]">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <ShoppingBag className="w-14 h-14 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-gray-900 font-[family-name:var(--font-poppins)]">Your cart is empty</h1>
        {error && (
          // The cart was emptied because of the failed order: don't hide the reason.
          <p role="alert" className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            Your order wasn&apos;t placed. {error}
          </p>
        )}
        <p className="mt-3 text-gray-600 font-[family-name:var(--font-inter)]">Add something you like and come back to check out.</p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8 font-[family-name:var(--font-poppins)]">
          <Link href="/shop">Browse the shop</Link>
        </Button>
      </div>
    )
  }

  const field = 'space-y-2'
  const label = 'block text-sm font-semibold text-gray-900 font-[family-name:var(--font-poppins)]'

  return (
    <div>
      <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-10 font-[family-name:var(--font-poppins)] tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Delivery details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={field}>
              <label htmlFor="name" className={label}>Full name</label>
              <Input id="name" required autoComplete="name" value={form.name} onChange={update('name')} />
            </div>
            <div className={field}>
              <label htmlFor="phone" className={label}>Phone</label>
              <Input
                id="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="[\d+\s\-\(\)]{7,20}"
                title="Enter a valid phone number"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={update('phone')}
              />
            </div>
          </div>

          <div className={field}>
            <label htmlFor="email" className={label}>Email</label>
            <Input id="email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} />
          </div>

          <div className={field}>
            <label htmlFor="address_line" className={label}>Address</label>
            <Input
              id="address_line"
              required
              autoComplete="street-address"
              placeholder="House / flat, street, area"
              value={form.address_line}
              onChange={update('address_line')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={field}>
              <label htmlFor="city" className={label}>City</label>
              <Input id="city" required autoComplete="address-level2" value={form.city} onChange={update('city')} />
            </div>
            <div className={field}>
              <label htmlFor="state" className={label}>State</label>
              <Input id="state" required autoComplete="address-level1" value={form.state} onChange={update('state')} />
            </div>
            <div className={field}>
              <label htmlFor="pincode" className={label}>PIN code</label>
              <Input
                id="pincode"
                required
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                title="Enter a 6-digit PIN code"
                value={form.pincode}
                onChange={update('pincode')}
              />
            </div>
          </div>

          <div className={field}>
            <label htmlFor="notes" className={label}>Order notes (optional)</label>
            <Textarea id="notes" rows={3} value={form.notes} onChange={update('notes')} />
          </div>

          {!isSupabaseConfigured && (
            <p role="alert" className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
              Ordering isn&apos;t available yet because the store database isn&apos;t connected.
            </p>
          )}
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={submitting || !synced || !isSupabaseConfigured}
            className="w-full rounded-full h-12 text-base font-[family-name:var(--font-poppins)]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Placing order…
              </>
            ) : (
              `Place order · ${formatPrice(subtotal)}`
            )}
          </Button>
          <p className="text-xs text-gray-500 text-center font-[family-name:var(--font-inter)]">
            No payment is taken now. We&apos;ll contact you to confirm availability, shipping and payment.
          </p>
        </form>

        <aside className="lg:col-span-2 lg:sticky lg:top-28 border border-gray-200 rounded-2xl p-6 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">Order summary</h2>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={lineKey(item)} className="flex gap-4 py-4">
                <div className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden ${gradientFor(item.productId)}`}>
                  {item.image && <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0 font-[family-name:var(--font-inter)]">
                  <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty {item.quantity}
                    {item.color ? <span className="capitalize"> · {item.color}</span> : null}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 font-[family-name:var(--font-poppins)]">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-[family-name:var(--font-inter)]">Shipping is confirmed after you place the order.</p>
        </aside>
      </div>
    </div>
  )
}
