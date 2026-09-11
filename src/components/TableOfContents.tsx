import React, { useState, useEffect } from 'react';
import { AlignLeft, ChevronDown, ChevronUp } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level?: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div>
      {/* Mobile Collapsible Header */}
      <div className="lg:hidden mb-4 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-900 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <AlignLeft className="h-4 w-4 text-slate-400" />
            <span>On This Page ({items.length} sections)</span>
          </span>
          {isMobileOpen ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
        </button>

        {isMobileOpen && (
          <div className="border-t border-slate-200 p-3 space-y-1 bg-slate-50">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-xs py-1 transition-colors cursor-pointer ${
                  item.level === 3 ? 'pl-4 text-slate-500' : 'font-medium text-slate-700'
                } ${activeId === item.id ? 'text-blue-600 font-bold' : 'hover:text-slate-900'}`}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pl-4 border-l border-slate-200 text-xs">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-500 mb-3">
          <AlignLeft className="h-3.5 w-3.5 text-slate-400" />
          <span>On this page</span>
        </div>
        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block text-left transition-colors w-full line-clamp-1 py-0.5 cursor-pointer ${
                  item.level === 3 ? 'pl-3 text-slate-500' : 'text-slate-600'
                } ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.text}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
