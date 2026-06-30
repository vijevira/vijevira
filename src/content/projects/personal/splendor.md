---
title: "Splendor - Multiplayer Board Game"
description: "Digital implementation of the Splendor board game for 2–12 players with bot AI, real-time play, and in-game chat, built on Cloudflare Workers and Durable Objects"
pubDate: "2026-06-26"
tags: ["Cloudflare Workers", "Durable Objects", "WebSockets", "TypeScript", "Multiplayer Game", "Board Game", "Vanilla JS", "Real-time", "Bot AI", "Serverless"]
heroImage: "/projects-splendor.svg"
---

# Splendor – Multiplayer Board Game

## 📌 Overview
Splendor is a **digital implementation of the classic Splendor board game** — a Renaissance gem trading strategy game for 2–12 players. Players act as gem merchants collecting tokens, buying development cards, and attracting noble patrons to build the most prestigious trading empire.

The entire stack runs on **Cloudflare Workers + Durable Objects**, with one stateful edge instance per game room. The frontend is a single self-contained HTML file with no external dependencies.

👉 Play the live game here: [splendor.endra.in](https://splendor.endra.in)

---

## 🎴 How to Play

Players take turns choosing one action:
1. **Take 3 different gem tokens** from the bank
2. **Take 2 tokens of the same color** (only if ≥4 available)
3. **Reserve a card** from the market (draw 1 gold wild token)
4. **Buy a card** from the market or your reserved hand using tokens + bonuses

Each purchased card grants a permanent gem color **bonus** that discounts future purchases. Nobles are automatically claimed when your bonuses match their requirements.

**First to 15 prestige points** triggers the final round. Ties are broken by fewest cards purchased.

---

## 🚀 Features

### Core Gameplay
- Full Splendor rules: token economy, card purchases, nobles, prestige scoring
- Market refill on card purchase; noble auto-claim when requirements are met
- Token overflow handling — forced return when holding more than 10
- Scales to 12 players using a double card set (180 cards, 15 nobles)
- End-game detection: first to 15 triggers final round; winner calculated at round's end

### Bot AI
- Buys the highest-point affordable card from market or reserved hand
- Analyzes token demand across all affordable cards to decide which gems to take
- Falls back gracefully to any valid action
- Auto-activates after 35 seconds if a player disconnects (keeps the game moving)
- Token return strategy: returns gold first, then lowest-demand colors

### Multiplayer Features
- 2–12 players per room with 6-character room codes
- Real-time in-game **chat** (last 100 messages cached and shown to reconnects)
- Host controls: start game, add bots, set turn timer, end game early
- Automatic host handoff on disconnect
- Configurable turn timer: off, 60s, 90s, or 120s
- Auto-play on timer expiry (bot takes the turn)

### Reconnection & Session Handling
- UUID-based sessions — rejoin an active game by re-entering with your name and room code
- 35-second grace period before bot takeover on disconnect
- Connection quality tracking with live connection status per player

### UI/UX
- **3D poker chip token rendering** with radial gradients, shadows, and hover animations
- **Procedural SVG card art** — unique visuals per level and color theme (no image assets)
- **"Jeweler's Cabinet" dark theme** — warm brown background, burnished gold accents
- Card hover tooltips showing affordability breakdown
- Player panel with point counter (pop animation), bonus chips, token counts, turn indicator (golden pulse)
- Procedural sound effects via Web Audio API — no external audio files
- Mobile-responsive layout that reflows cards for smaller screens

---

## 🛠️ Tech Stack

### Frontend
- Vanilla JavaScript + HTML + CSS (single self-contained HTML file, ~3000 lines, no framework)
- Procedural SVG generation for card art and noble tiles
- Web Audio API for in-game sounds (oscillator-based synthesis)

### Backend
- TypeScript
- Cloudflare Workers (HTTP/WebSocket gateway + static asset serving)
- Cloudflare Durable Objects (one per room — stateful, in-memory game state + WebSocket hub)

### Infrastructure
- Wrangler CLI for build and deployment
- No external database — all game state in-memory per Durable Object

---

## 🏗️ Architecture

### Worker + Durable Object Pattern
- **Worker (`index.ts`)** — routes requests: WebSocket upgrades go to the room's Durable Object; GET requests serve the HTML frontend
- **Room Durable Object (`room.ts`)** — one instance per room code; owns all game state, handles all player WebSocket connections, enforces rules, runs bot AI, and manages chat

### Type-Safe Message Protocol
- **Client → Server (14+ types):** create, join, take3, take2, reserve, buy, chooseNoble, returnTokens, startGame, chat, ping, setTimer, addBot, endGame
- **Server → Client (8+ types):** roomState (full broadcast), yourPrivate (hidden reserved cards + tokens), error, awaitReturn, chooseNoble, chatMessage, pong

### Game State Structure
```
GameState: roomCode, phase (lobby|playing|ended), players[], hostId,
currentPlayerIndex, market (3 levels × 4 slots), pool (tokens),
nobles, decks, round, endTriggeredBy, winner, turnTimerSeconds,
turnStartedAt, awaitingReturn, awaitingNoble, pendingNobleOptions
```

### Game Data
- 180 cards across 3 tiers (40 Level 1 / 30 Level 2 / 20 Level 3 × 2 sets)
- 15 noble tiles (10 base + 5 extended for >6 player games)
- O(1) card/noble lookups via CARD_MAP and NOBLE_MAP

---

## 📂 Key Features in Action

### 💎 Strategic Gem Economy
Every token take and card purchase is a trade-off — accumulate the right colors to chain discounts and race to 15 points before your opponents.

### 🏛️ Noble Auto-Claim
Build enough card bonuses in the right colors and a noble visits automatically — no turn wasted, the game tracks requirements in real time.

### 💬 Live In-Game Chat
Message your opponents mid-game. Chat history persists across reconnects so no one misses what was said.

### 🤖 Bot Opponents
Add bots to fill empty seats. If a player disconnects, a bot takes over automatically after 35 seconds so the game never stalls.

### ⚡ Edge-Native Real Time
Cloudflare Durable Objects keep each room's state at the network edge — low-latency WebSocket updates with no central server bottleneck.

---

## 🌐 Deployment

- **Hosting:** Cloudflare Workers + Durable Objects (globally distributed edge)
- **GitHub:** [github.com/vijevira/Splendor](https://github.com/vijevira/Splendor)
- Live at: https://splendor.endra.in

---

## 📎 References

- [Splendor Board Game](https://boardgamegeek.com/boardgame/148228/splendor) – Original game by Marc André
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Web Audio API – MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
