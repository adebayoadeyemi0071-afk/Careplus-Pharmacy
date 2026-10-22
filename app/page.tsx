
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Truck,
  UserRound,
  CreditCard,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://careplus-pharmacy-nu.vercel.app/#website",
  url: "https://careplus-pharmacy-nu.vercel.app/",
  name: "CarePlus Pharmacy",
  alternateName: "CarePlus",
  description:
    "CarePlus Pharmacy's healthcare product catalogue and online shopping experience.",
  inLanguage: "en-NG",
};

const trustItems = [
  {
    title: "Genuine Products",
    description: "100% authentic and trusted",
    icon: BadgeCheck,
  },
  {
    title: "Fast Delivery",
    description: "Across your location",
    icon: Truck,
  },
  {
    title: "Expert Pharmacists",
    description: "Always here to help",
    icon: UserRound,
  },
  {
    title: "Secure Payments",
    description: "Safe & easy checkout",
    icon: CreditCard,
  },
];

const popularProducts = [
  {
    id: "paracetamol",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 1500,
    image: "/images/products/paracetamol.jpg",
    requiresPrescription: false,
    prescriptionVerificationLevel: "none" as const,
  },
  {
    id: "vitamin-c",
    name: "Vitamin C 1000mg",
    category: "Vitamins",
    price: 4500,
    image: "/images/products/vitamin-c.png",
    requiresPrescription: false,
    prescriptionVerificationLevel: "none" as const,
  },
  {
    id: "multivitamin",
    name: "Daily Multivitamins",
    category: "Supplements",
    price: 5500,
    image: "/images/products/multivitamin.jpg",
    requiresPrescription: false,
    prescriptionVerificationLevel: "none" as const,
  },
  {
    id: "omega-3",
    name: "Omega 3 Capsules",
    category: "Supplements",
    price: 8500,
    image: "/images/products/omega-3.jpg",
    requiresPrescription: false,
    prescriptionVerificationLevel: "none" as const,
  },
  {
    id: "hand-sanitizer",
    name: "Hand Sanitizer",
    category: "Personal Care",
    price: 2000,
    image: "/images/products/hand-sanitizer.jpg",
    requiresPrescription: false,
    prescriptionVerificationLevel: "none" as const,
  },
];

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <main className="bg-[#FAFCFB]">
      {/* HOMEPAGE STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="overflow-hidden bg-[#E8F5F1]">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] lg:grid-cols-2">
          {/* Hero Content */}
          <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
            <div className="max-w-[620px]">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#086B57] sm:text-sm">
                Your Health, Our Priority
              </p>

              <h1 className="max-w-[650px] text-5xl font-extrabold leading-[1.02] tracking-[-0.015em] text-[#063D35] sm:text-6xl lg:text-[64px] xl:text-[70px]">
                Quality Medicines
                <br />
                for a Healthier You
              </h1>

              <p className="mt-7 max-w-[560px] text-base font-medium leading-7 text-[#4F6863] sm:text-lg sm:leading-8">
                Get genuine medicines, health products and expert advice —
                all in one place. Fast, safe and reliable.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 rounded-full bg-[#086B57] px-7 py-4 text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-[#063D35] hover:shadow-md"
                >
                  Shop Now
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <Image
              src="/images/hero-pharmacist.jpg"
              alt="CarePlus pharmacist"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#E8F5F1] to-transparent lg:block" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#063D35]/20 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST / BENEFITS
      ========================================================= */}

      <section className="border-b border-[#E3ECE9] bg-white">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-6 py-7 sm:px-8 lg:px-8 xl:px-10 ${
                  index !== 0
                    ? "border-t border-[#E3ECE9] sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#CDE9E1] bg-[#E8F5F1] text-[#086B57]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 className="text-sm font-bold tracking-[-0.01em] text-[#102A26]">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-xs font-medium leading-5 text-[#6A7B77]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          POPULAR PRODUCTS
      ========================================================= */}

      <section className="bg-[#FAFCFB]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57] sm:text-sm">
                Popular Products
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.025em] text-[#102A26] sm:text-4xl lg:text-[42px]">
                Everyday essentials
              </h2>

              <p className="mt-3 max-w-[560px] text-sm font-medium leading-6 text-[#6A7B77] sm:text-base">
                Trusted healthcare essentials selected for your everyday
                needs.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#086B57] transition hover:text-[#063D35]"
            >
              View all products
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {popularProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-[#F1F8F5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#102A26] shadow-sm backdrop-blur transition hover:bg-[#086B57] hover:text-white"
                  >
                    <Heart size={17} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7A8985]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 min-h-[42px] text-sm font-bold leading-5 text-[#102A26]">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-base font-extrabold text-[#086B57]">
                      ₦{product.price.toLocaleString()}
                    </p>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          requiresPrescription: product.requiresPrescription,
                          prescriptionVerificationLevel:
                            product.prescriptionVerificationLevel,
                        })
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F5F1] text-[#086B57] transition hover:bg-[#086B57] hover:text-white"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="bg-[#FAFCFB] px-6 pb-14 pt-2 sm:px-8 lg:px-10 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative overflow-hidden rounded-[28px] bg-[#063D35] px-7 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-[#086B57]/30" />

            <div className="absolute -bottom-24 right-40 h-52 w-52 rounded-full border-[35px] border-[#2C8C76]/20" />

            <div className="relative z-10 max-w-[720px]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9FE0CF] sm:text-sm">
                Your Health Matters
              </p>

              <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl lg:text-[52px]">
                Better health starts with better care.
              </h2>

              <p className="mt-5 max-w-[600px] text-sm font-medium leading-7 text-[#C6DED8] sm:text-base">
                Get trusted healthcare products and everyday wellness
                essentials delivered with the care you deserve.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#063D35] transition duration-200 hover:bg-[#E5F5F0]"
                >
                  Explore Products
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
