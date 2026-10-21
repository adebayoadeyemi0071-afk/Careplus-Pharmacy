
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | CarePlus Pharmacy",
  description:
    "Review the terms governing access to and use of the CarePlus Pharmacy website.",
};

function TermsSection({
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

export default function TermsPage() {
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
            <FileText size={28} strokeWidth={1.8} />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            Please read carefully
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#063D35] sm:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4F6863] sm:text-base">
            These terms describe the basic conditions for accessing and using
            the CarePlus Pharmacy website.
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
                Demonstration status:
              </strong>{" "}
              CarePlus is under development. Unless a feature has been
              explicitly activated and verified, the website must not be
              treated as confirmation that real medicine sales, prescriptions,
              orders, deliveries or payments are being processed.
            </p>
          </div>

          <TermsSection title="1. Acceptance of these terms">
            <p>
              By accessing or using the CarePlus website, you agree to comply
              with these terms. If you do not agree, you should discontinue
              use of the website.
            </p>
          </TermsSection>

          <TermsSection title="2. Permitted use">
            <p>
              You may use the website for lawful purposes and in accordance
              with these terms. You must not attempt to disrupt its operation,
              gain unauthorised access to accounts or systems, introduce
              malicious code, or misuse information obtained through the
              website.
            </p>
          </TermsSection>

          <TermsSection title="3. Product information and availability">
            <p>
              Product descriptions, photographs, prices, availability and
              other catalogue information should be checked before relying on
              them. Information may change and may contain errors while the
              website is under development.
            </p>
            <p>
              A product appearing in the catalogue does not, by itself,
              establish current stock availability, regulatory status,
              suitability for an individual or confirmation that an order
              can be fulfilled.
            </p>
          </TermsSection>

          <TermsSection title="4. Health information and medical advice">
            <p>
              Website content is provided for general informational purposes
              and is not a substitute for advice from a qualified healthcare
              professional.
            </p>
            <p>
              Do not start, stop or change medication based solely on
              information displayed on this website. Consult an appropriately
              qualified healthcare professional about treatment, medicine
              suitability, dosage, interactions or side effects.
            </p>
            <p>
              In an urgent medical situation, seek appropriate local
              emergency care rather than relying on this website.
            </p>
          </TermsSection>

          <TermsSection title="5. Prescription medicines">
            <p>
              Any prescription-related feature is subject to applicable law
              and appropriate professional review. Uploading a document or
              selecting a product must not be interpreted as approval of a
              prescription or authorisation to supply a medicine.
            </p>
            <p>
              Prescription-required products must not be supplied through a
              real service unless the required legal, verification and
              professional safeguards are in place.
            </p>
          </TermsSection>

          <TermsSection title="6. Accounts and account security">
            <p>
              Where account functionality is available, you are responsible
              for providing accurate information and taking reasonable steps
              to protect your sign-in credentials.
            </p>
            <p>
              You should notify the service operator if you become aware of
              suspected unauthorised access. Account features remain subject
              to the actual authentication and security controls implemented.
            </p>
          </TermsSection>

          <TermsSection title="7. Orders, payments and delivery">
            <p>
              Any order, payment, delivery, cancellation, return or refund
              process is subject to the terms presented for the operational
              service at the time of the transaction and applicable law.
            </p>
            <p>
              A cart entry, test payment or demonstration confirmation screen
              does not necessarily mean an order has been accepted or a
              payment completed.
            </p>
            <p>
              Before accepting real orders, the operator must publish
              accurate information about fulfilment, delivery charges,
              cancellation, returns and refunds and ensure that the
              corresponding processes are implemented.
            </p>
          </TermsSection>

          <TermsSection title="8. Intellectual property">
            <p>
              Website content, branding, visual design and software may be
              protected by applicable intellectual property laws. You may
              access and use the website for its intended purposes but must
              not reproduce protected material or represent it as your own
              without permission or another lawful basis.
            </p>
          </TermsSection>

          <TermsSection title="9. Third-party services and links">
            <p>
              The website may link to external websites or use third-party
              services. Those services may have their own terms, privacy
              policies and operational requirements.
            </p>
            <p>
              Links to external services do not, by themselves, mean that
              CarePlus endorses them or controls their availability or
              content.
            </p>
          </TermsSection>

          <TermsSection title="10. Availability and limitations">
            <p>
              The website may be updated, suspended or modified for
              maintenance, security or operational reasons. While reasonable
              efforts may be made to keep it available, uninterrupted access
              cannot be guaranteed.
            </p>
            <p>
              Nothing in these terms excludes or limits a right or
              responsibility that cannot lawfully be excluded or limited
              under applicable law.
            </p>
          </TermsSection>

          <TermsSection title="11. Changes to these terms">
            <p>
              These terms may be updated as the website or its services
              develop. The latest version will be published on this page.
              Where legally required, material changes will be communicated
              through an appropriate process.
            </p>
          </TermsSection>

          <TermsSection title="12. Applicable law and contact">
            <p>
              These terms should be reviewed and finalised to reflect the
              laws applicable to the operating business and the jurisdictions
              in which its services are offered.
            </p>
            <p>
              For questions about these terms, contact the CarePlus team at
              the following address, provided it is active and monitored:
            </p>
            <a
              href="mailto:hello@carepluspharmacy.com"
              className="font-bold text-[#086B57] underline underline-offset-4 hover:text-[#063D35]"
            >
              hello@carepluspharmacy.com
            </a>
          </TermsSection>
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
