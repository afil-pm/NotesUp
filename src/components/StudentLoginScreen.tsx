import { useEffect, useRef, useState } from "react";
import { ParticleField } from "./ParticleField";

const schoolLogos: Record<string, { name: string; initial: string; color: string }> = {
  STU: { name: "St. Mary's High", initial: "S", color: "from-emerald-500 to-teal-600" },
  SPR: { name: "Springfield Academy", initial: "SA", color: "from-blue-500 to-cyan-600" },
  RIV: { name: "Riverdale School", initial: "R", color: "from-rose-500 to-pink-600" },
  OAK: { name: "Oakridge International", initial: "O", color: "from-amber-500 to-orange-600" },
  SUN: { name: "Sunrise Public School", initial: "S", color: "from-violet-500 to-purple-600" },
};

function SchoolLogo({ code }: { code: string }) {
  const school = schoolLogos[code.toUpperCase()];
  if (!school) return null;
  return (
    <div className="mb-4 flex flex-col items-center gap-1.5 animate-in fade-in duration-500">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${school.color} shadow-lg`}>
        <span className="text-lg font-bold text-white">{school.initial}</span>
      </div>
      <span className="text-xs font-medium text-white/50">{school.name}</span>
    </div>
  );
}

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

interface StudentLoginScreenProps {
  onBack: () => void;
  onCreateAccount: () => void;
}

export function StudentLoginScreen({ onBack, onCreateAccount }: StudentLoginScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [schoolCode, setSchoolCode] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a1a] font-sans select-none">
      <div
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden shadow-[0_0_80px_rgba(100,60,255,0.15),inset_0_0_1px_rgba(255,255,255,0.08)]"
        style={{ background: "linear-gradient(145deg, #0d0d2b 0%, #1a0a2e 40%, #0f0f3a 100%)" }}
      >
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />

        <style>{`
          .orb-1, .orb-2, .orb-3 {
            position: absolute; border-radius: 50%;
            filter: blur(80px); opacity: 0.6;
            animation: orb-float 8s ease-in-out infinite;
            pointer-events: none;
          }
          .orb-1 { width: 300px; height: 300px; background: #7c3aed; top: -100px; left: -80px; }
          .orb-2 { width: 240px; height: 240px; background: #3b82f6; bottom: 120px; right: -80px; animation-delay: -3s; }
          .orb-3 { width: 200px; height: 200px; background: #8b5cf6; bottom: -60px; left: 20px; animation-delay: -5s; }
          @keyframes fade-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          .animate-in { animation: fade-in 0.4s ease-out; }
        `}</style>

        <ParticleField />

        <div
          ref={containerRef}
          className="relative z-10 flex min-h-screen w-full flex-col px-6 pb-8 pt-[52px] backdrop-blur-[12px]"
          style={{ background: "rgba(255,255,255,0.035)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
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
              <h1 className="text-xl font-bold tracking-tight text-white/90">Student Login</h1>
              <p className="text-xs text-white/30">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8 flex flex-1 flex-col">
            {/* School logo */}
            <div className="flex flex-col items-center">
              {code.length >= 3 && schoolLogos[code] ? (
                <SchoolLogo code={code} />
              ) : (
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.06]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} className="h-6 w-6">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {/* School Code */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/40 tracking-wide">School Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={schoolCode}
                    onChange={(e) => setSchoolCode(e.target.value.toUpperCase())}
                    placeholder="e.g. STU, SPR, RIV"
                    maxLength={6}
                    className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                  />
                  {code.length >= 3 && schoolLogos[code] && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Admission Number */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/40 tracking-wide">Admission Number</label>
                <input
                  type="text"
                  value={admissionNo}
                  onChange={(e) => setAdmissionNo(e.target.value)}
                  placeholder="Enter your admission number"
                  className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/40 tracking-wide">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 pr-10 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
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

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between mt-1">
                <label className="flex cursor-pointer items-center gap-2">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${
                      rememberMe
                        ? "border-purple-400 bg-purple-500/30"
                        : "border-white/[0.12] bg-transparent"
                    }`}
                  >
                    {rememberMe && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-white/30">Remember Me</span>
                </label>
                <button className="text-xs font-medium text-purple-400/70 transition-colors hover:text-purple-400">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5">
            <button className="relative h-[52px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-base font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)] active:scale-[0.96]">
              <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              Login
            </button>
            <button
              onClick={onCreateAccount}
              className="h-[52px] w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] text-base font-medium tracking-wide text-white/60 backdrop-blur-xl transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.09] hover:text-white active:scale-[0.96]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
