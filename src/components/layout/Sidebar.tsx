import { Sparkles, Zap } from "lucide-react";
import { navItems } from "../../data/mockData";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/70 bg-white/90 px-5 py-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
          <Zap className="size-6" />
        </div>
        <div>
          <p className="text-lg font-black tracking-tight">CommuniFlow</p>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Automation SaaS</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item, index) => (
          <a
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              index === 0
                ? "bg-slate-950 text-white shadow-xl shadow-slate-900/15"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
            href={`#${item.href}`}
            key={item.label}
          >
            <item.icon className="size-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-950 p-5 text-white">
        <Sparkles className="mb-5 size-8 text-cyan-300" />
        <p className="text-sm font-black">MongoDB-ready frontend</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Tenant, campaign, contact, billing and audit data uses production-style document IDs.
        </p>
      </div>
    </aside>
  );
}
