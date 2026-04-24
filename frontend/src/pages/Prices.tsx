import React, { useEffect } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useEnergyStore, CommodityType } from '@/store/energyStore';
import { SDGBadge } from '@/components/ui/Badges';

const COMMODITIES: { id: CommodityType; name: string }[] = [
  { id: 'wti_crude', name: 'WTI Crude Oil' },
  { id: 'brent_crude', name: 'Brent Crude Oil' },
  { id: 'natural_gas', name: 'Natural Gas' },
  { id: 'coal', name: 'Coal' },
  { id: 'electricity', name: 'Electricity (EU)' },
];

export default function Prices() {
  const {
    selectedCommodity,
    setSelectedCommodity,
    commodityHistory,
    loading,
    error,
    fetchEnergyData
  } = useEnergyStore();

  useEffect(() => {
    fetchEnergyData();
    const interval = setInterval(fetchEnergyData, 60000);
    return () => clearInterval(interval);
  }, [fetchEnergyData]);

  const prices = commodityHistory[selectedCommodity] ?? [];
  console.log('Frontend received data:', prices);

  const currentPrice = prices[prices.length - 1]?.price || 0;
  const prevPrice = prices[prices.length - 2]?.price || currentPrice;
  const change = prevPrice ? (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2) : '0.00';

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 h-full mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Live Commodities</h1>
          <p className="text-slate-400">Real-time streaming prices and predictive forecasting.</p>
        </div>
        <SDGBadge type={7} />
      </div>

      <div className="flex gap-2 bg-slate-900 border border-white/5 p-1 rounded-lg w-fit">
        {COMMODITIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCommodity(c.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCommodity === c.id
                ? 'bg-accent/20 text-accent'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl flex flex-col justify-center">
          <h3 className="text-slate-400 font-medium mb-1">Current Price</h3>
          <div className="text-5xl font-mono font-bold text-white mb-2">
            ${currentPrice.toFixed(2)}
          </div>
          <div className={`text-sm font-medium flex items-center ${Number(change) >= 0 ? 'text-emerald-400' : 'text-destructive'}`}>
            {Number(change) >= 0 ? '▲' : '▼'} {Math.abs(Number(change))}% from last tick
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl md:col-span-2">
          <h3 className="text-slate-400 font-medium mb-4">Price Stream & Forecast</h3>
          <div className="h-64 w-full">
            {loading && !prices.length ? (
              <div className="h-full w-full flex items-center justify-center text-white">Loading energy data...</div>
            ) : error ? (
              <div className="h-full w-full flex items-center justify-center text-red-400">{error}</div>
            ) : !prices.length ? (
              <div className="h-full w-full flex items-center justify-center text-slate-400">No energy data available yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={['auto', 'auto']}
                    stroke="#ffffff50"
                    tickFormatter={(val) => `$${val}`}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
