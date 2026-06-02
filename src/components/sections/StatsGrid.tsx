import { Activity, Megaphone, Send, TrendingUp, Users } from "lucide-react";
import type { Contact, DashboardMetrics } from "../../types";
import { formatNumber } from "../../utils/format";

type StatsGridProps = {
  metrics: DashboardMetrics;
  contacts: Contact[];
};

export function StatsGrid({ metrics, contacts }: StatsGridProps) {
  const cards = [
    { label: "Total Campaigns", value: formatNumber(metrics.totalCampaigns), trend: "Live from campaign state", icon: Megaphone, tone: "from-indigo-500 to-blue-500" },
    { label: "Total Contacts", value: formatNumber(contacts.length), trend: "Manual + import enabled", icon: Users, tone: "from-emerald-500 to-teal-500" },
    { label: "Messages Sent", value: formatNumber(metrics.messagesSent), trend: "Email, WhatsApp, SMS, Voice", icon: Send, tone: "from-amber-500 to-orange-500" },
    { label: "Delivery Rate", value: `${metrics.deliveryRate}%`, trend: `${metrics.openRate}% open/read rate`, icon: Activity, tone: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => (
        <article className="rounded-[1.75rem] border border-white bg-white p-5 shadow-lg shadow-slate-200/70" key={stat.label}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
            </div>
            <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${stat.tone} text-white`}>
              <stat.icon className="size-6" />
            </div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600">
            <TrendingUp className="size-4" /> {stat.trend}
          </p>
        </article>
      ))}
    </section>
  );
}
