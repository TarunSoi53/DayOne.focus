# DayOne.Focus

An open-source, brutalist, AI-powered "Second Brain" productivity OS built with Next.js, NestJS, and Prisma.

## Architecture
- **Frontend:** Next.js (App Router), React, TailwindCSS (Monochrome/Neon Green), Lucide Icons
- **Backend:** NestJS, Prisma, SQLite (Ready for Postgres)
- **AI Engine:** Google Gemini (BYOK - Bring Your Own Key architecture)

## Quick Start

### 1. Clone & Setup Environments
Rename `.env.example` to `.env` in both the `frontend` and `backend` directories.
Fill in your configuration variables.

### 2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Database Initialization
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 4. Run the Stack
```bash
# Terminal 1 (Frontend)
cd frontend
npm run dev

# Terminal 2 (Backend)
cd backend
npm run start:dev
```

## Features
- **Strict-Mode Timer:** High stakes focus intervals.
- **System Shell CLI:** Natural language intent engine that replaces typical UI toggles.
- **Dynamic Caching:** Costs $0 to run using your own API keys.
