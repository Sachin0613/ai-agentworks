import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { Database, Search, Cpu, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface RetrievalViewProps {
  onNavigate: (path: string) => void;
}

export const RetrievalView: React.FC<RetrievalViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'retrieval-architecture', text: 'Retrieval Architecture' },
    { id: 'embedding-model', text: 'Embedding Model & Dimensions' },
    { id: 'faiss-configuration', text: 'FAISS IndexFlatIP & Cosine Math' },
    { id: 'split-isolation', text: 'Retrieval Split Isolation' },
    { id: 'building-index', text: 'Building the Index & Artifacts' },
    { id: 'thresholds', text: 'Confidence Thresholds & Missing Matches' },
    { id: 'troubleshooting-retrieval', text: 'Troubleshooting & Verifications' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Agent Components' }, { label: 'Historical Retrieval (FAISS)' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Historical Case Retrieval (FAISS)
            </h1>
            <StatusBadge status="Verify / Partial" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            The retrieval engine grounds the agent's replies in verified historical Amazon customer support precedents using dense vector search over an isolated 12,383-conversation corpus.
          </p>
        </div>

        {/* Architecture */}
        <section id="retrieval-architecture" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Retrieval Architecture</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            Rather than asking a language model to recall Amazon customer policies from memory, the agent performs dense semantic retrieval. When a customer message arrives, the retriever queries a FAISS index containing pre-computed vector embeddings of 12,383 historical customer support interactions.
          </p>
          <div className="p-4 rounded-xl border border-slate-200  bg-white  text-xs font-mono text-slate-700  space-y-1">
            <div className="text-blue-600  font-bold">Query Execution Pipeline:</div>
            <div>Customer Input &rarr; Clean &rarr; all-MiniLM-L6-v2 Encoder &rarr; 384-d Vector &rarr; L2 Normalize</div>
            <div>&rarr; FAISS IndexFlatIP.search(vector, k=3) &rarr; Top-3 Precedents + Similarity Scores</div>
          </div>
        </section>

        {/* Embedding Model */}
        <section id="embedding-model" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Embedding Model & Specifications</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 ">
            <table className="min-w-full divide-y divide-slate-200  text-xs">
              <tbody className="divide-y divide-slate-200  bg-white  font-mono text-slate-600 ">
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">Pretrained Model</td>
                  <td className="p-3 text-blue-600 ">sentence-transformers/all-MiniLM-L6-v2</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">Vector Dimensions</td>
                  <td className="p-3">384 floats (1,536 bytes per document vector)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">Latency (CPU)</td>
                  <td className="p-3">~12ms per single query inference on modern laptop CPU</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900  font-sans">Memory Footprint</td>
                  <td className="p-3">~80MB RAM for model weights; ~22MB for 12.3k vector index</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAISS Configuration */}
        <section id="faiss-configuration" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">FAISS IndexFlatIP & Cosine Math</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            By default, FAISS <code>IndexFlatL2</code> computes squared Euclidean distances, where lower numbers mean closer vectors. To compute standard cosine similarity bounded between -1.0 and +1.0:
          </p>
          <CodeBlock
            code={`import faiss\nimport numpy as np\n\n# 1. Normalize vectors to unit Euclidean norm (||v|| = 1.0)\nfaiss.normalize_L2(embeddings)\n\n# 2. Use Inner Product Index (which equals Cosine Similarity on unit vectors)\nindex = faiss.IndexFlatIP(384)\nindex.add(embeddings)\n\n# 3. Query normalization\nfaiss.normalize_L2(query_vector)\nsimilarities, indices = index.search(query_vector, k=3)`}
            language="python"
          />
        </section>

        {/* Split Isolation */}
        <section id="split-isolation" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Retrieval Split Isolation</h2>
          <Callout type="IMPORTANT" title="Zero Retrieval Leakage Guarantee">
            The retrieval database is populated <strong>strictly from the dedicated 12,383 retrieval conversation split</strong>.
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li>No development set conversations (57,789) are present in the retrieval index.</li>
              <li>No golden set conversations (12,384) are present in the retrieval index.</li>
            </ul>
            This ensures that during evaluation, the agent cannot cheat by retrieving the verbatim true response to the golden question.
          </Callout>
        </section>

        {/* Building Index */}
        <section id="building-index" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Building the Index Artifacts</h2>
          <p className="text-sm text-slate-600 ">
            Generate the index using the batching script:
          </p>
          <CodeBlock
            code={`python scripts/build_index.py --input data/processed/retrieval_conversations.csv --batch-size 256`}
            language="bash"
          />
          <p className="text-xs text-slate-500 font-mono">
            Outputs created: <code>data/indexes/retrieval.faiss</code> and <code>data/indexes/retrieval_metadata.csv</code>.
          </p>
        </section>

        {/* Thresholds */}
        <section id="thresholds" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Confidence Thresholds & Missing Matches</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            What happens when a customer asks something completely outside historical support records (e.g. <em>"How do I cook pasta with Prime?"</em>)?
          </p>
          <div className="p-4 rounded-xl border border-amber-200  bg-amber-50/40  text-xs text-amber-900  space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Low-Confidence Fallback Governor</span>
            </div>
            <p>
              If the top retrieved similarity score is below <strong>0.55</strong>, the retriever flags the query as <code>LOW_RETRIEVAL_CONFIDENCE</code>. The agent is forbidden from drafting an ungrounded hallucinated answer, and the deterministic escalation policy routes the customer to human tier-2 support.
            </p>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/components/intent-classification')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Intent Classification
          </button>
          <button
            onClick={() => onNavigate('/docs/components/reply-generation')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Grounded Reply Drafting</span>
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
