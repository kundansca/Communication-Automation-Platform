import { CheckCircle2, FileText, Wallet } from "lucide-react";
import { plans } from "../../data/mockData";
import { formatNumber } from "../../utils/format";
import { SectionHeader } from "../ui";

type BillingSectionProps = {
  selectedPlan: string;
  walletBalance: number;
  onSelectPlan: (plan: string) => void;
  onInvoice: () => void;
};

export function BillingSection({ selectedPlan, walletBalance, onSelectPlan, onInvoice }: BillingSectionProps) {
  return (
    <section id="billing">
      <SectionHeader
        eyebrow="Billing module"
        title="Subscriptions, wallet and usage tracking"
        description="Plan selection, demo wallet credit and invoice generation actions are active."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.7fr_1fr]">
        <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
          <Wallet className="size-10 text-indigo-600" />
          <p className="mt-5 text-sm font-bold text-slate-500">Wallet Balance</p>
          <p className="mt-2 text-4xl font-black">₹{formatNumber(walletBalance)}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Selected plan: <strong>{selectedPlan}</strong>. Usage tracking ready for pay-per-message billing.
          </p>
          <button className="primary-button mt-5 w-full justify-center" onClick={onInvoice} type="button">
            <FileText className="size-4" /> Generate invoice
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              className={`relative rounded-[2rem] border p-6 shadow-xl ${
                selectedPlan === plan.name
                  ? "border-indigo-200 bg-slate-950 text-white shadow-indigo-950/20"
                  : "border-white bg-white text-slate-950 shadow-slate-200/70"
              }`}
              key={plan.name}
            >
              {plan.featured ? <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-slate-950">Popular</span> : null}
              <p className={`text-sm font-bold uppercase tracking-[0.24em] ${selectedPlan === plan.name ? "text-cyan-200" : "text-indigo-500"}`}>{plan.name}</p>
              <p className="mt-5 text-3xl font-black">
                {plan.price}
                <span className={`text-sm font-bold ${selectedPlan === plan.name ? "text-slate-300" : "text-slate-500"}`}>/month</span>
              </p>
              <p className={`mt-3 text-sm leading-6 ${selectedPlan === plan.name ? "text-slate-300" : "text-slate-600"}`}>{plan.description}</p>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div className="flex items-center gap-3" key={feature}>
                    <CheckCircle2 className={`size-5 ${selectedPlan === plan.name ? "text-cyan-300" : "text-emerald-500"}`} />
                    <span className="text-sm font-bold">{feature}</span>
                  </div>
                ))}
              </div>
              <button
                className={`mt-7 w-full rounded-2xl px-4 py-3 text-sm font-black ${selectedPlan === plan.name ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}
                onClick={() => onSelectPlan(plan.name)}
                type="button"
              >
                {selectedPlan === plan.name ? "Current plan" : `Choose ${plan.name}`}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
