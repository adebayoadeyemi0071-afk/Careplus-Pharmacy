"use client";

import { create } from "zustand";

export interface CheckoutCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
}

export interface CheckoutOrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  requiresPrescription: boolean;
  prescriptionVerificationLevel?: "none" | "prescription";
  nafdacRegistrationNumber?: string;
  manufacturer?: string;
  manufacturerWebsite?: string;
  barcode?: string;
  nafdacRecordUrl?: string;
}

export type PrescriptionReviewStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "more_information_required";

export interface CheckoutDraft {
  id: string;
  createdAt: string;
  customer: CheckoutCustomer;
  items: CheckoutOrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  deliveryMethod: "standard" | "express";
}

export interface PrescriptionSubmission {
  reference: string;
  draftId: string;
  fileName: string;
  submittedAt: string;
  status: PrescriptionReviewStatus;
  reviewerNote?: string;
}

export interface PendingOrder {
  orderReference: string;
  createdAt: string;
  customer: CheckoutCustomer;
  items: CheckoutOrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  deliveryMethod: "standard" | "express";
  paymentStatus: "pending";
  prescriptionStatus: "not_required" | "approved";
  prescriptionReference?: string;
}

interface CheckoutStore {
  pendingOrder: PendingOrder | null;
  checkoutDraft: CheckoutDraft | null;
  prescriptionSubmission: PrescriptionSubmission | null;

  setPendingOrder: (order: PendingOrder) => void;
  clearPendingOrder: () => void;

  setCheckoutDraft: (draft: CheckoutDraft) => void;
  clearCheckoutDraft: () => void;

  submitPrescription: (fileName: string) => void;

  updatePrescriptionStatus: (
    status: PrescriptionReviewStatus,
    reviewerNote?: string
  ) => void;

  clearPrescriptionSubmission: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  pendingOrder: null,
  checkoutDraft: null,
  prescriptionSubmission: null,

  setPendingOrder: (order) => {
    set({ pendingOrder: order });
  },

  clearPendingOrder: () => {
    set({ pendingOrder: null });
  },

  setCheckoutDraft: (draft) => {
    set({ checkoutDraft: draft });
  },

  clearCheckoutDraft: () => {
    set({ checkoutDraft: null });
  },

  submitPrescription: (fileName) => {
    set((state) => {
      if (!state.checkoutDraft) {
        return state;
      }

      const now = Date.now();

      return {
        prescriptionSubmission: {
          reference: `CP-RX-${now.toString().slice(-8)}`,
          draftId: state.checkoutDraft.id,
          fileName,
          submittedAt: new Date(now).toISOString(),
          status: "pending_review",
        },
      };
    });
  },

  updatePrescriptionStatus: (status, reviewerNote) => {
    set((state) => {
      if (!state.prescriptionSubmission) {
        return state;
      }

      return {
        prescriptionSubmission: {
          ...state.prescriptionSubmission,
          status,
          reviewerNote,
        },
      };
    });
  },

  clearPrescriptionSubmission: () => {
    set({ prescriptionSubmission: null });
  },
}));