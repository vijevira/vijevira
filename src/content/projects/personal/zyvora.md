---
title: "Zyvora - SaaS Task Management Platform"
description: "Enterprise-grade Jira-like project management platform with Kanban boards, sprints, and real-time collaboration built as a TypeScript monorepo"
pubDate: "2026-05-25"
tags: ["React", "TypeScript", "Node.js", "Express", "Socket.IO", "PostgreSQL", "Redis", "TailwindCSS", "Turborepo", "BullMQ", "Docker", "SaaS", "Kanban", "Monorepo", "TanStack Query", "Zustand", "Vite", "Cloudflare", "Render"]
heroImage: "/project-zyvora.png"
---

# Zyvora – SaaS Task Management Platform

## 📌 Overview
Zyvora is a **full-featured SaaS project management platform** — a Jira-like tool built from scratch with enterprise-grade architecture. It supports multi-tenant workspaces with role-based access control, rich task hierarchies, multiple board views, and real-time collaboration.

The project is built as a **TypeScript monorepo** using Turborepo, with a React + Vite frontend and a Node.js + Express backend, connected by Socket.IO for live updates.

👉 Try the live app here: [zyvora.endra.in](https://zyvora.endra.in)

---

## 🚀 Features

### Multi-Tenant SaaS & Access Control
- **Role-Based Access Control (RBAC)** with six roles: Owner, Admin, Manager, Team Lead, User, Viewer.
- Each workspace is fully isolated — organizations manage their own projects, members, and data.
- Audit logs for all significant actions.

### Task Hierarchy
- **Epics → Stories → Tasks → Subtasks / Bugs** — full nested issue structure.
- Inline editing for all task properties: title, assignee, priority, status, due date, labels.
- Rich text descriptions via TipTap editor.

### Board Views
- **Kanban Board** — drag-and-drop cards across status columns using dnd-kit.
- **Sprint Backlog** — plan and manage sprints with velocity tracking.
- **Calendar View** — visualize due dates and deadlines across the team.
- **Timeline / Roadmap View** — high-level planning across epics and sprints.

### Real-Time Collaboration
- Socket.IO powers live board updates — changes by one user reflect instantly for all teammates.
- Comments with @mentions and threaded discussions.
- Activity timeline on every task showing the full change history.

### Notifications & Async Jobs
- **In-app notifications** for mentions, assignments, and status changes.
- **Email notifications** sent via Resend, processed asynchronously through BullMQ job queues backed by Redis.

### File Attachments
- Upload files directly to tasks, stored in AWS S3 or Cloudflare R2.

### Sprint Planning
- Create and manage sprints with start/end dates.
- Velocity tracking across completed sprints.
- Move unfinished issues to the next sprint automatically.

### Search & Productivity
- Advanced search and filtering across all issues.
- Keyboard shortcuts and command palette for fast navigation.

---

## 🛠️ Tech Stack

### Frontend
- React 18, Vite, TypeScript
- TailwindCSS + Radix UI (accessible components)
- TanStack React Query (server state)
- Zustand (client state)
- React Hook Form + Zod (forms and validation)
- TipTap (rich text editor)
- dnd-kit (drag-and-drop)
- Framer Motion (animations)
- Socket.IO Client
- Lucide React (icons)

### Backend
- Node.js, Express, TypeScript
- PostgreSQL + Knex (query builder)
- Redis
- BullMQ (job queues for email/notification workers)
- Socket.IO (real-time events)
- JWT (jsonwebtoken) + bcryptjs (auth)
- Resend (transactional email)
- Helmet (security headers), rate limiting
- Pino + Morgan (logging)

### Infrastructure
- Docker + Docker Compose (local dev and production)
- Turborepo + pnpm workspaces (monorepo tooling)

---

## 🏗️ Architecture

### Monorepo Structure
```
zyvora/
├── apps/
│   ├── web/      # React + Vite frontend
│   └── api/      # Node.js + Express backend
└── packages/
    └── shared/   # Shared types and utilities
```

### Backend Design
- Multi-tenant data model with workspace-scoped queries.
- RBAC middleware enforces permissions on every API route.
- BullMQ workers handle email delivery and notification fan-out asynchronously, keeping API responses fast.
- Socket.IO rooms are scoped per workspace and project, broadcasting only relevant updates to connected clients.

### Frontend Design
- TanStack Query handles all server state — caching, background refetching, and optimistic updates.
- Zustand manages ephemeral UI state (modals, drag state, command palette).
- All drag-and-drop interactions use dnd-kit with server-side persistence on drop.

---

## 📂 Key Features in Action

### 🗂️ Kanban Board
Drag tasks between status columns in real time. Other team members see the card move instantly without a page refresh.

### 🏃 Sprint Planning
Create sprints, drag backlog items in, set dates, and track velocity from the sprint view. Unfinished work rolls over automatically.

### ✍️ Rich Task Descriptions
TipTap powers a full rich-text editor with headings, code blocks, bullet lists, and inline mentions — no plain textarea.

### 🔔 Smart Notifications
Mention a teammate in a comment and they get an in-app notification and email — all processed in the background via BullMQ so the UI stays fast.

### 👥 Role Management
Workspace owners can invite members and assign roles with fine-grained permissions down to Viewer (read-only) access.

---

## 🌐 Deployment

- **Frontend:** Cloudflare Workers — fast global CDN delivery with SPA routing
- **Backend API:** [Render](https://render.com) — persistent Node.js server with WebSocket support
- **DNS & CDN:** Cloudflare
- Live at: https://zyvora.endra.in

---

## 📎 References

- [Jira](https://www.atlassian.com/software/jira) – Product inspiration
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [dnd-kit Documentation](https://dndkit.com/)
- [BullMQ Documentation](https://docs.bullmq.io/)
