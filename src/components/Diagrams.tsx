import React, { useState } from 'react';
import { ArrowDown, Check, ShieldAlert, Cpu, Database, FileText, Split, Sparkles, Filter } from 'lucide-react';

export const SystemArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="my-6 rounded-2xl border border-neutral-200  bg-white  p-6 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-neutral-200  pb-3">
        <div>
          <h4 className="text-base font-bold text-black ">
            End-to-End System Architecture
          </h4>
          <p className="text-xs text-neutral-500 ">
            Click any block to inspect runtime boundaries, inputs, and outputs
          </p>
        </div>
        <span className="text-xs font-mono bg-blue-50 text-blue-700   px-2.5 py-1 rounded-full border border-blue-200  font-semibold">
          Decoupled RAG + Deterministic Safety
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 py-4 max-w-2xl mx-auto">
        {/* Customer Input Node */}
        <div
          onClick={() => setActiveNode('input')}
          className={`w-full max-w-md p-3.5 rounded-xl border transition-all cursor-pointer text-center ${
            activeNode === 'input'
              ? 'border-black  bg-neutral-100  shadow-xs'
              : 'border-neutral-200  bg-neutral-50  hover:border-neutral-400 :border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-500  uppercase tracking-wider">
            <span>Entry Point</span>
          </div>
          <div className="text-sm font-bold text-black  mt-1">
            Customer Message
          </div>
          <div className="text-xs text-neutral-500  font-mono mt-0.5">
            e.g. "Where is my package #402-998?"
          </div>
        </div>

        <ArrowDown className="h-4 w-4 text-neutral-400 shrink-0" />

        {/* Preprocessing */}
        <div
          onClick={() => setActiveNode('preprocess')}
          className={`w-full max-w-md p-3.5 rounded-xl border transition-all cursor-pointer text-center ${
            activeNode === 'preprocess'
              ? 'border-black  bg-neutral-100  shadow-xs'
              : 'border-neutral-200  bg-neutral-50  hover:border-neutral-400 :border-neutral-600'
          }`}
        >
          <div className="text-xs font-semibold text-neutral-500  uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            <span>Preprocessing & Normalization</span>
          </div>
          <div className="text-sm font-bold text-black  mt-1">
            Dual Text Retention (Raw + Cleaned)
          </div>
          <div className="text-xs text-neutral-500  font-mono mt-0.5">
            Strip URLs/handles for classifier; keep casing for urgency
          </div>
        </div>

        <ArrowDown className="h-4 w-4 text-neutral-400 shrink-0" />

        {/* Parallel Branch: Intent Classifier & FAISS Retriever */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div
            onClick={() => setActiveNode('intent')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeNode === 'intent'
                ? 'border-indigo-500 bg-indigo-50/50  shadow-xs'
                : 'border-neutral-200  bg-neutral-50  hover:border-neutral-400 :border-neutral-600'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600  uppercase tracking-wider">
              <Cpu className="h-4 w-4" />
              <span>Module 1: Classifier</span>
            </div>
            <div className="text-sm font-bold text-black  mt-1">
              Provisional Intent Model
            </div>
            <p className="text-xs text-neutral-600  mt-1">
              TF-IDF + Logistic Regression across 9 categories.
            </p>
            <div className="mt-2 text-xs font-mono bg-white  p-2 rounded border border-neutral-200  text-black ">
              Output: intent + confidence score
            </div>
          </div>

          <div
            onClick={() => setActiveNode('retriever')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeNode === 'retriever'
                ? 'border-cyan-500 bg-cyan-50/50  shadow-xs'
                : 'border-neutral-200  bg-neutral-50  hover:border-neutral-400 :border-neutral-600'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600  uppercase tracking-wider">
              <Database className="h-4 w-4" />
              <span>Module 2: FAISS Retriever</span>
            </div>
            <div className="text-sm font-bold text-black  mt-1">
              Dense Vector Memory
            </div>
            <p className="text-xs text-neutral-600  mt-1">
              all-MiniLM-L6-v2 + IndexFlatIP cosine similarity.
            </p>
            <div className="mt-2 text-xs font-mono bg-white  p-2 rounded border border-neutral-200  text-black ">
              Output: Top-k historical pairs + scores
            </div>
          </div>
        </div>

        <ArrowDown className="h-4 w-4 text-neutral-400 shrink-0" />

        {/* Deterministic Escalation Policy */}
        <div
          onClick={() => setActiveNode('escalation')}
          className={`w-full max-w-lg p-4 rounded-xl border transition-all cursor-pointer text-center ${
            activeNode === 'escalation'
              ? 'border-amber-500 bg-amber-50/50  shadow-xs'
              : 'border-neutral-200  bg-neutral-50  hover:border-neutral-400 :border-neutral-600'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-600  uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Deterministic Safety Guardrail</span>
          </div>
          <div className="text-sm font-bold text-black  mt-1">
            Escalation Rule Engine
          </div>
          <p className="text-xs text-neutral-600  mt-1">
            Checks security tokens, legal phrases, confidence thresholds, and intent risk.
          </p>
        </div>

        {/* Dual Branch Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-1">
          {/* Path 1: AUTO_HANDLE */}
          <div
            onClick={() => setActiveNode('autohandle')}
            className={`p-4 rounded-xl border transition-all cursor-pointer bg-white  ${
              activeNode === 'autohandle'
                ? 'border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                : 'border-emerald-200 '
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600  uppercase">
              <Check className="h-4 w-4" />
              <span>Decision: AUTO_HANDLE</span>
            </div>
            <div className="text-sm font-bold text-black  mt-1 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Grounded LLM Generation</span>
            </div>
            <p className="text-xs text-neutral-600  mt-1">
              LLM receives query + intent + retrieved evidence to generate verified response with cited evidence indices.
            </p>
          </div>

          {/* Path 2: ESCALATE */}
          <div
            onClick={() => setActiveNode('escalate')}
            className={`p-4 rounded-xl border transition-all cursor-pointer bg-white  ${
              activeNode === 'escalate'
                ? 'border-rose-500 shadow-xs ring-1 ring-rose-500'
                : 'border-rose-200 '
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600  uppercase">
              <ShieldAlert className="h-4 w-4" />
              <span>Decision: ESCALATE</span>
            </div>
            <div className="text-sm font-bold text-black  mt-1">
              Human Specialist Handoff
            </div>
            <p className="text-xs text-neutral-600  mt-1">
              Packages message, reason code, and context payload into human agent support queue with priority escalation.
            </p>
          </div>
        </div>
      </div>

      {/* Node detail drawer */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-xl bg-neutral-100  border border-neutral-200  text-xs">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-black  uppercase tracking-wider">
              Component Details: {activeNode}
            </span>
            <button
              onClick={() => setActiveNode(null)}
              className="text-neutral-400 hover:text-black :text-white cursor-pointer"
            >
              Close
            </button>
          </div>
          {activeNode === 'input' && (
            <p className="text-neutral-600 ">
              Raw incoming tweet or API inquiry. Preserves customer ID, timestamp, and raw characters.
            </p>
          )}
          {activeNode === 'preprocess' && (
            <p className="text-neutral-600 ">
              Stripping @mentions and URL tokens for clean bag-of-words vectorization, while preserving original punctuation in raw_text for uppercase urgency analysis.
            </p>
          )}
          {activeNode === 'intent' && (
            <p className="text-neutral-600 ">
              Trained on 57,789 development conversations across 9 classes. TF-IDF n-grams + Logistic Regression with balanced class weights.
            </p>
          )}
          {activeNode === 'retriever' && (
            <p className="text-neutral-600 ">
              Dedicated 12,383 retrieval conversation split (~25k responses) indexed with all-MiniLM-L6-v2 in FAISS IndexFlatIP.
            </p>
          )}
          {activeNode === 'escalation' && (
            <p className="text-neutral-600 ">
              Hard safety boundary: overrides LLM if query touches account recovery, legal threats, financial disputes, or low similarity (&lt;0.55).
            </p>
          )}
          {activeNode === 'autohandle' && (
            <p className="text-neutral-600 ">
              Prompt enforces structured JSON: <code>{"{reply, evidence_indices, uncertainty, unsupported_claim_notes}"}</code>. Zero policy invention.
            </p>
          )}
          {activeNode === 'escalate' && (
            <p className="text-neutral-600 ">
              Routing safety mechanism preventing catastrophic failure modes on high-liability queries.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const DataPipelineDiagram: React.FC = () => {
  return (
    <div className="my-6 rounded-2xl border border-neutral-200  bg-white  p-6 shadow-xs">
      <h4 className="text-base font-bold text-black  mb-1">
        Data Pipeline & Leakage-Aware Splitting
      </h4>
      <p className="text-xs text-neutral-500  mb-6">
        Strict separation between Development, Retrieval Memory, and Held-out Golden Set
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {/* Step 1 */}
        <div className="p-4 rounded-xl border border-neutral-200  bg-neutral-50 ">
          <div className="text-xs font-bold text-blue-600  mb-1">STEP 1</div>
          <div className="text-sm font-bold text-black ">Raw Twitter Corpus</div>
          <p className="text-xs text-neutral-500  mt-1">
            2,811,774 tweets across hundreds of companies in <code>data/raw/twcs.csv</code>.
          </p>
          <div className="mt-3 text-xs font-mono bg-white  p-2 rounded border border-neutral-200  text-black ">
            inbound=True/False
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl border border-neutral-200  bg-neutral-50 ">
          <div className="text-xs font-bold text-blue-600  mb-1">STEP 2</div>
          <div className="text-sm font-bold text-black ">AmazonHelp Filtering</div>
          <p className="text-xs text-neutral-500  mt-1">
            Reconstructed 82,556 multi-turn conversations via <code>in_response_to_tweet_id</code>.
          </p>
          <div className="mt-3 text-xs font-mono bg-white  p-2 rounded border border-neutral-200  text-black ">
            76.0% direct reply rate
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
          <div className="text-xs font-bold text-blue-600  mb-1">STEP 3</div>
          <div className="text-sm font-bold text-black ">Conversation Splitting</div>
          <p className="text-xs text-neutral-500  mt-1">
            Partitioned strictly by <code>conversation_id</code> to eliminate multi-turn data leakage.
          </p>
          <div className="mt-3 text-xs font-mono bg-neutral-50  p-2 rounded border border-neutral-200  text-black ">
            0% conversation overlap
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
          <div className="text-xs font-bold text-emerald-600  mb-1">STEP 4</div>
          <div className="text-sm font-bold text-black ">Three Isolated Pools</div>
          <div className="mt-2 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600 ">
              <span>Development (70%):</span>
              <span className="font-mono font-bold text-black ">57,789 convos</span>
            </div>
            <div className="flex justify-between text-neutral-600 ">
              <span>Retrieval (15%):</span>
              <span className="font-mono font-bold text-black ">12,383 convos</span>
            </div>
            <div className="flex justify-between text-neutral-600 ">
              <span>Golden Pool (15%):</span>
              <span className="font-mono font-bold text-black ">12,384 convos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EscalationFlowDiagram: React.FC = () => {
  return (
    <div className="my-6 rounded-2xl border border-neutral-200  bg-white  p-6 shadow-xs">
      <h4 className="text-base font-bold text-black  mb-1">
        Deterministic Escalation Decision Logic
      </h4>
      <p className="text-xs text-neutral-500  mb-6">
        Priority order of deterministic safety triggers vs automated resolution
      </p>

      <div className="space-y-3 max-w-xl mx-auto">
        <div className="p-3.5 rounded-xl border border-neutral-200  bg-neutral-50  text-center text-xs font-semibold uppercase text-black ">
          Incoming Customer Query + Intent + Confidence + Retrieval Similarity
        </div>

        <div className="text-center font-mono text-xs text-neutral-400">↓ Rule 1</div>

        <div className="p-3.5 rounded-xl border border-rose-200  bg-white  flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-rose-600 ">Account Security Check:</span>
            <span className="text-neutral-600  ml-1">Intent is <code>account_access</code> or text contains password/2FA/hacked</span>
          </div>
          <span className="text-xs font-bold text-rose-600  bg-rose-50  border border-rose-200  px-2 py-0.5 rounded">
            ESCALATE
          </span>
        </div>

        <div className="text-center font-mono text-xs text-neutral-400">↓ No &rarr; Rule 2</div>

        <div className="p-3.5 rounded-xl border border-rose-200  bg-white  flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-rose-600 ">Legal Threat Check:</span>
            <span className="text-neutral-600  ml-1">Contains lawyer, attorney, court, litigation, sue, police</span>
          </div>
          <span className="text-xs font-bold text-rose-600  bg-rose-50  border border-rose-200  px-2 py-0.5 rounded">
            ESCALATE
          </span>
        </div>

        <div className="text-center font-mono text-xs text-neutral-400">↓ No &rarr; Rule 3</div>

        <div className="p-3.5 rounded-xl border border-amber-200  bg-white  flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-amber-600 ">Financial Dispute &gt; $100:</span>
            <span className="text-neutral-600  ml-1">Unauthorized charges or repeated unresolved credit billing</span>
          </div>
          <span className="text-xs font-bold text-amber-600  bg-amber-50  border border-amber-200  px-2 py-0.5 rounded">
            ESCALATE
          </span>
        </div>

        <div className="text-center font-mono text-xs text-neutral-400">↓ No &rarr; Rule 4</div>

        <div className="p-3.5 rounded-xl border border-amber-200  bg-white  flex items-center justify-between">
          <div className="text-xs">
            <span className="font-bold text-amber-600 ">Confidence / Domain Floor:</span>
            <span className="text-neutral-600  ml-1">Classifier confidence &lt; 0.40 OR Top retrieval similarity &lt; 0.55</span>
          </div>
          <span className="text-xs font-bold text-amber-600  bg-amber-50  border border-amber-200  px-2 py-0.5 rounded">
            ESCALATE
          </span>
        </div>

        <div className="text-center font-mono text-xs text-neutral-400">↓ Passes all checks</div>

        <div className="p-4 rounded-xl border border-emerald-300  bg-white  text-center">
          <div className="text-xs font-bold text-emerald-600  uppercase tracking-wider">
            Clear Operational Boundary
          </div>
          <div className="text-sm font-bold text-black  mt-1">
            AUTO_HANDLE &rarr; Generate Grounded LLM Response
          </div>
          <p className="text-xs text-neutral-600  mt-1">
            Prompt includes top historical pairs as cited evidence; enforce strict JSON response contract.
          </p>
        </div>
      </div>
    </div>
  );
};
