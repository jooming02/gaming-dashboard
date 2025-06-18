# 🎮 GameStats Dashboard

A gaming dashboard that simulates the game analytics environment. It features a fully interactive leaderboard for over **10,000 players**, complete with search, sort, pagination, and visual indicators.


## 🚀 Live Preview

> https://gaming-dashboard.lovable.app/



## 📊 Features

### 📌 Dashboard Overview
- **Statistics**: Displays total players, active players, today’s matches, and average match duration.
- **Interactive Charts**: Visualizes weekly player activity and match frequency using historical data.

### 🏆 Leaderboard Overview
- **Data Handling**: Mock Data Generator simulating 10,000+ random player profiles
- **Search**: Instantly search by player `username` or `country`.
- **Sorting**: Sort by `rank`, `score`, `win rate`, `games played`, and more.
- **Pagination**: Efficiently supports 10,000+ players with options to display 10, 25, or 50 players per page.
- **Data Rich Display**: Rank badges, win/loss stats, last activity, and country flags.
- **Responsive design**: Mobile-friendly design with:
  - Hidden columns on smaller screens for clarity
  - Horizontally scrollable table to access all data
- **Performance Optimized**:
  - `React.useMemo` for filtered/sorted results
  - Minimal re-renders via component memoization
  - Lazy-loaded components where appropriate

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **UI**: Tailwind CSS, ShadCN UI, Recharts
- **Charting**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

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
