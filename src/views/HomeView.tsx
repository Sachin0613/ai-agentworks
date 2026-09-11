import React from 'react';
import {
  ArrowRight,
  ShieldAlert,
  Cpu,
  Database,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Terminal,
  FileCode,
  Layers,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { MetricCard } from '../components/MetricCard';
import { Callout } from '../components/Callout';
import { StatusBadge } from '../components/StatusBadge';
import { SystemArchitectureDiagram } from '../components/Diagrams';
import { InteractiveAgentSimulator } from '../components/InteractiveAgentSimulator';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="pt-2 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
          <span>Hiver SDE Intern Take-Home Project Documentation</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          AI Customer Support Agent
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          An explainable, production-grounded AI customer-support agent for Amazon customer service. It classifies customer intent across a provisional 9-class taxonomy, retrieves historically verified support precedents via dense FAISS embeddings, drafts grounded replies, and enforces a deterministic safety escalation guardrail.
        </p>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('/docs/getting-started')}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <Layers className="h-4 w-4 text-indigo-500" />
            <span>Architecture</span>
          </button>

          <button
            onClick={() => onNavigate('/docs/developer/run-agent')}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <Terminal className="h-4 w-4 text-emerald-600" />
            <span>Run the Agent</span>
          </button>

          <button
            onClick={() => onNavigate('/docs/evaluation/overview')}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <BarChart2 className="h-4 w-4 text-amber-600" />
            <span>Evaluation</span>
          </button>
        </div>
      </section>

      {/* Headline Metric Warning Callout */}
      <section>
        <Callout type="WARNING" title="Critical Note: Headline Metric & Scope Boundary">
          <div className="space-y-2">
            <p>
              <strong>TF-IDF Golden Set Accuracy is <span className="text-amber-600 font-bold">54.00%</span> (Macro F1: <span className="text-amber-600 font-mono font-bold">0.5020</span>).</strong> This is strictly an <em>intent-only baseline</em> evaluated on the locked 200-row held-out golden set.
            </p>
            <p>
              <strong>Do NOT mistake this for end-to-end agent performance or reply quality.</strong> A single aggregate accuracy score hides critical vulnerabilities—such as our empirical finding that TF-IDF achieved only <strong className="text-rose-600">4.76% recall on account_access</strong>. End-to-end evaluation with LLM judge and human ratings remains labeled as <span className="text-blue-600 font-semibold underline">Pending empirical evaluation</span>.
            </p>
            <button
              onClick={() => onNavigate('/docs/headline-metrics')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 underline mt-1 cursor-pointer"
            >
              <span>Read the full analysis: "What is misleading about my headline number?"</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </Callout>
      </section>

      {/* Project Status Overview Panel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-black tracking-tight">
            Verified Project Status (Phases 1–20)
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            Current Phase: Phase 20 (Submission Readiness)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Data Pipeline
            </span>
            <StatusBadge status="Implemented" size="sm" />
            <span className="text-[11px] text-blue-600 font-bold block mt-1.5 font-mono">
              82.5k Amazon Convos
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Brand Selection
            </span>
            <StatusBadge status="Implemented" size="sm" />
            <span className="text-[11px] text-emerald-600 font-bold block mt-1.5 font-mono">
              76.0% Reply Rate
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Baselines
            </span>
            <StatusBadge status="Implemented" size="sm" />
            <span className="text-[11px] text-amber-600 font-bold block mt-1.5 font-mono">
              TF-IDF (54.0% Acc)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Golden Set
            </span>
            <StatusBadge status="Implemented" size="sm" />
            <span className="text-[11px] text-purple-600 font-bold block mt-1.5 font-mono">
              200 Locked Rows
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Retrieval (FAISS)
            </span>
            <StatusBadge status="Partial" size="sm" />
            <span className="text-[11px] text-cyan-600 font-bold block mt-1.5 font-mono">
              Verify / Batching
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-neutral-200 bg-white">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              LLM Judge & Human
            </span>
            <StatusBadge status="Pending" size="sm" />
            <span className="text-[11px] text-rose-600 font-bold block mt-1.5 font-mono">
              Awaiting Annotations
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section>
        <InteractiveAgentSimulator />
      </section>

      {/* Visual System Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Visual Agent Architecture
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Deterministic flow from customer tweet to grounded resolution or human escalation
            </p>
          </div>
          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Full Specs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <SystemArchitectureDiagram />
      </section>

      {/* Core Architectural Pillars */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-black tracking-tight">
          Six Architectural Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('/docs/components/intent-classification')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>1. Intent Classification</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Provisional 9-class AmazonHelp taxonomy covering tracking, returns, billing, Prime, account security, and seller issues.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('/docs/components/retrieval')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>2. Historical Case Retrieval</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-cyan-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Dense semantic memory using Sentence Transformers <code className="text-cyan-600 font-mono">all-MiniLM-L6-v2</code> and FAISS inner-product cosine similarity over dedicated split.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('/docs/components/reply-generation')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>3. Grounded Reply Drafting</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-indigo-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Strictly constrained JSON generation requiring evidence index citation. Zero policy hallucination; flags unsupported claims explicitly.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate('/docs/components/escalation')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>4. Deterministic Escalation</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-amber-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Hardcoded safety override for legal threats, security credentials, financial disputes, and low model confidence (&lt;0.40).
            </p>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => onNavigate('/docs/evaluation/overview')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>5. Multi-Stage Evaluation</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Locked 200-row golden set, baseline benchmarking, and planned LLM-as-judge calibrated against 40–50 human ratings.
            </p>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => onNavigate('/docs/developer/reproducibility')}
            className="p-5 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group shadow-xs"
          >
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Terminal className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-black flex items-center justify-between">
              <span>6. 100% Local Reproducibility</span>
              <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-purple-600 transition-colors" />
            </h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Tested on Python 3.12. All data inspection, cleaning, TF-IDF training, FAISS indexing, and 43 unit tests run completely offline.
            </p>
          </div>
        </div>
      </section>

      {/* Key Local Corpus Metrics */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-black tracking-tight">
          Empirical AmazonHelp Corpus Metrics
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard
            label="Selected Brand"
            value="AmazonHelp"
            subtext="Highest volume & direct response rate in raw 2.8M tweet corpus"
            badge="Empirical"
            badgeType="info"
          />
          <MetricCard
            label="Conversations"
            value="82,556"
            subtext="Reconstructed via in_response_to_tweet_id thread pointers"
            badge="Isolated"
            badgeType="default"
          />
          <MetricCard
            label="Customer Inquiries"
            value="203,830"
            subtext="Raw customer support messages mapped to thread IDs"
            badge="Verified"
            badgeType="success"
          />
          <MetricCard
            label="Direct Response Rate"
            value="76.0%"
            subtext="168,814 direct customer-to-company response pairs"
            badge="High Quality"
            badgeType="success"
          />
        </div>
      </section>
    </div>
  );
};
