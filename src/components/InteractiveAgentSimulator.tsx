import React, { useState } from 'react';
import { Play, Sparkles, ShieldAlert, CheckCircle2, RefreshCw, Cpu, Database, Search } from 'lucide-react';
import { SimulatedQueryResult } from '../types';

const SAMPLE_QUERIES: Array<{ label: string; text: string }> = [
  {
    label: 'Package Tracking',
    text: 'Where is my order #402-998124? Carrier says delayed in transit since yesterday.',
  },
  {
    label: 'Account 2FA Lockout',
    text: 'Someone hacked my account and changed the phone number. I cannot receive the 2FA SMS code to log in!',
  },
  {
    label: 'Legal Threat',
    text: 'If my refund for order #108-992 is not in my bank by 5 PM, my attorney will be contacting your corporate legal department.',
  },
  {
    label: 'Return / Refund Drop-off',
    text: 'Can I drop off this return package at Kohl\'s without printing a box label or taping it?',
  },
  {
    label: 'Unauthorized Credit Card Billing',
    text: 'I saw an unauthorized charge of $149.00 on my Chase statement from Amazon yesterday. I never authorized this!',
  },
  {
    label: 'Ambiguous / Out-of-Domain',
    text: 'Hello, what is the weather forecast for Seattle tomorrow afternoon?',
  },
];

export const InteractiveAgentSimulator: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_QUERIES[0].text);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulatedQueryResult | null>(null);

  const simulateAgent = (message: string) => {
    setIsRunning(true);
    setResult(null);

    setTimeout(() => {
      const lower = message.toLowerCase();
      let intent = 'delivery_tracking';
      let confidence = 0.82;
      let decision: 'AUTO_HANDLE' | 'ESCALATE' = 'AUTO_HANDLE';
      let reason: string | undefined = undefined;

      // Deterministic rule simulation matching Phase 10 rules
      if (lower.includes('hack') || lower.includes('2fa') || lower.includes('password') || lower.includes('log in') || lower.includes('compromised')) {
        intent = 'account_access';
        confidence = 0.88;
        decision = 'ESCALATE';
        reason = 'Security Rule #1: Account access & authentication credentials must be escalated to human security team immediately.';
      } else if (lower.includes('attorney') || lower.includes('lawyer') || lower.includes('sue') || lower.includes('court') || lower.includes('legal')) {
        intent = 'feedback_or_other';
        confidence = 0.74;
        decision = 'ESCALATE';
        reason = 'Legal Risk Rule #2: Explicit legal threat or litigation keyword detected.';
      } else if (lower.includes('unauthorized') || (lower.includes('charge') && lower.includes('$'))) {
        intent = 'payment_billing';
        confidence = 0.85;
        decision = 'ESCALATE';
        reason = 'Financial Rule #3: Unauthorized credit transaction dispute exceeds automated self-service boundary.';
      } else if (lower.includes('weather') || lower.includes('forecast') || lower.length < 15) {
        intent = 'feedback_or_other';
        confidence = 0.31;
        decision = 'ESCALATE';
        reason = 'Confidence Floor Rule #4: Classifier confidence (0.31) < 0.40 or low domain similarity.';
      } else if (lower.includes('return') || lower.includes('refund') || lower.includes('kohl') || lower.includes('drop off')) {
        intent = 'returns_refunds';
        confidence = 0.91;
        decision = 'AUTO_HANDLE';
      } else if (lower.includes('prime') || lower.includes('membership')) {
        intent = 'prime_membership';
        confidence = 0.89;
        decision = 'AUTO_HANDLE';
      }

      // Simulated FAISS retrieval results
      const retrievedExamples = [
        {
          id: 'AMZN-RET-1094',
          similarity: intent === 'feedback_or_other' && confidence < 0.4 ? 0.42 : 0.86,
          customerQuery: intent === 'returns_refunds'
            ? 'Can I return an Amazon item at Kohl\'s without a printer?'
            : intent === 'delivery_tracking'
            ? 'My package is delayed in transit. Tracking number shows no update.'
            : 'Customer inquiry related to Amazon customer service.',
          agentReply: intent === 'returns_refunds'
            ? 'Yes! You can choose Kohl\'s drop-off at amzn.to/returns. No box or printed label required; just present the QR code.'
            : intent === 'delivery_tracking'
            ? 'We understand you are waiting on your package. Please track latest carrier scans via amzn.to/orders. Deliveries can take 24-48 hrs after carrier scan.'
            : 'Please reach out to our dedicated support specialists at amzn.to/help.',
        },
        {
          id: 'AMZN-RET-2841',
          similarity: intent === 'feedback_or_other' && confidence < 0.4 ? 0.38 : 0.78,
          customerQuery: intent === 'returns_refunds'
            ? 'How do I generate a QR code for return drop-off?'
            : intent === 'delivery_tracking'
            ? 'Order status says arriving by 8pm but hasn\'t arrived yet.'
            : 'General support inquiry.',
          agentReply: intent === 'returns_refunds'
            ? 'Go to Your Orders -> Return or Replace Items. Select drop-off location to receive your mobile QR code.'
            : intent === 'delivery_tracking'
            ? 'Carriers deliver up until 9 PM local time. If not received after 24 hrs, you can request a replacement or refund through Your Orders.'
            : 'You can check your account settings online.',
        },
      ];

      // Grounded draft reply contract
      let draftReply = '';
      if (decision === 'AUTO_HANDLE') {
        if (intent === 'delivery_tracking') {
          draftReply = 'We understand you are tracking your package! You can review real-time transit updates and carrier details directly under Your Orders at amzn.to/orders. Please allow 24-48 hours for carrier status updates during delays.';
        } else if (intent === 'returns_refunds') {
          draftReply = 'Yes! You can return eligible items at Kohl\'s or Whole Foods without a box or printed label. Simply start your return in Your Orders at amzn.to/returns, select the drop-off location, and show the generated QR code from your phone.';
        } else {
          draftReply = 'You can manage your Amazon services and review policies through Your Account at amzn.to/help.';
        }
      } else {
        draftReply = 'This conversation has been automatically routed to a specialist. A human agent will review your inquiry with priority handling.';
      }

      setResult({
        customerMessage: message,
        predictedIntent: intent,
        confidence,
        retrievedExamples,
        escalationDecision: decision,
        escalationReason: reason,
        draftReply,
        evidenceIndices: decision === 'AUTO_HANDLE' ? [0, 1] : [],
        uncertaintyNotes: confidence < 0.85 ? 'Medium classifier margin' : undefined,
      });

      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="my-6 rounded-2xl border border-neutral-200  bg-white  p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-neutral-200  pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-black ">
              Interactive Agent Sandbox & Pipeline Trace
            </h4>
            <span className="text-xs bg-purple-50 text-purple-700   font-bold px-2 py-0.5 rounded-full border border-purple-200 ">
              Live Simulator
            </span>
          </div>
          <p className="text-xs text-neutral-500  mt-0.5">
            Test real-world customer queries to see intent classification, FAISS retrieval, escalation rules, and grounded draft reply generation.
          </p>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="mb-3">
        <span className="text-xs font-semibold text-neutral-500  block mb-1.5">
          Select a representative sample test case:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(sample.text);
                simulateAgent(sample.text);
              }}
              className="text-xs px-2.5 py-1 rounded-lg border border-neutral-200  bg-neutral-50  text-black  hover:border-neutral-400 :border-neutral-600 transition-all font-medium text-left cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Type any simulated customer support tweet..."
            className="w-full rounded-xl border border-neutral-200  bg-white  p-3 text-sm text-black  focus:border-neutral-400 :border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
          />
        </div>

        <button
          onClick={() => simulateAgent(inputText)}
          disabled={isRunning || !inputText.trim()}
          className="flex items-center gap-2 rounded-xl bg-black text-white hover:bg-neutral-800   :bg-neutral-200 px-4 py-2.5 text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Executing Pipeline Steps...</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>Run Agent Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Execution Results Trace */}
      {result && (
        <div className="mt-6 space-y-4 pt-6 border-t border-neutral-200 ">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 ">
              Pipeline Trace Execution Logs
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                result.escalationDecision === 'AUTO_HANDLE'
                  ? 'bg-emerald-50 text-emerald-700   border border-emerald-200 '
                  : 'bg-rose-50 text-rose-700   border border-rose-200 '
              }`}
            >
              {result.escalationDecision === 'AUTO_HANDLE' ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 " />
              ) : (
                <ShieldAlert className="h-3.5 w-3.5 text-rose-600 " />
              )}
              {result.escalationDecision}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 & 2: Intent & Classifier */}
            <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
              <div className="flex items-center gap-2 text-xs font-bold text-black  uppercase mb-2">
                <Cpu className="h-4 w-4 text-blue-500" />
                <span>Stage 1: Intent Classification</span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-neutral-500">Predicted Category:</span>
                <span className="font-mono text-xs font-bold text-blue-600  bg-blue-50  px-2 py-0.5 rounded border border-blue-200 ">
                  {result.predictedIntent}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-neutral-500">Model Confidence:</span>
                <span className="font-mono text-xs font-bold text-black ">
                  {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              {result.uncertaintyNotes && (
                <div className="mt-2 text-xs text-amber-600  bg-amber-50  p-1.5 rounded border border-amber-200 ">
                  Note: {result.uncertaintyNotes}
                </div>
              )}
            </div>

            {/* Stage 2: FAISS Retrieval */}
            <div className="p-4 rounded-xl border border-neutral-200  bg-white ">
              <div className="flex items-center gap-2 text-xs font-bold text-black  uppercase mb-2">
                <Database className="h-4 w-4 text-cyan-500" />
                <span>Stage 2: FAISS Retrieval (Top 2)</span>
              </div>
              <div className="space-y-2">
                {result.retrievedExamples.map((ex, i) => (
                  <div key={i} className="text-xs bg-neutral-50  p-2 rounded border border-neutral-200 ">
                    <div className="flex justify-between font-mono text-neutral-500 mb-0.5">
                      <span>[{i}] {ex.id}</span>
                      <span className="text-cyan-600  font-bold">
                        cosine: {ex.similarity.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-black  line-clamp-1 italic">
                      "{ex.agentReply}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stage 3: Escalation Reasoning */}
          {result.escalationReason && (
            <div className="p-3.5 rounded-xl border border-rose-200  bg-white  text-xs">
              <span className="font-bold text-rose-600 ">
                Triggered Escalation Reason:
              </span>
              <p className="text-black  mt-0.5">
                {result.escalationReason}
              </p>
            </div>
          )}

          {/* Stage 4: Grounded Draft Reply Contract */}
          <div className="p-4 rounded-xl border border-neutral-200  bg-black text-neutral-100 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
              <span className="text-neutral-400 font-sans font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Generated Output Contract (JSON)</span>
              </span>
              <span className="text-emerald-400 font-semibold">Status: Valid Contract</span>
            </div>
            <pre className="text-neutral-200 overflow-x-auto leading-relaxed">
{JSON.stringify(
  {
    decision: result.escalationDecision,
    intent: result.predictedIntent,
    confidence: Number(result.confidence.toFixed(3)),
    reply: result.draftReply,
    evidence_indices: result.evidenceIndices,
    unsupported_claims: [],
  },
  null,
  2
)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
