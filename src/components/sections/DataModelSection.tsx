import { Database } from "lucide-react";
import { mongoCollections } from "../../data/mockData";
import { SectionHeader } from "../ui";

export function DataModelSection() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="data-model">
      <SectionHeader
        eyebrow="MongoDB data structure"
        title="Industry-level document model"
        description="Frontend dummy data is shaped for a future MongoDB backend, not MySQL/PostgreSQL."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mongoCollections.map((collection) => (
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4" key={collection.name}>
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm font-black text-indigo-700">{collection.name}</p>
              <Database className="size-5 text-indigo-500" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {collection.fields.map((field) => (
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-600 shadow-sm" key={field}>
                  {field}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
