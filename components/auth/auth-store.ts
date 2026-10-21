"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  provider: "email" | "google" | "apple";
}

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;

  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      signIn: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      signOut: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "careplus-auth",
    }
  )
);