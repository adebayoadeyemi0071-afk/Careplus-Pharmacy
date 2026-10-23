
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
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const clearCart = useCartStore((state) => state.clearCart);

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
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal === 0 || subtotal >= 50000 ? 0 : 2500;

  const total = subtotal + delivery;

  const handleCheckout = () => {
    closeCart();

    const destination = hasPrescriptionItems
      ? "/prescription-upload"
      : "/checkout";

    if (!isAuthenticated) {
      router.push(
        `/auth/sign-in?redirect=${encodeURIComponent(destination)}`
      );
      return;
    }

    router.push(destination);
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
      />

      <aside
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
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
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5F706C] hover:bg-[#F1F8F5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-[#086B57]" />

              <h3 className="mt-5 text-lg font-extrabold text-[#102A26]">
                Your cart is empty
              </h3>

              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/shop");
                }}
                className="mt-6 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#063D35]"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#DDE9E5] p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F1F8F5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-extrabold text-[#102A26]">
                          {item.name}
                        </h3>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#8A9A96] hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-2 text-sm font-extrabold text-[#086B57]">
                        ₦{item.price.toLocaleString("en-NG")}
                      </p>

                      {item.requiresPrescription && (
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFF7E5] px-2.5 py-1 text-[10px] font-extrabold text-[#9A6A00]">
                          <ShieldAlert size={12} />
                          Prescription required
                        </span>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-lg border border-[#DDE9E5]">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center hover:bg-[#F1F8F5]"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="flex h-8 min-w-9 items-center justify-center border-x border-[#DDE9E5] px-2 text-xs font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center hover:bg-[#F1F8F5]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <p className="text-sm font-extrabold text-[#102A26]">
                          ₦{(
                            item.price * item.quantity
                          ).toLocaleString("en-NG")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-2 text-xs font-bold text-red-700"
              >
                <Trash2 size={14} />
                Clear cart
              </button>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#DDE9E5] bg-[#FAFCFB] px-5 py-5 sm:px-6">
            {hasPrescriptionItems && (
              <div className="mb-5 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
                <p className="text-sm font-extrabold text-[#6F4D00]">
                  Prescription medicines in your cart
                </p>
                <p className="mt-1 text-xs leading-5 text-[#876A2B]">
                  {prescriptionItemCount}{" "}
                  {prescriptionItemCount === 1 ? "item requires" : "items require"}{" "}
                  prescription upload and review before checkout.
                </p>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5F706C]">Subtotal</span>
                <span className="font-bold text-[#102A26]">
                  ₦{subtotal.toLocaleString("en-NG")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#5F706C]">Delivery</span>
                <span className="font-bold text-[#102A26]">
                  {delivery === 0
                    ? "Free"
                    : `₦${delivery.toLocaleString("en-NG")}`}
                </span>
              </div>

              <div className="h-px bg-[#DDE9E5]" />

              <div className="flex justify-between">
                <span className="text-base font-extrabold text-[#102A26]">
                  Total
                </span>
                <span className="text-lg font-extrabold text-[#086B57]">
                  ₦{total.toLocaleString("en-NG")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3.5 text-sm font-extrabold text-white hover:bg-[#063D35]"
            >
              {hasPrescriptionItems
                ? "Upload prescription"
                : "Proceed to checkout"}
              <ArrowRight size={16} />
            </button>

            {!isAuthenticated && (
              <p className="mt-3 text-center text-xs text-[#5F706C]">
                You will need to sign in before continuing.
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
