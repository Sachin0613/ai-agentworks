import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { Sparkles, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface ReplyGenerationViewProps {
  onNavigate: (path: string) => void;
}

export const ReplyGenerationView: React.FC<ReplyGenerationViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'grounding-philosophy', text: 'Grounding & Hallucination Prevention' },
    { id: 'prompt-contract', text: 'Prompt Template & Evidence Context' },
    { id: 'json-schema', text: 'Structured JSON Output Contract' },
    { id: 'unsupported-claims', text: 'Handling Unsupported Claims' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Agent Components' }, { label: 'Grounded Reply Generation' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Grounded Reply Generation
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            The agent synthesizes empathetic customer replies grounded strictly in historical evidence, citing source precedent indices and penalizing hallucinated policies.
          </p>
        </div>

        {/* Philosophy */}
        <section id="grounding-philosophy" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Grounding & Hallucination Prevention</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            When customer support agents make false claims—such as inventing a 60-day return policy or quoting a nonexistent carrier contact number—the company faces legal liability and customer frustration. The agent generator adheres to four rules:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  block mb-1">1. Cite Evidence Indices</strong>
              Every sentence in the draft must derive from one of the retrieved historical examples [0, 1, 2].
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  block mb-1">2. No Dead or Invented URLs</strong>
              The model may only reference official <code>amzn.to</code> or <code>amazon.com/help</code> paths explicitly present in the evidence.
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  block mb-1">3. Zero Compensation Promises</strong>
              The agent is forbidden from issuing gift cards, discounts, or financial settlements autonomously.
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200  bg-white ">
              <strong className="text-slate-900  block mb-1">4. Honest Escalation Tone</strong>
              If historical evidence is insufficient, it drafts a polite acknowledgement and hands off to tier-2 human specialists.
            </div>
          </div>
        </section>

        {/* Prompt Contract */}
        <section id="prompt-contract" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Prompt Template & Context Contract</h2>
          <p className="text-sm text-slate-600 ">
            The generator prompt injects classified intent alongside top-3 retrieved historical pairs:
          </p>
          <CodeBlock
            code={`SYSTEM_PROMPT = """You are a senior Amazon Customer Support specialist.
Draft a concise, empathetic response based ONLY on the provided historical resolution precedents.
Rules:
1. Do not invent links or phone numbers.
2. If evidence does not cover the question, state that a human specialist must review it.
3. Output MUST be valid JSON matching the schema."""

USER_PROMPT = """CUSTOMER INQUIRY: "{query}"
PREDICTED INTENT: {intent} (Confidence: {confidence:.2f})

RETRIEVED HISTORICAL PRECEDENTS:
[0] Q: "{p0_q}" -> A: "{p0_a}" (Sim: {p0_sim:.3f})
[1] Q: "{p1_q}" -> A: "{p1_a}" (Sim: {p1_sim:.3f})
[2] Q: "{p2_q}" -> A: "{p2_a}" (Sim: {p2_sim:.3f})

Provide JSON output with 'reply', 'evidence_indices', and 'unsupported_claims'."""`}
            language="python"
          />
        </section>

        {/* JSON Schema */}
        <section id="json-schema" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Structured Output Contract Schema</h2>
          <p className="text-sm text-slate-600 ">
            The generator returns a validated schema consumed by downstream auditing systems:
          </p>
          <CodeBlock
            code={`{
  "decision": "AUTO_HANDLE",
  "intent": "delivery_tracking",
  "confidence": 0.89,
  "reply": "I understand your package is delayed. You can track carrier updates directly in 'Your Orders' on Amazon. If status does not update within 24 hours, please reach back out!",
  "evidence_indices": [0, 1],
  "escalation_reason": null,
  "unsupported_claim_notes": "None. Verified against Order History tracking workflow in evidence [0]."
}`}
            language="json"
          />
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/components/retrieval')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Retrieval
          </button>
          <button
            onClick={() => onNavigate('/docs/components/escalation')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Deterministic Escalation Policy</span>
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
