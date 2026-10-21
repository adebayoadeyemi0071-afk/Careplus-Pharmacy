
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | CarePlus Pharmacy",
  description:
    "Learn how CarePlus Pharmacy handles personal information and protects privacy.",
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

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      <section className="border-b border-[#DDE9E5] bg-[#E5F5F0]">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#086B57] hover:text-[#063D35]"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#086B57] shadow-sm">
            <ShieldCheck size={29} strokeWidth={1.8} />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            Your privacy matters
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#063D35] sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4F6863] sm:text-base">
            This page explains the types of information that may be handled
            when you use CarePlus Pharmacy, how that information may be used,
            and the choices available to you.
          </p>

          <p className="mt-4 text-xs font-semibold text-[#5F706C]">
            Last updated: 21 October 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="rounded-2xl border border-[#DDE9E5] bg-white p-5 sm:p-8">
          <div className="border-b border-[#DDE9E5] pb-6">
            <p className="text-sm leading-7 text-[#5F706C]">
              <strong className="text-[#102A26]">
                Important information:
              </strong>{" "}
              CarePlus is currently being developed. The actual information
              collected depends on which account, payment, ordering and
              prescription features are connected and enabled. Do not submit
              real medical records, prescription documents or payment
              information to a demonstration version unless the relevant
              service is operational and its data-handling arrangements have
              been confirmed.
            </p>
          </div>

          <PolicySection title="1. Information we may collect">
            <p>
              Depending on the features you use, information may include your
              name, email address, telephone number, account details, delivery
              address, order details and messages submitted through contact
              forms.
            </p>
            <p>
              If prescription or other healthcare-related features are
              activated, documents or information you submit may contain
              sensitive personal or health information. Such information
              should only be collected when necessary and with appropriate
              safeguards.
            </p>
            <p>
              Hosting and security services may also process technical
              information, such as browser details, access times and error
              logs, depending on their configuration.
            </p>
          </PolicySection>

          <PolicySection title="2. How information may be used">
            <p>Information may be used to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide and maintain website features.</li>
              <li>Manage accounts and respond to customer enquiries.</li>
              <li>Process orders and arrange delivery when those services are operational.</li>
              <li>Support payment, security and fraud-prevention processes.</li>
              <li>Maintain site performance and troubleshoot technical problems.</li>
              <li>Meet applicable legal obligations.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Payments and third-party services">
            <p>
              The website may rely on hosting, authentication, database,
              payment and delivery providers. Where these services are
              connected, they may process relevant information to perform
              their functions under their applicable terms and privacy
              policies.
            </p>
            <p>
              Before accepting real payments, CarePlus must confirm its
              payment-provider configuration, security controls and
              information-sharing practices. Do not assume that a payment
              screen or checkout demonstration means a transaction has been
              processed.
            </p>
          </PolicySection>

          <PolicySection title="4. Cookies and local storage">
            <p>
              The website may use browser storage to support features such as
              cart persistence and user preferences. Authentication or
              connected services may also use cookies or similar
              technologies.
            </p>
            <p>
              The specific technologies used depend on the deployed
              configuration. You can manage cookies through your browser
              settings, although disabling some technologies may affect
              website functionality.
            </p>
          </PolicySection>

          <PolicySection title="5. Data security and retention">
            <p>
              Appropriate technical and organisational safeguards should be
              used to protect personal information against unauthorised
              access, loss, misuse or disclosure.
            </p>
            <p>
              Information should be retained only for as long as necessary
              for the relevant purpose or as required by applicable law.
              Actual retention periods depend on the services connected and
              the applicable operational policies.
            </p>
            <p>
              No internet transmission or storage system can be guaranteed to
              be completely secure.
            </p>
          </PolicySection>

          <PolicySection title="6. Your privacy rights">
            <p>
              Depending on applicable law and your circumstances, you may
              have rights to request access to your personal information,
              correct inaccurate information, request deletion, object to
              certain processing or withdraw consent where consent is the
              relevant legal basis.
            </p>
            <p>
              Requests should be assessed in accordance with applicable
              Nigerian data-protection requirements and any other laws that
              apply to the service.
            </p>
          </PolicySection>

          <PolicySection title="7. Children’s privacy">
            <p>
              CarePlus is not intended to encourage children to submit
              sensitive personal, medical or payment information without
              appropriate authorisation and safeguards.
            </p>
          </PolicySection>

          <PolicySection title="8. Changes to this policy">
            <p>
              This policy may be updated as CarePlus develops or its services
              change. The latest version will be published on this page with
              an updated revision date where appropriate.
            </p>
          </PolicySection>

          <PolicySection title="9. Contact us">
            <p>
              For privacy-related enquiries, contact the CarePlus team using
              the address below, provided this mailbox is active and
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

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#063D35]"
          >
            <ArrowLeft size={16} />
            Return to CarePlus
          </Link>
        </div>
      </section>
    </main>
  );
}
