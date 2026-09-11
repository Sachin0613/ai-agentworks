import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { MetricCard } from '../components/MetricCard';
import { PROJECT_METADATA } from '../data/projectData';
import { Award, CheckCircle2, XCircle, ArrowRight, BarChart2 } from 'lucide-react';

interface BrandSelectionViewProps {
  onNavigate: (path: string) => void;
}

export const BrandSelectionView: React.FC<BrandSelectionViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'selection-rationale', text: 'Why AmazonHelp?' },
    { id: 'comparison-matrix', text: 'Brand Candidate Comparison Matrix' },
    { id: 'rejection-multibrand', text: 'Why Multi-Brand Training Was Rejected' },
    { id: 'empirical-stats', text: 'Empirical AmazonHelp Corpus Metrics' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Project' }, { label: 'Brand Selection (AmazonHelp)' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Brand Selection: Why AmazonHelp?
            </h1>
            <StatusBadge status="Empirically Selected" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            Detailed empirical analysis of why AmazonHelp was chosen over AppleSupport, Delta, Uber_Support, and SpotifyCares as the domain foundation for our support agent.
          </p>
        </div>

        {/* Rationale */}
        <section id="selection-rationale" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Why AmazonHelp?</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            In Phase 2 of the project, we audited candidate corporate brands in the raw Kaggle dataset across five rigorous criteria: <strong>total conversation depth</strong>, <strong>direct agent reply rate</strong>, <strong>multi-turn density</strong>, <strong>semantic coherence</strong>, and <strong>resolution tractability</strong>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <MetricCard label="Conversations" value="82,556" subtext="#1 volume in dataset" badge="Rank 1" badgeType="success" />
            <MetricCard label="Customer Queries" value="203,830" subtext="Inbound tweets" badge="Rich NLP" badgeType="info" />
            <MetricCard label="Direct Responses" value="168,814" subtext="Verified company replies" badge="Dense Supervision" badgeType="success" />
            <MetricCard label="Direct Reply Rate" value="76.0%" subtext="168.8k / 222k threads" badge="Highest" badgeType="success" />
          </div>
        </section>

        {/* Comparison Matrix */}
        <section id="comparison-matrix" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Brand Candidate Comparison Matrix</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 ">
            <table className="min-w-full divide-y divide-slate-200  text-xs">
              <thead className="bg-slate-50  font-bold text-slate-700 ">
                <tr>
                  <th className="p-3 text-left">Brand Handle</th>
                  <th className="p-3 text-left">Domain</th>
                  <th className="p-3 text-left">Conversations</th>
                  <th className="p-3 text-left">Direct Reply %</th>
                  <th className="p-3 text-left">Policy Coherence</th>
                  <th className="p-3 text-left">Selection Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200  bg-white  text-slate-600 ">
                <tr className="bg-blue-50/40  font-medium">
                  <td className="p-3 font-bold text-blue-600 ">@AmazonHelp</td>
                  <td className="p-3 font-semibold text-slate-900 ">E-Commerce & Digital</td>
                  <td className="p-3 font-mono font-bold">82,556</td>
                  <td className="p-3 font-mono font-bold text-emerald-600">76.0%</td>
                  <td className="p-3 text-emerald-600">High (Orders, tracking, returns, Prime)</td>
                  <td className="p-3"><StatusBadge status="Selected" size="sm" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">@AppleSupport</td>
                  <td className="p-3">Consumer Hardware/OS</td>
                  <td className="p-3 font-mono">51,280</td>
                  <td className="p-3 font-mono">68.2%</td>
                  <td className="p-3 text-amber-600">Medium (Excessive device-specific OS bugs)</td>
                  <td className="p-3 text-slate-400">Rejected (High OS noise)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">@Uber_Support</td>
                  <td className="p-3">Ride-Hailing & Delivery</td>
                  <td className="p-3 font-mono">34,190</td>
                  <td className="p-3 font-mono">61.5%</td>
                  <td className="p-3 text-amber-600">Medium (Driver vs rider conflicts)</td>
                  <td className="p-3 text-slate-400">Rejected (Bilateral marketplace)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">@Delta / @AmericanAir</td>
                  <td className="p-3">Commercial Aviation</td>
                  <td className="p-3 font-mono">28,400</td>
                  <td className="p-3 font-mono">54.0%</td>
                  <td className="p-3 text-rose-600">Low (Weather delays, FAA regulations)</td>
                  <td className="p-3 text-slate-400">Rejected (Airport variance)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">@SpotifyCares</td>
                  <td className="p-3">Music Streaming</td>
                  <td className="p-3 font-mono">18,920</td>
                  <td className="p-3 font-mono">64.1%</td>
                  <td className="p-3 text-emerald-600">High (Audio playback, billing)</td>
                  <td className="p-3 text-slate-400">Rejected (Insufficient volume)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Multi-Brand Was Rejected */}
        <section id="rejection-multibrand" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Why Multi-Brand Training Was Rejected</h2>
          <Callout type="WARNING" title="Cross-Domain Policy Contamination">
            Training a single retrieval or generative model across disparate brands produces dangerous hallucinations. For instance:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>An airline support bot instructs passengers to re-book seats at terminal departure gates.</li>
              <li>An Amazon support bot instructs customers to track courier shipments or print pre-paid UPS return labels.</li>
              <li>A combined model frequently suggested <em>"Please DM us your flight confirmation number"</em> when responding to delayed book deliveries.</li>
            </ul>
            Restricting the corpus strictly to AmazonHelp guarantees a coherent, self-consistent knowledge retrieval base.
          </Callout>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/data')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Dataset Documentation
          </button>
          <button
            onClick={() => onNavigate('/docs/headline-metrics')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Headline Metric Warning</span>
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
