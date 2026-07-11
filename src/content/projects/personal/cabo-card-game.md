---
title: "Cabo - Multiplayer Card Game"
description: "Real-time multiplayer Cabo card game for 2–15 players with bot AI, built on Cloudflare Workers and Durable Objects"
pubDate: "2026-07-10"
tags: ["Cloudflare Workers", "Durable Objects", "WebSockets", "TypeScript", "Multiplayer Game", "Card Game", "Vanilla JS", "Real-time", "Bot AI", "Serverless"]
heroImage: "/projects-cabo.svg"
---

# Cabo – Multiplayer Card Game

## 📌 Overview
Cabo is a **real-time multiplayer card game** for 2–15 players. The goal is simple: keep your score low and be the last player standing. Declare "Show!" when you think you have the lowest hand — but call it wrong and you pay a 50-point penalty.

Built entirely on **Cloudflare Workers + Durable Objects** — one DO instance per room, stateful WebSocket connections at the edge, zero cold starts, and no database to manage.

👉 Play the live game here: [cabo.endra.in](https://cabo.endra.in)

---

## 🃏 How to Play

**Objective:** Have the lowest running score. Reach 200+ points and you're eliminated. Last player standing wins.

**Card Values:**
- Ace: 1 pt · Cards 2–10: face value · Jack/Queen/King: 10 pts · Joker: 0 pts

**Deck Scaling by Player Count:**
- 2–3 players: 1 deck (54 cards)
- 4–6 players: 2 decks · 7–10 players: 3 decks · 11–15 players: 4 decks

**Each Turn (Two Steps):**
1. **Discard** — place 1 card (or multiple cards of the same rank) face-up on the discard pile. Multi-discarding shrinks your hand, reducing future score.
2. **Draw** — take the top card from the draw pile (private) or the discard pile (visible to all) to fill your discarded slot.

**Show Mechanic:**
- Declare "Show!" at the start of your turn (before discarding) to end the round immediately.
- **If you're strictly the lowest:** You score 0, everyone else adds their hand total.
- **If you tie or are higher:** 50-point penalty for you; the actual lowest player scores 0.

**Elimination:** Players at or above 200 points are eliminated after each round. If all remaining players are eliminated in the same round, the player with the lowest total wins.

---

## 🚀 Features

### Core Gameplay
- Real-time multiplayer for 2–15 players with WebSocket-based synchronization
- Two-step turn enforcement: discard phase → draw phase, server-validated
- Multi-discard support — play multiple same-rank cards at once to shrink your hand
- Show mechanic with complex scoring: penalty for miscalling, 0 for the true lowest
- Elimination system with per-round score accumulation
- Bot AI opponents — host can add/remove bots in the lobby

### Bot AI
- Discards expensive same-rank card groups to minimize hand size
- Takes face-up discard cards when they're worth ≤3 points
- Calls Show automatically when hand value drops to ≤5 points

### Lobby & Room Management
- 5-character room codes using an unambiguous alphabet (no 0/O/1/I/L confusion)
- Shareable invite links with Web Share API fallback
- Host-only controls: start game, add/remove bots, end game early
- Reconnect tokens stored in localStorage — rejoin mid-game on page refresh
- 25-second grace period before a disconnected player is removed

### Round Results & Game Over
- All hands revealed simultaneously at round end with color-coded scores
- Elimination status displayed per player
- 6-second countdown before next round auto-starts
- Game-over screen with trophy animation, gold/silver/bronze podium, full final standings

### UI/UX
- Dark felt-table green aesthetic with realistic card designs (suit symbols, point badges)
- Smooth animations: card dealing, flipping, discarding
- Confetti animation on win
- Mobile-responsive with safe-area awareness for notched phones
- Action feed showing recent plays in real time
- Toast notifications, connection status banner, eliminated players dimmed with strikethrough

---

## 🛠️ Tech Stack

### Frontend
- Vanilla JavaScript + HTML + CSS (single self-contained HTML file, no framework)
- Unicode card suit symbols and CSS-rendered card designs — no external assets

### Backend
- TypeScript
- Cloudflare Workers (HTTP gateway + WebSocket routing)
- Cloudflare Durable Objects with SQLite backing (one per room)

### Infrastructure
- Wrangler CLI for build and deployment
- No external database — all game state in-memory per Durable Object
- Rate limiting: 40 messages per 10s per connection
- Room TTL: auto-cleanup after 1 hour of inactivity

---

## 🏗️ Architecture

### Worker + Durable Object Pattern
- **Worker (`index.ts`)** — serves the HTML frontend, generates 5-char room codes, routes WebSocket upgrades to the correct room's Durable Object
- **Room Durable Object (`room.ts`)** — one instance per room; owns the full game state machine, handles all player WebSocket connections, enforces turn rules, runs bot AI, manages reconnect tokens

### Game State Machine
Phases: `lobby → playing → revealed → roundEnd → gameOver`

Turn state tracks `turnStep: "discard" | "draw"` explicitly — the server rejects out-of-order actions.

### Privacy by Design
- Player hands are sent only to their owner via a private `yourHand` message
- Cards drawn from the draw pile are kept private; cards drawn from the discard pile are broadcast to all
- Opponent hands shown as face-down backs with card count only

### WebSocket Message Protocol
- **Client → Server:** create, join, reconnect, discard, draw, show, addBot, startGame, endGame
- **Server → Client:** roomState (full broadcast), yourHand (private), roundResult, gameOver, error

---

## 📂 Key Features in Action

### 🃏 Multi-Discard Strategy
Play multiple cards of the same rank in one turn to shrink your hand below the standard size — fewer cards means a lower maximum score.

### 📢 Show — High Risk, High Reward
Calling Show ends the round immediately. Get it right and you score zero. Get it wrong and you take a brutal 50-point penalty.

### 🤖 Bots Fill Empty Seats
Add bots instantly in the lobby. They play a real strategy — discarding high groups and calling Show when their hand is cheap.

### ⚡ Edge-Native Real Time
Each room runs as an isolated Cloudflare Durable Object at the edge — WebSocket latency stays minimal no matter where players connect from.

### 🔄 Reconnect Without Penalty
Refresh the page and your session token automatically rejoins the active game within the 25-second grace window.

---

## 🌐 Deployment

- **Hosting:** Cloudflare Workers + Durable Objects (globally distributed edge)
- **GitHub:** [github.com/vijevira/cabo-card-game](https://github.com/vijevira/cabo-card-game)
- Live at: https://cabo.endra.in

---

## 📎 References

- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cabo Card Game Rules](https://www.ultraboardgames.com/cabo/game-rules.php)
