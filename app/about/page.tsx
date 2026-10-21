import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  Heart,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "We put honesty, safety and reliability at the centre of every customer experience.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "We treat every customer with genuine care and make their health our priority.",
  },
  {
    icon: Sparkles,
    title: "Quality",
    description:
      "We are committed to providing quality healthcare products you can shop with confidence.",
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description:
      "Healthcare products sourced with quality and customer safety in mind.",
  },
  {
    icon: Heart,
    title: "Professional Care",
    description:
      "A pharmacy experience built around helpful service and your wellbeing.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Get your healthcare essentials delivered conveniently to your door.",
  },
  {
    icon: Target,
    title: "Accessible Healthcare",
    description:
      "Making everyday healthcare products easier to discover and access.",
  },
  {
    icon: Sparkles,
    title: "Everyday Wellness",
    description:
      "From medicines to personal care, we support the needs of everyday life.",
  },
  {
    icon: Heart,
    title: "Customer Support",
    description:
      "We're here to make your shopping experience simple, clear and comfortable.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FAFCFB] text-[#102A26]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10 lg:pt-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#E5F5F0] lg:min-h-[560px] lg:grid-cols-2">
          {/* Hero Content */}
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-16">
            <span className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              About CarePlus
            </span>

            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              Better Health,
              <br />
              A Brighter Tomorrow
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5F706C] sm:text-lg sm:leading-8">
              CarePlus Pharmacy is built around a simple idea: healthcare
              should feel accessible, reliable and convenient. We are here to
              help you find the products you need while making your healthcare
              journey a little easier.
            </p>

            <div className="mt-8">
              <Link
                href="#mission"
                className="inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#063D35]"
              >
                Our Mission
                <ArrowRight size={17} strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          {/* Existing Homepage Image */}
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[440px] lg:min-h-full">
            <Image
              src="/images/hero-pharmacist.jpg"
              alt="CarePlus Pharmacy pharmacist"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#063D35]/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              Who We Are
            </span>

            <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
              Healthcare made simpler.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-[#5F706C]">
              CarePlus Pharmacy exists to make everyday healthcare easier to
              navigate. Whether you are looking for everyday medicines,
              wellness products, personal care essentials or healthcare
              support, we want your experience to be straightforward and
              dependable.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#5F706C]">
              We believe a pharmacy should be more than somewhere you purchase
              a product. It should be a place where people can shop with
              confidence, find what they need and feel supported throughout
              their healthcare journey.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION / VISION / VALUES
      ========================================================= */}
      <section
        id="mission"
        className="border-y border-[#DDE9E5] bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              What Drives Us
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Built around people, health and trust.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5F706C] sm:text-lg">
              Everything we do is guided by the goal of creating a pharmacy
              experience that is useful, dependable and centred around people.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Mission */}
            <article className="rounded-[24px] border border-[#DDE9E5] bg-[#FAFCFB] p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                <Target size={23} strokeWidth={2} />
              </div>

              <h3 className="mt-6 text-xl font-extrabold">Our Mission</h3>

              <p className="mt-3 text-sm leading-7 text-[#5F706C]">
                To make quality healthcare products more accessible and
                convenient while providing a dependable experience customers
                can trust.
              </p>
            </article>

            {/* Vision */}
            <article className="rounded-[24px] border border-[#DDE9E5] bg-[#FAFCFB] p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                <Eye size={23} strokeWidth={2} />
              </div>

              <h3 className="mt-6 text-xl font-extrabold">Our Vision</h3>

              <p className="mt-3 text-sm leading-7 text-[#5F706C]">
                To build a trusted pharmacy platform that makes healthcare
                shopping simpler and supports better everyday wellbeing.
              </p>
            </article>

            {/* Values */}
            <article className="rounded-[24px] border border-[#DDE9E5] bg-[#FAFCFB] p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                <Heart size={23} strokeWidth={2} />
              </div>

              <h3 className="mt-6 text-xl font-extrabold">Our Values</h3>

              <div className="mt-4 space-y-3">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5F5F0] text-[#086B57]">
                      <Check size={12} strokeWidth={3} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">{value.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#5F706C]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST SECTION
      ========================================================= */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#E5F5F0]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Intro */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
                Why CarePlus
              </span>

              <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
                Trusted. Reliable. Always.
              </h2>

              <p className="mt-5 max-w-md text-base leading-7 text-[#5F706C]">
                We go beyond simply providing healthcare products. We are
                building an experience that puts quality, convenience and
                customer care at the centre.
              </p>

              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#063D35]"
                >
                  Shop Now
                  <ArrowRight size={17} strokeWidth={2.4} />
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid border-t border-[#CDE4DD] sm:grid-cols-2 lg:border-l lg:border-t-0">
              {trustFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className={`p-7 sm:p-8 ${
                      index < 4
                        ? "border-b border-[#CDE4DD]"
                        : ""
                    } ${
                      index % 2 === 0
                        ? "sm:border-r sm:border-[#CDE4DD]"
                        : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#086B57] shadow-sm">
                      <Icon size={21} strokeWidth={2} />
                    </div>

                    <h3 className="mt-5 text-base font-extrabold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SIMPLE CAREPLUS STATEMENT
      ========================================================= */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F5F0] text-[#086B57]">
            <Heart size={25} strokeWidth={2} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
            Your health matters.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5F706C] sm:text-lg">
            From everyday essentials to products that support your wellbeing,
            CarePlus is here to make healthcare shopping feel easier, clearer
            and more dependable.
          </p>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#063D35]">
          <div className="flex flex-col items-start justify-between gap-8 px-7 py-12 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:px-14 lg:py-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8ED6C4]">
                Your Health Journey
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
                Healthcare made easier.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#C7DED8] sm:text-base">
                Explore our range of medicines, wellness products and
                healthcare essentials.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#063D35] transition hover:bg-[#E5F5F0]"
            >
              Explore Products
              <ArrowRight size={17} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}