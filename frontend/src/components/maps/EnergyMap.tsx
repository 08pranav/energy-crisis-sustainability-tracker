import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Graticule } from 'react-simple-maps';
import { useEnergyStore } from '@/store/energyStore';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function EnergyMap() {
  const { setSelectedCountry } = useEnergyStore();
  const [tooltip, setTooltip] = useState<{name: string, data: any, x: number, y: number} | null>(null);

  const handleMouseMove = (e: React.MouseEvent, geo: any, countryInfo: any) => {
    setTooltip({
      name: countryInfo ? countryInfo.name : geo.properties.name,
      data: countryInfo,
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <>
      <div className="w-[1000px] h-[650px] relative cursor-crosshair drop-shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        {/* Background tracking grid inside the map bounds */}
        <div className="absolute inset-0 border border-slate-800 pointer-events-none" />
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 pointer-events-none" />

        <ComposableMap
          width={1000}
          height={650}
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          className="w-full h-full"
        >
          <Graticule stroke="#334155" strokeWidth={0.5} strokeDasharray="2 2" />
          
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryInfo = MOCK_COUNTRY_PROFILES.find(p => p.id === geo.id);
                let fill = "#000000"; // base black (translucent feel wireframe)
                let stroke = "#1e293b"; // base wireframe color
                
                if (countryInfo) {
                  // simple color scale based on dependency
                  if (countryInfo.dependency > 50) stroke = "#ef4444"; // red
                  else if (countryInfo.dependency > 20) stroke = "#f97316"; // orange
                  else stroke = "#22d3ee"; // cyan
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={0.8}
                    onClick={() => setSelectedCountry(countryInfo ? countryInfo.name : geo.properties.name)}
                    onMouseMove={(e) => handleMouseMove(e, geo, countryInfo)}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: { outline: "none", transition: "all 200ms" },
                      hover: { fill: stroke, fillOpacity: 0.2, stroke: "#fff", outline: "none", cursor: "pointer" },
                      pressed: { fill: stroke, fillOpacity: 0.5, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Hover Information Tooltip */}
      {tooltip && (
        <div 
          className="fixed pointer-events-none z-[100] bg-black/95 border border-cyan-500/50 p-4 transform translate-x-4 translate-y-4 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white" />
          
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 mb-2 border-b border-slate-800 pb-1">
            TARGET: {tooltip.name.toUpperCase()}
          </div>
          
          {tooltip.data ? (
            <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-mono tracking-widest">
              <div>DEP_RISK: <span className={tooltip.data.dependency > 50 ? 'text-red-500' : 'text-white'}>{tooltip.data.dependency}%</span></div>
              <div>RENEWABLE: <span className="text-white">{tooltip.data.renewableShare}%</span></div>
              <div>PRIMARY: <span className="text-orange-400">{tooltip.data.primary}</span></div>
            </div>
          ) : (
             <div className="text-[10px] text-slate-500 font-mono tracking-widest italic">NO TELEMETRY FOUND</div>
          )}
        </div>
      )}
    </>
  );
}
