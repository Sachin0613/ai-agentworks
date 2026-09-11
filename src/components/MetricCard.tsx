import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  badge?: string;
  badgeType?: 'default' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  badge,
  badgeType = 'default',
  icon,
}) => {
  let badgeClasses = 'bg-neutral-100 text-neutral-800 border border-neutral-200';
  let valueClasses = 'text-black';

  if (badgeType === 'success') {
    badgeClasses = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    valueClasses = 'text-emerald-600';
  } else if (badgeType === 'warning') {
    badgeClasses = 'bg-amber-50 text-amber-700 border border-amber-200';
    valueClasses = 'text-amber-600';
  } else if (badgeType === 'error') {
    badgeClasses = 'bg-rose-50 text-rose-700 border border-rose-200';
    valueClasses = 'text-rose-600';
  } else if (badgeType === 'info') {
    badgeClasses = 'bg-blue-50 text-blue-700 border border-blue-200';
    valueClasses = 'text-blue-600';
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition-all hover:border-neutral-400">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-2xl font-black tracking-tight ${valueClasses}`}>
          {value}
        </span>
        {badge && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${badgeClasses}`}>
            {badge}
          </span>
        )}
      </div>
      {subtext && (
        <p className="mt-1.5 text-xs text-neutral-500 leading-normal">
          {subtext}
        </p>
      )}
    </div>
  );
};
