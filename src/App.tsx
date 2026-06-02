import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  channelMeta,
  createDefaultCampaignForm,
  defaultContactForm,
  initialCampaigns,
  initialContacts,
  initialSegments,
  initialTickets,
  tenantId,
} from "./data/mockData";
import { AdminPanel } from "./components/admin/AdminPanel";
import { BillingSection } from "./components/billing/BillingSection";
import { CampaignWorkspace } from "./components/campaigns/CampaignWorkspace";
import { ContactsPanel } from "./components/contacts/ContactsPanel";
import { CampaignForm } from "./components/forms/CampaignForm";
import { ContactForm } from "./components/forms/ContactForm";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { AnalyticsPanel } from "./components/sections/AnalyticsPanel";
import { ChannelGrid } from "./components/sections/ChannelGrid";
import { DataModelSection } from "./components/sections/DataModelSection";
import { HeroSection } from "./components/sections/HeroSection";
import { QuickActions } from "./components/sections/QuickActions";
import { StatsGrid } from "./components/sections/StatsGrid";
import { SupportAndRoadmap } from "./components/support/SupportAndRoadmap";
import { Modal, Toast } from "./components/ui";
import type { Campaign, CampaignFormState, CampaignStatus, Channel, Contact, ContactFormState, ModalType, Ticket } from "./types";
import { calculateDashboardMetrics, contactsToCsv, generateObjectId } from "./utils/format";

function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [query, setQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<Channel | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus | "all">("all");
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [walletBalance, setWalletBalance] = useState(48250);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toast, setToast] = useState("Frontend ready: forms, filters and actions are enabled.");
  const [campaignForm, setCampaignForm] = useState<CampaignFormState>(createDefaultCampaignForm());
  const [contactForm, setContactForm] = useState<ContactFormState>(defaultContactForm);
  const [ticketTitle, setTicketTitle] = useState("");

  const dashboardMetrics = useMemo(() => calculateDashboardMetrics(campaigns, contacts), [campaigns, contacts]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesQuery = [campaign.name, campaign.audienceLabel, campaign.type, campaign.provider.name]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesChannel = selectedChannel === "all" || campaign.channel === selectedChannel;
      const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
      return matchesQuery && matchesChannel && matchesStatus;
    });
  }, [campaigns, query, selectedChannel, selectedStatus]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone,
        contact.company,
        contact.group,
        contact.city,
        contact.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [contacts, query]);

  const openCampaignModal = (channel: Channel = "email") => {
    setCampaignForm(createDefaultCampaignForm(channel));
    setActiveModal("campaign");
  };

  const createCampaign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const segment = initialSegments.find((item) => item._id === campaignForm.audienceSegmentId) ?? initialSegments[0];
    const provider = channelMeta[campaignForm.channel].provider;
    const queued = segment.estimatedCount;
    const newCampaign: Campaign = {
      _id: generateObjectId(),
      tenantId,
      name: campaignForm.name || `${channelMeta[campaignForm.channel].label} Campaign`,
      channel: campaignForm.channel,
      type: campaignForm.type,
      audienceSegmentId: segment._id,
      audienceLabel: segment.name,
      status: campaignForm.scheduleMode === "instant" ? "running" : "scheduled",
      schedule: {
        mode: campaignForm.scheduleMode,
        runAt: campaignForm.scheduleMode === "instant" ? "Now" : campaignForm.runAt || "Today 06:00 PM",
        recurringRule: campaignForm.scheduleMode === "recurring" ? campaignForm.recurringRule : "none",
        timezone: "Asia/Kolkata",
      },
      content: {
        templateId: `${campaignForm.channel}_${campaignForm.type}_${Date.now()}`,
        subject: campaignForm.channel === "email" ? campaignForm.subject || campaignForm.name : undefined,
        body: campaignForm.message || "Personalized campaign message with {{name}} merge tag.",
      },
      provider: {
        name: provider,
        accountId: `${provider.toLowerCase().replaceAll(" ", "_")}_demo`,
        approvalStatus: campaignForm.channel === "email" ? "not-required" : "approved",
      },
      metrics: {
        queued,
        sent: campaignForm.scheduleMode === "instant" ? Math.floor(queued * 0.22) : 0,
        delivered: campaignForm.scheduleMode === "instant" ? Math.floor(queued * 0.21) : 0,
        opened: campaignForm.channel === "email" ? Math.floor(queued * 0.12) : 0,
        clicked: campaignForm.channel === "email" ? Math.floor(queued * 0.035) : 0,
        read: campaignForm.channel === "whatsapp" ? Math.floor(queued * 0.15) : 0,
        callAnswered: campaignForm.channel === "voice" ? Math.floor(queued * 0.11) : 0,
        failed: 0,
      },
      budget: Number(campaignForm.budget) || 0,
      createdBy: "admin@communiflow.app",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setCampaigns((current) => [newCampaign, ...current]);
    setActiveModal(null);
    setToast(`Campaign "${newCampaign.name}" created and ${newCampaign.status}.`);
  };

  const addContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact = createContactFromForm(contactForm);
    setContacts((current) => [newContact, ...current]);
    setContactForm(defaultContactForm);
    setActiveModal(null);
    setToast(`${newContact.firstName} ${newContact.lastName} added to contacts.`);
  };

  const createTicket = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ticket: Ticket = {
      _id: generateObjectId(),
      title: ticketTitle || "New support request",
      priority: "Medium",
      status: "Open",
      channel: "Technical",
    };
    setTickets((current) => [ticket, ...current]);
    setTicketTitle("");
    setActiveModal(null);
    setToast(`Support ticket "${ticket.title}" created.`);
  };

  const updateCampaignStatus = (id: string, status: CampaignStatus) => {
    setCampaigns((current) => current.map((campaign) => (campaign._id === id ? { ...campaign, status } : campaign)));
    setToast(`Campaign status updated to ${status}.`);
  };

  const duplicateCampaign = (campaign: Campaign) => {
    const duplicated: Campaign = {
      ...campaign,
      _id: generateObjectId(),
      name: `${campaign.name} Copy`,
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 10),
      metrics: { queued: campaign.metrics.queued, sent: 0, delivered: 0, opened: 0, clicked: 0, read: 0, callAnswered: 0, failed: 0 },
    };
    setCampaigns((current) => [duplicated, ...current]);
    setToast(`Draft duplicate created for "${campaign.name}".`);
  };

  const importDemoContacts = () => {
    setContacts((current) => [...createImportedContacts(), ...current]);
    setToast("Demo CSV/Excel import completed with 2 contacts.");
  };

  const exportContacts = () => {
    const url = URL.createObjectURL(new Blob([contactsToCsv(contacts)], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "communiflow-contacts.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Contacts exported as CSV.");
  };

  const selectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setWalletBalance((balance) => balance + 5000);
    setToast(`${plan} plan selected. Demo wallet credited with ₹5,000.`);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Sidebar />
      <main className="lg:pl-72">
        <Topbar
          query={query}
          setQuery={setQuery}
          onCreateCampaign={() => openCampaignModal("email")}
          onAddContact={() => setActiveModal("contact")}
          onImport={importDemoContacts}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
          <Toast message={toast} onClose={() => setToast("")} />
          <HeroSection onCreateCampaign={() => openCampaignModal("email")} />
          <StatsGrid metrics={dashboardMetrics} contacts={contacts} />
          <QuickActions
            onCreateCampaign={() => openCampaignModal("email")}
            onAddContact={() => setActiveModal("contact")}
            onImport={importDemoContacts}
            onExport={exportContacts}
            onTicket={() => setActiveModal("ticket")}
          />
          <CampaignWorkspace
            campaigns={filteredCampaigns}
            selectedChannel={selectedChannel}
            selectedStatus={selectedStatus}
            setSelectedChannel={setSelectedChannel}
            setSelectedStatus={setSelectedStatus}
            onCreateCampaign={openCampaignModal}
            onStatusChange={updateCampaignStatus}
            onDuplicate={duplicateCampaign}
          />
          <ChannelGrid onCreateCampaign={openCampaignModal} />
          <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
            <ContactsPanel
              contacts={filteredContacts}
              segments={initialSegments}
              onAddContact={() => setActiveModal("contact")}
              onImport={importDemoContacts}
              onExport={exportContacts}
            />
            <AnalyticsPanel metrics={dashboardMetrics} />
          </div>
          <BillingSection
            selectedPlan={selectedPlan}
            walletBalance={walletBalance}
            onSelectPlan={selectPlan}
            onInvoice={() => setToast("Demo invoice generated and ready for download.")}
          />
          <DataModelSection />
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <AdminPanel campaigns={campaigns} contacts={contacts} />
            <SupportAndRoadmap
              tickets={tickets}
              onCreateTicket={() => setActiveModal("ticket")}
              onResolveTicket={(id) => {
                setTickets((current) => current.map((ticket) => (ticket._id === id ? { ...ticket, status: "Resolved" } : ticket)));
                setToast("Ticket marked as resolved.");
              }}
            />
          </div>
        </div>
      </main>

      <Modal open={activeModal === "campaign"} title="Create Campaign" onClose={() => setActiveModal(null)}>
        <CampaignForm value={campaignForm} segments={initialSegments} onChange={setCampaignForm} onSubmit={createCampaign} />
      </Modal>
      <Modal open={activeModal === "contact"} title="Add Contact" onClose={() => setActiveModal(null)}>
        <ContactForm value={contactForm} onChange={setContactForm} onSubmit={addContact} />
      </Modal>
      <Modal open={activeModal === "ticket"} title="Create Support Ticket" onClose={() => setActiveModal(null)}>
        <form className="space-y-4" onSubmit={createTicket}>
          <label className="block">
            <span className="form-label">Issue title</span>
            <input
              className="form-input"
              value={ticketTitle}
              onChange={(event) => setTicketTitle(event.target.value)}
              placeholder="e.g. WhatsApp template approval stuck"
            />
          </label>
          <button className="primary-button w-full justify-center" type="submit">
            Create ticket
          </button>
        </form>
      </Modal>
    </div>
  );
}

function createContactFromForm(form: ContactFormState): Contact {
  return {
    _id: generateObjectId(),
    tenantId,
    firstName: form.firstName || "New",
    lastName: form.lastName || "Contact",
    email: form.email || "new.contact@example.com",
    phone: form.phone || "+91 90000 00000",
    company: form.company || "Demo Business",
    city: form.city || "India",
    group: form.group,
    lifecycleStage: form.lifecycleStage,
    consent: { email: true, whatsapp: true, sms: true, voice: false },
    channels: ["email", "whatsapp", "sms"],
    tags: ["manual-entry"],
    source: "Manual Add",
    lastActivityAt: "Just now",
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

function createImportedContacts(): Contact[] {
  return [
    {
      _id: generateObjectId(),
      tenantId,
      firstName: "Riya",
      lastName: "Kapoor",
      email: "riya.kapoor@example.com",
      phone: "+91 95555 10101",
      company: "LocalMart",
      city: "Jaipur",
      group: "Leads",
      lifecycleStage: "lead",
      consent: { email: true, whatsapp: true, sms: true, voice: false },
      channels: ["email", "whatsapp", "sms"],
      tags: ["csv-import", "retail"],
      source: "CSV Import",
      lastActivityAt: "Just imported",
      createdAt: new Date().toISOString().slice(0, 10),
    },
    {
      _id: generateObjectId(),
      tenantId,
      firstName: "Karan",
      lastName: "Malhotra",
      email: "karan.malhotra@example.com",
      phone: "+91 96666 20202",
      company: "Prime Estates",
      city: "Gurugram",
      group: "Subscribers",
      lifecycleStage: "subscriber",
      consent: { email: true, whatsapp: true, sms: false, voice: true },
      channels: ["email", "whatsapp", "voice"],
      tags: ["excel-import", "real-estate"],
      source: "Excel Import",
      lastActivityAt: "Just imported",
      createdAt: new Date().toISOString().slice(0, 10),
    },
  ];
}

export default App;
