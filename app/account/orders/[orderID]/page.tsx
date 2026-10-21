"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";

type OrderStatus =
  | "Delivered"
  |  "Processing"
  | "Out for delivery"
  | "Cancelled";

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: number;
  total: number;
  products: string[];
}

const demoOrders: Order[] = [
  {
    id: "CP-202609-1042",
    date: "September 18, 2026",
    status: "Delivered",
    items: 3,
    total: 18500,
    products: [
      "Vitamin C 1000mg",
      "Daily Multivitamins",
      "Hand Sanitizer",
    ],
  },
  {
    id: "CP-202609-0974",
    date: "September 12, 2026",
    status: "Out for delivery",
    items: 2,
    total: 12750,
    products: [
      "Paracetamol 500mg",
      "Omega-3 Capsules",
    ],
  },
  {
    id: "CP-202609-0811",
    date: "September 4, 2026",
    status: "Processing",
    items: 4,
    total: 24300,
    products: [
      "Vitamin D3 1000IU",
      "Zinc 50mg",
      "Toothpaste",
      "Mouthwash",
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(
        "/auth/sign-in?redirect=%2Faccount%2Forders"
      );
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#DDE9E5] border-t-[#086B57]" />

            <p className="text-sm font-semibold text-[#5F706C]">
              Loading your orders...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      {/* Header */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <Link
            href="/account"
            className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to account
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
                ORDER HISTORY
              </p>

              <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#102A26] sm:text-4xl">
                My orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#5F706C] sm:text-base">
                View your orders, track deliveries and see what
                you&apos;ve purchased from CarePlus.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Temporary data notice */}
        <div className="mb-6 flex gap-3 rounded-2xl border border-[#DDE9E5] bg-[#F1F8F5] p-4">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

          <div>
            <p className="text-sm font-extrabold text-[#102A26]">
              Order history preview
            </p>

            <p className="mt-1 text-xs leading-5 text-[#5F706C]">
              These are temporary orders for the frontend preview.
              Your real order history will be connected when the
              CarePlus backend is integrated.
            </p>
          </div>
        </div>

        {demoOrders.length > 0 ? (
          <div className="space-y-5">
            {demoOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyOrders />
        )}
      </section>
    </main>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white">
      {/* Order top */}
      <div className="border-b border-[#DDE9E5] px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57]">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-extrabold text-[#102A26]">
                  {order.id}
                </p>

                <StatusBadge status={order.status} />
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A9A96]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {order.date}
                </span>

                <span>
                  {order.items}{" "}
                  {order.items === 1 ? "item" : "items"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:text-right">
            <p className="text-xs font-semibold text-[#8A9A96]">
              Order total
            </p>

            <p className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#102A26]">
              ₦{order.total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="px-5 py-5 sm:px-6">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#8A9A96]">
          PRODUCTS
        </p>

        <div className="space-y-2">
          {order.products.map((product, index) => (
            <div
              key={`${order.id}-${product}`}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F8F5] text-xs font-extrabold text-[#086B57]">
                {index + 1}
              </div>

              <p className="text-sm font-semibold text-[#102A26]">
                {product}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-[#DDE9E5] bg-[#FAFCFB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <DeliveryMessage status={order.status} />

        <button
          type="button"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-extrabold text-[#086B57] transition hover:text-[#063D35]"
        >
          View order
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<
    OrderStatus,
    {
      background: string;
      text: string;
      icon: typeof CheckCircle2;
    }
  > = {
    Delivered: {
      background: "bg-[#EAF7F1]",
      text: "text-[#16845E]",
      icon: CheckCircle2,
    },
    Processing: {
      background: "bg-[#FFF7E7]",
      text: "text-[#A76C00]",
      icon: Clock3,
    },
    "Out for delivery": {
      background: "bg-[#EAF3FB]",
      text: "text-[#2873A7]",
      icon: Truck,
    },
    Cancelled: {
      background: "bg-[#FFF0F0]",
      text: "text-[#B43B3B]",
      icon: XCircle,
    },
  };

  const config = styles[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${config.background} ${config.text}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

function DeliveryMessage({
  status,
}: {
  status: OrderStatus;
}) {
  if (status === "Delivered") {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-[#16845E]">
        <CheckCircle2 className="h-4 w-4" />
        Delivered successfully
      </div>
    );
  }

  if (status === "Out for delivery") {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-[#2873A7]">
        <Truck className="h-4 w-4" />
        Your order is on its way
      </div>
    );
  }

  if (status === "Processing") {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-[#A76C00]">
        <Clock3 className="h-4 w-4" />
        Your order is being prepared
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-[#B43B3B]">
      <XCircle className="h-4 w-4" />
      This order was cancelled
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="rounded-2xl border border-[#DDE9E5] bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
        <ShoppingBag className="h-7 w-7" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.03em] text-[#102A26]">
        No orders yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5F706C]">
        When you place an order with CarePlus, it will appear
        here so you can easily track and manage it.
      </p>

      <Link
        href="/shop"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
      >
        Start shopping
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}