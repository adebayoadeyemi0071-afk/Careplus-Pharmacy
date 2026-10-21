"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Edit3,
  MapPin,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { useAuthStore } from "@/components/auth/auth-store";
import {
  Address,
  useAddressStore,
} from "@/components/address/address-store";

interface AddressFormData {
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

const emptyForm: AddressFormData = {
  label: "",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
};

export default function AddressesPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const addresses = useAddressStore((state) => state.addresses);
  const addAddress = useAddressStore((state) => state.addAddress);
  const updateAddress = useAddressStore(
    (state) => state.updateAddress
  );
  const removeAddress = useAddressStore(
    (state) => state.removeAddress
  );
  const setDefaultAddress = useAddressStore(
    (state) => state.setDefaultAddress
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] =
    useState<Address | null>(null);

  const [formData, setFormData] =
    useState<AddressFormData>(emptyForm);

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-[#DDE9E5] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F5F0]">
            <MapPin className="h-6 w-6 text-[#086B57]" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A26]">
            Sign in to manage your addresses
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5F706C]">
            Save your delivery addresses so checkout is faster and
            easier next time.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/auth/sign-in?redirect=%2Faccount%2Faddresses")
            }
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#086B57] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
          >
            Sign in
          </button>
        </div>
      </main>
    );
  }

  const openAddModal = () => {
    setEditingAddress(null);

    setFormData({
      ...emptyForm,
      fullName: user.name || "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);

    setFormData({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setFormData(emptyForm);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.label.trim() ||
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim()
    ) {
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, {
        ...formData,
        isDefault: editingAddress.isDefault,
      });
    } else {
      addAddress({
        ...formData,
        isDefault: addresses.length === 0,
      });
    }

    closeModal();
  };

  const handleDelete = (address: Address) => {
    const confirmed = window.confirm(
      `Delete your "${address.label}" address?`
    );

    if (!confirmed) {
      return;
    }

    removeAddress(address.id);
  };

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* Back */}
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#5F706C] transition hover:text-[#086B57]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to account
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#086B57]">
              Delivery
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102A26] sm:text-4xl">
              Your addresses
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#5F706C]">
              Save your delivery addresses and choose where your
              CarePlus orders should be sent.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35] sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add address
          </button>
        </div>

        {/* Temporary frontend notice */}
        <div className="mt-7 rounded-2xl border border-[#DDE9E5] bg-[#E5F5F0] p-4">
          <p className="text-sm leading-6 text-[#315A50]">
            <span className="font-extrabold">
              Saved on this device:
            </span>{" "}
            your addresses currently persist in your browser. Once
            the CarePlus backend is connected, these will be securely
            associated with your account.
          </p>
        </div>

        {/* Addresses */}
        {addresses.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="relative rounded-[24px] border border-[#DDE9E5] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                {address.isDefault && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-extrabold text-[#086B57]">
                    <Check className="h-3.5 w-3.5" />
                    Default
                  </div>
                )}

                <div className="flex items-start gap-4 pr-20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F5F0]">
                    <MapPin className="h-5 w-5 text-[#086B57]" />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold text-[#102A26]">
                      {address.label}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-[#5F706C]">
                      {address.fullName}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-1 text-sm leading-6 text-[#5F706C]">
                  <p>{address.phone}</p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#DDE9E5] pt-5">
                  <button
                    type="button"
                    onClick={() => openEditModal(address)}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#DDE9E5] px-4 py-2.5 text-sm font-extrabold text-[#102A26] transition hover:border-[#086B57] hover:text-[#086B57]"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() =>
                        setDefaultAddress(address.id)
                      }
                      className="rounded-xl px-4 py-2.5 text-sm font-extrabold text-[#086B57] transition hover:bg-[#E5F5F0]"
                    >
                      Make default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(address)}
                    className="ml-auto inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold text-[#D64545] transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-dashed border-[#C9DAD5] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F5F0]">
              <MapPin className="h-6 w-6 text-[#086B57]" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#102A26]">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5F706C]">
              Add a delivery address so you can select it quickly
              during checkout.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
            >
              <Plus className="h-4 w-4" />
              Add your first address
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#063D35]/45 p-0 sm:items-center sm:p-5">
          <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-[28px] sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#086B57]">
                  {editingAddress
                    ? "Edit address"
                    : "New address"}
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#102A26]">
                  {editingAddress
                    ? "Update delivery address"
                    : "Add delivery address"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#5F706C]">
                  Enter the details you want to use for CarePlus
                  deliveries.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DDE9E5] text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#102A26]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-extrabold text-[#102A26]">
                    Address label
                  </span>

                  <input
                    type="text"
                    value={formData.label}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        label: event.target.value,
                      }))
                    }
                    placeholder="Home"
                    className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-extrabold text-[#102A26]">
                    Full name
                  </span>

                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                    placeholder="Your full name"
                    className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-extrabold text-[#102A26]">
                  Phone number
                </span>

                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="+234 800 000 0000"
                  className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-extrabold text-[#102A26]">
                  Street address
                </span>

                <input
                  type="text"
                  value={formData.address}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  placeholder="12 Example Street"
                  className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                  required
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-extrabold text-[#102A26]">
                    City
                  </span>

                  <input
                    type="text"
                    value={formData.city}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        city: event.target.value,
                      }))
                    }
                    placeholder="Lagos"
                    className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-extrabold text-[#102A26]">
                    State
                  </span>

                  <input
                    type="text"
                    value={formData.state}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        state: event.target.value,
                      }))
                    }
                    placeholder="Lagos State"
                    className="mt-2 h-12 w-full rounded-xl border border-[#DDE9E5] bg-[#FAFCFB] px-4 text-sm text-[#102A26] outline-none transition placeholder:text-[#93A39F] focus:border-[#086B57] focus:ring-4 focus:ring-[#086B57]/10"
                    required
                  />
                </label>
              </div>

              {!editingAddress && addresses.length > 0 && (
                <div className="rounded-xl border border-[#DDE9E5] bg-[#F1F8F5] p-4">
                  <p className="text-sm leading-6 text-[#315A50]">
                    This address will be saved as an additional
                    address. You can make it your default address
                    after saving.
                  </p>
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-[#DDE9E5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-[#DDE9E5] px-5 py-3 text-sm font-extrabold text-[#102A26] transition hover:bg-[#F1F8F5]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#086B57] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
                >
                  {editingAddress
                    ? "Save changes"
                    : "Save address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}