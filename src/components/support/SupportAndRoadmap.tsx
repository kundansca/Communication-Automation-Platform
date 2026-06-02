import { CheckCircle2, Headphones, Plus, Sparkles } from "lucide-react";
import { roadmap } from "../../data/mockData";
import type { Ticket } from "../../types";

type SupportAndRoadmapProps = {
  tickets: Ticket[];
  onCreateTicket: () => void;
  onResolveTicket: (id: string) => void;
};

export function SupportAndRoadmap({ tickets, onCreateTicket, onResolveTicket }: SupportAndRoadmapProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Support</p>
            <h2 className="mt-2 text-2xl font-black">Ticket system</h2>
          </div>
          <Headphones className="size-10 text-indigo-600" />
        </div>
        <button className="primary-button mt-5 w-full justify-center" onClick={onCreateTicket} type="button">
          <Plus className="size-4" /> New ticket
        </button>
        <div className="mt-6 space-y-4">
          {tickets.map((ticket) => (
            <div className="rounded-3xl bg-slate-50 p-4" key={ticket._id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black">{ticket.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {ticket.channel} • {ticket.priority} priority
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">{ticket.status}</span>
              </div>
              {ticket.status !== "Resolved" ? (
                <button className="tiny-button mt-4" onClick={() => onResolveTicket(ticket._id)} type="button">
                  <CheckCircle2 className="size-4" /> Resolve
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white bg-gradient-to-br from-indigo-600 to-slate-950 p-6 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">Future scope</p>
            <h2 className="mt-2 text-2xl font-black">AI and enterprise roadmap</h2>
          </div>
          <Sparkles className="size-10 text-cyan-200" />
        </div>
        <div className="mt-6 grid gap-3">
          {roadmap.map((item) => (
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur" key={item}>
              <CheckCircle2 className="size-5 shrink-0 text-cyan-200" />
              <span className="text-sm font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
