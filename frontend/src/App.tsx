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
    <div className="relative h-screen w-screen overflow-hidden bg-transparent text-white flex flex-col">
      
      {/* 1. TOP TICKER GOES HERE - Fixed at the very top */}
      <TopTicker />

      {/* 2. MAIN CONTENT AREA */}
      {/* 30px padding top from ticker */}
      <main className="flex-1 w-full mt-[30px] overflow-hidden"> 
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
