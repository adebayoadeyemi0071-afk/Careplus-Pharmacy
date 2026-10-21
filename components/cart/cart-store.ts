"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;

  requiresPrescription: boolean;

  prescriptionVerificationLevel:
    | "none"
    | "prescription";

  nafdacRegistrationNumber?: string;
  manufacturer?: string;
  manufacturerWebsite?: string;
  barcode?: string;
  nafdacRecordUrl?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

interface PersistedCartState {
  items?: Array<
    Partial<CartItem> & {
      id: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
    }
  >;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1,
                    }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
            isOpen: true,
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId
                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }
                : item
            )
            .filter(
              (item) => item.quantity > 0
            ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      openCart: () =>
        set({
          isOpen: true,
        }),

      closeCart: () =>
        set({
          isOpen: false,
        }),

      toggleCart: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),
    }),
    {
      name: "careplus-cart",
      version: 2,

      /*
       * Only persist actual cart items.
       * The drawer open/closed state should never
       * survive a page refresh.
       */
      partialize: (state) => ({
        items: state.items,
      }),

      /*
       * Existing CarePlus carts were created before
       * prescription metadata existed.
       *
       * Older items are safely migrated with the
       * new fields defaulted.
       */
      migrate: (persistedState: unknown): { items: CartItem[] } => {
        const state = (persistedState ?? {}) as PersistedCartState;

        const items: CartItem[] = (state.items ?? []).map(
          (item): CartItem => {
            const prescriptionVerificationLevel: CartProduct["prescriptionVerificationLevel"] =
              item.prescriptionVerificationLevel === "prescription"
                ? "prescription"
                : "none";

            return {
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity ?? 1,
              requiresPrescription: Boolean(item.requiresPrescription),
              prescriptionVerificationLevel,
              nafdacRegistrationNumber: item.nafdacRegistrationNumber,
              manufacturer: item.manufacturer,
              manufacturerWebsite: item.manufacturerWebsite,
              barcode: item.barcode,
              nafdacRecordUrl: item.nafdacRecordUrl,
            };
          }
        );

        return { items };
      },
    }
  )
);