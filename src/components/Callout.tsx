import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export type CalloutType = 'INFO' | 'TIP' | 'WARNING' | 'IMPORTANT' | 'SUCCESS';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type, title, children }) => {
  const configs = {
    INFO: {
      icon: Info,
      border: 'border-l-4 border-l-blue-600 border-y border-r border-slate-200',
      bg: 'bg-blue-50/50',
      titleColor: 'text-blue-900',
      iconColor: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800 border border-blue-200',
      defaultTitle: 'Note',
    },
    TIP: {
      icon: Lightbulb,
      border: 'border-l-4 border-l-purple-600 border-y border-r border-slate-200',
      bg: 'bg-purple-50/50',
      titleColor: 'text-purple-900',
      iconColor: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-800 border border-purple-200',
      defaultTitle: 'Tip',
    },
    WARNING: {
      icon: AlertTriangle,
      border: 'border-l-4 border-l-amber-500 border-y border-r border-slate-200',
      bg: 'bg-amber-50/50',
      titleColor: 'text-amber-900',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800 border border-amber-200',
      defaultTitle: 'Warning',
    },
    IMPORTANT: {
      icon: AlertCircle,
      border: 'border-l-4 border-l-rose-600 border-y border-r border-slate-200',
      bg: 'bg-rose-50/50',
      titleColor: 'text-rose-900',
      iconColor: 'text-rose-600',
      badge: 'bg-rose-100 text-rose-800 border border-rose-200',
      defaultTitle: 'Important',
    },
    SUCCESS: {
      icon: CheckCircle2,
      border: 'border-l-4 border-l-emerald-600 border-y border-r border-slate-200',
      bg: 'bg-emerald-50/50',
      titleColor: 'text-emerald-900',
      iconColor: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      defaultTitle: 'Success',
    },
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <div className={`my-4 rounded-xl p-4 shadow-xs transition-all ${config.border} ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${config.iconColor}`}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase ${config.badge}`}>
              {type}
            </span>
            <span className={`text-sm font-bold ${config.titleColor}`}>
              {title || config.defaultTitle}
            </span>
          </div>
          <div className="text-sm leading-relaxed text-neutral-800 [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
