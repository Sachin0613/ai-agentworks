import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeVariant {
  label: string;
  language: string;
  code: string;
}

interface CodeBlockProps {
  code?: string;
  language?: string;
  filename?: string;
  variants?: CodeVariant[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  variants,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCode = variants && variants.length > 0 ? variants[activeTab].code : code || '';
  const currentLang = variants && variants.length > 0 ? variants[activeTab].language : language;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is constrained
      const textArea = document.createElement('textarea');
      textArea.value = currentCode.trim();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-slate-400" />
          {filename && (
            <span className="text-xs font-mono text-slate-300 font-medium">{filename}</span>
          )}

          {variants && variants.length > 1 ? (
            <div className="flex items-center gap-1 ml-2 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              {variants.map((variant, idx) => (
                <button
                  key={variant.label}
                  onClick={() => setActiveTab(idx)}
                  className={`text-xs px-2.5 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === idx
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          ) : (
            !filename && (
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {currentLang}
              </span>
            )
          )}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code viewport */}
      <div className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed text-slate-200 bg-slate-950">
        <pre className="selection:bg-blue-900 selection:text-white">{currentCode.trim()}</pre>
      </div>
    </div>
  );
};
