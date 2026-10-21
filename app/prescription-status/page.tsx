"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  RefreshCw,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import { useCheckoutStore } from "@/components/checkout/checkout-store";

export default function PrescriptionStatusPage() {
  const router = useRouter();

  const draft = useCheckoutStore(
    (state) => state.checkoutDraft
  );

  const submission = useCheckoutStore(
    (state) => state.prescriptionSubmission
  );

  const updatePrescriptionStatus = useCheckoutStore(
    (state) => state.updatePrescriptionStatus
  );

  const hasPrescriptionItems =
    draft?.items.some(
      (item) => item.requiresPrescription
    ) ?? false;

  const hasActiveSubmission = Boolean(
    draft &&
      submission &&
      submission.draftId === draft.id &&
      hasPrescriptionItems
  );

  const isDevelopment =
    process.env.NODE_ENV === "development";

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));

  if (
    !hasActiveSubmission ||
    !draft ||
    !submission
  ) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#DDE9E5] bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F5F0]">
            <FileText className="h-7 w-7 text-[#086B57]" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#102A26]">
            No active prescription review
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#5F706C]">
            No prescription submission was found for your
            current checkout. Start from checkout and submit
            a prescription to view its status.
          </p>

          <button
            type="button"
            onClick={() => router.push("/checkout")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#063D35]"
          >
            <ArrowLeft size={16} />
            Return to Checkout
          </button>
        </div>
      </main>
    );
  }

  const status = submission.status;

  return (
    <main className="min-h-screen bg-[#FAFCFB] px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <section className="mt-7 rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-sm sm:p-10">
          {/* STATUS ICON */}
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
              status === "approved"
                ? "bg-[#E5F5F0]"
                : status === "rejected"
                  ? "bg-[#FFF0F0]"
                  : status === "more_information_required"
                    ? "bg-[#FFF7E5]"
                    : "bg-[#EAF2FF]"
            }`}
          >
            {status === "approved" ? (
              <CheckCircle2 className="h-8 w-8 text-[#16845E]" />
            ) : status === "rejected" ? (
              <XCircle className="h-8 w-8 text-[#D64545]" />
            ) : status === "more_information_required" ? (
              <ShieldAlert className="h-8 w-8 text-[#9A6A00]" />
            ) : (
              <Clock3 className="h-8 w-8 text-[#3568A8]" />
            )}
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            CarePlus Prescription Verification
          </p>

          {/* PENDING REVIEW */}
          {status === "pending_review" && (
            <>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102A26] sm:text-4xl">
                Your prescription is being reviewed
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#5F706C] sm:text-base">
                Your prescription submission has been recorded
                in this prototype and is awaiting review. Please
                wait for the review decision before proceeding
                with payment.
              </p>

              <div className="mt-7 rounded-2xl border border-[#DDE9E5] bg-[#F7FBF9] p-5">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                  <div>
                    <h2 className="text-sm font-extrabold text-[#102A26]">
                      What happens next?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                      The prescription must be reviewed before
                      the order can proceed. Once the real
                      notification service is connected, CarePlus
                      can email you when your review is complete.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#E5F5F0] p-5">
                <p className="text-sm font-extrabold text-[#063D35]">
                  Email address for review updates
                </p>

                <p className="mt-2 text-sm leading-6 text-[#42685F]">
                  The email address associated with this checkout
                  is:
                </p>

                <p className="mt-2 break-all text-sm font-extrabold text-[#086B57]">
                  {draft.customer.email}
                </p>

                <p className="mt-3 text-xs leading-5 text-[#42685F]">
                  Email notifications are not active in this
                  frontend prototype. No email has been sent.
                </p>
              </div>
            </>
          )}

          {/* APPROVED */}
          {status === "approved" && (
            <>
              <h1 className="mt-3 text-3xl font-extrabold text-[#102A26] sm:text-4xl">
                Prescription marked as approved
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#5F706C]">
                Approval has been simulated for development.
                This is not a real pharmacist decision. Continue
                to checkout to test the next step.
              </p>

              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
              >
                Continue to Checkout
                <ArrowRight size={17} />
              </button>
            </>
          )}

          {/* REJECTED */}
          {status === "rejected" && (
            <>
              <h1 className="mt-3 text-3xl font-extrabold text-[#102A26] sm:text-4xl">
                Prescription review was unsuccessful
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#5F706C]">
                This is a simulated rejection for frontend
                testing. The prescription order must not proceed
                until the issue has been resolved.
              </p>
            </>
          )}

          {/* MORE INFORMATION */}
          {status === "more_information_required" && (
            <>
              <h1 className="mt-3 text-3xl font-extrabold text-[#102A26] sm:text-4xl">
                Additional information required
              </h1>

              <p className="mt-4 text-sm leading-7 text-[#5F706C]">
                Additional documentation has been requested
                in this demo. Upload a clearer or corrected
                document to test the resubmission flow.
              </p>
            </>
          )}

          {/* SUBMISSION DETAILS */}
          <div className="mt-7 rounded-2xl border border-[#DDE9E5] bg-[#FAFCFB] p-5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#71817D]">
              Submission Reference
            </p>

            <p className="mt-2 break-all text-sm font-extrabold text-[#102A26]">
              {submission.reference}
            </p>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-[#71817D]">
              Document
            </p>

            <p className="mt-2 break-words text-sm font-semibold text-[#102A26]">
              {submission.fileName}
            </p>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-[#71817D]">
              Submitted At
            </p>

            <p className="mt-2 text-sm text-[#5F706C]">
              {formatDate(submission.submittedAt)}
            </p>
          </div>

          {/* RESUBMISSION */}
          {(status === "rejected" ||
            status === "more_information_required") && (
            <button
              type="button"
              onClick={() =>
                router.push("/prescription-upload")
              }
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              <RefreshCw size={17} />
              Upload Another Prescription
            </button>
          )}

          {/* PROTOTYPE NOTICE */}
          <div className="mt-6 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
            <p className="text-sm font-extrabold text-[#6F4D00]">
              Review and email are not connected yet
            </p>

            <p className="mt-2 text-xs leading-6 text-[#876A2B]">
              This frontend prototype does not securely upload
              prescription documents, notify a real pharmacist,
              or send email notifications. Review decisions
              made on this page are simulated.
            </p>
          </div>
        </section>

        <div className="mt-7 text-center">
          <Link
            href="/shop"
            className="text-sm font-bold text-[#086B57] transition hover:text-[#063D35]"
          >
            Return to Shop
          </Link>
        </div>
      </div>

      {/* DEVELOPMENT TESTING */}
      {isDevelopment && status === "pending_review" && (
        <section className="mx-auto mt-6 max-w-3xl rounded-2xl border border-dashed border-[#BBD5CC] bg-white p-5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#086B57]">
            Development Testing
          </p>

          <p className="mt-2 text-sm leading-6 text-[#5F706C]">
            Use these controls to test the different review
            states. They do not represent real clinical decisions.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() =>
                updatePrescriptionStatus("approved")
              }
              className="rounded-xl bg-[#E5F5F0] px-4 py-3 text-sm font-bold text-[#086B57] hover:bg-[#D4EEE5]"
            >
              Simulate Approval
            </button>

            <button
              type="button"
              onClick={() =>
                updatePrescriptionStatus(
                  "more_information_required",
                  "Please upload a clearer document for review."
                )
              }
              className="rounded-xl bg-[#FFF7E5] px-4 py-3 text-sm font-bold text-[#9A6A00] hover:bg-[#FCECC5]"
            >
              Request More Info
            </button>

            <button
              type="button"
              onClick={() =>
                updatePrescriptionStatus(
                  "rejected",
                  "Simulated rejection for frontend testing."
                )
              }
              className="rounded-xl bg-[#FFF0F0] px-4 py-3 text-sm font-bold text-[#B43B3B] hover:bg-[#FFE2E2]"
            >
              Simulate Rejection
            </button>
          </div>
        </section>
      )}
    </main>
  );
}