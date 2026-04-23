import React from 'react';
import { EnergyMap } from '@/components/maps/EnergyMap';
import { useEnergyStore } from '@/store/energyStore';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';
import { X } from 'lucide-react';

export default function MapPage() {
  const { selectedCountry, setSelectedCountry } = useEnergyStore();
  const countryProfile = MOCK_COUNTRY_PROFILES.find(p => p.name === selectedCountry);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Global Map</h1>
        <p className="text-slate-400">Click any country to view its energy profile.</p>
        
        <div className="mt-4 flex gap-2 bg-slate-900/80 backdrop-blur-md border border-white/5 p-1 rounded-lg w-fit">
          <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-accent/20 text-accent transition-colors">Dependency Risk</button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white transition-colors">Renewables</button>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <EnergyMap />
      </div>

      {selectedCountry && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-md border-l border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-right">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedCountry}</h2>
            <button onClick={() => setSelectedCountry(null)} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {countryProfile ? (
            <div className="flex flex-col gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-slate-400">Dependency Risk</span>
                <span className={`text-2xl font-bold ${countryProfile.dependency > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {countryProfile.dependency}%
                </span>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-slate-400">Primary Energy Source</span>
                <span className="text-lg font-bold">{countryProfile.primary}</span>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-slate-400">Renewable Share</span>
                <span className="text-lg font-bold text-accent">{countryProfile.renewableShare}%</span>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg flex flex-col gap-1">
                <span className="text-xs text-slate-400">Geopolitical Conflict Exposure</span>
                <div className="w-full bg-slate-950 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${countryProfile.conflictRisk}%` }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-sm">
              Detailed energy profile not available for this region.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
