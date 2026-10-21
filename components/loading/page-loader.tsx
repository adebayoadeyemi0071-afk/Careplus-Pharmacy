export default function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-[#FAFCFB] px-5"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#E5F5F0] border-t-[#086B57]" />

          <svg
            width="34"
            height="34"
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
              d="M21 10.5C15.201 10.5 10.5 15.201 10.5 21C10.5 26.799 15.201 31.5 21 31.5C26.799 31.5 31.5 26.799 31.5 21C31.5 15.201 26.799 10.5 21 10.5C15.201 10.5 10.5 15.201 10.5 21Z"
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

        <p className="mt-5 text-sm font-semibold text-[#5F706C]">
          Loading...
        </p>
      </div>
    </div>
  );
}