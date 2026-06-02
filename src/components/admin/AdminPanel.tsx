import { Activity, ChevronRight, CreditCard, Send, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import type { Campaign, Contact } from "../../types";
import { formatNumber } from "../../utils/format";

type AdminPanelProps = {
  campaigns: Campaign[];
  contacts: Contact[];
};

export function AdminPanel({ campaigns, contacts }: AdminPanelProps) {
  const [activeUsers, setActiveUsers] = useState(8920);
  const adminMetrics = [
    { label: "Total Revenue", value: "₹18.4L", icon: CreditCard },
    { label: "Total Users", value: "12,840", icon: Users },
    { label: "Active Users", value: formatNumber(activeUsers), icon: Activity },
    { label: "Messages Sent", value: formatNumber(campaigns.reduce((sum, campaign) => sum + campaign.metrics.sent, 0)), icon: Send },
  ];

  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="admin">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Admin panel</p>
          <h2 className="mt-2 text-2xl font-black">Platform controls</h2>
        </div>
        <ShieldCheck className="size-10 text-indigo-600" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {adminMetrics.map((metric) => (
          <div className="rounded-3xl bg-slate-50 p-4" key={metric.label}>
            <metric.icon className="size-6 text-indigo-600" />
            <p className="mt-4 text-2xl font-black">{metric.value}</p>
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {[
          { label: "Block one demo user", action: () => setActiveUsers((count) => Math.max(count - 1, 0)) },
          { label: "Activate one demo user", action: () => setActiveUsers((count) => count + 1) },
          { label: `Review ${contacts.length} contacts`, action: () => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }) },
          { label: "View campaign queue", action: () => document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" }) },
        ].map((item) => (
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 p-4 text-left" key={item.label} onClick={item.action} type="button">
            <span className="font-bold text-slate-700">{item.label}</span>
            <ChevronRight className="size-5 text-slate-400" />
          </button>
        ))}
      </div>
    </section>
  );
}
