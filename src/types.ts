export type StatusType = 'Implemented' | 'Partial' | 'Pending' | 'Experimental' | 'Not Implemented';

export type NavGroupId = 'getting-started' | 'project' | 'phases' | 'components' | 'evaluation' | 'developer-guide' | 'reference';

export interface NavItem {
  id: string;
  title: string;
  path: string;
  badge?: string;
  badgeType?: StatusType;
  description?: string;
}

export interface NavGroup {
  id: NavGroupId;
  title: string;
  items: NavItem[];
}

export interface PhaseInfo {
  phaseNumber: number;
  id: string;
  name: string;
  status: StatusType;
  goal: string;
  problem: string;
  inputs: string[];
  process: string[];
  outputs: string[];
  relevantFiles: string[];
  command?: string;
  expectedResult?: string;
  validation: string;
  commonProblems: string[];
  nextStep: string;
}

export interface IntentCategory {
  id: string;
  name: string;
  definition: string;
  exampleCustomerMessage: string;
  typicalHandling: string;
  potentialEscalation: string;
  sampleHistoricalResponse: string;
  precision?: number;
  recall?: number;
  f1?: number;
}

export interface DecisionLogEntry {
  id: number;
  title: string;
  decision: string;
  why: string;
  alternatives: string;
  tradeOff: string;
  result: string;
  category: 'Data' | 'Architecture' | 'Model' | 'Evaluation' | 'Safety';
}

export interface BaselineMetric {
  model: string;
  split: 'Validation (108 rows)' | 'Locked Golden Set (200 rows)';
  accuracy: number;
  macroF1: number;
  macroPrecision?: number;
  macroRecall?: number;
  notes: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'NLP & ML' | 'Architecture & RAG' | 'Evaluation & Safety';
  definition: string;
  contextInProject: string;
}

export interface FaqItem {
  question: string;
  category: 'General' | 'Data & Retrieval' | 'Agent & LLM' | 'Evaluation & Reproducibility';
  answer: string;
}

export interface TroubleshootingItem {
  issue: string;
  symptom: string;
  rootCause: string;
  fixSteps: string[];
  command?: string;
  verification?: string;
}

export interface FailureModeItem {
  id: string;
  category: string;
  exampleCustomerMessage: string;
  groundTruth: string;
  baselinePrediction: string;
  whyItFailed: string;
  hypothesis: string;
  proposedFix: string;
}

export interface SimulatedQueryResult {
  customerMessage: string;
  predictedIntent: string;
  confidence: number;
  retrievedExamples: Array<{
    id: string;
    similarity: number;
    customerQuery: string;
    agentReply: string;
  }>;
  escalationDecision: 'AUTO_HANDLE' | 'ESCALATE';
  escalationReason?: string;
  draftReply: string;
  evidenceIndices: number[];
  uncertaintyNotes?: string;
}
