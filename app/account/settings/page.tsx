"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  LockKeyhole,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";

export default function SettingsPage() {
  const router = useRouter();

  const { user, isAuthenticated, signOut } = useAuthStore();

  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(
        "/auth/sign-in?redirect=%2Faccount%2Fsettings"
      );
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-[#FAFCFB]">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-16">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#DDE9E5] border-t-[#086B57]" />

            <p className="text-sm font-semibold text-[#5F706C]">
              Loading your settings...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const handleSavePreferences = () => {
    /*
     * Temporary frontend behaviour.
     *
     * These preferences will eventually be saved through the
     * authenticated NestJS API and associated with the user's account.
     */

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* Header */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#5F706C]">
            <Link
              href="/account"
              className="transition hover:text-[#086B57]"
            >
              Account
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-[#102A26]">Settings</span>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
                Account
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#102A26] sm:text-4xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F706C] sm:text-base">
                Manage your preferences, notifications and account security.
              </p>
            </div>

            <Link
              href="/account"
              className="inline-flex w-fit items-center gap-2 text-sm font-extrabold text-[#086B57] transition hover:text-[#063D35]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to account
            </Link>
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="h-fit rounded-[28px] border border-[#DDE9E5] bg-white p-4 shadow-[0_10px_35px_rgba(16,42,38,0.05)]">
            <div className="px-3 py-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7A8B87]">
                Account
              </p>

              <p className="mt-1 truncate text-sm font-extrabold text-[#102A26]">
                {user.email}
              </p>
            </div>

            <div className="my-3 h-px bg-[#DDE9E5]" />

            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Overview</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/account/profile"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Profile</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Orders</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/account/addresses"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Addresses</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Wishlist</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/account/settings"
                className="flex items-center justify-between rounded-xl bg-[#E5F5F0] px-3 py-2.5 text-sm font-extrabold text-[#086B57]"
              >
                <span>Settings</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </aside>

          {/* Main settings */}
          <div className="space-y-6">
            {/* Saved notification */}
            {saved && (
              <div className="flex items-center gap-3 rounded-2xl border border-[#BFE5D8] bg-[#EAF8F3] px-4 py-3 text-sm font-bold text-[#086B57]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D3F0E6]">
                  <Check className="h-4 w-4" />
                </div>

                Your preferences have been saved.
              </div>
            )}

            {/* Notifications */}
            <section className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <Bell className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#102A26]">
                    Notifications
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    Choose which updates you would like to receive from
                    CarePlus.
                  </p>
                </div>
              </div>

              <div className="mt-8 divide-y divide-[#DDE9E5]">
                {/* Order updates */}
                <div className="flex items-start justify-between gap-5 py-5 first:pt-0">
                  <div className="flex gap-4">
                    <div className="mt-0.5 text-[#086B57]">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#102A26]">
                        Order updates
                      </h3>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-[#5F706C]">
                        Receive updates about order confirmation, processing,
                        dispatch and delivery.
                      </p>
                    </div>
                  </div>

                  <Toggle
                    checked={orderUpdates}
                    onChange={setOrderUpdates}
                    label="Order updates"
                  />
                </div>

                {/* Promotional emails */}
                <div className="flex items-start justify-between gap-5 py-5">
                  <div className="flex gap-4">
                    <div className="mt-0.5 text-[#086B57]">
                      <Bell className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#102A26]">
                        Promotions and wellness updates
                      </h3>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-[#5F706C]">
                        Receive occasional information about new products,
                        wellness content and CarePlus offers.
                      </p>
                    </div>
                  </div>

                  <Toggle
                    checked={promotionalEmails}
                    onChange={setPromotionalEmails}
                    label="Promotional emails"
                  />
                </div>

                {/* Security alerts */}
                <div className="flex items-start justify-between gap-5 py-5 last:pb-0">
                  <div className="flex gap-4">
                    <div className="mt-0.5 text-[#086B57]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#102A26]">
                        Security alerts
                      </h3>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-[#5F706C]">
                        Important notifications about sign-ins and changes to
                        your account.
                      </p>
                    </div>
                  </div>

                  <Toggle
                    checked={securityAlerts}
                    onChange={setSecurityAlerts}
                    label="Security alerts"
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-[#DDE9E5] pt-6">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.18)] transition hover:bg-[#063D35]"
                >
                  <Check className="h-4 w-4" />
                  Save preferences
                </button>
              </div>
            </section>

            {/* Security */}
            <section className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <LockKeyhole className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#102A26]">
                    Security
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    Manage how your CarePlus account is protected.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#DDE9E5] bg-[#F7FAF9] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-[#086B57]" />

                      <h3 className="text-sm font-extrabold text-[#102A26]">
                        Sign-in method
                      </h3>
                    </div>

                    <p className="mt-2 text-sm text-[#5F706C]">
                      You currently sign in using{" "}
                      <span className="font-extrabold text-[#102A26]">
                        {user.provider === "email"
                          ? "email and password"
                          : user.provider}
                      </span>
                      .
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-extrabold capitalize text-[#086B57]">
                    {user.provider}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#DDE9E5] bg-[#F7FAF9] p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#16845E]" />

                  <div>
                    <h3 className="text-sm font-extrabold text-[#102A26]">
                      Account security
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                      Authentication, password management and session security
                      will be handled through the CarePlus backend when the
                      production authentication system is connected.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Account actions */}
            <section className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1F8F5] text-[#086B57]">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#102A26]">
                    Account
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    Manage your current CarePlus session.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#F0C9C9] bg-white px-5 py-3 text-sm font-extrabold text-[#D64545] transition hover:bg-[#FFF5F5]"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </section>

            {/* Backend notice */}
            <section className="rounded-[28px] border border-[#DDE9E5] bg-[#F1F8F5] p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#086B57]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#102A26]">
                    Production-ready structure
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#5F706C]">
                    These settings currently run on the frontend. Once the
                    NestJS backend is connected, notification preferences,
                    security settings and account data will be persisted
                    against the authenticated customer account.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

function Toggle({
  checked,
  onChange,
  label,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 h-7 w-12 shrink-0 rounded-full p-1 transition ${
        checked ? "bg-[#086B57]" : "bg-[#CBD8D4]"
      }`}
    >
      <span
        className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}