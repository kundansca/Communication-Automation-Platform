import { Download, Upload, UserPlus } from "lucide-react";
import { channelMeta } from "../../data/mockData";
import type { Contact, Segment } from "../../types";
import { formatNumber } from "../../utils/format";
import { EmptyState } from "../ui";

type ContactsPanelProps = {
  contacts: Contact[];
  segments: Segment[];
  onAddContact: () => void;
  onImport: () => void;
  onExport: () => void;
};

export function ContactsPanel({ contacts, segments, onAddContact, onImport, onExport }: ContactsPanelProps) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="contacts">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Contact management</p>
          <h2 className="mt-2 text-2xl font-black">Audience database</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="icon-button" onClick={onAddContact} title="Add contact" type="button">
            <UserPlus className="size-5" />
          </button>
          <button className="icon-button" onClick={onImport} title="Import contacts" type="button">
            <Upload className="size-5" />
          </button>
          <button className="icon-button" onClick={onExport} title="Export contacts" type="button">
            <Download className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {segments.map((segment) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={segment._id}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{segment.name}</p>
            <p className="mt-2 text-2xl font-black">{formatNumber(segment.estimatedCount)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {contacts.length === 0 ? (
          <EmptyState title="No contacts found" description="Try search reset or import demo contacts." actionLabel="Import contacts" onAction={onImport} />
        ) : (
          contacts.map((contact) => (
            <div className="grid gap-3 rounded-3xl border border-slate-100 p-4 md:grid-cols-[1.2fr_1fr_1fr_0.9fr] md:items-center" key={contact._id}>
              <div>
                <p className="font-black text-slate-900">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-xs font-bold text-slate-400">{contact.email}</p>
                <p className="mt-1 text-xs font-mono text-slate-400">{contact._id}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{contact.company}</p>
                <p className="text-xs font-semibold text-slate-500">{contact.city}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {contact.channels.map((channel) => (
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-black text-indigo-700" key={channel}>
                    {channelMeta[channel].label}
                  </span>
                ))}
              </div>
              <div>
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{contact.group}</span>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {contact.source} • {contact.lastActivityAt}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
