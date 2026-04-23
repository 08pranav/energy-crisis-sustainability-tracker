import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceArea, ComposedChart, Line, Bar 
} from 'recharts';
import { ShieldAlert, Zap, ThermometerSun, AlertTriangle } from 'lucide-react';

const data = [
  { year: '2018', renewables: 24, fossil: 76, volatility: 10, cost: 40 },
  { year: '2019', renewables: 26, fossil: 74, volatility: 12, cost: 42 },
  { year: '2020', renewables: 29, fossil: 71, volatility: 8, cost: 35 },
  { year: '2021', renewables: 30, fossil: 70, volatility: 15, cost: 48 },
  { year: '2022', renewables: 31, fossil: 69, volatility: 85, cost: 92 }, // Conflict Spike
  { year: '2024', renewables: 35, fossil: 65, volatility: 50, cost: 78 },
  { year: '2026', renewables: 42, fossil: 58, volatility: 35, cost: 60 },
];

const Trends = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* SECTION 1: SDG SYSTEM DIAGNOSTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: 7, label: "AFFORDABLE ENERGY", value: 68, color: "text-cyan-400", bg: "bg-cyan-500", icon: <Zap size={14}/> },
          { id: 13, label: "CLIMATE ACTION", value: 42, color: "text-emerald-400", bg: "bg-emerald-500", icon: <ThermometerSun size={14}/> }
        ].map(sdg => (
          <div key={sdg.id} className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md relative overflow-hidden group">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black/40 ${sdg.color}`}>{sdg.icon}</div>
                <div>
                  <span className="text-[9px] font-mono opacity-50 block tracking-[0.2em]">SYSTEM_HEALTH // SDG_{sdg.id}</span>
                  <span className={`text-sm font-black tracking-widest ${sdg.color}`}>{sdg.label}</span>
                </div>
              </div>
              <div className="text-2xl font-mono font-black tabular-nums">{sdg.value}%</div>
            </div>
            <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${sdg.bg} transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.3)]`} 
                style={{ width: `${sdg.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 2: CONFLICT IMPACT & SUPPLY DISRUPTION */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left: Intelligence Matrix */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-black/40 border border-white/10 p-5 rounded-xl border-t-red-500/50">
            <div className="flex items-center gap-2 text-red-500 mb-6">
              <ShieldAlert size={18} className="animate-pulse" />
              <h2 className="text-[10px] font-bold font-mono uppercase tracking-[0.3em]">Geopolitical Risk Matrix</h2>
            </div>
            <div className="space-y-4">
              {[
                { event: "EU Natural Gas Flux", risk: "CRITICAL", val: "94%", color: "text-red-500" },
                { event: "Maritime Route Security", risk: "STABLE", val: "22%", color: "text-cyan-500" },
                { event: "Fossil Fuel Pivot", risk: "HIGH", val: "78%", color: "text-orange-500" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                  <div className="space-y-1">
                    <div className="text-[9px] text-gray-500 font-mono">{item.event}</div>
                    <div className={`text-[10px] font-black font-mono ${item.color}`}>{item.risk}</div>
                  </div>
                  <div className="text-lg font-mono font-light opacity-80">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 p-5 rounded-xl relative group overflow-hidden">
             <div className="flex items-center gap-2 text-cyan-400 mb-2 relative z-10">
               <AlertTriangle size={16} />
               <span className="text-[9px] font-bold font-mono tracking-widest">SUPPLY DISRUPTION ALERT</span>
             </div>
             <div className="text-3xl font-black font-mono relative z-10">+112% <span className="text-[10px] font-normal text-gray-500 tracking-normal italic uppercase">Volatility Spike</span></div>
             <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={100} />
             </div>
          </div>
        </div>

        {/* Right: The Composed Analysis Chart */}
        <div className="col-span-12 lg:col-span-8 bg-black/60 border border-white/10 p-6 rounded-xl relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">Conflict vs Sustainability Flux</h3>
            <div className="flex gap-4 font-mono text-[9px]">
               <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-sm"></span> RENEWABLES</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm"></span> FOSSIL</span>
               <span className="flex items-center gap-1 text-yellow-400">● VOLATILITY</span>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="year" 
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
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid #333', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace' }}
                />
                
                {/* War Impact Visual Marker */}
                <ReferenceArea 
                  x1="2021" x2="2022" 
                  fill="#ef444408" 
                  label={{ position: 'top', value: 'GEOPOLITICAL_SHOCK', fill: '#ef4444', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} 
                />

                {/* SDG Progress: Renewables (Bar) */}
                <Bar dataKey="renewables" fill="#10b981" opacity={0.4} barSize={30} radius={[2, 2, 0, 0]} />
                
                {/* Dependency: Fossil Fuels (Area) */}
                <Area type="monotone" dataKey="fossil" stroke="#ef4444" fill="#ef444405" strokeWidth={1} strokeDasharray="4 4" />
                
                {/* Conflict Effect: Volatility (Line) */}
                <Line 
                  type="monotone" 
                  dataKey="volatility" 
                  stroke="#facc15" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#facc15', strokeWidth: 0 }} 
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-[9px] font-mono text-gray-600">
             <span>SOURCE: INTERNATIONAL ENERGY AGENCY (IEA) // BP_STATISTICAL_REVIEW</span>
             <span className="animate-pulse">SYSTEM_UPLINK: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;