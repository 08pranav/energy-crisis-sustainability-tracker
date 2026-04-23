import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, TrendingUp, Zap, DollarSign } from 'lucide-react'; // Using Lucide for clean icons

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'HOME', path: '/', icon: <Home size={18} /> },
    { name: 'MAP', path: '/map', icon: <Globe size={18} /> },
    { name: 'TRENDS', path: '/trends', icon: <TrendingUp size={18} /> },
    { name: 'SUPPLY', path: '/supply', icon: <Zap size={18} /> },
    { name: 'PRICES', path: '/prices', icon: <DollarSign size={18} /> },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      {/* Liquid Glass Pill Container */}
      <div className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-3 rounded-[2rem] transition-all duration-500 ease-out group ${
                isActive 
                ? 'bg-white/10 text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;