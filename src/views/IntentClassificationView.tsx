import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { INTENT_TAXONOMY, BASELINE_METRICS } from '../data/projectData';
import { Cpu, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface IntentClassificationViewProps {
  onNavigate: (path: string) => void;
}

export const IntentClassificationView: React.FC<IntentClassificationViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'taxonomy-overview', text: 'Provisional 9-Class Taxonomy' },
    { id: 'taxonomy-table', text: 'Taxonomy Specifications & Performance' },
    { id: 'baseline-results', text: 'Baseline Classifier Performance' },
    { id: 'provisional-caveats', text: 'Why "Provisional" Taxonomy?' },
    { id: 'confusion-insights', text: 'Confusion Matrix Vulnerabilities' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Agent Components' }, { label: 'Intent Classification' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Intent Classification & Taxonomy
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            The agent routes customer support inquiries using a domain-tailored, provisional 9-class taxonomy derived from empirical frequency clustering of 82,556 AmazonHelp conversations.
          </p>
        </div>

        {/* Overview */}
        <section id="taxonomy-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Provisional 9-Class Taxonomy</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            Unlike generic NLP intent datasets (e.g., Banking77, CLINC150), customer inquiries sent to @AmazonHelp are dominated by package logistics, carrier scans, and Prime billing inquiries. The 9 classes balance operational specificity with sufficient training sample depth.
          </p>
          <Callout type="WARNING" title="Scope Warning: Provisional vs Certified">
            This taxonomy is designated as <strong>Provisional</strong>. In real production, taxonomies require continual iteration with human operations managers to account for seasonal logistics (e.g. peak holiday carrier delays) and evolving digital services (Luna, Kindle Unlimited).
          </Callout>
        </section>

        {/* Taxonomy Specifications Table */}
        <section id="taxonomy-table" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 ">Taxonomy Specifications & Performance</h2>

          <div className="space-y-4">
            {INTENT_TAXONOMY.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl border border-slate-200  bg-white  space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100  pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-blue-600 ">
                      {item.name}
                    </span>
                  </div>
                  {item.precision !== undefined && item.recall !== undefined && item.f1 !== undefined && (
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span>Prec: <strong>{item.precision.toFixed(2)}</strong></span>
                      <span>Rec: <strong className={item.recall < 0.25 ? 'text-rose-600 font-bold' : ''}>{item.recall.toFixed(2)}</strong></span>
                      <span>F1: <strong>{item.f1.toFixed(2)}</strong></span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600  leading-relaxed">
                  {item.definition}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50  border border-slate-200  space-y-2">
                    <div>
                      <span className="font-bold text-slate-700  block mb-1">
                        Representative Inbound Query:
                      </span>
                      <p className="italic text-slate-600 ">"{item.exampleCustomerMessage}"</p>
                    </div>
                    {item.sampleHistoricalResponse && (
                      <div>
                        <span className="font-bold text-slate-700  block mb-1">
                          Historical Amazon Precedent:
                        </span>
                        <p className="text-slate-600  text-[11px] font-mono">"{item.sampleHistoricalResponse}"</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50  border border-slate-200  space-y-2">
                    <div>
                      <span className="font-bold text-slate-700 ">Typical Handling:</span>
                      <p className="text-slate-600  mt-0.5">{item.typicalHandling}</p>
                    </div>
                    <div>
                      <span className="font-bold text-amber-700 ">Escalation Trigger:</span>
                      <p className="text-slate-600  mt-0.5">{item.potentialEscalation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Baseline Performance */}
        <section id="baseline-results" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Baseline Intent Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <span className="text-xs text-slate-500 uppercase font-semibold">Majority Baseline</span>
              <div className="text-2xl font-bold text-slate-900  mt-1">29.50%</div>
              <p className="text-xs text-slate-500 mt-1">Always predicting delivery_tracking on locked golden set</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <span className="text-xs text-slate-500 uppercase font-semibold">TF-IDF Dev Accuracy</span>
              <div className="text-2xl font-bold text-blue-600  mt-1">58.42%</div>
              <p className="text-xs text-slate-500 mt-1">5-fold cross-validation on development split</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <span className="text-xs text-slate-500 uppercase font-semibold">TF-IDF Golden Accuracy</span>
              <div className="text-2xl font-bold text-emerald-600  mt-1">54.00%</div>
              <p className="text-xs text-slate-500 mt-1">Locked 200-row held-out set (Macro F1: 0.5020)</p>
            </div>
          </div>
        </section>

        {/* Confusion Insights */}
        <section id="confusion-insights" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Confusion Matrix Vulnerabilities</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            Inspection of off-diagonal errors reveals two primary confusion pairs:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600  space-y-2 pl-2">
            <li>
              <strong>order_issue &harr; delivery_tracking:</strong> Inquiries like <em>"My package says delivered but I never received it"</em> share carrier tracking tokens but indicate a missing delivery dispute.
            </li>
            <li>
              <strong>account_access &rarr; order_issue:</strong> Inquiries like <em>"I can't sign in to check my recent order"</em> contain strong "order" tokens that overpower sparse "password" tokens in bag-of-words models. This justifies our Phase 10 deterministic regex safety override.
            </li>
          </ul>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/phases')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Phases
          </button>
          <button
            onClick={() => onNavigate('/docs/components/retrieval')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Retrieval (FAISS)</span>
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
