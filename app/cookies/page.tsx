import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Cookie, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | CarePlus Pharmacy",
  description:
    "Learn how CarePlus Pharmacy uses essential browser storage and manages optional cookie preferences.",
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-[#DDE9E5] py-7 last:border-b-0">
      <h2 className="text-lg font-extrabold text-[#102A26] sm:text-xl">
        {title}
      </h2>

      <div className="mt-3 space-y-3 text-sm leading-7 text-[#5F706C] sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      <section className="border-b border-[#DDE9E5] bg-[#E5F5F0]">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#086B57] transition hover:text-[#063D35]"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#086B57] shadow-sm">
            <Cookie size={28} />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            Your privacy matters
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#063D35] sm:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4F6863] sm:text-base">
            This policy explains how CarePlus uses browser storage and how
            visitors can manage their preferences for cookies and similar
            technologies.
          </p>

          <p className="mt-4 text-xs font-semibold text-[#5F706C]">
            Last updated: 21 October 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="rounded-2xl border border-[#DDE9E5] bg-white p-5 sm:p-8">
          <div className="flex items-start gap-3 border-b border-[#DDE9E5] pb-6">
            <ShieldCheck
              size={22}
              className="mt-1 shrink-0 text-[#086B57]"
            />

            <p className="text-sm leading-7 text-[#5F706C]">
              <strong className="text-[#102A26]">
                Current website setup:
              </strong>{" "}
              CarePlus uses browser storage for features such as remembering
              cart items and cookie preferences. Optional analytics and
              advertising trackers are not currently configured.
            </p>
          </div>

          <PolicySection title="1. What are cookies and similar technologies?">
            <p>
              Cookies are small pieces of data that websites can store in
              your browser. Other technologies, such as local storage, can
              also remember information between visits.
            </p>

            <p>
              Although these technologies can serve similar purposes,
              browser local storage is not the same thing as a cookie.
              This policy covers the browser storage currently used by
              CarePlus as well as relevant future cookie integrations.
            </p>
          </PolicySection>

          <PolicySection title="2. Essential browser storage">
            <p>
              Essential storage supports core website functionality and is
              enabled by default.
            </p>

            <p>In the current project, this includes:</p>

            <ul className="list-disc space-y-2 pl-5">
              <li>
                Remembering items in your shopping cart between visits
                using the cart store.
              </li>
              <li>
                Remembering the cookie preferences you select in the
                floating privacy panel.
              </li>
            </ul>

            <p>
              Essential storage cannot be switched off through the
              preference panel. Clearing browser storage may remove the
              saved cart or preference selection.
            </p>
          </PolicySection>

          <PolicySection title="3. Analytics technologies">
            <p>
              Analytics tools can help measure website usage, understand
              navigation patterns and identify performance problems.
            </p>

            <p>
              No analytics tracker is currently configured in the CarePlus
              setup described by this policy. If analytics is introduced
              later, this policy and the consent controls should be updated
              to describe the actual provider, purpose, technologies and
              applicable choices.
            </p>
          </PolicySection>

          <PolicySection title="4. Marketing and advertising technologies">
            <p>
              Advertising technologies may be used by websites to measure
              campaigns or personalise marketing.
            </p>

            <p>
              No advertising tracker is currently configured in this
              setup. If marketing technologies are added later, CarePlus
              should disclose their use and apply the appropriate consent
              controls before activating technologies that require consent.
            </p>
          </PolicySection>

          <PolicySection title="5. Managing your preferences">
            <p>
              On your first visit, the floating cookie notice allows you
              to accept all categories or open the preference panel.
            </p>

            <p>
              Within the panel, essential storage remains enabled, while
              analytics and marketing preferences can be selected or
              left disabled. Your preference is saved in your browser.
            </p>

            <p>
              After saving, use the floating{" "}
              <strong className="text-[#102A26]">Cookie settings</strong>{" "}
              control at the bottom-left of the website to reopen the
              preferences.
            </p>

            <p>
              The optional preferences are recorded for future integrations.
              They do not currently activate or deactivate analytics or
              advertising scripts because those trackers have not been
              configured.
            </p>
          </PolicySection>

          <PolicySection title="6. Browser controls and clearing storage">
            <p>
              You can use your browser settings to inspect or clear site
              data, including cookies and local storage. The precise steps
              depend on the browser you use.
            </p>

            <p>
              Clearing site storage may reset saved preferences and
              remove locally stored cart information. The cookie notice
              may appear again on a subsequent visit.
            </p>
          </PolicySection>

          <PolicySection title="7. Third-party services">
            <p>
              Future integrations such as authentication, payments,
              hosting tools or analytics may use their own cookies or
              similar technologies. Their actual behaviour will depend on
              the provider and configuration.
            </p>

            <p>
              If new technologies are introduced, CarePlus should update
              this policy and review the consent implementation before
              deploying those changes.
            </p>
          </PolicySection>

          <PolicySection title="8. Changes to this policy">
            <p>
              This policy may change when website features or the
              technologies used by CarePlus change. The latest version
              will be published on this page.
            </p>
          </PolicySection>

          <PolicySection title="9. Contact">
            <p>
              For questions about this policy, contact the CarePlus team
              at the address below, provided that it is active and
              monitored.
            </p>

            <a
              href="mailto:hello@carepluspharmacy.com"
              className="font-bold text-[#086B57] underline underline-offset-4 hover:text-[#063D35]"
            >
              hello@carepluspharmacy.com
            </a>
          </PolicySection>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold">
          <Link
            href="/privacy"
            className="text-[#086B57] transition hover:text-[#063D35]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-[#086B57] transition hover:text-[#063D35]"
          >
            Terms and Conditions
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#086B57] transition hover:text-[#063D35]"
          >
            <ArrowLeft size={16} />
            Return to CarePlus
          </Link>
        </div>
      </section>
    </main>
  );
}