"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useCartStore } from "../cart/cart-store";
import { useWishlistStore } from "../wishlist/wishlist-store";
import { useAuthStore } from "@/components/auth/auth-store";
import {
  products,
  type Product,
} from "@/data/products";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchFocused, setSearchFocused] =
    useState(false);

  /*
   * Keep track of the previous route.
   *
   * When the route changes, synchronise the local UI state
   * during rendering instead of calling setState directly
   * inside a useEffect. This avoids the
   * react-hooks/set-state-in-effect lint error.
   *
   * The condition prevents an infinite render loop.
   */
  const [previousPathname, setPreviousPathname] =
    useState(pathname);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setMobileMenuOpen(false);
    setSearchFocused(false);
  }

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const items = useCartStore(
    (state) => state.items
  );

  const toggleCart = useCartStore(
    (state) => state.toggleCart
  );

  const wishlistItems = useWishlistStore(
    (state) => state.items
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  /*
   * ---------------------------------------------------------
   * ACTIVE NAVIGATION
   * ---------------------------------------------------------
   */

  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const isAccountActive =
    pathname.startsWith("/account") ||
    pathname.startsWith("/auth");

  const isWishlistActive =
    pathname.startsWith("/wishlist");

  /*
   * ---------------------------------------------------------
   * SEARCH RESULTS
   * ---------------------------------------------------------
   *
   * Rank products according to how closely their name,
   * category and description match the customer's query.
   */

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    const scoredProducts = products
      .map((product) => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();
        const description =
          product.description.toLowerCase();

        let score = 0;

        // Exact product-name match.
        if (name === query) {
          score += 1000;
        }

        // Product name starts with the query.
        if (name.startsWith(query)) {
          score += 700;
        }

        // A word in the product name starts with the query.
        const nameWords = name.split(/\s+/);

        if (
          nameWords.some((word) =>
            word.startsWith(query)
          )
        ) {
          score += 500;
        }

        // The query appears somewhere in the product name.
        const namePosition = name.indexOf(query);

        if (namePosition !== -1) {
          score += 400;
          score += Math.max(
            0,
            100 - namePosition
          );
        }

        // Category match.
        if (category.includes(query)) {
          score += 150;
        }

        // Description match.
        if (description.includes(query)) {
          score += 50;
        }

        // Small boost for popular products.
        if (product.popular) {
          score += 15;
        }

        return {
          product,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.product.name.localeCompare(
          b.product.name
        );
      });

    return scoredProducts
      .slice(0, 6)
      .map((item) => item.product);
  }, [searchQuery]);

  /*
   * ---------------------------------------------------------
   * HELPERS
   * ---------------------------------------------------------
   */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const closeSearchAndMenu = () => {
    setSearchFocused(false);
    setMobileMenuOpen(false);
  };

  const handleMobileCart = () => {
    toggleCart();
    closeSearchAndMenu();
  };

  /*
   * ---------------------------------------------------------
   * SEARCH ACTIONS
   * ---------------------------------------------------------
   */

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();

    closeSearchAndMenu();

    if (!trimmedQuery) {
      router.push("/shop");
      return;
    }

    router.push(
      `/shop?search=${encodeURIComponent(
        trimmedQuery
      )}`
    );
  };

  const handleProductClick = (
    product: Product
  ) => {
    closeSearchAndMenu();

    router.push(`/shop/${product.id}`);
  };

  const handleViewAllResults = () => {
    const trimmedQuery = searchQuery.trim();

    closeSearchAndMenu();

    if (!trimmedQuery) {
      router.push("/shop");
      return;
    }

    router.push(
      `/shop?search=${encodeURIComponent(
        trimmedQuery
      )}`
    );
  };

  /*
   * ---------------------------------------------------------
   * CLOSE SEARCH WHEN CLICKING OUTSIDE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target = event.target as Node;

      const insideDesktopSearch =
        searchRef.current?.contains(target);

      const insideMobileSearch =
        mobileSearchRef.current?.contains(target);

      if (
        !insideDesktopSearch &&
        !insideMobileSearch
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * CLOSE SEARCH WITH THE ESCAPE KEY
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSearchFocused(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const showSearchResults =
    searchFocused &&
    searchQuery.trim().length > 0;

  /*
   * ---------------------------------------------------------
   * NAVIGATION CLASSES
   * ---------------------------------------------------------
   */

  const desktopNavClass = (active: boolean) =>
    `relative flex h-[76px] items-center border-b-2 text-[13px] transition ${
      active
        ? "border-[#086B57] font-semibold text-[#086B57]"
        : "border-transparent font-medium text-[#102A26] hover:text-[#086B57]"
    }`;

  const mobileNavClass = (active: boolean) =>
    `border-b py-4 text-sm transition ${
      active
        ? "border-[#086B57] font-semibold text-[#086B57]"
        : "border-[#DDE9E5] font-medium text-[#102A26]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#DDE9E5] bg-white">
      <nav className="mx-auto flex h-[76px] max-w-[1400px] items-center gap-6 px-5 sm:px-8 lg:px-10">
        {/* LOGO */}

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMobileMenu}
        >
          <div className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute h-8 w-3 rounded-sm bg-[#086B57]" />
            <span className="absolute h-3 w-8 rounded-sm bg-[#086B57]" />
          </div>

          <div className="leading-none">
            <span className="block text-[19px] font-extrabold tracking-tight text-[#102A26]">
              CarePlus
            </span>

            <span className="mt-0.5 block text-[10px] font-medium tracking-wide text-[#086B57]">
              Pharmacy
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="ml-5 hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={desktopNavClass(
                isNavActive(item.href)
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* DESKTOP SEARCH */}

        <div
          ref={searchRef}
          className="relative ml-auto hidden min-w-0 flex-1 justify-end md:flex lg:max-w-[330px]"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="w-full"
          >
            <div className="flex h-10 w-full items-center rounded-full border border-[#DDE9E5] bg-[#F8FBFA] px-4 transition focus-within:border-[#086B57]">
              <button
                type="submit"
                aria-label="Search products"
                className="mr-2 shrink-0 text-[#5F706C] transition hover:text-[#086B57]"
              >
                <Search
                  size={16}
                  strokeWidth={1.8}
                />
              </button>

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                onFocus={() =>
                  setSearchFocused(true)
                }
                placeholder="Search for medicines, health products..."
                className="w-full bg-transparent text-xs text-[#102A26] outline-none placeholder:text-[#8A9A96]"
                aria-label="Search products"
                autoComplete="off"
              />
            </div>
          </form>

          {showSearchResults && (
            <SearchDropdown
              results={searchResults}
              query={searchQuery}
              onProductClick={handleProductClick}
              onViewAll={handleViewAllResults}
            />
          )}
        </div>

        {/* DESKTOP ACTIONS */}

        <div className="hidden items-center gap-4 md:flex">
          {/* ACCOUNT */}

          <Link
            href={
              isAuthenticated
                ? "/account"
                : "/auth/sign-in"
            }
            aria-label="Account"
            className={`transition ${
              isAccountActive
                ? "text-[#086B57]"
                : "text-[#102A26] hover:text-[#086B57]"
            }`}
          >
            <User
              size={19}
              strokeWidth={1.8}
            />
          </Link>

          {/* WISHLIST */}

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={`relative transition ${
              isWishlistActive
                ? "text-[#086B57]"
                : "text-[#102A26] hover:text-[#086B57]"
            }`}
          >
            <Heart
              size={19}
              strokeWidth={1.8}
            />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#086B57] px-1 text-[9px] font-bold text-white">
                {wishlistCount > 99
                  ? "99+"
                  : wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}

          <button
            type="button"
            onClick={toggleCart}
            aria-label="Shopping cart"
            className="relative text-[#102A26] transition hover:text-[#086B57]"
          >
            <ShoppingCart
              size={20}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#086B57] px-1 text-[9px] font-bold text-white">
                {cartCount > 99
                  ? "99+"
                  : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((open) => !open)
          }
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-[#102A26] transition hover:bg-[#F1F8F5] md:hidden"
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}

      {mobileMenuOpen && (
        <div className="border-t border-[#DDE9E5] bg-white px-5 py-5 md:hidden">
          <div className="mx-auto max-w-[1400px]">
            {/* MOBILE SEARCH */}

            <div
              ref={mobileSearchRef}
              className="relative"
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="flex h-11 items-center rounded-xl border border-[#DDE9E5] bg-[#F8FBFA] px-4 focus-within:border-[#086B57]">
                  <button
                    type="submit"
                    aria-label="Search products"
                    className="mr-2 shrink-0 text-[#5F706C] transition hover:text-[#086B57]"
                  >
                    <Search
                      size={17}
                      strokeWidth={1.8}
                    />
                  </button>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    onFocus={() =>
                      setSearchFocused(true)
                    }
                    placeholder="Search for medicines, health products..."
                    className="w-full bg-transparent text-sm text-[#102A26] outline-none placeholder:text-[#8A9A96]"
                    aria-label="Search products"
                    autoComplete="off"
                  />
                </div>
              </form>

              {/* MOBILE SEARCH RESULTS */}

              {showSearchResults && (
                <SearchDropdown
                  results={searchResults}
                  query={searchQuery}
                  mobile
                  onProductClick={handleProductClick}
                  onViewAll={handleViewAllResults}
                />
              )}
            </div>

            {/* MOBILE NAVIGATION */}

            <div className="mt-5 flex flex-col">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={mobileNavClass(
                    isNavActive(item.href)
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* MOBILE ACTIONS */}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-5">
              {/* ACCOUNT */}

              <Link
                href={
                  isAuthenticated
                    ? "/account"
                    : "/auth/sign-in"
                }
                onClick={closeMobileMenu}
                className={`flex items-center gap-2 text-sm font-medium ${
                  isAccountActive
                    ? "text-[#086B57]"
                    : "text-[#102A26]"
                }`}
              >
                <User size={19} />
                Account
              </Link>

              {/* WISHLIST */}

              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                aria-label="Wishlist"
                className={`relative flex items-center gap-2 text-sm font-medium ${
                  isWishlistActive
                    ? "text-[#086B57]"
                    : "text-[#102A26]"
                }`}
              >
                <Heart size={19} />
                Wishlist

                {wishlistCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#086B57] px-1 text-[9px] font-bold text-white">
                    {wishlistCount > 99
                      ? "99+"
                      : wishlistCount}
                  </span>
                )}
              </Link>

              {/* CART */}

              <button
                type="button"
                onClick={handleMobileCart}
                aria-label="Shopping cart"
                className="relative flex items-center gap-2 text-sm font-medium text-[#102A26]"
              >
                <ShoppingCart size={19} />
                Cart

                {cartCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#086B57] px-1 text-[9px] font-bold text-white">
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ========================================================================== */
/* SEARCH DROPDOWN                                                            */
/* ========================================================================== */

interface SearchDropdownProps {
  results: Product[];
  query: string;
  mobile?: boolean;
  onProductClick: (product: Product) => void;
  onViewAll: () => void;
}

function SearchDropdown({
  results,
  query,
  mobile = false,
  onProductClick,
  onViewAll,
}: SearchDropdownProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-[calc(100%+10px)] z-[60] overflow-hidden rounded-2xl border border-[#DDE9E5] bg-white shadow-[0_16px_45px_rgba(16,42,38,0.12)] ${
        mobile
          ? "top-[calc(100%+8px)]"
          : ""
      }`}
    >
      {/* RESULTS HEADER */}

      <div className="border-b border-[#DDE9E5] px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A9A96]">
          Search results for “{query}”
        </p>
      </div>

      {/* RESULTS */}

      {results.length > 0 ? (
        <>
          <div className="max-h-[420px] overflow-y-auto p-2">
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onProductClick(product)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F1F8F5]"
              >
                {/* PRODUCT IMAGE */}

                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F1F8F5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>

                {/* PRODUCT INFORMATION */}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#102A26]">
                    {product.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#5F706C]">
                    {product.category}
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#086B57]">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="shrink-0 text-[#8A9A96]"
                />
              </button>
            ))}
          </div>

          {/* VIEW ALL RESULTS */}

          <button
            type="button"
            onClick={onViewAll}
            className="flex w-full items-center justify-center gap-2 border-t border-[#DDE9E5] px-4 py-3.5 text-sm font-bold text-[#086B57] transition hover:bg-[#F1F8F5]"
          >
            View all results
            <ArrowRight size={15} />
          </button>
        </>
      ) : (
        /* NO RESULTS */

        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F8F5]">
            <Search
              size={19}
              className="text-[#086B57]"
            />
          </div>

          <p className="mt-3 text-sm font-bold text-[#102A26]">
            No products found
          </p>

          <p className="mt-1 text-xs leading-5 text-[#5F706C]">
            Try searching for another medicine,
            supplement or healthcare product.
          </p>
        </div>
      )}
    </div>
  );
}