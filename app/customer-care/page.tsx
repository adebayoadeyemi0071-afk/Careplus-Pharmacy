"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clipboard,
  FileText,
  Headphones,
  Mail,
  MessageCircle,
  Package,
  ShieldAlert,
  Truck,
} from "lucide-react";
/*
 * Configure these with CarePlus's real support channels
 * before deploying the website.
 *
 * Leave them empty until the contact details are confirmed.
 */
const CAREPLUS_SUPPORT_EMAIL = "";
const CAREPLUS_WHATSAPP_URL = "";
const SUPPORT_TOPICS = [
  { value: "medicine-authenticity", label: "Medicine authenticity" },
  { value: "prescription-review", label: "Prescription review" },
  { value: "order", label: "Order enquiry" },
  { value: "delivery", label: "Delivery problem" },
  { value: "payment", label: "Payment enquiry" },
  { value: "product", label: "Product information" },
  { value: "other", label: "Other enquiry" },
] as const;
export default function CustomerCarePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [topic, setTopic] = useState<
    (typeof SUPPORT_TOPICS)[number]["value"]
  >("medicine-authenticity");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [requestDraft, setRequestDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setCopied(false);
    if (!fullName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please describe how we can help.");
      return;
    }
    const selectedTopic = SUPPORT_TOPICS.find(
      (item) => item.value === topic
    )?.label ?? "Other enquiry";
    const reference =
      `CP-SUPPORT-DRAFT-${Date.now().toString().slice(-8)}`;
    const details = [
      "CarePlus Customer Care Request",
      `Draft reference: ${reference}`,
      `Name: ${fullName.trim()}`,
      `Customer email: ${email.trim()}`,
      `Topic: ${selectedTopic}`,
      `Order reference: ${orderReference.trim() || "Not provided"}`,
      "",
      "Message:",
      message.trim(),
    ].join("\n");
    setRequestDraft(details);
    /*
     * If the real support email is configured, open the
     * user's email application with the request prepared.
     *
     * This does not send the message automatically.
     */
    if (CAREPLUS_SUPPORT_EMAIL.trim()) {
      const subject = encodeURIComponent(
        `CarePlus support: ${selectedTopic}`
      );
      const body = encodeURIComponent(details);
      window.location.href =
        `mailto:${CAREPLUS_SUPPORT_EMAIL}` +
        `?subject=${subject}&body=${body}`;
      setNotice(
        "Your email application should open with your request prepared. Check and send the email there."
      );
      return;
    }
    setNotice(
      "Your request has been prepared in this browser only. CarePlus support email is not configured, so no message or support ticket has been sent."
    );
  };
  const handleCopyRequest = async () => {
    if (!requestDraft) return;
    try {
      await navigator.clipboard.writeText(requestDraft);
      setCopied(true);
      setNotice(
        "Request details copied. They have not been sent to CarePlus."
      );
    } catch {
      setCopied(false);
      setNotice(
        "Automatic copying is unavailable in this browser. Select and copy the prepared request details manually."
      );
    }
  };
  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* HERO */}
      <section className="border-b border-[#DDE9E5] bg-[#E5F5F0]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#086B57]">
              <Headphones size={28} />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
                CarePlus Pharmacy
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#063D35] sm:text-5xl">
                How can we help?
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base">
                Contact information and support tools for medicine
                verification, prescription review, orders, payments,
                and delivery enquiries.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        {/* TOPIC CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/medicine-verification"
            className="group rounded-2xl border border-[#DDE9E5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <ShieldAlert className="h-6 w-6 text-[#086B57]" />
            <h2 className="mt-4 text-base font-extrabold text-[#102A26]">
              Medicine authenticity
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              Check product details or report a possible packaging
              discrepancy.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#086B57]">
              Verify a medicine
              <ArrowRight size={15} />
            </span>
          </Link>
          <Link
            href="/prescription-status"
            className="group rounded-2xl border border-[#DDE9E5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <FileText className="h-6 w-6 text-[#086B57]" />
            <h2 className="mt-4 text-base font-extrabold text-[#102A26]">
              Prescription review
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              Return to the prescription-status page for your
              current frontend session.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#086B57]">
              View review status
              <ArrowRight size={15} />
            </span>
          </Link>
          <Link
            href="/order-success"
            className="group rounded-2xl border border-[#DDE9E5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <Package className="h-6 w-6 text-[#086B57]" />
            <h2 className="mt-4 text-base font-extrabold text-[#102A26]">
              Orders
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              View your current order summary if it is available
              in this browser session.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#086B57]">
              View order summary
              <ArrowRight size={15} />
            </span>
          </Link>
          <div className="rounded-2xl border border-[#DDE9E5] bg-white p-5">
            <Truck className="h-6 w-6 text-[#086B57]" />
            <h2 className="mt-4 text-base font-extrabold text-[#102A26]">
              Delivery support
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              Prepare an enquiry about delivery details, a delay,
              or an order issue using the form below.
            </p>
            <button
              type="button"
              onClick={() => {
                setTopic("delivery");
                document
                  .getElementById("support-request")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#086B57]"
            >
              Make an enquiry
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
        {/* CONTACT CHANNELS + FORM */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-5">
            <div className="rounded-3xl border border-[#DDE9E5] bg-white p-6 sm:p-7">
              <h2 className="text-xl font-extrabold text-[#102A26]">
                Contact channels
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                These channels must be configured with CarePlus&apos;s
                real contact details before the website goes live.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-[#F7FBF9] p-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />
                  <div>
                    <p className="text-sm font-extrabold text-[#102A26]">
                      Email support
                    </p>
                    {CAREPLUS_SUPPORT_EMAIL ? (
                      <a
                        href={`mailto:${CAREPLUS_SUPPORT_EMAIL}`}
                        className="mt-1 block break-all text-sm text-[#086B57] hover:underline"
                      >
                        {CAREPLUS_SUPPORT_EMAIL}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-[#71817D]">
                        Not configured yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-[#F7FBF9] p-4">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />
                  <div>
                    <p className="text-sm font-extrabold text-[#102A26]">
                      WhatsApp support
                    </p>
                    {CAREPLUS_WHATSAPP_URL ? (
                      <a
                        href={CAREPLUS_WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm text-[#086B57] hover:underline"
                      >
                        Open CarePlus WhatsApp
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-[#71817D]">
                        Not configured yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-[#E9D7A7] bg-[#FFF9EA] p-6">
              <h3 className="text-sm font-extrabold text-[#6F4D00]">
                Medicine safety
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#876A2B]">
                If you suspect that a medicine may be falsified,
                avoid relying on a barcode match alone. Ask a
                licensed pharmacist or appropriate authority for
                advice about the product.
              </p>
            </div>
          </aside>
          <section
            id="support-request"
            className="rounded-3xl border border-[#DDE9E5] bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-extrabold text-[#102A26]">
              Prepare a support request
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F706C]">
              Describe the issue and provide an order reference if
              applicable. The current frontend can prepare your
              message, but it cannot create a real support ticket.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="support-name"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Your name
                  </label>
                  <input
                    id="support-name"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    required
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] px-4 text-sm outline-none focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>
                <div>
                  <label
                    htmlFor="support-email"
                    className="mb-2 block text-sm font-bold text-[#102A26]"
                  >
                    Email address
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] px-4 text-sm outline-none focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="support-topic"
                  className="mb-2 block text-sm font-bold text-[#102A26]"
                >
                  What do you need help with?
                </label>
                <select
                  id="support-topic"
                  value={topic}
                  onChange={(event) =>
                    setTopic(
                      event.target.value as typeof topic
                    )
                  }
                  className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-white px-4 text-sm outline-none focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                >
                  {SUPPORT_TOPICS.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="support-order-reference"
                  className="mb-2 block text-sm font-bold text-[#102A26]"
                >
                  Order reference{" "}
                  <span className="font-medium text-[#8A9A96]">
                    (optional)
                  </span>
                </label>
                <input
                  id="support-order-reference"
                  value={orderReference}
                  onChange={(event) =>
                    setOrderReference(event.target.value)
                  }
                  placeholder="e.g. CP-12345678"
                  className="h-12 w-full rounded-xl border border-[#DDE9E5] px-4 text-sm outline-none focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                />
              </div>
              <div>
                <label
                  htmlFor="support-message"
                  className="mb-2 block text-sm font-bold text-[#102A26]"
                >
                  Message
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  required
                  rows={6}
                  placeholder="Tell us what happened and how we can help..."
                  className="w-full resize-y rounded-xl border border-[#DDE9E5] px-4 py-3 text-sm leading-6 outline-none focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                />
              </div>
              <p className="text-xs leading-5 text-[#71817D]">
                Do not include passwords, payment-card details,
                or prescription documents in this support form.
              </p>
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-[#F0C7C7] bg-[#FFF6F6] px-4 py-3 text-sm font-semibold text-[#B43B3B]"
                >
                  {error}
                </p>
              )}
              {notice && (
                <div
                  aria-live="polite"
                  className="rounded-xl border border-[#DDE9E5] bg-[#F1F8F5] px-4 py-3 text-sm leading-6 text-[#42685F]"
                >
                  {notice}
                </div>
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
              >
                Prepare Support Request
                <ArrowRight size={17} />
              </button>
              {requestDraft && (
                <div className="mt-5 rounded-2xl border border-[#DDE9E5] bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#102A26]">
                        Prepared request
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-[#71817D]">
                        This is a local draft, not a submitted
                        customer-support ticket.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyRequest}
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#DDE9E5] px-3 py-2 text-xs font-bold text-[#086B57] hover:bg-[#F1F8F5]"
                    >
                      {copied ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <Clipboard size={15} />
                      )}
                      {copied ? "Copied" : "Copy details"}
                    </button>
                  </div>
                  <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-[#F7FBF9] p-4 text-xs leading-5 text-[#5F706C]">
                    {requestDraft}
                  </pre>
                </div>
              )}
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
