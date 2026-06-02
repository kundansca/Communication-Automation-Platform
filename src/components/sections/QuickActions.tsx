import { Download, Headphones, Rocket, Upload, UserPlus } from "lucide-react";

type QuickActionsProps = {
  onCreateCampaign: () => void;
  onAddContact: () => void;
  onImport: () => void;
  onExport: () => void;
  onTicket: () => void;
};

export function QuickActions({ onCreateCampaign, onAddContact, onImport, onExport, onTicket }: QuickActionsProps) {
  const actions = [
    { label: "Create campaign", icon: Rocket, onClick: onCreateCampaign, primary: true },
    { label: "Add contact", icon: UserPlus, onClick: onAddContact },
    { label: "Import CSV/Excel", icon: Upload, onClick: onImport },
    { label: "Export contacts", icon: Download, onClick: onExport },
    { label: "Support ticket", icon: Headphones, onClick: onTicket },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {actions.map((action) => (
        <button
          className={`flex items-center justify-center gap-2 rounded-3xl px-4 py-4 text-sm font-black shadow-lg transition hover:-translate-y-0.5 ${
            action.primary ? "bg-slate-950 text-white shadow-slate-900/15" : "border border-white bg-white text-slate-700 shadow-slate-200/70"
          }`}
          key={action.label}
          onClick={action.onClick}
          type="button"
        >
          <action.icon className="size-5" />
          {action.label}
        </button>
      ))}
    </section>
  );
}
