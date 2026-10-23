
"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useAuthStore } from "@/components/auth/auth-store";

type ReviewStatus = "not-uploaded" | "pending" | "approved";

const STATUS_KEY = "careplus-prescription-status";

export default function PrescriptionUploadPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const hasPrescriptionItems = items.some(
    (item) => item.requiresPrescription
  );

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] =
    useState<ReviewStatus>("not-uploaded");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedStatus = window.localStorage.getItem(STATUS_KEY);

    if (
      savedStatus === "pending" ||
      savedStatus === "approved"
    ) {
      setStatus(savedStatus);
    }
  }, []);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setFile(null);

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Choose a PDF, JPG, PNG, or WEBP file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Your file must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setStatus("not-uploaded");
    window.localStorage.removeItem(STATUS_KEY);
  };

  const handleSubmitDocument = () => {
    if (!file) {
      setError("Select a prescription document first.");
      return;
    }

    setError("");
    setStatus("pending");
    window.localStorage.setItem(STATUS_KEY, "pending");
  };

  const handleSimulateApproval = () => {
    if (!file) {
      setError(
        "Select a prescription document before simulating review."
      );
      return;
    }

    setError("");
    setStatus("approved");
    window.localStorage.setItem(STATUS_KEY, "approved");
  };

  const continueToCheckout = () => {
    if (hasPrescriptionItems && status !== "approved") {
      setError(
        "Prescription approval is required before checkout."
      );
      return;
    }

    router.push("/checkout");
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-[65vh] bg-[#FAFCFB] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#DDE9E5] bg-white p-8 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#086B57]" />
          <h1 className="mt-5 text-2xl font-extrabold text-[#102A26]">
            Sign in to continue
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#5F706C]">
            Sign in to upload a prescription for your order.
          </p>
          <Link
            href={`/auth/sign-in?redirect=${encodeURIComponent("/prescription-upload")}`}
            className="mt-6 inline-flex rounded-full bg-[#086B57] px-6 py-3 font-bold text-white"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#FAFCFB] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#DDE9E5] bg-white p-8 text-center">
          <h1 className="text-2xl font-extrabold text-[#102A26]">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-[#5F706C]">
            Add products before uploading a prescription.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-[#086B57] px-6 py-3 font-bold text-white"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  if (!hasPrescriptionItems) {
    return (
      <main className="min-h-[65vh] bg-[#FAFCFB] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-[#DDE9E5] bg-white p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#086B57]" />
          <h1 className="mt-5 text-2xl font-extrabold text-[#102A26]">
            No prescription needed
          </h1>
          <p className="mt-3 text-sm text-[#5F706C]">
            Your current cart can proceed directly to checkout.
          </p>
          <button
            type="button"
            onClick={() => router.push("/checkout")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3 font-bold text-white"
          >
            Continue to checkout <ArrowRight size={16} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFCFB] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] hover:text-[#086B57]"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <div className="mt-7 rounded-3xl border border-[#DDE9E5] bg-white p-6 shadow-sm sm:p-9">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
            <Upload size={26} />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#086B57]">
            CarePlus Pharmacy
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102A26]">
            Upload your prescription
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#5F706C]">
            Choose a clear image or PDF of your prescription.
            Prescription medicines must be reviewed by a qualified
            pharmacist before they can be dispensed.
          </p>

          <div className="mt-7 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-4">
            <p className="text-sm font-bold text-[#6F4D00]">
              Items requiring review
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[#876A2B]">
              {items
                .filter((item) => item.requiresPrescription)
                .map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
            </ul>
          </div>

          <label
            htmlFor="prescription"
            className="mt-7 block text-sm font-bold text-[#102A26]"
          >
            Prescription document
          </label>

          <input
            id="prescription"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="mt-2 block w-full rounded-xl border border-[#DDE9E5] bg-white p-3 text-sm text-[#5F706C] file:mr-4 file:rounded-lg file:border-0 file:bg-[#E5F5F0] file:px-4 file:py-2 file:font-bold file:text-[#086B57]"
          />

          {file && (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#F1F8F5] p-4">
              <FileText className="h-6 w-6 shrink-0 text-[#086B57]" />
              <div className="min-w-0">
                <p className="break-all text-sm font-bold text-[#102A26]">
                  {file.name}
                </p>
                <p className="text-xs text-[#5F706C]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          {status === "pending" && (
            <div className="mt-5 rounded-xl border border-[#E9D7A7] bg-[#FFF9EA] p-4 text-sm text-[#876A2B]">
              Demo status: awaiting pharmacist review. You can simulate
              approval below for testing.
            </div>
          )}

          {status === "approved" && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#B9D8CE] bg-[#F1F8F5] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />
              <div>
                <p className="text-sm font-extrabold text-[#086B57]">
                  Demo approval recorded
                </p>
                <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                  This is a simulated status for development only. No
                  pharmacist has reviewed this document.
                </p>
              </div>
            </div>
          )}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleSubmitDocument}
              disabled={!file}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#086B57] px-5 py-3.5 text-sm font-extrabold text-[#086B57] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={16} />
              Submit for review
            </button>

            <button
              type="button"
              onClick={handleSimulateApproval}
              disabled={!file || status === "approved"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3.5 text-sm font-extrabold text-white hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Simulate approval
              <CheckCircle2 size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={continueToCheckout}
            disabled={status !== "approved"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#063D35] px-5 py-4 text-sm font-extrabold text-white hover:bg-[#086B57] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to checkout
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </main>
  );
}
