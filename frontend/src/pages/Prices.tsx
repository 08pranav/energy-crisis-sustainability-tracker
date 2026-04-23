import React, { useState } from 'react';
import { 
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Line, Dot
} from 'recharts';
import { Activity, Globe, Info, Zap, ShieldAlert } from 'lucide-react';

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
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-1000 p-4">
      {/* Header: System Identity */}
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-2">
            <Activity className="text-cyan-400" size={20} />
            Market <span className="text-cyan-400">Intelligence</span> Terminal
          </h1>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mt-1">
            Global Energy Exchange // Uplink: Encrypted // Rate: ₹83.78
          </p>
        </div>
        <div className="px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded font-mono text-[10px] text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          SDG 7: AFFORDABLE_ENERGY
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: Ticker Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          {commodities.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`w-full p-4 rounded-lg border transition-all duration-500 text-left relative overflow-hidden group ${
                selected === item.id 
                ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_25px_rgba(34,211,238,0.15)]' 
                : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="text-[9px] font-mono text-gray-500 uppercase mb-1 tracking-widest">{item.name}</div>
                  <div className="text-xl font-black font-mono tracking-tighter text-white/90">{item.inr}</div>
                  <div className="text-[10px] font-mono opacity-40">{item.usd} USD</div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-500 ${selected === item.id ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}`} />
            </button>
          ))}

          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold font-mono mb-2">
              <Zap size={14} className="animate-pulse" /> WAR IMPACT DETECTED
            </div>
            <p className="text-[10px] text-gray-400 font-mono leading-relaxed relative z-10">
              Supply disruptions in Eastern Europe causing <span className="text-red-400 font-bold">₹450/bbl</span> variance in projections.
            </p>
          </div>
        </div>

        {/* Right: Advanced Forensic Panel */}
        <div className="col-span-12 lg:col-span-8 bg-black/40 border border-white/10 p-6 rounded-xl relative group overflow-hidden">
          {/* Enhanced Grid Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div className="space-y-1">
              <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em]">Predictive Price Flux (₹)</h3>
              <div className="text-[9px] text-cyan-500/60 font-mono italic">SIGNAL_STRENGTH: 98.2% // AES_ENCRYPTED</div>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-cyan-400/40 rounded-sm"></span>
                 <span className="text-[8px] font-mono text-gray-500">VOLUME</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                 <span className="text-[9px] font-mono text-cyan-400">LIVE_FEED</span>
               </div>
            </div>
          </div>

          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <defs>
                  <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#4b5563" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#4b5563" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `₹${val}`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #22d3ee50', fontSize: '10px', fontFamily: 'monospace' }}
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

          <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-gray-600 border-t border-white/5 pt-4">
            <div className="flex gap-6">
              <span>VOLATILITY: <span className="text-white">MEDIUM_FLUX</span></span>
              <span>CONFIDENCE: <span className="text-emerald-400">89.4%</span></span>
              <span>DATA_SRC: <span className="text-white">IEA_RECV</span></span>
            </div>
            <span className="flex items-center gap-1 uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors cursor-help group">
              <Globe size={10} className="group-hover:rotate-180 transition-transform duration-700" /> 
              Terminal_Map
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;