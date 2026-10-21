import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import AuthForm from "@/components/auth/auth-form";

export default function SignInPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">
        {/* Left visual panel */}
        <section className="relative hidden overflow-hidden bg-[#063D35] lg:block">
          <Image
            src="/images/hero-pharmacist.jpg"
            alt="CarePlus pharmacist"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#063D35]/75" />

          <div className="relative z-10 flex min-h-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-3 text-white"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <svg
                  viewBox="0 0 64 64"
                  className="h-7 w-7"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M32 7C19.85 7 10 16.85 10 29v6c0 12.15 9.85 22 22 22s22-9.85 22-22v-6C54 16.85 44.15 7 32 7Z"
                    fill="#086B57"
                  />
                  <path
                    d="M29 17h6v10h10v6H35v10h-6V33H19v-6h10V17Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div>
                <p className="text-lg font-extrabold tracking-[-0.02em]">
                  CarePlus
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  Pharmacy
                </p>
              </div>
            </Link>

            {/* Main message */}
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#B9E4D8]">
                WELCOME BACK
              </p>

              <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-white xl:text-5xl">
                Your healthcare journey, all in one place.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
                Sign in to manage your orders, saved products,
                delivery details and your CarePlus account.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "View your recent orders",
                  "Access your wishlist",
                  "Manage your account securely",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-white/90"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#B9E4D8]" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} CarePlus Pharmacy
            </p>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex min-h-full items-center justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57] lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to CarePlus
            </Link>

            <AuthForm mode="signin" />
          </div>
        </section>
      </div>
    </main>
  );
}