import { CheckCircle2, Plus } from "lucide-react";
import { channelMeta } from "../../data/mockData";
import type { Channel } from "../../types";
import { SectionHeader } from "../ui";

type ChannelGridProps = {
  onCreateCampaign: (channel: Channel) => void;
};

export function ChannelGrid({ onCreateCampaign }: ChannelGridProps) {
  return (
    <section id="channels">
      <SectionHeader
        eyebrow="Supported channels"
        title="Every module is actionable"
        description="Buttons create pre-filled campaign flows for each communication channel."
      />
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {Object.entries(channelMeta).map(([key, channel]) => (
          <article className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-slate-200/70" key={key}>
            <div className={`bg-gradient-to-br ${channel.gradient} p-6 text-white`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-black">{channel.label} Campaigns</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">{channel.description}</p>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <channel.icon className="size-6" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">{channel.provider}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">{channel.badge}</span>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {channel.features.map((feature) => (
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3" key={feature}>
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{feature}</span>
                </div>
              ))}
              <button className="primary-button justify-center sm:col-span-2" onClick={() => onCreateCampaign(key as Channel)} type="button">
                <Plus className="size-4" /> Create {channel.label} campaign
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
