import React from 'react';
import { Search, Menu, X, Sun, Moon, Laptop, Bot, Github, Sparkles } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

interface HeaderProps {
  theme?: 'light' | 'dark' | 'system';
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
  onOpenSearch: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left branding & mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer shrink-0"
          >
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                  AI Support Agent
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Docs
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden xl:block">
                Hiver Take-Home Engineering Documentation
              </p>
            </div>
          </button>
        </div>

        {/* Center Quick Navigation Links (Google/Python docs style) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
          <button
            onClick={() => onNavigate('/')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('/docs/getting-started')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Quickstart
          </button>
          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <button
            onClick={() => onNavigate('/docs/phases')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Phases
          </button>
          <button
            onClick={() => onNavigate('/docs/components/sandbox')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Simulator</span>
          </button>
          <button
            onClick={() => onNavigate('/docs/evaluation/overview')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Evaluation
          </button>
          <button
            onClick={() => onNavigate('/docs/developer/run-agent')}
            className="px-2.5 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Guides
          </button>
        </nav>

        {/* Center/Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search bar button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-400 hover:bg-white hover:text-slate-900 transition-all shadow-2xs w-36 sm:w-56 justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Search docs...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 border border-slate-300">
              Ctrl K
            </kbd>
          </button>

          {/* GitHub / Repo button */}
          <a
            href="#reproducibility"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/docs/developer/reproducibility');
            }}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-2xs cursor-pointer shrink-0"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Specs</span>
          </a>
        </div>
      </div>
    </header>
  );
};
