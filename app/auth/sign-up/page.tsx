import Link from "next/link";
import AuthForm from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
        {/* Left visual panel */}
        <section className="relative hidden overflow-hidden bg-[#063D35] lg:block">
          {/* Decorative shapes */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#086B57]/40" />

          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#086B57]/30" />

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            {/* Brand */}
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z"
                    fill="#086B57"
                  />
                </svg>
              </div>

              <div>
                <p className="text-lg font-extrabold tracking-[-0.03em] text-white">
                  CarePlus
                </p>

                <p className="text-xs font-medium text-white/60">
                  Pharmacy
                </p>
              </div>
            </Link>

            {/* Main message */}
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8ED9C3]">
                YOUR HEALTH, SIMPLIFIED
              </p>

              <h2 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white xl:text-5xl">
                Healthcare that
                <br />
                fits into your life.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-white/65">
                Create your CarePlus account and make managing your
                healthcare products, orders and everyday wellness
                easier.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">
                {[
                  "Track your orders easily",
                  "Save products to your wishlist",
                  "Enjoy a faster checkout",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#086B57]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12L10 17L19 7"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="text-sm font-semibold text-white/75">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom message */}
            <p className="text-sm font-medium text-white/40">
              Trusted healthcare. Made easier.
            </p>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <Link
              href="/"
              className="mb-10 flex w-fit items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F5F0]">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z"
                    fill="#086B57"
                  />
                </svg>
              </div>

              <div>
                <p className="text-lg font-extrabold tracking-[-0.03em] text-[#102A26]">
                  CarePlus
                </p>

                <p className="text-xs font-medium text-[#5F706C]">
                  Pharmacy
                </p>
              </div>
            </Link>

            <AuthForm mode="signup" />
          </div>
        </section>
      </div>
    </main>
  );
}