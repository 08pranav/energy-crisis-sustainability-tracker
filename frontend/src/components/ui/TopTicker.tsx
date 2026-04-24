import React from 'react';
import { useEnergyStore } from '@/store/energyStore';
import { CommodityType } from '@/store/energyStore';

const TopTicker = () => {
  const { commodityHistory } = useEnergyStore();

  const extractLatest = (key: CommodityType, fallbackPrice: number) => {
    const arrayInfo = commodityHistory[key] || [];
    if (arrayInfo.length === 0) return { price: fallbackPrice.toFixed(2), diff: '0.00', up: true };
    const latest = arrayInfo[arrayInfo.length - 1].price;
    const prev = arrayInfo.length > 1 ? arrayInfo[arrayInfo.length - 2].price : latest;
    const diff = latest - prev;
    return {
      price: latest.toFixed(2),
      diff: diff.toFixed(2),
      up: diff >= 0
    };
  };

  const wti = extractLatest('wti_crude', 81.70);
  const brent = extractLatest('brent_crude', 86.46);
  const ng = extractLatest('natural_gas', 3.34);

  const commodities = [
    { name: 'WTI Crude', price: `$${wti.price}`, change: `${wti.up ? '+' : ''}${wti.diff}`, up: wti.up },
    { name: 'Brent Crude', price: `$${brent.price}`, change: `${brent.up ? '+' : ''}${brent.diff}`, up: brent.up },
    { name: 'Natural Gas', price: `$${ng.price}`, change: `${ng.up ? '+' : ''}${ng.diff}`, up: ng.up },
    { name: 'Coal', price: '$135.62', change: '-1.2%', up: false },
    { name: 'Electricity (EU)', price: '$88.13', change: '+3.4%', up: true },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-black/90 backdrop-blur-md border-b border-slate-800 py-1.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...commodities, ...commodities, ...commodities, ...commodities, ...commodities].map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-8 font-mono text-[10px] tracking-wider border-r border-slate-800">
            <div className="w-1.5 h-1.5 rounded-none bg-slate-700" />
            <span className="text-slate-500 uppercase">{item.name}</span>
            <span className="text-white font-bold">{item.price}</span>
            <span className={item.up ? 'text-cyan-400' : 'text-orange-500'}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTicker;