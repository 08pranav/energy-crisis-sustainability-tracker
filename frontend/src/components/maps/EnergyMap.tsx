import React from 'react';
import { ComposableMap, Geographies, Geography, Sphere, Graticule } from 'react-simple-maps';
import { useEnergyStore } from '@/store/energyStore';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function EnergyMap() {
  const { setSelectedCountry } = useEnergyStore();

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        className="w-full h-full"
      >
        <Sphere stroke="#ffffff20" strokeWidth={0.5} id="sphere" fill="transparent" />
        <Graticule stroke="#ffffff10" strokeWidth={0.5} />
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Mock logic for coloring: find if country is in our profile
              const countryInfo = MOCK_COUNTRY_PROFILES.find(p => p.id === geo.id);
              let fill = "#1e293b"; // base slate-800
              
              if (countryInfo) {
                // simple color scale based on dependency
                if (countryInfo.dependency > 50) fill = "#991b1b"; // red
                else if (countryInfo.dependency > 20) fill = "#b45309"; // amber
                else fill = "#15803d"; // green (self sufficient)
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="#0f172a"
                  strokeWidth={0.5}
                  onClick={() => setSelectedCountry(countryInfo ? countryInfo.name : geo.properties.name)}
                  style={{
                    default: { outline: "none", transition: "all 250ms" },
                    hover: { fill: "#38bdf8", outline: "none", cursor: "pointer" },
                    pressed: { fill: "#0ea5e9", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
