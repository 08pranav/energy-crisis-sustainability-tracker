import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { linearRegression, linearRegressionLine } from 'simple-statistics';
import { useEnergyStore, CommodityType } from '@/store/energyStore';
import { initialCommodityData } from '@/lib/data';
import { SDGBadge } from '@/components/ui/Badges';

const COMMODITIES: { id: CommodityType; name: string }[] = [
  { id: 'wti_crude', name: 'WTI Crude Oil' },
  { id: 'brent_crude', name: 'Brent Crude Oil' },
  { id: 'natural_gas', name: 'Natural Gas' },
  { id: 'coal', name: 'Coal' },
  { id: 'electricity', name: 'Electricity (EU)' },
];

export default function Prices() {
  const { selectedCommodity, setSelectedCommodity } = useEnergyStore();
  const [data, setData] = useState<{ time: number; price: number; forecast?: number }[]>(
    initialCommodityData[selectedCommodity]
  );
  
  // Real-time chart streaming mock
  useEffect(() => {
    setData(initialCommodityData[selectedCommodity]);
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const newPrice = last.price + (Math.random() - 0.5) * 2;
        const newArr = [...prev.slice(1), { time: last.time + 1, price: newPrice }];
        
        // Add forecast (simple linear regression over last 20 points projecting next 10)
        const points = newArr.slice(-20).map((d, i) => [i, d.price]);
        const regression = linearRegressionLine(linearRegression(points));
        
        return newArr.map((d, i) => {
          if (i > newArr.length - 5) {
            return { ...d, forecast: regression(i - (newArr.length - 20)) };
          }
          return d;
        });
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedCommodity]);

  const currentPrice = data[data.length - 1]?.price || 0;
  const prevPrice = data[data.length - 2]?.price || 0;
  const change = (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2);

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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
