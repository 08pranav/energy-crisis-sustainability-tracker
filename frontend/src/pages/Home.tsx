import React from 'react';
import { SvgGlobe } from '@/components/maps/SvgGlobe';
import { HudPanel } from '@/components/ui/HudPanel';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { initialCommodityData } from '@/lib/data';

// Generic tiny line chart for HUD panels
function TinyHUDChart({ data, dataKey, color }: { data: any[], dataKey: string, color: string }) {
  return (
    <div className="h-24 w-full mt-2 border border-slate-800/50 p-1 bg-black/20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="step" dataKey={dataKey} stroke={color} strokeWidth={1} dot={false} isAnimationActive={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #10B981', fontSize: '10px' }}
            itemStyle={{ color: '#10B981' }}
            cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '2 2' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Home() {
  const wtiArray = initialCommodityData.wti_crude;
  const gasArray = initialCommodityData.natural_gas;
  
  return (
    <div className="absolute inset-0 w-full h-full p-4 overflow-hidden bg-transparent flex flex-col font-mono text-slate-300">
      
      {/* HUD Header */}
      <div className="flex justify-between items-start z-10 w-full shrink-0">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold tracking-widest text-white flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-emerald-500 rounded-sm relative">
              <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
            </div>
            ENERGY // CRISIS // DATAV
          </div>
          <div className="text-xs text-slate-500 tracking-[0.2em]">GLOBAL EARLY WARNING INFRASTRUCTURE</div>
        </div>
        
        <div className="text-right flex flex-col gap-1">
          <div className="text-[10px] text-emerald-500">SYS_STATUS: NOMINAL</div>
          <div className="text-xs tracking-widest">T: <span className="text-white">2026.04.23 // 23:31</span></div>
          <div className="text-[10px] text-slate-600">CONNECTION: SECURE (wss://)</div>
        </div>
      </div>

      {/* Main 3-Col HUD Grid */}
      <div className="relative flex-1 w-full mt-4 flex gap-4 overflow-hidden pointer-events-none">
        
        {/* Left Column Controls */}
        <div className="w-[320px] shrink-0 h-full flex flex-col gap-4 z-10 pointer-events-auto overflow-y-auto pb-8 hide-scrollbar">
          
          <HudPanel title="System Analytics // WTI Crude">
            <div className="text-4xl text-white font-bold tracking-tighter mb-1">$82.45</div>
            <div className="text-xs text-emerald-400 mb-4">+1.2% // Trend Accelerating</div>
            <TinyHUDChart data={wtiArray} dataKey="price" color="#10B981" />
            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
              <div className="bg-black/40 p-2 border border-slate-800">
                <div className="text-slate-500">VOLATILITY</div>
                <div className="text-white">MED // 0.85</div>
              </div>
              <div className="bg-black/40 p-2 border border-slate-800">
                <div className="text-slate-500">PROJECTION</div>
                <div className="text-amber-400">UP // +2.4%</div>
              </div>
            </div>
          </HudPanel>

          <HudPanel title="Conflict Impact Matrix">
            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-slate-400">RUSSIA // UKR</span>
                <span className="text-red-400">CRITICAL [95]</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-slate-400">RED SEA RT</span>
                <span className="text-amber-400">HIGH [80]</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-400">EUR GAS TENSION</span>
                <span className="text-emerald-400">STABLE [40]</span>
              </div>
            </div>
            {/* simple bar viz */}
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-red-500 w-[95%]"></div></div>
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-amber-500 w-[80%]"></div></div>
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-emerald-500 w-[40%]"></div></div>
            </div>
          </HudPanel>

          <HudPanel title="Active Telemetry">
            <div className="text-xs text-slate-500 mb-2">RAW FEED EXTRACT:</div>
            <div className="font-mono text-[9px] text-slate-400 leading-tight h-24 overflow-hidden opacity-50">
              0x00A1: INITIATING CONNECTION...<br/>
              0x00A2: HANDSHAKE OK [12ms]<br/>
              0x00A3: RECEIVING PACKET...<br/>
              0x00A4: DATA INTEGRITY VERIFIED<br/>
              0x00A5: SYNC TO EIA_API: SUCCESS<br/>
              0x00A6: PARSING DELTA PAYLOAD...<br/>
              0x00A7: BUFFER FLUSHED<br/>
              0x00A8: STANDBY FOR NEXT TICK...<br/>
              0x00A9: PING ... 12ms<br/>
            </div>
          </HudPanel>
        </div>

        {/* Center Globe Container */}
        <div className="flex-1 h-full relative flex items-center justify-center">
          {/* Overlay Targeting Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[400px] h-[400px] rounded-full border border-dashed border-emerald-500/50 animate-[spin_60s_linear_infinite]" />
            <div className="w-[420px] h-[420px] rounded-full border border-emerald-500/20 absolute animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[800px] h-px bg-emerald-500/20" />
            <div className="absolute h-[800px] w-px bg-emerald-500/20" />
          </div>
          
          <SvgGlobe />
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.5),rgba(255,255,255,0))]" />
        </div>

        {/* Right Column Controls */}
        <div className="w-[320px] shrink-0 h-full flex flex-col gap-4 z-10 pointer-events-auto overflow-y-auto pb-8 hide-scrollbar">
          
          <HudPanel title="SDG Targets // Shift">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">RENEWABLE MIX</span>
              <span className="text-emerald-400">28.4%</span>
            </div>
            <div className="h-1 w-full bg-slate-900 mb-4">
              <div className="h-full bg-emerald-500 w-[28.4%] animate-pulse"></div>
            </div>

            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">FOSSIL DEPENDENCY</span>
              <span className="text-red-400">71.6%</span>
            </div>
            <div className="h-1 w-full bg-slate-900 mb-4">
              <div className="h-full bg-red-500 w-[71.6%]"></div>
            </div>

            <div className="text-[10px] text-slate-500 mt-4 border-t border-white/5 pt-2">
              TARGET DIFF: <span className="text-white">-12.5%</span> (2030 GOAL)
            </div>
          </HudPanel>

          <HudPanel title="Natural Gas Flux // EU">
            <div className="text-2xl text-white font-bold tracking-tighter mb-1">$2.84 <span className="text-xs font-normal text-slate-500">/ MMBtu</span></div>
            <TinyHUDChart data={gasArray} dataKey="price" color="#F59E0B" />
          </HudPanel>

          <HudPanel title="Node Detection">
            <div className="flex gap-4">
              <div className="w-16 h-16 border border-emerald-500/30 flex items-center justify-center p-1 bg-black/40">
                <div className="w-full h-full bg-emerald-500/20 animate-pulse relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-emerald-500">SCAN</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1 text-[10px]">
                <div className="text-slate-400">ID: N-4892</div>
                <div className="text-white">LAT: 48.8566 // LNG: 2.3522</div>
                <div className="text-emerald-400">STATUS: ACTIVE</div>
              </div>
            </div>
          </HudPanel>

        </div>
      </div>
      
    </div>
  );
}
