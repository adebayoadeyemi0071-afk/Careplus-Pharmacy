
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

import { useCheckoutStore } from "@/components/checkout/checkout-store";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export default function PrescriptionUploadPage() {
  const router = useRouter();

  const checkoutDraft = useCheckoutStore(
    (state) => state.checkoutDraft
  );

  const submitPrescription = useCheckoutStore(
    (state) => state.submitPrescription
  );

  const prescriptionItems =
    checkoutDraft?.items.filter(
      (item) => item.requiresPrescription
    ) ?? [];

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
   * Release the temporary image URL when it changes or
   * when the component unmounts. This effect does not
   * update React state.
   */
  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.currentTarget;
    const selectedFile = input.files?.[0] ?? null;

    setError("");
    setFile(null);
    setPreviewUrl("");

    // Allow the same file to be selected again later.
    input.value = "";

    if (!selectedFile) {
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError(
        "Choose a JPG, PNG, WebP image or a PDF document."
      );
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Your file must be no larger than 10 MB.");
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (
      !checkoutDraft ||
      prescriptionItems.length === 0
    ) {
      setError(
        "No prescription-required products were found in this checkout."
      );
      return;
    }

    if (!file) {
      setError("Please select your prescription first.");
      return;
    }

    setIsSubmitting(true);

    /*
     * Frontend demonstration only.
     *
     * The filename and review status are stored in memory.
     * The prescription file is not uploaded to a server.
     */
    submitPrescription(file.name);

    /*
     * Client-side navigation preserves the in-memory Zustand
     * store. Do not replace this with window.location.href.
     */
    router.push("/prescription-status");
  };

  if (!checkoutDraft || prescriptionItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#DDE9E5] bg-white p-8 text-center">
          <h1 className="text-2xl font-extrabold text-[#102A26]">
            No prescription checkout found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#5F706C]">
            Return to checkout and select a product that
            requires a prescription before continuing.
          </p>

          <Link
            href="/checkout"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-bold text-white hover:bg-[#063D35]"
          >
            Return to Checkout
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] hover:text-[#086B57]"
          >
            <ArrowLeft size={16} />
            Back to Checkout
          </Link>

          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
            CarePlus Pharmacy
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#063D35] sm:text-4xl">
            Prescription verification
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base">
            Upload a clear copy of your prescription. Your order
            must pass prescription review before it can proceed
            to payment.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_300px] lg:py-12">
        <div className="rounded-3xl border border-[#DDE9E5] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0]">
              <Upload className="h-6 w-6 text-[#086B57]" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#102A26]">
                Upload prescription
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                Ensure the medicine details, prescription date,
                prescriber information and signature are readable.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7">
            <label
              htmlFor="prescription-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#BBD5CC] bg-[#F7FBF9] px-5 py-10 text-center transition hover:border-[#086B57] hover:bg-[#F1F8F5]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                <Upload className="h-6 w-6 text-[#086B57]" />
              </div>

              <span className="mt-4 text-sm font-extrabold text-[#102A26]">
                Choose prescription document
              </span>

              <span className="mt-2 text-xs leading-5 text-[#71817D]">
                JPG, PNG, WebP or PDF · Maximum 10 MB
              </span>

              <input
                ref={fileInputRef}
                id="prescription-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            {file && (
              <div className="mt-5 rounded-2xl border border-[#DDE9E5] p-4">
                <div className="flex items-start gap-4">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Selected prescription preview"
                      width={100}
                      height={100}
                      unoptimized
                      className="h-24 w-24 rounded-xl border border-[#DDE9E5] bg-[#F1F8F5] object-contain"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#F1F8F5]">
                      <FileText className="h-8 w-8 text-[#086B57]" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-extrabold text-[#102A26]">
                      {file.name}
                    </p>

                    <p className="mt-2 text-xs text-[#71817D]">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#16845E]">
                      <CheckCircle2 size={15} />
                      File selected
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove prescription file"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#71817D] hover:bg-[#FFF0F0] hover:text-[#D64545]"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-[#F0C7C7] bg-[#FFF6F6] px-4 py-3 text-sm font-semibold text-[#B43B3B]"
              >
                {error}
              </div>
            )}

            <div className="mt-7 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
              <p className="text-sm font-extrabold text-[#6F4D00]">
                Frontend prototype
              </p>

              <p className="mt-2 text-xs leading-6 text-[#876A2B]">
                This prototype does not securely upload the
                document or notify a pharmacist. It records a
                simulated submission status only. Use a dummy
                document while testing.
              </p>
            </div>

            <button
              type="submit"
              disabled={!file || isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
              <ArrowRight size={17} />
            </button>
          </form>
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-[#DDE9E5] bg-white p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#086B57]" />

              <h2 className="font-extrabold text-[#102A26]">
                Items requiring prescriptions
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {prescriptionItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#EEF3F1] pb-4 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-bold text-[#102A26]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-[#71817D]">
                    Quantity: {item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#E5F5F0] p-6">
            <h3 className="font-extrabold text-[#063D35]">
              What happens next?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              The order remains pending until the required
              prescription review is completed. Approval and
              payment are separate steps.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
