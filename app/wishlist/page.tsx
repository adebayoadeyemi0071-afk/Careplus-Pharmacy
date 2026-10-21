
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useWishlistStore } from "@/components/wishlist/wishlist-store";
import { products } from "@/data/products";

export default function WishlistPage() {
  const {
    items,
    removeItem,
    clearWishlist,
  } = useWishlistStore();

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    document.title = "Wishlist | CarePlus Pharmacy";
  }, []);

  /*
   * Use the catalogue record to preserve prescription
   * information when moving wishlist products into the cart.
   */
  const addWishlistProductToCart = (
    product: (typeof items)[number]
  ) => {
    const catalogueProduct = products.find(
      (item) => item.id === product.id
    );

    const requiresPrescription = Boolean(
      catalogueProduct?.requiresPrescription
    );

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      requiresPrescription,
      prescriptionVerificationLevel:
        catalogueProduct?.prescriptionVerificationLevel ??
        (requiresPrescription ? "prescription" : "none"),
      nafdacRegistrationNumber:
        catalogueProduct?.nafdacRegistrationNumber,
      manufacturer: catalogueProduct?.manufacturer,
      manufacturerWebsite:
        catalogueProduct?.manufacturerWebsite,
      barcode: catalogueProduct?.barcode,
      nafdacRecordUrl: catalogueProduct?.nafdacRecordUrl,
    });
  };

  const handleAddToCart = (
    product: (typeof items)[number]
  ) => {
    addWishlistProductToCart(product);
  };

  const handleMoveAllToCart = () => {
    items.forEach((product) => {
      addWishlistProductToCart(product);
    });
  };

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* HEADER */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#5F706C]">
            <Link
              href="/"
              className="transition hover:text-[#086B57]"
            >
              Home
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="text-[#102A26]">Wishlist</span>
          </div>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E5F5F0] text-[#086B57]">
                  <Heart className="h-5 w-5 fill-current" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#102A26] sm:text-4xl">
                  Your wishlist
                </h1>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5F706C] sm:text-base">
                Save products you are interested in and come back
                to them whenever you&apos;re ready.
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleMoveAllToCart}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.16)] transition hover:bg-[#063D35]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add all to cart
                </button>

                <button
                  type="button"
                  onClick={clearWishlist}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDE9E5] bg-white px-4 py-2.5 text-sm font-extrabold text-[#5F706C] transition hover:border-[#F0C9C9] hover:bg-[#FFF8F8] hover:text-[#D64545]"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WISHLIST CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-[#102A26]">
                  {items.length}{" "}
                  {items.length === 1 ? "saved item" : "saved items"}
                </p>

                <p className="mt-1 text-sm text-[#7A8B87]">
                  Products you&apos;ve saved for later.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#086B57] transition hover:text-[#063D35]"
              >
                Continue shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[24px] border border-[#DDE9E5] bg-white shadow-[0_8px_30px_rgba(16,42,38,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,42,38,0.08)]"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-[#F1F8F5]">
                    <Link
                      href={`/shop/${product.id}`}
                      className="absolute inset-0 z-0"
                      aria-label={`View ${product.name}`}
                    />

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* WISHLIST BUTTON */}
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE9E5] bg-white/95 text-[#D64545] shadow-sm backdrop-blur transition hover:bg-white"
                    >
                      <Heart className="h-[18px] w-[18px] fill-current" />
                    </button>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="p-5">
                    {product.category && (
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#7A8B87]">
                        {product.category}
                      </p>
                    )}

                    <Link
                      href={`/shop/${product.id}`}
                      className="mt-2 block"
                    >
                      <h2 className="line-clamp-2 text-base font-extrabold leading-6 text-[#102A26] transition hover:text-[#086B57]">
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mt-3 text-lg font-extrabold text-[#086B57]">
                      ₦{product.price.toLocaleString()}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#086B57] px-3 py-3 text-sm font-extrabold text-white transition hover:bg-[#063D35]"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to cart
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DDE9E5] text-[#7A8B87] transition hover:border-[#F0C9C9] hover:bg-[#FFF8F8] hover:text-[#D64545]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function EmptyWishlist() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#E5F5F0] text-[#086B57]">
          <Heart className="h-9 w-9" />
        </div>

        <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-[#102A26] sm:text-3xl">
          Your wishlist is empty
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#5F706C] sm:text-base">
          When you find something you like, tap the heart icon
          to save it here and easily find it again later.
        </p>

        <Link
          href="/shop"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#086B57] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(8,107,87,0.18)] transition hover:bg-[#063D35]"
        >
          Explore products
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/account"
          className="mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-extrabold text-[#086B57] transition hover:text-[#063D35]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to account
        </Link>
      </div>
    </div>
  );
}
