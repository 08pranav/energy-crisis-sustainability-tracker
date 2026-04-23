import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  data: number[];
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function KPICard({ title, value, change, data, className, prefix, suffix }: KPICardProps) {
  const isPositive = change >= 0;
  const chartData = data.map((d, i) => ({ val: d, i }));
  
  return (
    <div className={cn("glass-card rounded-xl p-5 flex flex-col gap-4", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="font-mono text-3xl font-bold text-white tracking-tight">
          {prefix}{value}{suffix}
        </div>
        
        <div className="h-12 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke={isPositive ? "#10B981" : "#EF4444"} 
                strokeWidth={2} 
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
