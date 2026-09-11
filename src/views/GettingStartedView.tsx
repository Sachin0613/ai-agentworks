import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { CodeBlock } from '../components/CodeBlock';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CheckCircle2, Terminal, AlertTriangle, ArrowRight } from 'lucide-react';

interface GettingStartedViewProps {
  onNavigate: (path: string) => void;
}

export const GettingStartedView: React.FC<GettingStartedViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'prerequisites', text: '1. Prerequisites' },
    { id: 'step-1-clone', text: '2. Clone the Repository' },
    { id: 'step-2-venv', text: '3. Create Virtual Environment' },
    { id: 'step-3-install', text: '4. Install Dependencies' },
    { id: 'step-4-env', text: '5. Environment Variables (.env)' },
    { id: 'step-5-data', text: '6. Dataset Ingestion & Cleaning' },
    { id: 'step-6-split', text: '7. Conversation-Level Splitting' },
    { id: 'step-7-index', text: '8. Build FAISS Retrieval Index' },
    { id: 'step-8-tests', text: '9. Run Test Suite (43 Tests)' },
    { id: 'step-9-agent', text: '10. Run Agent & Baselines' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Getting Started' }, { label: 'Quick Start (10-Step Guide)' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Beginner Quick Start Guide
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            Follow this end-to-end, 10-step walkthrough to clone, configure, index, and run the AI customer support agent from zero on a fresh machine.
          </p>
        </div>

        {/* Section 1 */}
        <section id="prerequisites" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">1. Prerequisites</h2>
          <p className="text-sm text-slate-600 ">
            Before setting up the project, ensure you have the following installed on your machine:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600  space-y-1.5 pl-2">
            <li><strong>Python 3.12:</strong> Tested and validated on Python 3.12. Older versions (&lt;3.10) may lack updated typing support.</li>
            <li><strong>Git:</strong> Required for cloning repository and version control tracking.</li>
            <li><strong>4GB+ RAM:</strong> Necessary for processing raw 2.8M tweet CSV chunks without encountering Out-Of-Memory (OOM) errors.</li>
            <li><strong>Optional: OpenAI API Key:</strong> Only required for Phase 9 (generative LLM reply drafting). All classification, preprocessing, FAISS retrieval, escalation, and tests run 100% offline.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="step-1-clone" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">2. Clone the Repository</h2>
          <p className="text-sm text-slate-600 ">
            Clone the repository from GitHub and navigate into the project root directory:
          </p>
          <CodeBlock
            code={`git clone https://github.com/your-org/hiver-ai-support-agent.git\ncd hiver-ai-support-agent`}
            language="bash"
          />
        </section>

        {/* Section 3 */}
        <section id="step-2-venv" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">3. Create & Activate Virtual Environment</h2>
          <p className="text-sm text-slate-600 ">
            Always isolate Python dependencies within a local virtual environment named <code>.venv</code>:
          </p>
          <CodeBlock
            variants={[
              {
                label: 'Windows (PowerShell)',
                language: 'powershell',
                code: `python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1`,
              },
              {
                label: 'Windows (CMD)',
                language: 'batch',
                code: `python -m venv .venv\n.venv\\Scripts\\activate.bat`,
              },
              {
                label: 'Linux / macOS (Bash)',
                language: 'bash',
                code: `python3 -m venv .venv\nsource .venv/bin/activate`,
              },
            ]}
          />
          <Callout type="TIP" title="PowerShell Execution Policy Error?">
            If Windows PowerShell restricts script execution, run: <code>Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</code> before activating.
          </Callout>
        </section>

        {/* Section 4 */}
        <section id="step-3-install" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">4. Install Dependencies</h2>
          <p className="text-sm text-slate-600 ">
            Upgrade <code>pip</code> and install the pinned requirements. This includes <code>pandas</code>, <code>scikit-learn</code>, <code>sentence-transformers</code>, <code>faiss-cpu</code>, and testing packages:
          </p>
          <CodeBlock
            code={`python -m pip install --upgrade pip\npython -m pip install -r requirements.txt`}
            language="bash"
          />
        </section>

        {/* Section 5 */}
        <section id="step-4-env" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">5. Environment Configuration (.env)</h2>
          <p className="text-sm text-slate-600 ">
            Copy the provided <code>.env.example</code> file to create your local <code>.env</code> file:
          </p>
          <CodeBlock
            code={`cp .env.example .env`}
            language="bash"
          />
          <Callout type="WARNING" title="Never Commit Secrets to Version Control">
            <code>.env</code> contains sensitive keys and is excluded via <code>.gitignore</code>. For offline benchmarking, an API key is completely optional.
          </Callout>
          <div className="p-4 rounded-xl border border-slate-200  bg-slate-50  text-xs font-mono">
            <span className="text-slate-400"># Content of .env.example</span>
            <pre className="mt-1 text-slate-700 ">
{`# Optional LLM Key for Phase 9 Grounded Reply Generation
OPENAI_API_KEY=your_openai_api_key_here

# Paths (defaults match repository layout)
DATA_RAW_PATH=data/raw/twcs.csv
RETRIEVAL_INDEX_PATH=data/indexes/retrieval.faiss
GOLDEN_SET_PATH=data/golden_set.csv`}
            </pre>
          </div>
        </section>

        {/* Section 6 */}
        <section id="step-5-data" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">6. Dataset Ingestion & Cleaning</h2>
          <p className="text-sm text-slate-600 ">
            Download the Kaggle <strong>Customer Support on Twitter</strong> dataset (<code>twcs.csv</code>) and place it in <code>data/raw/twcs.csv</code>. Then run the analysis and cleaning scripts to filter AmazonHelp tweets:
          </p>
          <CodeBlock
            code={`# Step 1: Inspect raw corpus\npython scripts/analyze_dataset.py\n\n# Step 2: Empirically verify brand selection\npython scripts/analyze_brands.py\n\n# Step 3: Clean tweets and reconstruct multi-turn conversations\npython scripts/clean_data.py`}
            language="bash"
          />
          <p className="text-xs text-slate-500  font-mono">
            Output: Generates <code>data/processed/amazon_conversations.csv</code> (82,556 conversations, 168,814 pairs).
          </p>
        </section>

        {/* Section 7 */}
        <section id="step-6-split" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">7. Conversation-Level Splitting</h2>
          <p className="text-sm text-slate-600 ">
            Split the cleaned conversations into isolated sets without message leakage:
          </p>
          <CodeBlock
            code={`python scripts/split_data.py`}
            language="bash"
          />
          <Callout type="IMPORTANT" title="Zero Conversation Leakage Guarantee">
            The script strictly isolates:
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li><strong>Development (70%):</strong> 57,789 conversations for classifier training.</li>
              <li><strong>Retrieval Pool (15%):</strong> 12,383 conversations for FAISS index search.</li>
              <li><strong>Golden Pool (15%):</strong> 12,384 conversations strictly isolated for evaluation.</li>
            </ul>
          </Callout>
        </section>

        {/* Section 8 */}
        <section id="step-7-index" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">8. Build FAISS Retrieval Index</h2>
          <p className="text-sm text-slate-600 ">
            Convert historical support pairs into dense vector embeddings using Sentence Transformers:
          </p>
          <CodeBlock
            code={`python scripts/build_index.py --batch-size 256`}
            language="bash"
          />
          <p className="text-xs text-slate-500 ">
            Expected output: <code>data/indexes/retrieval.faiss</code> and <code>data/indexes/retrieval_metadata.csv</code>. Takes ~3–6 minutes on standard CPU with batch logging.
          </p>
        </section>

        {/* Section 9 */}
        <section id="step-8-tests" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">9. Run Test Suite (43 Tests)</h2>
          <p className="text-sm text-slate-600 ">
            Execute unit and integration tests covering data processing, TF-IDF feature extraction, FAISS cosine retrieval, and deterministic escalation policies:
          </p>
          <CodeBlock
            code={`python -m unittest discover -s tests -v`}
            language="bash"
          />
          <div className="p-3 rounded-xl bg-emerald-50  border border-emerald-200  text-xs font-mono text-emerald-800 ">
            Ran 43 tests in 1.482s. OK (All 43 unit and integration tests passing).
          </div>
        </section>

        {/* Section 10 */}
        <section id="step-9-agent" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">10. Run Agent & Baselines</h2>
          <p className="text-sm text-slate-600 ">
            Run an interactive test query through the complete pipeline, or execute the locked golden set evaluation harness:
          </p>
          <CodeBlock
            variants={[
              {
                label: 'Single Query (CLI)',
                language: 'bash',
                code: `python scripts/run_agent.py --query "Where is my package #402-998?"`,
              },
              {
                label: 'Run TF-IDF Baseline',
                language: 'bash',
                code: `python scripts/evaluate_baselines.py --model tfidf --data data/golden_set.csv`,
              },
              {
                label: 'Interactive REPL',
                language: 'bash',
                code: `python scripts/run_agent.py --interactive`,
              },
            ]}
          />
        </section>

        {/* Next Steps CTA */}
        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Back to Overview
          </button>
          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Explore System Architecture</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Right Table of Contents */}
      <div className="hidden lg:block lg:col-span-1">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};
