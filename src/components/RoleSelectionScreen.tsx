import { type JSX, useEffect, useRef, useState } from "react";
import { ParticleField } from "./ParticleField";

type Role = "student" | "teacher" | "admin";

interface RoleOption {
  id: Role;
  label: string;
  description: string;
  icon: (selected: boolean) => JSX.Element;
}

function StudentIcon({ selected }: { selected: boolean }) {
  const s = selected ? "#a78bfa" : "rgba(255,255,255,0.35)";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  );
}

function TeacherIcon({ selected }: { selected: boolean }) {
  const s = selected ? "#93c5fd" : "rgba(255,255,255,0.35)";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M10 8h3" />
      <path d="M10 12h5" />
      <path d="M10 16h4" />
    </svg>
  );
}

function AdminIcon({ selected }: { selected: boolean }) {
  const s = selected ? "#c4b5fd" : "rgba(255,255,255,0.35)";
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const roles: RoleOption[] = [
  {
    id: "student",
    label: "Student",
    description: "Access courses, submit assignments, track your progress",
    icon: (s) => <StudentIcon selected={s} />,
  },
  {
    id: "teacher",
    label: "Teacher (Sub-admin)",
    description: "Sign in with pre-configured credentials. Username and password are set by the institution and never exposed.",
    icon: (s) => <TeacherIcon selected={s} />,
  },
  {
    id: "admin",
    label: "Admin (Developer)",
    description: "Sign in with a system-assigned password. Credentials are securely provisioned and never shared or exposed.",
    icon: (s) => <AdminIcon selected={s} />,
  },
];

function CampusBuildings() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center overflow-hidden opacity-[0.04]">
      <svg viewBox="0 0 390 400" className="h-[400px] w-[390px]" fill="white">
        <rect x="30" y="200" width="50" height="120" rx="2" />
        <rect x="45" y="180" width="20" height="20" rx="1" />
        <rect x="20" y="230" width="15" height="15" rx="1" />
        <rect x="75" y="240" width="15" height="15" rx="1" />
        <rect x="110" y="160" width="60" height="160" rx="2" />
        <rect x="120" y="140" width="40" height="20" rx="2" />
        <rect x="120" y="190" width="15" height="15" rx="1" />
        <rect x="145" y="190" width="15" height="15" rx="1" />
        <rect x="120" y="220" width="15" height="15" rx="1" />
        <rect x="145" y="220" width="15" height="15" rx="1" />
        <rect x="200" y="180" width="55" height="140" rx="2" />
        <rect x="210" y="160" width="35" height="20" rx="2" />
        <rect x="210" y="210" width="15" height="15" rx="1" />
        <rect x="235" y="210" width="15" height="15" rx="1" />
        <rect x="280" y="220" width="45" height="100" rx="2" />
        <rect x="290" y="200" width="25" height="20" rx="2" />
        <rect x="340" y="240" width="40" height="80" rx="2" />
        <rect x="10" y="320" width="370" height="4" rx="2" />
        <rect x="50" y="300" width="30" height="20" rx="1" />
        <rect x="250" y="300" width="30" height="20" rx="1" />
        <circle cx="170" cy="120" r="20" />
        <circle cx="170" cy="120" r="12" fill="#0a0a1a" />
      </svg>
    </div>
  );
}

interface RoleSelectionScreenProps {
  onBack: () => void;
  onContinue: (role: Role) => void;
}

export function RoleSelectionScreen({ onBack, onContinue }: RoleSelectionScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

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
        `}</style>

        <CampusBuildings />
        <ParticleField />

        <div
          ref={containerRef}
          className="relative z-10 flex h-full w-full flex-col px-6 pb-8 pt-[52px] backdrop-blur-[10px]"
          style={{ background: "rgba(255,255,255,0.02)" }}
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
              <h1 className="text-xl font-bold tracking-tight text-white/90">Choose Your Role</h1>
              <p className="text-xs text-white/30">Select how you&apos;ll use NoteUp</p>
            </div>
          </div>

          {/* Role cards */}
          <div className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto pb-2 scrollbar-none">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative w-full rounded-2xl border p-4 text-left backdrop-blur-2xl transition-all duration-300 ${
                    isSelected
                      ? "border-purple-500/40 bg-white/[0.06] shadow-[0_0_24px_rgba(124,58,237,0.15)]"
                      : "border-white/[0.05] bg-white/[0.03] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                        isSelected
                          ? "from-purple-500/30 to-blue-500/20 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                          : "from-white/[0.06] to-white/[0.02]"
                      }`}
                    >
                      {role.icon(isSelected)}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold ${isSelected ? "text-white" : "text-white/70"}`}>
                        {role.label}
                      </h3>
                      <p className={`mt-0.5 text-xs leading-relaxed ${isSelected ? "text-white/50" : "text-white/30"}`}>
                        {role.description}
                      </p>
                    </div>
                    <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "border-purple-400 bg-purple-500/30"
                        : "border-white/[0.12]"
                    }`}>
                      {isSelected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => selectedRole && onContinue(selectedRole)}
              disabled={!selectedRole}
              className={`relative h-[52px] w-full overflow-hidden rounded-2xl text-base font-semibold tracking-wide transition-all duration-300 ${
                selectedRole
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_8px_32px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.4)] active:scale-[0.96]"
                  : "bg-white/[0.04] text-white/20"
              }`}
            >
              {selectedRole ? (
                <span className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              ) : null}
              Continue
            </button>
            <button
              onClick={onBack}
              className="text-center text-xs font-medium tracking-wide text-white/20 transition-colors hover:text-white/50"
            >
              Back to Welcome
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
