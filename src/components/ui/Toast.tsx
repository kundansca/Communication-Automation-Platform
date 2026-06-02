import { CheckCircle2, X } from "lucide-react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-900 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="size-5 shrink-0" />
        <p className="text-sm font-bold">{message}</p>
      </div>
      <button className="self-start rounded-full bg-white p-2 text-emerald-700 sm:self-auto" onClick={onClose} type="button">
        <X className="size-4" />
      </button>
    </div>
  );
}
