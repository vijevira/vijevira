---
title: "Chhakkadi Online Card Game"
description: "Real-time multiplayer Chhakkadi card game built with React, Socket.IO, and Node.js"
pubDate: "2026-05-02"
tags: ["React", "Socket.IO", "Node.js", "Express", "Multiplayer Game", "Card Game", "WebSockets", "Cloudflare", "Railway", "JavaScript"]
heroImage: "/projects-chhakkadi.png"
---

# Multiplayer Card Game

## 📌 Overview
Chhakkadi is a **real-time multiplayer Indian card game** inspired by traditional trick-taking gameplay. The application allows players to create rooms, join games with friends, bid strategically, select trump suits, and compete in live multiplayer matches.

The project is built with a **React frontend** and a **Node.js + Socket.IO backend** for low-latency real-time communication. The frontend is deployed on Cloudflare, while the backend runs on Railway with WebSocket support.

👉 Play the live game here: [chhakkadi.endra.in](https://chhakkadi.endra.in)

---

## 🚀 Features

### Core Multiplayer Features
- **Real-Time Multiplayer Gameplay**
  - Create private game rooms.
  - Join using room invite codes.
  - Live synchronization using Socket.IO.

- **6 Player Team-Based Gameplay**
  - 3 vs 3 team structure.
  - Dynamic seating positions.
  - Trick-based round system.

- **Bidding System**
  - Strategic bidding before gameplay.
  - Competitive trick target system.
  - Bid escalation and validation.

- **Trump Selection**
  - Winning bidder selects trump suit.
  - Supports No Trump / Joker mode.

- **Call 8 Mechanic**
  - High-risk reward gameplay feature.
  - Optional raise from 6/7 bid to full sweep.
  - Dynamic scoring logic.

### Gameplay Features
- Real-time trick animations.
- Turn-based card play validation.
- Team score tracking.
- Automatic round progression.
- Round-end summary overlays.
- Game-over winner announcement.
- Player reconnect support.
- Empty room cleanup system.

### UI/UX Features
- Responsive multiplayer table layout.
- Mobile-friendly top info bar.
- Animated card dealing.
- Real-time trick reveal display.
- Live scoreboard updates.
- Beautiful table-center gameplay area.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Socket.IO Client
- CSS3 / Responsive UI

### Backend
- Node.js
- Express.js
- Socket.IO
- WebSockets

### Deployment
- Frontend: Cloudflare Workers
- Backend: [Railway](https://railway.com?referralCode=oHqhM6)
- DNS & CDN: Cloudflare

---

## 🏗️ Architecture

### Frontend Architecture
- React component-based UI system.
- Real-time state synchronization from server.
- Dynamic rendering of player positions and gameplay phases.
- Socket event-driven interactions.

### Backend Architecture
- Express HTTP server with Socket.IO integration.
- In-memory room management system.
- GameRoom engine controlling:
  - bidding
  - tricks
  - scoring
  - trump logic
  - Call 8 flow
  - round transitions

### Real-Time Communication
- WebSocket-based multiplayer communication.
- Room-specific broadcasting.
- Reconnection handling for disconnected players.

---

## 🎮 Gameplay Flow

1. **Create Room**
   - Host creates a multiplayer room.
   - Unique 6-character room code generated.

2. **Join Room**
   - Players join using room code or invite link.

3. **Bidding Phase**
   - Players place bids strategically.
   - Highest bidder wins.

4. **Trump Selection**
   - Bid winner selects trump suit.

5. **Play Phase**
   - Players take turns playing cards.
   - Trick winner determined dynamically.

6. **Call 8**
   - Teams with 6/7 bids may attempt a full sweep.

7. **Scoring**
   - Team points updated after each round.

8. **Game Over**
   - Winning team announced after target score reached.

---

## 🌐 Deployment Architecture

### Frontend
- Hosted on Cloudflare Workers.
- SPA routing enabled.
- Fast global CDN delivery.

### Backend
- Hosted on [Railway](https://railway.com?referralCode=oHqhM6).
- Persistent WebSocket support.
- Custom API domain configured.

### Production URLs
- Frontend: https://chhakkadi.endra.in
- Backend API: https://api-chakkaddi.endra.in

---

## 📂 Key Features in Action

### 🎴 Create & Join Rooms
Players can instantly create private multiplayer rooms and invite friends using generated room links.

### ⚡ Real-Time Gameplay
All player actions synchronize instantly using Socket.IO and WebSockets.

### 🧠 Strategic Bidding
Players compete with bids and team coordination to maximize score.

### 🃏 Dynamic Trump System
Trump suit selection significantly changes gameplay strategy.

### 🔥 Call 8 Mechanic
Special high-risk scoring system rewarding perfect rounds.

### 📱 Responsive UI
Optimized experience for desktop and mobile gameplay.

---

## 📎 References

- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Railway Deployment Docs](https://docs.railway.com/)