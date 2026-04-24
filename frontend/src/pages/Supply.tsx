import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HudPanel } from '@/components/ui/HudPanel';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';
import { useEnergyStore } from '@/store/energyStore';
import { useEffect } from 'react';

export default function Supply() {
  const { supplyEvents, fetchSupplyData, supplyLoading } = useEnergyStore();
  
  useEffect(() => {
    fetchSupplyData();
  }, [fetchSupplyData]);

  const topRisk = [...MOCK_COUNTRY_PROFILES].sort((a, b) => b.conflictRisk - a.conflictRisk).slice(0, 10);

  return (
    <div className="w-full h-screen p-4 pb-32 bg-transparent font-mono text-slate-300 overflow-hidden relative flex flex-col items-center justify-start">
      
      {/* Absolute Header */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-1">
        <div className="text-xl font-bold tracking-widest text-white flex items-center gap-3">
          <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></div>
          </div>
          SECTOR VIEW // SUPPLY
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1 hidden sm:block">GLOBAL DISRUPTIONS & LOGISTICS NETWORK</div>
      </div>

      <div className="w-full flex-1 max-w-[1200px] mt-32 relative flex flex-col lg:flex-row gap-6 px-4 lg:px-10 items-stretch pointer-events-auto h-full pb-20">
        
        {/* Left Panel */}
        <div className="flex-1 flex flex-col gap-6">
          <HudPanel title="Recent Major Disruptions // INCIDENTS">
            <div className="flex flex-col gap-3 min-h-[300px]">
              {supplyLoading ? (
                 <div className="h-full w-full py-20 flex items-center justify-center text-cyan-400 animate-pulse text-xs tracking-widest uppercase">Fetching Logistics Database...</div>
              ) : supplyEvents.map(event => (
                <div key={event.id} className="bg-black/80 p-4 relative border border-slate-800 flex justify-between items-center group hover:border-cyan-500/50 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/40 group-hover:border-white transition-colors" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/40 group-hover:border-white transition-colors" />
                  
                  <div>
                    <div className="text-white font-bold tracking-widest uppercase text-xs">{event.name}</div>
                    <div className="text-[10px] text-slate-500 mt-1">LOG_DATE: {event.year}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 tracking-[0.2em] mb-1">IMPACT SCORE</div>
                    <div className="text-orange-500 font-bold text-lg">{event.impact}<span className="text-[10px] text-slate-500">/100</span></div>
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-6">
          <HudPanel title="Top 10 Risk Exposure // GLOBAL INDEX">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRisk} layout="vertical" margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" width={80} tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip 
                    cursor={{ fill: '#0f172a' }} 
                    contentStyle={{ backgroundColor: '#000000', borderColor: '#22d3ee', fontFamily: 'monospace', fontSize: '10px' }} 
                  />
                  <Bar dataKey="conflictRisk" fill="#ef4444" radius={[0, 2, 2, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 border-t border-white/10 pt-4 flex gap-4 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500"></div>
                <span className="text-slate-400">CRITICAL RISK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0f172a] border border-slate-800"></div>
                <span className="text-slate-400">BASELINE</span>
              </div>
            </div>
          </HudPanel>
        </div>

      </div>
    </div>
  );
}
