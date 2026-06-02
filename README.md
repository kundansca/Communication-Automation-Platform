# Communication Automation Platform

Professional responsive frontend prototype for a SaaS product that helps businesses manage Email, WhatsApp, SMS and Voice Call campaigns from one dashboard.

## Frontend Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React icons

## Backend Direction

The frontend dummy data is structured for a future Node.js + Express.js + TypeScript backend using MongoDB, Redis/BullMQ and S3/Cloudflare R2 storage. The mock entities use MongoDB-style `_id`, `tenantId`, embedded provider objects, campaign schedules, contact consent objects and billing/audit collection shapes.

## Enabled Frontend Features

- Create campaign modal with channel, audience, schedule, type, budget and message fields
- Email, WhatsApp, SMS and Voice campaign creation flows
- Campaign pause, resume, stop and duplicate actions
- Global search for campaigns and contacts
- Channel and status filters
- Add contact form
- CSV/Excel demo import action
- Contacts CSV export action
- Analytics cards and responsive dummy charts
- Billing plan selection, wallet credit and invoice action
- MongoDB collection/data-model preview
- Admin demo controls
- Support ticket creation and resolve actions
- Responsive sidebar/top navigation for desktop and mobile

## Frontend Folder Structure

```txt
src/
  components/
    admin/
    billing/
    campaigns/
    contacts/
    forms/
    layout/
    sections/
    support/
    ui/
  data/
    mockData.ts
  types/
    index.ts
  utils/
    format.ts
  App.tsx
  main.tsx
  styles.css
```

The application is split by domain and UI responsibility instead of keeping all JSX and data inside one file.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
# Communication-Automation-Platform
