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
          <Line type="step" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: `1px solid ${color}`, fontSize: '10px' }}
            itemStyle={{ color: color }}
            cursor={{ stroke: '#ffffff30', strokeWidth: 1, strokeDasharray: '2 2' }}
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
    <div className="w-full h-full p-2 lg:p-4 pb-24 lg:pb-32 bg-transparent flex flex-col font-mono text-slate-300 overflow-hidden">
      
      {/* HUD Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start z-10 w-full shrink-0 gap-4 lg:gap-0">
        <div className="flex flex-col gap-1 w-full lg:w-auto text-center lg:text-left">
          <div className="text-xl lg:text-2xl font-bold tracking-widest text-white flex items-center justify-center lg:justify-start gap-3">
            <div className="w-5 h-5 border border-red-500 flex items-center justify-center rounded-sm relative hidden sm:flex">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
            </div>
            ENERGY VIEW // DATAV
          </div>
          <div className="text-[8px] lg:text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1">GLOBAL EARLY WARNING INFRASTRUCTURE</div>
        </div>
        
        <div className="text-center lg:text-right flex flex-col gap-1 font-bold w-full lg:w-auto">
          <div className="text-[10px] text-cyan-400">SYS_STATUS: NOMINAL</div>
          <div className="text-xs lg:text-sm tracking-widest text-slate-400 font-normal">T: <span className="text-white">2026.04.23 // 23:31</span></div>
          <div className="text-[10px] text-slate-600 hidden sm:block">CONNECTION: SECURE (wss://)</div>
        </div>
      </div>

      {/* Main HUD Grid */}
      <div className="relative flex-1 w-full mt-4 flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-hidden pointer-events-none pb-20 lg:pb-0">
        
        {/* Left Column Controls */}
        <div className="w-full lg:w-[320px] shrink-0 h-auto lg:h-full flex flex-col gap-4 z-10 pointer-events-auto overflow-y-visible lg:overflow-y-auto pb-2 lg:pb-8 hide-scrollbar order-2 lg:order-1">
          
          <HudPanel title="System Analytics // WTI Crude">
            <div className="text-4xl text-white font-bold tracking-tighter mb-1 mt-1">$82.45</div>
            <div className="text-[10px] text-cyan-400 mb-4">+1.2% // Trend Accelerating</div>
            <TinyHUDChart data={wtiArray} dataKey="price" color="#ffffff" />
            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
              <div className="bg-black/60 p-2 border border-slate-800">
                <div className="text-slate-500">VOLATILITY</div>
                <div className="text-white font-bold">MED // 0.85</div>
              </div>
              <div className="bg-black/60 p-2 border border-slate-800">
                <div className="text-slate-500">PROJECTION</div>
                <div className="text-orange-400 font-bold">UP // +2.4%</div>
              </div>
            </div>
          </HudPanel>

          <HudPanel title="Conflict Impact Matrix">
            <div className="space-y-2 text-[10px] font-bold">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-slate-400">RUSSIA // UKR</span>
                <span className="text-red-500">CRITICAL [95]</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-slate-400">RED SEA RT</span>
                <span className="text-orange-400">HIGH [80]</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-400">EUR GAS TENSION</span>
                <span className="text-cyan-400">STABLE [40]</span>
              </div>
            </div>
            {/* simple bar viz */}
            <div className="mt-4 flex flex-col gap-1.5">
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-red-600 w-[95%]"></div></div>
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-orange-500 w-[80%]"></div></div>
              <div className="h-1.5 w-full bg-slate-900 overflow-hidden"><div className="h-full bg-cyan-500 w-[40%]"></div></div>
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
        <div className="flex-1 min-h-[400px] h-[50vh] lg:h-full relative flex items-center justify-center pointer-events-none order-1 lg:order-2 overflow-hidden lg:overflow-visible my-8 lg:my-0">
          {/* Overlay Targeting Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 transform scale-50 lg:scale-[0.85] xl:scale-100">
            <div className="w-[400px] h-[400px] rounded-full border border-dashed border-white/40 animate-[spin_60s_linear_infinite]" />
            <div className="w-[420px] h-[420px] rounded-full border border-white/20 absolute animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[800px] h-px bg-white/20" />
            <div className="absolute h-[800px] w-px bg-white/20" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center transform scale-[0.6] lg:scale-[0.85] xl:scale-100 mt-20 lg:mt-0">
            <SvgGlobe />
          </div>
          
          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.5),rgba(255,255,255,0))]" />
        </div>

        {/* Right Column Controls */}
        <div className="w-full lg:w-[320px] shrink-0 h-auto lg:h-full flex flex-col gap-4 z-10 pointer-events-auto overflow-y-visible lg:overflow-y-auto pb-2 lg:pb-8 hide-scrollbar order-3 lg:order-3">
          
          <HudPanel title="SDG Targets // Shift">
            <div className="flex justify-between text-[10px] mb-1 font-bold">
              <span className="text-slate-400">RENEWABLE MIX</span>
              <span className="text-cyan-400">28.4%</span>
            </div>
            <div className="h-1 w-full bg-slate-900 mb-4">
              <div className="h-full bg-cyan-400 w-[28.4%] animate-pulse"></div>
            </div>

            <div className="flex justify-between text-[10px] mb-1 font-bold">
              <span className="text-slate-400">FOSSIL DEPENDENCY</span>
              <span className="text-orange-400">71.6%</span>
            </div>
            <div className="h-1 w-full bg-slate-900 mb-4">
              <div className="h-full bg-orange-500 w-[71.6%]"></div>
            </div>

            <div className="text-[10px] text-slate-500 mt-4 border-t border-white/5 pt-2 font-bold">
              TARGET DIFF: <span className="text-white">-12.5%</span> (2030 GOAL)
            </div>
          </HudPanel>

          <HudPanel title="Natural Gas Flux // EU">
            <div className="text-2xl text-white font-bold tracking-tighter mb-1 mt-1">$2.84 <span className="text-[10px] font-normal text-slate-500">/ MMBtu</span></div>
            <TinyHUDChart data={gasArray} dataKey="price" color="#22d3ee" />
          </HudPanel>

          <HudPanel title="Node Detection">
            <div className="flex gap-4">
              <div className="w-16 h-16 border border-cyan-500/40 flex items-center justify-center p-1 bg-black/60 relative">
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white" />
                <div className="w-full h-full bg-cyan-900/40 animate-pulse relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-cyan-400 font-bold tracking-widest">ON</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1 text-[10px] font-bold">
                <div className="text-slate-400">ID: N-4892</div>
                <div className="text-white">LAT: 48.8566 // LNG: 2.3522</div>
                <div className="text-cyan-400">STATUS: ACTIVE</div>
              </div>
            </div>
          </HudPanel>

        </div>
      </div>
      
    </div>
  );
}
