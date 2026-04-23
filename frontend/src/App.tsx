import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import Home from './pages/Home';
import Prices from './pages/Prices';
import Supply from './pages/Supply';
import Trends from './pages/Trends';
import MapPage from './pages/Map';

function App() {
  return (
    <div className="min-h-screen font-mono bg-transparent text-white">
      <main className="h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
