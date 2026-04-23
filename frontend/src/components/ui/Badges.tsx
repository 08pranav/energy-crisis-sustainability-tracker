import React from 'react';
import { cn } from '@/lib/utils';
import { Info, Database } from 'lucide-react';

export function ConflictBadge({ active }: { active?: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-destructive bg-destructive/10 px-2.5 py-1 rounded-full border border-destructive/20 w-fit">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
      </span>
      Active Conflict Zone
    </div>
  );
}

export function SDGBadge({ type }: { type: 7 | 13 }) {
  const isSeven = type === 7;
  return (
    <div className={cn(
      "flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded w-fit",
      isSeven ? "bg-[#FCC30B]/20 text-[#FCC30B] border border-[#FCC30B]/30" : "bg-[#3F7E44]/20 text-[#3F7E44] border border-[#3F7E44]/30"
    )}>
      SDG {type} {isSeven ? 'Affordable Energy' : 'Climate Action'}
    </div>
  );
}

export function DataSourceTag({ source }: { source: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800 w-fit">
      <Database className="w-3 h-3" />
      Source: {source}
    </div>
  );
}
