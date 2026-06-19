import { FloatingBook, FloatingCap } from "./FloatingIcon";
import { ParticleField } from "./ParticleField";
import { FeatureCard } from "./FeatureCard";

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 opacity-80">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 opacity-80">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r={1} />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 opacity-80">
      <rect x={3} y={11} width={18} height={11} rx={2} /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {

  return (
    <main
      className="relative flex min-h-screen w-full flex-col overflow-hidden font-sans select-none shadow-[0_0_80px_rgba(100,60,255,0.15),inset_0_0_1px_rgba(255,255,255,0.08)]"
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
          .glow-dot {
            position: absolute; width: 6px; height: 6px; border-radius: 50%;
            background: #7c3aed; filter: blur(3px);
            animation: glow-pulse 2s ease-in-out infinite;
            pointer-events: none;
          }
          .glow-dot:nth-child(1) { top: 22%; left: 10%; }
          .glow-dot:nth-child(2) { top: 38%; right: 15%; animation-delay: -0.7s; background: #3b82f6; }
          .glow-dot:nth-child(3) { top: 65%; left: 78%; animation-delay: -1.4s; }
        `}</style>

        <div className="glow-dot" />
        <div className="glow-dot" />
        <div className="glow-dot" />

        <FloatingBook />
        <FloatingCap />
        <ParticleField />

        <div
          className="relative z-10 flex h-full w-full flex-col items-center justify-between px-8 pb-9 pt-[60px] backdrop-blur-[14px]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="mt-7 flex flex-col items-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-purple-500 to-blue-500 text-4xl font-bold tracking-tight text-white shadow-[0_12px_48px_rgba(124,58,237,0.35)]">
              <span className="relative z-10">N</span>
              <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/35 to-transparent p-[1.5px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]" />
            </div>
            <h1 className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-[40px] font-bold tracking-tight text-transparent">
              NoteUp
            </h1>
            <p className="mt-1.5 text-[17px] font-medium tracking-wide text-white/45">
              Every Note Matters
            </p>
            <p className="mt-1 text-[13px] tracking-wide text-white/25">
              Never miss a class again
            </p>
          </div>

          <div className="flex w-full flex-1 items-center justify-center">
            <div className="flex w-full flex-col gap-3">
              <FeatureCard icon={<NoteIcon />} bgClass="bg-purple-500/18" title="Smart Capture" description="Encrypted notes in real-time" />
              <FeatureCard icon={<WifiIcon />} bgClass="bg-blue-500/18" title="Zero-Trust Sync" description="End-to-end encrypted cloud" />
              <FeatureCard icon={<LockIcon />} bgClass="bg-indigo-500/18" title="Zero-Knowledge Security" description="Only you hold the key" />
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3.5">
            <div className="flex w-full flex-col gap-2.5">
              <button
                onClick={onGetStarted}
                className="relative h-[54px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-base font-semibold tracking-wide text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_rgba(124,58,237,0.4)] active:scale-[0.96]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                Get Started
              </button>
              <button
                onClick={onGetStarted}
                className="h-[54px] w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] text-base font-medium tracking-wide text-white/60 backdrop-blur-xl transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.09] hover:text-white active:scale-[0.96]"
              >
                Sign In
              </button>
            </div>
            <div className="mt-1 flex gap-6">
              <a href="#" className="text-[11px] font-medium tracking-wide text-white/20 transition-colors hover:text-white/50">Privacy Policy</a>
              <a href="#" className="text-[11px] font-medium tracking-wide text-white/20 transition-colors hover:text-white/50">Terms & Conditions</a>
            </div>
          </div>
        </div>

    </main>
  );
}
