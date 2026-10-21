export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FAFCFB] px-5">
      <div className="flex flex-col items-center text-center">
        {/* CarePlus Logo */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#E5F5F0] border-t-[#086B57]" />

          {/* Logo */}
          <svg
            width="46"
            height="46"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              width="42"
              height="42"
              rx="13"
              fill="#E5F5F0"
            />

            <path
              d="M21 10.5C15.201 10.5 10.5 15.201 10.5 21C10.5 26.799 15.201 31.5 21 31.5C26.799 31.5 31.5 26.799 31.5 21C31.5 15.201 26.799 10.5 21 10.5Z"
              stroke="#086B57"
              strokeWidth="2.5"
            />

            <path
              d="M21 15V27M15 21H27"
              stroke="#086B57"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand */}
        <div className="mt-6">
          <p className="text-xl font-extrabold tracking-tight text-[#063D35]">
            CarePlus
          </p>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#086B57]">
            Pharmacy
          </p>
        </div>

        {/* Loading text */}
        <p className="mt-6 text-sm font-medium text-[#5F706C]">
          Preparing your healthcare experience...
        </p>

        {/* Loading dots */}
        <div className="mt-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#086B57]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#086B57] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#086B57] [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}