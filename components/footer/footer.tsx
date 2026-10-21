
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDE9E5] bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* BRAND */}
          <div className="max-w-[360px]">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute h-8 w-3 rounded-sm bg-[#086B57]" />
                <span className="absolute h-3 w-8 rounded-sm bg-[#086B57]" />
              </div>

              <div className="leading-none">
                <span className="block text-[19px] font-extrabold tracking-tight text-[#102A26]">
                  CarePlus
                </span>

                <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-[#086B57]">
                  Pharmacy
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm font-medium leading-7 text-[#6A7B77]">
              Your trusted destination for genuine medicines, healthcare
              products and everyday wellness essentials.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE9E5] text-[#5F706C] transition hover:border-[#086B57] hover:bg-[#E5F5F0] hover:text-[#086B57]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE9E5] text-[#5F706C] transition hover:border-[#086B57] hover:bg-[#E5F5F0] hover:text-[#086B57]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.6v8h2.9Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE9E5] text-[#5F706C] transition hover:border-[#086B57] hover:bg-[#E5F5F0] hover:text-[#086B57]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.2l-4.9-6.4L6.5 22H3.4l7.3-8.4L2.8 2H9l4.4 5.8L18.9 2Zm-1.1 17.5h1.7L8.3 4.4H6.5l11.3 15.1Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-sm font-bold text-[#102A26]">
              Shop
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/shop"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                All Products
              </Link>

              <Link
                href="/categories"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Categories
              </Link>

              <Link
                href="/shop?popular=true"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Popular Products
              </Link>

              <Link
                href="/wishlist"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Wishlist
              </Link>
            </div>
          </div>

          {/* COMPANY AND LEGAL */}
          <div>
            <h3 className="text-sm font-bold text-[#102A26]">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Contact
              </Link>

              <Link
                href="/privacy"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies"
                className="text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold text-[#102A26]">
              Get in touch
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#086B57]"
                  strokeWidth={1.8}
                />

                <p className="text-sm font-medium leading-6 text-[#6A7B77]">
                  Lagos, Nigeria
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+2340000000000"
                className="flex items-center gap-3 text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                <Phone
                  size={17}
                  className="shrink-0 text-[#086B57]"
                  strokeWidth={1.8}
                />

                <span>+234 000 000 0000</span>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@carepluspharmacy.com"
                className="flex items-center gap-3 text-sm font-medium text-[#6A7B77] transition hover:text-[#086B57]"
              >
                <Mail
                  size={17}
                  className="shrink-0 text-[#086B57]"
                  strokeWidth={1.8}
                />

                <span>hello@carepluspharmacy.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#DDE9E5] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-[#7A8985]">
            © {new Date().getFullYear()} CarePlus Pharmacy. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/privacy"
              className="text-xs font-medium text-[#7A8985] transition hover:text-[#086B57]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs font-medium text-[#7A8985] transition hover:text-[#086B57]"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-xs font-medium text-[#7A8985] transition hover:text-[#086B57]"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
