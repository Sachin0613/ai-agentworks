import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { MetricCard } from '../components/MetricCard';
import { DataPipelineDiagram } from '../components/Diagrams';
import { Database, Split, ShieldCheck, ArrowRight, FileSpreadsheet, Lock } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

interface DataViewProps {
  onNavigate: (path: string) => void;
}

export const DataView: React.FC<DataViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'corpus-overview', text: 'Kaggle Dataset Overview' },
    { id: 'schema', text: 'Schema & Field Definitions' },
    { id: 'thread-reconstruction', text: 'Thread Reconstruction Algorithm' },
    { id: 'data-pipeline-flow', text: 'Data Pipeline & Leakage Isolation' },
    { id: 'splits', text: 'Phase 4 Partitioning Statistics' },
    { id: 'repeated-messages', text: 'Repeated Messages Policy' },
    { id: 'directories', text: 'Data Directory Layout' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Project' }, { label: 'Dataset & Processing' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Dataset Documentation & Splits
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            Comprehensive audit of the Kaggle Customer Support on Twitter dataset, thread reconstruction graph traversal, conversation-level splitting, and leakage-aware isolation.
          </p>
        </div>

        {/* Overview */}
        <section id="corpus-overview" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Kaggle Dataset Overview</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            The project utilizes the <strong>Customer Support on Twitter</strong> dataset published on Kaggle. The raw archive (<code>twcs.csv</code>) contains <strong>2,811,774 tweets</strong> across hundreds of global corporate customer service accounts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <MetricCard label="Raw Tweets" value={PROJECT_METADATA.rawTweets} subtext="Full Kaggle twcs.csv" />
            <MetricCard label="Amazon Convos" value={PROJECT_METADATA.rawConversations} subtext="Reconstructed threads" />
            <MetricCard label="Customer Queries" value={PROJECT_METADATA.customerMessages} subtext="Inbound inquiries" />
            <MetricCard label="Direct Reply Rate" value={PROJECT_METADATA.directResponseRate} subtext="168.8k verified pairs" badge="76.0%" badgeType="success" />
          </div>
          <Callout type="INFO" title="Why Focus on AmazonHelp Instead of All Brands?">
            Processing all 2.8 million tweets across disjoint industries (airlines, gaming consoles, telecommunications, ride-sharing) creates conflicting corporate policies. For example, airline replies instruct passengers regarding terminal gates and flight rebooking, whereas Amazon replies instruct customers regarding carrier tracking and 30-day return centers. Filtering for AmazonHelp creates a coherent, domain-grounded knowledge base.
          </Callout>
        </section>

        {/* Schema */}
        <section id="schema" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Schema & Field Definitions</h2>
          <p className="text-sm text-slate-600 ">
            The raw CSV structure consists of 7 primary columns:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 ">
            <table className="min-w-full divide-y divide-slate-200  text-xs">
              <thead className="bg-slate-50  font-bold text-slate-700 ">
                <tr>
                  <th className="p-3 text-left">Column</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Role / Description</th>
                  <th className="p-3 text-left">Example Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200  bg-white  font-mono text-slate-600 ">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">tweet_id</td>
                  <td className="p-3">int64</td>
                  <td className="p-3 font-sans">Unique primary key identifier for every individual tweet.</td>
                  <td className="p-3">119238</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">author_id</td>
                  <td className="p-3">string</td>
                  <td className="p-3 font-sans">Identifier for the sender. Either a brand (e.g. <code>AmazonHelp</code>) or an anonymized user (e.g. <code>115712</code>).</td>
                  <td className="p-3">AmazonHelp</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">inbound</td>
                  <td className="p-3">bool</td>
                  <td className="p-3 font-sans"><code>True</code> if sent by a customer to a company; <code>False</code> if sent by a company response agent.</td>
                  <td className="p-3">False</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">created_at</td>
                  <td className="p-3">string</td>
                  <td className="p-3 font-sans">Timestamp string indicating date and time the tweet was published.</td>
                  <td className="p-3">Wed Oct 11 03:22:19 +0000 2017</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">text</td>
                  <td className="p-3">string</td>
                  <td className="p-3 font-sans">Verbatim message text, containing mentions, emoji, and URLs.</td>
                  <td className="p-3">@AmazonHelp Where is my order? amzn.to/help</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">response_tweet_id</td>
                  <td className="p-3">string</td>
                  <td className="p-3 font-sans">Comma-separated tweet IDs that responded to this tweet (forward pointer).</td>
                  <td className="p-3">119239, 119240</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 ">in_response_to_tweet_id</td>
                  <td className="p-3">float64</td>
                  <td className="p-3 font-sans">Tweet ID this tweet directly replies to (back pointer). Null if root initiation.</td>
                  <td className="p-3">119237.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Thread Reconstruction */}
        <section id="thread-reconstruction" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Thread Reconstruction Algorithm</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            Because Twitter messages are stored as disjoint rows, <code>scripts/clean_data.py</code> executes a graph traversal algorithm:
          </p>
          <ol className="list-decimal list-inside text-sm text-slate-600  space-y-2 pl-2">
            <li>Identify all AmazonHelp outbound replies (<code>author_id == "AmazonHelp"</code>).</li>
            <li>Follow <code>in_response_to_tweet_id</code> pointers upwards to locate the root initiating customer tweet.</li>
            <li>Assign a deterministic <code>conversation_id</code> equal to the root tweet ID.</li>
            <li>Order all child and parent messages chronologically using <code>created_at</code>.</li>
            <li>Extract direct customer-query to agent-response pairs for the retrieval candidate database.</li>
          </ol>
        </section>

        {/* Data Pipeline Diagram */}
        <section id="data-pipeline-flow" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Data Pipeline Flow & Isolation</h2>
          <DataPipelineDiagram />
        </section>

        {/* Splits */}
        <section id="splits" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Phase 4 Partitioning Statistics</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            To prevent data leakage, splitting was performed <strong>strictly at the conversation level</strong>. Zero conversations overlap across splits:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600  uppercase">Development (70%)</span>
                <StatusBadge status="Implemented" size="sm" />
              </div>
              <div className="text-2xl font-bold text-slate-900 ">57,789</div>
              <p className="text-xs text-slate-500 ">
                143,133 customer msgs; 119,144 company replies. Used for intent feature discovery and TF-IDF baseline training.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white  space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-600  uppercase">Retrieval Pool (15%)</span>
                <StatusBadge status="Implemented" size="sm" />
              </div>
              <div className="text-2xl font-bold text-slate-900 ">12,383</div>
              <p className="text-xs text-slate-500 ">
                30,189 customer msgs; 25,262 company replies. Dedicated exclusively to the FAISS historical retrieval index.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200  bg-emerald-50/40  space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700  uppercase">Golden Pool (15%)</span>
                <StatusBadge status="Implemented" size="sm" />
              </div>
              <div className="text-2xl font-bold text-emerald-900 ">12,384</div>
              <p className="text-xs text-emerald-800 ">
                30,276 customer msgs; 25,434 company replies. Completely excluded from training and retrieval. Yielded the locked 200-row golden set.
              </p>
            </div>
          </div>
        </section>

        {/* Repeated Messages */}
        <section id="repeated-messages" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Repeated Customer Messages Policy</h2>
          <Callout type="TIP" title="Measurement Over Silent Deletion">
            Real customer service exhibits natural frequency skew: thousands of customers independently tweet <em>"Where is my package?"</em> or <em>"Cancel my Prime"</em>. Rather than silently deleting exact duplicate customer tweets, the project explicitly measures unique vs repeated customer queries (203,598 total vs unique variants). This maintains authentic operational probability distributions without distorting validation splits.
          </Callout>
        </section>

        {/* Directories */}
        <section id="directories" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Data Directory Structure</h2>
          <div className="p-4 rounded-xl border border-slate-200  bg-slate-950 text-slate-200 font-mono text-xs">
            <pre className="leading-relaxed">
{`data/
├── raw/
│   └── twcs.csv                          # Unprocessed 2.8M Kaggle tweet dataset
├── processed/
│   ├── amazon_conversations.csv          # 82,556 reconstructed Amazon threads
│   ├── amazon_pairs.csv                  # 168,814 customer-company response pairs
│   ├── train_conversations.csv           # 57,789 development conversations
│   ├── retrieval_conversations.csv       # 12,383 retrieval memory conversations
│   └── golden_pool.csv                   # 12,384 permanently held-out conversations
├── indexes/
│   ├── retrieval.faiss                   # Dense 384-d FAISS IndexFlatIP binary
│   └── retrieval_metadata.csv            # Synchronized metadata (text, reply, IDs)
└── golden_set.csv                        # Locked 200-row held-out audit benchmark`}
            </pre>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Architecture
          </button>
          <button
            onClick={() => onNavigate('/docs/brand-selection')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Brand Selection (AmazonHelp)</span>
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
