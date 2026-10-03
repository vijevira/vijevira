# vijevira.in — Portfolio Site

Personal portfolio and project showcase for **Vijendra Kumar**, Senior Software Engineer.

Built with [Astro](https://astro.build) and deployed on [Cloudflare Workers](https://workers.cloudflare.com).

🌐 **Live site:** [vijevira.in](https://vijevira.in)

---

## About

This site documents professional work and personal projects — real-time systems, SaaS platforms, multiplayer games, and Salesforce integrations, all shipped to production.

- **Resume:** [vijevira.in/resume](https://vijevira.in/resume)
- **All Projects:** [vijevira.in/projects](https://vijevira.in/projects)
- **GitHub:** [github.com/vijevira](https://github.com/vijevira)

---

## Project Highlights

### Personal Projects

| Project | Description | Live |
|---|---|---|
| [Zyvora](src/content/projects/personal/zyvora.md) | Jira-like SaaS PM platform — Kanban, sprints, real-time, RBAC, BullMQ | [zyvora.endra.in](https://zyvora.endra.in) |
| [WatchTower](src/content/projects/personal/watchtower.md) | Web scraping & notification platform — BullMQ pipeline, Discord/Slack/Telegram | [watchtower.wasmer.app](https://watchtower.wasmer.app) |
| [BlindShare](src/content/projects/personal/blindshare.md) | P2P secure sharing suite — WebRTC, zero-persistence, DTLS encrypted | [blindshare.in](https://blindshare.in) |
| [BlindParty](src/content/projects/personal/blindparty.md) | P2P watch party & video call — full mesh WebRTC, screen share, group chat | [party.blindshare.in](https://party.blindshare.in) |
| [BlindChat](src/content/projects/personal/blindchat.md) | E2EE messenger — encrypted chats & media, P2P voice/video calls, Android (Play Store alpha) | [chat.endra.in](https://chat.endra.in) |
| [CronDeck](src/content/projects/personal/crondeck.md) | Cron-as-a-service — scheduled HTTP jobs, execution history, uptime & status pages | [crondeck.cc.cd](https://crondeck.cc.cd) |
| [Wishly](src/content/projects/personal/wishly.md) | Automated birthday/anniversary wishes from your own WhatsApp, email, Telegram, Discord, Slack | [wishly.cc.cd](https://wishly.cc.cd) |
| [Chhakkadi](src/content/projects/personal/chhakkadi-game.md) | 3 Indian card games, real-time multiplayer with bot AI, Android app on Play Store | [chhakkadi.endra.in](https://chhakkadi.endra.in) · [Play Store](https://play.google.com/store/apps/details?id=in.endra.chhakkadi) |
| [Cuff the Bluff](src/content/projects/personal/cuff-the-bluff.md) | Liar's Dice, 2–15 players, Cloudflare DO | [cuffthebluff.endra.in](https://cuffthebluff.endra.in) |
| [Splendor](src/content/projects/personal/splendor.md) | Digital Splendor board game, 2–12 players | [splendor.endra.in](https://splendor.endra.in) |
| [Cabo](src/content/projects/personal/cabo-card-game.md) | Cabo card game, 2–15 players, Cloudflare DO | [cabo.endra.in](https://cabo.endra.in) |

### Apsona Work
- [Triggered Merge](src/content/projects/apsona/triggered-merge.md) — end-to-end Salesforce → AWS → merge pipeline

---

## Tech Stack

- **Framework:** [Astro](https://astro.build) with MDX
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com) (static assets)
- **Content:** Markdown / MDX content collections
- **Extras:** Sitemap (`@astrojs/sitemap`), `llms.txt`, `robots.txt`

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:4321
npm run build        # build to ./dist/
npm run preview      # preview build locally
npm run deploy       # build + deploy to Cloudflare
```

---

## Structure

```
src/
├── content/
│   └── projects/
│       ├── personal/     # personal project write-ups
│       ├── apsona/       # Apsona work
│       └── pratishthan/  # Pratishthan work
├── pages/
│   ├── index.astro
│   ├── resume.astro
│   └── projects/
└── components/
public/
├── llms.txt              # LLM-friendly site index
├── robots.txt
└── projects-*.svg/png    # hero images
```
