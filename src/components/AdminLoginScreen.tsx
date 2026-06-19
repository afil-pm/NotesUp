import { useEffect, useRef, useState } from "react";
import { ParticleField } from "./ParticleField";

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

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

interface AdminLoginScreenProps {
  onBack: () => void;
  onDashboard: () => void;
}

export function AdminLoginScreen({ onBack, onDashboard }: AdminLoginScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // 2FA verification state
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState(["", "", "", "", "", ""]);

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

  const handleLogin = () => {
    if (!name || !email || !password) return;
    if (twoFactorEnabled) {
      setShow2FA(true);
    } else {
      onDashboard();
    }
  };

  const handle2FAChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...twoFACode];
    next[i] = val;
    setTwoFACode(next);
    if (val && i < 5) {
      document.getElementById(`2fa-${i + 1}`)?.focus();
    }
  };

  const handle2FAVerify = () => {
    if (twoFACode.join("").length === 6) onDashboard();
  };

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
            filter: blur(80px); opacity: 0.45;
            animation: orb-float 8s ease-in-out infinite;
            pointer-events: none;
          }
          .orb-1 { width: 280px; height: 280px; background: #7c3aed; top: -80px; left: -60px; }
          .orb-2 { width: 220px; height: 220px; background: #3b82f6; bottom: 120px; right: -60px; animation-delay: -3s; }
          .orb-3 { width: 180px; height: 180px; background: #8b5cf6; bottom: -50px; left: 30px; animation-delay: -5s; }
        `}</style>

        <ParticleField />

        <div
          ref={containerRef}
          className="relative z-10 flex h-full w-full flex-col px-6 pb-8 pt-[52px] backdrop-blur-[10px]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Header */}
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
              <h1 className="text-xl font-bold tracking-tight text-white/90">Admin Login</h1>
              <p className="text-xs text-white/30">Developer access — full system control</p>
            </div>
          </div>

          {/* Form body */}
          {!show2FA ? (
            <>
              <div className="mt-8 flex flex-1 flex-col gap-4">
                {/* Shield badge */}
                <div className="flex items-center gap-2 rounded-2xl border border-amber-500/15 bg-amber-500/5 px-4 py-3 backdrop-blur-xl">
                  <ShieldCheckIcon />
                  <span className="text-xs text-amber-400/70">System-assigned credentials. Full administrative privileges.</span>
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@school.edu"
                    className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
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
                      placeholder="Enter system password"
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

                {/* Two-Factor Authentication toggle */}
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 ${twoFactorEnabled ? "text-purple-400" : "text-white/30"}`}>
                        <rect x="2" y="2" width="20" height="20" rx="2" />
                        <path d="M6 12h4l2 3 4-6 2 4" />
                      </svg>
                      <span className="text-sm font-medium text-white/70">Two-Factor Authentication</span>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${twoFactorEnabled ? "bg-purple-500/40" : "bg-white/[0.08]"}`}
                    >
                      <div
                        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${twoFactorEnabled ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                  {twoFactorEnabled && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3 py-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-xs text-emerald-400/70">Authenticator app linked. A 6-digit code will be required at login.</span>
                    </div>
                  )}
                </div>

                {/* Remember Device + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <div
                      onClick={() => setRememberDevice(!rememberDevice)}
                      className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${
                        rememberDevice
                          ? "border-purple-400 bg-purple-500/30"
                          : "border-white/[0.12] bg-transparent"
                      }`}
                    >
                      {rememberDevice && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-white/30">Remember Device</span>
                  </label>
                  <button className="text-xs font-medium text-purple-400/70 transition-colors hover:text-purple-400">
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Login button */}
              <div className="flex flex-col gap-2.5 pt-3 shrink-0">
                <button
                  onClick={handleLogin}
                  disabled={!name || !email || !password}
                  className={`relative h-[52px] w-full overflow-hidden rounded-2xl text-base font-semibold tracking-wide transition-all duration-300 ${
                    name && email && password
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)] active:scale-[0.96]"
                      : "bg-white/[0.04] text-white/20"
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  Login to Dashboard
                </button>
              </div>
            </>
          ) : (
            /* 2FA Verification step */
            <>
              <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-500/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <path d="M6 12h4l2 3 4-6 2 4" />
                  </svg>
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-white/90">Two-Factor Authentication</h2>
                  <p className="mt-1 text-xs text-white/30">Enter the 6-digit code from your authenticator app</p>
                </div>

                <div className="flex gap-2.5">
                  {twoFACode.map((digit, i) => (
                    <input
                      key={i}
                      id={`2fa-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handle2FAChange(i, e.target.value.replace(/\D/g, ""))}
                      className="h-12 w-10 rounded-xl border text-center text-lg font-semibold text-white/80 backdrop-blur-xl outline-none transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                    />
                  ))}
                </div>

                <button
                  onClick={handle2FAVerify}
                  disabled={twoFACode.join("").length < 6}
                  className={`relative h-[52px] w-full max-w-[240px] overflow-hidden rounded-2xl text-base font-semibold tracking-wide transition-all duration-300 ${
                    twoFACode.join("").length === 6
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)] active:scale-[0.96]"
                      : "bg-white/[0.04] text-white/20"
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  Verify &amp; Access
                </button>

                <button onClick={() => setShow2FA(false)} className="text-xs text-white/30 transition-colors hover:text-white/50">
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
