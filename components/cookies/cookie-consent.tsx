"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react";

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "careplus-cookie-preferences-v1";

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (typeof parsed === "object" && parsed !== null) {
          const saved = parsed as {
            analytics?: unknown;
            marketing?: unknown;
          };

          if (
            typeof saved.analytics === "boolean" &&
            typeof saved.marketing === "boolean"
          ) {
            setPreferences({
              essential: true,
              analytics: saved.analytics,
              marketing: saved.marketing,
            });

            setHasSavedPreferences(true);
            setShowBanner(false);
          } else {
            setShowBanner(true);
          }
        } else {
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    } catch {
      // If browser storage is unavailable, keep the notice visible.
      setShowBanner(true);
    }

    setIsReady(true);
  }, []);

  function savePreferences(next: CookiePreferences) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 1,
          essential: true,
          analytics: next.analytics,
          marketing: next.marketing,
          savedAt: new Date().toISOString(),
        })
      );
    } catch {
      // The site remains usable if browser storage is unavailable.
    }

    setPreferences({
      essential: true,
      analytics: next.analytics,
      marketing: next.marketing,
    });

    setHasSavedPreferences(true);
    setShowBanner(false);
    setShowPreferences(false);
  }

  function acceptAll() {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectOptional() {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }

  function openPreferences() {
    setShowBanner(false);
    setShowPreferences(true);
  }

  function closePreferences() {
    setShowPreferences(false);

    if (!hasSavedPreferences) {
      setShowBanner(true);
    }
  }

  if (!isReady) {
    return null;
  }

  return (
    <>
      {/* First-visit cookie notice */}
      {showBanner && !showPreferences && (
        <section
          aria-label="Cookie and storage notice"
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-md rounded-2xl border border-[#DDE9E5] bg-white p-5 shadow-[0_16px_60px_rgba(6,61,53,0.16)] sm:bottom-5 sm:left-5 sm:right-auto"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0] text-[#086B57]">
              <Cookie size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold text-[#102A26]">
                Your privacy matters
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                CarePlus uses essential browser storage for core features,
                including your shopping cart. Optional analytics and
                advertising trackers are not currently configured.
              </p>
            </div>
          </div>

          <Link
            href="/cookies"
            className="mt-3 inline-block text-sm font-bold text-[#086B57] underline underline-offset-4 hover:text-[#063D35]"
          >
            Read our Cookie Policy
          </Link>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-xl bg-[#086B57] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              Accept all cookies
            </button>

            <button
              type="button"
              onClick={openPreferences}
              className="rounded-xl border border-[#B9D8CE] bg-white px-4 py-3 text-sm font-extrabold text-[#086B57] transition hover:bg-[#F1F8F5]"
            >
              Manage preferences
            </button>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#7A8985]">
            You can revisit your preferences using Cookie settings.
          </p>
        </section>
      )}

      {/* Cookie preference panel */}
      {showPreferences && (
        <section
          aria-labelledby="cookie-preferences-title"
          className="fixed bottom-4 left-4 right-4 z-[101] mx-auto max-h-[85vh] max-w-md overflow-y-auto rounded-2xl border border-[#DDE9E5] bg-white p-5 shadow-[0_16px_60px_rgba(6,61,53,0.18)] sm:bottom-5 sm:left-5 sm:right-auto"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#086B57]">
                <Settings2 size={20} />
                <p className="text-xs font-extrabold uppercase tracking-[0.16em]">
                  Privacy controls
                </p>
              </div>

              <h2
                id="cookie-preferences-title"
                className="mt-2 text-xl font-extrabold text-[#102A26]"
              >
                Cookie preferences
              </h2>
            </div>

            <button
              type="button"
              onClick={closePreferences}
              aria-label="Close cookie preferences"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#5F706C] transition hover:bg-[#F1F8F5]"
            >
              <X size={19} />
            </button>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#5F706C]">
            Choose your preferences for optional cookies and similar
            technologies. Essential storage remains enabled so core site
            features can work.
          </p>

          {/* Essential storage */}
          <div className="mt-5 rounded-xl border border-[#DDE9E5] bg-[#F7FAF9] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={19} className="text-[#086B57]" />
                <h3 className="text-sm font-extrabold text-[#102A26]">
                  Essential storage
                </h3>
              </div>

              <span className="rounded-full bg-[#DDF2EA] px-2.5 py-1 text-xs font-bold text-[#086B57]">
                Always on
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              Supports core functionality such as remembering your cart
              and saving this preference choice.
            </p>
          </div>

          {/* Analytics */}
          <div className="mt-3 rounded-xl border border-[#DDE9E5] p-4">
            <label className="flex cursor-pointer items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-extrabold text-[#102A26]">
                  Analytics
                </span>
                <span className="mt-1 block text-sm leading-5 text-[#5F706C]">
                  Would allow usage measurement if an analytics service
                  is added.
                </span>
              </span>

              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 shrink-0 accent-[#086B57]"
                aria-label="Allow analytics"
              />
            </label>
          </div>

          {/* Marketing */}
          <div className="mt-3 rounded-xl border border-[#DDE9E5] p-4">
            <label className="flex cursor-pointer items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-extrabold text-[#102A26]">
                  Marketing
                </span>
                <span className="mt-1 block text-sm leading-5 text-[#5F706C]">
                  Would allow advertising-related technologies if they
                  are added.
                </span>
              </span>

              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 shrink-0 accent-[#086B57]"
                aria-label="Allow marketing"
              />
            </label>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#7A8985]">
            Analytics and marketing preferences are saved for future
            integrations. No analytics or advertising trackers are
            activated by these controls in the current setup.
          </p>

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => savePreferences(preferences)}
              className="rounded-xl bg-[#086B57] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              Save my preferences
            </button>

            <button
              type="button"
              onClick={rejectOptional}
              className="rounded-xl border border-[#DDE9E5] px-4 py-3 text-sm font-extrabold text-[#102A26] transition hover:bg-[#F7FAF9]"
            >
              Essential only
            </button>
          </div>

          <Link
            href="/cookies"
            onClick={() => setShowPreferences(false)}
            className="mt-4 inline-block text-sm font-bold text-[#086B57] underline underline-offset-4 hover:text-[#063D35]"
          >
            Read our Cookie Policy
          </Link>
        </section>
      )}

      {/* Small persistent control after a choice is saved */}
      {hasSavedPreferences && !showBanner && !showPreferences && (
        <button
          type="button"
          onClick={openPreferences}
          className="fixed bottom-4 left-4 z-[100] inline-flex items-center gap-2 rounded-full border border-[#DDE9E5] bg-white px-4 py-3 text-sm font-extrabold text-[#086B57] shadow-[0_6px_24px_rgba(6,61,53,0.12)] transition hover:bg-[#F1F8F5] sm:bottom-5 sm:left-5"
        >
          <Cookie size={17} />
          Cookie settings
        </button>
      )}
    </>
  );
}