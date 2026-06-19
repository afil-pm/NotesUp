export function FloatingBook() {
  return (
    <div className="absolute top-[16%] left-[16%] z-10 flex h-[72px] w-[72px] animate-[icon-float_5s_ease-in-out_infinite] items-center justify-center rounded-3xl border border-white/7 bg-gradient-to-br from-purple-500/12 to-blue-500/6 shadow-2xl backdrop-blur-xl">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[34px] w-[34px] opacity-70"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M10 6h5" />
        <path d="M10 10h5" />
        <path d="M10 14h3" />
      </svg>
    </div>
  );
}

export function FloatingCap() {
  return (
    <div
      className="absolute top-[10%] right-[14%] z-10 flex h-[72px] w-[72px] animate-[icon-float_5s_ease-in-out_infinite] items-center justify-center rounded-3xl border border-white/7 bg-gradient-to-br from-blue-500/12 to-purple-500/6 shadow-2xl backdrop-blur-xl"
      style={{ animationDelay: "-2.5s" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#93c5fd"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[34px] w-[34px] opacity-70"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    </div>
  );
}
