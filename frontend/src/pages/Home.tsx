import React from 'react';
import { KPICard } from '@/components/ui/KPICard';
import { EnergyMap } from '@/components/maps/EnergyMap';
import { initialCommodityData } from '@/lib/data';
import { DataSourceTag } from '@/components/ui/Badges';

export default function Home() {
  // Use mock data to feed KPI cards
  const wtiArray = initialCommodityData.wti_crude.map(d => d.price);
  const gasArray = initialCommodityData.natural_gas.map(d => d.price);

  return (
    <div className="flex-1 w-full flex flex-col h-full items-center">
      {/* Hero Section */}
      <div className="w-full relative py-12 px-8 flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8">
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-tight">
            Monitor Global <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500">
              Energy Stress.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-xl">
            Real-time tracking of energy commodities, supply chain disruptions, and global sustainability metrics aligned with SDG 7 & 13.
          </p>
          <div className="flex gap-4">
            <DataSourceTag source="EIA / OWID / World Bank" />
          </div>
        </div>

        <div className="flex-1 w-full h-[400px] bg-slate-900 rounded-2xl border border-white/5 overflow-hidden relative glass-card p-4">
          <EnergyMap />
          <div className="absolute top-4 left-4 pointer-events-none">
            <h3 className="font-medium text-sm text-slate-300">Energy Import Dependency</h3>
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="w-3 h-3 rounded-sm bg-red-800"></span> High Risk
              <span className="w-3 h-3 rounded-sm bg-amber-700 ml-2"></span> Moderate
              <span className="w-3 h-3 rounded-sm bg-green-700 ml-2"></span> Self-Sufficient
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="w-full max-w-7xl mx-auto px-8 pb-12 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Global WTI Crude" 
          value="82.45" 
          prefix="$"
          change={1.2} 
          data={wtiArray} 
        />
        <KPICard 
          title="Natural Gas" 
          value="2.84" 
          prefix="$"
          change={-0.5} 
          data={gasArray} 
        />
        <KPICard 
          title="Renewable Share" 
          value="28.4" 
          suffix="%"
          change={4.2} 
          data={[20, 22, 23, 24, 26, 27, 28, 28.4]} 
        />
        <KPICard 
          title="Active Conflicts" 
          value="14" 
          change={7.1} 
          data={[10, 11, 11, 12, 12, 13, 14]} 
          className="border-destructive/30"
        />
      </div>
    </div>
  );
}
