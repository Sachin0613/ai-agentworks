import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { FAQ_ITEMS, GLOSSARY_TERMS } from '../data/projectData';
import { HelpCircle, BookOpen, ChevronDown, ChevronUp, Search, ArrowRight } from 'lucide-react';

interface FaqGlossaryViewProps {
  mode: 'faq' | 'glossary';
  onNavigate: (path: string) => void;
}

export const FaqGlossaryView: React.FC<FaqGlossaryViewProps> = ({ mode, onNavigate }) => {
  if (mode === 'glossary') {
    return <GlossarySection onNavigate={onNavigate} />;
  }
  return <FaqSection onNavigate={onNavigate} />;
};

const FaqSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true, // First open by default
    4: true, // Headline metric open by default
  });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const tocItems = FAQ_ITEMS.map((item, idx) => ({
    id: `faq-${idx}`,
    text: item.question,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div>
          <Breadcrumbs
            items={[{ label: 'Reference & Audit' }, { label: 'Frequently Asked Questions (FAQ)' }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-sm text-slate-600  mt-2 leading-relaxed">
            Substantive answers to architectural, machine learning, safety, and evaluation questions.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openItems[idx];
            return (
              <div
                key={idx}
                id={`faq-${idx}`}
                className="rounded-2xl border border-slate-200  bg-white  overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-slate-900  hover:bg-slate-50 :bg-slate-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-blue-100  text-blue-600  text-xs font-mono flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{item.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100  p-4 bg-slate-50/50  text-xs text-slate-600  leading-relaxed space-y-2">
                    <p>{item.answer}</p>
                    <span className="inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200/60  text-slate-500">
                      Category: {item.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

const GlossarySection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [query, setQuery] = useState<string>('');

  const categories = ['ALL', 'NLP/ML', 'System', 'Data', 'Evaluation'];

  const filtered = GLOSSARY_TERMS.filter((t) => {
    const matchesCat = filterCategory === 'ALL' || t.category === filterCategory;
    const matchesSearch =
      t.term.toLowerCase().includes(query.toLowerCase()) ||
      t.definition.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[{ label: 'Reference & Audit' }, { label: 'Technical Glossary' }]}
          onNavigate={onNavigate}
        />
        <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
          Technical Terms Glossary
        </h1>
        <p className="text-sm text-slate-600  mt-2 leading-relaxed">
          Standardized definitions for NLP, machine learning, system architecture, data splitting, and evaluation metrics used throughout this portal.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100  text-slate-600  hover:bg-slate-200 :bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search glossary terms..."
            className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200  bg-white  text-xs text-slate-900  placeholder:text-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-56"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200  bg-white  space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-900 ">
                {item.term}
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100  text-slate-500 ">
                {item.category}
              </span>
            </div>
            <p className="text-xs text-slate-600  leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
