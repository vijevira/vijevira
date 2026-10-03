---
title: "BlindChat - End-to-End Encrypted Messenger"
description: "WhatsApp-style messenger with end-to-end encrypted chats, media and voice notes, plus peer-to-peer voice and video calls — on the web and Android"
pubDate: "2026-09-01"
updatedDate: "2026-10-03"
tags: ["React", "Vite", "WebRTC", "E2EE", "ECDH", "HKDF", "AES-GCM", "Web Crypto", "WebSocket", "Capacitor", "Android", "Play Store", "Cloudflare Workers", "Push Notifications"]
heroImage: "/projects-blindchat.svg"
---

## 📌 Overview

BlindChat is a **WhatsApp-style messenger** where messages, photos, voice notes and videos are **end-to-end encrypted** in the browser before they leave the device, and voice/video calls run **peer-to-peer over WebRTC**. The server stores ciphertext and routes it; it never holds the keys.

It runs as a web app and as a native Android app (Capacitor), currently in **alpha testing on Google Play**. Development started on 1 Sep 2026 and is ongoing.

👉 Try it live: [chat.endra.in](https://chat.endra.in)

📱 Android (Play Store alpha): [play.google.com/store/apps/details?id=in.endra.blindchat](https://play.google.com/store/apps/details?id=in.endra.blindchat)

---

## 💬 What You Can Do

- **1:1 and group chats** with delivered/read receipts, replies, reactions, edits, pinned and starred messages.
- **Encrypted media** — photos (with crop, rotate and drawing tools), GIFs and stickers, voice notes with a live waveform, and video messages up to 60 seconds.
- **Voice and video calls** with screen sharing; media flows peer-to-peer and never touches a server.
- **Friends by username or friend code**, with block and report.
- **Privacy on the device** — biometric app lock, and push notifications that carry only a title, never the message body.

---

## 🔒 Encryption Model

- Each device holds an **ECDH key pair**; peers derive a shared **AES-256-GCM** session key with **HKDF-SHA256**, all through the browser's Web Crypto API.
- Photos, voice notes and videos are encrypted with a per-file media key carried inside the encrypted message envelope, so thumbnails and previews are encrypted too.
- **Envelope key pinning** — sender and recipient public keys are pinned per message, so sent history survives a peer rotating keys.
- Messages that can't be decrypted on a device are hidden rather than shown as placeholders.
- A unique `(senderId, clientMsgId)` constraint makes sends idempotent, so retries and timeouts never produce duplicates.

---

## 🏗️ Architecture

BlindChat has no backend of its own — it reuses two existing services:

| Service | Role |
|---|---|
| **arcade-server** | Shared identity, friends, encrypted message storage, call history, and the real-time social WebSocket |
| **BlindParty signaling** | Call room codes and WebRTC signaling; audio and video stay peer-to-peer |

- The web client is a **React 18 + Vite** SPA deployed to **Cloudflare Workers**.
- The Android app wraps the same frontend with **Capacitor**, adding push notifications, biometric auth, Google sign-in, and foreground services that keep calls and screen shares alive when the app is minimized.
- Encrypted attachments are stored with a 30-day retention window.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router, Web Crypto API, WebRTC
- **Android:** Capacitor (push and local notifications, biometric auth, social login)
- **Backend:** arcade-server (Node.js, Prisma, PostgreSQL, WebSocket), BlindParty signaling server
- **Deployment:** Cloudflare Workers (web) · Google Play (Android, alpha)
