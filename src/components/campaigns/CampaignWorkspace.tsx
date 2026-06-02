import { Plus } from "lucide-react";
import { channelMeta } from "../../data/mockData";
import type { Campaign, CampaignStatus, Channel } from "../../types";
import { titleCase } from "../../utils/format";
import { EmptyState } from "../ui";
import { CampaignCard } from "./CampaignCard";

type CampaignWorkspaceProps = {
  campaigns: Campaign[];
  selectedChannel: Channel | "all";
  selectedStatus: CampaignStatus | "all";
  setSelectedChannel: (value: Channel | "all") => void;
  setSelectedStatus: (value: CampaignStatus | "all") => void;
  onCreateCampaign: (channel: Channel) => void;
  onStatusChange: (id: string, status: CampaignStatus) => void;
  onDuplicate: (campaign: Campaign) => void;
};

export function CampaignWorkspace({
  campaigns,
  selectedChannel,
  selectedStatus,
  setSelectedChannel,
  setSelectedStatus,
  onCreateCampaign,
  onStatusChange,
  onDuplicate,
}: CampaignWorkspaceProps) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="campaigns">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="eyebrow">Campaign monitoring</p>
          <h2 className="mt-2 text-2xl font-black">Live campaign command center</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Create, pause, resume, stop and duplicate campaigns from the frontend.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <select className="form-input" value={selectedChannel} onChange={(event) => setSelectedChannel(event.target.value as Channel | "all")}>
            <option value="all">All channels</option>
            {Object.entries(channelMeta).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
          <select className="form-input" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as CampaignStatus | "all")}>
            <option value="all">All status</option>
            {["draft", "scheduled", "running", "paused", "completed", "stopped"].map((status) => (
              <option key={status} value={status}>
                {titleCase(status)}
              </option>
            ))}
          </select>
          <button className="primary-button justify-center" onClick={() => onCreateCampaign("email")} type="button">
            <Plus className="size-4" /> New
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {campaigns.length === 0 ? (
          <EmptyState title="No campaigns found" description="Try changing filters or create a new campaign." actionLabel="Create campaign" onAction={() => onCreateCampaign("email")} />
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              campaign={campaign}
              key={campaign._id}
              onDuplicate={() => onDuplicate(campaign)}
              onPause={() => onStatusChange(campaign._id, "paused")}
              onResume={() => onStatusChange(campaign._id, "running")}
              onStop={() => onStatusChange(campaign._id, "stopped")}
            />
          ))
        )}
      </div>
    </section>
  );
}
