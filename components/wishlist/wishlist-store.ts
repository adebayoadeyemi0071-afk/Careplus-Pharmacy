"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistStore {
  items: WishlistProduct[];

  addItem: (product: WishlistProduct) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: WishlistProduct) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        })),

      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            return {
              items: state.items.filter(
                (item) => item.id !== product.id
              ),
            };
          }

          return {
            items: [...state.items, product],
          };
        }),

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "careplus-wishlist",
    }
  )
);