import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Callout } from '../components/Callout';
import { TableOfContents } from '../components/TableOfContents';
import { StatusBadge } from '../components/StatusBadge';
import { CodeBlock } from '../components/CodeBlock';
import { EscalationFlowDiagram } from '../components/Diagrams';
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock, UserCheck, ArrowRight } from 'lucide-react';

interface EscalationViewProps {
  onNavigate: (path: string) => void;
}

export const EscalationView: React.FC<EscalationViewProps> = ({ onNavigate }) => {
  const tocItems = [
    { id: 'escalation-philosophy', text: 'Escalation as a Safety Feature' },
    { id: 'decision-classes', text: 'AUTO_HANDLE vs ESCALATE' },
    { id: 'four-core-rules', text: 'The Four Deterministic Rules' },
    { id: 'rule-cascade', text: 'Rule Cascade Flowchart' },
    { id: 'implementation', text: 'Production Implementation (Python)' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-10">
        <div>
          <Breadcrumbs
            items={[{ label: 'Agent Components' }, { label: 'Deterministic Escalation Policy' }]}
            onNavigate={onNavigate}
          />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Deterministic Escalation Policy
            </h1>
            <StatusBadge status="Implemented" />
          </div>
          <p className="text-sm text-slate-600  leading-relaxed">
            The agent enforces a deterministic, zero-tolerance safety escalation governor that routes high-stakes, legally precarious, or low-confidence interactions directly to human operators.
          </p>
        </div>

        {/* Philosophy */}
        <section id="escalation-philosophy" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Escalation is a Safety Feature, Not a Failure</h2>
          <p className="text-sm text-slate-600  leading-relaxed">
            In naive chatbot architectures, routing to a human agent is penalized as an "incomplete automation." In enterprise customer service, this incentive is actively dangerous. An autonomous bot attempting to resolve an unauthorized credit card charge or legal subpoena creates catastrophic risk.
          </p>
          <Callout type="IMPORTANT" title="The Zero-Tolerance Mandate">
            Escalating appropriately is celebrated as a critical safety success. Our deterministic policy ensures that high-risk triggers <strong>completely bypass language model generation</strong>, preventing hallucinations or robotic responses in delicate scenarios.
          </Callout>
        </section>

        {/* Decision Classes */}
        <section id="decision-classes" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-200  bg-emerald-50/40  space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-700 ">AUTO_HANDLE</span>
              <StatusBadge status="Safe Automation" size="sm" />
            </div>
            <div className="text-base font-bold text-slate-900 ">Routine Support Interactions</div>
            <p className="text-xs text-slate-600 ">
              Inquiries with high model confidence (&ge;0.40), clean retrieval precedents (sim &ge;0.55), and no sensitive security or legal keywords. The agent drafts and delivers a grounded response.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-amber-200  bg-amber-50/40  space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-amber-700 ">ESCALATE</span>
              <StatusBadge status="Human Routing" size="sm" />
            </div>
            <div className="text-base font-bold text-slate-900 ">High-Risk & Ambiguous Cases</div>
            <p className="text-xs text-slate-600 ">
              Inquiries triggering credential safety, litigation threat, fraud indicators, or low statistical confidence. The agent logs an escalation reason code and transfers the customer to human tier-2 support.
            </p>
          </div>
        </section>

        {/* The Four Core Rules */}
        <section id="four-core-rules" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 ">The Four Deterministic Rules</h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 ">
                <span className="h-6 w-6 rounded-md bg-blue-100  text-blue-600  flex items-center justify-center text-xs font-mono">1</span>
                <span>Rule 1: Account Security & Credential Gate</span>
              </div>
              <p className="text-xs text-slate-600  mt-2">
                Triggers when customer message contains account takeover indicators: <code>password</code>, <code>2FA</code>, <code>OTP</code>, <code>hacked</code>, <code>compromised</code>, <code>unauthorized login</code>, or <code>authenticator</code>.
                <br />
                <strong>Reason:</strong> AI models must never solicit or process authentication secrets.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 ">
                <span className="h-6 w-6 rounded-md bg-amber-100  text-amber-600  flex items-center justify-center text-xs font-mono">2</span>
                <span>Rule 2: Legal & Regulatory Liability Gate</span>
              </div>
              <p className="text-xs text-slate-600  mt-2">
                Triggers when customer message mentions legal or formal dispute avenues: <code>lawyer</code>, <code>attorney</code>, <code>court</code>, <code>sue</code>, <code>lawsuit</code>, <code>police</code>, <code>chargeback</code>, or <code>Better Business Bureau / BBB</code>.
                <br />
                <strong>Reason:</strong> Any automated reply could be submitted as corporate evidence in litigation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 ">
                <span className="h-6 w-6 rounded-md bg-purple-100  text-purple-600  flex items-center justify-center text-xs font-mono">3</span>
                <span>Rule 3: Financial Dispute Threshold</span>
              </div>
              <p className="text-xs text-slate-600  mt-2">
                Triggers when customer reports unauthorized charges or disputes exceeding $100.
                <br />
                <strong>Reason:</strong> High-value transactions require identity verification and merchant fraud investigation.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200  bg-white ">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 ">
                <span className="h-6 w-6 rounded-md bg-rose-100  text-rose-600  flex items-center justify-center text-xs font-mono">4</span>
                <span>Rule 4: Statistical Confidence Floor</span>
              </div>
              <p className="text-xs text-slate-600  mt-2">
                Triggers when the intent classifier's predicted probability is &lt; 0.40, or top FAISS retrieval similarity score is &lt; 0.55.
                <br />
                <strong>Reason:</strong> When statistical ambiguity is high, guessing produces customer churn.
              </p>
            </div>
          </div>
        </section>

        {/* Rule Cascade Flowchart */}
        <section id="rule-cascade" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Deterministic Rule Cascade</h2>
          <EscalationFlowDiagram />
        </section>

        {/* Implementation */}
        <section id="implementation" className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 ">Production Implementation (Python)</h2>
          <CodeBlock
            code={`import re
from typing import Tuple, Optional

SECURITY_REGEX = re.compile(r'\\b(password|2fa|otp|hacked|compromised|authenticator)\\b', re.IGNORECASE)
LEGAL_REGEX = re.compile(r'\\b(lawyer|attorney|sue|lawsuit|police|chargeback|bbb|fraud)\\b', re.IGNORECASE)

def evaluate_escalation_policy(query: str, intent: str, confidence: float, retrieval_score: float) -> Tuple[str, Optional[str]]:
    # 1. Security Gate
    if SECURITY_REGEX.search(query) or intent == "account_access":
        return "ESCALATE", "SECURITY_CREDENTIAL_SAFETY"

    # 2. Legal Gate
    if LEGAL_REGEX.search(query):
        return "ESCALATE", "LEGAL_THREAT_OR_CHARGEBACK"

    # 3. Model Confidence Floor
    if confidence < 0.40:
        return "ESCALATE", f"LOW_INTENT_CONFIDENCE_{confidence:.2f}"

    # 4. Retrieval Grounding Floor
    if retrieval_score < 0.55:
        return "ESCALATE", f"LOW_RETRIEVAL_SIMILARITY_{retrieval_score:.2f}"

    return "AUTO_HANDLE", None`}
            language="python"
          />
        </section>

        <div className="pt-6 border-t border-slate-200  flex justify-between items-center">
          <button
            onClick={() => onNavigate('/docs/components/reply-generation')}
            className="text-xs font-semibold text-slate-600  hover:text-slate-900 :text-white"
          >
            &larr; Reply Generation
          </button>
          <button
            onClick={() => onNavigate('/docs/evaluation/overview')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600  hover:underline"
          >
            <span>Next: Evaluation & Benchmarks</span>
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
