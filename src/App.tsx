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
  FileText,
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
  PieChart,
  Rocket,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

type StatCard = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  tone: string;
};

type ChannelCard = {
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  metrics: string[];
  features: string[];
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Contacts", icon: Users },
  { label: "Campaigns", icon: Megaphone },
  { label: "Analytics", icon: BarChart3 },
  { label: "Billing", icon: Wallet },
  { label: "Admin", icon: ShieldCheck },
];

const stats: StatCard[] = [
  {
    label: "Total Campaigns",
    value: "1,284",
    trend: "+18.4% this month",
    icon: Megaphone,
    tone: "from-indigo-500 to-blue-500",
  },
  {
    label: "Total Contacts",
    value: "86,420",
    trend: "+9,280 imported",
    icon: Users,
    tone: "from-emerald-500 to-teal-500",
  },
  {
    label: "Messages Sent",
    value: "4.8M",
    trend: "Across 4 channels",
    icon: Send,
    tone: "from-amber-500 to-orange-500",
  },
  {
    label: "Delivery Rate",
    value: "97.8%",
    trend: "+2.1% optimized",
    icon: Activity,
    tone: "from-fuchsia-500 to-pink-500",
  },
];

const channels: ChannelCard[] = [
  {
    name: "Email Campaigns",
    description: "Rich editor, templates, attachments, scheduling and click/open tracking.",
    icon: Mail,
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    metrics: ["68% open rate", "24K clicks", "Resend ready"],
    features: ["Rich text editor", "Bulk email", "Open & click tracking", "Attachment support"],
  },
  {
    name: "WhatsApp Campaigns",
    description: "Template messaging, media support and read status powered by Meta Cloud API.",
    icon: MessageCircle,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    metrics: ["89% read rate", "12K delivered", "Media enabled"],
    features: ["Template messages", "Bulk send", "Scheduled messages", "Delivery tracking"],
  },
  {
    name: "SMS Campaigns",
    description: "Promotional, transactional and OTP messaging with delivery reports.",
    icon: Bell,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    metrics: ["99% delivered", "OTP ready", "MSG91 ready"],
    features: ["Bulk SMS", "OTP SMS", "Promotional SMS", "Transactional SMS"],
  },
  {
    name: "Voice Call Campaigns",
    description: "Bulk voice calls, uploaded recordings, text-to-speech and call status tracking.",
    icon: PhoneCall,
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    metrics: ["78% success", "TTS ready", "Exotel ready"],
    features: ["Voice upload", "Text to speech", "Bulk calling", "Call status tracking"],
  },
];

const contacts = [
  {
    name: "Aarav Sharma",
    group: "Premium Customers",
    channel: "Email + WhatsApp",
    status: "Active",
    lastSeen: "2 min ago",
  },
  {
    name: "Neha Verma",
    group: "Leads",
    channel: "SMS",
    status: "Warm",
    lastSeen: "16 min ago",
  },
  {
    name: "Medicare Plus",
    group: "Hospitals",
    channel: "Voice + Email",
    status: "Active",
    lastSeen: "1 hr ago",
  },
  {
    name: "Urban Nest Realty",
    group: "Subscribers",
    channel: "WhatsApp",
    status: "New",
    lastSeen: "Today",
  },
];

const campaignRows = [
  {
    campaign: "Summer Sale Blast",
    type: "Email",
    audience: "Customers",
    delivery: "98.2%",
    status: "Running",
  },
  {
    campaign: "Admission Reminder",
    type: "WhatsApp",
    audience: "Leads",
    delivery: "94.7%",
    status: "Scheduled",
  },
  {
    campaign: "Order OTP Flow",
    type: "SMS",
    audience: "E-commerce",
    delivery: "99.1%",
    status: "Live",
  },
];

const chartData = [
  { label: "Mon", email: 72, whatsapp: 58, sms: 82 },
  { label: "Tue", email: 88, whatsapp: 72, sms: 77 },
  { label: "Wed", email: 65, whatsapp: 84, sms: 91 },
  { label: "Thu", email: 92, whatsapp: 76, sms: 86 },
  { label: "Fri", email: 78, whatsapp: 90, sms: 72 },
  { label: "Sat", email: 84, whatsapp: 69, sms: 80 },
  { label: "Sun", email: 70, whatsapp: 86, sms: 74 },
];

const plans = [
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

const adminMetrics = [
  { label: "Total Revenue", value: "₹18.4L", icon: CreditCard },
  { label: "Total Users", value: "12,840", icon: Users },
  { label: "Active Users", value: "8,920", icon: Activity },
  { label: "Calls Made", value: "286K", icon: Mic },
];

const roadmap = [
  "AI Message Generator",
  "AI Campaign Suggestions",
  "AI Lead Scoring",
  "CRM Integration",
  "Telegram Campaigns",
  "Push Notifications",
  "Workflow Builder",
];

function App() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <Sidebar />
      <main className="lg:pl-72">
        <Topbar />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
          <HeroSection />
          <StatsGrid />
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <CampaignControl />
            <SchedulerCard />
          </div>
          <ChannelGrid />
          <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
            <ContactsPanel />
            <AnalyticsPanel />
          </div>
          <BillingSection />
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <AdminPanel />
            <SupportAndRoadmap />
          </div>
        </div>
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/70 bg-white/85 px-5 py-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:flex lg:flex-col">
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
            href={`#${item.label.toLowerCase()}`}
            key={item.label}
          >
            <item.icon className="size-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-950 p-5 text-white">
        <Sparkles className="mb-5 size-8 text-cyan-300" />
        <p className="text-sm font-black">Enterprise-ready MVP</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Email, WhatsApp, SMS and voice campaigns in one modern dashboard.
        </p>
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
          View Demo <ChevronRight className="size-4" />
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
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
              <p className="text-xs text-slate-500">Automation SaaS</p>
            </div>
          </div>

          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-white bg-white px-12 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-200 focus:ring-4 focus:ring-indigo-100"
              placeholder="Search campaigns, contacts, invoices..."
              type="search"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
              Import CSV
            </button>
            <button className="flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-xl shadow-slate-900/15">
              <Rocket className="size-4" /> New Campaign
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {navItems.map((item) => (
            <a
              className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm"
              href={`#${item.label.toLowerCase()}`}
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

function HeroSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]" id="dashboard">
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-indigo-950/20 sm:p-8">
        <div className="absolute right-0 top-0 size-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
            <CheckCircle2 className="size-4" /> MVP frontend with dummy business data
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            One dashboard for every customer conversation.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Businesses can manage promotional, transactional and notification campaigns across Email,
            WhatsApp, SMS and Voice from a single responsive SaaS dashboard.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Instant Campaign", "Scheduled Campaign", "Recurring Campaign"].map((item) => (
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur" key={item}>
                <p className="text-sm font-black">{item}</p>
                <p className="mt-2 text-xs leading-5 text-slate-300">Daily, weekly and monthly automation ready.</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Authentication</p>
            <h2 className="mt-2 text-2xl font-black">Secure access</h2>
          </div>
          <ShieldCheck className="size-10 text-indigo-600" />
        </div>
        <div className="mt-6 space-y-3">
          {[
            { label: "Register businesses", icon: UserPlus },
            { label: "Login with JWT access token", icon: ShieldCheck },
            { label: "Forgot and reset password", icon: Settings },
            { label: "Two factor authentication ready", icon: Lock },
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
          <p className="text-sm font-black text-slate-900">Recommended MVP stack</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            React, TypeScript, Tailwind CSS, Express, PostgreSQL, Prisma, Redis and BullMQ.
          </p>
        </div>
      </div>
    </section>
  );
}


function StatsGrid() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
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

function CampaignControl() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70" id="campaigns">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Campaign monitoring</p>
          <h2 className="mt-2 text-2xl font-black">Live campaign command center</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700">
            <PauseCircle className="size-4" /> Pause
          </button>
          <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-black text-white">
            <Send className="size-4" /> Launch
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
        <div className="grid grid-cols-5 bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-500 max-md:hidden">
          <span>Campaign</span>
          <span>Type</span>
          <span>Audience</span>
          <span>Delivery</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {campaignRows.map((row) => (
            <div
              className="grid gap-3 px-5 py-4 text-sm md:grid-cols-5 md:items-center"
              key={row.campaign}
            >
              <span className="font-black text-slate-900">{row.campaign}</span>
              <span className="font-semibold text-slate-600">{row.type}</span>
              <span className="font-semibold text-slate-600">{row.audience}</span>
              <span className="font-black text-emerald-600">{row.delivery}</span>
              <span>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
                  {row.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchedulerCard() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Scheduler</p>
          <h2 className="mt-2 text-2xl font-black">Automation queue</h2>
        </div>
        <CalendarClock className="size-10 text-indigo-600" />
      </div>
      <div className="mt-6 space-y-4">
        {[
          { label: "Daily product digest", time: "Every day 09:00 AM", progress: 72 },
          { label: "Weekly leads nurture", time: "Every Monday", progress: 48 },
          { label: "Monthly invoice alerts", time: "1st of every month", progress: 88 },
        ].map((item) => (
          <div className="rounded-3xl bg-slate-50 p-4" key={item.label}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-black text-slate-900">{item.label}</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Clock3 className="size-4" /> {item.time}
                </p>
              </div>
              <MoreHorizontal className="size-5 text-slate-400" />
            </div>
            <div className="mt-4 h-2 rounded-full bg-white">
              <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${item.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChannelGrid() {
  return (
    <section id="channels">
      <SectionHeader
        eyebrow="Supported channels"
        title="Campaign modules built for MVP and scale"
        description="Every module is represented with the key controls businesses expect before backend integration."
      />
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {channels.map((channel) => (
          <article className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-slate-200/70" key={channel.name}>
            <div className={`bg-gradient-to-br ${channel.gradient} p-6 text-white`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-black">{channel.name}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/85">{channel.description}</p>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <channel.icon className="size-6" />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {channel.metrics.map((metric) => (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black" key={metric}>
                    {metric}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {channel.features.map((feature) => (
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3" key={feature}>
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactsPanel() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70" id="contacts">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Contact management</p>
          <h2 className="mt-2 text-2xl font-black">Audience groups</h2>
        </div>
        <div className="flex gap-2">
          <button className="grid size-11 place-items-center rounded-2xl border border-slate-200 text-slate-600">
            <Upload className="size-5" />
          </button>
          <button className="grid size-11 place-items-center rounded-2xl border border-slate-200 text-slate-600">
            <Download className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {["Customers", "Leads", "Premium", "Subscribers"].map((group, index) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={group}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{group}</p>
            <p className="mt-2 text-2xl font-black">{[28400, 18220, 7420, 32380][index].toLocaleString("en-IN")}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {contacts.map((contact) => (
          <div className="grid gap-3 rounded-3xl border border-slate-100 p-4 md:grid-cols-[1.2fr_1fr_1fr_0.7fr_0.8fr] md:items-center" key={contact.name}>
            <div>
              <p className="font-black text-slate-900">{contact.name}</p>
              <p className="text-xs font-bold text-slate-400">Contact profile</p>
            </div>
            <p className="text-sm font-bold text-slate-600">{contact.group}</p>
            <p className="text-sm font-bold text-slate-600">{contact.channel}</p>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              {contact.status}
            </span>
            <p className="text-sm font-semibold text-slate-500">{contact.lastSeen}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnalyticsPanel() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70" id="analytics">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Analytics</p>
          <h2 className="mt-2 text-2xl font-black">Performance reports</h2>
        </div>
        <PieChart className="size-10 text-indigo-600" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Open Rate", "68.4%"],
          ["Click Rate", "21.7%"],
          ["Call Success", "78.2%"],
        ].map(([label, value]) => (
          <div className="rounded-2xl bg-slate-50 p-4" key={label}>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex h-72 items-end gap-3 rounded-3xl bg-slate-50 p-4">
        {chartData.map((day) => (
          <div className="flex h-full flex-1 flex-col justify-end gap-1" key={day.label}>
            <div className="rounded-t-xl bg-indigo-500" style={{ height: `${day.email}%` }} />
            <div className="rounded-t-xl bg-emerald-500" style={{ height: `${day.whatsapp}%` }} />
            <div className="rounded-t-xl bg-amber-500" style={{ height: `${day.sms}%` }} />
            <p className="pt-2 text-center text-xs font-black text-slate-500">{day.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-black text-slate-500">
        <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-indigo-500" /> Email</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-emerald-500" /> WhatsApp</span>
        <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-amber-500" /> SMS</span>
      </div>
    </section>
  );
}

function BillingSection() {
  return (
    <section id="billing">
      <SectionHeader
        eyebrow="Billing module"
        title="Subscriptions, wallet and usage tracking"
        description="Ready for monthly subscriptions, pay-per-message billing, invoices and payment history."
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            className={`relative rounded-[2rem] border p-6 shadow-xl ${
              plan.featured
                ? "border-indigo-200 bg-slate-950 text-white shadow-indigo-950/20"
                : "border-white bg-white text-slate-950 shadow-slate-200/70"
            }`}
            key={plan.name}
          >
            {plan.featured ? (
              <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-slate-950">
                Recommended
              </span>
            ) : null}
            <p className={`text-sm font-bold uppercase tracking-[0.24em] ${plan.featured ? "text-cyan-200" : "text-indigo-500"}`}>
              {plan.name}
            </p>
            <p className="mt-5 text-4xl font-black">
              {plan.price}
              <span className={`text-sm font-bold ${plan.featured ? "text-slate-300" : "text-slate-500"}`}>/month</span>
            </p>
            <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-slate-300" : "text-slate-600"}`}>{plan.description}</p>
            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div className="flex items-center gap-3" key={feature}>
                  <CheckCircle2 className={`size-5 ${plan.featured ? "text-cyan-300" : "text-emerald-500"}`} />
                  <span className="text-sm font-bold">{feature}</span>
                </div>
              ))}
            </div>
            <button
              className={`mt-7 w-full rounded-2xl px-4 py-3 text-sm font-black ${
                plan.featured ? "bg-white text-slate-950" : "bg-slate-950 text-white"
              }`}
            >
              Choose {plan.name}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminPanel() {
  return (
    <section className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70" id="admin">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Admin panel</p>
          <h2 className="mt-2 text-2xl font-black">Platform controls</h2>
        </div>
        <Database className="size-10 text-indigo-600" />
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
        {["Block or activate users", "Manage subscription plans", "Generate invoices", "View transactions"].map((item) => (
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4" key={item}>
            <span className="font-bold text-slate-700">{item}</span>
            <ChevronRight className="size-5 text-slate-400" />
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportAndRoadmap() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-[2rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">Support</p>
            <h2 className="mt-2 text-2xl font-black">Ticket system</h2>
          </div>
          <Headphones className="size-10 text-indigo-600" />
        </div>
        <div className="mt-6 space-y-4">
          {[
            { title: "Payment issue", meta: "High priority" },
            { title: "WhatsApp template review", meta: "Pending Meta approval" },
            { title: "CSV import help", meta: "Resolved today" },
          ].map((ticket) => (
            <div className="rounded-3xl bg-slate-50 p-4" key={ticket.title}>
              <p className="font-black">{ticket.title}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{ticket.meta}</p>
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

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-indigo-500">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export default App;
