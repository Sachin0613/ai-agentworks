import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { SystemArchitectureDiagram, EscalationFlowDiagram } from '../components/Diagrams';
import { Cpu, Database, ShieldAlert, Sparkles, Filter, FileText, ArrowRight } from 'lucide-react';

interface ArchitectureViewProps {
  onNavigate: (path: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'overview', text: 'Architectural Overview' },
    { id: 'diagram', text: 'System Diagram' },
    { id: 'components', text: 'Component Breakdown (6 Modules)' },
    { id: 'module-1', text: '1. Text Preprocessing & Cleaning', level: 3 as const },
    { id: 'module-2', text: '2. Intent Classifier', level: 3 as const },
    { id: 'module-3', text: '3. Dense FAISS Retriever', level: 3 as const },
    { id: 'module-4', text: '4. Deterministic Escalation Policy', level: 3 as const },
    { id: 'module-5', text: '5. Grounded Reply Generator', level: 3 as const },
    { id: 'module-6', text: '6. Output Contract & Audit', level: 3 as const },
    { id: 'comparison-table', text: 'Component Specification Table' },
    { id: 'design-tradeoffs', text: 'Core Design Trade-offs' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Project' }, { label: 'System Architecture' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              System Architecture & Dataflow
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            The Hiver AI Customer Support Agent couples statistical intent classification and dense vector retrieval with a hardcoded deterministic safety layer, enforcing zero-tolerance policy guardrails before drafting customer replies.
          </p>
        </div>

        {/* Overview */}
        <section id="overview" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Architectural Philosophy</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            In enterprise customer support, unconstrained generative models present critical compliance liabilities: hallucinations of refund policies, unauthorized promises of compensation, and failure to identify account security breaches.
          </p>
          <p className="text-sm text-slate-600  leading-relaxed">
            To mitigate these risks, this architecture implements a <strong>Decoupled RAG + Deterministic Safety</strong> design:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="text-xs font-bold uppercase text-blue-600  mb-1">Principle 1</div>
              <div className="text-sm font-bold text-slate-900 ">Strict Separation of Concerns</div>
              <p className="text-xs text-slate-500  mt-1">
                Intent routing, historical knowledge retrieval, safety evaluation, and language generation are separate, independently testable stages.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="text-xs font-bold uppercase text-amber-600  mb-1">Principle 2</div>
              <div className="text-sm font-bold text-slate-900 ">Deterministic Safety Overrides</div>
              <p className="text-xs text-slate-500  mt-1">
                High-risk matters (security credentials, legal threats, billing fraud) bypass generative models entirely via hardcoded rules.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="text-xs font-bold uppercase text-emerald-600  mb-1">Principle 3</div>
              <div className="text-sm font-bold text-slate-900 ">Evidence-Grounded Generation</div>
              <p className="text-xs text-slate-500  mt-1">
                Generative drafting is permitted only on safe intents, conditioned strictly on retrieved historical AmazonHelp resolutions.
              </p>
            </div>
          </div>
        </section>

        {/* Diagram */}
        <section id="diagram">
          <h2 className="text-xl font-bold text-slate-900  mb-3">System Architecture Diagram</h2>
          <SystemArchitectureDiagram />
        </section>

        {/* Component Breakdown */}
        <section id="components" className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 ">Component Breakdown (6 Modules)</h2>

          {/* Module 1 */}
          <div id="module-1" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                1. Text Preprocessing & Cleaning (<code>src/data_processing.py</code>)
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Purpose:</strong> Normalize customer tweet noise while preserving emotional and safety signals.
            </p>
            <p className="text-xs text-slate-600 ">
              <strong>Dual Text Strategy:</strong> Creates two representations for every message: (1) <code>cleaned_text</code> with stripped @AmazonHelp handles and shortened URLs for clean bag-of-words tokenization, and (2) <code>raw_text</code> with verbatim casing and exclamation punctuation preserved for escalation sentiment checks.
            </p>
          </div>

          {/* Module 2 */}
          <div id="module-2" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                2. Intent Classifier (<code>src/classifiers/tfidf.py</code>)
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Purpose:</strong> Route incoming customer inquiries into the provisional 9-class AmazonHelp operational taxonomy.
            </p>
            <p className="text-xs text-slate-600 ">
              <strong>Technology:</strong> Word n-grams (1-2) and subword character n-grams (3-5) with TF-IDF vectorization, followed by multinomial Logistic Regression with balanced class weighting. Outputs predicted label and probability confidence.
            </p>
          </div>

          {/* Module 3 */}
          <div id="module-3" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                3. Dense FAISS Retriever (<code>src/retrieval/faiss_retriever.py</code>)
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Purpose:</strong> Surface historically verified customer inquiry / company reply pairs matching the customer's specific situation.
            </p>
            <p className="text-xs text-slate-600 ">
              <strong>Technology:</strong> Pre-trained <code>sentence-transformers/all-MiniLM-L6-v2</code> (384-dimensional dense vectors) indexed into FAISS <code>IndexFlatIP</code> with L2 normalization to compute exact cosine similarity scores. Operates exclusively over the dedicated 12,383 retrieval conversation split.
            </p>
          </div>

          {/* Module 4 */}
          <div id="module-4" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                4. Deterministic Escalation Policy (<code>src/escalation/rules.py</code>)
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Purpose:</strong> Act as an unbreakable safety governor routing hazardous inquiries to human operators before or after reply drafting.
            </p>
            <p className="text-xs text-slate-600 ">
              <strong>Rules:</strong> Flags account security tokens (<code>password</code>, <code>2FA</code>, <code>hacked</code>), legal threats (<code>attorney</code>, <code>court</code>, <code>sue</code>), unauthorized credit charges &gt;$100, and confidence drops (&lt;0.40).
            </p>
          </div>

          {/* Module 5 */}
          <div id="module-5" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                5. Grounded Reply Generator (<code>src/generation/reply_generator.py</code>)
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Purpose:</strong> Synthesize a professional, polite, and factually grounded response for safe (AUTO_HANDLE) interactions.
            </p>
            <p className="text-xs text-slate-600 ">
              <strong>Prompt Constraint:</strong> The model is given the customer message, predicted intent, and top-3 historical pairs labeled [0, 1, 2]. It is strictly instructed to cite evidence indices and never hallucinate external Amazon policies or fake URLs.
            </p>
          </div>

          {/* Module 6 */}
          <div id="module-6" className="p-5 rounded-xl border border-slate-200  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <h3 className="text-base font-bold text-slate-900 ">
                6. Structured Output Contract & Audit Log
              </h3>
            </div>
            <p className="text-xs text-slate-600 ">
              <strong>Output Schema:</strong> Standardized JSON containing: <code>decision</code>, <code>intent</code>, <code>confidence</code>, <code>reply</code>, <code>evidence_indices</code>, <code>escalation_reason</code>, and <code>unsupported_claim_notes</code>.
            </p>
          </div>
        </section>

        {/* Component Specification Table */}
        <section id="comparison-table" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Component Specification Matrix</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 ">
            <table className="min-w-full divide-y divide-slate-200  text-xs">
              <thead className="bg-slate-50 ">
                <tr className="text-left font-bold text-slate-700  uppercase tracking-wider">
                  <th className="p-3">Component</th>
                  <th className="p-3">Input</th>
                  <th className="p-3">Output</th>
                  <th className="p-3">Technology</th>
                  <th className="p-3">Primary Failure Mode</th>
                  <th className="p-3">Source File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200  bg-white  text-slate-600 ">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">Preprocessing</td>
                  <td className="p-3 font-mono">raw tweet string</td>
                  <td className="p-3 font-mono">raw_text, cleaned_text</td>
                  <td className="p-3">Regex & Python</td>
                  <td className="p-3">Over-stripping domain abbreviations</td>
                  <td className="p-3 font-mono">src/data_processing.py</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">Intent Classifier</td>
                  <td className="p-3 font-mono">cleaned_text</td>
                  <td className="p-3 font-mono">intent, confidence (0-1)</td>
                  <td className="p-3">TF-IDF + Logistic Regression</td>
                  <td className="p-3">Rare class collapse (account_access recall 4.76%)</td>
                  <td className="p-3 font-mono">src/classifiers/tfidf.py</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">Retriever</td>
                  <td className="p-3 font-mono">customer query</td>
                  <td className="p-3 font-mono">Top-k historical pairs + scores</td>
                  <td className="p-3">all-MiniLM-L6-v2 + FAISS IP</td>
                  <td className="p-3">Out-of-domain queries matching high cosine noise</td>
                  <td className="p-3 font-mono">src/retrieval/faiss_retriever.py</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">Escalation Engine</td>
                  <td className="p-3 font-mono">query, intent, conf, scores</td>
                  <td className="p-3 font-mono">decision, reason code</td>
                  <td className="p-3">Deterministic rule cascade</td>
                  <td className="p-3">False escalations on benign anger phrasing</td>
                  <td className="p-3 font-mono">src/escalation/rules.py</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">Reply Generator</td>
                  <td className="p-3 font-mono">query + intent + evidence</td>
                  <td className="p-3 font-mono">structured JSON reply contract</td>
                  <td className="p-3">Generative LLM (RAG)</td>
                  <td className="p-3">Synthesizing dead URLs or unsupported timelines</td>
                  <td className="p-3 font-mono">src/generation/reply_generator.py</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Escalation Flowchart */}
        <section id="design-tradeoffs" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Deterministic Escalation Cascade</h2>
          <p className="text-sm text-slate-600 ">
            Escalation is treated as a first-class safety feature rather than an agent defect. The deterministic rules execute sequentially:
          </p>
          <EscalationFlowDiagram />
        </section>

        {/* Next navigation */}
        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/getting-started')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Getting Started
          </button>
          <button
            onClick={() => onNavigate('/docs/data')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Dataset & Processing</span>
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
