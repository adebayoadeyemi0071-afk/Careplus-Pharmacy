"use client";

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useAuthStore } from "@/components/auth/auth-store";

type PaymentMethod = "cash-on-delivery" | "bank-transfer";

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  deliveryNote: string;
};

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  deliveryNote: "",
};

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((store) => store.items);
  const clearCart = useCartStore((store) => store.clearCart);

  const user = useAuthStore((store) => store.user);
  const isAuthenticated = useAuthStore(
    (store) => store.isAuthenticated
  );

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash-on-delivery");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill in customer details from the signed-in account.
  useEffect(() => {
    const name = user?.name ?? "";
    const email = user?.email ?? "";

    setForm((current) => ({
      ...current,
      fullName: current.fullName || name,
      email: current.email || email,
    }));
  }, [user?.name, user?.email]);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Use the same delivery rule as the cart drawer.
  const delivery = subtotal === 0 || subtotal >= 50000 ? 0 : 2500;

  const total = subtotal + delivery;

  const hasPrescriptionItems = items.some(
    (item) => item.requiresPrescription
  );

  const prescriptionItemCount = items.filter(
    (item) => item.requiresPrescription
  ).length;

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!isAuthenticated) {
      router.push(
        `/auth/sign-in?redirect=${encodeURIComponent("/checkout")}`
      );
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty. Add a product before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `CP-${Date.now().toString().slice(-8)}`;

      const order = {
        id: orderId,
        customer: {
          ...form,
          email: form.email.trim(),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          requiresPrescription: item.requiresPrescription,
          prescriptionVerificationLevel:
            item.prescriptionVerificationLevel,
        })),
        subtotal,
        delivery,
        total,
        paymentMethod,
        requiresPharmacistReview: hasPrescriptionItems,
        status: hasPrescriptionItems
          ? "pending-pharmacist-review"
          : "pending-confirmation",
        createdAt: new Date().toISOString(),
      };

      // Frontend prototype storage. This is not server-side order processing.
      const savedOrders = window.localStorage.getItem("careplus-orders");
      const parsedOrders: unknown = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      const previousOrders = Array.isArray(parsedOrders)
        ? parsedOrders
        : [];

      window.localStorage.setItem(
        "careplus-orders",
        JSON.stringify([order, ...previousOrders])
      );

      window.localStorage.setItem(
        "careplus-last-order",
        JSON.stringify(order)
      );

      clearCart();

      router.push(
        `/order-success?orderId=${encodeURIComponent(orderId)}`
      );
    } catch {
      setError(
        "We couldn't save your checkout details in this browser. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Ask visitors to sign in before accessing checkout.
  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#DDE9E5] bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
            <ShieldCheck size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#102A26]">
            Sign in to continue
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5F706C]">
            Sign in to your CarePlus account to enter your delivery
            details and continue to checkout.
          </p>

          <Link
            href={`/auth/sign-in?redirect=${encodeURIComponent("/checkout")}`}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#086B57] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
          >
            Sign in to continue
            <ArrowRight size={17} />
          </Link>

          <div>
            <Link
              href="/shop"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#086B57] hover:text-[#063D35]"
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Show a clear empty-cart state instead of the Categories page.
  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#DDE9E5] bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
            <ShoppingBag size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#102A26]">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#5F706C]">
            Add the healthcare products you need before continuing
            to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#086B57] px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
          >
            Browse products
            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* Page heading */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

          <div className="mt-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
              CarePlus Pharmacy
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#102A26] sm:text-4xl">
              Checkout
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base">
              Confirm your delivery details and review your order
              before continuing.
            </p>
          </div>

          {/* Checkout progress */}
          <div className="mt-8 flex max-w-lg items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#086B57] text-white">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-xs font-extrabold text-[#086B57]">
                STEP 1
              </p>
              <p className="text-sm font-bold text-[#102A26]">
                Your cart
              </p>
            </div>

            <div className="h-px flex-1 bg-[#B9D8CE]" />

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#086B57] text-sm font-extrabold text-white">
              2
            </div>

            <div>
              <p className="text-xs font-extrabold text-[#086B57]">
                STEP 2
              </p>
              <p className="text-sm font-bold text-[#102A26]">
                Checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]"
        >
          {/* Delivery and payment details */}
          <div className="space-y-6">
            {/* Delivery details */}
            <section className="rounded-[24px] border border-[#DDE9E5] bg-white p-5 shadow-[0_10px_35px_rgba(16,42,38,0.035)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#102A26]">
                    Delivery information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    Tell us where your order should be delivered.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Full name *
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={form.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Email address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Phone number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    minLength={7}
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+234 800 000 0000"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Delivery address *
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    required
                    minLength={8}
                    rows={3}
                    value={form.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    placeholder="House number, street name and area"
                    className="w-full resize-y rounded-xl border border-[#DDE9E5] bg-white px-4 py-3 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    City or town *
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={form.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    placeholder="Enter your city"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    State *
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="address-level1"
                    required
                    value={form.state}
                    onChange={(event) =>
                      updateField("state", event.target.value)
                    }
                    placeholder="Enter your state"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="deliveryNote"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Delivery instructions{" "}
                    <span className="font-medium text-[#8A9A96]">
                      (optional)
                    </span>
                  </label>

                  <textarea
                    id="deliveryNote"
                    name="deliveryNote"
                    rows={2}
                    value={form.deliveryNote}
                    onChange={(event) =>
                      updateField("deliveryNote", event.target.value)
                    }
                    placeholder="Any helpful directions for the delivery rider"
                    className="w-full resize-y rounded-xl border border-[#DDE9E5] bg-white px-4 py-3 text-sm text-[#102A26] outline-none transition placeholder:text-[#9AA9A5] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-[24px] border border-[#DDE9E5] bg-white p-5 shadow-[0_10px_35px_rgba(16,42,38,0.035)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <CreditCard size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#102A26]">
                    Payment method
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    Choose how you intend to pay for your order.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    paymentMethod === "cash-on-delivery"
                      ? "border-[#086B57] bg-[#F1F8F5]"
                      : "border-[#DDE9E5] hover:border-[#B9D8CE]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash-on-delivery"
                    checked={paymentMethod === "cash-on-delivery"}
                    onChange={() =>
                      setPaymentMethod("cash-on-delivery")
                    }
                    className="mt-1 accent-[#086B57]"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-[#102A26]">
                      Cash on delivery
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#5F706C]">
                      Pay when your order is delivered, subject to
                      delivery availability.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    paymentMethod === "bank-transfer"
                      ? "border-[#086B57] bg-[#F1F8F5]"
                      : "border-[#DDE9E5] hover:border-[#B9D8CE]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={() => setPaymentMethod("bank-transfer")}
                    className="mt-1 accent-[#086B57]"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-[#102A26]">
                      Bank transfer
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#5F706C]">
                      Payment instructions must be provided by CarePlus
                      before a transfer is made.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            {/* Prescription warning */}
            {hasPrescriptionItems && (
              <section className="rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6A00]" />

                  <div>
                    <h2 className="text-sm font-extrabold text-[#6F4D00]">
                      Pharmacist review required
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#876A2B]">
                      {prescriptionItemCount}{" "}
                      {prescriptionItemCount === 1 ? "item requires" : "items require"}{" "}
                      prescription review. Dispensing is subject to
                      verification by a qualified pharmacist.
                    </p>

                    <Link
                      href="/prescription-upload"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-[#806000] underline underline-offset-4"
                    >
                      Go to prescription upload
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            {/* Place order */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#086B57] px-6 py-4 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.15)] transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-60 sm:hidden"
            >
              {isSubmitting ? "Preparing order..." : "Place order"}
              {!isSubmitting && <ArrowRight size={17} />}
            </button>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[24px] border border-[#DDE9E5] bg-white shadow-[0_10px_35px_rgba(16,42,38,0.05)]">
              <div className="border-b border-[#DDE9E5] px-5 py-5 sm:px-6">
                <h2 className="text-lg font-extrabold text-[#102A26]">
                  Order summary
                </h2>

                <p className="mt-1 text-sm text-[#5F706C]">
                  {items.reduce((count, item) => count + item.quantity, 0)}{" "}
                  {items.reduce((count, item) => count + item.quantity, 0) === 1
                    ? "item"
                    : "items"}{" "}
                  in your order
                </p>
              </div>

              <div className="max-h-[360px] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[#F1F8F5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold leading-5 text-[#102A26]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-[#5F706C]">
                        Quantity: {item.quantity}
                      </p>

                      {item.requiresPrescription && (
                        <p className="mt-1 text-[11px] font-bold text-[#9A6A00]">
                          Prescription review required
                        </p>
                      )}

                      <p className="mt-2 text-sm font-extrabold text-[#086B57]">
                        {formatNaira(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#DDE9E5] bg-[#FAFCFB] px-5 py-5 sm:px-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#5F706C]">Subtotal</span>
                    <span className="font-bold text-[#102A26]">
                      {formatNaira(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#5F706C]">Delivery</span>
                    <span className="font-bold text-[#102A26]">
                      {delivery === 0 && subtotal >= 50000
                        ? "Free"
                        : formatNaira(delivery)}
                    </span>
                  </div>

                  <div className="h-px bg-[#DDE9E5]" />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-extrabold text-[#102A26]">
                      Total
                    </span>

                    <span className="text-xl font-extrabold text-[#086B57]">
                      {formatNaira(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 hidden w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-60 sm:flex"
                >
                  {isSubmitting ? "Preparing order..." : "Place order"}
                  {!isSubmitting && <ArrowRight size={17} />}
                </button>

                <div className="mt-4 flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#086B57]" />

                  <p className="text-xs leading-5 text-[#6A7B77]">
                    Your delivery information is used to prepare your
                    order. Prescription medicines remain subject to
                    pharmacist review.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#6A7B77]">
              <Truck size={15} />
              Delivery charges are shown before you place your order.
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
