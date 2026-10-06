'use client'

import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { lineKey, useCart } from '@/components/cart-provider'
import { formatPrice, gradientFor } from '@/lib/products'

export function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeCart, updateQuantity, removeItem } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col gap-0 p-0">
        <SheetHeader className="p-6 border-b border-gray-200">
          <SheetTitle className="font-[family-name:var(--font-poppins)] text-xl">
            Your Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </SheetTitle>
          <SheetDescription className="sr-only">Review the items in your cart before checkout.</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
            <p className="text-gray-600 font-[family-name:var(--font-inter)]">Your cart is empty.</p>
            <Button asChild onClick={closeCart} className="rounded-full font-[family-name:var(--font-poppins)]">
              <Link href="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 px-6">
              {items.map((item) => {
                const key = lineKey(item)
                return (
                  <li key={key} className="flex gap-4 py-5">
                    <Link
                      href={`/product/${item.productId}`}
                      onClick={closeCart}
                      className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden ${gradientFor(item.productId)}`}
                    >
                      {item.image && <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.productId}`}
                        onClick={closeCart}
                        className="block font-semibold text-gray-900 font-[family-name:var(--font-poppins)] truncate hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      {item.color && (
                        <p className="text-xs text-gray-500 capitalize font-[family-name:var(--font-inter)]">Colour: {item.color}</p>
                      )}
                      <p className="text-sm font-semibold text-primary mt-1 font-[family-name:var(--font-poppins)]">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() => updateQuantity(key, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() => updateQuantity(key, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="p-2 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(key)}
                          className="p-2 text-gray-400 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.quantity >= item.maxQuantity && (
                        <p className="text-xs text-orange-600 mt-1">Maximum available quantity</p>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <SheetFooter className="p-6 border-t border-gray-200 gap-3">
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-600 font-[family-name:var(--font-inter)]">Subtotal</span>
                <span className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)]">Shipping and payment are confirmed after you place the order.</p>
              <Button asChild size="lg" onClick={closeCart} className="w-full rounded-full h-12 font-[family-name:var(--font-poppins)]">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
