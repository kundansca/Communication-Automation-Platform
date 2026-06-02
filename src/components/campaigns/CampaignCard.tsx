import { PauseCircle, PlayCircle, RefreshCw, Square } from "lucide-react";
import { channelMeta } from "../../data/mockData";
import type { Campaign } from "../../types";
import { formatNumber, titleCase } from "../../utils/format";
import { MetricPill, StatusBadge } from "../ui";

type CampaignCardProps = {
  campaign: Campaign;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onDuplicate: () => void;
};

export function CampaignCard({ campaign, onPause, onResume, onStop, onDuplicate }: CampaignCardProps) {
  const meta = channelMeta[campaign.channel];
  const delivery = campaign.metrics.sent ? Math.round((campaign.metrics.delivered / campaign.metrics.sent) * 1000) / 10 : 0;

  return (
    <article className="rounded-3xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:shadow-lg">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-4">
          <div className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white`}>
            <meta.icon className="size-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black">{campaign.name}</h3>
              <StatusBadge status={campaign.status} />
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {meta.label} • {titleCase(campaign.type)} • {campaign.audienceLabel} • {campaign.schedule.runAt}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{campaign.content.body}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:min-w-[520px]">
          <MetricPill label="Queued" value={formatNumber(campaign.metrics.queued)} />
          <MetricPill label="Sent" value={formatNumber(campaign.metrics.sent)} />
          <MetricPill label="Delivery" value={`${delivery}%`} />
          <MetricPill label="Budget" value={`₹${formatNumber(campaign.budget)}`} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs font-bold text-slate-500">
          Mongo ID: <span className="font-mono text-slate-700">{campaign._id}</span> • Provider: {campaign.provider.name}
        </p>
        <div className="flex flex-wrap gap-2">
          {campaign.status === "running" ? (
            <button className="tiny-button" onClick={onPause} type="button">
              <PauseCircle className="size-4" /> Pause
            </button>
          ) : (
            <button className="tiny-button" onClick={onResume} type="button">
              <PlayCircle className="size-4" /> Resume
            </button>
          )}
          <button className="tiny-button" onClick={onStop} type="button">
            <Square className="size-4" /> Stop
          </button>
          <button className="tiny-button" onClick={onDuplicate} type="button">
            <RefreshCw className="size-4" /> Duplicate
          </button>
        </div>
      </div>
    </article>
  );
}
