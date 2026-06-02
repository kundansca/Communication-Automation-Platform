import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { channelMeta } from "../../data/mockData";
import type { Campaign, CampaignFormState, Channel, ScheduleMode, Segment } from "../../types";
import { formatNumber } from "../../utils/format";

type CampaignFormProps = {
  value: CampaignFormState;
  segments: Segment[];
  onChange: (value: CampaignFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CampaignForm({ value, segments, onChange, onSubmit }: CampaignFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="form-label">Campaign name</span>
          <input className="form-input" value={value.name} onChange={(event) => onChange({ ...value, name: event.target.value })} placeholder="e.g. Weekend offer campaign" />
        </label>
        <label className="block">
          <span className="form-label">Channel</span>
          <select className="form-input" value={value.channel} onChange={(event) => onChange({ ...value, channel: event.target.value as Channel })}>
            {Object.entries(channelMeta).map(([key, item]) => (
              <option value={key} key={key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="form-label">Campaign type</span>
          <select className="form-input" value={value.type} onChange={(event) => onChange({ ...value, type: event.target.value as Campaign["type"] })}>
            <option value="promotional">Promotional</option>
            <option value="transactional">Transactional</option>
            <option value="notification">Notification</option>
            <option value="otp">OTP</option>
          </select>
        </label>
        <label className="block">
          <span className="form-label">Audience segment</span>
          <select className="form-input" value={value.audienceSegmentId} onChange={(event) => onChange({ ...value, audienceSegmentId: event.target.value })}>
            {segments.map((segment) => (
              <option value={segment._id} key={segment._id}>
                {segment.name} ({formatNumber(segment.estimatedCount)})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="form-label">Schedule mode</span>
          <select className="form-input" value={value.scheduleMode} onChange={(event) => onChange({ ...value, scheduleMode: event.target.value as ScheduleMode })}>
            <option value="instant">Instant</option>
            <option value="scheduled">Scheduled</option>
            <option value="recurring">Recurring</option>
          </select>
        </label>
        {value.scheduleMode !== "instant" ? (
          <label className="block">
            <span className="form-label">Run time</span>
            <input className="form-input" value={value.runAt} onChange={(event) => onChange({ ...value, runAt: event.target.value })} placeholder="Today 06:00 PM" />
          </label>
        ) : null}
        {value.scheduleMode === "recurring" ? (
          <label className="block">
            <span className="form-label">Recurring rule</span>
            <select
              className="form-input"
              value={value.recurringRule}
              onChange={(event) => onChange({ ...value, recurringRule: event.target.value as Campaign["schedule"]["recurringRule"] })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
        ) : null}
        {value.channel === "email" ? (
          <label className="block sm:col-span-2">
            <span className="form-label">Email subject</span>
            <input className="form-input" value={value.subject} onChange={(event) => onChange({ ...value, subject: event.target.value })} placeholder="Your offer is live" />
          </label>
        ) : null}
        <label className="block sm:col-span-2">
          <span className="form-label">Message / template body</span>
          <textarea
            className="form-input min-h-28 resize-y"
            value={value.message}
            onChange={(event) => onChange({ ...value, message: event.target.value })}
            placeholder="Hi {{name}}, write your message here..."
          />
        </label>
        <label className="block">
          <span className="form-label">Budget</span>
          <input className="form-input" min="0" type="number" value={value.budget} onChange={(event) => onChange({ ...value, budget: event.target.value })} />
        </label>
      </div>
      <button className="primary-button w-full justify-center" type="submit">
        <Send className="size-4" /> Save and launch
      </button>
    </form>
  );
}
