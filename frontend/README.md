# EnergyWatch
Energy Crisis & Sustainability Tracker aligned with SDGs 7 & 13.

## Overview
A production-grade React + Vite application (originally planned as Next.js 14, pivoted to React via user request) prioritizing stunning visualization of global energy dynamics, real-time commodity prices, and supply risks. Features glassmorphism UI, a dark slate theme with electric amber/emerald accents, Recharts, and React Simple Maps.

## Project Setup

1. **Install Dependencies**
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`
   Note: `--legacy-peer-deps` is recommended due to `react-simple-maps` peer dependency configuration.

2. **Configure Environment Variables**
   Rename `.env.example` to `.env` and fill in the placeholders:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   - [EIA API Key](https://www.eia.gov/opendata/)
   - [Alpha Vantage API](https://www.alphavantage.co/)
   - Supabase & Upstash Keys (if connected to live backend)

3. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   
## Features
- **Live Prices:** Simulated data streaming for commodities with linear regression forecasting.
- **Global Constraints:** TopoJSON integration for tracking energy dependency.
- **Supply Risks:** Timeline and Bar chart plotting impact of geopolitical conflicts.
- **Energy Transition:** Visualization of multi-decade energy mix using Our World in Data trends.
