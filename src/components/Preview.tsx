'use client';

import { useState, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkGithub from 'remark-github';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, Copy, Check } from 'lucide-react';
import type { Component } from '@/app/builder/page';
import { generateMarkdown } from '@/lib/componentConfig';
import { toast } from 'sonner';

interface PreviewProps {
  components: Component[];
}

const markdownStyles = {
  p: 'text-white/70 mb-4',
  h1: 'text-white/90 text-4xl font-bold mb-6',
  h2: 'text-white/90 text-3xl font-bold mb-5',
  h3: 'text-white/90 text-2xl font-bold mb-4',
  h4: 'text-white/90 text-xl font-bold mb-4',
  h5: 'text-white/90 text-lg font-bold mb-3',
  h6: 'text-white/90 text-base font-bold mb-3',
  strong: 'text-white/90 font-bold',
  em: 'italic',
  ul: 'list-disc list-inside mb-4 text-white/70 space-y-2',
  ol: 'list-decimal list-inside mb-4 text-white/70 space-y-2',
  li: 'ml-4',
  a: 'text-blue-400 hover:underline',
  blockquote: 'border-l-4 border-white/10 pl-4 italic text-white/60 mb-4',
  table: 'w-full border-collapse mb-4',
  th: 'border border-white/10 px-4 py-2 text-left text-white/90 bg-white/5',
  td: 'border border-white/10 px-4 py-2 text-white/70',
  img: 'max-w-full h-auto rounded-lg mb-4',
  pre: 'mb-4 rounded-lg overflow-auto',
  code: 'bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm text-white/90 font-mono',
};

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
              <div className="rounded-lg bg-white/[0.02] p-8">
                <ReactMarkdown
                  remarkPlugins={[
                    remarkGfm,
                    remarkMath,
                    [remarkGithub, { repository: 'yourusername/readme-builder' }]
                  ]}
                  rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
                  components={{
                    // Map each HTML element to its styled version
                    p: ({node, ...props}) => <p className={markdownStyles.p} {...props} />,
                    h1: ({node, ...props}) => <h1 className={markdownStyles.h1} {...props} />,
                    h2: ({node, ...props}) => <h2 className={markdownStyles.h2} {...props} />,
                    h3: ({node, ...props}) => <h3 className={markdownStyles.h3} {...props} />,
                    h4: ({node, ...props}) => <h4 className={markdownStyles.h4} {...props} />,
                    h5: ({node, ...props}) => <h5 className={markdownStyles.h5} {...props} />,
                    h6: ({node, ...props}) => <h6 className={markdownStyles.h6} {...props} />,
                    strong: ({node, ...props}) => <strong className={markdownStyles.strong} {...props} />,
                    em: ({node, ...props}) => <em className={markdownStyles.em} {...props} />,
                    ul: ({node, ...props}) => <ul className={markdownStyles.ul} {...props} />,
                    ol: ({node, ...props}) => <ol className={markdownStyles.ol} {...props} />,
                    li: ({node, ...props}) => <li className={markdownStyles.li} {...props} />,
                    a: ({node, ...props}) => <a className={markdownStyles.a} {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className={markdownStyles.blockquote} {...props} />,
                    table: ({node, ...props}) => <table className={markdownStyles.table} {...props} />,
                    th: ({node, ...props}) => <th className={markdownStyles.th} {...props} />,
                    td: ({node, ...props}) => <td className={markdownStyles.td} {...props} />,
                    img: ({node, ...props}) => <img className={markdownStyles.img} {...props} />,
                    pre: ({node, ...props}) => <pre className={markdownStyles.pre} {...props} />,
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={markdownStyles.code} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
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