import type { Campaign, Contact, DashboardMetrics } from "../types";

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ");
}

export function generateObjectId() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

export function calculateDashboardMetrics(campaigns: Campaign[], contacts: Contact[]): DashboardMetrics {
  const sent = campaigns.reduce((total, campaign) => total + campaign.metrics.sent, 0);
  const delivered = campaigns.reduce((total, campaign) => total + campaign.metrics.delivered, 0);
  const opened = campaigns.reduce((total, campaign) => total + campaign.metrics.opened + campaign.metrics.read, 0);
  const clicked = campaigns.reduce((total, campaign) => total + campaign.metrics.clicked, 0);
  const calls = campaigns.reduce((total, campaign) => total + campaign.metrics.callAnswered, 0);

  return {
    totalCampaigns: campaigns.length,
    totalContacts: contacts.length,
    messagesSent: sent,
    deliveryRate: sent ? Math.round((delivered / sent) * 1000) / 10 : 0,
    openRate: sent ? Math.round((opened / sent) * 1000) / 10 : 0,
    clickRate: sent ? Math.round((clicked / sent) * 1000) / 10 : 0,
    callSuccessRate: sent ? Math.round((calls / sent) * 1000) / 10 : 0,
  };
}

export function contactsToCsv(contacts: Contact[]) {
  const header = ["_id", "firstName", "lastName", "email", "phone", "company", "group", "channels", "source"];
  const rows = contacts.map((contact) =>
    [
      contact._id,
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone,
      contact.company,
      contact.group,
      contact.channels.join("|"),
      contact.source,
    ]
      .map((value) => `"${value}"`)
      .join(","),
  );

  return [header.join(","), ...rows].join("\n");
}
