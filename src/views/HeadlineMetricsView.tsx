import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { MetricCard } from '../components/MetricCard';
import { AlertTriangle, ShieldAlert, BarChart3, TrendingDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeadlineMetricsViewProps {
  onNavigate: (path: string) => void;
}

export const HeadlineMetricsView: React.FC<HeadlineMetricsViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'question', text: 'What is Misleading About My Headline Number?' },
    { id: 'deceptive-aggregate', text: 'The Deception of Aggregate Accuracy' },
    { id: 'class-breakdown', text: 'Empirical Vulnerability Breakdown' },
    { id: 'false-autohandle', text: 'The Danger of False Auto-Handling' },
    { id: 'better-metrics', text: 'What Better Evidence Looks Like' },
    { id: 'takeaway', text: 'Takeaway: Production Readiness Truth' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Evaluation' }, { label: 'Headline Metric Warning' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-black  tracking-tight">
              Headline Metric Warning & Limitations
            </h1>
            <StatusBadge status="Crucial" />
          </div>
          <p className="text-sm text-neutral-600  leading-relaxed">
            A transparent critique of headline accuracy metrics, explaining why 54.0% golden accuracy must never be confused with end-to-end agent capability.
          </p>
        </div>

        {/* Central Question */}
        <section id="question" className="space-y-4">
          <div className="p-6 rounded-2xl border border-amber-300  bg-white  shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600  mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Mandatory Evaluator Reflection</span>
            </div>
            <h2 className="text-2xl font-black text-black  tracking-tight">
              "What is misleading about my headline number?"
            </h2>
            <p className="mt-3 text-sm text-neutral-700  leading-relaxed font-medium">
              If an engineer reports: <em>"Our support AI achieved 54.0% accuracy on the golden evaluation benchmark,"</em> what critical risks does that single number conceal?
            </p>
          </div>

          <Callout type="WARNING" title="Scope Boundary: Intent-Only Baseline vs End-to-End Agent">
            <p>
              The <strong>54.00% accuracy</strong> achieved on the locked 200-row golden set was produced by a classical <strong>TF-IDF + Logistic Regression intent classifier</strong>.
            </p>
            <p className="mt-1">
              It is <strong>NOT</strong> end-to-end support resolution accuracy. It does not measure whether the generated reply was polite, factually grounded, legally compliant, or helpful. Calling 54% "the agent's accuracy" is a fundamental category error.
            </p>
          </Callout>
        </section>

        {/* The Deception of Aggregate Accuracy */}
        <section id="deceptive-aggregate" className="space-y-4">
          <h2 className="text-xl font-bold text-black ">
            1. The Deception of Aggregate Accuracy
          </h2>
          <p className="text-sm text-neutral-600  leading-relaxed">
            In multi-class customer support systems, simple accuracy is a dangerous vanity metric that hides severe operational pathologies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-200  bg-white  space-y-1.5">
              <span className="text-xs font-bold uppercase text-rose-600 ">Blindspot 1</span>
              <div className="text-sm font-bold text-black ">Class Imbalance Skew</div>
              <p className="text-xs text-neutral-600 ">
                A model can perform reasonably well on frequent intents (e.g. <code>delivery_tracking</code> at 74% recall) while totally collapsing on rare, high-stakes intents.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200  bg-white  space-y-1.5">
              <span className="text-xs font-bold uppercase text-rose-600 ">Blindspot 2</span>
              <div className="text-sm font-bold text-black ">Severity Asymmetry</div>
              <p className="text-xs text-neutral-600 ">
                Misclassifying a shipping delay inquiry as a general question delays a package by 2 hours. Misclassifying an account compromise as routine self-service allows unauthorized account takeover.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200  bg-white  space-y-1.5">
              <span className="text-xs font-bold uppercase text-rose-600 ">Blindspot 3</span>
              <div className="text-sm font-bold text-black ">Label Ambiguity in Twitter Data</div>
              <p className="text-xs text-neutral-600 ">
                Customer tweets frequently contain multiple overlapping intents: <em>"My book arrived torn, can I return it or get a replacement shipped?"</em> Single-label benchmarks penalize valid predictions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200  bg-white  space-y-1.5">
              <span className="text-xs font-bold uppercase text-rose-600 ">Blindspot 4</span>
              <div className="text-sm font-bold text-black ">Temporal & Promotional Shifts</div>
              <p className="text-xs text-neutral-600 ">
                Vocabulary changes during Prime Day, Black Friday, or holiday carrier disruptions. Accuracy measured on October data degrades when promo codes or logistics change.
              </p>
            </div>
          </div>
        </section>

        {/* Empirical Vulnerability Breakdown */}
        <section id="class-breakdown" className="space-y-4">
          <h2 className="text-xl font-bold text-black ">
            2. Empirical Vulnerability Breakdown from Our TF-IDF Model
          </h2>
          <p className="text-sm text-neutral-600  leading-relaxed">
            Our audit of the locked 200-row golden set unmasked severe per-intent recall disparities:
          </p>

          <div className="overflow-x-auto rounded-xl border border-neutral-200  bg-white ">
            <table className="min-w-full divide-y divide-neutral-200  text-xs">
              <thead className="bg-neutral-50  font-bold text-black ">
                <tr>
                  <th className="p-3 text-left">Intent Category</th>
                  <th className="p-3 text-left">TF-IDF Precision</th>
                  <th className="p-3 text-left">TF-IDF Recall</th>
                  <th className="p-3 text-left">F1 Score</th>
                  <th className="p-3 text-left">Vulnerability Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200  bg-white  text-neutral-700 ">
                <tr>
                  <td className="p-3 font-semibold text-black ">delivery_tracking</td>
                  <td className="p-3 font-mono">0.68</td>
                  <td className="p-3 font-bold font-mono text-emerald-600 ">0.74</td>
                  <td className="p-3 font-mono">0.71</td>
                  <td className="p-3 text-emerald-600  font-medium">High frequency; clear keywords (carrier, tracking, transit)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-black ">prime_membership</td>
                  <td className="p-3 font-mono">0.72</td>
                  <td className="p-3 font-bold font-mono text-emerald-600 ">0.66</td>
                  <td className="p-3 font-mono">0.69</td>
                  <td className="p-3 text-emerald-600  font-medium">Distinctive token vocabulary (Prime, annual renewal)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-black ">returns_refunds</td>
                  <td className="p-3 font-mono">0.65</td>
                  <td className="p-3 font-bold font-mono text-emerald-600 ">0.69</td>
                  <td className="p-3 font-mono">0.67</td>
                  <td className="p-3 text-emerald-600  font-medium">Well-represented self-service action patterns</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-600 ">product_or_listing</td>
                  <td className="p-3 font-mono">0.44</td>
                  <td className="p-3 font-extrabold font-mono text-rose-600 ">0.2083 (20.8%)</td>
                  <td className="p-3 font-mono">0.28</td>
                  <td className="p-3 text-rose-600  font-semibold">Severe weakness: diverse product terms confuse classifier</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-600 ">account_access</td>
                  <td className="p-3 font-mono">0.33</td>
                  <td className="p-3 font-extrabold font-mono text-rose-600 ">0.0476 (4.76%)</td>
                  <td className="p-3 font-mono">0.08</td>
                  <td className="p-3 text-rose-600  font-bold">Catastrophic failure: misses 95.2% of locked/2FA queries</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Callout type="IMPORTANT" title="Why 4.76% account_access Recall Is Catastrophic">
            If this model were deployed in production without safety guards, <strong>95.2% of account lockout, password compromise, and 2FA bypass requests</strong> would be misclassified into other intents (such as <code>order_issue</code>) and handled automatically by an AI bot that has no authority or security clearance to touch credentials.
            <br />
            <strong>How our architecture fixes this:</strong> In Phase 10, we introduced hardcoded deterministic escalation regex rules (checking for <code>password</code>, <code>2FA</code>, <code>OTP</code>, <code>hacked</code>) that trigger <code>ESCALATE</code> regardless of what the classifier predicts.
          </Callout>
        </section>

        {/* The Danger of False Auto-Handling */}
        <section id="false-autohandle" className="space-y-3">
          <h2 className="text-xl font-bold text-black ">
            3. The Critical Safety Metric: False Auto-Handling Rate
          </h2>
          <p className="text-sm text-neutral-600  leading-relaxed">
            In support AI evaluation, there are two distinct types of errors:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
              <span className="text-xs font-bold uppercase text-amber-600 ">False Escalation (Type I)</span>
              <p className="text-xs text-neutral-600  mt-1">
                The agent unnecessarily routes a routine package tracking query to a human agent.
                <br />
                <strong className="text-black ">Cost:</strong> Marginal human labor cost (~$2–$5).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
              <span className="text-xs font-bold uppercase text-rose-600 ">False Auto-Handling (Type II)</span>
              <p className="text-xs text-neutral-600  mt-1">
                The agent attempts to self-handle an account compromise or legal threat with automated canned text.
                <br />
                <strong className="text-black ">Cost:</strong> Regulatory lawsuits, account theft, churn, brand disaster.
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-600 ">
            Therefore, <strong>minimizing the False Auto-Handling Rate to 0.0%</strong> on security and legal intents is vastly more important than pushing overall accuracy from 54% to 60%.
          </p>
        </section>

        {/* What Better Evidence Looks Like */}
        <section id="better-metrics" className="space-y-3">
          <h2 className="text-xl font-bold text-black ">
            4. What Better Scientific Evidence Looks Like
          </h2>
          <p className="text-sm text-neutral-600 ">
            Instead of relying solely on headline accuracy, a production-grade evaluation portfolio must report:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-blue-600 ">1. Macro F1 & Per-Intent Recall:</strong> <span className="text-neutral-600 ">Measures whether rare intents (account_access, product_or_listing) perform reliably.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-rose-600 ">2. False Auto-Handling Rate:</strong> <span className="text-neutral-600 ">Percentage of high-risk queries erroneously handled autonomously.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-emerald-600 ">3. Escalation Recall:</strong> <span className="text-neutral-600 ">Percentage of true escalation scenarios correctly handed to human specialists.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-cyan-600 ">4. Groundedness & Unsupported Claims:</strong> <span className="text-neutral-600 ">Degree to which generated draft replies quote verified historical evidence without hallucinating fake policies.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-purple-600 ">5. Human-Judge Agreement Correlation:</strong> <span className="text-neutral-600 ">Spearman correlation and within-1-point agreement between LLM judge scores and human evaluators.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-neutral-200  bg-white  text-xs text-black ">
              <strong className="text-amber-600 ">6. Granular Failure Case Audit:</strong> <span className="text-neutral-600 ">Concrete inspections of misclassified examples with root cause hypotheses.</span>
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-neutral-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/brand-selection')}
            className="text-xs font-semibold text-neutral-600  hover:text-black :text-white cursor-pointer"
          >
            &larr; Brand Selection
          </button>
          <button
            onClick={() => onNavigate('/docs/phases')}
            className="flex items-center gap-1.5 text-xs font-bold text-black  hover:underline cursor-pointer"
          >
            <span>Next: Phase-by-Phase Documentation (1–20)</span>
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
