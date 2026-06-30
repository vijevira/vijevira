---
title: "WatchTower - Web Scraping & Notification Platform"
description: "SaaS platform that monitors websites, RSS feeds, and JSON APIs for new content and delivers notifications to Discord, Slack, Telegram, and custom webhooks"
pubDate: "2026-05-25"
tags: ["React", "TypeScript", "Node.js", "Fastify", "PostgreSQL", "Redis", "BullMQ", "TailwindCSS", "Drizzle ORM", "TanStack Query", "Monorepo", "Wasmer", "Web Scraping", "Cheerio", "Notifications", "Webhooks", "SaaS"]
heroImage: "/projects-watchtower.png"
---

# WatchTower – Web Scraping & Notification Platform

## 📌 Overview
WatchTower is a **web scraping and notification automation platform** that monitors websites, RSS feeds, and JSON APIs for new content. When new posts are detected, they're delivered in real time to Discord, Slack, Telegram, or any custom webhook endpoint.

The project is built as a **TypeScript monorepo** with a React + Vite frontend and a Fastify backend, powered by a BullMQ job queue pipeline for reliable scraping, processing, and delivery with automatic retries.

👉 Try the live app here: [watchtower.wasmer.app](https://watchtower.wasmer.app)

---

## 🚀 Features

### Monitor Types
- **HTML/CSS Selector Scraping** — configure custom CSS selectors for list container, post links, titles, content, author, and publish date
- **RSS / Atom Feeds** — automatic feed parsing and new-post detection
- **JSON APIs** — JSONPath-based extraction from structured API responses
- **Netmarble Forum** — special-cased parser for `forum.netmarble.com` API

### Monitor Configuration
- Custom check interval (60s to 86400s, default 5 min)
- Enable/disable toggle per monitor
- Post age filter — ignore posts older than a configurable threshold
- Manual trigger and state reset
- Test selectors on a live URL before saving

### Notification Channels
- **Discord** — formatted embeds with title, content, images, and markdown
- **Slack** — Block Kit formatted messages
- **Telegram** — HTML-formatted bot messages
- **Generic Webhooks** — custom HTTP POST to any endpoint

### Delivery Reliability
- Exponential backoff retry strategy: 4 attempts at 30s → 2m → 5m → 15m
- Full delivery log per post: status, HTTP response code, error messages
- Concurrency-controlled workers (Monitor: 5, Processing: 5, Delivery: 10)

### Auth & Accounts
- Email/password registration with email verification
- Password reset flow
- JWT-based auth via HTTP cookies
- Full user isolation — each user sees only their own monitors and webhooks

### Dashboard
- Live stats: total monitors, active monitors, posts detected today, webhooks sent today
- Monitor detail view: post history, delivery status, webhook linkage
- Delivery logs page with per-attempt status and error details

---

## 🛠️ Tech Stack

### Frontend
- React 18, Vite, TypeScript
- Tailwind CSS + Radix UI
- TanStack React Query
- React Router v6
- React Hook Form + Zod
- Lucide icons, date-fns

### Backend
- Node.js, Fastify 5, TypeScript
- PostgreSQL 16 + Drizzle ORM
- Redis 7 + BullMQ (job queues)
- Cheerio (HTML parsing), RSS Parser, Axios
- Resend (email), JWT + bcryptjs (auth)
- Zod (schema validation)

### Infrastructure
- Wasmer.io (serverless deployment — frontend + backend)
- Docker + Docker Compose (local development)
- Turborepo + pnpm workspaces (monorepo)
- cron-job.org (external cron to trigger scraping cycles)

---

## 🏗️ Architecture

### Monorepo Structure
```
apps/
  ├── backend/    Node.js + Fastify API + BullMQ workers
  └── frontend/   React + Vite SPA
packages/
  └── shared/     Zod schemas + shared TypeScript types
```

### Job Queue Pipeline
Scraping runs through a three-stage BullMQ pipeline:

1. **Monitor Worker** — fetches latest posts from the configured source, deduplicates against `lastSeenPostId`, filters by age, queues new posts for processing
2. **Processing Worker** — fetches full post content, sanitizes HTML, extracts images, creates post record in DB, queries linked webhooks, queues delivery jobs
3. **Delivery Worker** — sends formatted payloads to each webhook (Discord embeds, Slack blocks, Telegram HTML), retries on failure with exponential backoff, logs every attempt

### Scheduling Flow
An external cron (cron-job.org) hits `POST /api/worker/run` with a secret header every minute. The endpoint finds all enabled monitors due for a check (`lastCheckedAt < NOW() - checkInterval`), enqueues them, and returns immediately (202). Workers process jobs in the background within a 50-second window per cycle.

### HTML Parsing
Cheerio traverses the DOM using user-configured CSS selectors. Relative URLs are resolved to absolute, images are extracted, HTML is sanitized, and a plain-text version is generated alongside the HTML version.

---

## 📂 Key Features in Action

### 🕵️ Monitor Any Source
Point WatchTower at a forum, blog, RSS feed, or JSON API. Configure selectors once — it handles the rest automatically on your chosen interval.

### 📬 Multi-Channel Delivery
One monitor can fan out to multiple webhooks simultaneously. Discord, Slack, Telegram, and custom endpoints are all supported with platform-native formatting.

### 🔁 Reliable Delivery with Retries
Failed deliveries automatically retry up to 4 times with exponential backoff. The delivery log shows exactly what happened at each attempt.

### 📊 Dashboard Stats
See at a glance how many posts were detected today and how many webhooks fired — without digging through logs.

---

## 🌐 Deployment

- **Frontend:** Wasmer.io serverless
- **Backend:** Wasmer.io serverless (`watchtower-backend.wasmer.app`)
- **GitHub:** [github.com/vijevira/WatchTower](https://github.com/vijevira/WatchTower)
- Live at: https://watchtower.wasmer.app

---

## 📎 References

- [Wasmer.io](https://wasmer.io/) – Deployment platform
- [BullMQ Documentation](https://docs.bullmq.io/)
- [Cheerio Documentation](https://cheerio.js.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Fastify Documentation](https://fastify.dev/)
