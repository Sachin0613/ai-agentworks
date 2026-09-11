import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { PHASES_DATA } from '../data/projectData';
import { PhaseInfo } from '../types';
import {
  FileCode,
  ArrowRight,
  Terminal,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

interface PhasesViewProps {
  phaseId?: string; // If specified, renders single phase detail
  onNavigate: (path: string) => void;
}

export const PhasesView: React.FC<PhasesViewProps> = ({ phaseId, onNavigate }) => {
  // If phaseId is provided, find that specific phase
  const selectedPhase = phaseId
    ? PHASES_DATA.find((p) => p.phaseNumber.toString() === phaseId || p.id === phaseId)
    : null;

  if (selectedPhase) {
    return <SinglePhaseDetail phase={selectedPhase} onNavigate={onNavigate} />;
  }

  // Otherwise render All Phases Directory
  const tocItems = [
    { id: 'phases-directory', text: 'All Phases Directory (1–20)' },
    { id: 'phases-foundation', text: 'Phases 1–5: Foundation & Data' },
    { id: 'phases-baselines', text: 'Phases 6–8: Baselines & Retrieval' },
    { id: 'phases-agent', text: 'Phases 9–11: Agent & Escalation' },
    { id: 'phases-eval', text: 'Phases 12–16: Evaluation & Weaknesses' },
    { id: 'phases-final', text: 'Phases 17–20: Report, Decisions & Submission' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Phases' }, { label: 'All Phases Overview (1–20)' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Phase-by-Phase Roadmap (1–20)
            </h1>
            <StatusBadge status="Phase 20 Complete" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            Detailed engineering documentation for every individual phase of the Hiver support agent take-home assignment, from raw tweet inspection to final submission readiness.
          </p>
        </div>

        {/* Directory Grid */}
        <section id="phases-directory" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PHASES_DATA.map((phase) => (
              <div
                key={phase.id}
                onClick={() => onNavigate(`/docs/phases/${phase.phaseNumber}`)}
                className="p-5 rounded-2xl border border-slate-200  bg-white  hover:border-blue-400 :border-blue-600 transition-all cursor-pointer group shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 ">
                    Phase {phase.phaseNumber}
                  </span>
                  <StatusBadge status={phase.status} size="sm" />
                </div>
                <h3 className="text-sm font-bold text-slate-900  flex items-center justify-between">
                  <span>{phase.name}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-500  line-clamp-2 leading-relaxed">
                  {phase.goal}
                </p>
                {phase.command && (
                  <div className="pt-2 text-[11px] font-mono text-slate-400  truncate">
                    <code>{phase.command}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

const SinglePhaseDetail: React.FC<{ phase: PhaseInfo; onNavigate: (path: string) => void }> = ({
  phase,
  onNavigate,
}) => {
  const tocItems = [
    { id: 'goal', text: 'Goal & Objective' },
    { id: 'problem', text: 'Problem Solved' },
    { id: 'inputs-outputs', text: 'Inputs & Outputs' },
    { id: 'process', text: 'Step-by-Step Process' },
    { id: 'execution', text: 'Command & Execution' },
    { id: 'validation', text: 'Validation & Verification' },
    { id: 'problems', text: 'Common Pitfalls & Fixes' },
  ];

  const prevPhase = phase.phaseNumber > 1 ? PHASES_DATA[phase.phaseNumber - 2] : null;
  const nextPhase = phase.phaseNumber < 20 ? PHASES_DATA[phase.phaseNumber] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Phases', path: '/docs/phases' },
              { label: `Phase ${phase.phaseNumber} — ${phase.name}` },
            ]}
            onNavigate={onNavigate}
          />
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100  text-slate-700 ">
              Phase {phase.phaseNumber} of 20
            </span>
            <StatusBadge status={phase.status} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
            Phase {phase.phaseNumber} — {phase.name}
          </h1>
          <p className="mt-2 text-sm text-slate-600  leading-relaxed font-medium">
            {phase.goal}
          </p>
        </div>

        {/* Problem */}
        <section id="problem" className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 ">Why This Phase Exists</h2>
          <div className="p-4 rounded-xl border border-slate-200  bg-white  text-sm text-slate-600  leading-relaxed">
            {phase.problem}
          </div>
        </section>

        {/* Inputs & Outputs */}
        <section id="inputs-outputs" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 ">
              Inputs Consumed
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 ">
              {phase.inputs.map((input, idx) => (
                <li key={idx} className="flex items-start gap-1.5 font-mono">
                  <span className="text-blue-500 font-bold">&bull;</span>
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 ">
              Outputs Generated
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 ">
              {phase.outputs.map((output, idx) => (
                <li key={idx} className="flex items-start gap-1.5 font-mono">
                  <span className="text-emerald-500 font-bold">&bull;</span>
                  <span>{output}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 ">Step-by-Step Process</h2>
          <div className="space-y-2.5">
            {phase.process.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-200  bg-slate-50/60 "
              >
                <span className="h-6 w-6 rounded-lg bg-blue-100  text-blue-700  font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs text-slate-700  leading-relaxed">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Command & Expected Results */}
        {phase.command && (
          <section id="execution" className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 ">Command & Expected Result</h2>
            <CodeBlock code={phase.command} language="bash" />
            {phase.expectedResult && (
              <div className="p-3.5 rounded-xl border border-slate-200  bg-slate-950 text-xs font-mono text-emerald-400">
                <span className="text-slate-500 block mb-1"># Expected Output / Artifact:</span>
                {phase.expectedResult}
              </div>
            )}
          </section>
        )}

        {/* Relevant Files */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 ">
            Relevant Implementation Files
          </h3>
          <div className="flex flex-wrap gap-2">
            {phase.relevantFiles.map((file, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100  border border-slate-200  text-slate-700 "
              >
                {file}
              </span>
            ))}
          </div>
        </section>

        {/* Validation */}
        <section id="validation" className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 ">Validation Criteria</h2>
          <div className="p-4 rounded-xl border border-emerald-200  bg-emerald-50/40  text-xs text-emerald-900  flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{phase.validation}</span>
          </div>
        </section>

        {/* Common Pitfalls */}
        {phase.commonProblems.length > 0 && (
          <section id="problems" className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 ">Common Pitfalls & Solutions</h2>
            <div className="space-y-2">
              {phase.commonProblems.map((problem, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-amber-200  bg-amber-50/40  text-xs text-amber-900  flex items-start gap-2.5"
                >
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Step */}
        <section className="p-4 rounded-xl border border-slate-200  bg-slate-50  flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400">Next Phase</span>
            <p className="text-xs font-semibold text-slate-900  mt-0.5">
              {phase.nextStep}
            </p>
          </div>
          {nextPhase && (
            <button
              onClick={() => onNavigate(`/docs/phases/${nextPhase.phaseNumber}`)}
              className="flex items-center gap-1 text-xs font-bold text-blue-600  hover:underline shrink-0"
            >
              <span>Phase {nextPhase.phaseNumber}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </section>

        {/* Previous / Next Footer */}
        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          {prevPhase ? (
            <button
              onClick={() => onNavigate(`/docs/phases/${prevPhase.phaseNumber}`)}
              className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
            >
              &larr; Phase {prevPhase.phaseNumber}: {prevPhase.name}
            </button>
          ) : (
            <div />
          )}

          {nextPhase && (
            <button
              onClick={() => onNavigate(`/docs/phases/${nextPhase.phaseNumber}`)}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
            >
              <span>Phase {nextPhase.phaseNumber}: {nextPhase.name}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};
