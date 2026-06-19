import { useEffect, useRef, useState } from "react";
import { ParticleField } from "./ParticleField";

const schoolOptions = [
  { code: "STU", name: "St. Mary's High" },
  { code: "SPR", name: "Springfield Academy" },
  { code: "RIV", name: "Riverdale School" },
  { code: "OAK", name: "Oakridge International" },
  { code: "SUN", name: "Sunrise Public School" },
];

const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const divisions = ["A", "B", "C", "D", "E", "F"];

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

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

interface CreateAccountScreenProps {
  onBack: () => void;
}

export function CreateAccountScreen({ onBack }: CreateAccountScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [division, setDivision] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [school, setSchool] = useState("");
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verified, setVerified] = useState(false);

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSendOtp = () => {
    if (!parentMobile || parentMobile.length < 10) return;
    setOtpSent(true);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) {
      const input = document.getElementById(`otp-${i + 1}`);
      input?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length === 4) setVerified(true);
  };

  const selectedSchool = schoolOptions.find((s) => s.code === school);

  return (
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0a0a1a] font-sans select-none">
      <div
        className="relative flex h-[844px] w-[390px] flex-col items-center overflow-hidden rounded-[44px] shadow-[0_0_80px_rgba(100,60,255,0.15),inset_0_0_1px_rgba(255,255,255,0.08)]"
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
          .scrollbar-none::-webkit-scrollbar { display: none; }
          .scrollbar-none { scrollbar-width: none; }
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
              <h1 className="text-xl font-bold tracking-tight text-white/90">Create Account</h1>
              <p className="text-xs text-white/30">Register as a student</p>
            </div>
          </div>

          {/* Scrollable form */}
          <div className="mt-5 flex flex-1 flex-col gap-4 overflow-y-auto pb-2 scrollbar-none">
            {/* Photo upload */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.03] transition-all duration-200 hover:border-purple-500/30 hover:bg-white/[0.06]"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-0.5 text-white/30">
                    <UploadIcon />
                    <span className="text-[9px] font-medium">Upload</span>
                  </div>
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              <span className="text-[10px] text-white/20">Profile Photo</span>
            </div>

            {/* School Selection */}
            <div className="relative">
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">School</label>
              <button
                onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                className="flex h-[48px] w-full items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06]"
              >
                <span className={selectedSchool ? "text-white/80" : "text-white/20"}>
                  {selectedSchool ? selectedSchool.name : "Select your school"}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-white/30 transition-transform duration-200 ${showSchoolDropdown ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showSchoolDropdown && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#15152e] backdrop-blur-2xl">
                  {schoolOptions.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => { setSchool(s.code); setShowSchoolDropdown(false); }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/[0.04] ${school === s.code ? "text-purple-300" : "text-white/60"}`}
                    >
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                        s.code === "STU" ? "bg-emerald-500/20 text-emerald-400" :
                        s.code === "SPR" ? "bg-blue-500/20 text-blue-400" :
                        s.code === "RIV" ? "bg-rose-500/20 text-rose-400" :
                        s.code === "OAK" ? "bg-amber-500/20 text-amber-400" :
                        "bg-violet-500/20 text-violet-400"
                      }`}>
                        {s.code}
                      </div>
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Student Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
            </div>

            {/* Admission Number */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Admission Number</label>
              <input type="text" value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)} placeholder="Enter admission number" className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
            </div>

            {/* Class + Division row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Class</label>
                <div className="flex gap-1.5 flex-wrap">
                  {classes.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedClass(selectedClass === c ? "" : c)}
                      className={`h-8 min-w-[32px] rounded-lg px-2 text-xs font-medium transition-all duration-200 ${
                        selectedClass === c
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-white/[0.03] text-white/30 border border-white/[0.05] hover:bg-white/[0.06]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-24">
                <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Division</label>
                <div className="flex gap-1.5 flex-wrap">
                  {divisions.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDivision(division === d ? "" : d)}
                      className={`h-8 min-w-[32px] rounded-lg px-2 text-xs font-medium transition-all duration-200 ${
                        division === d
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-white/[0.03] text-white/30 border border-white/[0.05] hover:bg-white/[0.06]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent Mobile */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Parent Mobile Number</label>
              <div className="flex gap-2">
                <input type="tel" value={parentMobile} onChange={(e) => setParentMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Enter mobile number" className="h-[48px] flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
                <button
                  onClick={handleSendOtp}
                  disabled={otpSent || parentMobile.length < 10}
                  className={`shrink-0 rounded-2xl px-4 text-xs font-medium transition-all duration-200 ${
                    otpSent
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : parentMobile.length >= 10
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                        : "bg-white/[0.03] text-white/20 border border-white/[0.05]"
                  }`}
                >
                  {otpSent ? "Sent" : "Send OTP"}
                </button>
              </div>
            </div>

            {/* OTP */}
            {otpSent && (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 backdrop-blur-xl">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xs text-white/40">Enter 4-digit OTP sent to your mobile</p>
                  <div className="flex gap-3">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                        className={`h-12 w-12 rounded-xl border text-center text-lg font-semibold text-white/80 backdrop-blur-xl outline-none transition-all duration-200 ${
                          verified
                            ? "border-emerald-500/40 bg-emerald-500/10"
                            : digit
                              ? "border-purple-500/40 bg-white/[0.06]"
                              : "border-white/[0.06] bg-white/[0.03]"
                        }`}
                      />
                    ))}
                  </div>
                  {!verified ? (
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.join("").length < 4}
                      className={`rounded-xl px-6 py-2 text-xs font-medium transition-all duration-200 ${
                        otp.join("").length === 4
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                          : "bg-white/[0.03] text-white/20 border border-white/[0.05]"
                      }`}
                    >
                      Verify OTP
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 pr-10 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60">
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-white/40">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="h-[48px] w-full rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 pr-10 text-sm text-white/80 placeholder-white/20 backdrop-blur-xl transition-all duration-200 focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60">
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <div
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition-all duration-200 ${
                  acceptedTerms
                    ? "border-purple-400 bg-purple-500/30"
                    : "border-white/[0.12] bg-transparent"
                }`}
              >
                {acceptedTerms && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <p className="text-xs leading-relaxed text-white/30">
                I agree to the{" "}
                <button className="font-medium text-purple-400/70 transition-colors hover:text-purple-400">Terms & Conditions</button>{" "}
                and{" "}
                <button className="font-medium text-purple-400/70 transition-colors hover:text-purple-400">Privacy Policy</button>
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-2.5 pt-3 shrink-0">
            <button
              disabled={!acceptedTerms || !verified || !name || !admissionNo || !selectedClass || !division || !parentMobile || !email || !password || !confirmPassword || !school}
              className={`relative h-[52px] w-full overflow-hidden rounded-2xl text-base font-semibold tracking-wide transition-all duration-300 ${
                acceptedTerms && verified && name && admissionNo && selectedClass && division && parentMobile && email && password && confirmPassword && school
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)] active:scale-[0.96]"
                  : "bg-white/[0.04] text-white/20"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              Create Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
