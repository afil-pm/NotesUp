import { useEffect, useRef, useState } from "react";

const schoolLogos: Record<string, { name: string; initial: string }> = {
  STU: { name: "St. Mary's High", initial: "S" },
  SPR: { name: "Springfield Academy", initial: "SA" },
  RIV: { name: "Riverdale School", initial: "R" },
  OAK: { name: "Oakridge International", initial: "O" },
  SUN: { name: "Sunrise Public School", initial: "S" },
};

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.08] px-3.5 py-2.5 border border-white/[0.08] transition-all duration-200 hover:bg-white/15">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 to-rose-400/20">
        {icon}
      </div>
      <span className="text-xs font-medium text-white/70">{label}</span>
    </div>
  );
}

interface TeacherLoginScreenProps {
  onBack: () => void;
}

export function TeacherLoginScreen({ onBack }: TeacherLoginScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [schoolCode, setSchoolCode] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const code = schoolCode.trim().toUpperCase();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const school = schoolLogos[code];

  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a1a] font-sans select-none">
      <div
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden shadow-[0_0_80px_rgba(255,120,100,0.12),inset_0_0_1px_rgba(255,255,255,0.06)]"
        style={{ background: "linear-gradient(145deg, #1a0f1a 0%, #1f1028 35%, #0f0f1a 100%)" }}
      >
        {/* Warm gradient orbs */}
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />

        <style>{`
          .orb-1, .orb-2, .orb-3 {
            position: absolute; border-radius: 50%;
            filter: blur(90px); opacity: 0.5;
            animation: orb-float 8s ease-in-out infinite;
            pointer-events: none;
          }
          .orb-1 { width: 280px; height: 280px; background: #e8793b; top: -90px; right: -70px; }
          .orb-2 { width: 220px; height: 220px; background: #a855f7; bottom: 140px; left: -70px; animation-delay: -3s; }
          .orb-3 { width: 200px; height: 200px; background: #f472b6; bottom: -50px; right: 10px; animation-delay: -5s; }
        `}</style>

        {/* Decorative warm glow dots */}
        <div className="pointer-events-none absolute top-[20%] left-[8%] h-2 w-2 rounded-full bg-amber-400/30 blur-sm" />
        <div className="pointer-events-none absolute top-[40%] right-[12%] h-1.5 w-1.5 rounded-full bg-rose-400/30 blur-sm" />
        <div className="pointer-events-none absolute bottom-[30%] left-[20%] h-2 w-2 rounded-full bg-orange-400/25 blur-sm" />

        <div
          ref={containerRef}
          className="relative z-10 flex min-h-screen w-full flex-col px-6 pb-8 pt-[52px] backdrop-blur-[12px]"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {/* Header with back */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-white/50 backdrop-blur-md transition-colors hover:border-white/[0.12] hover:text-white/80"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white/90">Teacher Login</h1>
              <p className="text-xs text-white/30">Welcome back, educator</p>
            </div>
          </div>

          {/* Logo + Branding */}
            <div className="mt-5 flex flex-col items-center gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/10 border border-white/10 overflow-hidden">
              <img src="/logo.png" alt="NoteUp" className="h-10 w-10 object-contain" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">NoteUp</h2>
              <p className="text-[11px] text-white/25 mt-0.5">Teacher Portal</p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-6 flex flex-1 flex-col gap-4">
            {/* School Code */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">School Code</label>
              <div className="relative">
                <input
                  type="text"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                  placeholder="e.g. STU, SPR, RIV"
                  maxLength={6}
                  className="h-[48px] w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 pr-9 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-amber-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
                />
                {code.length >= 3 && school && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              {code.length >= 3 && school && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-amber-500/30 to-rose-500/20 text-[8px] font-bold text-amber-300/80">
                    {school.initial}
                  </div>
                  <span className="text-xs text-white/35">{school.name}</span>
                </div>
              )}
            </div>

            {/* Teacher ID */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Teacher ID</label>
              <input
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                placeholder="Enter your teacher ID"
                className="h-[48px] w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-amber-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-[48px] w-full rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 pr-10 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-amber-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {/* Teacher feature pills */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <FeaturePill
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                }
                label="Attendance"
              />
              <FeaturePill
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                }
                label="Upload Notes"
              />
              <FeaturePill
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                }
                label="Assignments"
              />
              <FeaturePill
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
                label="Students"
              />
            </div>
          </div>

          {/* Login button */}
          <div className="flex flex-col gap-3 pt-4 shrink-0">
            <button
              disabled={!schoolCode || !teacherId || !password}
              className={`relative h-[52px] w-full overflow-hidden rounded-2xl text-base font-semibold tracking-wide transition-all duration-300 ${
                schoolCode && teacherId && password
                  ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-[0_8px_32px_rgba(245,158,11,0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] active:scale-[0.96]"
                  : "bg-white/[0.04] text-white/20"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              Login
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white/15">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[10px] text-white/15">Pre-configured credentials — never shared</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
