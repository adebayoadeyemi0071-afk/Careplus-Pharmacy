import Link from "next/link";
import {
  ArrowRight,
  Baby,
  ChevronRight,
  Droplets,
  HeartPulse,
  Leaf,
  ShieldPlus,
  Sparkles,
} from "lucide-react";

import { categories, products } from "@/data/products";

const categoryDetails = {
  "Pain Relief": {
    description:
      "Everyday products for temporary relief from common aches, pains and discomfort.",
    icon: HeartPulse,
    accent: "bg-[#FDEDEC]",
    iconColor: "text-[#C94B47]",
  },

  "Vitamins & Supplements": {
    description:
      "Vitamins and nutritional supplements to support your everyday wellness routine.",
    icon: Leaf,
    accent: "bg-[#E5F5F0]",
    iconColor: "text-[#086B57]",
  },

  "Personal Care": {
    description:
      "Everyday personal-care and hygiene essentials for you and your family.",
    icon: Sparkles,
    accent: "bg-[#F3EEFA]",
    iconColor: "text-[#76529A]",
  },

  "Baby & Family": {
    description:
      "Practical everyday essentials designed to support baby and family care.",
    icon: Baby,
    accent: "bg-[#FFF4E5]",
    iconColor: "text-[#C78325]",
  },

  "Digestive Health": {
    description:
      "Products for everyday digestive-health needs and personal wellness.",
    icon: Droplets,
    accent: "bg-[#EAF3FA]",
    iconColor: "text-[#39749D]",
  },

  "Cold & Flu": {
    description:
      "Everyday products commonly used as part of a cold and flu care routine.",
    icon: ShieldPlus,
    accent: "bg-[#EAF6F3]",
    iconColor: "text-[#16845E]",
  },

  "Prescription Medicines": {
    description:
      "Medicines that require appropriate prescription review and professional guidance.",
    icon: ShieldPlus,
    accent: "bg-[#E8F0FE]",
    iconColor: "text-[#315EAA]",
  },
} as const;

const shopCategories = categories.filter(
  (category) => category !== "All Products"
);

export default function CategoriesPage() {
  const totalProducts = products.length;

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#DDE9E5] bg-[#E5F5F0]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
              Shop by category
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-[#102A26] sm:text-5xl lg:text-6xl">
              Find what you need,
              <br className="hidden sm:block" />
              all in one place.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base sm:leading-8">
              Browse our healthcare, wellness and personal-care
              essentials by category and find products that fit
              your everyday needs.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              Browse All Products
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY GRID
      ===================================================== */}

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.025em] text-[#102A26] sm:text-4xl">
                Shop by what you need
              </h2>
            </div>

            <p className="text-sm font-semibold text-[#5F706C]">
              {totalProducts} products available
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shopCategories.map((category) => {
              const details = categoryDetails[category];
              const Icon = details.icon;

              const productCount = products.filter(
                (product) => product.category === category
              ).length;

              return (
                <Link
                  key={category}
                  href={`/shop?category=${encodeURIComponent(
                    category
                  )}`}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#DDE9E5] bg-white p-6 shadow-[0_12px_35px_rgba(6,61,53,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#B9D8CE] hover:shadow-[0_18px_45px_rgba(6,61,53,0.08)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${details.accent}`}
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.8}
                        className={details.iconColor}
                      />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE9E5] text-[#5F706C] transition group-hover:border-[#086B57] group-hover:bg-[#086B57] group-hover:text-white">
                      <ChevronRight size={17} />
                    </div>
                  </div>

                  <div className="mt-7">
                    <h3 className="text-xl font-extrabold tracking-[-0.015em] text-[#102A26]">
                      {category}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#5F706C]">
                      {details.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#DDE9E5] pt-5">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8A9A96]">
                      {productCount}{" "}
                      {productCount === 1
                        ? "product"
                        : "products"}
                    </span>

                    <span className="text-sm font-extrabold text-[#086B57]">
                      Shop category
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ALL PRODUCTS CTA
      ===================================================== */}

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] bg-[#063D35] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#8ED5C2]">
                  CarePlus Pharmacy
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.025em] text-white sm:text-4xl">
                  Looking for something specific?
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                  Explore the complete CarePlus catalogue and
                  use our search tools to find a product quickly.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#063D35] transition hover:bg-[#E5F5F0]"
              >
                View All Products
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}