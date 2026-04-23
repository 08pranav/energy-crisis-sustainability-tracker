import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ConflictBadge } from '@/components/ui/Badges';
import { MOCK_COUNTRY_PROFILES } from '@/lib/data';

const CONFLICT_EVENTS = [
  { id: 1, name: 'Russia-Ukraine War', year: 2022, impact: 95 },
  { id: 2, name: 'Red Sea Route Disruption', year: 2023, impact: 80 },
  { id: 3, name: 'Middle East Tensions', year: 2024, impact: 85 },
  { id: 4, name: 'European Gas Crisis', year: 2022, impact: 90 },
];

export default function Supply() {
  const topRisk = [...MOCK_COUNTRY_PROFILES].sort((a, b) => b.conflictRisk - a.conflictRisk).slice(0, 10);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 h-full mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Supply Disruptions</h1>
          <p className="text-slate-400">Analyze geopolitical conflict impacts on global energy supply routes.</p>
        </div>
        <ConflictBadge active={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
          <h3 className="text-slate-400 font-medium">Recent Major Disruptions</h3>
          <div className="flex flex-col gap-3">
            {CONFLICT_EVENTS.map(event => (
              <div key={event.id} className="bg-slate-900/50 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                <div>
                  <div className="text-white font-medium">{event.name}</div>
                  <div className="text-xs text-slate-500">{event.year}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Impact Score</div>
                  <div className="text-red-400 font-bold">{event.impact}/100</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-4">Top 10 Risk Exposure by Country</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRisk} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#ffffff50" />
                <YAxis dataKey="name" type="category" stroke="#ffffff50" width={100} fontSize={12} />
                <Tooltip cursor={{ fill: '#ffffff10' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20' }} />
                <Bar dataKey="conflictRisk" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
