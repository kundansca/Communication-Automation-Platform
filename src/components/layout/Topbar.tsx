import { Rocket, Search, Upload, UserPlus, Zap } from "lucide-react";
import { navItems } from "../../data/mockData";

type TopbarProps = {
  query: string;
  setQuery: (value: string) => void;
  onCreateCampaign: () => void;
  onAddContact: () => void;
  onImport: () => void;
};

export function Topbar({ query, setQuery, onCreateCampaign, onAddContact, onImport }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-[#f4f7fb]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
              <Zap className="size-5" />
            </div>
            <div>
              <p className="font-black">CommuniFlow</p>
              <p className="text-xs text-slate-500">MongoDB-ready SaaS</p>
            </div>
          </div>

          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-white bg-white px-12 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-200 focus:ring-4 focus:ring-indigo-100"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search campaigns, contacts, providers..."
              type="search"
              value={query}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <button className="secondary-button" onClick={onImport} type="button">
              <Upload className="size-4" /> Import
            </button>
            <button className="secondary-button" onClick={onAddContact} type="button">
              <UserPlus className="size-4" /> Contact
            </button>
            <button className="primary-button col-span-2" onClick={onCreateCampaign} type="button">
              <Rocket className="size-4" /> New Campaign
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {navItems.map((item) => (
            <a
              className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm"
              href={`#${item.href}`}
              key={item.label}
            >
              <item.icon className="size-4" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
