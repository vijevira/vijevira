---
title: "Cuff the Bluff - Multiplayer Dice Bluffing Game"
description: "Real-time multiplayer Liar's Dice game supporting up to 15 players with bot AI, built on Cloudflare Workers and Durable Objects"
pubDate: "2026-06-18"
tags: ["Cloudflare Workers", "Durable Objects", "WebSockets", "TypeScript", "Multiplayer Game", "Dice Game", "Vanilla JS", "Real-time", "Bot AI", "Serverless"]
heroImage: "/projects-cuff-the-bluff.svg"
---

# Cuff the Bluff – Multiplayer Dice Bluffing Game

## 📌 Overview
Cuff the Bluff is a **real-time multiplayer dice bluffing game** based on the classic Liar's Dice concept. Up to 15 players compete in a single room — no account, no install, works on any modern browser. The last player standing with dice wins.

The entire stack runs on **Cloudflare Workers + Durable Objects**, giving each game room its own stateful WebSocket server at the edge with zero cold starts.

👉 Play the live game here: [cuffthebluff.endra.in](https://cuffthebluff.endra.in)

---

## 🎲 How to Play

Each player starts with 5 dice (configurable 1–10), rolled secretly. **1s are always wild** and count toward any face bid.

On your turn, pick one action:
- **Place a Bid** — claim there are at least N dice showing face F across all players' hidden dice (wilds included)
- **Call Wilds** — switch to bidding on wilds only (quantity = ⌊lastBid / 2⌋)
- **Raise Wilds** — increase the wild count by 1
- **CUFF!** — challenge the current bid

**Resolution:** All dice are revealed. If actual count ≥ bid, the bid stood — challenger loses 1 die. If actual count < bid, bluff was caught — bidder loses 1 die. Lose all dice and you're eliminated. Last player standing wins.

---

## 🚀 Features

### Core Gameplay
- Real-time multiplayer for up to 15 players per room
- Full bid validation: Normal↔Wild transitions, quantity escalation rules, wild scaling
- Round resolution with full dice reveal
- Bot AI opponents — play vs 3 bots instantly without waiting for a lobby

### Bot AI
- Probability-based strategy: estimates expected die counts from own dice + statistical averages
- Adaptive bluffing: 65% challenge rate on high bids, 8% on marginal ones
- Face selection based on highest count in bot's hand
- Human-like pacing: 900–1200ms delay per decision

### Lobby & Room Management
- 6-character room codes for instant sharing
- Configurable dice count per player (1–10) and turn time limit (10–120s)
- Host-only controls: start game, kick players, configure settings
- Automatic host transfer on disconnect

### Reconnection & Session Handling
- Reconnect tokens stored in localStorage — refresh the page to rejoin automatically
- 15-second grace period before turn auto-advances on disconnect
- Room auto-cleanup after 1 hour via Durable Object alarm

### UI/UX
- CSS dice dot-pattern rendering with hover animations
- Turn countdown timer with visual alerts
- Round-end overlay with full bid resolution and dice reveal
- Player badges: HOST, YOU, BOT, AWAY with dice count and elimination status
- Dark theme with gradient UI, mobile-responsive
- "How to Play" help overlay and share room code button

---

## 🛠️ Tech Stack

### Frontend
- Vanilla JavaScript + HTML + CSS (single self-contained HTML file, no framework)
- Web Audio API for sound effects (no external audio files)

### Backend
- TypeScript
- Cloudflare Workers (stateless HTTP/WebSocket gateway)
- Cloudflare Durable Objects (one per room — stateful, in-memory game state + WebSocket hub)

### Infrastructure
- Wrangler CLI for build and deployment
- No external database — all game state held in-memory per Durable Object instance

---

## 🏗️ Architecture

### Stateless Worker + Stateful Durable Object Pattern
- **Worker (`index.ts`)** — routes WebSocket upgrade requests and serves the HTML frontend
- **Room Durable Object (`room.ts`)** — one instance per room code; holds all game state, handles all WebSocket connections, enforces game rules, runs bot AI

This means each room is fully isolated, scales horizontally, and requires no database.

### WebSocket Message Protocol
- **Client → Server:** join, reconnect, placeBid, cuff, setDiceCount, setTimeLimit, kick, leave
- **Server → Client:** joined (with reconnect token), roomState (full broadcast), yourDice (secret), error, kicked, roomNotFound

### Reconnection Token System
- UUID tokens stored in Durable Object storage + client localStorage
- 1-hour expiry window prevents unauthorised rejoin after elimination

---

## 📂 Key Features in Action

### 🎲 Bluff or CUFF
Every bid is a gamble — the tension builds as quantities escalate and players weigh the odds of calling CUFF at the right moment.

### 🤖 Play vs Bots Instantly
Jump into a 1v3 bot game in seconds. Bots use probability models to challenge and bid realistically.

### ⚡ Edge-Native Real Time
Cloudflare Durable Objects keep each room's state at the edge — WebSocket latency is minimal regardless of where players are.

### 🔄 Reconnect Without Losing Your Seat
Refreshing the page automatically rejoins your active game using the stored reconnection token.

---

## 🌐 Deployment

- **Hosting:** Cloudflare Workers + Durable Objects (globally distributed edge)
- **GitHub:** [github.com/vijevira/cuff-the-bluff](https://github.com/vijevira/cuff-the-bluff)
- Live at: https://cuffthebluff.endra.in

---

## 📎 References

- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Liar's Dice – Wikipedia](https://en.wikipedia.org/wiki/Liar%27s_dice)
