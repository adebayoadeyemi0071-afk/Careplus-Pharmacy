
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import jsPDF from "jspdf";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  Home,
  Package,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import {
  type PendingOrder,
  useCheckoutStore,
} from "@/components/checkout/checkout-store";

function MedicineAuthenticitySection() {
  return (
    <section
      id="verify-your-medicine"
      className="mt-6 scroll-mt-24 rounded-[1.75rem] border border-[#DDE9E5] bg-white p-6 shadow-[0_12px_35px_rgba(6,61,53,0.04)] sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5F0]">
            <ShieldCheck className="h-6 w-6 text-[#086B57]" />
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#086B57]">
              Medicine safety
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-[#102A26] sm:text-2xl">
              Verify your medicine
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F706C]">
              Received your medicine? Scan the package barcode
              or enter its NAFDAC registration number to check
              for a matching product record in the CarePlus
              catalogue.
            </p>

            <p className="mt-3 text-xs leading-5 text-[#71817D]">
              A catalogue match is not proof that a physical
              medicine pack is genuine. Suspected discrepancies
              should be checked with a licensed pharmacist
              or the appropriate authority.
            </p>
          </div>
        </div>

        <Link
          href="/medicine-verification"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
        >
          <Package size={17} />
          Verify Medicine
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="mt-6 border-t border-[#DDE9E5] pt-5">
        <p className="text-sm font-bold text-[#102A26]">
          Unable to verify your product?
        </p>

        <p className="mt-1 text-sm leading-6 text-[#5F706C]">
          Contact CarePlus Customer Care for help with possible
          packaging discrepancies, product details, or other
          concerns.
        </p>

        <Link
          href="/customer-care"
          className="mt-3 inline-flex items-center gap-2 text-sm font-extrabold text-[#086B57] hover:underline"
        >
          Contact Customer Care
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  const pendingOrder = useCheckoutStore(
    (state) => state.pendingOrder
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [receiptError, setReceiptError] = useState("");

  useEffect(() => {
    if (pendingOrder) {
      clearCart();
    }
  }, [pendingOrder, clearCart]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const generateOrderSummary = async (
    order: PendingOrder
  ) => {
    setIsGenerating(true);
    setReceiptError("");

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let y = 20;

      const ensureSpace = (needed: number) => {
        if (y + needed > pageHeight - 18) {
          pdf.addPage();
          y = 20;
        }
      };

      // HEADER
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(8, 107, 87);
      pdf.text("CarePlus", margin, y);

      pdf.setFontSize(10);
      pdf.setTextColor(95, 112, 108);
      pdf.text("PHARMACY", margin, y + 6);

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(16, 42, 38);
      pdf.text(
        "Healthcare and everyday wellness",
        pageWidth - margin,
        y,
        { align: "right" }
      );

      y += 22;

      // DOCUMENT TITLE
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(16, 42, 38);
      pdf.text("Order Summary", margin, y);

      y += 7;

      pdf.setFontSize(9);
      pdf.setTextColor(180, 91, 25);
      pdf.text("NOT A PAYMENT RECEIPT", margin, y);

      y += 7;

      pdf.setDrawColor(221, 233, 229);
      pdf.line(margin, y, pageWidth - margin, y);

      y += 10;

      // ORDER INFORMATION
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(95, 112, 108);

      pdf.text("Order Reference", margin, y);
      pdf.text("Date Created", 110, y);

      y += 5;

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(16, 42, 38);
      pdf.text(order.orderReference, margin, y);
      pdf.text(formatDate(order.createdAt), 110, y);

      y += 14;

      // CUSTOMER DETAILS
      ensureSpace(40);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(16, 42, 38);
      pdf.text("Customer Details", margin, y);

      y += 7;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);

      const customerLines = [
        order.customer.fullName,
        order.customer.email,
        order.customer.phone,
        `${order.customer.address}, ${order.customer.city}, ${order.customer.state}`,
      ];

      for (const line of customerLines) {
        const wrapped = pdf.splitTextToSize(
          line,
          contentWidth
        );

        ensureSpace(wrapped.length * 5 + 2);

        pdf.setTextColor(95, 112, 108);
        pdf.text(wrapped, margin, y);

        y += wrapped.length * 5 + 1;
      }

      y += 8;

      // ITEMS HEADING
      ensureSpace(24);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(16, 42, 38);
      pdf.text("Order Items", margin, y);

      y += 8;

      pdf.setFillColor(241, 248, 245);
      pdf.roundedRect(
        margin,
        y - 5,
        contentWidth,
        9,
        2,
        2,
        "F"
      );

      pdf.setFontSize(8);
      pdf.setTextColor(95, 112, 108);
      pdf.text("PRODUCT", margin + 3, y);
      pdf.text("QTY", 125, y);
      pdf.text("UNIT PRICE", 145, y);
      pdf.text("TOTAL", pageWidth - margin - 3, y, {
        align: "right",
      });

      y += 9;

      // ITEMS
      order.items.forEach((item) => {
        const wrappedName = pdf.splitTextToSize(
          item.name,
          82
        );

        const prescriptionLine = item.requiresPrescription
          ? 5
          : 0;

        const itemHeight =
          wrappedName.length * 5 + prescriptionLine + 7;

        ensureSpace(itemHeight);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(16, 42, 38);
        pdf.text(wrappedName, margin + 3, y);

        if (item.requiresPrescription) {
          pdf.setFontSize(7);
          pdf.setTextColor(154, 106, 0);
          pdf.text(
            "Prescription required",
            margin + 3,
            y + wrappedName.length * 5
          );
        }

        pdf.setFontSize(8.5);
        pdf.setTextColor(16, 42, 38);
        pdf.text(String(item.quantity), 127, y);
        pdf.text(formatCurrency(item.price), 145, y);

        pdf.setFont("helvetica", "bold");
        pdf.text(
          formatCurrency(item.price * item.quantity),
          pageWidth - margin - 3,
          y,
          { align: "right" }
        );

        y += itemHeight;

        pdf.setDrawColor(238, 243, 241);
        pdf.line(
          margin,
          y - 3,
          pageWidth - margin,
          y - 3
        );
      });

      y += 6;

      // TOTALS
      ensureSpace(42);

      const labelX = 120;
      const valueX = pageWidth - margin - 3;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(95, 112, 108);
      pdf.text("Subtotal", labelX, y);

      pdf.setTextColor(16, 42, 38);
      pdf.text(
        formatCurrency(order.subtotal),
        valueX,
        y,
        { align: "right" }
      );

      y += 7;

      pdf.setTextColor(95, 112, 108);
      pdf.text("Delivery", labelX, y);

      pdf.setTextColor(16, 42, 38);
      pdf.text(
        order.delivery === 0
          ? "FREE"
          : formatCurrency(order.delivery),
        valueX,
        y,
        { align: "right" }
      );

      y += 8;

      pdf.setDrawColor(221, 233, 229);
      pdf.line(labelX, y, valueX, y);

      y += 7;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(8, 107, 87);
      pdf.text("Total", labelX, y);
      pdf.text(
        formatCurrency(order.total),
        valueX,
        y,
        { align: "right" }
      );

      y += 14;

      // ORDER STATUS
      ensureSpace(40);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(95, 112, 108);

      pdf.text(
        `Delivery method: ${
          order.deliveryMethod === "express"
            ? "Express Delivery"
            : "Standard Delivery"
        }`,
        margin,
        y
      );

      y += 7;

      pdf.text("Payment status: Pending", margin, y);

      y += 7;

      pdf.text(
        `Prescription status: ${
          order.prescriptionStatus === "approved"
            ? "Marked approved in frontend demo"
            : "Not required"
        }`,
        margin,
        y
      );

      y += 12;

      // DISCLAIMER
      ensureSpace(35);

      pdf.setFillColor(255, 249, 234);
      pdf.roundedRect(
        margin,
        y,
        contentWidth,
        27,
        3,
        3,
        "F"
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(111, 77, 0);
      pdf.text(
        "Important payment information",
        margin + 5,
        y + 7
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(135, 106, 43);

      const disclaimer = pdf.splitTextToSize(
        "This document records your order request. Payment has not been processed or confirmed. Prescription approval shown here is simulated in the current frontend prototype.",
        contentWidth - 10
      );

      pdf.text(disclaimer, margin + 5, y + 13);

      y += 35;

      // FOOTER
      ensureSpace(15);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(130, 145, 141);
      pdf.text(
        "Thank you for choosing CarePlus Pharmacy.",
        pageWidth / 2,
        y,
        { align: "center" }
      );

      // DOWNLOAD THE ORDER SUMMARY
      pdf.save(
        `CarePlus-Order-Summary-${order.orderReference}.pdf`
      );
    } catch (error) {
      console.error(
        "Order summary generation failed:",
        error
      );

      setReceiptError(
        "We couldn't generate your PDF. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const hasPrescriptionItems =
    pendingOrder?.items.some(
      (item) => item.requiresPrescription
    ) ?? false;

  return (
    <main className="min-h-[80vh] bg-[#FAFCFB] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {!pendingOrder ? (
          <section className="rounded-[2rem] border border-[#DDE9E5] bg-white px-5 py-10 text-center shadow-[0_18px_50px_rgba(6,61,53,0.06)] sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E5F5F0]">
              <Package
                size={38}
                strokeWidth={1.8}
                className="text-[#086B57]"
              />
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#102A26] sm:text-4xl">
              No order found
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5F706C] sm:text-base">
             We couldn&apos;t find a recent order in this session.
              Your order summary is stored temporarily in this
              frontend prototype and may no longer be available
              after a page refresh.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#086B57] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#063D35]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </section>
        ) : (
          <>
            {/* ORDER HEADER */}
            <section className="rounded-[2rem] border border-[#DDE9E5] bg-white px-5 py-10 text-center shadow-[0_18px_50px_rgba(6,61,53,0.06)] sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E5F5F0]">
                <CheckCircle2
                  size={42}
                  strokeWidth={1.8}
                  className="text-[#086B57]"
                />
              </div>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
                Order Request Created
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102A26] sm:text-5xl">
                Your order has been recorded.
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5F706C] sm:text-base">
                Your order details have been recorded in this
                frontend prototype. No payment has been processed.
              </p>

              <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl bg-[#F1F8F5] px-6 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5F706C]">
                  Order Reference
                </span>

                <span className="mt-1 text-lg font-extrabold text-[#086B57]">
                  {pendingOrder.orderReference}
                </span>

                <span className="mt-2 text-xs text-[#71817D]">
                  {formatDate(pendingOrder.createdAt)}
                </span>
              </div>

              {/* PAYMENT STATUS */}
              <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-[#DDE9E5] bg-[#FAFCFB] p-5 text-left">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                  <div>
                    <p className="text-sm font-extrabold text-[#102A26]">
                      Payment pending
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#5F706C]">
                      Paystack has not been connected yet. This
                      page is not confirmation of payment. You
                      can download the order summary for your
                      records.
                    </p>
                  </div>
                </div>
              </div>

              {/* PRESCRIPTION STATUS */}
              {hasPrescriptionItems && (
                <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-5 text-left">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6A00]" />

                    <div>
                      <p className="text-sm font-extrabold text-[#6F4D00]">
                        Prescription review
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#876A2B]">
                        This frontend prototype was allowed to
                        continue after a simulated approval.
                        A real pharmacist has not reviewed this
                        submission, and this state must not
                        authorise dispensing.
                      </p>

                      {pendingOrder.prescriptionReference && (
                        <p className="mt-3 break-all text-xs font-bold text-[#6F4D00]">
                          Review reference:{" "}
                          {pendingOrder.prescriptionReference}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* DOWNLOAD / SHOP */}
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    generateOrderSummary(pendingOrder)
                  }
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#086B57] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#063D35] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download size={18} />
                  {isGenerating
                    ? "Generating PDF..."
                    : "Download Order Summary"}
                </button>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE9E5] bg-white px-6 py-3.5 text-sm font-bold text-[#102A26] transition hover:bg-[#F1F8F5]"
                >
                  <ShoppingBag size={18} />
                  Continue Shopping
                </Link>
              </div>

              {receiptError && (
                <p
                  role="alert"
                  className="mt-4 text-sm font-semibold text-[#B43B3B]"
                >
                  {receiptError}
                </p>
              )}
            </section>

            {/* MEDICINE VERIFICATION NOW APPEARS HERE */}
            <MedicineAuthenticitySection />

            {/* ORDER DETAILS */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
              {/* ITEMS AND TOTALS */}
              <section className="rounded-[1.75rem] border border-[#DDE9E5] bg-white p-5 shadow-[0_12px_35px_rgba(6,61,53,0.04)] sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#102A26]">
                      Order Summary
                    </h2>

                    <p className="mt-1 text-sm text-[#5F706C]">
                      {pendingOrder.items.length} product
                      {pendingOrder.items.length === 1
                        ? ""
                        : "s"}
                    </p>
                  </div>

                  <Package
                    size={23}
                    className="text-[#086B57]"
                  />
                </div>

                <div className="mt-6 divide-y divide-[#DDE9E5]">
                  {pendingOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F1F8F5]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-[#102A26]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#5F706C]">
                          Quantity: {item.quantity}
                        </p>

                        {item.requiresPrescription && (
                          <span className="mt-2 inline-flex rounded-full bg-[#FFF7E5] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#9A6A00]">
                            Prescription Only
                          </span>
                        )}

                        <p className="mt-2 text-sm font-extrabold text-[#086B57]">
                          {formatCurrency(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#DDE9E5] pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5F706C]">
                      Subtotal
                    </span>

                    <span className="font-semibold text-[#102A26]">
                      {formatCurrency(pendingOrder.subtotal)}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-[#5F706C]">
                      Delivery
                    </span>

                    <span className="font-semibold text-[#102A26]">
                      {pendingOrder.delivery === 0
                        ? "FREE"
                        : formatCurrency(pendingOrder.delivery)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#DDE9E5] pt-4">
                    <span className="font-extrabold text-[#102A26]">
                      Total
                    </span>

                    <span className="text-xl font-extrabold text-[#086B57]">
                      {formatCurrency(pendingOrder.total)}
                    </span>
                  </div>
                </div>
              </section>

              {/* DELIVERY DETAILS */}
              <section className="rounded-[1.75rem] border border-[#DDE9E5] bg-white p-5 shadow-[0_12px_35px_rgba(6,61,53,0.04)] sm:p-7">
                <h2 className="text-xl font-extrabold text-[#102A26]">
                  Delivery Details
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                      Customer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#102A26]">
                      {pendingOrder.customer.fullName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-[#102A26]">
                      {pendingOrder.customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#102A26]">
                      {pendingOrder.customer.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#102A26]">
                      {pendingOrder.customer.address}
                      <br />
                      {pendingOrder.customer.city},{" "}
                      {pendingOrder.customer.state}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5F706C]">
                      Delivery Method
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#102A26]">
                      {pendingOrder.deliveryMethod === "express"
                        ? "Express Delivery"
                        : "Standard Delivery"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F1F8F5] p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#086B57]" />

                      <div>
                        <p className="text-sm font-extrabold text-[#102A26]">
                          CarePlus order record
                        </p>

                        <p className="mt-2 text-xs leading-5 text-[#5F706C]">
                          Keep your order reference for future
                          enquiries. Payment will only be
                          confirmed after a real payment
                          provider has been connected and the
                          transaction verified.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {/* SHARED FOOTER LINKS */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#086B57] transition hover:text-[#063D35]"
          >
            <Home size={17} />
            Back to CarePlus Home
          </Link>

          <Link
            href="/customer-care"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#086B57] transition hover:text-[#063D35]"
          >
            Customer Care
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}