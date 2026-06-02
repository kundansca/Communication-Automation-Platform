import { CheckCircle2, Database, Lock, Plus, Settings, ShieldCheck, UserPlus } from "lucide-react";

type HeroSectionProps = {
  onCreateCampaign: () => void;
};

export function HeroSection({ onCreateCampaign }: HeroSectionProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]" id="dashboard">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-indigo-950/20 sm:p-8">
        <div className="absolute right-0 top-0 size-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <CheckCircle2 className="size-4" /> Interactive frontend prototype
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Complete multi-channel campaign dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Create campaigns, manage contacts, import/export data, control campaign status and preview MongoDB-ready data
            structures before backend integration.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="primary-button justify-center bg-white text-slate-950 hover:bg-cyan-50" onClick={onCreateCampaign} type="button">
              <Plus className="size-4" /> Create campaign
            </button>
            <a className="secondary-button justify-center border-white/10 bg-white/10 text-white hover:bg-white/20" href="#data-model">
              <Database className="size-4" /> View MongoDB schema
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Authentication</p>
            <h2 className="mt-2 text-2xl font-black">Secure access</h2>
          </div>
          <ShieldCheck className="size-10 text-indigo-600" />
        </div>
        <div className="mt-6 space-y-3">
          {[
            { label: "Register businesses and team users", icon: UserPlus },
            { label: "Login with JWT access + refresh token", icon: ShieldCheck },
            { label: "Forgot and reset password screens ready", icon: Settings },
            { label: "Two factor authentication future ready", icon: Lock },
          ].map((item) => (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4" key={item.label}>
              <div className="grid size-10 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <item.icon className="size-5" />
              </div>
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 p-5">
          <p className="text-sm font-black text-slate-900">Backend direction</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Node.js, Express.js, TypeScript, MongoDB, Redis/BullMQ and S3/R2 storage.
          </p>
        </div>
      </div>
    </section>
  );
}
