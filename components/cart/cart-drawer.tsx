
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useAuthStore } from "@/components/auth/auth-store";

export default function CartDrawer() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);

  const closeCart = useCartStore(
    (state) => state.closeCart
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const hasPrescriptionItems = items.some(
    (item) => item.requiresPrescription
  );

  const prescriptionItemCount = items.filter(
    (item) => item.requiresPrescription
  ).length;

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal >= 50000 ? 0 : 2500;

  const total = subtotal + delivery;

  const handleCheckout = () => {
    closeCart();

    if (!isAuthenticated) {
      router.push(
        "/auth/sign-in?redirect=%2Fcheckout"
      );

      return;
    }

    router.push("/checkout");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDE9E5] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F5F0]">
              <ShoppingBag className="h-5 w-5 text-[#086B57]" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-[#102A26]">
                Your Cart
              </h2>

              <p className="text-xs font-medium text-[#5F706C]">
                {items.length === 0
                  ? "No items yet"
                  : `${items.length} ${
                      items.length === 1
                        ? "item"
                        : "items"
                    }`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#102A26]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart contents */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F5F0]">
                <ShoppingBag className="h-7 w-7 text-[#086B57]" />
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#102A26]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#5F706C]">
                Browse our products and add the things you need
                to your cart.
              </p>

              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/shop");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#DDE9E5] bg-white p-4"
                >
                  <div className="flex gap-4">
                    {/* Product image */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F1F8F5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>

                    {/* Product information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#102A26]">
                          {item.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 text-[#8A9A96] transition hover:text-[#D64545]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-2 text-sm font-extrabold text-[#086B57]">
                        ₦{item.price.toLocaleString()}
                      </p>

                      {item.requiresPrescription && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E5] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#9A6A00]">
                          <ShieldAlert size={11} />
                          Prescription Only
                        </div>
                      )}

                      {/* Quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-lg border border-[#DDE9E5]">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            aria-label={`Decrease ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center text-[#5F706C] transition hover:bg-[#F1F8F5]"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>

                          <span className="flex h-8 min-w-9 items-center justify-center border-x border-[#DDE9E5] px-2 text-xs font-extrabold text-[#102A26]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            aria-label={`Increase ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center text-[#5F706C] transition hover:bg-[#F1F8F5]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="text-sm font-extrabold text-[#102A26]">
                          ₦
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#B43B3B] transition hover:text-[#8E2F2F]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-[#DDE9E5] bg-[#FAFCFB] px-5 py-5 sm:px-6">
            {hasPrescriptionItems && (
              <div className="mb-5 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6A00]" />

                  <div>
                    <p className="text-sm font-extrabold text-[#6F4D00]">
                      Prescription medicines in your cart
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#876A2B]">
                      {prescriptionItemCount === 1
                        ? "1 item requires"
                        : `${prescriptionItemCount} items require`}{" "}
                      a valid prescription and pharmacist
                      review before the order can proceed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#5F706C]">
                  Subtotal
                </span>

                <span className="font-bold text-[#102A26]">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5F706C]">
                  Delivery
                </span>

                <span className="font-bold text-[#102A26]">
                  {delivery === 0
                    ? "Free"
                    : `₦${delivery.toLocaleString()}`}
                </span>
              </div>

              <div className="h-px bg-[#DDE9E5]" />

              <div className="flex items-center justify-between">
                <span className="text-base font-extrabold text-[#102A26]">
                  Total
                </span>

                <span className="text-lg font-extrabold text-[#086B57]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout */}
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            {!isAuthenticated && (
              <p className="mt-3 text-center text-xs leading-5 text-[#5F706C]">
                You&apos;ll need to sign in before completing your
                order.
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
