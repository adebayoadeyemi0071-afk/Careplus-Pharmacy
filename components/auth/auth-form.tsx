"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Apple,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();

  const signIn = useAuthStore((state) => state.signIn);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isSignUp = mode === "signup";

  /*
   * Determines where the customer should go after authentication.
   *
   * Examples:
   *
   * /auth/sign-in
   *      -> /account
   *
   * /auth/sign-in?redirect=%2Fcheckout
   *      -> /checkout
   */
  const getRedirectPath = () => {
    if (typeof window === "undefined") {
      return "/account";
    }

    const params = new URLSearchParams(window.location.search);

    const redirect = params.get("redirect");

    /*
     * Only allow internal paths.
     *
     * This prevents a redirect such as:
     * https://malicious-site.com
     */
    if (
      redirect &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//")
    ) {
      return redirect;
    }

    return "/account";
  };

  const completeAuthentication = (
    provider: "email" | "google" | "apple",
    name: string,
    userEmail: string
  ) => {
    signIn({
      id: `${provider}-${Date.now()}`,
      name,
      email: userEmail,
      provider,
    });

    router.push(getRedirectPath());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    /*
     * Basic validation
     */
    if (isSignUp && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    /*
     * Temporary frontend authentication.
     *
     * This will later be replaced with the real CarePlus
     * backend authentication system.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    const name = isSignUp
      ? fullName.trim()
      : email.split("@")[0];

    completeAuthentication(
      "email",
      name,
      email.trim().toLowerCase()
    );
  };

  const handleSocialAuth = async (
    provider: "google" | "apple"
  ) => {
    setError("");
    setIsLoading(true);

    /*
     * Temporary demo social authentication.
     *
     * Real Google/Apple OAuth will be connected when
     * the backend authentication system is built.
     */
    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });

    const providerName =
      provider === "google" ? "Google User" : "Apple User";

    const providerEmail =
      provider === "google"
        ? "google-user@careplus.demo"
        : "apple-user@careplus.demo";

    completeAuthentication(
      provider,
      providerName,
      providerEmail
    );
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F5F0]">
            <ShieldCheck className="h-5 w-5 text-[#086B57]" />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#086B57]">
              CarePlus
            </p>

            <p className="text-xs font-medium text-[#5F706C]">
              Pharmacy
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-[-0.035em] text-[#102A26] sm:text-4xl">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#5F706C]">
          {isSignUp
            ? "Create your CarePlus account to manage orders, save products and make checkout easier."
            : "Sign in to continue to your CarePlus account and manage your healthcare needs."}
        </p>
      </div>

      {/* Social authentication */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialAuth("google")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm font-extrabold text-[#102A26] transition hover:border-[#AFCBC2] hover:bg-[#F1F8F5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {/* Google icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.77-.07-1.52-.2-2.24H12v4.24h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.39Z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.83A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.27.31-1.83V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.53Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.14c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.64l3.24 2.53C7.31 7.86 9.46 6.14 12 6.14Z"
            />
          </svg>

          Google
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialAuth("apple")}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm font-extrabold text-[#102A26] transition hover:border-[#AFCBC2] hover:bg-[#F1F8F5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Apple className="h-[18px] w-[18px]" />

          Apple
        </button>
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DDE9E5]" />

        <span className="text-xs font-semibold text-[#8A9A96]">
          OR CONTINUE WITH EMAIL
        </span>

        <div className="h-px flex-1 bg-[#DDE9E5]" />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-[#F0C7C7] bg-[#FFF6F6] px-4 py-3">
          <p className="text-sm font-semibold leading-5 text-[#B43B3B]">
            {error}
          </p>
        </div>
      )}

      {/* Email form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full name */}
        {isSignUp && (
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-bold text-[#102A26]"
            >
              Full name
            </label>

            <div className="relative">
              <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9A96]" />

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={isLoading}
                className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white pl-11 pr-4 text-sm font-medium text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10 disabled:cursor-not-allowed disabled:bg-[#F1F8F5]"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-[#102A26]"
          >
            Email address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9A96]" />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              disabled={isLoading}
              className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white pl-11 pr-4 text-sm font-medium text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10 disabled:cursor-not-allowed disabled:bg-[#F1F8F5]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[#102A26]"
            >
              Password
            </label>

            {!isSignUp && (
              <Link
                href="/auth/forgot-password"
                className="text-xs font-bold text-[#086B57] transition hover:text-[#063D35]"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9A96]" />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder={
                isSignUp
                  ? "Create a password"
                  : "Enter your password"
              }
              autoComplete={
                isSignUp ? "new-password" : "current-password"
              }
              disabled={isLoading}
              className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white pl-11 pr-12 text-sm font-medium text-[#102A26] outline-none transition placeholder:text-[#9BAAA6] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10 disabled:cursor-not-allowed disabled:bg-[#F1F8F5]"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              disabled={isLoading}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8A9A96] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {isSignUp && (
            <p className="mt-2 text-xs leading-5 text-[#8A9A96]">
              Use at least 8 characters for your password.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 text-sm font-extrabold text-white transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              {isSignUp
                ? "Creating account..."
                : "Signing in..."}
            </>
          ) : (
            <>
              {isSignUp
                ? "Create Account"
                : "Sign In"}

              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Account switch */}
      <p className="mt-7 text-center text-sm text-[#5F706C]">
        {isSignUp
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Link
          href={
            isSignUp
              ? "/auth/sign-in"
              : "/auth/sign-up"
          }
          className="font-extrabold text-[#086B57] transition hover:text-[#063D35]"
        >
          {isSignUp ? "Sign in" : "Create one"}
        </Link>
      </p>

      {/* Legal */}
      <p className="mt-6 text-center text-xs leading-5 text-[#8A9A96]">
        By continuing, you agree to the CarePlus{" "}
        <Link
          href="/terms"
          className="font-bold text-[#5F706C] underline underline-offset-2 hover:text-[#086B57]"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-bold text-[#5F706C] underline underline-offset-2 hover:text-[#086B57]"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}