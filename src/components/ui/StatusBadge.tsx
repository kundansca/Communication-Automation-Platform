import type { CampaignStatus } from "../../types";
import { titleCase } from "../../utils/format";

const statusColorMap: Record<CampaignStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  scheduled: "bg-blue-50 text-blue-700",
  running: "bg-emerald-50 text-emerald-700",
  paused: "bg-amber-50 text-amber-700",
  completed: "bg-indigo-50 text-indigo-700",
  stopped: "bg-rose-50 text-rose-700",
};

export function StatusBadge({ status }: { status: CampaignStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${statusColorMap[status]}`}>{titleCase(status)}</span>;
}
