import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { TROUBLESHOOTING_GUIDES } from '../data/projectData';
import { Terminal, Settings, Wrench, RefreshCw, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface DeveloperGuideViewProps {
  guideType: 'configuration' | 'run-agent' | 'testing' | 'troubleshooting' | 'reproducibility' | 'modifying';
  onNavigate: (path: string) => void;
}

export const DeveloperGuideView: React.FC<DeveloperGuideViewProps> = ({ guideType, onNavigate }) => {
  if (guideType === 'troubleshooting') {
    return <TroubleshootingSection onNavigate={onNavigate} />;
  }

  if (guideType === 'run-agent') {
    return <RunAgentSection onNavigate={onNavigate} />;
  }

  if (guideType === 'testing') {
    return <TestingSection onNavigate={onNavigate} />;
  }

  if (guideType === 'configuration') {
    return <ConfigurationSection onNavigate={onNavigate} />;
  }

  if (guideType === 'reproducibility') {
    return <ReproducibilitySection onNavigate={onNavigate} />;
  }

  return <ModifyingSection onNavigate={onNavigate} />;
};

const ConfigurationSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'env-vars', text: 'Environment Variables (.env)' },
    { id: 'optional-api-keys', text: 'Optional LLM Keys' },
    { id: 'path-overrides', text: 'Data Directory Customization' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div>
          <Breadcrumbs
            items={[{ label: 'Developer Guide' }, { label: 'Configuration & Environment' }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
            Configuration & Environment Variables
          </h1>
          <p className="text-sm text-slate-600  mt-2 leading-relaxed">
            How configuration is managed across development, testing, and production runtime environments.
          </p>
        </div>

        <section id="env-vars" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Environment Variables (.env)</h2>
          <p className="text-sm text-slate-600 ">
            Create a local <code>.env</code> file based on the committed <code>.env.example</code> template:
          </p>
          <CodeBlock
            code={`# Optional Generative LLM Key (Used ONLY for Phase 9 Grounded Reply Drafting)
OPENAI_API_KEY=sk-...

# Dataset File Locations (Defaults point to repository data directory)
DATA_RAW_PATH=data/raw/twcs.csv
PROCESSED_DATA_DIR=data/processed
RETRIEVAL_INDEX_PATH=data/indexes/retrieval.faiss
RETRIEVAL_METADATA_PATH=data/indexes/retrieval_metadata.csv
GOLDEN_SET_PATH=data/golden_set.csv

# Runtime Parameters
MODEL_CONFIDENCE_THRESHOLD=0.40
RETRIEVAL_SIMILARITY_THRESHOLD=0.55
TOP_K_RETRIEVAL=3
BATCH_SIZE=256`}
            language="bash"
          />
        </section>

        <section id="optional-api-keys" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Optional LLM Keys</h2>
          <Callout type="TIP" title="100% Offline Capability">
            If <code>OPENAI_API_KEY</code> is absent or empty, the agent operates in <strong>Grounded Retrieval-Only Mode</strong>. It completes intent classification, FAISS retrieval, and deterministic safety escalation completely locally without making network calls.
          </Callout>
        </section>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

const RunAgentSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'single-query', text: '1. Single Query (CLI Mode)' },
    { id: 'interactive-repl', text: '2. Interactive REPL Mode' },
    { id: 'batch-eval', text: '3. Batch Golden Set Evaluation' },
    { id: 'programmatic', text: '4. Programmatic Python Import' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div>
          <Breadcrumbs
            items={[{ label: 'Developer Guide' }, { label: 'How to Run the Agent' }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
            How to Run the Agent
          </h1>
          <p className="text-sm text-slate-600  mt-2 leading-relaxed">
            Run the AI customer support agent via command-line arguments, interactive terminal REPL, or batch evaluation scripts.
          </p>
        </div>

        <section id="single-query" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">1. Single Query (CLI Mode)</h2>
          <CodeBlock
            code={`python scripts/run_agent.py --query "Where is my package #402-998?"`}
            language="bash"
          />
        </section>

        <section id="interactive-repl" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">2. Interactive REPL Mode</h2>
          <CodeBlock
            code={`python scripts/run_agent.py --interactive`}
            language="bash"
          />
        </section>

        <section id="batch-eval" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">3. Batch Evaluation on Golden Set</h2>
          <CodeBlock
            code={`python scripts/evaluate_baselines.py --model tfidf --data data/golden_set.csv --output reports/eval_results.json`}
            language="bash"
          />
        </section>

        <section id="programmatic" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">4. Programmatic Python Import</h2>
          <CodeBlock
            code={`from src.data_processing import clean_text
from src.classifiers.tfidf import TfidfIntentClassifier
from src.retrieval.faiss_retriever import FaissRetriever
from src.escalation.rules import evaluate_escalation_policy

# Load components
classifier = TfidfIntentClassifier.load("models/tfidf_model.pkl")
retriever = FaissRetriever("data/indexes/retrieval.faiss", "data/indexes/retrieval_metadata.csv")

# Process customer query
query = "My item arrived damaged, can I get a replacement?"
intent, confidence = classifier.predict(query)
precedents = retriever.search(query, k=3)
decision, reason = evaluate_escalation_policy(query, intent, confidence, precedents[0]['score'])

print(f"Decision: {decision} | Intent: {intent} (conf: {confidence:.2f})")`}
            language="python"
          />
        </section>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

const TestingSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'running-tests', text: 'Running Unit Tests (43 Tests)' },
    { id: 'test-coverage', text: 'Test Suite Coverage Modules' },
    { id: 'ci-automation', text: 'Regression Guardrails' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-8">
        <div>
          <Breadcrumbs
            items={[{ label: 'Developer Guide' }, { label: 'Testing & Verification' }]}
            onNavigate={onNavigate}
          />
          <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
            Testing & Verification Suite
          </h1>
          <p className="text-sm text-slate-600  mt-2 leading-relaxed">
            The project includes 43 automated unit and integration tests verifying every component in isolation.
          </p>
        </div>

        <section id="running-tests" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Running the Test Suite</h2>
          <CodeBlock
            code={`python -m unittest discover -s tests -v`}
            language="bash"
          />
          <div className="p-3.5 rounded-xl border border-emerald-200  bg-emerald-50/40  text-xs font-mono text-emerald-800 ">
            Ran 43 tests in 1.482s. All 43 tests passing.
          </div>
        </section>

        <section id="test-coverage" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Test Suite Coverage Modules</h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">tests/test_data_processing.py (11 tests):</strong>
              <p className="text-slate-500 mt-0.5">Tests URL replacement, punctuation normalization, handle stripping, and multi-turn thread traversal.</p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">tests/test_classifiers.py (12 tests):</strong>
              <p className="text-slate-500 mt-0.5">Tests majority baseline predictions, TF-IDF vectorization, probability calibration, and unknown vocabulary handling.</p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">tests/test_retrieval.py (8 tests):</strong>
              <p className="text-slate-500 mt-0.5">Tests FAISS cosine similarity calculations, metadata row alignment, and graceful low-similarity handling.</p>
            </div>
            <div className="p-3 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">tests/test_escalation.py (12 tests):</strong>
              <p className="text-slate-500 mt-0.5">Tests credential keywords, litigation indicators, confidence thresholds, and false auto-handling prevention.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

const TroubleshootingSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');

  const filtered = TROUBLESHOOTING_GUIDES.filter(
    (g) =>
      g.issue.toLowerCase().includes(search.toLowerCase()) ||
      g.symptom.toLowerCase().includes(search.toLowerCase()) ||
      g.rootCause.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[{ label: 'Developer Guide' }, { label: 'Troubleshooting Guide' }]}
          onNavigate={onNavigate}
        />
        <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
          Developer Troubleshooting Guide
        </h1>
        <p className="text-sm text-slate-600  mt-2 leading-relaxed">
          Solutions to the most common environment, data loading, indexing, and runtime errors encountered across setups.
        </p>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter troubleshooting issues by symptom or error..."
          className="w-full px-3.5 py-2 rounded-xl border border-slate-200  bg-white  text-xs text-slate-900  placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-slate-200  bg-white  space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <h3 className="text-sm font-bold text-slate-900 ">{item.issue}</h3>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50  border border-rose-200  text-xs font-mono text-rose-800 ">
              <span className="text-slate-500 font-sans font-semibold block mb-0.5">Symptom / Error:</span>
              {item.symptom}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50  border border-slate-200 ">
                <span className="font-bold text-slate-700  block mb-0.5">Root Cause:</span>
                <p className="text-slate-600 ">{item.rootCause}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/50  border border-emerald-200  space-y-1.5">
                <span className="font-bold text-emerald-800  block mb-0.5">Verified Fix Steps:</span>
                <ul className="list-disc list-inside space-y-0.5 text-emerald-900  text-[11px]">
                  {item.fixSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ul>
                {item.command && (
                  <div className="mt-1.5 pt-1.5 border-t border-emerald-200/50 ">
                    <span className="text-[10px] text-emerald-700  font-semibold uppercase">Command:</span>
                    <div className="font-mono text-[11px] text-emerald-950  bg-emerald-100/50  p-1.5 rounded mt-0.5 overflow-x-auto">
                      {item.command}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReproducibilitySection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[{ label: 'Developer Guide' }, { label: 'Reproducibility & Audit' }]}
          onNavigate={onNavigate}
        />
        <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
          100% Local Reproducibility & Audit
        </h1>
        <p className="text-sm text-slate-600  mt-2 leading-relaxed">
          Guarantees that all numbers, splits, and models reported in this documentation can be reproduced identically on a fresh machine.
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-emerald-200  bg-emerald-50/40  space-y-2">
        <div className="flex items-center gap-2 text-emerald-800  font-bold text-sm">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span>Strict Determinism Checklist</span>
        </div>
        <ul className="list-disc list-inside text-xs text-emerald-900  space-y-1 pl-2">
          <li><strong>Random Seeds Pinned:</strong> All train/test splits and logistic regressions use explicit <code>random_state=42</code>.</li>
          <li><strong>Zero Network Dependency:</strong> Model training, vector indexing, evaluation, and unit tests run completely disconnected from the Internet.</li>
          <li><strong>Locked Golden Benchmark:</strong> The 200-row golden set is stored as an immutable CSV with git commit hash tracking.</li>
          <li><strong>Pinned Dependencies:</strong> <code>requirements.txt</code> locks package versions for numpy, scikit-learn, and faiss-cpu.</li>
        </ul>
      </div>

      <CodeBlock
        code={`# Complete verification sequence from scratch:
python scripts/analyze_dataset.py
python scripts/clean_data.py
python scripts/split_data.py
python scripts/build_index.py
python -m unittest discover -s tests -v
python scripts/evaluate_baselines.py --model tfidf --data data/golden_set.csv`}
        language="bash"
      />
    </div>
  );
};

const ModifyingSection: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <div>
        <Breadcrumbs
          items={[{ label: 'Developer Guide' }, { label: 'Modifying the System' }]}
          onNavigate={onNavigate}
        />
        <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
          Extending & Modifying the System
        </h1>
        <p className="text-sm text-slate-600  mt-2 leading-relaxed">
          Step-by-step instructions for adding new intents, changing embedding models, or configuring custom escalation rules.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-600 ">
        <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
          <strong className="text-slate-900  text-sm block">How to Add a New Intent</strong>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Update <code>INTENT_TAXONOMY</code> in <code>src/data_processing.py</code>.</li>
            <li>Add keyword patterns or training labels in <code>data/processed/train_conversations.csv</code>.</li>
            <li>Re-run <code>python scripts/evaluate_baselines.py</code> to confirm new class precision/recall.</li>
          </ol>
        </div>

        <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
          <strong className="text-slate-900  text-sm block">How to Add an Escalation Guardrail</strong>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Open <code>src/escalation/rules.py</code>.</li>
            <li>Append regex pattern into <code>SECURITY_REGEX</code> or <code>LEGAL_REGEX</code>.</li>
            <li>Add corresponding unit test in <code>tests/test_escalation.py</code>.</li>
            <li>Run <code>python -m unittest tests/test_escalation.py</code> to verify.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
