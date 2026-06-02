import { Filter, Plus } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <Filter className="mx-auto size-10 text-slate-400" />
      <p className="mt-4 text-lg font-black">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <button className="primary-button mx-auto mt-5 justify-center" onClick={onAction} type="button">
        <Plus className="size-4" /> {actionLabel}
      </button>
    </div>
  );
}
