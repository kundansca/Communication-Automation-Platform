import type { LucideIcon } from "lucide-react";

export type Channel = "email" | "whatsapp" | "sms" | "voice";
export type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "stopped";
export type ScheduleMode = "instant" | "scheduled" | "recurring";
export type LifecycleStage = "lead" | "customer" | "premium" | "subscriber" | "partner";
export type ModalType = "campaign" | "contact" | "ticket" | null;

export type DashboardMetrics = {
  totalCampaigns: number;
  totalContacts: number;
  messagesSent: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  callSuccessRate: number;
};

export type Contact = {
  _id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  group: string;
  lifecycleStage: LifecycleStage;
  consent: Record<Channel, boolean>;
  channels: Channel[];
  tags: string[];
  source: string;
  lastActivityAt: string;
  createdAt: string;
};

export type Segment = {
  _id: string;
  tenantId: string;
  name: string;
  description: string;
  filters: Record<string, string | boolean>;
  estimatedCount: number;
};

export type Campaign = {
  _id: string;
  tenantId: string;
  name: string;
  channel: Channel;
  type: "promotional" | "transactional" | "notification" | "otp";
  audienceSegmentId: string;
  audienceLabel: string;
  status: CampaignStatus;
  schedule: {
    mode: ScheduleMode;
    runAt: string;
    recurringRule: "none" | "daily" | "weekly" | "monthly";
    timezone: string;
  };
  content: {
    templateId: string;
    subject?: string;
    body: string;
    mediaUrl?: string;
  };
  provider: {
    name: string;
    accountId: string;
    approvalStatus: "approved" | "pending" | "not-required";
  };
  metrics: {
    queued: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    read: number;
    callAnswered: number;
    failed: number;
  };
  budget: number;
  createdBy: string;
  createdAt: string;
};

export type Ticket = {
  _id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In progress" | "Resolved";
  channel: "Billing" | "Technical" | "Template Approval" | "Import";
};

export type BillingPlan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

export type CampaignFormState = {
  name: string;
  channel: Channel;
  type: Campaign["type"];
  audienceSegmentId: string;
  scheduleMode: ScheduleMode;
  runAt: string;
  recurringRule: Campaign["schedule"]["recurringRule"];
  subject: string;
  message: string;
  budget: string;
};

export type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  group: string;
  lifecycleStage: LifecycleStage;
};

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type ChannelMeta = {
  label: string;
  icon: LucideIcon;
  provider: string;
  gradient: string;
  badge: string;
  description: string;
  features: string[];
};
