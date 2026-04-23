import React from 'react';
import { EnergyMap } from '@/components/maps/EnergyMap';
import { useEnergyStore } from '@/store/energyStore';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';
import { X } from 'lucide-react';

export default function MapPage() {
  const { selectedCountry, setSelectedCountry } = useEnergyStore();
  const countryProfile = MOCK_COUNTRY_PROFILES.find(p => p.name === selectedCountry);

  return (
    <div className="w-full h-screen p-4 pb-32 bg-transparent font-mono text-slate-300 overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* Absolute Header */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-1">
        <div className="text-xl font-bold tracking-widest text-white flex items-center gap-3">
          <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></div>
          </div>
          SECTOR VIEW // MAP
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1 hidden sm:block">INTERACTIVE TOPOLOGY PROTOCOL</div>
        
        <div className="mt-4 flex gap-2 w-fit">
          <div className="px-3 py-1 text-[10px] tracking-widest border border-orange-500/50 bg-black/60 text-orange-400">DEPENDENCY RISK</div>
          <div className="px-3 py-1 text-[10px] tracking-widest border border-slate-800 bg-black/60 text-slate-400">RENEWABLES</div>
        </div>
      </div>

      <div className="w-full flex-1 max-w-[1200px] relative flex items-center justify-center transform scale-75 lg:scale-100">
        <EnergyMap />
      </div>

      {selectedCountry && (
        <div className="absolute right-0 top-0 bottom-0 w-[400px] max-w-[100vw] bg-black/90 backdrop-blur-md border-l border-slate-800 p-8 flex flex-col gap-6 slide-in-from-right duration-300 pointer-events-auto overflow-y-auto">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div className="text-sm tracking-widest text-cyan-400">NODE ID // {selectedCountry.toUpperCase()}</div>
            <button onClick={() => setSelectedCountry(null)} className="text-slate-500 hover:text-white transition-colors border border-slate-800 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {countryProfile ? (
            <div className="flex flex-col gap-4">
              <div className="border border-slate-800 bg-black p-4 relative">
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white" />
                <div className="text-[10px] tracking-[0.2em] text-slate-500 mb-1">DEPENDENCY RISK</div>
                <div className={`text-3xl font-bold tracking-tighter ${countryProfile.dependency > 50 ? 'text-red-500' : 'text-cyan-400'}`}>
                  {countryProfile.dependency}%
                </div>
              </div>
              
              <div className="border border-slate-800 bg-black p-4 relative">
                <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white" />
                <div className="text-[10px] tracking-[0.2em] text-slate-500 mb-1">PRIMARY SOURCE</div>
                <div className="text-lg font-bold text-white uppercase">{countryProfile.primary}</div>
              </div>
              
              <div className="border border-slate-800 bg-black p-4 relative">
                <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white" />
                <div className="text-[10px] tracking-[0.2em] text-slate-500 mb-1">RENEWABLE SHARE</div>
                <div className="text-xl font-bold text-cyan-400 tracking-tighter">{countryProfile.renewableShare}%</div>
              </div>
              
              <div className="border border-slate-800 bg-black p-4 relative">
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white" />
                <div className="text-[10px] tracking-[0.2em] text-slate-500 mb-2">GEOPOLITICAL CONFLICT EXPOSURE</div>
                <div className="w-full bg-slate-900 h-1">
                  <div className="bg-orange-500 h-full" style={{ width: `${countryProfile.conflictRisk}%` }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-[10px] font-bold tracking-widest border border-dashed border-slate-800 p-8 text-center">
              TELEMETRY DATA UNAVAILABLE FOR SECTOR
            </div>
          )}
        </div>
      )}
    </div>
  );
}
