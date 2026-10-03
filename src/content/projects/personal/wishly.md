---
title: "Wishly - Automated Greetings & Milestone Reminders"
description: "Schedule birthday and anniversary wishes that send from your own WhatsApp, email, Telegram, Discord, or Slack — with interactive greeting cards and group co-signing"
pubDate: "2026-10-03"
updatedDate: "2026-10-03"
tags: ["TypeScript", "React", "Vite", "TailwindCSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Socket.IO", "Baileys", "WhatsApp", "Telegram", "MTProto", "Nodemailer", "AES-256-GCM", "Docker", "Vercel"]
heroImage: "/projects-wishly.svg"
---

## 📌 Overview

Wishly is an **automated greeting and milestone reminder platform**. You add birthdays, anniversaries and other dates once, and Wishly sends the wish on time — from **your own accounts** (WhatsApp, personal email, Telegram, Discord or Slack) rather than a generic bot number. This model is called **Bring Your Own Channel (BYOC)**.

👉 Try it live: [wishly.cc.cd](https://wishly.cc.cd)

---

## 🚀 Features

### 📱 Bring Your Own Channel
- **WhatsApp** — multi-device pairing with a live QR code streamed over WebSockets (Baileys); wishes arrive as image cards with the greeting as caption.
- **Telegram** — an interactive bot (`/today`, `/upcoming`, `/test`) plus a personal-account session (MTProto) for messaging usernames or phone numbers directly.
- **Email** — your own Gmail, Outlook 365 or custom SMTP, with HTML greeting cards.
- **Discord and Slack** — rich embeds and Block Kit messages via webhooks.

### 💌 Greeting Cards
- **Interactive web cards** — recipients open an animated wax-sealed envelope, leave reactions, and read a guestbook.
- **Group co-signing** — share a signing link before the day so friends and colleagues can add notes and stickers, with live notifications as signatures arrive.
- Server-rendered **link previews** so cards look right when shared on WhatsApp, Slack and iMessage.

### 🕒 Scheduling
- A background worker checks milestones every minute against each event's **local timezone**.
- Midnight or morning delivery, and advance reminders 1, 3 or 7 days ahead.
- **Per-year idempotency** (`eventId + triggerYear`) so a wish is never sent twice.
- **Trigger now** to test delivery immediately.

### 🪄 Extras
- **AI wish generator** with tones (heartfelt, funny, poetic, professional, short) and template variables like `{name}` and `{years}` (e.g. "25th Anniversary").
- **AI gift suggestions** by occasion, relationship and budget.
- **Calendar sync** — a live `.ics` subscription feed for Google, Apple and Outlook calendars, plus bulk import from `.ics` files.

---

## 🔒 Security

- SMTP passwords, API keys and session strings are encrypted at rest with **AES-256-GCM**.
- Disconnecting a channel purges its credentials from both the database and the file system.
- JWT authentication with bcrypt password hashing, and rate limiting on auth, OTP, AI, dispatch and public endpoints.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript, TailwindCSS, Framer Motion, Socket.IO client
- **Backend:** Node.js, Express, TypeScript, Prisma, PostgreSQL, Socket.IO, node-cron, Zod
- **Channels:** Baileys (WhatsApp), GramJS (Telegram MTProto), Nodemailer, Discord/Slack webhooks
- **Media:** sharp and ffmpeg for card images and video
- **Deployment:** Frontend on Vercel · Docker Compose for the full stack
