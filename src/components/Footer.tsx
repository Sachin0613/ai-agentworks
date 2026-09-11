import React from 'react';
import { Github, ExternalLink, Bot, ArrowUpRight, BookOpen, Layers, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-slate-200 text-slate-600 text-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-sm text-slate-900">
              Hiver AI Support Agent
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              v1.0
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Explainable customer intent classification, FAISS semantic precedent retrieval, and deterministic safety escalation for Amazon customer service.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <button
            onClick={() => onNavigate('/docs/getting-started')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Quickstart
          </button>
          <button
            onClick={() => onNavigate('/docs/architecture')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Architecture
          </button>
          <button
            onClick={() => onNavigate('/docs/phases')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            20 Phases
          </button>
          <button
            onClick={() => onNavigate('/docs/components/sandbox')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Simulator
          </button>
          <a
            href="https://github.com/Sachin0613/Hiver-ai-customer-agent.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-900 font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Repo</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </a>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>
          © 2026 <strong className="text-slate-600">Hiver AI Support Agent</strong>. Python 3.12 | FAISS | scikit-learn | React.
        </p>
        <a
          href="https://github.com/Sachin0613/Hiver-ai-customer-agent.git"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <span>github.com/Sachin0613/Hiver-ai-customer-agent</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </footer>
  );
};
