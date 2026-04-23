import React, { useEffect, useState } from 'react';

const MOCK_TICKER_DATA = [
  { symbol: 'WTI Crude', price: 82.45, change: 1.2 },
  { symbol: 'Brent Crude', price: 86.12, change: 0.8 },
  { symbol: 'Natural Gas', price: 2.84, change: -0.5 },
  { symbol: 'Coal', price: 135.5, change: -1.2 },
  { symbol: 'Electricity (EU)', price: 89.2, change: 3.4 },
];

export function LivePriceTicker() {
  const [prices, setPrices] = useState(MOCK_TICKER_DATA);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((p) => ({
          ...p,
          price: p.price + (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black/50 border-b border-white/5 py-1.5 overflow-hidden flex">
      <div className="animate-[ticker_30s_linear_infinite] flex whitespace-nowrap">
        {[...prices, ...prices, ...prices].map((item, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 text-xs font-mono">
            <span className="text-slate-400">{item.symbol}</span>
            <span className="text-white font-medium">${item.price.toFixed(2)}</span>
            <span
              className={
                item.change >= 0 ? 'text-emerald-400' : 'text-destructive'
              }
            >
              {item.change >= 0 ? '+' : ''}
              {item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
