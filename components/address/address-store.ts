"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface AddressStore {
  addresses: Address[];

  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  clearAddresses: () => void;
}

const initialAddress: Address = {
  id: "address-1",
  label: "Home",
  fullName: "CarePlus Customer",
  phone: "+234 800 000 0000",
  address: "12 Example Street",
  city: "Lagos",
  state: "Lagos State",
  isDefault: true,
};

const createAddressId = () => {
  return `address-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: [initialAddress],

      addAddress: (address) =>
        set((state) => {
          const shouldBeDefault =
            state.addresses.length === 0 || address.isDefault;

          return {
            addresses: [
              ...state.addresses.map((item) =>
                shouldBeDefault
                  ? {
                      ...item,
                      isDefault: false,
                    }
                  : item
              ),
              {
                ...address,
                id: createAddressId(),
                isDefault: shouldBeDefault,
              },
            ],
          };
        }),

      updateAddress: (id, address) =>
        set((state) => {
          const updatedIsDefault = address.isDefault;

          return {
            addresses: state.addresses.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...address,
                  id: item.id,
                  isDefault: updatedIsDefault,
                };
              }

              if (updatedIsDefault) {
                return {
                  ...item,
                  isDefault: false,
                };
              }

              return item;
            }),
          };
        }),

      removeAddress: (id) =>
        set((state) => {
          const addressToRemove = state.addresses.find(
            (item) => item.id === id
          );

          const remainingAddresses = state.addresses.filter(
            (item) => item.id !== id
          );

          if (
            addressToRemove?.isDefault &&
            remainingAddresses.length > 0
          ) {
            return {
              addresses: remainingAddresses.map((item, index) => ({
                ...item,
                isDefault: index === 0,
              })),
            };
          }

          return {
            addresses: remainingAddresses,
          };
        }),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((item) => ({
            ...item,
            isDefault: item.id === id,
          })),
        })),

      clearAddresses: () =>
        set({
          addresses: [],
        }),
    }),
    {
      name: "careplus-addresses",
    }
  )
);