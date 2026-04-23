import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Globe, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LivePriceTicker } from './LivePriceTicker';

const navLinks = [
  { name: 'Overview', path: '/', icon: Globe },
  { name: 'Live Prices', path: '/prices', icon: Activity },
  { name: 'Supply Risks', path: '/supply', icon: AlertTriangle },
  { name: 'Energy Trends', path: '/trends', icon: TrendingUp },
  { name: 'Global Map', path: '/map', icon: Zap },
];

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <LivePriceTicker />
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mr-8">
          <Zap className="h-6 w-6 text-accent" />
          <span className="font-mono text-xl font-bold tracking-tight text-white">
            Energy<span className="text-accent">Watch</span>
          </span>
        </div>
        <nav className="flex items-center space-x-1 flex-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
