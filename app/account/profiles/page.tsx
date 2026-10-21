"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";

// Keep the profile page dependent only on the user fields it displays.
// This avoids deriving a user type from a hook return type that TypeScript
// currently resolves as unknown in this project.
type AuthenticatedUser = {
  name?: string | null;
  email?: string | null;
  provider?: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(
        `/auth/sign-in?redirect=${encodeURIComponent("/account/profiles")}`
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
              Loading your profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <AuthenticatedProfileContent key={`${user.email ?? ""}-${user.name ?? ""}`} user={user} />;
}

/**
 * Keep profile form state in a component that only mounts once an
 * authenticated user is available. This avoids copying user data into
 * local state from an effect and keeps the form initial values reliable.
 */
function AuthenticatedProfileContent({
  user,
}: {
  user: AuthenticatedUser;
}) {
  const [fullName, setFullName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
     * Temporary frontend behaviour.
     *
     * When the backend is connected, update the authenticated user's
     * profile through the API here. At present, this only shows the
     * saved confirmation in the interface.
     */
    setIsEditing(false);
    setIsSaved(true);

    window.setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part: string) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* Page header */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[#5F706C]">
            <Link href="/account" className="transition hover:text-[#086B57]">
              Account
            </Link>

            <ChevronRight className="h-4 w-4" />

            <span className="text-[#102A26]">Profile</span>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
                Account
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-[#102A26] sm:text-4xl">
                Your profile
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F706C] sm:text-base">
                Manage your personal information and keep your CarePlus
                account details up to date.
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

      {/* Profile content */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Profile summary */}
          <aside className="h-fit rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)]">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E5F5F0] text-2xl font-extrabold text-[#086B57]">
                {initials || <User className="h-9 w-9" />}
              </div>

              <h2 className="mt-5 text-lg font-extrabold text-[#102A26]">
                {fullName || "CarePlus Customer"}
              </h2>

              <p className="mt-1 break-all text-sm font-medium text-[#5F706C]">
                {email}
              </p>

              <div className="mt-5 w-full rounded-2xl bg-[#F1F8F5] px-4 py-3 text-left">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                  Sign-in method
                </p>

                <p className="mt-1 text-sm font-extrabold capitalize text-[#102A26]">
                  {user.provider === "email" ? "Email" : `${user.provider} account`}
                </p>
              </div>
            </div>

            <div className="my-6 h-px bg-[#DDE9E5]" />

            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Overview</span>
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/account/profiles"
                aria-current="page"
                className="flex items-center justify-between rounded-xl bg-[#E5F5F0] px-3 py-2.5 text-sm font-extrabold text-[#086B57]"
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
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
              >
                <span>Settings</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </nav>
          </aside>

          {/* Main profile form */}
          <div className="space-y-6">
            {/* Saved notification */}
            {isSaved && (
              <div className="flex items-center gap-3 rounded-2xl border border-[#BFE5D8] bg-[#EAF8F3] px-4 py-3 text-sm font-bold text-[#086B57]">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D3F0E6]">
                  <Check className="h-4 w-4" />
                </div>

                Your profile changes have been saved.
              </div>
            )}

            {/* Personal information */}
            <div className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)] sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold tracking-[-0.015em] text-[#102A26]">
                    Personal information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                    This information is used to personalize your CarePlus
                    experience.
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex w-fit items-center justify-center rounded-xl bg-[#E5F5F0] px-4 py-2.5 text-sm font-extrabold text-[#086B57] transition hover:bg-[#D8F0E9]"
                  >
                    Edit profile
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-extrabold text-[#102A26]"
                    >
                      Full name
                    </label>

                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8B87]" />

                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        disabled={!isEditing}
                        placeholder="Enter your full name"
                        className={`h-12 w-full rounded-xl border pl-12 pr-4 text-sm font-semibold outline-none transition ${
                          isEditing
                            ? "border-[#C9DCD7] bg-white text-[#102A26] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                            : "border-[#DDE9E5] bg-[#F7FAF9] text-[#5F706C]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-extrabold text-[#102A26]"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8B87]" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#F7FAF9] pl-12 pr-4 text-sm font-semibold text-[#5F706C] outline-none"
                      />
                    </div>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#7A8B87]">
                      Your email is managed by your sign-in method.
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-extrabold text-[#102A26]"
                    >
                      Phone number
                    </label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8B87]" />

                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        disabled={!isEditing}
                        placeholder="+234 800 000 0000"
                        className={`h-12 w-full rounded-xl border pl-12 pr-4 text-sm font-semibold outline-none transition ${
                          isEditing
                            ? "border-[#C9DCD7] bg-white text-[#102A26] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                            : "border-[#DDE9E5] bg-[#F7FAF9] text-[#5F706C]"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#DDE9E5] pt-6 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setFullName(user.name || "");
                        setEmail(user.email || "");
                        setPhone("");
                        setIsEditing(false);
                      }}
                      className="rounded-xl border border-[#DDE9E5] px-5 py-3 text-sm font-extrabold text-[#5F706C] transition hover:border-[#C9DCD7] hover:bg-[#F7FAF9]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.18)] transition hover:bg-[#063D35]"
                    >
                      <Save className="h-4 w-4" />
                      Save changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Delivery address shortcut */}
            <div className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_10px_35px_rgba(16,42,38,0.05)] sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-[#102A26]">
                      Delivery addresses
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-[#5F706C]">
                      Manage the addresses you use when placing CarePlus
                      orders.
                    </p>
                  </div>
                </div>

                <Link
                  href="/account/addresses"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#E5F5F0] px-4 py-2.5 text-sm font-extrabold text-[#086B57] transition hover:bg-[#D8F0E9]"
                >
                  Manage addresses
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Security note */}
            <div className="rounded-[28px] border border-[#DDE9E5] bg-[#F1F8F5] p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#086B57]">
                  <Check className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#102A26]">
                    Your information stays protected
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-[#5F706C]">
                    CarePlus will use your account information to provide
                    services such as order processing, delivery and account
                    management. Authentication and sensitive data protection
                    will be handled by the backend when the API is connected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
