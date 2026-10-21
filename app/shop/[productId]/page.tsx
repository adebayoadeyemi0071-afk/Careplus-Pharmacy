
"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { products } from "@/data/products";
import { useCartStore } from "@/components/cart/cart-store";
import { useWishlistStore } from "@/components/wishlist/wishlist-store";

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { productId } = use(params);

  const product = products.find(
    (item) => item.id === productId
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const wishlistItems = useWishlistStore(
    (state) => state.items
  );

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-[#FAFCFB] px-6 py-20">
        <div className="mx-auto max-w-[700px] text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F5F1] text-[#086B57]">
            <ShoppingCart size={32} />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#086B57]">
            Product not found
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#063D35] sm:text-4xl">
            We couldn&apos;t find that product.
          </h1>

          <p className="mx-auto mt-4 max-w-[500px] text-sm font-medium leading-7 text-[#6A7B77]">
            The product may have been removed or the link may
            no longer be available.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#086B57] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#063D35]"
          >
            <ArrowLeft size={17} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const isOutOfStock = product.stock <= 0;

  const handleDecrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleIncrease = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      requiresPrescription: product.requiresPrescription,
      prescriptionVerificationLevel:
        product.prescriptionVerificationLevel,
      nafdacRegistrationNumber:
        product.nafdacRegistrationNumber,
      manufacturer: product.manufacturer,
      manufacturerWebsite: product.manufacturerWebsite,
      barcode: product.barcode,
      nafdacRecordUrl: product.nafdacRecordUrl,
    });

    for (
      let index = 1;
      index < quantity;
      index += 1
    ) {
      increaseQuantity(product.id);
    }
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* BACK TO SHOP */}
      <section className="border-b border-[#DDE9E5] bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-5 sm:px-8 lg:px-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F706C] transition hover:text-[#086B57]"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* PRODUCT */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            {/* PRODUCT IMAGE */}
            <div className="overflow-hidden rounded-[28px] border border-[#DDE9E5] bg-white">
              <div className="relative aspect-square overflow-hidden bg-[#F1F8F5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />

                <div className="absolute left-5 top-5 z-10 flex flex-col items-start gap-2">
                  {product.popular && (
                    <span className="rounded-full bg-[#086B57] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                      Popular
                    </span>
                  )}

                  {product.newest && (
                    <span className="rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#086B57] shadow-sm">
                      New
                    </span>
                  )}

                  {product.requiresPrescription && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4E5] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#9A5B00] shadow-sm">
                      <ShieldAlert size={12} />
                      Prescription Only
                    </span>
                  )}

                  {isOutOfStock && (
                    <span className="rounded-full bg-[#D64545] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <div className="lg:pt-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#086B57]">
                {product.category}
              </p>

              <div className="mt-4 flex items-start justify-between gap-5">
                <h1 className="max-w-[650px] text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#063D35] sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={
                    isWishlisted
                      ? `Remove ${product.name} from wishlist`
                      : `Add ${product.name} to wishlist`
                  }
                  aria-pressed={isWishlisted}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition ${
                    isWishlisted
                      ? "border-[#086B57] bg-[#086B57] text-white"
                      : "border-[#DDE9E5] bg-white text-[#102A26] hover:border-[#086B57] hover:text-[#086B57]"
                  }`}
                >
                  <Heart
                    size={21}
                    strokeWidth={1.8}
                    fill={
                      isWishlisted
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              <p className="mt-6 text-2xl font-extrabold text-[#086B57] sm:text-3xl">
                ₦{product.price.toLocaleString()}
              </p>

              <p className="mt-5 max-w-[650px] text-sm font-medium leading-7 text-[#6A7B77] sm:text-base">
                {product.description}
              </p>

              {/* STOCK */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {isOutOfStock ? (
                  <span className="rounded-full bg-[#FFF0F0] px-4 py-2 text-xs font-bold text-[#D64545]">
                    Currently unavailable
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="rounded-full bg-[#FFF7E5] px-4 py-2 text-xs font-bold text-[#9A6A00]">
                    Only {product.stock} left
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F5F1] px-4 py-2 text-xs font-bold text-[#086B57]">
                    <Check size={14} />
                    In stock
                  </span>
                )}
              </div>

              {/* PRESCRIPTION */}
              {product.requiresPrescription && (
                <div className="mt-6 rounded-2xl border border-[#E9D7A7] bg-[#FFF9EA] p-5">
                  <div className="flex gap-3">
                    <ShieldAlert
                      size={21}
                      className="mt-0.5 shrink-0 text-[#9A6A00]"
                    />

                    <div>
                      <h2 className="text-sm font-extrabold uppercase tracking-[0.05em] text-[#6F4D00]">
                        Prescription Only
                      </h2>

                      <p className="mt-1 text-xs font-medium leading-6 text-[#876A2B]">
                        This medicine requires a valid prescription
                        before it can be dispensed. Your prescription
                        will be reviewed before this order can
                        proceed.
                      </p>

                      {product.nafdacRegistrationNumber && (
                        <p className="mt-3 text-[11px] font-bold text-[#6F4D00]">
                          NAFDAC Registration:{" "}
                          {product.nafdacRegistrationNumber}
                        </p>
                      )}

                      {product.manufacturer && (
                        <p className="mt-1 text-[11px] font-semibold text-[#876A2B]">
                          Manufacturer: {product.manufacturer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* QUANTITY + CART */}
              {!isOutOfStock && (
                <div className="mt-8 border-t border-[#DDE9E5] pt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5F706C]">
                    Quantity
                  </p>

                  <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-12 w-fit items-center overflow-hidden rounded-xl border border-[#DDE9E5] bg-white">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="flex h-12 w-12 items-center justify-center text-[#102A26] transition hover:bg-[#F1F8F5] disabled:cursor-not-allowed disabled:text-[#B7C2BF]"
                      >
                        <Minus size={17} />
                      </button>

                      <span className="flex h-12 min-w-14 items-center justify-center border-x border-[#DDE9E5] text-sm font-bold text-[#102A26]">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= product.stock}
                        aria-label="Increase quantity"
                        className="flex h-12 w-12 items-center justify-center text-[#102A26] transition hover:bg-[#F1F8F5] disabled:cursor-not-allowed disabled:text-[#B7C2BF]"
                      >
                        <Plus size={17} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-xl bg-[#086B57] px-7 text-sm font-bold text-white transition hover:bg-[#063D35]"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}

              {/* BENEFITS */}
              <div className="mt-8 grid gap-3 border-t border-[#DDE9E5] pt-7 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F1F8F5] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#086B57]">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#102A26]">
                        Trusted healthcare
                      </h3>

                      <p className="mt-1 text-[11px] font-medium leading-5 text-[#6A7B77]">
                        Quality healthcare products selected for
                        everyday wellbeing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F1F8F5] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#086B57]">
                      <Truck size={17} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#102A26]">
                        Convenient delivery
                      </h3>

                      <p className="mt-1 text-[11px] font-medium leading-5 text-[#6A7B77]">
                        Get your healthcare essentials delivered
                        conveniently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#DDE9E5] bg-white">
          <div className="mx-auto max-w-[1400px] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#086B57]">
              You may also like
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.025em] text-[#063D35] sm:text-3xl">
              More from {product.category}
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/shop/${relatedProduct.id}`}
                  className="group overflow-hidden rounded-2xl border border-[#DDE9E5] bg-[#FAFCFB] transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F1F8F5]">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7A8985]">
                      {relatedProduct.category}
                    </p>

                    <h3 className="mt-2 text-sm font-bold leading-6 text-[#102A26] transition group-hover:text-[#086B57]">
                      {relatedProduct.name}
                    </h3>

                    {relatedProduct.requiresPrescription && (
                      <span className="mt-2 inline-flex rounded-full bg-[#FFF7E5] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.05em] text-[#9A6A00]">
                        Prescription Only
                      </span>
                    )}

                    <p className="mt-3 text-base font-extrabold text-[#086B57]">
                      ₦{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="bg-[#FAFCFB] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[28px] bg-[#063D35] px-7 py-12 sm:px-10 lg:px-16 lg:py-14">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[45px] border-[#086B57]/30" />

            <div className="absolute -bottom-24 right-40 h-52 w-52 rounded-full border-[35px] border-[#2C8C76]/20" />

            <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9FE0CF]">
                  CarePlus Pharmacy
                </p>

                <h2 className="mt-3 max-w-[650px] text-3xl font-extrabold leading-[1.08] tracking-[-0.025em] text-white sm:text-4xl">
                  Your health essentials, all in one place.
                </h2>

                <p className="mt-4 max-w-[620px] text-sm font-medium leading-7 text-[#C6DED8] sm:text-base">
                  Browse our collection of trusted healthcare
                  products and find what you need.
                </p>
              </div>

              <Link
                href="/shop"
                className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#063D35] transition hover:bg-[#E5F5F0]"
              >
                Continue Shopping
                <ArrowLeft
                  size={17}
                  className="rotate-180"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
