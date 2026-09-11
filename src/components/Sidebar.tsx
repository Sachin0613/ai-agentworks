import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Terminal,
  Shield,
  Layers,
  Database,
  Cpu,
  BarChart2,
  FileCode,
  BookOpen
} from 'lucide-react';
import { NAVIGATION_GROUPS } from '../data/projectData';
import { StatusBadge } from './StatusBadge';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  // Remember expanded groups in state
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    // Keep phases collapsed or expanded by default
    'phases': false,
  });

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const renderGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'getting-started':
        return <Terminal className="h-3.5 w-3.5 text-blue-500" />;
      case 'project':
        return <Layers className="h-3.5 w-3.5 text-indigo-500" />;
      case 'phases':
        return <FileCode className="h-3.5 w-3.5 text-purple-500" />;
      case 'components':
        return <Cpu className="h-3.5 w-3.5 text-cyan-500" />;
      case 'evaluation':
        return <BarChart2 className="h-3.5 w-3.5 text-emerald-500" />;
      case 'developer-guide':
        return <Terminal className="h-3.5 w-3.5 text-amber-500" />;
      case 'reference':
        return <BookOpen className="h-3.5 w-3.5 text-rose-500" />;
      default:
        return null;
    }
  };

  const navContent = (
    <div className="h-full flex flex-col py-6 px-4 overflow-y-auto">
      {/* Quick Status Pill */}
      <div className="mb-5 p-3 rounded-lg bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-semibold text-slate-900">Phase 20 Complete</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <p className="text-[11px] text-slate-500">
          Locked Golden Set: 200 rows. Empirically audited baselines.
        </p>
      </div>

      {/* Nav groups */}
      <div className="space-y-5 flex-1">
        {NAVIGATION_GROUPS.map((group) => {
          const isCollapsed = collapsedGroups[group.id];
          return (
            <div key={group.id} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {renderGroupIcon(group.id)}
                  <span>{group.title}</span>
                </span>
                {isCollapsed ? (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5 mt-0.5 border-l border-slate-200 ml-3 pl-2">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.path);
                          onCloseMobileMenu();
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors text-left cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 pl-2'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 font-normal'
                        }`}
                      >
                        <span className="truncate pr-1">{item.title}</span>
                        {item.badge && (
                          <StatusBadge
                            status={item.badgeType || item.badge}
                            size="sm"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500">
        <p className="font-semibold text-slate-700">Hiver SDE Intern Assignment</p>
        <p className="mt-0.5 font-mono text-[10px]">Python 3.12 | FAISS | React</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-neutral-200 bg-white h-[calc(100vh-4rem)] sticky top-16">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileMenu}
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col border-r border-neutral-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
