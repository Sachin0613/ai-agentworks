import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, BookOpen, Terminal, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { NAVIGATION_GROUPS, GLOSSARY_TERMS, DECISION_LOG, TROUBLESHOOTING_GUIDES, PHASES_DATA } from '../data/projectData';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  snippet: string;
  path: string;
  iconType: 'page' | 'command' | 'glossary' | 'decision' | 'troubleshoot';
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Search indexing logic
  useEffect(() => {
    if (!query.trim()) {
      // Default top suggestions
      setResults([
        {
          id: 'quick-start',
          title: 'Quick Start (10-Step Setup)',
          category: 'Getting Started',
          snippet: 'Step-by-step setup from git clone to baseline evaluation.',
          path: '/docs/getting-started',
          iconType: 'command',
        },
        {
          id: 'architecture',
          title: 'System Architecture',
          category: 'Core System',
          snippet: 'Preprocessing, provisional intent classification, FAISS retrieval, and deterministic safety.',
          path: '/docs/architecture',
          iconType: 'page',
        },
        {
          id: 'headline-metrics',
          title: 'What is misleading about my headline number?',
          category: 'Critical Evaluation',
          snippet: '54% TF-IDF golden accuracy caveats, class imbalance, and why intent accuracy is not agent capability.',
          path: '/docs/headline-metrics',
          iconType: 'decision',
        },
        {
          id: 'sandbox',
          title: 'Interactive Agent Sandbox',
          category: 'Interactive',
          snippet: 'Test live support messages and inspect pipeline execution traces.',
          path: '/docs/components/sandbox',
          iconType: 'page',
        },
      ]);
      return;
    }

    const q = query.toLowerCase().trim();
    const hits: SearchResult[] = [];

    // Search navigation pages
    NAVIGATION_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        if (item.title.toLowerCase().includes(q)) {
          hits.push({
            id: item.id,
            title: item.title,
            category: group.title,
            snippet: `Navigate to ${item.title} in the ${group.title} section.`,
            path: item.path,
            iconType: 'page',
          });
        }
      });
    });

    // Search phases (1-20)
    PHASES_DATA.forEach((phase) => {
      if (
        phase.name.toLowerCase().includes(q) ||
        phase.goal.toLowerCase().includes(q) ||
        phase.problem.toLowerCase().includes(q) ||
        (phase.command && phase.command.toLowerCase().includes(q))
      ) {
        hits.push({
          id: phase.id,
          title: `Phase ${phase.phaseNumber} — ${phase.name}`,
          category: 'Phases',
          snippet: phase.goal,
          path: `/docs/phases/${phase.phaseNumber}`,
          iconType: 'command',
        });
      }
    });

    // Search glossary
    GLOSSARY_TERMS.forEach((term) => {
      if (term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q)) {
        hits.push({
          id: `term-${term.term}`,
          title: term.term,
          category: `Glossary (${term.category})`,
          snippet: term.definition,
          path: '/docs/reference/glossary',
          iconType: 'glossary',
        });
      }
    });

    // Search decision log
    DECISION_LOG.forEach((decision) => {
      if (
        decision.title.toLowerCase().includes(q) ||
        decision.decision.toLowerCase().includes(q) ||
        decision.why.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `decision-${decision.id}`,
          title: `Decision #${decision.id}: ${decision.title}`,
          category: `Decision Log (${decision.category})`,
          snippet: decision.why,
          path: '/docs/reference/decision-log',
          iconType: 'decision',
        });
      }
    });

    // Search troubleshooting
    TROUBLESHOOTING_GUIDES.forEach((guide, i) => {
      if (
        guide.issue.toLowerCase().includes(q) ||
        guide.symptom.toLowerCase().includes(q) ||
        guide.rootCause.toLowerCase().includes(q)
      ) {
        hits.push({
          id: `trouble-${i}`,
          title: guide.issue,
          category: 'Troubleshooting',
          snippet: guide.symptom,
          path: '/docs/developer/troubleshooting',
          iconType: 'troubleshoot',
        });
      }
    });

    setResults(hits.slice(0, 10));
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onNavigate(results[selectedIndex].path);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center border-b border-neutral-200 px-4 py-3">
          <Search className="h-5 w-5 text-neutral-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation, phases, commands, decisions, glossary..."
            className="flex-1 bg-transparent text-sm text-black placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-black cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No results found for "<span className="font-semibold text-black">{query}</span>"
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 text-black font-medium'
                      : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div
                    className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {item.iconType === 'command' && <Terminal className="h-4 w-4 text-emerald-500" />}
                    {item.iconType === 'glossary' && <BookOpen className="h-4 w-4 text-purple-500" />}
                    {item.iconType === 'decision' && <Shield className="h-4 w-4 text-amber-500" />}
                    {item.iconType === 'troubleshoot' && <HelpCircle className="h-4 w-4 text-rose-500" />}
                    {item.iconType === 'page' && <Command className="h-4 w-4 text-blue-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate text-black">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">
                      {item.snippet}
                    </p>
                  </div>

                  {isSelected && (
                    <ArrowRight className="h-4 w-4 text-black shrink-0 self-center" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-2 text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-200 font-mono text-[10px] text-black">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 font-mono text-[10px] text-black">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-200 font-mono text-[10px] text-black">enter</kbd> select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-neutral-200 font-mono text-[10px] text-black">esc</kbd> close</span>
          </div>
          <span className="font-mono">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};
