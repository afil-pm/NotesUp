import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  bgClass: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, bgClass, title, description }: FeatureCardProps) {
  return (
    <div className="flex cursor-default items-center gap-[14px] rounded-2xl border border-white/[0.05] bg-white/[0.035] p-4 backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_24px_rgba(124,58,237,0.12)]">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bgClass}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white/85">{title}</h4>
        <p className="mt-0.5 text-xs text-white/38">{description}</p>
      </div>
    </div>
  );
}
