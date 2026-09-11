---
title: "BlindParty - P2P Watch Party & Video Call"
description: "Peer-to-peer watch party, video call, and group chat for up to 6 people — ephemeral, zero server-side persistence"
pubDate: "2026-09-11"
tags: ["WebRTC", "P2P", "TypeScript", "React", "Vite", "Node.js", "WebSocket", "Screen Share", "Video Call", "Cloudflare", "Mesh Network"]
heroImage: "/projects-blindparty.svg"
---

## 📌 Overview

BlindParty is a **P2P watch party and video calling app** for small groups — camera, mic, screen sharing, and chat, all flowing directly between browsers. No accounts, no recordings, no server-side state beyond the signaling handshake.

While it shares BlindShare's "zero-persistence signaling" ethos, BlindParty is a **separate product** with its own signaling protocol — BlindShare's room model is strictly 2-peer; BlindParty runs a full N-peer mesh.

👉 Try it live: [party.blindshare.in](https://party.blindshare.in)

---

## 🎉 What You Can Do

- **Watch Party** — share your screen, tab, or window; everyone in the room watches P2P in real time.
- **Video Call** — camera + mic grid for all participants, mute/camera toggles, per-peer connection indicators.
- **Group Chat** — ephemeral text sidebar fanned out over each participant's `RTCDataChannel` — never touches the server.
- **Room Lifecycle** — rooms persist while at least one person remains; anyone can start or stop screen share mid-call.

> ⚠️ **DRM limitation:** Watch parties do not work for Netflix, Hotstar, Prime Video, or any platform using HDCP/output-protection. It works great for local video files, YouTube, games, slides, and general screen sharing.

---

## 🏗️ Architecture — Full Mesh

BlindParty maintains one `RTCPeerConnection` per other participant. For a 4-person room, each client manages 3 connections.

```
           ┌──── Signaling Server ────┐
           │  Node.js + ws            │
           │  Room roster by peer ID  │
           │  Targeted offer/answer   │
           │  relay (not broadcast)   │
           └──────────────────────────┘
                ▲   ▲   ▲   ▲
                │   │   │   │ (SDP + ICE only)
           ┌────┘   │   │   └────┐
         Peer A   Peer B   Peer C  Peer D
           │ ←──────────────────→ │
           │ ←──────────→         │
           │                ←────→│
           └─── full mesh, P2P ───┘
              (DTLS-encrypted media + data)
```

**Max room size: 6 peers** — mesh topology doesn't scale linearly; a real SFU (mediasoup/LiveKit) would be needed for larger rooms.

---

## 🔁 Renegotiation-Capable WebRTC

Unlike BlindShare's simpler one-shot connections, BlindParty's `useGroupWebRTC` hook supports **mid-call renegotiation** — adding or removing camera, mic, or screen-share tracks after the call has started without dropping connections.

---

## 🚀 Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React + Vite + TailwindCSS (TypeScript) |
| WebRTC | `RTCPeerConnection` (per peer), `RTCDataChannel`, `MediaStream`, `getDisplayMedia` |
| Signaling | Node.js + `ws` — N-peer rooms, targeted relay, persistent-while-occupied |
| Deployment | Frontend on **Cloudflare** (party.blindshare.in) · Signaling on **Faable** |

---

## 📎 References

- [Live App](https://party.blindshare.in)
- [GitHub](https://github.com/vijevira/BlindParty)
