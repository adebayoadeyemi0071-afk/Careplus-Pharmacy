
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import ProductCard from "@/components/products/product-card";
import {
  categories,
  products,
  type ProductCategory,
} from "@/data/products";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A-Z" },
];

const availabilityOptions = [
  { value: "all", label: "All products" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export default function ShopPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * Read filters from the URL.
   *
   * Examples:
   * /shop?search=vitamin
   * /shop?category=Pain%20Relief
   * /shop?search=vitamin&category=Vitamins%20%26%20Supplements
   */
  const categoryFromUrl =
    searchParams.get("category") || "All Products";

  const searchFromUrl = searchParams.get("search") || "";
  const sortFromUrl = searchParams.get("sort") || "popular";

  const availabilityFromUrl =
    searchParams.get("availability") || "all";

  const validCategory = categories.includes(
    categoryFromUrl as (typeof categories)[number]
  )
    ? categoryFromUrl
    : "All Products";

  const validSort = sortOptions.some(
    (option) => option.value === sortFromUrl
  )
    ? sortFromUrl
    : "popular";

  const validAvailability = availabilityOptions.some(
    (option) => option.value === availabilityFromUrl
  )
    ? availabilityFromUrl
    : "all";

  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | "All Products">(
      validCategory as ProductCategory | "All Products"
    );

  const [searchQuery, setSearchQuery] =
    useState(searchFromUrl);

  const [sortBy, setSortBy] = useState(validSort);

  const [availability, setAvailability] =
    useState(validAvailability);

  const [showFilters, setShowFilters] = useState(false);

  /*
   * Synchronize local filter state with URL changes without
   * setting state inside an effect.
   *
   * This also handles browser back/forward navigation and
   * searches initiated elsewhere in the application.
   */
  const urlFilterKey = JSON.stringify([
    searchFromUrl,
    validCategory,
    validSort,
    validAvailability,
  ]);

  const [previousUrlFilterKey, setPreviousUrlFilterKey] =
    useState(urlFilterKey);

  if (previousUrlFilterKey !== urlFilterKey) {
    setPreviousUrlFilterKey(urlFilterKey);
    setSearchQuery(searchFromUrl);
    setSelectedCategory(
      validCategory as ProductCategory | "All Products"
    );
    setSortBy(validSort);
    setAvailability(validAvailability);
  }

  /*
   * Update the URL while keeping other active filters.
   */
  const updateUrl = (
    nextValues: {
      search?: string;
      category?: string;
      sort?: string;
      availability?: string;
    },
    replace = true
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (nextValues.search !== undefined) {
      const value = nextValues.search.trim();

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
    }

    if (nextValues.category !== undefined) {
      if (
        nextValues.category &&
        nextValues.category !== "All Products"
      ) {
        params.set("category", nextValues.category);
      } else {
        params.delete("category");
      }
    }

    if (nextValues.sort !== undefined) {
      if (
        nextValues.sort &&
        nextValues.sort !== "popular"
      ) {
        params.set("sort", nextValues.sort);
      } else {
        params.delete("sort");
      }
    }

    if (nextValues.availability !== undefined) {
      if (
        nextValues.availability &&
        nextValues.availability !== "all"
      ) {
        params.set(
          "availability",
          nextValues.availability
        );
      } else {
        params.delete("availability");
      }
    }

    const query = params.toString();

    const destination = query
      ? `${pathname}?${query}`
      : pathname;

    if (replace) {
      router.replace(destination, { scroll: false });
    } else {
      router.push(destination);
    }
  };

  /*
   * FILTER + SEARCH + SORT
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // CATEGORY
    if (selectedCategory !== "All Products") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // SEARCH BY NAME, CATEGORY, OR DESCRIPTION
    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter((product) => {
        const name = product.name.toLowerCase();
        const category = product.category.toLowerCase();
        const description = product.description.toLowerCase();

        return (
          name.includes(normalizedSearch) ||
          category.includes(normalizedSearch) ||
          description.includes(normalizedSearch)
        );
      });
    }

    // AVAILABILITY
    if (availability === "in-stock") {
      result = result.filter(
        (product) => product.stock > 0
      );
    }

    if (availability === "out-of-stock") {
      result = result.filter(
        (product) => product.stock <= 0
      );
    }

    // SORTING
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => {
          if (a.newest === b.newest) {
            return a.name.localeCompare(b.name);
          }

          return a.newest ? -1 : 1;
        });
        break;

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "popular":
      default:
        result.sort((a, b) => {
          if (a.popular === b.popular) {
            return a.name.localeCompare(b.name);
          }

          return a.popular ? -1 : 1;
        });
        break;
    }

    return result;
  }, [
    selectedCategory,
    searchQuery,
    availability,
    sortBy,
  ]);

  // CATEGORY
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(
      category as ProductCategory | "All Products"
    );

    updateUrl({ category });
    setShowFilters(false);
  };

  // SEARCH
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateUrl({ search: value });
  };

  // SORT
  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateUrl({ sort: value });
  };

  // AVAILABILITY
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
    updateUrl({ availability: value });
  };

  // CLEAR EVERYTHING
  const clearFilters = () => {
    setSelectedCategory("All Products");
    setSearchQuery("");
    setSortBy("popular");
    setAvailability("all");

    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== "All Products" ||
    searchQuery.trim() !== "" ||
    sortBy !== "popular" ||
    availability !== "all";

  return (
    <main className="min-h-screen bg-[#FAFCFB]">
      {/* HERO */}
      <section className="border-b border-[#DDE9E5] bg-[#E5F5F0]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.22em] text-[#086B57]">
              CAREPLUS PHARMACY
            </p>

            <h1 className="text-4xl font-extrabold tracking-[-0.025em] text-[#063D35] sm:text-5xl lg:text-6xl">
              Healthcare essentials,
              <span className="block">made easier.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5F706C] sm:text-lg">
              Shop medicines, vitamins, personal care products
              and everyday healthcare essentials from CarePlus
              Pharmacy.
            </p>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* TOP HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-[#102A26] sm:text-3xl">
              Shop Products
            </h2>

            <p className="mt-1 text-sm text-[#5F706C]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              found
            </p>
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}
            <div className="relative min-w-0 sm:w-[320px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F706C]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
                className="h-12 w-full rounded-2xl border border-[#DDE9E5] bg-white pl-11 pr-10 text-sm text-[#102A26] outline-none transition placeholder:text-[#91A09D] focus:border-[#086B57] focus:ring-2 focus:ring-[#086B57]/10"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#5F706C] transition hover:bg-[#F1F8F5] hover:text-[#086B57]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* SORT */}
            <div className="relative">
              <SlidersHorizontal
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5F706C]"
              />

              <select
                value={sortBy}
                onChange={(event) =>
                  handleSortChange(event.target.value)
                }
                aria-label="Sort products"
                className="h-12 w-full appearance-none rounded-2xl border border-[#DDE9E5] bg-white pl-11 pr-10 text-sm font-semibold text-[#102A26] outline-none transition focus:border-[#086B57] focus:ring-2 focus:ring-[#086B57]/10 sm:w-[210px]"
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#5F706C]"
              />
            </div>

            {/* MOBILE FILTER BUTTON */}
            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              aria-expanded={showFilters}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#DDE9E5] bg-white px-5 text-sm font-bold text-[#102A26] transition hover:border-[#086B57] hover:text-[#086B57] lg:hidden"
            >
              <Filter size={17} />
              Filters

              {hasActiveFilters && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#086B57] px-1 text-[10px] font-extrabold text-white">
                  !
                </span>
              )}
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* FILTER SIDEBAR */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } rounded-3xl border border-[#DDE9E5] bg-white p-5 lg:block`}
          >
            {/* CATEGORY */}
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#102A26]">
                Categories
              </h3>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#086B57] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-5 space-y-1.5">
              {categories.map((category) => {
                const isActive =
                  selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(category)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                      isActive
                        ? "bg-[#E5F5F0] font-bold text-[#086B57]"
                        : "font-medium text-[#5F706C] hover:bg-[#F1F8F5] hover:text-[#086B57]"
                    }`}
                  >
                    <span>{category}</span>

                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#086B57]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* AVAILABILITY */}
            <div className="mt-8 border-t border-[#EEF3F1] pt-6">
              <h3 className="font-extrabold text-[#102A26]">
                Availability
              </h3>

              <div className="mt-4 space-y-2">
                {availabilityOptions.map((option) => {
                  const isActive =
                    availability === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleAvailabilityChange(option.value)
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        isActive
                          ? "bg-[#E5F5F0] font-bold text-[#086B57]"
                          : "font-medium text-[#5F706C] hover:bg-[#F1F8F5] hover:text-[#086B57]"
                      }`}
                    >
                      <span>{option.label}</span>

                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#086B57]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HELP CARD */}
            <div className="mt-7 rounded-2xl bg-[#F1F8F5] p-4">
              <p className="text-sm font-bold text-[#063D35]">
                Need help choosing?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#5F706C]">
                Contact our pharmacy team if you need assistance
                finding a suitable healthcare product.
              </p>

              <Link
                href="/contact"
                className="mt-3 inline-flex text-xs font-extrabold text-[#086B57] hover:underline"
              >
                Contact us
              </Link>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div>
            {/* ACTIVE FILTERS */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#5F706C]">
                  Showing:
                </span>

                {selectedCategory !== "All Products" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryChange("All Products")
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-bold text-[#086B57]"
                  >
                    {selectedCategory}
                    <X size={13} />
                  </button>
                )}

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-bold text-[#086B57]"
                  >
                    <span className="truncate">
                      Search: &quot;{searchQuery}&quot;
                    </span>

                    <X size={13} />
                  </button>
                )}

                {availability !== "all" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleAvailabilityChange("all")
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-bold text-[#086B57]"
                  >
                    {
                      availabilityOptions.find(
                        (option) =>
                          option.value === availability
                      )?.label
                    }

                    <X size={13} />
                  </button>
                )}

                {sortBy !== "popular" && (
                  <button
                    type="button"
                    onClick={() => handleSortChange("popular")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E5F5F0] px-3 py-1.5 text-xs font-bold text-[#086B57]"
                  >
                    {
                      sortOptions.find(
                        (option) => option.value === sortBy
                      )?.label
                    }

                    <X size={13} />
                  </button>
                )}
              </div>
            )}

            {/* PRODUCT GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-[#DDE9E5] bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5F5F0]">
                  <Search
                    size={24}
                    className="text-[#086B57]"
                  />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-[#102A26]">
                  No products found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5F706C]">
                  We couldn&apos;t find any products matching
                  your current filters. Try another search or
                  clear your filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#086B57] px-5 text-sm font-bold text-white transition hover:bg-[#063D35]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
