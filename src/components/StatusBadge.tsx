import React from 'react';
import { StatusType } from '../types';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1 font-medium';

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (status === 'Implemented' || status === 'Done' || status === 'Ready' || status === 'Complete' || status.includes('Complete')) {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
  } else if (status === 'Partial' || status === 'Verify') {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-300 font-semibold';
  } else if (status === 'Pending') {
    colorClasses = 'bg-blue-50 text-blue-800 border-blue-300 font-semibold';
  } else if (status === 'Experimental' || status === 'Crucial' || status === 'Interactive') {
    colorClasses = 'bg-purple-50 text-purple-800 border-purple-300 font-semibold';
  } else if (status === 'Not Implemented') {
    colorClasses = 'bg-rose-50 text-rose-800 border-rose-300 font-semibold';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${colorClasses} ${sizeClasses} whitespace-nowrap`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      <span>{status}</span>
    </span>
  );
};
