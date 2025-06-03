# 🎮 GameStats Dashboard

A **high-performance React + TypeScript** dashboard that simulates a real-time game analytics environment. It features a fully interactive leaderboard for over **10,000 players**, complete with search, sort, pagination, and visual indicators.

---

## 🚀 Live Preview

> https://gaming-dashboard.lovable.app/

---

## 📊 Features

### 📌 Dashboard Overview
- **Real-time Statistics**: Displays total players, active users, today’s matches, and average match duration.
- **Interactive Charts**: Visualizes 24-hour player activity and match frequency using live and historical data.

### 🏆 Advanced Leaderboard
- **Search**: Instantly search by player `username` or `country`.
- **Multi-column Sorting**: Sort by `rank`, `score`, `win rate`, `games played`, and more.
- **Pagination**: Handles **10,000+ players** efficiently, displaying 50 players per page.
- **Data Rich Display**: Rank badges, win/loss stats, last activity, and country flags.
- **Responsive UI**: Scrollable on mobile, optimized layout for desktop.
- **Performance Optimized**:
  - `React.useMemo` for filtered/sorted results
  - Minimal re-renders via component memoization
  - Lazy-loaded components where appropriate

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **UI**: Tailwind CSS, ShadCN UI, Recharts
- **State & Logic**: React Hooks, `useMemo`, `useCallback`, context
- **Data Handling**: Mock Data Generator simulating 10,000+ realistic player profiles
- **Charting**: [Recharts](https://recharts.org/)
- **Icons & Flags**: [Lucide Icons](https://lucide.dev/), country flags via emoji or API

---

## 📦 Getting Started

To run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/jooming02/gaming-dashboard.git
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Done
Open your browser and navigate to http://localhost:3000 to view the site.
