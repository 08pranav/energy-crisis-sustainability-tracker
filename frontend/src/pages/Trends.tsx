import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceArea, ComposedChart, Line, Bar 
} from 'recharts';
import { ShieldAlert, Zap, ThermometerSun, AlertTriangle, Globe } from 'lucide-react';
import { HudPanel } from '@/components/ui/HudPanel';

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
    <div className="w-full h-screen p-4 pb-32 bg-transparent font-mono text-slate-300 overflow-hidden relative flex flex-col items-center justify-start">
      
      {/* Absolute Header (DATAV Unified Theme) */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-1">
        <div className="text-xl font-bold tracking-widest text-white flex items-center gap-3">
          <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></div>
          </div>
          SECTOR VIEW // TRENDS
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1 hidden sm:block">MACRO ENERGY TRANSITION METRICS & SHOCKS</div>
      </div>

      <div className="w-full flex-1 max-w-[1400px] mt-40 relative flex flex-col px-4 pointer-events-auto h-full pb-10 gap-6 overflow-y-auto custom-scrollbar">
        
        {/* SECTION 1: SDG SYSTEM DIAGNOSTICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 7, label: "AFFORDABLE ENERGY", value: 68, color: "text-cyan-400", bg: "bg-cyan-500", icon: <Zap size={14}/> },
            { id: 13, label: "CLIMATE ACTION", value: 42, color: "text-emerald-400", bg: "bg-emerald-500", icon: <ThermometerSun size={14}/> }
          ].map(sdg => (
            <div key={sdg.id} className="p-4 bg-black/60 border border-slate-800 rounded-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-slate-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-slate-500" />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-2 border border-slate-800 bg-black/40 ${sdg.color}`}>{sdg.icon}</div>
                  <div>
                    <span className="text-[9px] font-mono opacity-50 block tracking-[0.2em]">SYSTEM_HEALTH // SDG_{sdg.id}</span>
                    <span className={`text-sm font-black tracking-widest uppercase ${sdg.color}`}>{sdg.label}</span>
                  </div>
                </div>
                <div className="text-2xl font-mono font-black tabular-nums tracking-tighter text-white">{sdg.value}%</div>
              </div>
              <div className="mt-4 w-full h-1 bg-slate-900 overflow-hidden border border-slate-800">
                <div 
                  className={`h-full ${sdg.bg} transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]`} 
                  style={{ width: `${sdg.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: CONFLICT IMPACT & SUPPLY DISRUPTION */}
        <div className="grid grid-cols-12 gap-6 min-h-[450px]">
          
          {/* Left: Intelligence Matrix */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <HudPanel title="Geopolitical Risk Matrix // DATA">
              <div className="space-y-4 pt-2">
                {[
                  { event: "EU Natural Gas Flux", risk: "CRITICAL", val: "94%", color: "text-red-500" },
                  { event: "Maritime Route Security", risk: "STABLE", val: "22%", color: "text-cyan-500" },
                  { event: "Fossil Fuel Pivot", risk: "HIGH", val: "78%", color: "text-orange-500" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-slate-800 pb-2">
                    <div className="space-y-1">
                      <div className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">{item.event}</div>
                      <div className={`text-[10px] font-black font-mono ${item.color}`}>{item.risk}</div>
                    </div>
                    <div className="text-lg font-mono font-bold tracking-tighter text-white/90">{item.val}</div>
                  </div>
                ))}
              </div>
            </HudPanel>

            <div className="bg-red-500/5 border border-red-500/20 p-5 relative group overflow-hidden mt-2">
               <div className="flex items-center gap-2 text-red-500 mb-2 relative z-10">
                 <AlertTriangle size={16} />
                 <span className="text-[9px] font-bold font-mono tracking-widest">SUPPLY DISRUPTION ALERT</span>
               </div>
               <div className="text-3xl font-black font-mono relative z-10 text-white tracking-tighter">+112% <span className="text-[10px] font-normal text-gray-500 tracking-normal italic uppercase">Volatility Spike</span></div>
               <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap size={100} className="text-red-500" />
               </div>
            </div>
          </div>

          {/* Right: The Composed Analysis Chart */}
          <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
            <HudPanel title="Conflict vs Sustainability Flux // METRICS" className="h-[450px] flex flex-col">
              <div className="flex justify-end items-center mb-4 relative z-10">
                <div className="flex gap-4 font-mono text-[9px] tracking-widest font-bold">
                   <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 bg-emerald-500 rounded-sm"></span> RENEWABLES</span>
                   <span className="flex items-center gap-1 text-red-400"><span className="w-2 h-2 border border-red-500 bg-red-500/20 rounded-sm"></span> FOSSIL</span>
                   <span className="flex items-center gap-1 text-yellow-500">● VOLATILITY</span>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="year" 
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
                      tick={{ fontFamily: 'monospace' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000000', border: '1px solid #334155', borderRadius: '0', fontSize: '10px', fontFamily: 'monospace' }}
                    />
                    
                    {/* War Impact Visual Marker */}
                    <ReferenceArea 
                      x1="2021" x2="2022" 
                      fill="#ef4444" fillOpacity={0.1}
                      label={{ position: 'top', value: 'GEOPOLITICAL_SHOCK', fill: '#ef4444', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} 
                    />

                    {/* SDG Progress: Renewables (Bar) */}
                    <Bar dataKey="renewables" fill="#10b981" opacity={0.6} barSize={20} />
                    
                    {/* Dependency: Fossil Fuels (Area) */}
                    <Area type="monotone" dataKey="fossil" stroke="#ef4444" fill="#ef4444" fillOpacity={0.05} strokeWidth={1} strokeDasharray="4 4" />
                    
                    {/* Conflict Effect: Volatility (Line) */}
                    <Line 
                      type="monotone" 
                      dataKey="volatility" 
                      stroke="#eab308" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: '#eab308', strokeWidth: 0 }} 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between text-[9px] font-mono text-slate-500 font-bold tracking-widest relative z-10">
                 <span>SRC: // IEA // BP_STATISTICAL_REVIEW</span>
                 <span className="animate-pulse text-cyan-400">SYSTEM_UPLINK: ACTIVE</span>
              </div>
            </HudPanel>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Trends;