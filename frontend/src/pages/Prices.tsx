import React, { useState } from 'react';
import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Line
} from 'recharts';
import { Activity, Globe, Info, Zap, ShieldAlert } from 'lucide-react';
import { HudPanel } from '@/components/ui/HudPanel';

// Enhanced data with volatility and volume metrics
const data = [
  { time: '00:00', price: 6200, volatility: 400, volume: 80 },
  { time: '04:00', price: 6450, volatility: 300, volume: 95 },
  { time: '08:00', price: 6100, volatility: 600, volume: 70 },
  { time: '12:00', price: 6800, volatility: 200, volume: 110 },
  { time: '16:00', price: 6600, volatility: 450, volume: 85 },
  { time: '20:00', price: 7100, volatility: 350, volume: 120 },
];

const Prices = () => {
  const [selected, setSelected] = useState('CRUDE');

  const commodities = [
    { id: 'CRUDE', name: 'WTI Crude', inr: '₹6,845.20', usd: '$81.70', change: '+1.2%', up: true },
    { id: 'BRENT', name: 'Brent Oil', inr: '₹7,248.50', usd: '$86.46', change: '+0.8%', up: true },
    { id: 'GAS', name: 'Natural Gas', inr: '₹278.40', usd: '$3.34', change: '-0.5%', up: false },
    { id: 'COAL', name: 'Coal', inr: '₹11,350', usd: '$135.62', change: '-1.2%', up: false },
  ];

  return (
    <div className="w-full h-screen p-4 pb-32 bg-transparent font-mono text-slate-300 overflow-hidden relative flex flex-col items-center justify-start">
      
      {/* Absolute Header (DATAV Unified Theme) */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-1">
        <div className="text-xl font-bold tracking-widest text-white flex items-center gap-3">
          <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></div>
          </div>
          SECTOR VIEW // COMMODITIES
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1 hidden sm:block">LIVE PRICING FEED & UPSTREAM FORECASTING</div>
      </div>

      <div className="w-full flex-1 max-w-[1600px] mt-40 relative grid grid-cols-12 gap-6 px-4 lg:px-10 pointer-events-auto h-full pb-10">
        
        {/* Left: Ticker Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start">
          <HudPanel title="Live Ticker Sidebar // ASSETS">
            <div className="space-y-3 pt-2">
              {commodities.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item.id)}
                  className={`w-full p-4 rounded-none border transition-all duration-300 text-left relative overflow-hidden group ${selected === item.id
                      ? 'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_25px_rgba(34,211,238,0.1)]'
                      : 'bg-black/40 border-slate-800 hover:border-slate-600'
                    }`}
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="text-[9px] font-mono text-gray-500 uppercase mb-1 tracking-widest">{item.name}</div>
                      <div className="text-xl font-black font-mono tracking-tighter text-white/90">{item.inr}</div>
                      <div className="text-[10px] font-mono opacity-40">{item.usd} USD</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${item.up ? 'bg-cyan-500/10 text-cyan-400' : 'bg-red-500/10 text-red-500'}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                  <div className={`absolute left-0 top-0 h-full w-[2px] transition-all duration-500 ${selected === item.id ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}`} />
                </button>
              ))}

              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-none relative overflow-hidden group mt-6">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldAlert size={40} className="text-red-500" />
                </div>
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold font-mono mb-2 relative z-10">
                  <Zap size={14} className="animate-pulse" /> WAR IMPACT DETECTED
                </div>
                <p className="text-[10px] text-gray-400 font-mono leading-relaxed relative z-10">
                  Supply disruptions in Eastern Europe causing <span className="text-red-400 font-bold">₹450/bbl</span> variance in projections.
                </p>
              </div>
            </div>
          </HudPanel>
        </div>

        {/* Right: Advanced Forensic Panel */}
        <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
          <HudPanel title="FORENSIC MARKET SCAN // ALGO" className="h-[550px] flex flex-col">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="space-y-1">
                <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em]">Predictive Price Flux (₹)</h3>
                <div className="text-[9px] text-cyan-500/60 font-mono italic">SIGNAL_STRENGTH: 98.2% // AES_ENCRYPTED</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400/40 rounded-sm"></span>
                  <span className="text-[8px] font-mono text-gray-500 tracking-widest">VOLUME</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest">LIVE_FEED</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    tick={{ fontFamily: 'monospace' }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `₹${val}`}
                    tick={{ fontFamily: 'monospace' }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#000000', border: '1px solid #22d3ee50', fontSize: '10px', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#22d3ee' }}
                    cursor={{ stroke: '#22d3ee30', strokeWidth: 1 }}
                  />

                  {/* Visual Volume Bars in background */}
                  <Bar dataKey="volume" fill="#22d3ee" opacity={0.1} barSize={40} />

                  {/* Main Glowing Area */}
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="none"
                    fillOpacity={1}
                    fill="url(#priceGlow)"
                  />

                  {/* Sharp Focus Line */}
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: '#22d3ee', strokeWidth: 2, r: 4, stroke: '#000' }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-800 pt-4 tracking-widest font-bold relative z-10">
              <div className="flex gap-6">
                <span>VOLATILITY: <span className="text-white">MEDIUM_FLUX</span></span>
                <span>CONFIDENCE: <span className="text-cyan-400">89.4%</span></span>
                <span>DATA_SRC: <span className="text-white">IEA_RECV</span></span>
              </div>
              <span className="flex items-center gap-1 uppercase hover:text-cyan-400 transition-colors cursor-help group">
                <Globe size={10} className="group-hover:rotate-180 transition-transform duration-700" />
                Terminal_Map
              </span>
            </div>
          </HudPanel>
        </div>
      </div>
    </div>
  );
};

export default Prices;