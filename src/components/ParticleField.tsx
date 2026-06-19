const particles = [
  { top: "12%", left: "8%", duration: 15, delay: 0, color: "#a78bfa", paths: ["M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", "M14 2v6h6"] },
  { top: "28%", left: "80%", duration: 12, delay: -2, color: "#93c5fd", paths: ["M8 2h8v20H8z", "M2 6h4", "M2 12h4", "M2 18h4"] },
  { top: "52%", left: "3%", duration: 17, delay: -5, color: "#c4b5fd", paths: ["M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"] },
  { top: "72%", left: "86%", duration: 13, delay: -1, color: "#a78bfa", paths: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"] },
  { top: "88%", left: "18%", duration: 16, delay: -7, color: "#93c5fd", paths: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"] },
  { top: "8%", left: "58%", duration: 11, delay: -3, color: "#c4b5fd", paths: ["M3 3h18v18H3z", "M3 9h18", "M9 21V9"] },
  { top: "42%", left: "68%", duration: 18, delay: -9, color: "#a78bfa", paths: ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"] },
  { top: "92%", left: "72%", duration: 10, delay: -4, color: "#93c5fd", paths: ["M3 4h18v18H3z", "M3 10h21"] },
];

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            animation: `particle-float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={p.color}
            strokeWidth={1.5}
            className="h-[18px] w-[18px] opacity-20"
          >
            {p.paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
