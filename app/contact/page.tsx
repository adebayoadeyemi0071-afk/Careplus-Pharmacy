"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Send,
} from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    value: "+234 XXX XXX XXXX",
    detail: "Mon – Fri: 8am – 8pm",
    secondary: "Sat – Sun: 9am – 6pm",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "support@careplus.ng",
    detail: "We aim to respond within",
    secondary: "24 hours.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "CarePlus Pharmacy",
    detail: "Address coming soon",
    secondary: "Lagos, Nigeria",
  },
  {
    icon: Clock3,
    title: "Opening Hours",
    value: "Mon – Fri: 8am – 8pm",
    detail: "Sat: 9am – 6pm",
    secondary: "Sun: 10am – 4pm",
  },
];

const faqs = [
  {
    question: "How does delivery work?",
    answer:
      "Once your order has been confirmed, it will be prepared for delivery to the address provided during checkout. Delivery options and availability will be shown during checkout.",
  },
  {
    question: "Do you sell prescription medicines?",
    answer:
      "Some medicines may require a valid prescription and pharmacist review. Products that require a prescription will be clearly identified during the shopping and checkout process.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "CarePlus will support secure online payments through our payment provider. Available payment options will be displayed during checkout.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Returns depend on the product and its condition. Our return policy will provide the full requirements and process for eligible products.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-[#FAFCFB] text-[#102A26]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-4 pb-8 pt-4 sm:px-6 lg:px-8 lg:pb-10 lg:pt-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#E5F5F0] lg:min-h-[520px] lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-16">
            <span className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              Get In Touch
            </span>

            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              We&apos;re Here
              <br />
              to Help
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5F706C] sm:text-lg sm:leading-8">
              Have a question, need support or want to learn more about our
              products? Reach out to us through any of the channels below and
              we&apos;ll be happy to help.
            </p>

            <div className="mt-8">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#063D35]"
              >
                Contact Us
                <ArrowRight size={17} strokeWidth={2.4} />
              </a>
            </div>
          </div>

          {/* Existing homepage image */}
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[440px] lg:min-h-full">
            <Image
              src="/images/hero-pharmacist.jpg"
              alt="CarePlus Pharmacy pharmacist"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#063D35]/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT DETAILS
      ========================================================= */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[24px] border border-[#DDE9E5] bg-white p-6 shadow-[0_8px_30px_rgba(6,61,53,0.04)] sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <Icon size={22} strokeWidth={2} />
                </div>

                <h2 className="mt-6 text-base font-extrabold">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm font-bold text-[#086B57]">
                  {item.value}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                  {item.detail}
                </p>

                <p className="text-sm leading-6 text-[#5F706C]">
                  {item.secondary}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CONTACT FORM + LOCATION
      ========================================================= */}
      <section
        id="contact-form"
        className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Form */}
          <div className="rounded-[28px] border border-[#DDE9E5] bg-white p-6 shadow-[0_8px_30px_rgba(6,61,53,0.04)] sm:p-8 lg:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              Send Us A Message
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#5F706C] sm:text-base">
              Fill in the form below and our team will get back to you as soon
              as possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-bold"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm outline-none transition placeholder:text-[#94A5A0] focus:border-[#086B57] focus:ring-2 focus:ring-[#E5F5F0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm outline-none transition placeholder:text-[#94A5A0] focus:border-[#086B57] focus:ring-2 focus:ring-[#E5F5F0]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234..."
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm outline-none transition placeholder:text-[#94A5A0] focus:border-[#086B57] focus:ring-2 focus:ring-[#E5F5F0]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold"
                  >
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#5F706C] outline-none transition focus:border-[#086B57] focus:ring-2 focus:ring-[#E5F5F0]"
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="order">Order Support</option>
                    <option value="product">Product Question</option>
                    <option value="delivery">Delivery</option>
                    <option value="prescription">
                      Prescription Question
                    </option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 py-3 text-sm outline-none transition placeholder:text-[#94A5A0] focus:border-[#086B57] focus:ring-2 focus:ring-[#E5F5F0]"
                />
              </div>

              {submitted && (
                <div
                  role="status"
                  className="rounded-xl border border-[#BFE3D8] bg-[#E5F5F0] px-4 py-3 text-sm font-semibold text-[#086B57]"
                >
                  Thanks for reaching out. Your message has been received.
                  We&apos;ll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#063D35]"
              >
                Send Message
                <Send size={17} strokeWidth={2.3} />
              </button>

              <p className="text-center text-xs leading-5 text-[#7A8A86]">
                This form is currently a frontend placeholder and will be
                connected to the CarePlus backend later.
              </p>
            </form>
          </div>

          {/* Location / Support Card */}
          <div className="flex flex-col overflow-hidden rounded-[28px] bg-[#E5F5F0]">
            <div className="relative min-h-[300px] flex-1">
              <Image
                src="/images/hero-pharmacist.jpg"
                alt="CarePlus Pharmacy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#063D35]/70 via-[#063D35]/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-sm sm:left-8 sm:right-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E5F5F0] text-[#086B57]">
                    <MapPin size={20} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold">
                      Visit CarePlus
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                      Our physical pharmacy location will be added here once
                      the final address is available.
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#086B57]">
                      Location coming soon
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#086B57]">
                Need Help?
              </span>

              <h3 className="mt-3 text-2xl font-extrabold">
                Prefer to talk directly?
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#5F706C]">
                Reach out to our team through WhatsApp for questions about
                products, orders or general support.
              </p>

              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#086B57] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#063D35]"
              >
                <MessageCircle size={17} />
                WhatsApp Coming Soon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-[#F1F8F5] p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
              Frequently Asked Questions
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
              Quick Answers
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#5F706C] sm:text-base">
              Find answers to some of the common questions about CarePlus,
              orders, products and our services.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#086B57] px-5 py-3 text-sm font-bold text-[#086B57] transition hover:bg-[#086B57] hover:text-white"
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5F5F0] text-[#086B57]">
                      <Plus
                        size={17}
                        className={`transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#DDE9E5] px-5 pb-5 pt-4">
                      <p className="text-sm leading-7 text-[#5F706C]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHATSAPP CTA
      ========================================================= */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[28px] bg-[#063D35] px-7 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#086B57]">
              <MessageCircle size={26} strokeWidth={2} />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ED6C4]">
                Need Immediate Assistance?
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Chat With Us on WhatsApp
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#C7DED8]">
                Our team will be available to help with questions, support and
                product recommendations.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {}}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#063D35] transition hover:bg-[#E5F5F0]"
          >
            <MessageCircle size={17} />
            WhatsApp Coming Soon
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}