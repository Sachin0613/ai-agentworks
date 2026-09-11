import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 mb-6 overflow-x-auto py-1">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer text-slate-600"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-900 whitespace-nowrap">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.path && onNavigate(item.path)}
                className="hover:text-blue-600 text-slate-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
