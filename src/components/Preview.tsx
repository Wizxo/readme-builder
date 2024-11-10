'use client';

import { useState, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, Copy, Check } from 'lucide-react';
import type { Component } from '@/app/builder/page';
import { generateMarkdown } from '@/lib/componentConfig';
import { toast } from 'sonner';

interface PreviewProps {
  components: Component[];
}

export function Preview({ components }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => 
    components.map(generateMarkdown).join('\n\n'),
    [components]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  }, [markdown]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-black/50 to-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="flex items-center gap-3 p-3 border-b border-white/[0.02]">
        <div className="flex gap-0.5 p-0.5 bg-white/[0.02] rounded-md">
          <button
            onClick={() => setActiveTab('preview')}
            className={`
              p-2 rounded transition-all
              ${activeTab === 'preview' 
                ? 'bg-white/[0.05] text-white shadow-sm' 
                : 'text-white/40 hover:text-white/60'
              }
            `}
            aria-label="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`
              p-2 rounded transition-all
              ${activeTab === 'code' 
                ? 'bg-white/[0.05] text-white shadow-sm' 
                : 'text-white/40 hover:text-white/60'
              }
            `}
            aria-label="Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleCopy}
          disabled={!markdown}
          className={`
            ml-auto p-2 rounded transition-all
            ${copied 
              ? 'bg-emerald-500/10 text-emerald-400' 
              : 'bg-white/[0.02] text-white/40 hover:text-white/60'
            }
          `}
          aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'preview' ? (
              <div className="prose prose-invert prose-p:text-white/70 prose-headings:text-white/90 prose-strong:text-white/90 prose-code:text-white/90 max-w-none rounded-lg bg-white/[0.02] p-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            ) : (
              <pre className="rounded-lg bg-white/[0.02] p-8 overflow-auto">
                <code className="text-sm font-mono text-white/70">{markdown}</code>
              </pre>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 