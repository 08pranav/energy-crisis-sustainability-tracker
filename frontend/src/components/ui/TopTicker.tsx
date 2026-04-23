import React from 'react';

const TopTicker = () => {
  const commodities = [
    { name: 'WTI Crude', price: '$81.70', change: '+1.2%', up: true },
    { name: 'Brent Crude', price: '$86.46', change: '+0.8%', up: true },
    { name: 'Natural Gas', price: '$3.34', change: '-0.5%', up: false },
    { name: 'Coal', price: '$135.62', change: '-1.2%', up: false },
    { name: 'Electricity (EU)', price: '$88.13', change: '+3.4%', up: true },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-black/90 backdrop-blur-md border-b border-slate-800 py-1.5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...commodities, ...commodities, ...commodities].map((item, i) => (
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