import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopTicker from './components/ui/TopTicker';
import Navbar from './components/ui/Navbar';

// Import your pages
import Home from './pages/Home';
import Prices from './pages/Prices';
import Supply from './pages/Supply';
import Trends from './pages/Trends';
import MapPage from './pages/Map';

function App() {
  return (
    // No Router here - it's already in main.tsx
    <div className="relative min-h-screen bg-black text-white">
      
      {/* 1. TOP TICKER GOES HERE - Fixed at the very top */}
      <TopTicker />

      {/* 2. MAIN CONTENT AREA */}
      {/* 'pt-10' (padding-top) prevents the ticker from covering your dashboard cards */}
      <main className="pt-10 pb-32"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/map" element={<MapPage />} />
          {/* Add your other routes here */}
        </Routes>
      </main>

      {/* 3. LIQUID NAVBAR GOES HERE - Fixed at the bottom */}
      <Navbar />

    </div>
  );
}

export default App;
