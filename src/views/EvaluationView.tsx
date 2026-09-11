import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { MetricCard } from '../components/MetricCard';
import { BASELINE_METRICS, FAILURE_MODES } from '../data/projectData';
import { BarChart3, Scale, Users, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface EvaluationViewProps {
  subPage?: 'overview' | 'baselines' | 'llm-judge' | 'human-agreement' | 'golden-set' | 'failure-analysis';
  onNavigate: (path: string) => void;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({ subPage = 'overview', onNavigate }) => {
  const tocItems = [
    { id: 'eval-architecture', text: 'Three-Tier Evaluation System' },
    { id: 'golden-set-stats', text: 'Locked Golden Set Statistics' },
    { id: 'baseline-comparison', text: 'Baseline Comparison (Dev vs Golden)' },
    { id: 'llm-judge-rubric', text: 'LLM-as-a-Judge Evaluation Rubric' },
    { id: 'human-agreement', text: 'Human Agreement Evaluation Harness' },
    { id: 'failure-analysis', text: 'Empirical Failure Analysis' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Evaluation & Benchmarks' }, { label: 'Comprehensive Evaluation' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Evaluation Framework & Baselines
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            A three-tier evaluation methodology combining classical statistical baselines, deterministic safety audits, and calibrated LLM-as-a-judge rubrics over a locked 200-row golden set.
          </p>
        </div>

        {/* Evaluation Architecture */}
        <section id="eval-architecture" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 ">Three-Tier Evaluation System</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-blue-600 ">Tier 1</span>
                <StatusBadge status="Implemented" size="sm" />
              </div>
              <div className="text-sm font-bold text-slate-900 ">Statistical Baselines</div>
              <p className="text-xs text-slate-500 ">
                Majority Class & TF-IDF Logistic Regression evaluated on Dev (5-fold CV) and the locked Golden Set.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-indigo-600 ">Tier 2</span>
                <StatusBadge status="Pending" size="sm" />
              </div>
              <div className="text-sm font-bold text-slate-900 ">LLM-as-a-Judge</div>
              <p className="text-xs text-slate-500 ">
                Automated 1–5 scoring on Relevance, Groundedness, Helpfulness, Tone, and Unsupported Claims.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-purple-600 ">Tier 3</span>
                <StatusBadge status="Pending" size="sm" />
              </div>
              <div className="text-sm font-bold text-slate-900 ">Human Calibration</div>
              <p className="text-xs text-slate-500 ">
                40–50 independent double-blind human ratings measuring Spearman correlation and exact agreement.
              </p>
            </div>
          </div>
        </section>

        {/* Golden Set Statistics */}
        <section id="golden-set-stats" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Locked Golden Set (200 Rows)</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            The held-out golden benchmark was extracted from the 12,384-conversation Golden Pool. It contains <strong>200 audited rows with zero missing labels</strong>:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard label="Total Audit Rows" value="200" subtext="Strictly held-out" />
            <MetricCard label="AUTO_HANDLE" value="165" subtext="82.5% safe automation" />
            <MetricCard label="ESCALATE" value="35" subtext="17.5% safety handoff" />
            <MetricCard label="Missing Labels" value="0.0%" subtext="100% verified ground truth" badge="Audited" badgeType="success" />
          </div>
        </section>

        {/* Baseline Comparison */}
        <section id="baseline-comparison" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 ">Baseline Comparison Matrix</h2>
          <p className="text-sm text-slate-600 ">
            Comparing trivial Majority Class baseline against TF-IDF on development cross-validation vs locked golden evaluation:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 ">
            <table className="min-w-full divide-y divide-slate-200  text-xs">
              <thead className="bg-slate-50  font-bold text-slate-700 ">
                <tr>
                  <th className="p-3 text-left">Model / Method</th>
                  <th className="p-3 text-left">Evaluation Split</th>
                  <th className="p-3 text-left">Accuracy</th>
                  <th className="p-3 text-left">Macro F1</th>
                  <th className="p-3 text-left">Escalation F1</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200  bg-white  font-mono text-slate-600 ">
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">Majority Class (delivery_tracking)</td>
                  <td className="p-3 font-sans">Locked Golden Set</td>
                  <td className="p-3">29.50%</td>
                  <td className="p-3">0.0506</td>
                  <td className="p-3">0.0000</td>
                  <td className="p-3"><StatusBadge status="Implemented" size="sm" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">TF-IDF (Word+Char n-grams)</td>
                  <td className="p-3 font-sans">Dev (5-Fold CV)</td>
                  <td className="p-3 text-blue-600  font-bold">58.42%</td>
                  <td className="p-3">0.5412</td>
                  <td className="p-3">N/A</td>
                  <td className="p-3"><StatusBadge status="Implemented" size="sm" /></td>
                </tr>
                <tr className="bg-slate-50/50 ">
                  <td className="p-3 font-bold text-slate-900  font-sans">TF-IDF + Deterministic Rules</td>
                  <td className="p-3 font-sans">Locked Golden Set</td>
                  <td className="p-3 text-emerald-600  font-bold">54.00%</td>
                  <td className="p-3 font-bold">0.5020</td>
                  <td className="p-3 font-bold text-emerald-600">0.8235</td>
                  <td className="p-3"><StatusBadge status="Implemented" size="sm" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* LLM-as-a-Judge Rubric */}
        <section id="llm-judge-rubric" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 ">LLM-as-a-Judge Evaluation Rubric</h2>
            <StatusBadge status="Pending empirical evaluation" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            To evaluate reply generation quality beyond word overlap (BLEU/ROUGE), the agent specifies a 5-criterion, 1–5 numerical grading rubric implemented via structured prompting:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white  space-y-1">
              <span className="font-bold text-blue-600 ">1. Relevance (1–5)</span>
              <p className="text-slate-600 ">
                Does the reply directly address the customer's specific inquiry without evading the question?
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white  space-y-1">
              <span className="font-bold text-cyan-600 ">2. Groundedness (1–5)</span>
              <p className="text-slate-600 ">
                Is every stated instruction or policy directly derived from the retrieved historical precedents?
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white  space-y-1">
              <span className="font-bold text-indigo-600 ">3. Helpfulness (1–5)</span>
              <p className="text-slate-600 ">
                Does the reply provide an actionable resolution or step-by-step guidance rather than generic filler?
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white  space-y-1">
              <span className="font-bold text-purple-600 ">4. Tone & Professionalism (1–5)</span>
              <p className="text-slate-600 ">
                Is the tone polite, calm, and brand-appropriate, especially when de-escalating customer frustration?
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white  space-y-1 sm:col-span-2">
              <span className="font-bold text-rose-600 ">5. Unsupported Claims Penalization</span>
              <p className="text-slate-600 ">
                Binary flag (0 or 1). Triggers if the reply invents carrier phone numbers, guarantees delivery dates not in evidence, or promises unapproved financial compensation.
              </p>
            </div>
          </div>
        </section>

        {/* Human Agreement Harness */}
        <section id="human-agreement" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 ">Human Agreement Evaluation Harness</h2>
            <StatusBadge status="Pending empirical evaluation" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            An automated LLM judge cannot be trusted in high-stakes settings until calibrated against human judgment. The evaluation harness specifies:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600  space-y-1.5 pl-2">
            <li><strong>Sample Size:</strong> 40–50 randomly sampled responses from the golden set evaluation.</li>
            <li><strong>Exact Agreement Rate:</strong> Percentage of ratings where human and LLM judge assign the identical integer score.</li>
            <li><strong>Within-One-Point Agreement:</strong> Percentage where scores differ by at most &plusmn;1 point (Target &ge; 85%).</li>
            <li><strong>Mean Absolute Difference (MAD):</strong> Average absolute difference between human and LLM judge.</li>
            <li><strong>Spearman Rank Correlation:</strong> Rank correlation coefficient measuring score ordering alignment.</li>
          </ul>
        </section>

        {/* Empirical Failure Analysis */}
        <section id="failure-analysis" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Empirical Failure Analysis</h2>
          <p className="text-sm text-slate-600 ">
            Real failure cases audited from the locked golden set:
          </p>
          <div className="space-y-3">
            {FAILURE_MODES.map((fc, i) => (
              <div key={fc.id || i} className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-600  font-mono">
                    [{fc.id}] {fc.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-400">Baseline: <span className="text-rose-500 font-bold">{fc.baselinePrediction}</span></span>
                    <span className="text-slate-400">Ground Truth: <span className="text-emerald-500 font-bold">{fc.groundTruth}</span></span>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50  font-mono text-xs text-slate-700  italic">
                  "{fc.exampleCustomerMessage}"
                </div>
                <div className="text-xs space-y-1">
                  <p><strong className="text-slate-700 ">Root Cause / Why It Failed:</strong> {fc.whyItFailed}</p>
                  <p><strong className="text-slate-700 ">Hypothesis:</strong> {fc.hypothesis}</p>
                  <p><strong className="text-blue-600 ">Proposed Engineering Fix:</strong> {fc.proposedFix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/components/escalation')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Escalation Policy
          </button>
          <button
            onClick={() => onNavigate('/docs/reference/decision-log')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Engineering Decision Log</span>
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
