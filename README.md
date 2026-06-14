# DayOne.Focus OS

<div align="center">
  <p><strong>A Gamified, AI-Powered Productivity Operating System for Hackers & Builders.</strong></p>
</div>

![DayOne.Focus OS](https://via.placeholder.com/1200x600/0d1117/39d353?text=DayOne.Focus+OS)

DayOne.Focus is a next-generation productivity dashboard that fuses gamification, brutalist hacker aesthetics, and advanced AI automation. It acts as your personal "neural link" to organize tasks, manage focus sessions, track telemetry, and dynamically generate learning roadmaps.

## 🚀 Features

* **Terminal CLI & Intent Engine**: A built-in command-line interface powered by Google Gemini. Use natural language to manage tasks, get system status, or log updates.
* **Temporal Reminders**: Schedule specific alerts for tasks with real-time countdowns and visual pulses when a deadline arrives.
* **Dynamic Skill Trees (Roadmaps)**: Type any learning goal, and the AI agent automatically breaks it down into a structured curriculum with XP bounties.
* **Zen Focus Timer**: A distraction-free, full-screen Pomodoro-style timer with strict mode penalties and ambient noise capabilities.
* **Telemetry & Analytics**: Comprehensive tracking of your focus hours, completed tasks, burnout risk, and a GitHub-style contribution heatmap.
* **AI Diagnostic Reports**: The system analyzes your productivity telemetry and provides brutally honest, actionable feedback to optimize your workflow.

## 🛠 Technology Stack

* **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TanStack Query, Recharts, Zustand.
* **Backend**: NestJS, Prisma ORM, SQLite (local development).
* **AI Core**: Google GenAI SDK (Gemini 2.5 Flash) with BYOK (Bring-Your-Own-Key) integration.

## ⚙️ Installation & Setup

DayOne.Focus is built as a full-stack monorepo. You'll need Node.js (v18+) installed.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/DayOneFocus.git
cd DayOneFocus
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup the Database
The project uses SQLite for zero-config local development.
```bash
cd backend
npx prisma db push
```

### 4. Start the Development Servers
From the root directory, run:
```bash
npm run dev
```
This concurrently starts both the Next.js frontend (on `http://localhost:3000`) and the NestJS backend (on `http://localhost:3001`).

### 5. Configure AI (BYOK)
1. Open the application at `http://localhost:3000`
2. Navigate to the **Settings** page.
3. Enter your Google Gemini API Key. The key is stored securely in your browser's local storage and passed via headers to the backend.

## 🧠 Workflow & Core Concepts

1. **Daily Quests**: Recurring tasks that reset at midnight. Great for habits.
2. **Task Vectors**: The primary backlog. Use the CLI (`add task <name>`) or the quick-add button to dump thoughts.
3. **Focus Sessions**: When ready to work, trigger the Neural Link timer. Completing tasks during this time boosts your focus analytics.
4. **Curriculum Mapping**: Unsure how to learn a new framework? Go to the Roadmap tab, enter your goal, and let the AI generate your skill tree.

## 🤝 Contributing

This project is open-source eligible and welcomes contributions. Please follow conventional commit guidelines and ensure both the backend tests and frontend builds pass before submitting pull requests.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
