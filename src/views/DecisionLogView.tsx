import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { DECISION_LOG } from '../data/projectData';
import { ShieldCheck, Filter, Search, CheckCircle2, ArrowRight } from 'lucide-react';

interface DecisionLogViewProps {
  onNavigate: (path: string) => void;
}

export const DecisionLogView: React.FC<DecisionLogViewProps> = ({ onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Architecture', 'Data', 'ML/NLP', 'Safety', 'Evaluation'];

  const filteredDecisions = DECISION_LOG.filter((d) => {
    const matchesCat = filterCategory === 'ALL' || d.category === filterCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.decision.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.why.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const tocItems = [
    { id: 'decision-log-intro', text: 'Architectural Rationale' },
    { id: 'decision-list', text: 'Documented Engineering Decisions (15)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Reference & Audit' }, { label: 'Engineering Decision Log' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Engineering Decision Log (ADRs)
            </h1>
            <StatusBadge status="15 Documented Decisions" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            A comprehensive record of 15 non-obvious engineering trade-offs made during system design, detailing alternatives considered, accepted compromises, and empirical results.
          </p>
        </div>

        {/* Intro */}
        <section id="decision-log-intro">
          <Callout type="INFO" title="Architecture Decision Records (ADRs)">
            Every non-trivial design choice involves trade-offs. Rather than presenting the system as arbitrary code, this log documents the deliberate reasoning behind our choices.
          </Callout>
        </section>

        {/* Filters */}
        <section id="decision-list" className="space-y-4">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter decisions..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200  bg-white  text-xs text-slate-900  placeholder:text-slate-400 focus:outline-none focus:border-blue-500 w-full sm:w-48"
              />
            </div>
          </div>

          {/* Decision Cards */}
          <div className="space-y-4">
            {filteredDecisions.map((d) => (
              <div
                key={d.id}
                id={`decision-${d.id}`}
                className="p-5 rounded-2xl border border-slate-200  bg-white  space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100  pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-md bg-blue-50  text-blue-600  flex items-center justify-center text-xs font-mono font-bold">
                      #{d.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 ">{d.title}</h3>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100  text-slate-600  font-semibold">
                    {d.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-2">
                    <div>
                      <strong className="text-slate-900  block font-semibold mb-0.5">
                        Decision:
                      </strong>
                      <p className="text-slate-600  leading-relaxed">{d.decision}</p>
                    </div>
                    <div>
                      <strong className="text-blue-600  block font-semibold mb-0.5">
                        Why We Did It:
                      </strong>
                      <p className="text-slate-600  leading-relaxed">{d.why}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <strong className="text-slate-500  block font-semibold mb-0.5">
                        Alternatives Considered:
                      </strong>
                      <p className="text-slate-600  leading-relaxed">{d.alternatives}</p>
                    </div>
                    <div>
                      <strong className="text-amber-600  block font-semibold mb-0.5">
                        Trade-offs & Result:
                      </strong>
                      <p className="text-slate-600  leading-relaxed">
                        <span className="text-amber-700  font-medium">{d.tradeOff}</span> &rarr; {d.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/evaluation/overview')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Evaluation
          </button>
          <button
            onClick={() => onNavigate('/docs/developer/project-structure')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Project Structure</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};
