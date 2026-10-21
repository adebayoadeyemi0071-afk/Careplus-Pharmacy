"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";
import { useWishlistStore } from "@/components/wishlist/wishlist-store";

export default function AccountPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const signOut = useAuthStore((state) => state.signOut);

  const wishlistCount = useWishlistStore(
    (state) => state.items.length
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/sign-in?redirect=%2Faccount");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#DDE9E5] border-t-[#086B57]" />
            <p className="text-sm font-semibold text-[#5F706C]">
              Loading your account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const firstName = user.name.split(" ")[0];

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const accountLinks = [
    {
      href: "/account/profile",
      icon: UserRound,
      title: "Personal information",
      description: "Manage your name, email and account details.",
    },
    {
      href: "/account/orders",
      icon: ClipboardList,
      title: "My orders",
      description: "View your previous and current orders.",
    },
    {
      href: "/account/addresses",
      icon: MapPin,
      title: "Saved addresses",
      description: "Manage your delivery addresses.",
    },
    {
      href: "/wishlist",
      icon: Heart,
      title: "Wishlist",
      description: "Products you have saved for later.",
      badge: wishlistCount > 0 ? wishlistCount : undefined,
    },
    {
      href: "/account/settings",
      icon: Settings,
      title: "Account settings",
      description: "Manage your preferences and security.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#FAFCFB]">
      {/* Page header */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
                MY ACCOUNT
              </p>

              <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#102A26] sm:text-4xl lg:text-5xl">
                Welcome back, {firstName}.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#5F706C] sm:text-base">
                Manage your orders, saved products and personal
                information from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-4 py-3 text-sm font-extrabold text-[#5F706C] transition hover:border-[#F0C7C7] hover:bg-[#FFF6F6] hover:text-[#B43B3B]"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Account overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardStat
            icon={Package}
            label="Orders"
            value="0"
            href="/account/orders"
            description="View your orders"
          />

          <DashboardStat
            icon={Heart}
            label="Wishlist"
            value={String(wishlistCount)}
            href="/wishlist"
            description="Saved products"
          />

          <DashboardStat
            icon={MapPin}
            label="Addresses"
            value="0"
            href="/account/addresses"
            description="Saved delivery addresses"
          />
        </div>

        {/* Main content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Account menu */}
          <section>
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
                ACCOUNT
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#102A26]">
                Manage your account
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white">
              {accountLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-4 px-5 py-5 transition hover:bg-[#F1F8F5] sm:px-6 ${
                      index !== accountLinks.length - 1
                        ? "border-b border-[#DDE9E5]"
                        : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57] transition group-hover:bg-[#086B57] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-[#102A26]">
                          {item.title}
                        </h3>

                        {item.badge !== undefined && (
                          <span className="rounded-full bg-[#E5F5F0] px-2 py-0.5 text-[10px] font-extrabold text-[#086B57]">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-[#8A9A96] sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 shrink-0 text-[#A5B5B1] transition group-hover:translate-x-1 group-hover:text-[#086B57]" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Profile summary */}
          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#DDE9E5] bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#086B57] text-lg font-extrabold text-white">
                  {firstName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-extrabold tracking-[-0.02em] text-[#102A26]">
                    {user.name}
                  </p>

                  <p className="mt-1 break-all text-sm text-[#5F706C]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-[#DDE9E5]" />

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#086B57]" />

                <div>
                  <p className="text-sm font-extrabold text-[#102A26]">
                    Your account is protected
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#8A9A96]">
                    Keep your account details up to date.
                  </p>
                </div>
              </div>

              <Link
                href="/account/profile"
                className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F1F8F5] px-4 text-sm font-extrabold text-[#086B57] transition hover:bg-[#E5F5F0]"
              >
                Edit profile
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            {/* Help card */}
            <section className="rounded-2xl bg-[#063D35] p-6 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#8ED9C3]">
                NEED HELP?
              </p>

              <h2 className="mt-3 text-xl font-extrabold tracking-[-0.03em]">
                We&apos;re here for you.
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/65">
                If you have questions about your order or account,
                our team is here to help.
              </p>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#8ED9C3]"
              >
                Contact CarePlus
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          </aside>
        </div>

        {/* Account email */}
        <div className="mt-8 rounded-2xl border border-[#DDE9E5] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#8A9A96]">
                SIGNED IN AS
              </p>

              <p className="mt-2 text-sm font-bold text-[#102A26]">
                {user.email}
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-extrabold text-[#086B57]">
              {user.provider === "email"
                ? "Email account"
                : `${user.provider.charAt(0).toUpperCase()}${user.provider.slice(1)} account`}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

interface DashboardStatProps {
  icon: typeof Package;
  label: string;
  value: string;
  href: string;
  description: string;
}

function DashboardStat({
  icon: Icon,
  label,
  value,
  href,
  description,
}: DashboardStatProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#DDE9E5] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#BFD8D0] hover:shadow-[0_12px_30px_rgba(16,42,38,0.06)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57]">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight className="h-4 w-4 text-[#A5B5B1] transition group-hover:translate-x-1 group-hover:text-[#086B57]" />
      </div>

      <div className="mt-5">
        <p className="text-3xl font-extrabold tracking-[-0.04em] text-[#102A26]">
          {value}
        </p>

        <p className="mt-1 text-sm font-extrabold text-[#102A26]">
          {label}
        </p>

        <p className="mt-1 text-xs text-[#8A9A96]">
          {description}
        </p>
      </div>
    </Link>
  );
}