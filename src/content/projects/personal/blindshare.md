---
title: "BlindShare - P2P Secure Sharing Suite"
description: "Zero-persistence peer-to-peer file, text, code, and media sharing — no uploads, no servers, no storage"
pubDate: "2026-09-09"
tags: ["WebRTC", "P2P", "TypeScript", "React", "Vite", "Node.js", "WebSocket", "Cloudflare", "Privacy", "File Transfer", "RTCDataChannel"]
heroImage: "/projects-blindshare.svg"
---

## 📌 Overview

BlindShare is a **peer-to-peer sharing suite** built on WebRTC — every byte travels directly between two browsers, end-to-end encrypted by the browser's own DTLS layer (AES-GCM). The signaling server sees only SDP and ICE handshake metadata; it never touches your payload.

👉 Try it live: [blindshare.in](https://blindshare.in)

---

## 🧰 The Tool Suite

BlindShare is a single app with six modes, each purpose-built for a different sharing scenario:

| Tool | What it does |
|---|---|
| **BlindDrop** | File transfer — chunked `ArrayBuffer` over the data channel, any file type |
| **BlindText** | Plain-text messages — paste and send, nothing stored |
| **BlindSnippet** | Code sharing — monospace layout with syntax highlighting |
| **BlindSecret** | Credential-safe sharing — masked field, click-to-copy, no shoulder-surfing |
| **BlindShow** | View-once media — image/video self-removes from the UI after first view |
| **BlindCast** | Live screen share — `getDisplayMedia` streamed P2P, no relay through a server |

---

## 🔐 How the Security Works

- **All data is DTLS-encrypted** — mandatory WebRTC standard enforced by the browser, not optional.
- **Signaling server is zero-knowledge** — it holds in-memory room state (SDP + ICE candidates) only during connection setup. No payloads, no logs, no database.
- **No accounts, no storage** — there's nothing to breach because nothing is saved.
- **STUN/TURN for NAT traversal** — STUN gives public IPs for direct P2P. TURN relays (still DTLS-encrypted) kick in only when symmetric NAT or corporate firewalls block direct paths.

---

## 🏗️ Architecture

```
Browser A                    Signaling Server                  Browser B
(Sender)                     (Node.js + ws)                    (Receiver)
   │                               │                               │
   ├──── SDP offer ───────────────►│                               │
   │                               ├──── SDP offer ──────────────►│
   │                               │◄─── SDP answer ──────────────┤
   │◄─── SDP answer ───────────────┤                               │
   ├──── ICE candidates ──────────►│──── ICE candidates ──────────►│
   │                               │                               │
   └──────────── RTCDataChannel (DTLS/AES-GCM, P2P) ─────────────┘
                        payload never touches the server
```

---

## 🚀 Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React + Vite + TailwindCSS (TypeScript) |
| WebRTC | `RTCPeerConnection`, `RTCDataChannel`, `MediaStream` |
| File chunking | `FileReader` → 16–64 KB `ArrayBuffer` chunks → `Blob` reassembly |
| Signaling | Node.js + `ws` (WebSocket), in-memory room state |
| Deployment | Frontend on **Cloudflare** (blindshare.in) · Signaling on **Faable** |

---

## 📎 References

- [Live App](https://blindshare.in)
- [GitHub](https://github.com/vijevira/BlindShare)
