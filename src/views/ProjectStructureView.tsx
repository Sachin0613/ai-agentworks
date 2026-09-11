import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { FolderTree, FileCode, ArrowRight, Layers } from 'lucide-react';

interface ProjectStructureViewProps {
  onNavigate: (path: string) => void;
}

export const ProjectStructureView: React.FC<ProjectStructureViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'tree-overview', text: 'Annotated Directory Layout' },
    { id: 'dir-data', text: 'data/ Directory' },
    { id: 'dir-src', text: 'src/ Package (Core Library)' },
    { id: 'dir-scripts', text: 'scripts/ Directory (CLI Tools)' },
    { id: 'dir-tests', text: 'tests/ Suite (43 Tests)' },
    { id: 'root-configs', text: 'Root Configuration Files' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Developer Guide' }, { label: 'Project File Structure' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Project Structure & File Organization
            </h1>
            <StatusBadge status="Audited Layout" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            Detailed inspection of every directory and file in the Python backend repository, explaining architectural responsibilities, modification triggers, and cross-module dependencies.
          </p>
        </div>

        {/* Tree Overview */}
        <section id="tree-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Repository Directory Tree</h2>
          <div className="p-4 rounded-xl border border-slate-200  bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto">
            <pre className="leading-relaxed">
{`.
├── data/
│   ├── raw/                       # Kaggle twcs.csv raw tweets
│   ├── processed/                 # Partitioned splits & conversations
│   ├── indexes/                   # FAISS index & metadata lookup
│   └── golden_set.csv             # Locked 200-row held-out audit set
├── src/
│   ├── __init__.py                # Package declaration
│   ├── data_processing.py         # Thread reconstruction & text normalization
│   ├── classifiers/
│   │   ├── __init__.py
│   │   ├── base.py                # Abstract IntentClassifier interface
│   │   ├── majority.py            # Baseline majority class classifier
│   │   └── tfidf.py               # TF-IDF + Logistic Regression implementation
│   ├── retrieval/
│   │   ├── __init__.py
│   │   └── faiss_retriever.py     # SentenceTransformers & FAISS query engine
│   ├── escalation/
│   │   ├── __init__.py
│   │   └── rules.py               # Hardcoded safety & regex escalation engine
│   └── generation/
│       ├── __init__.py
│       └── reply_generator.py     # Grounded JSON prompt generation & LLM caller
├── scripts/
│   ├── analyze_dataset.py         # EDA script for raw Kaggle statistics
│   ├── analyze_brands.py          # Empirical brand reply rate analysis
│   ├── clean_data.py              # Filtering AmazonHelp & thread grouping
│   ├── split_data.py              # Zero-leakage conversation partitioner
│   ├── build_index.py             # Offline FAISS vector embedding builder
│   ├── evaluate_baselines.py      # Cross-validation & golden evaluation runner
│   └── run_agent.py               # End-to-end CLI agent inference runner
├── tests/
│   ├── test_data_processing.py    # Unit tests for text cleaning and threading
│   ├── test_classifiers.py        # Unit tests for feature extraction and models
│   ├── test_retrieval.py          # Unit tests for FAISS index search
│   └── test_escalation.py         # Unit tests for safety regex cascade
├── requirements.txt               # Pinned Python dependencies
├── .env.example                   # Environment variable template
└── README.md                      # Primary project orientation`}
            </pre>
          </div>
        </section>

        {/* Directory Breakdowns */}
        <section id="dir-data" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">1. <code>data/</code> Directory</h2>
          <div className="space-y-2 text-xs text-slate-600 ">
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">data/raw/</strong>
              <p className="mt-1">Stores the immutable Kaggle <code>twcs.csv</code> archive. Never modified by scripts; treated as read-only upstream source.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">data/processed/</strong>
              <p className="mt-1">Holds conversation-level splits (<code>train_conversations.csv</code>, <code>retrieval_conversations.csv</code>, <code>golden_pool.csv</code>). Generated deterministically by <code>split_data.py</code>.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">data/indexes/</strong>
              <p className="mt-1">Contains compiled vector index binary <code>retrieval.faiss</code> and corresponding CSV metadata lookup with synchronized index offsets.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">data/golden_set.csv</strong>
              <p className="mt-1">Locked 200-row held-out benchmark. Version-controlled; never overwritten during training or indexing.</p>
            </div>
          </div>
        </section>

        <section id="dir-src" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">2. <code>src/</code> Package (Core Library)</h2>
          <p className="text-sm text-slate-600 ">
            Modular reusable Python library. Zero CLI script logic lives in <code>src/</code>; only importable classes and functions.
          </p>
          <div className="space-y-2 text-xs text-slate-600 ">
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">src/data_processing.py</strong>
              <p className="mt-1">Text normalization, hashtag extraction, URL shortening, handle replacement, and bidirectional thread grouping algorithms.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">src/classifiers/tfidf.py</strong>
              <p className="mt-1">Scikit-learn pipeline wrapping subword character n-grams and Logistic Regression with calibrated probability prediction.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">src/retrieval/faiss_retriever.py</strong>
              <p className="mt-1">Encapsulates SentenceTransformer model loading, L2 vector normalization, FAISS IP querying, and similarity score transformation.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  font-mono">src/escalation/rules.py</strong>
              <p className="mt-1">Deterministic safety policy evaluating credential keywords, legal terms, financial disputes, and confidence floors.</p>
            </div>
          </div>
        </section>

        <section id="dir-scripts" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">3. <code>scripts/</code> Directory (CLI Tools)</h2>
          <p className="text-sm text-slate-600 ">
            Executable entry points with argument parsing (<code>argparse</code>) and structured logging. Each script corresponds to an engineering phase:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-600  space-y-1 pl-2">
            <li><code>analyze_dataset.py</code> &rarr; Phase 1 (EDA)</li>
            <li><code>analyze_brands.py</code> &rarr; Phase 2 (Brand Selection)</li>
            <li><code>clean_data.py</code> &rarr; Phase 3 (Preprocessing)</li>
            <li><code>split_data.py</code> &rarr; Phase 4 (Leakage-Aware Splitting)</li>
            <li><code>build_index.py</code> &rarr; Phase 7 (Vector Indexing)</li>
            <li><code>evaluate_baselines.py</code> &rarr; Phase 6 & 12 (Evaluation Runner)</li>
            <li><code>run_agent.py</code> &rarr; Phase 11 (Interactive CLI Inference)</li>
          </ul>
        </section>

        <section id="dir-tests" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">4. <code>tests/</code> Suite (43 Unit Tests)</h2>
          <p className="text-sm text-slate-600 ">
            Automated test suite executable via Python's built-in <code>unittest</code> runner. All 43 tests pass offline in &lt;2 seconds without network calls.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/reference/decision-log')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Decision Log
          </button>
          <button
            onClick={() => onNavigate('/docs/developer/run-agent')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Run Agent & Developer Guides</span>
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
