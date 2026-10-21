"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

const categories = [
  "Pain Relief",
  "Vitamins & Supplements",
  "Personal Care",
  "Baby & Family",
  "Digestive Health",
  "Cold & Flu",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-[#DDE9E5] bg-[#063D35] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="CarePlus Pharmacy home"
            >
              {/* CarePlus Logo */}
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  width="42"
                  height="42"
                  rx="13"
                  fill="#E5F5F0"
                />

                <path
                  d="M21 10.5C15.201 10.5 10.5 15.201 10.5 21C10.5 26.799 15.201 31.5 21 31.5C26.799 31.5 31.5 26.799 31.5 21C31.5 15.201 26.799 10.5 21 10.5Z"
                  stroke="#086B57"
                  strokeWidth="2.5"
                />

                <path
                  d="M21 15V27M15 21H27"
                  stroke="#086B57"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              <div>
                <span className="block text-xl font-extrabold tracking-tight">
                  CarePlus
                </span>

                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9D8CC]">
                  Pharmacy
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#C7DED8]">
              Trusted medicines, healthcare products and everyday wellness
              essentials — making better healthcare easier to access.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#39766A] text-[#D7ECE7] transition hover:border-[#A9D8CC] hover:bg-[#0A5147] hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#39766A] text-[#D7ECE7] transition hover:border-[#A9D8CC] hover:bg-[#0A5147] hover:text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 8H16.5V4.5C16.1 4.45 14.75 4.3 13.2 4.3C9.95 4.3 7.75 6.28 7.75 10.1V13H4V17H7.75V23H12.25V17H15.85L16.4 13H12.25V10.45C12.25 9.3 12.57 8 14 8Z"
                  />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                aria-label="WhatsApp"
                onClick={(event) => event.preventDefault()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#39766A] text-[#D7ECE7] transition hover:border-[#A9D8CC] hover:bg-[#0A5147] hover:text-white"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20.52 3.48C18.28 1.24 15.3 0 12.13 0C5.52 0 0.14 5.38 0.14 11.99C0.14 14.11 0.69 16.18 1.73 18.01L0.04 24L6.18 22.39C7.97 23.37 9.99 23.88 12.02 23.88H12.03C18.63 23.88 23.99 18.5 23.99 11.89C23.99 8.69 22.75 5.72 20.52 3.48ZM12.03 21.91H12.02C10.2 21.91 8.41 21.42 6.85 20.49L6.5 20.28L2.86 21.23L3.83 17.68L3.6 17.32C2.64 15.76 2.13 13.96 2.13 12C2.13 6.48 6.62 1.99 12.14 1.99C14.81 1.99 17.32 3.03 19.2 4.92C21.08 6.81 22.12 9.32 22.12 11.99C22.11 17.52 17.62 21.91 12.03 21.91ZM18.49 14.51C18.19 14.36 16.72 13.64 16.45 13.54C16.18 13.44 15.99 13.39 15.8 13.69C15.61 13.99 15.06 14.66 14.9 14.85C14.73 15.05 14.56 15.07 14.26 14.92C13.96 14.77 13 14.45 11.86 13.43C10.97 12.64 10.37 11.67 10.2 11.37C10.04 11.07 10.18 10.91 10.33 10.76C10.47 10.62 10.63 10.39 10.78 10.21C10.93 10.03 10.98 9.9 11.08 9.7C11.18 9.5 11.13 9.32 11.05 9.17C10.98 9.02 10.38 7.55 10.13 6.96C9.89 6.39 9.64 6.47 9.47 6.46C9.31 6.45 9.12 6.45 8.93 6.45C8.74 6.45 8.43 6.52 8.17 6.82C7.92 7.12 7.2 7.79 7.2 9.25C7.2 10.71 8.2 12.12 8.34 12.31C8.49 12.5 10.31 15.3 13.1 16.5C13.76 16.78 14.28 16.95 14.68 17.08C15.34 17.29 15.94 17.26 16.41 17.18C16.94 17.1 18.04 16.51 18.27 15.87C18.5 15.23 18.5 14.69 18.42 14.57C18.36 14.55 18.59 14.56 18.49 14.51Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:support@careplus.ng"
                aria-label="Email CarePlus"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#39766A] text-[#D7ECE7] transition hover:border-[#A9D8CC] hover:bg-[#0A5147] hover:text-white"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Shop
            </h3>

            <ul className="mt-6 space-y-3.5">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  href="/checkout"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              Categories
            </h3>

            <ul className="mt-6 space-y-3.5">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(category)}`}
                    className="text-sm text-[#C7DED8] transition hover:text-white"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
              CarePlus
            </h3>

            <ul className="mt-6 space-y-3.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/account"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/account/orders"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[#C7DED8] transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-3xl border border-[#39766A] bg-[#0A5147] p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A9D8CC]">
                Stay in the loop
              </p>

              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                Health tips, updates &amp; more.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#C7DED8]">
                Get useful healthcare information and CarePlus updates sent
                straight to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full lg:max-w-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  className="h-12 min-w-0 flex-1 rounded-xl border border-[#39766A] bg-[#063D35] px-4 text-sm text-white outline-none placeholder:text-[#88B8AD] focus:border-[#A9D8CC]"
                />

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E5F5F0] px-5 text-sm font-bold text-[#063D35] transition hover:bg-white"
                >
                  {subscribed ? "Subscribed" : "Subscribe"}

                  {!subscribed && (
                    <ArrowRight size={17} strokeWidth={2} />
                  )}
                </button>
              </div>

              {subscribed && (
                <p className="mt-3 text-xs font-medium text-[#A9D8CC]">
                  Thanks — you&apos;re subscribed to CarePlus updates.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#39766A]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-[#A9C9C1] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} CarePlus Pharmacy. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}