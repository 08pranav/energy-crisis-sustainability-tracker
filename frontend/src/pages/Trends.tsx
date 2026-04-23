import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SDGBadge } from '@/components/ui/Badges';

const ENERGY_MIX_DATA = [
  { year: 2010, coal: 40, oil: 34, gas: 22, nuclear: 2, renewables: 2 },
  { year: 2015, coal: 38, oil: 33, gas: 23, nuclear: 2, renewables: 4 },
  { year: 2018, coal: 36, oil: 32, gas: 24, nuclear: 3, renewables: 5 },
  { year: 2020, coal: 34, oil: 30, gas: 25, nuclear: 3, renewables: 8 },
  { year: 2022, coal: 32, oil: 29, gas: 24, nuclear: 4, renewables: 11 },
  { year: 2024, coal: 30, oil: 28, gas: 23, nuclear: 4, renewables: 15 },
];

export default function Trends() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 h-full mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Energy Transition Trends</h1>
          <p className="text-slate-400">Tracking global shifts from fossil fuels to renewables.</p>
        </div>
        <div className="flex gap-2">
          <SDGBadge type={7} />
          <SDGBadge type={13} />
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
        <h3 className="text-slate-400 font-medium">Global Energy Mix (%)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ENERGY_MIX_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="year" stroke="#ffffff50" />
              <YAxis stroke="#ffffff50" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20' }} />
              <Area type="monotone" dataKey="coal" stackId="1" stroke="#334155" fill="#334155" />
              <Area type="monotone" dataKey="oil" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              <Area type="monotone" dataKey="gas" stackId="1" stroke="#60A5FA" fill="#60A5FA" />
              <Area type="monotone" dataKey="nuclear" stackId="1" stroke="#A78BFA" fill="#A78BFA" />
              <Area type="monotone" dataKey="renewables" stackId="1" stroke="#10B981" fill="#10B981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 text-xs font-medium justify-center mt-2">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#334155] rounded-sm"></span> Coal</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#F59E0B] rounded-sm"></span> Oil</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#60A5FA] rounded-sm"></span> Gas</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#A78BFA] rounded-sm"></span> Nuclear</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#10B981] rounded-sm"></span> Renewables</div>
        </div>
      </div>
    </div>
  );
}
