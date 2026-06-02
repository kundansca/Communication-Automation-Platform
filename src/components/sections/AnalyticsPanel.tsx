import { BarChart3 } from "lucide-react";
import { chartData } from "../../data/mockData";
import type { DashboardMetrics } from "../../types";
import { Legend } from "../ui";

type AnalyticsPanelProps = {
  metrics: DashboardMetrics;
};

export function AnalyticsPanel({ metrics }: AnalyticsPanelProps) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="analytics">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2 className="mt-2 text-2xl font-black">Performance reports</h2>
        </div>
        <BarChart3 className="size-10 text-indigo-600" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Open/Read", `${metrics.openRate}%`],
          ["Click Rate", `${metrics.clickRate}%`],
          ["Call Success", `${metrics.callSuccessRate}%`],
        ].map(([label, value]) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={label}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex h-72 items-end gap-2 rounded-3xl bg-slate-50 p-4">
        {chartData.map((day) => (
          <div className="flex h-full flex-1 flex-col justify-end gap-1" key={day.label}>
            <div className="rounded-t-xl bg-indigo-500" style={{ height: `${day.email}%` }} />
            <div className="rounded-t-xl bg-emerald-500" style={{ height: `${day.whatsapp}%` }} />
            <div className="rounded-t-xl bg-amber-500" style={{ height: `${day.sms}%` }} />
            <div className="rounded-t-xl bg-pink-500" style={{ height: `${day.voice}%` }} />
            <p className="pt-2 text-center text-xs font-black text-slate-500">{day.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-black text-slate-500">
        <Legend color="bg-indigo-500" label="Email" />
        <Legend color="bg-emerald-500" label="WhatsApp" />
        <Legend color="bg-amber-500" label="SMS" />
        <Legend color="bg-pink-500" label="Voice" />
      </div>
    </section>
  );
}
