import { FormEvent, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Headphones,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Mail,
  Megaphone,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PauseCircle,
  PhoneCall,
  PlayCircle,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Square,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type Channel = "email" | "whatsapp" | "sms" | "voice";
type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "stopped";
type ScheduleMode = "instant" | "scheduled" | "recurring";
type LifecycleStage = "lead" | "customer" | "premium" | "subscriber" | "partner";
type ModalType = "campaign" | "contact" | "ticket" | "template" | null;

type Contact = {
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
  consent: {
    email: boolean;
    whatsapp: boolean;
    sms: boolean;
    voice: boolean;
  };
  channels: Channel[];
  tags: string[];
  source: string;
  lastActivityAt: string;
  createdAt: string;
};

type Segment = {
  _id: string;
  tenantId: string;
  name: string;
  description: string;
  filters: Record<string, string | boolean>;
  estimatedCount: number;
};

type Campaign = {
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

type Ticket = {
  _id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In progress" | "Resolved";
  channel: "Billing" | "Technical" | "Template Approval" | "Import";
};

type BillingPlan = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  features: string[];
};

type CampaignFormState = {
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

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  group: string;
  lifecycleStage: LifecycleStage;
};

const tenantId = "665f0f927351a77b9c8f0011";

const navItems = [
  { label: "Dashboard", href: "dashboard", icon: LayoutDashboard },
  { label: "Contacts", href: "contacts", icon: Users },
  { label: "Campaigns", href: "campaigns", icon: Megaphone },
  { label: "Analytics", href: "analytics", icon: BarChart3 },
  { label: "Billing", href: "billing", icon: Wallet },
  { label: "Data Model", href: "data-model", icon: Database },
  { label: "Admin", href: "admin", icon: ShieldCheck },
];

const channelMeta: Record<
  Channel,
  {
    label: string;
    icon: LucideIcon;
    provider: string;
    gradient: string;
    badge: string;
    description: string;
    features: string[];
  }
> = {
  email: {
    label: "Email",
    icon: Mail,
    provider: "Resend",
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    badge: "Open & click tracking",
    description: "Rich text campaigns, attachments, templates and delivery analytics.",
    features: ["Rich text editor", "Bulk email", "Open tracking", "Click tracking"],
  },
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    provider: "Meta Cloud API",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    badge: "Template + media ready",
    description: "Template messages, media support, delivery and read receipts.",
    features: ["Template message", "Media support", "Bulk send", "Read status"],
  },
  sms: {
    label: "SMS",
    icon: Bell,
    provider: "MSG91",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    badge: "OTP + transactional",
    description: "Promotional, transactional and OTP SMS with provider reports.",
    features: ["Bulk SMS", "OTP SMS", "Promotional SMS", "Delivery reports"],
  },
  voice: {
    label: "Voice",
    icon: PhoneCall,
    provider: "Exotel",
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    badge: "Calls + TTS",
    description: "Bulk voice calling with recording upload, TTS and call status tracking.",
    features: ["Voice upload", "Text to speech", "Bulk calls", "Call tracking"],
  },
};

const initialSegments: Segment[] = [
  {
    _id: "665f11277351a77b9c8f1001",
    tenantId,
    name: "Premium Customers",
    description: "High-value buyers with WhatsApp and Email consent.",
    filters: { lifecycleStage: "premium", hasWhatsappConsent: true },
    estimatedCount: 7420,
  },
  {
    _id: "665f11277351a77b9c8f1002",
    tenantId,
    name: "Leads",
    description: "Imported enquiries from website, forms and sales team.",
    filters: { lifecycleStage: "lead", isConverted: false },
    estimatedCount: 18220,
  },
  {
    _id: "665f11277351a77b9c8f1003",
    tenantId,
    name: "Customers",
    description: "All customers with verified email or phone details.",
    filters: { lifecycleStage: "customer", verified: true },
    estimatedCount: 28400,
  },
  {
    _id: "665f11277351a77b9c8f1004",
    tenantId,
    name: "Subscribers",
    description: "Newsletter, offers and alerts subscribers.",
    filters: { lifecycleStage: "subscriber", marketingConsent: true },
    estimatedCount: 32380,
  },
];

const initialContacts: Contact[] = [
  {
    _id: "665f20c87351a77b9c8f2001",
    tenantId,
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    company: "BlueCart Retail",
    city: "Delhi",
    group: "Premium Customers",
    lifecycleStage: "premium",
    consent: { email: true, whatsapp: true, sms: true, voice: false },
    channels: ["email", "whatsapp", "sms"],
    tags: ["high-ltv", "festival-offers"],
    source: "Shopify Import",
    lastActivityAt: "2 min ago",
    createdAt: "2026-05-20",
  },
  {
    _id: "665f20c87351a77b9c8f2002",
    tenantId,
    firstName: "Neha",
    lastName: "Verma",
    email: "neha.verma@example.com",
    phone: "+91 99887 77665",
    company: "EduSpark Academy",
    city: "Pune",
    group: "Leads",
    lifecycleStage: "lead",
    consent: { email: true, whatsapp: false, sms: true, voice: true },
    channels: ["email", "sms", "voice"],
    tags: ["admission", "warm-lead"],
    source: "Website Form",
    lastActivityAt: "16 min ago",
    createdAt: "2026-05-22",
  },
  {
    _id: "665f20c87351a77b9c8f2003",
    tenantId,
    firstName: "Medicare",
    lastName: "Plus",
    email: "ops@medicareplus.example",
    phone: "+91 91234 56780",
    company: "Medicare Plus",
    city: "Mumbai",
    group: "Customers",
    lifecycleStage: "customer",
    consent: { email: true, whatsapp: true, sms: true, voice: true },
    channels: ["email", "whatsapp", "sms", "voice"],
    tags: ["healthcare", "appointment-reminders"],
    source: "CRM Sync",
    lastActivityAt: "1 hr ago",
    createdAt: "2026-05-17",
  },
  {
    _id: "665f20c87351a77b9c8f2004",
    tenantId,
    firstName: "Urban",
    lastName: "Nest Realty",
    email: "sales@urbannest.example",
    phone: "+91 90000 11223",
    company: "Urban Nest Realty",
    city: "Bengaluru",
    group: "Subscribers",
    lifecycleStage: "subscriber",
    consent: { email: true, whatsapp: true, sms: false, voice: false },
    channels: ["email", "whatsapp"],
    tags: ["real-estate", "newsletter"],
    source: "Excel Upload",
    lastActivityAt: "Today",
    createdAt: "2026-05-26",
  },
];

const initialCampaigns: Campaign[] = [
  {
    _id: "665f32107351a77b9c8f3001",
    tenantId,
    name: "Summer Sale Blast",
    channel: "email",
    type: "promotional",
    audienceSegmentId: "665f11277351a77b9c8f1003",
    audienceLabel: "Customers",
    status: "running",
    schedule: { mode: "instant", runAt: "Now", recurringRule: "none", timezone: "Asia/Kolkata" },
    content: {
      templateId: "email_summer_sale_v1",
      subject: "Flat 30% off for our customers",
      body: "Announce seasonal discounts with product recommendations.",
    },
    provider: { name: "Resend", accountId: "resend_prod_01", approvalStatus: "not-required" },
    metrics: { queued: 28400, sent: 24180, delivered: 23744, opened: 16520, clicked: 4820, read: 0, callAnswered: 0, failed: 436 },
    budget: 18000,
    createdBy: "admin@communiflow.app",
    createdAt: "2026-06-01",
  },
  {
    _id: "665f32107351a77b9c8f3002",
    tenantId,
    name: "Admission Reminder",
    channel: "whatsapp",
    type: "notification",
    audienceSegmentId: "665f11277351a77b9c8f1002",
    audienceLabel: "Leads",
    status: "scheduled",
    schedule: { mode: "scheduled", runAt: "Today 05:30 PM", recurringRule: "none", timezone: "Asia/Kolkata" },
    content: {
      templateId: "wa_admission_reminder_hi",
      body: "Hi {{name}}, admission counselling slot is closing today.",
      mediaUrl: "r2://campaign-media/admission-brochure.pdf",
    },
    provider: { name: "Meta Cloud API", accountId: "waba_19082", approvalStatus: "approved" },
    metrics: { queued: 18220, sent: 0, delivered: 0, opened: 0, clicked: 0, read: 0, callAnswered: 0, failed: 0 },
    budget: 24000,
    createdBy: "marketing@communiflow.app",
    createdAt: "2026-06-02",
  },
  {
    _id: "665f32107351a77b9c8f3003",
    tenantId,
    name: "Order OTP Flow",
    channel: "sms",
    type: "otp",
    audienceSegmentId: "665f11277351a77b9c8f1003",
    audienceLabel: "Customers",
    status: "running",
    schedule: { mode: "instant", runAt: "Triggered by API", recurringRule: "none", timezone: "Asia/Kolkata" },
    content: {
      templateId: "sms_order_otp_v2",
      body: "Your OTP is {{otp}}. Valid for 10 minutes.",
    },
    provider: { name: "MSG91", accountId: "msg91_txn_main", approvalStatus: "approved" },
    metrics: { queued: 12860, sent: 12860, delivered: 12744, opened: 0, clicked: 0, read: 0, callAnswered: 0, failed: 116 },
    budget: 9200,
    createdBy: "system@communiflow.app",
    createdAt: "2026-06-02",
  },
  {
    _id: "665f32107351a77b9c8f3004",
    tenantId,
    name: "Appointment Voice Reminder",
    channel: "voice",
    type: "transactional",
    audienceSegmentId: "665f11277351a77b9c8f1003",
    audienceLabel: "Customers",
    status: "paused",
    schedule: { mode: "recurring", runAt: "Daily 10:00 AM", recurringRule: "daily", timezone: "Asia/Kolkata" },
    content: {
      templateId: "voice_appointment_tts_v1",
      body: "Hello {{name}}, this is a reminder for your appointment tomorrow.",
      mediaUrl: "s3://voice-recordings/appointment-reminder.mp3",
    },
    provider: { name: "Exotel", accountId: "exotel_main_01", approvalStatus: "approved" },
    metrics: { queued: 6200, sent: 4020, delivered: 3890, opened: 0, clicked: 0, read: 0, callAnswered: 3048, failed: 130 },
    budget: 31000,
    createdBy: "ops@communiflow.app",
    createdAt: "2026-05-30",
  },
];

const initialTickets: Ticket[] = [
  { _id: "665f42107351a77b9c8f4001", title: "Payment issue", priority: "High", status: "Open", channel: "Billing" },
  {
    _id: "665f42107351a77b9c8f4002",
    title: "WhatsApp template review",
    priority: "Medium",
    status: "In progress",
    channel: "Template Approval",
  },
  { _id: "665f42107351a77b9c8f4003", title: "CSV import help", priority: "Low", status: "Resolved", channel: "Import" },
];

const plans: BillingPlan[] = [
  {
    name: "Starter",
    price: "₹499",
    description: "For new businesses launching email campaigns.",
    features: ["5,000 Emails", "1 User", "Contact groups", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "₹1,999",
    description: "For growing teams using multi-channel campaigns.",
    featured: true,
    features: ["50,000 Emails", "WhatsApp enabled", "SMS enabled", "Advanced analytics"],
  },
  {
    name: "Business",
    price: "₹9,999",
    description: "For high-volume teams needing voice campaigns.",
    features: ["Unlimited contacts", "Voice campaign", "Team members", "Priority support"],
  },
];

const mongoCollections = [
  {
    name: "tenants",
    fields: ["_id", "businessName", "planId", "walletBalance", "billingAddress", "settings"],
  },
  {
    name: "users",
    fields: ["_id", "tenantId", "name", "email", "role", "status", "lastLoginAt"],
  },
  {
    name: "contacts",
    fields: ["_id", "tenantId", "profile", "consent", "channels", "tags", "customAttributes"],
  },
  {
    name: "segments",
    fields: ["_id", "tenantId", "name", "filters", "estimatedCount", "lastComputedAt"],
  },
  {
    name: "campaigns",
    fields: ["_id", "tenantId", "channel", "status", "schedule", "content", "provider", "metrics"],
  },
  {
    name: "messages",
    fields: ["_id", "tenantId", "campaignId", "contactId", "providerMessageId", "events[]"],
  },
  {
    name: "billing_ledger",
    fields: ["_id", "tenantId", "type", "amount", "usageUnits", "invoiceId", "createdAt"],
  },
  {
    name: "audit_logs",
    fields: ["_id", "tenantId", "actorId", "action", "resource", "ipAddress", "createdAt"],
  },
];

const chartData = [
  { label: "Mon", email: 72, whatsapp: 58, sms: 82, voice: 42 },
  { label: "Tue", email: 88, whatsapp: 72, sms: 77, voice: 55 },
  { label: "Wed", email: 65, whatsapp: 84, sms: 91, voice: 62 },
  { label: "Thu", email: 92, whatsapp: 76, sms: 86, voice: 47 },
  { label: "Fri", email: 78, whatsapp: 90, sms: 72, voice: 66 },
  { label: "Sat", email: 84, whatsapp: 69, sms: 80, voice: 58 },
  { label: "Sun", email: 70, whatsapp: 86, sms: 74, voice: 51 },
];

const roadmap = [
  "AI Message Generator",
  "AI Campaign Suggestions",
  "AI Lead Scoring",
  "CRM Integration",
  "Telegram Campaigns",
  "Push Notifications",
  "Marketing Workflow Builder",
];

const createDefaultCampaignForm = (channel: Channel = "email"): CampaignFormState => ({
  name: "",
  channel,
  type: "promotional",
  audienceSegmentId: initialSegments[0]._id,
  scheduleMode: "instant",
  runAt: "",
  recurringRule: "none",
  subject: "",
  message: "",
  budget: "5000",
});

const defaultContactForm: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  group: "Leads",
  lifecycleStage: "lead",
};

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

  const dashboardMetrics = useMemo(() => {
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
  }, [campaigns, contacts]);

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
    const now = new Date().toISOString().slice(0, 10);

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
      createdAt: now,
    };

    setCampaigns((current) => [newCampaign, ...current]);
    setActiveModal(null);
    setToast(`Campaign "${newCampaign.name}" created and ${newCampaign.status}.`);
  };

  const addContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: Contact = {
      _id: generateObjectId(),
      tenantId,
      firstName: contactForm.firstName || "New",
      lastName: contactForm.lastName || "Contact",
      email: contactForm.email || "new.contact@example.com",
      phone: contactForm.phone || "+91 90000 00000",
      company: contactForm.company || "Demo Business",
      city: contactForm.city || "India",
      group: contactForm.group,
      lifecycleStage: contactForm.lifecycleStage,
      consent: { email: true, whatsapp: true, sms: true, voice: false },
      channels: ["email", "whatsapp", "sms"],
      tags: ["manual-entry"],
      source: "Manual Add",
      lastActivityAt: "Just now",
      createdAt: new Date().toISOString().slice(0, 10),
    };

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
    const duplicated = {
      ...campaign,
      _id: generateObjectId(),
      name: `${campaign.name} Copy`,
      status: "draft" as CampaignStatus,
      createdAt: new Date().toISOString().slice(0, 10),
      metrics: { queued: campaign.metrics.queued, sent: 0, delivered: 0, opened: 0, clicked: 0, read: 0, callAnswered: 0, failed: 0 },
    };
    setCampaigns((current) => [duplicated, ...current]);
    setToast(`Draft duplicate created for "${campaign.name}".`);
  };

  const importDemoContacts = () => {
    const importedContacts: Contact[] = [
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

    setContacts((current) => [...importedContacts, ...current]);
    setToast("Demo CSV/Excel import completed with 2 contacts.");
  };

  const exportContacts = () => {
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
    const csv = [header.join(","), ...rows].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
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
        <CampaignForm
          value={campaignForm}
          segments={initialSegments}
          onChange={setCampaignForm}
          onSubmit={createCampaign}
        />
      </Modal>
      <Modal open={activeModal === "contact"} title="Add Contact" onClose={() => setActiveModal(null)}>
        <ContactForm value={contactForm} onChange={setContactForm} onSubmit={addContact} />
      </Modal>
      <Modal open={activeModal === "ticket"} title="Create Support Ticket" onClose={() => setActiveModal(null)}>
        <form className="space-y-4" onSubmit={createTicket}>
          <label className="block">
            <span className="form-label">Issue title</span>
            <input className="form-input" value={ticketTitle} onChange={(event) => setTicketTitle(event.target.value)} placeholder="e.g. WhatsApp template approval stuck" />
          </label>
          <button className="primary-button w-full" type="submit">
            Create ticket
          </button>
        </form>
      </Modal>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/70 bg-white/90 px-5 py-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
          <Zap className="size-6" />
        </div>
        <div>
          <p className="text-lg font-black tracking-tight">CommuniFlow</p>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Automation SaaS</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item, index) => (
          <a
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
              index === 0
                ? "bg-slate-950 text-white shadow-xl shadow-slate-900/15"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
            href={`#${item.href}`}
            key={item.label}
          >
            <item.icon className="size-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-950 p-5 text-white">
        <Sparkles className="mb-5 size-8 text-cyan-300" />
        <p className="text-sm font-black">MongoDB-ready frontend</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Tenant, campaign, contact, billing and audit data uses production-style document IDs.
        </p>
      </div>
    </aside>
  );
}

function Topbar({
  query,
  setQuery,
  onCreateCampaign,
  onAddContact,
  onImport,
}: {
  query: string;
  setQuery: (value: string) => void;
  onCreateCampaign: () => void;
  onAddContact: () => void;
  onImport: () => void;
}) {
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
            <a className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm" href={`#${item.href}`} key={item.label}>
              <item.icon className="size-4" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
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

function HeroSection({ onCreateCampaign }: { onCreateCampaign: () => void }) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]" id="dashboard">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-indigo-950/20 sm:p-8">
        <div className="absolute right-0 top-0 size-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <CheckCircle2 className="size-4" /> Interactive frontend prototype
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Complete multi-channel campaign dashboard.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Create campaigns, manage contacts, import/export data, control campaign status and preview MongoDB-ready data
            structures before backend integration.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="primary-button justify-center bg-white text-slate-950 hover:bg-cyan-50" onClick={onCreateCampaign} type="button">
              <Plus className="size-4" /> Create campaign
            </button>
            <a className="secondary-button justify-center border-white/10 bg-white/10 text-white hover:bg-white/20" href="#data-model">
              <Database className="size-4" /> View MongoDB schema
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Authentication</p>
            <h2 className="mt-2 text-2xl font-black">Secure access</h2>
          </div>
          <ShieldCheck className="size-10 text-indigo-600" />
        </div>
        <div className="mt-6 space-y-3">
          {[
            { label: "Register businesses and team users", icon: UserPlus },
            { label: "Login with JWT access + refresh token", icon: ShieldCheck },
            { label: "Forgot and reset password screens ready", icon: Settings },
            { label: "Two factor authentication future ready", icon: Lock },
          ].map((item) => (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4" key={item.label}>
              <div className="grid size-10 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <item.icon className="size-5" />
              </div>
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 p-5">
          <p className="text-sm font-black text-slate-900">Backend direction</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Node.js, Express.js, TypeScript, MongoDB, Redis/BullMQ and S3/R2 storage.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsGrid({ metrics, contacts }: { metrics: ReturnType<typeof getMetricsShape>; contacts: Contact[] }) {
  const cards = [
    { label: "Total Campaigns", value: formatNumber(metrics.totalCampaigns), trend: "Live from campaign state", icon: Megaphone, tone: "from-indigo-500 to-blue-500" },
    { label: "Total Contacts", value: formatNumber(contacts.length), trend: "Manual + import enabled", icon: Users, tone: "from-emerald-500 to-teal-500" },
    { label: "Messages Sent", value: formatNumber(metrics.messagesSent), trend: "Email, WhatsApp, SMS, Voice", icon: Send, tone: "from-amber-500 to-orange-500" },
    { label: "Delivery Rate", value: `${metrics.deliveryRate}%`, trend: `${metrics.openRate}% open/read rate`, icon: Activity, tone: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => (
        <article className="rounded-[1.75rem] border border-white bg-white p-5 shadow-lg shadow-slate-200/70" key={stat.label}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{stat.value}</p>
            </div>
            <div className={`grid size-12 place-items-center rounded-2xl bg-gradient-to-br ${stat.tone} text-white`}>
              <stat.icon className="size-6" />
            </div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-600">
            <TrendingUp className="size-4" /> {stat.trend}
          </p>
        </article>
      ))}
    </section>
  );
}

function QuickActions({
  onCreateCampaign,
  onAddContact,
  onImport,
  onExport,
  onTicket,
}: {
  onCreateCampaign: () => void;
  onAddContact: () => void;
  onImport: () => void;
  onExport: () => void;
  onTicket: () => void;
}) {
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

function CampaignWorkspace({
  campaigns,
  selectedChannel,
  selectedStatus,
  setSelectedChannel,
  setSelectedStatus,
  onCreateCampaign,
  onStatusChange,
  onDuplicate,
}: {
  campaigns: Campaign[];
  selectedChannel: Channel | "all";
  selectedStatus: CampaignStatus | "all";
  setSelectedChannel: (value: Channel | "all") => void;
  setSelectedStatus: (value: CampaignStatus | "all") => void;
  onCreateCampaign: (channel: Channel) => void;
  onStatusChange: (id: string, status: CampaignStatus) => void;
  onDuplicate: (campaign: Campaign) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="campaigns">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="eyebrow">Campaign monitoring</p>
          <h2 className="mt-2 text-2xl font-black">Live campaign command center</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Create, pause, resume, stop and duplicate campaigns from the frontend.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <select className="form-input" value={selectedChannel} onChange={(event) => setSelectedChannel(event.target.value as Channel | "all")}>
            <option value="all">All channels</option>
            {Object.entries(channelMeta).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
          <select className="form-input" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as CampaignStatus | "all")}>
            <option value="all">All status</option>
            {["draft", "scheduled", "running", "paused", "completed", "stopped"].map((status) => (
              <option key={status} value={status}>
                {titleCase(status)}
              </option>
            ))}
          </select>
          <button className="primary-button justify-center" onClick={() => onCreateCampaign("email")} type="button">
            <Plus className="size-4" /> New
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {campaigns.length === 0 ? (
          <EmptyState title="No campaigns found" description="Try changing filters or create a new campaign." actionLabel="Create campaign" onAction={() => onCreateCampaign("email")} />
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              campaign={campaign}
              key={campaign._id}
              onDuplicate={() => onDuplicate(campaign)}
              onPause={() => onStatusChange(campaign._id, "paused")}
              onResume={() => onStatusChange(campaign._id, "running")}
              onStop={() => onStatusChange(campaign._id, "stopped")}
            />
          ))
        )}
      </div>
    </section>
  );
}

function CampaignCard({
  campaign,
  onPause,
  onResume,
  onStop,
  onDuplicate,
}: {
  campaign: Campaign;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onDuplicate: () => void;
}) {
  const meta = channelMeta[campaign.channel];
  const delivery = campaign.metrics.sent ? Math.round((campaign.metrics.delivered / campaign.metrics.sent) * 1000) / 10 : 0;

  return (
    <article className="rounded-3xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:shadow-lg">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-4">
          <div className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white`}>
            <meta.icon className="size-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-black">{campaign.name}</h3>
              <StatusBadge status={campaign.status} />
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {meta.label} • {titleCase(campaign.type)} • {campaign.audienceLabel} • {campaign.schedule.runAt}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{campaign.content.body}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:min-w-[520px]">
          <MetricPill label="Queued" value={formatNumber(campaign.metrics.queued)} />
          <MetricPill label="Sent" value={formatNumber(campaign.metrics.sent)} />
          <MetricPill label="Delivery" value={`${delivery}%`} />
          <MetricPill label="Budget" value={`₹${formatNumber(campaign.budget)}`} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs font-bold text-slate-500">
          Mongo ID: <span className="font-mono text-slate-700">{campaign._id}</span> • Provider: {campaign.provider.name}
        </p>
        <div className="flex flex-wrap gap-2">
          {campaign.status === "running" ? (
            <button className="tiny-button" onClick={onPause} type="button">
              <PauseCircle className="size-4" /> Pause
            </button>
          ) : (
            <button className="tiny-button" onClick={onResume} type="button">
              <PlayCircle className="size-4" /> Resume
            </button>
          )}
          <button className="tiny-button" onClick={onStop} type="button">
            <Square className="size-4" /> Stop
          </button>
          <button className="tiny-button" onClick={onDuplicate} type="button">
            <RefreshCw className="size-4" /> Duplicate
          </button>
        </div>
      </div>
    </article>
  );
}

function ChannelGrid({ onCreateCampaign }: { onCreateCampaign: (channel: Channel) => void }) {
  return (
    <section id="channels">
      <SectionHeader
        eyebrow="Supported channels"
        title="Every module is actionable"
        description="Buttons create pre-filled campaign flows for each communication channel."
      />
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {Object.entries(channelMeta).map(([key, channel]) => (
          <article className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-slate-200/70" key={key}>
            <div className={`bg-gradient-to-br ${channel.gradient} p-6 text-white`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-black">{channel.label} Campaigns</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">{channel.description}</p>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <channel.icon className="size-6" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">{channel.provider}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">{channel.badge}</span>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {channel.features.map((feature) => (
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3" key={feature}>
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{feature}</span>
                </div>
              ))}
              <button className="primary-button justify-center sm:col-span-2" onClick={() => onCreateCampaign(key as Channel)} type="button">
                <Plus className="size-4" /> Create {channel.label} campaign
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactsPanel({
  contacts,
  segments,
  onAddContact,
  onImport,
  onExport,
}: {
  contacts: Contact[];
  segments: Segment[];
  onAddContact: () => void;
  onImport: () => void;
  onExport: () => void;
}) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="contacts">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Contact management</p>
          <h2 className="mt-2 text-2xl font-black">Audience database</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button className="icon-button" onClick={onAddContact} title="Add contact" type="button">
            <UserPlus className="size-5" />
          </button>
          <button className="icon-button" onClick={onImport} title="Import contacts" type="button">
            <Upload className="size-5" />
          </button>
          <button className="icon-button" onClick={onExport} title="Export contacts" type="button">
            <Download className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {segments.map((segment) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={segment._id}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{segment.name}</p>
            <p className="mt-2 text-2xl font-black">{formatNumber(segment.estimatedCount)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {contacts.length === 0 ? (
          <EmptyState title="No contacts found" description="Try search reset or import demo contacts." actionLabel="Import contacts" onAction={onImport} />
        ) : (
          contacts.map((contact) => (
            <div className="grid gap-3 rounded-3xl border border-slate-100 p-4 md:grid-cols-[1.2fr_1fr_1fr_0.9fr] md:items-center" key={contact._id}>
              <div>
                <p className="font-black text-slate-900">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-xs font-bold text-slate-400">{contact.email}</p>
                <p className="mt-1 text-xs font-mono text-slate-400">{contact._id}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{contact.company}</p>
                <p className="text-xs font-semibold text-slate-500">{contact.city}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {contact.channels.map((channel) => (
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-black text-indigo-700" key={channel}>
                    {channelMeta[channel].label}
                  </span>
                ))}
              </div>
              <div>
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{contact.group}</span>
                <p className="mt-2 text-xs font-semibold text-slate-500">{contact.source} • {contact.lastActivityAt}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function AnalyticsPanel({ metrics }: { metrics: ReturnType<typeof getMetricsShape> }) {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="analytics">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2 className="mt-2 text-2xl font-black">Performance reports</h2>
        </div>
        <BarChart3 className="size-10 text-indigo-600" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Open/Read", `${metrics.openRate}%`],
          ["Click Rate", `${metrics.clickRate}%`],
          ["Call Success", `${metrics.callSuccessRate}%`],
        ].map(([label, value]) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={label}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex h-72 items-end gap-2 rounded-3xl bg-slate-50 p-4">
        {chartData.map((day) => (
          <div className="flex h-full flex-1 flex-col justify-end gap-1" key={day.label}>
            <div className="rounded-t-xl bg-indigo-500" style={{ height: `${day.email}%` }} />
            <div className="rounded-t-xl bg-emerald-500" style={{ height: `${day.whatsapp}%` }} />
            <div className="rounded-t-xl bg-amber-500" style={{ height: `${day.sms}%` }} />
            <div className="rounded-t-xl bg-pink-500" style={{ height: `${day.voice}%` }} />
            <p className="pt-2 text-center text-xs font-black text-slate-500">{day.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-black text-slate-500">
        <Legend color="bg-indigo-500" label="Email" />
        <Legend color="bg-emerald-500" label="WhatsApp" />
        <Legend color="bg-amber-500" label="SMS" />
        <Legend color="bg-pink-500" label="Voice" />
      </div>
    </section>
  );
}

function BillingSection({
  selectedPlan,
  walletBalance,
  onSelectPlan,
  onInvoice,
}: {
  selectedPlan: string;
  walletBalance: number;
  onSelectPlan: (plan: string) => void;
  onInvoice: () => void;
}) {
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
          <p className="mt-3 text-sm leading-6 text-slate-600">Selected plan: <strong>{selectedPlan}</strong>. Usage tracking ready for pay-per-message billing.</p>
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
              <button className={`mt-7 w-full rounded-2xl px-4 py-3 text-sm font-black ${selectedPlan === plan.name ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`} onClick={() => onSelectPlan(plan.name)} type="button">
                {selectedPlan === plan.name ? "Current plan" : `Choose ${plan.name}`}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataModelSection() {
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

function AdminPanel({ campaigns, contacts }: { campaigns: Campaign[]; contacts: Contact[] }) {
  const [activeUsers, setActiveUsers] = useState(8920);
  const adminMetrics = [
    { label: "Total Revenue", value: "₹18.4L", icon: CreditCard },
    { label: "Total Users", value: "12,840", icon: Users },
    { label: "Active Users", value: formatNumber(activeUsers), icon: Activity },
    { label: "Messages Sent", value: formatNumber(campaigns.reduce((sum, campaign) => sum + campaign.metrics.sent, 0)), icon: Send },
  ];

  return (
    <section className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6" id="admin">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Admin panel</p>
          <h2 className="mt-2 text-2xl font-black">Platform controls</h2>
        </div>
        <ShieldCheck className="size-10 text-indigo-600" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {adminMetrics.map((metric) => (
          <div className="rounded-3xl bg-slate-50 p-4" key={metric.label}>
            <metric.icon className="size-6 text-indigo-600" />
            <p className="mt-4 text-2xl font-black">{metric.value}</p>
            <p className="text-sm font-bold text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {[
          { label: "Block one demo user", action: () => setActiveUsers((count) => Math.max(count - 1, 0)) },
          { label: "Activate one demo user", action: () => setActiveUsers((count) => count + 1) },
          { label: `Review ${contacts.length} contacts`, action: () => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }) },
          { label: "View campaign queue", action: () => document.getElementById("campaigns")?.scrollIntoView({ behavior: "smooth" }) },
        ].map((item) => (
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-100 p-4 text-left" key={item.label} onClick={item.action} type="button">
            <span className="font-bold text-slate-700">{item.label}</span>
            <ChevronRight className="size-5 text-slate-400" />
          </button>
        ))}
      </div>
    </section>
  );
}

function SupportAndRoadmap({
  tickets,
  onCreateTicket,
  onResolveTicket,
}: {
  tickets: Ticket[];
  onCreateTicket: () => void;
  onResolveTicket: (id: string) => void;
}) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[2rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Support</p>
            <h2 className="mt-2 text-2xl font-black">Ticket system</h2>
          </div>
          <Headphones className="size-10 text-indigo-600" />
        </div>
        <button className="primary-button mt-5 w-full justify-center" onClick={onCreateTicket} type="button">
          <Plus className="size-4" /> New ticket
        </button>
        <div className="mt-6 space-y-4">
          {tickets.map((ticket) => (
            <div className="rounded-3xl bg-slate-50 p-4" key={ticket._id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black">{ticket.title}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{ticket.channel} • {ticket.priority} priority</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600">{ticket.status}</span>
              </div>
              {ticket.status !== "Resolved" ? (
                <button className="tiny-button mt-4" onClick={() => onResolveTicket(ticket._id)} type="button">
                  <CheckCircle2 className="size-4" /> Resolve
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white bg-gradient-to-br from-indigo-600 to-slate-950 p-6 text-white shadow-xl shadow-indigo-950/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">Future scope</p>
            <h2 className="mt-2 text-2xl font-black">AI and enterprise roadmap</h2>
          </div>
          <Sparkles className="size-10 text-cyan-200" />
        </div>
        <div className="mt-6 grid gap-3">
          {roadmap.map((item) => (
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur" key={item}>
              <CheckCircle2 className="size-5 shrink-0 text-cyan-200" />
              <span className="text-sm font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignForm({
  value,
  segments,
  onChange,
  onSubmit,
}: {
  value: CampaignFormState;
  segments: Segment[];
  onChange: (value: CampaignFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
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
            <select className="form-input" value={value.recurringRule} onChange={(event) => onChange({ ...value, recurringRule: event.target.value as Campaign["schedule"]["recurringRule"] })}>
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
          <textarea className="form-input min-h-28 resize-y" value={value.message} onChange={(event) => onChange({ ...value, message: event.target.value })} placeholder="Hi {{name}}, write your message here..." />
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

function ContactForm({
  value,
  onChange,
  onSubmit,
}: {
  value: ContactFormState;
  onChange: (value: ContactFormState) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
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

function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Frontend action</p>
            <h3 className="text-2xl font-black">{title}</h3>
          </div>
          <button className="icon-button" onClick={onClose} type="button">
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
      <Filter className="mx-auto size-10 text-slate-400" />
      <p className="mt-4 text-lg font-black">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <button className="primary-button mx-auto mt-5 justify-center" onClick={onAction} type="button">
        <Plus className="size-4" /> {actionLabel}
      </button>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: CampaignStatus }) {
  const colorMap: Record<CampaignStatus, string> = {
    draft: "bg-slate-100 text-slate-700",
    scheduled: "bg-blue-50 text-blue-700",
    running: "bg-emerald-50 text-emerald-700",
    paused: "bg-amber-50 text-amber-700",
    completed: "bg-indigo-50 text-indigo-700",
    stopped: "bg-rose-50 text-rose-700",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${colorMap[status]}`}>{titleCase(status)}</span>;
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`size-3 rounded-full ${color}`} /> {label}
    </span>
  );
}

function getMetricsShape() {
  return {
    totalCampaigns: 0,
    totalContacts: 0,
    messagesSent: 0,
    deliveryRate: 0,
    openRate: 0,
    clickRate: 0,
    callSuccessRate: 0,
  };
}

function generateObjectId() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ");
}

export default App;
