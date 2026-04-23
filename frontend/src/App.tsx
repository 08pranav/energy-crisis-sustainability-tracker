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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-accent/30">
      <Navbar />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* subtle background glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
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
