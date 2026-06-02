import type { FormEvent } from "react";
import { UserPlus } from "lucide-react";
import { initialSegments } from "../../data/mockData";
import type { ContactFormState, LifecycleStage } from "../../types";

type ContactFormProps = {
  value: ContactFormState;
  onChange: (value: ContactFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ContactForm({ value, onChange, onSubmit }: ContactFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="form-label">First name</span>
          <input className="form-input" value={value.firstName} onChange={(event) => onChange({ ...value, firstName: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">Last name</span>
          <input className="form-input" value={value.lastName} onChange={(event) => onChange({ ...value, lastName: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">Email</span>
          <input className="form-input" type="email" value={value.email} onChange={(event) => onChange({ ...value, email: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">Phone</span>
          <input className="form-input" value={value.phone} onChange={(event) => onChange({ ...value, phone: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">Company</span>
          <input className="form-input" value={value.company} onChange={(event) => onChange({ ...value, company: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">City</span>
          <input className="form-input" value={value.city} onChange={(event) => onChange({ ...value, city: event.target.value })} />
        </label>
        <label className="block">
          <span className="form-label">Group</span>
          <select className="form-input" value={value.group} onChange={(event) => onChange({ ...value, group: event.target.value })}>
            {initialSegments.map((segment) => (
              <option key={segment._id}>{segment.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="form-label">Lifecycle stage</span>
          <select className="form-input" value={value.lifecycleStage} onChange={(event) => onChange({ ...value, lifecycleStage: event.target.value as LifecycleStage })}>
            <option value="lead">Lead</option>
            <option value="customer">Customer</option>
            <option value="premium">Premium</option>
            <option value="subscriber">Subscriber</option>
            <option value="partner">Partner</option>
          </select>
        </label>
      </div>
      <button className="primary-button w-full justify-center" type="submit">
        <UserPlus className="size-4" /> Save contact
      </button>
    </form>
  );
}
