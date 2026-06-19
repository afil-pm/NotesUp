import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { RoleSelectionScreen } from "./components/RoleSelectionScreen";
import { StudentLoginScreen } from "./components/StudentLoginScreen";
import { CreateAccountScreen } from "./components/CreateAccountScreen";
import { AdminLoginScreen } from "./components/AdminLoginScreen";
import { TeacherLoginScreen } from "./components/TeacherLoginScreen";
import "./index.css";

type Screen = "welcome" | "role-selection" | "student-login" | "create-account" | "admin-login" | "admin-dashboard" | "teacher-login";

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");

  return (
    <div className="relative">
      {screen === "welcome" && (
        <WelcomeScreen onGetStarted={() => setScreen("role-selection")} />
      )}
      {screen === "role-selection" && (
        <RoleSelectionScreen
          onBack={() => setScreen("welcome")}
          onContinue={(role) => {
            if (role === "student") setScreen("student-login");
            if (role === "teacher") setScreen("teacher-login");
            if (role === "admin") setScreen("admin-login");
          }}
        />
      )}
      {screen === "student-login" && (
        <StudentLoginScreen
          onBack={() => setScreen("role-selection")}
          onCreateAccount={() => setScreen("create-account")}
        />
      )}
      {screen === "create-account" && (
        <CreateAccountScreen onBack={() => setScreen("student-login")} />
      )}
      {screen === "teacher-login" && (
        <TeacherLoginScreen onBack={() => setScreen("role-selection")} />
      )}
      {screen === "admin-login" && (
        <AdminLoginScreen
          onBack={() => setScreen("role-selection")}
          onDashboard={() => setScreen("admin-dashboard")}
        />
      )}
      {screen === "admin-dashboard" && (
        <AdminDashboard onBack={() => setScreen("admin-login")} />
      )}
    </div>
  );
}

function AdminDashboard({ onBack }: { onBack: () => void }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a1a] font-sans select-none">
      <div
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden gap-3 shadow-[0_0_80px_rgba(100,60,255,0.15)]"
        style={{ background: "linear-gradient(145deg, #0d0d2b 0%, #1a0a2e 40%, #0f0f3a 100%)" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white/90">Admin Dashboard</h1>
        <p className="text-sm text-white/40">Full control of the app</p>
        <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-[300px]">
          {["Users", "Analytics", "Settings", "Logs"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-center backdrop-blur-xl">
              <p className="text-sm font-medium text-white/60">{item}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onBack}
          className="mt-6 text-xs font-medium text-white/30 transition-colors hover:text-white/50"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}

export default App;
