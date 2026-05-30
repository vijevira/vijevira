---
title: "Chhakkadi Online Card Games"
description: "Real-time multiplayer Indian card game platform with 3 game variants — Chhakkadi, Dehla Pakad, and Call Break — built with React, Socket.IO, and Node.js"
pubDate: "2026-05-02"
tags: ["React", "Socket.IO", "Node.js", "Express", "Multiplayer Game", "Card Game", "WebSockets", "Cloudflare", "Cloudflare Durable Objects", "Railway", "JavaScript", "Dehla Pakad", "Call Break", "Bot Player"]
heroImage: "/projects-chhakkadi.png"
---

# Multiplayer Card Game Platform

## 📌 Overview
Chhakkadi is a **real-time multiplayer Indian card game platform** supporting three classic trick-taking games: **Chhakkadi**, **Dehla Pakad**, and **Call Break**. Players can create rooms, invite friends, and compete in live multiplayer matches with full game rule enforcement on the server.

The project is built with a **React frontend** and a **Node.js + Socket.IO backend** for low-latency real-time communication. The backend supports two deployment modes: a traditional Express server (Railway) and a modern Cloudflare Durable Objects setup for edge-native WebSocket handling.

👉 Play the live game here: [chhakkadi.endra.in](https://chhakkadi.endra.in)

---

## 🚀 Features

### Core Multiplayer Features
- **Real-Time Multiplayer Gameplay**
  - Create private game rooms with unique 6-character room codes.
  - Join using room invite codes or shareable links.
  - Live synchronization using Socket.IO.

- **Bot Player Support**
  - AI bots fill empty seats so games can start without a full lobby.
  - Automatic card play logic handled server-side via BotPlayer.

- **Player Reconnect & Room Cleanup**
  - Disconnected players can rejoin mid-game without losing state.
  - Empty rooms are automatically cleaned up server-side.

---

### 🎴 Game Variants

#### Chhakkadi (6 Players, Team-Based)
- 3 vs 3 team structure with dynamic seating positions.
- 48-card deck (2s removed).
- Strategic bidding: options of 6, 7, 8 (or 5 for the shuffler).
- Winning bidder selects trump suit (including No Trump / Joker mode).
- **Call 8 mechanic** — teams can escalate a 6/7 bid to a full sweep for a high-risk multiplier reward.
- **Gulam/Raja system** — role-based mechanics with score reset penalties.
- Complex scoring with multipliers based on bid and trick outcomes.

#### Dehla Pakad (4 Players, Team-Based)
- Opposite players are teammates.
- Full 52-card deck.
- Trump suit is **not pre-selected** — determined through gameplay when the first player can't follow the leading suit.
- Objective: capture 10-value cards (Dehlas — the four 10s).
- **Court mechanic** — capturing all four 10s wins the court, granting a score bonus.
- Consecutive leading rule enforced for trick winners.

#### Call Break (4 Players, Individual)
- Spades are always trump — no trump selection phase.
- Each player bids on the number of tricks they'll win before the round starts.
- Scoring based on bid accuracy: making or exceeding bid earns points; falling short subtracts.
- Individual competition — no teams.

---

### UI/UX Features
- Responsive multiplayer table layout for desktop and mobile.
- Animated card dealing and real-time trick reveal display.
- Turn-based card play validation (follow-suit rules enforced).
- Live scoreboard updates after each trick and round.
- Round-end summary overlays and game-over winner announcement.
- Touch-friendly buttons and card interactions.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Socket.IO Client
- CSS3 / Responsive UI

### Backend
- Node.js (>=22)
- Express.js
- Socket.IO
- Custom game classes: `GameRoom`, `DehlaRoom`, `CallbreakRoom`, `BotPlayer`

### Deployment
- **Option A (Traditional):** Frontend on Cloudflare Pages · Backend on [Railway](https://railway.com?referralCode=oHqhM6)
- **Option B (Edge):** Frontend + Backend on Cloudflare Workers using **Cloudflare Durable Objects** for stateful WebSocket rooms
- DNS & CDN: Cloudflare

---

## 🏗️ Architecture

### Frontend Architecture
- React component-based UI with server-driven state.
- Socket event-driven interactions for all game phases.
- Dynamic rendering of player positions, card hands, and gameplay phases.

### Backend Architecture
- Two server implementations in the same repo:
  - `/server` — Express + Socket.IO, runs on port 3001 (traditional hosting)
  - `/cf-server` — Cloudflare Durable Objects with native WebSocket support (Wrangler v4+)
- In-memory room management with server-authoritative game state.
- Game engines enforce all rules: bidding, trump selection, trick resolution, scoring, and Gulam/Raja mechanics.

### Real-Time Communication
- WebSocket-based multiplayer via Socket.IO.
- Room-specific broadcasting keeps game state isolated per room.
- Server validates all player actions before broadcasting updates.

---

## 🎮 Gameplay Flow

### Chhakkadi
1. Host creates a room → unique 6-character code generated.
2. Up to 6 players join (bots fill remaining seats).
3. **Bidding Phase** — players bid; highest bidder wins.
4. **Trump Selection** — bid winner selects trump suit.
5. **Play Phase** — players take turns; tricks resolved in real time.
6. **Call 8** — teams with 6/7 bids may attempt a full sweep.
7. **Scoring** — team points updated with multipliers after each round.
8. **Game Over** — winning team announced when target score is reached.

### Dehla Pakad
1. 4 players join; opposite seats are teammates.
2. **No bidding** — play begins immediately.
3. Trump is set the first time a player can't follow the leading suit.
4. Players aim to capture 10-value cards (Dehlas).
5. Capturing all four 10s triggers the Court mechanic for a bonus.
6. Scores tallied per round; game continues until a team wins.

### Call Break
1. 4 players join individually (no teams).
2. Each player bids on tricks they'll win.
3. Spades always trump — no selection phase.
4. Play proceeds round by round; accuracy of bids determines score.
5. Game ends after a set number of rounds; highest score wins.

---

## 🌐 Deployment Architecture

### Production URLs
- Frontend: https://chhakkadi.endra.in
- Backend API: https://api-chakkaddi.endra.in

### GitHub
- [github.com/vijevira/Chhakkadi](https://github.com/vijevira/Chhakkadi)

---

## 📂 Key Features in Action

### 🎴 Create & Join Rooms
Players create private multiplayer rooms and share room links. Bots fill any unfilled seats automatically.

### ⚡ Real-Time Gameplay
All player actions synchronize instantly using Socket.IO with server-side validation on every move.

### 🤖 Bot Players
AI bots handle card play automatically, making it possible to start and test games without a full lobby.

### 🧠 Strategic Bidding (Chhakkadi & Call Break)
Players compete with bids and team coordination to maximize score, with risk/reward mechanics like Call 8.

### 🃏 Dynamic Trump System
Trump selection (Chhakkadi) or dynamic trump assignment (Dehla Pakad) significantly changes gameplay strategy each round.

### 📱 Responsive UI
Optimized experience for desktop and mobile gameplay across all three game variants.

---

## 📎 References

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Railway Deployment Docs](https://docs.railway.com/)
