"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  ShieldAlert,
} from "lucide-react";

import { useCartStore } from "@/components/cart/cart-store";
import { useWishlistStore } from "@/components/wishlist/wishlist-store";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );

  const wishlistItems = useWishlistStore(
    (state) => state.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const isOutOfStock = product.stock <= 0;

  const handleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
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
      requiresPrescription:
        product.requiresPrescription,
      prescriptionVerificationLevel:
        product.prescriptionVerificationLevel,
      nafdacRegistrationNumber:
        product.nafdacRegistrationNumber,
      manufacturer: product.manufacturer,
      manufacturerWebsite:
        product.manufacturerWebsite,
      barcode: product.barcode,
      nafdacRecordUrl:
        product.nafdacRecordUrl,
    });
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#F1F8F5]">
        <Link
          href={`/shop/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* BADGES */}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
          {product.popular && (
            <span className="rounded-full bg-[#086B57] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
              Popular
            </span>
          )}

          {product.newest && (
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#086B57] shadow-sm">
              New
            </span>
          )}

          {product.requiresPrescription && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF4E5] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#9A5B00] shadow-sm">
              <ShieldAlert size={11} />
              Prescription Only
            </span>
          )}

          {isOutOfStock && (
            <span className="rounded-full bg-[#D64545] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
              Out of stock
            </span>
          )}
        </div>

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className={`absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
            isWishlisted
              ? "bg-[#086B57] text-white"
              : "bg-white text-[#102A26] hover:bg-[#086B57] hover:text-white"
          }`}
        >
          <Heart
            size={19}
            strokeWidth={1.8}
            fill={
              isWishlisted ? "currentColor" : "none"
            }
          />
        </button>
      </div>

      {/* DETAILS */}
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#7A8985]">
          {product.category}
        </p>

        <Link href={`/shop/${product.id}`}>
          <h2 className="mt-2 min-h-[44px] text-base font-bold leading-6 text-[#102A26] transition hover:text-[#086B57]">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-[#6A7B77]">
          {product.description}
        </p>

        {/* PRESCRIPTION */}
        {product.requiresPrescription && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFF7E5] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#9A6A00]">
            <ShieldAlert size={11} />
            Prescription Only
          </div>
        )}

        {/* PRICE + CART */}
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-extrabold text-[#086B57]">
              ₦{product.price.toLocaleString()}
            </p>

            {isOutOfStock ? (
              <p className="mt-1 text-[11px] font-semibold text-[#D64545]">
                Currently unavailable
              </p>
            ) : product.stock <= 5 ? (
              <p className="mt-1 text-[11px] font-semibold text-[#D99A16]">
                Only {product.stock} left
              </p>
            ) : (
              <p className="mt-1 text-[11px] font-medium text-[#6A7B77]">
                In stock
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={
              isOutOfStock
                ? `${product.name} is out of stock`
                : `Add ${product.name} to cart`
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F1] text-[#086B57] transition hover:bg-[#086B57] hover:text-white disabled:cursor-not-allowed disabled:bg-[#EEF2F0] disabled:text-[#A1AEAA]"
          >
            <ShoppingCart
              size={17}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </article>
  );
}