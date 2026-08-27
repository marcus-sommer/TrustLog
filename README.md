# TrustLog

A guided workspace for SMEs to produce an audit-ready **Record of Processing Activities** under GDPR Article 30 — then download it as PDF and keep it in their own archive.

TrustLog is an interview, not a blank legal form. It asks for the company, the tools used day to day, the data that flows through them, and the purposes those tools serve. Common systems (Microsoft 365, e-conomic, Danløn, HubSpot, and others) come with sensible defaults for hosting, legal basis, and retention.

## What it produces

- Controller details (name, CVR, address, employees, DPO / EU representative)
- Systems and data flows
- Processing activities: purpose, data subjects, personal data, legal basis, recipients, third-country transfers, retention
- Technical and organisational measures (Art. 32)
- PDF and Markdown export
- Shared workspace link for collaborative editing
- Audit reminders with calendar (`.ics`) download

This is a working record, not legal advice.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **Start from scratch** — seven-step interview
- **Preview a sample company** — Nordlys Design ApS, a made-up Danish agency

Work is saved in the browser. Use **Team → Publish & copy** to store the workspace on the server (`data/workspaces/`) so a colleague can open `/w/[id]`.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, jsPDF.
