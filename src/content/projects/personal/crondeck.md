---
title: "CronDeck - Cron Jobs & Uptime Monitoring"
description: "Developer-focused cron-as-a-service — schedule HTTP requests, inspect every execution, and monitor uptime with heartbeats, alerts, and public status pages"
pubDate: "2026-09-25"
updatedDate: "2026-10-02"
tags: ["TypeScript", "Deno", "Deno Deploy", "Hono", "SQLite", "Turso", "libSQL", "Cron", "Uptime Monitoring", "Status Pages", "SSRF Protection", "Cloudflare Workers", "Vercel Edge"]
heroImage: "/projects-crondeck.svg"
---

## 📌 Overview

CronDeck is a **cron-as-a-service platform for developers**. You schedule HTTP requests with cron expressions, and every execution is recorded with its status, HTTP code, duration, response headers and response excerpt — so when a job fails you can see exactly why.

On top of scheduled jobs it adds **uptime monitors, heartbeat checks, incidents and public status pages**, with alerts by email and Slack.

👉 Try it live: [crondeck.cc.cd](https://crondeck.cc.cd)

---

## 🚀 Features

### Scheduled HTTP Jobs
- Cron expressions with explicit **IANA timezone** selection (browser timezone detected by default).
- Any method, custom headers, query params, request body, and auth configuration (stored encrypted).
- **Run now** for manual execution, plus configurable per-job timeouts.
- Full **execution history** with status, response code, duration, headers and body excerpt.

### Monitoring & Alerts
- **Uptime monitors** with response assertions.
- **Heartbeat checks** that alert when a job stops pinging in.
- **TLS certificate expiry** checks.
- Failure alerts after N consecutive failures, **auto-disable** rules, and recovery notifications — by email and Slack.
- **Incidents** and public **status pages** with optional custom domains and branding.

### Platform
- Google and GitHub sign-in, team members, and a **REST API** with API keys.
- Free, Developer, and Pro plans with per-plan limits on jobs, monitors, status pages, history retention and minimum interval.

---

## 🔒 Security

A scheduler that fires arbitrary HTTP requests is an SSRF risk, so target URLs are validated before they are stored and again before they run:

- HTTP and HTTPS only, no embedded credentials.
- Local, private and reserved hostnames blocked; DNS resolved through DNS-over-HTTPS and private/reserved IPs rejected, including IPv4-mapped IPv6.
- Restricted header names and values, request body size limits, and a 30-second outbound timeout.
- No automatic redirect following, and capped capture of response headers and bodies.
- Same-origin checks on browser mutations and per-user rate limits.

---

## 🏗️ Architecture

- A single **Hono** app on **Deno Deploy** serves the dashboard, API and public pages.
- A **1-minute `Deno.cron`** tick finds due jobs, claims each with a short lock, runs them in concurrent batches of 25, records the execution, and computes the next run with **croner**.
- The same tick checks overdue heartbeats, downgrades expired subscriptions, and purges deleted accounts.
- State lives in **SQLite on Turso (libSQL)** — users, jobs, executions, monitors, status pages and subscriptions.
- Status pages on managed subdomains and custom domains (e.g. `status.yourbrand.com`) are routed and cached by a **Cloudflare Workers** edge layer, with a **Vercel Edge** reverse proxy issuing SSL for customer domains.

---

## 🛠️ Tech Stack

- **Runtime:** Deno, TypeScript
- **Web:** Hono, server-rendered HTML UI
- **Scheduling:** `Deno.cron`, croner
- **Database:** SQLite (Turso / libSQL)
- **Edge:** Cloudflare Workers (status pages), Vercel Edge (custom domains)
- **Deployment:** Deno Deploy
