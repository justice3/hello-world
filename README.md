# Lovable.app - Torrent Video Streamer

A mobile-friendly web app that streams only video files from a torrent magnet link with zero-buffering and Google Cast support.

## Features
- Paste **magnet link**, extract only **video files**
- **Real-time playback** without downloading
- **Works on mobile**, responsive UI
- **Google Cast support**
- **Fullscreen auto-rotate** to landscape
- **Tap-to-hide controls**, seek and volume control by gestures
- **Buffering monitor** (MB/s like FPS in games)
- Background playback support (YouTube-like)

## Tech Stack
- Frontend: **React + TypeScript + Tailwind + HLS.js**
- Backend: **Express + WebTorrent**

## Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/lovable.app.git
cd lovable.app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Backend
```bash
node server.js
```

### 4. Run Frontend
```bash
npm run dev
```

## Deploying
Use Vercel for frontend and render.com / fly.io / your VPS for the backend.

---
Built with love for magical, bufferless video streaming.
