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
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Code, Copy, Check } from 'lucide-react';
import type { Component } from '@/app/builder/page';
import { generateMarkdown } from '@/lib/componentConfig';
import { toast } from 'sonner';
import type { Options } from 'react-markdown';
import type { Components as MarkdownComponents } from 'react-markdown';
import type { DetailedHTMLProps, HTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, BlockquoteHTMLAttributes } from 'react';

interface PreviewProps {
  components: Component[];
}

// Add type for HTML props
type HTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

// Add specific HTML element types
type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
type ULProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
type OLProps = DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>;
type LIProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type BlockquoteProps = DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
type TableProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
type THProps = DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
type TDProps = DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;

export function Preview({ components }: PreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const markdown = useMemo(() => 
    components.map(generateMarkdown).join('\n\n'),
    [components]
  );

  const remarkPlugins = useMemo(() => [
    remarkGfm,
    remarkMath,
    remarkBreaks,
    remarkEmoji,
    [remarkToc, { heading: 'contents', tight: true }],
    [remarkGithub, { repository: 'yourusername/readme-builder' }]
  ] as Options['remarkPlugins'], []);

  const rehypePlugins = useMemo(() => [
    rehypeRaw,
    rehypeSlug,
    rehypeKatex,
    [rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor']
      }
    }]
  ] as Options['rehypePlugins'], []);

  const markdownComponents: Partial<MarkdownComponents> = useMemo(() => ({
    code({inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          showLineNumbers
          customStyle={{ margin: 0 }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className={`${className} bg-[#1a1a1a] px-1.5 py-0.5 rounded text-sm text-white/90 font-mono`}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: (props: HeadingProps) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: (props: HeadingProps) => <h2 className="text-2xl font-bold mb-3" {...props} />,
    h3: (props: HeadingProps) => <h3 className="text-xl font-bold mb-2" {...props} />,
    p: (props: ParagraphProps) => <p className="mb-4" {...props} />,
    ul: (props: ULProps) => <ul className="list-disc list-inside mb-4" {...props} />,
    ol: (props: OLProps) => <ol className="list-decimal list-inside mb-4" {...props} />,
    li: (props: LIProps) => <li className="mb-1" {...props} />,
    a: (props: AnchorProps) => <a className="text-blue-400 hover:underline" {...props} />,
    blockquote: (props: BlockquoteProps) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
    ),
    table: (props: TableProps) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-700" {...props} />
      </div>
    ),
    th: (props: THProps) => <th className="px-4 py-2 bg-gray-800" {...props} />,
    td: (props: TDProps) => <td className="px-4 py-2 border-t border-gray-700" {...props} />
  }), []);

  const handleCopy = useCallback(async () => {
    if (!markdown) return;
    
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setTimeout(() => setCopied(false), 2000);
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
              <div className="prose prose-invert max-w-none prose-pre:bg-[#1E1E1E] prose-pre:p-4 rounded-lg bg-white/[0.02] p-8">
                <ReactMarkdown
                  remarkPlugins={remarkPlugins}
                  rehypePlugins={rehypePlugins}
                  components={markdownComponents}
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