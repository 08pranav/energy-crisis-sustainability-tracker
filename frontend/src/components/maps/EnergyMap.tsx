import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { useEnergyStore } from "@/store/energyStore";
import { MOCK_COUNTRY_PROFILES, CountryProfile } from "@/lib/data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export type MapMode = "prices" | "dependency" | "renewables";

interface EnergyMapProps {
  mode: MapMode;
}

// ─── Color Interpolation Utilities ──────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

function scaleColor(
  value: number,
  stops: { at: number; color: string }[],
): string {
  const lo = stops[0].at;
  const hi = stops[stops.length - 1].at;
  const v = Math.max(lo, Math.min(hi, value));
  for (let i = 0; i < stops.length - 1; i++) {
    if (v >= stops[i].at && v <= stops[i + 1].at) {
      const t = (v - stops[i].at) / (stops[i + 1].at - stops[i].at);
      return lerpColor(stops[i].color, stops[i + 1].color, t);
    }
  }
  return stops[stops.length - 1].color;
}

// Color stop definitions
const PRICE_STOPS = [
  { at: 0, color: "#020617" }, // slate-950  — nearly free
  { at: 12, color: "#0c1a2e" }, // very dark blue
  { at: 25, color: "#164e63" }, // cyan-900
  { at: 40, color: "#0e7490" }, // cyan-600   — cheap
  { at: 55, color: "#ca8a04" }, // yellow-600 — moderate
  { at: 70, color: "#ea580c" }, // orange-600 — expensive
  { at: 85, color: "#dc2626" }, // red-600
  { at: 100, color: "#7f1d1d" }, // red-950    — very expensive
];

const DEPENDENCY_STOPS = [
  { at: -300, color: "#064e3b" }, // emerald-950 — major exporter
  { at: -80, color: "#065f46" }, // emerald-900
  { at: -20, color: "#0e7490" }, // teal        — slight exporter
  { at: 0, color: "#1e293b" }, // slate-800   — neutral
  { at: 30, color: "#78350f" }, // amber-900   — moderate import
  { at: 60, color: "#c2410c" }, // orange-700
  { at: 85, color: "#b91c1c" }, // red-700
  { at: 100, color: "#7f1d1d" }, // red-950     — extreme dependency
];

const RENEWABLE_STOPS = [
  { at: 0, color: "#0a0f1a" }, // nearly black
  { at: 10, color: "#14261e" },
  { at: 25, color: "#14532d" }, // green-900
  { at: 45, color: "#166534" }, // green-800
  { at: 65, color: "#16a34a" }, // green-600
  { at: 85, color: "#22c55e" }, // green-500
  { at: 100, color: "#86efac" }, // green-300
];

// ─── Fill / Stroke Helpers ───────────────────────────────────────────────────

function getCountryFill(
  info: CountryProfile | undefined,
  mode: MapMode,
): string {
  if (!info) return "#070d18";
  switch (mode) {
    case "prices":
      return scaleColor(info.energyScore, PRICE_STOPS);
    case "dependency":
      return scaleColor(info.dependency, DEPENDENCY_STOPS);
    case "renewables":
      return scaleColor(info.renewableShare, RENEWABLE_STOPS);
  }
}

function getCountryStroke(
  info: CountryProfile | undefined,
  mode: MapMode,
): string {
  if (!info) return "#0f172a";
  switch (mode) {
    case "prices":
      if (info.energyScore > 70) return "rgba(239,68,68,0.4)";
      if (info.energyScore > 40) return "rgba(249,115,22,0.35)";
      return "rgba(34,211,238,0.25)";
    case "dependency":
      if (info.dependency > 60) return "rgba(239,68,68,0.4)";
      if (info.dependency < 0) return "rgba(16,185,129,0.35)";
      return "rgba(100,116,139,0.3)";
    case "renewables":
      if (info.renewableShare > 60) return "rgba(34,197,94,0.45)";
      if (info.renewableShare > 30) return "rgba(22,163,74,0.3)";
      return "rgba(100,116,139,0.25)";
  }
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score < 20) return { label: "VERY LOW", color: "text-cyan-400" };
  if (score < 40) return { label: "LOW", color: "text-teal-400" };
  if (score < 58) return { label: "MODERATE", color: "text-amber-400" };
  if (score < 74) return { label: "HIGH", color: "text-orange-400" };
  return { label: "CRITICAL", color: "text-red-500" };
}

// ─── Legend Component ────────────────────────────────────────────────────────

function Legend({ mode }: { mode: MapMode }) {
  const configs = {
    prices: {
      label: "ENERGY PRICE INDEX",
      gradient:
        "linear-gradient(to right, #020617, #0e7490, #ca8a04, #ea580c, #7f1d1d)",
      left: "CHEAP",
      right: "EXPENSIVE",
    },
    dependency: {
      label: "ENERGY DEPENDENCY",
      gradient:
        "linear-gradient(to right, #064e3b, #0e7490, #1e293b, #c2410c, #7f1d1d)",
      left: "EXPORTER",
      right: "IMPORTER",
    },
    renewables: {
      label: "RENEWABLE SHARE",
      gradient: "linear-gradient(to right, #0a0f1a, #14532d, #22c55e, #86efac)",
      left: "0%",
      right: "100%",
    },
  };
  const c = configs[mode];
  return (
    <div className="absolute bottom-4 left-4 pointer-events-none bg-black/85 border border-slate-800 p-3">
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-600" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-600" />
      <div className="text-[8px] text-slate-500 font-bold tracking-[0.25em] mb-1.5">
        {c.label}
      </div>
      <div
        className="w-36 h-2 rounded-none"
        style={{ background: c.gradient }}
      />
      <div className="flex justify-between text-[7px] text-slate-600 mt-1 font-bold tracking-widest">
        <span>{c.left}</span>
        <span>{c.right}</span>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function EnergyMap({ mode }: EnergyMapProps) {
  const { setSelectedCountry } = useEnergyStore();
  const [tooltip, setTooltip] = useState<{
    name: string;
    data: CountryProfile | undefined;
    x: number;
    y: number;
  } | null>(null);

  return (
    <>
      {/* Map Container */}
      <div className="w-[1000px] h-[650px] relative cursor-crosshair">
        {/* Corner brackets */}
        <div className="absolute inset-0 border border-slate-800/50 pointer-events-none z-10" />
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/60 pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/60 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/60 pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/60 pointer-events-none z-10" />

        <ComposableMap
          width={1000}
          height={650}
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          className="w-full h-full"
          style={{ background: "transparent" }}
        >
          <Graticule
            stroke="#1e293b"
            strokeWidth={0.35}
            strokeDasharray="2 5"
          />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryInfo = MOCK_COUNTRY_PROFILES.find(
                  (p) => p.id === Number(geo.id),
                );
                const fill = getCountryFill(countryInfo, mode);
                const stroke = getCountryStroke(countryInfo, mode);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={0.6}
                    onClick={() =>
                      setSelectedCountry(
                        countryInfo ? countryInfo.name : geo.properties.name,
                      )
                    }
                    onMouseMove={(e: React.MouseEvent) => {
                      setTooltip({
                        name: countryInfo
                          ? countryInfo.name
                          : geo.properties.name,
                        data: countryInfo,
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        outline: "none",
                        transition: "fill 200ms ease",
                      },
                      hover: {
                        outline: "none",
                        cursor: "pointer",
                        filter: "brightness(1.55) saturate(1.2)",
                        stroke: "#ffffff",
                        strokeWidth: 1.2,
                      },
                      pressed: {
                        outline: "none",
                        filter: "brightness(1.8)",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Legend */}
        <Legend mode={mode} />
      </div>

      {/* ── Hover Tooltip ─────────────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-[200] w-[230px] bg-black/98 border border-slate-700/80 shadow-[0_0_40px_rgba(0,0,0,0.97)]"
          style={{
            top: tooltip.y + 18,
            left:
              typeof window !== "undefined" &&
              tooltip.x > window.innerWidth - 270
                ? tooltip.x - 246
                : tooltip.x + 18,
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/70" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/70" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600/60" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600/60" />

          <div className="p-3">
            {/* Country Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-none animate-pulse shrink-0" />
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 truncate">
                {(tooltip.data?.name ?? tooltip.name).toUpperCase()}
              </span>
            </div>

            {tooltip.data ? (
              <>
                {/* Energy Prices */}
                <div className="mb-3">
                  <div className="text-[8px] text-slate-600 font-bold tracking-[0.25em] mb-1.5 uppercase">
                    Energy Prices
                  </div>
                  <div className="space-y-1">
                    {[
                      {
                        label: "CRUDE OIL",
                        val: `$${tooltip.data.prices.oil.toFixed(2)}`,
                        unit: "/bbl",
                        color: "text-orange-400",
                      },
                      {
                        label: "NATURAL GAS",
                        val: `$${tooltip.data.prices.gas.toFixed(2)}`,
                        unit: "/MMBtu",
                        color: "text-cyan-400",
                      },
                      {
                        label: "ELECTRICITY",
                        val: `$${tooltip.data.prices.electricity.toFixed(3)}`,
                        unit: "/kWh",
                        color: "text-yellow-400",
                      },
                      {
                        label: "COAL",
                        val: `$${tooltip.data.prices.coal.toFixed(0)}`,
                        unit: "/t",
                        color: "text-slate-300",
                      },
                    ].map(({ label, val, unit, color }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center text-[9px] font-mono"
                      >
                        <span className="text-slate-500">{label}</span>
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

                {/* Price Index Bar */}
                <div className="mb-2 pb-2 border-b border-slate-800/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] text-slate-600 font-bold tracking-widest">
                      PRICE INDEX
                    </span>
                    <span
                      className={`text-[8px] font-bold ${getScoreLabel(tooltip.data.energyScore).color}`}
                    >
                      {getScoreLabel(tooltip.data.energyScore).label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900">
                    <div
                      className="h-full"
                      style={{
                        width: `${tooltip.data.energyScore}%`,
                        background: scaleColor(
                          tooltip.data.energyScore,
                          PRICE_STOPS,
                        ),
                      }}
                    />
                  </div>
                  <div className="text-[7px] text-slate-700 mt-0.5 font-bold text-right">
                    {tooltip.data.energyScore}/100
                  </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-3 gap-1 text-[8px] font-mono">
                  <div className="bg-slate-950/60 p-1.5">
                    <div className="text-slate-600 mb-0.5">RENEW.</div>
                    <div className="text-emerald-400 font-bold">
                      {tooltip.data.renewableShare}%
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-1.5">
                    <div className="text-slate-600 mb-0.5">PRIMARY</div>
                    <div className="text-white font-bold truncate">
                      {tooltip.data.primary}
                    </div>
                  </div>
                  <div className="bg-slate-950/60 p-1.5">
                    <div className="text-slate-600 mb-0.5">CONFLICT</div>
                    <div
                      className={`font-bold ${
                        tooltip.data.conflictRisk > 60
                          ? "text-red-500"
                          : tooltip.data.conflictRisk > 30
                            ? "text-orange-400"
                            : "text-cyan-400"
                      }`}
                    >
                      {tooltip.data.conflictRisk > 60
                        ? "HIGH"
                        : tooltip.data.conflictRisk > 30
                          ? "MED"
                          : "LOW"}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-[9px] text-slate-500 font-mono italic py-2">
                NO TELEMETRY DATA
              </div>
            )}
          </div>

          {/* Click hint */}
          {tooltip.data && (
            <div className="px-3 py-1.5 border-t border-slate-800/60 bg-slate-950/50">
              <div className="text-[7px] text-slate-600 font-bold tracking-[0.2em]">
                CLICK FOR FULL ANALYSIS ↗
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
