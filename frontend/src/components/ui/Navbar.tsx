import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, TrendingUp, Zap, DollarSign, MessageCircle } from 'lucide-react'; // Using Lucide for clean icons

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'HOME', path: '/', icon: <Home size={18} /> },
    { name: 'MAP', path: '/map', icon: <Globe size={18} /> },
    { name: 'TRENDS', path: '/trends', icon: <TrendingUp size={18} /> },
    { name: 'SUPPLY', path: '/supply', icon: <Zap size={18} /> },
    { name: 'PRICES', path: '/prices', icon: <DollarSign size={18} /> },
    { name: 'CHATBOT', path: '/chatbot', icon: <MessageCircle size={18} /> },
  ];

  return (
    <nav className="fixed bottom-6 left-0 w-full z-50 pointer-events-none">

      <div className="flex justify-center w-full bg-black/80 backdrop-blur-md pointer-events-auto pb-2 sm:pb-0">
        <div className="flex items-center justify-around sm:justify-center gap-1 w-full sm:w-auto px-2 sm:px-8 py-2 relative overflow-x-auto hide-scrollbar">
          
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50" />

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-2 transition-all duration-300 ease-out group border relative ${
                  isActive 
                  ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]' 
                  : 'text-slate-500 border-transparent hover:text-white hover:border-slate-800 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-px left-0 w-full h-[1px] bg-cyan-400" />
                )}
                <span className={`${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                <span className="hidden sm:inline text-[10px] font-bold tracking-[0.2em] font-mono">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;