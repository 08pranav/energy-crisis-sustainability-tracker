import React, { useState } from "react";
import { EnergyMap, MapMode } from "@/components/maps/EnergyMap";
import { useEnergyStore } from "@/store/energyStore";
import { MOCK_COUNTRY_PROFILES } from "@/lib/data";
import { X, Zap, TrendingUp, Leaf } from "lucide-react";

export default function MapPage() {
  const { selectedCountry, setSelectedCountry } = useEnergyStore();
  const countryProfile = MOCK_COUNTRY_PROFILES.find(
    (p) => p.name === selectedCountry,
  );
  const [mapMode, setMapMode] = useState<MapMode>("prices");

  const modes: {
    id: MapMode;
    label: string;
    icon: React.ReactNode;
    activeClass: string;
  }[] = [
    {
      id: "prices",
      label: "ENERGY PRICES",
      icon: <Zap size={9} />,
      activeClass: "border-orange-500/70 bg-orange-500/10 text-orange-400",
    },
    {
      id: "dependency",
      label: "DEPENDENCY RISK",
      icon: <TrendingUp size={9} />,
      activeClass: "border-red-500/70 bg-red-500/10 text-red-400",
    },
    {
      id: "renewables",
      label: "RENEWABLES",
      icon: <Leaf size={9} />,
      activeClass: "border-emerald-500/70 bg-emerald-500/10 text-emerald-400",
    },
  ];

  return (
    <div className="w-full h-screen p-4 pb-32 bg-transparent font-mono text-slate-300 overflow-hidden relative flex flex-col items-center justify-center">
      {/* ── Header ── */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-1">
        <div className="text-xl font-bold tracking-widest text-white flex items-center gap-3">
          <div className="w-4 h-4 border border-cyan-500 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse" />
          </div>
          SECTOR VIEW // MAP
        </div>
        <div className="text-[10px] text-slate-500 tracking-[0.3em] font-bold uppercase mt-1 hidden sm:block">
          INTERACTIVE ENERGY TOPOLOGY PROTOCOL
        </div>

        {/* Mode Toggle Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMapMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-widest border font-bold transition-all duration-200 ${
                mapMode === m.id
                  ? m.activeClass
                  : "border-slate-800 bg-black/60 text-slate-500 hover:text-slate-300 hover:border-slate-700"
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Map ── */}
      <div className="w-full flex-1 max-w-[1200px] relative flex items-center justify-center transform scale-75 lg:scale-100">
        <EnergyMap mode={mapMode} />
      </div>

      {/* ── Selected Country Sidebar ── */}
      {selectedCountry && (
        <div className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[100vw] bg-black/95 backdrop-blur-md border-l border-slate-800 flex flex-col pointer-events-auto overflow-y-auto hide-scrollbar">
          {/* Sidebar Header */}
          <div className="shrink-0 flex justify-between items-center border-b border-slate-800 px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold">
                NODE ID
              </div>
              <div className="text-[11px] tracking-widest text-cyan-400 font-bold">
                {selectedCountry.toUpperCase()}
              </div>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-slate-500 hover:text-white transition-colors border border-slate-800 hover:border-slate-600 p-1.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {countryProfile ? (
            <div className="flex flex-col gap-3 p-5">
              {/* Energy Prices Block */}
              <div className="border border-slate-800 bg-black/60 p-4 relative">
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/70" />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/70" />
                <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold mb-3">
                  ENERGY PRICES
                </div>
                <div className="space-y-2">
                  {[
                    {
                      label: "CRUDE OIL",
                      val: `$${countryProfile.prices.oil.toFixed(2)}`,
                      unit: "/bbl",
                      color: "text-orange-400",
                    },
                    {
                      label: "NATURAL GAS",
                      val: `$${countryProfile.prices.gas.toFixed(2)}`,
                      unit: "/MMBtu",
                      color: "text-cyan-400",
                    },
                    {
                      label: "ELECTRICITY",
                      val: `$${countryProfile.prices.electricity.toFixed(3)}`,
                      unit: "/kWh",
                      color: "text-yellow-400",
                    },
                    {
                      label: "COAL",
                      val: `$${countryProfile.prices.coal.toFixed(0)}`,
                      unit: "/t",
                      color: "text-slate-300",
                    },
                  ].map(({ label, val, unit, color }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center text-[10px] font-mono"
                    >
                      <span className="text-slate-400">{label}</span>
                      <span className={`${color} font-bold`}>
                        {val}
                        <span className="text-slate-600 font-normal">
                          {unit}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Index */}
              <div className="border border-slate-800 bg-black/60 p-4 relative">
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/40" />
                <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold mb-2">
                  ENERGY PRICE INDEX
                </div>
                <div className="text-3xl font-bold tracking-tighter text-white mb-2">
                  {countryProfile.energyScore}
                  <span className="text-xs text-slate-500 font-normal ml-1">
                    /100
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${countryProfile.energyScore}%`,
                      background:
                        "linear-gradient(to right, #0e7490, #ca8a04, #ea580c)",
                    }}
                  />
                </div>
              </div>

              {/* Dependency */}
              <div className="border border-slate-800 bg-black/60 p-4 relative">
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/40" />
                <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold mb-1">
                  IMPORT DEPENDENCY
                </div>
                <div
                  className={`text-2xl font-bold tracking-tighter ${
                    countryProfile.dependency > 60
                      ? "text-red-500"
                      : countryProfile.dependency < 0
                        ? "text-emerald-400"
                        : "text-cyan-400"
                  }`}
                >
                  {countryProfile.dependency < 0
                    ? "NET EXPORTER"
                    : `${countryProfile.dependency}%`}
                </div>
              </div>

              {/* Primary + Renewable Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-800 bg-black/60 p-3">
                  <div className="text-[9px] tracking-[0.2em] text-slate-500 font-bold mb-1">
                    PRIMARY SRC
                  </div>
                  <div className="text-sm font-bold text-white uppercase">
                    {countryProfile.primary}
                  </div>
                </div>
                <div className="border border-slate-800 bg-black/60 p-3">
                  <div className="text-[9px] tracking-[0.2em] text-slate-500 font-bold mb-1">
                    RENEWABLE
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    {countryProfile.renewableShare}%
                  </div>
                </div>
              </div>

              {/* Renewable Progress Bar */}
              <div className="border border-slate-800 bg-black/60 p-4">
                <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold mb-2">
                  RENEWABLE SHARE
                </div>
                <div className="w-full bg-slate-900 h-1.5 mb-1">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-700"
                    style={{ width: `${countryProfile.renewableShare}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-slate-600 font-bold">
                  <span>0%</span>
                  <span className="text-emerald-500">
                    {countryProfile.renewableShare}%
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Geopolitical Conflict Risk */}
              <div className="border border-slate-800 bg-black/60 p-4 relative">
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/40" />
                <div className="text-[9px] tracking-[0.25em] text-slate-500 font-bold mb-2">
                  GEOPOLITICAL CONFLICT RISK
                </div>
                <div className="w-full bg-slate-900 h-1.5 mb-1">
                  <div
                    className={`h-full transition-all duration-700 ${
                      countryProfile.conflictRisk > 60
                        ? "bg-red-500"
                        : countryProfile.conflictRisk > 30
                          ? "bg-orange-500"
                          : "bg-cyan-500"
                    }`}
                    style={{ width: `${countryProfile.conflictRisk}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] font-bold">
                  <span className="text-slate-600">0</span>
                  <span
                    className={
                      countryProfile.conflictRisk > 60
                        ? "text-red-500"
                        : countryProfile.conflictRisk > 30
                          ? "text-orange-400"
                          : "text-cyan-400"
                    }
                  >
                    {countryProfile.conflictRisk > 60
                      ? "HIGH"
                      : countryProfile.conflictRisk > 30
                        ? "MODERATE"
                        : "LOW"}{" "}
                    // {countryProfile.conflictRisk}/100
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-slate-500 text-[10px] font-bold tracking-widest border border-dashed border-slate-800 p-8 text-center">
                TELEMETRY DATA UNAVAILABLE FOR SECTOR
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
