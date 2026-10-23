"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
  AlertCircle,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useAuthStore } from "@/components/auth/auth-store";

type PaymentMethod = "delivery" | "transfer" | "card";

type DeliveryDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
};

const PRESCRIPTION_STATUS_KEY = "careplus-prescription-status";
const ORDERS_STORAGE_KEY = "careplus-orders";

const inputClassName =
  "mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10";

const labelClassName =
  "block text-sm font-bold text-[#102A26]";

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((store) => store.items);
  const clearCart = useCartStore((store) => store.clearCart);

  const isAuthenticated = useAuthStore(
    (store) => store.isAuthenticated
  );

  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [prescriptionStatus, setPrescriptionStatus] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("delivery");

  const [deliveryDetails, setDeliveryDetails] =
    useState<DeliveryDetails>({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      landmark: "",
    });

  const hasPrescriptionItems = useMemo(
    () => items.some((item) => item.requiresPrescription),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  // Delivery is free for orders of ₦50,000 or more.
  const deliveryFee = subtotal >= 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    setIsReady(true);

    if (typeof window !== "undefined") {
      setPrescriptionStatus(
        window.localStorage.getItem(PRESCRIPTION_STATUS_KEY) ?? ""
      );
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (!isAuthenticated) {
      router.replace(
        `/auth/sign-in?redirect=${encodeURIComponent("/checkout")}`
      );
    }
  }, [isReady, isAuthenticated, router]);

  const updateDeliveryField = (
    field: keyof DeliveryDetails,
    value: string
  ) => {
    setDeliveryDetails((current) => ({
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
      setError("Your cart is empty. Add products before checking out.");
      return;
    }

    /*
     * Prescription items must pass through the prescription page first.
     * The "approved" value is a frontend demo status, not real pharmacist
     * approval or a production medicine-dispensing authorization.
     */
    const currentPrescriptionStatus =
      typeof window !== "undefined"
        ? window.localStorage.getItem(PRESCRIPTION_STATUS_KEY)
        : null;

    if (
      hasPrescriptionItems &&
      currentPrescriptionStatus !== "approved"
    ) {
      router.push("/prescription-upload");
      return;
    }

    if (!deliveryDetails.fullName.trim()) {
      setError("Enter the recipient's full name.");
      return;
    }

    if (!deliveryDetails.email.trim()) {
      setError("Enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryDetails.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!deliveryDetails.phone.trim()) {
      setError("Enter a phone number for delivery.");
      return;
    }

    if (!deliveryDetails.address.trim()) {
      setError("Enter your delivery address.");
      return;
    }

    if (!deliveryDetails.city.trim()) {
      setError("Enter your city or town.");
      return;
    }

    if (!deliveryDetails.state.trim()) {
      setError("Enter your state.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = `CP-${Date.now().toString().slice(-8)}`;

      const order = {
        id: orderId,
        orderNumber: orderId,
        createdAt: new Date().toISOString(),
        status: "confirmed",
        paymentStatus:
          paymentMethod === "delivery"
            ? "pay-on-delivery"
            : "pending",
        paymentMethod,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          requiresPrescription: item.requiresPrescription,
        })),
        deliveryDetails: {
          ...deliveryDetails,
        },
        subtotal,
        deliveryFee,
        total,
        currency: "NGN",
        hasPrescriptionItems,
        prescriptionStatus: hasPrescriptionItems
          ? currentPrescriptionStatus
          : "not-required",
      };

      const savedOrders = window.localStorage.getItem(
        ORDERS_STORAGE_KEY
      );

      const parsedOrders: unknown = savedOrders
        ? JSON.parse(savedOrders)
        : [];

      const orders = Array.isArray(parsedOrders)
        ? parsedOrders
        : [];

      window.localStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify([order, ...orders])
      );

      window.localStorage.setItem(
        "careplus-latest-order",
        JSON.stringify(order)
      );

      window.localStorage.removeItem(PRESCRIPTION_STATUS_KEY);

      clearCart();

      router.push("/order-success");
    } catch {
      setError(
        "We couldn't save your order in this browser. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFCFB] px-5">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#DDE9E5] border-t-[#086B57]" />
          <p className="mt-4 text-sm font-semibold text-[#5F706C]">
            Preparing your checkout...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFCFB] px-5">
        <div className="text-center">
          <p className="text-sm text-[#5F706C]">
            Redirecting you to sign in...
          </p>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[60vh] bg-[#FAFCFB] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#DDE9E5] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
            <ShoppingBag className="h-7 w-7" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-[#102A26]">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#5F706C]">
            Add the products you need before proceeding to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
          >
            Browse products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFCFB] pb-16">
      {/* Page header */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#086B57]">
                CarePlus Pharmacy
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#102A26] sm:text-4xl">
                Checkout
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#5F706C]">
                Confirm your delivery information and review your order
                before placing it.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-[#086B57]">
              <ShieldCheck className="h-5 w-5" />
              Secure checkout
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 pt-8 sm:px-8 lg:grid-cols-[1fr_400px] lg:gap-10 lg:px-10">
        {/* Delivery and payment form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Delivery information */}
          <section className="rounded-[26px] border border-[#DDE9E5] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,38,0.035)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57]">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#102A26]">
                  Delivery information
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className={labelClassName}>
                  Recipient&apos;s full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  value={deliveryDetails.fullName}
                  onChange={(event) =>
                    updateDeliveryField("fullName", event.target.value)
                  }
                  placeholder="Enter your full name"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClassName}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={deliveryDetails.email}
                  onChange={(event) =>
                    updateDeliveryField("email", event.target.value)
                  }
                  placeholder="you@example.com"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClassName}>
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={deliveryDetails.phone}
                  onChange={(event) =>
                    updateDeliveryField("phone", event.target.value)
                  }
                  placeholder="+234 800 000 0000"
                  className={inputClassName}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClassName}>
                  Street address
                </label>
                <input
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  value={deliveryDetails.address}
                  onChange={(event) =>
                    updateDeliveryField("address", event.target.value)
                  }
                  placeholder="House number, street name, area"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className={labelClassName}>
                  City or town
                </label>
                <input
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  value={deliveryDetails.city}
                  onChange={(event) =>
                    updateDeliveryField("city", event.target.value)
                  }
                  placeholder="Enter your city"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className={labelClassName}>
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  value={deliveryDetails.state}
                  onChange={(event) =>
                    updateDeliveryField("state", event.target.value)
                  }
                  placeholder="Enter your state"
                  className={inputClassName}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="landmark" className={labelClassName}>
                  Nearby landmark{" "}
                  <span className="font-medium text-[#8A9A96]">
                    (optional)
                  </span>
                </label>
                <input
                  id="landmark"
                  name="landmark"
                  value={deliveryDetails.landmark}
                  onChange={(event) =>
                    updateDeliveryField("landmark", event.target.value)
                  }
                  placeholder="A nearby shop, school, or landmark"
                  className={inputClassName}
                />
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className="rounded-[26px] border border-[#DDE9E5] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,38,0.035)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57]">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#102A26]">
                  Payment method
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                  Choose how you want to pay for your order.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
                  paymentMethod === "delivery"
                    ? "border-[#086B57] bg-[#F1F8F5]"
                    : "border-[#DDE9E5] hover:border-[#AFCBC2]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="delivery"
                  checked={paymentMethod === "delivery"}
                  onChange={() => setPaymentMethod("delivery")}
                  className="mt-1 accent-[#086B57]"
                />

                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                <span>
                  <span className="block text-sm font-extrabold text-[#102A26]">
                    Pay on delivery
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#5F706C]">
                    Pay when your order arrives, where available.
                  </span>
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
                  paymentMethod === "transfer"
                    ? "border-[#086B57] bg-[#F1F8F5]"
                    : "border-[#DDE9E5] hover:border-[#AFCBC2]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                  className="mt-1 accent-[#086B57]"
                />

                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                <span>
                  <span className="block text-sm font-extrabold text-[#102A26]">
                    Bank transfer
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#5F706C]">
                    Transfer instructions would be provided by the pharmacy.
                  </span>
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
                  paymentMethod === "card"
                    ? "border-[#086B57] bg-[#F1F8F5]"
                    : "border-[#DDE9E5] hover:border-[#AFCBC2]"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="mt-1 accent-[#086B57]"
                />

                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                <span>
                  <span className="block text-sm font-extrabold text-[#102A26]">
                    Card payment
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#5F706C]">
                    Online card processing must be connected before live use.
                  </span>
                </span>
              </label>
            </div>
          </section>

          {/* Prescription status */}
          {hasPrescriptionItems && (
            <section className="rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-5">
              <div className="flex items-start gap-3">
                {prescriptionStatus === "approved" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#087A4B]" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6A00]" />
                )}

                <div>
                  <h2 className="text-sm font-extrabold text-[#6F4D00]">
                    Prescription medicines in your order
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#876A2B]">
                    {prescriptionStatus === "approved"
                      ? "The demo prescription status is marked as approved. You can continue in this demonstration."
                      : "Prescription items require prescription submission and review before checkout can continue."}
                  </p>

                  {prescriptionStatus !== "approved" && (
                    <Link
                      href="/prescription-upload"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-[#086B57] underline underline-offset-4"
                    >
                      Upload prescription
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-[#F0C7C7] bg-[#FFF6F6] px-4 py-3"
            >
              <p className="text-sm font-semibold leading-6 text-[#B43B3B]">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.15)] transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Placing order...
              </>
            ) : (
              <>
                Place order · {formatNaira(total)}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs leading-5 text-[#8A9A96]">
            By placing your order, you confirm that your delivery information
            is correct.
          </p>
        </form>

        {/* Order summary */}
        <aside className="h-fit rounded-[26px] border border-[#DDE9E5] bg-white p-5 shadow-[0_8px_30px_rgba(16,42,38,0.035)] sm:p-7 lg:sticky lg:top-6">
          <h2 className="text-lg font-extrabold text-[#102A26]">
            Order summary
          </h2>

          <p className="mt-1 text-sm text-[#5F706C]">
            {items.length} {items.length === 1 ? "product" : "products"} in
            your cart
          </p>

          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-[#DDE9E5] bg-[#F7FAF9]">
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

                  <p className="mt-1 text-xs text-[#5F706C]">
                    Quantity: {item.quantity}
                  </p>

                  {item.requiresPrescription && (
                    <p className="mt-1 text-[11px] font-bold text-[#9A6A00]">
                      Prescription required
                    </p>
                  )}

                  <p className="mt-2 text-sm font-extrabold text-[#086B57]">
                    {formatNaira(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-[#DDE9E5]" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#5F706C]">Subtotal</span>
              <span className="font-bold text-[#102A26]">
                {formatNaira(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-[#5F706C]">Delivery</span>
              <span className="font-bold text-[#102A26]">
                {deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}
              </span>
            </div>
          </div>

          <div className="my-5 h-px bg-[#DDE9E5]" />

          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-extrabold text-[#102A26]">
              Total
            </span>
            <span className="text-xl font-extrabold text-[#086B57]">
              {formatNaira(total)}
            </span>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F1F8F5] p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />
            <p className="text-xs leading-5 text-[#5F706C]">
              CarePlus is designed to help customers order healthcare
              products with clear delivery and prescription steps.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
