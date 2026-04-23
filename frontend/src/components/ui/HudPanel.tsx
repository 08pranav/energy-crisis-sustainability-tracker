import React from 'react';
import { cn } from '@/lib/utils';

interface HudPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function HudPanel({ children, title, className, ...props }: HudPanelProps) {
  return (
    <div 
      className={cn(
        "relative border border-slate-800 bg-slate-950/60 p-4 font-mono backdrop-blur-sm overflow-hidden", 
        className
      )}
      {...props}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/80" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/80" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/80" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/80" />
      
      {/* Top tech accent line */}
      <div className="absolute top-0 left-4 right-8 h-[1px] bg-gradient-to-r from-white/30 to-transparent" />

      {title && (
        <div className="text-[10px] uppercase tracking-[0.2em] text-white mb-4 border-b border-slate-800/50 pb-2 flex items-center gap-2 font-bold">
          <div className="w-1.5 h-1.5 bg-cyan-400/80 rounded-sm animate-pulse" />
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
