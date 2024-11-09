'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import type { Component } from '@/app/builder/page';

interface Props {
  components: Component[];
}

export function Preview({ components }: Props) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const markdown = components
    .map((component) => {
      switch (component.type) {
        case 'CodeBlock':
          return `\`\`\`${component.config?.language || ''}\n${component.content}\n\`\`\``;
        case 'InlineCode':
          return `\`${component.content}\``;
        case 'Blockquote':
          return `> ${component.content}`;
        case 'TaskList':
          return `- [${component.config?.checked ? 'x' : ' '}] ${component.content}`;
        case 'Link':
          return `[${component.content}](${component.config?.url || '#'})`;
        case 'Divider':
          return '---';
        case 'Badge':
          return `![${component.config?.label || ''}](${component.content})`;
        case 'Collapsible':
          return `<details>\n<summary>${component.config?.summary || 'Details'}</summary>\n\n${component.content}\n</details>`;
        case 'Headings':
          return `# ${component.content}`;
        case 'Text':
          return component.content;
        case 'Images':
          return `![${component.content}](${component.content})`;
        case 'Lists':
          return `- ${component.content}`;
        case 'Tables':
          return `| Column 1 | Column 2 |\n|----------|----------|\n| ${component.content} | Content |`;
        default:
          return component.content;
      }
    })
    .join('\n\n');

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex items-center gap-2 ml-auto bg-component-bg rounded-lg p-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'preview' ? 'bg-[#333] text-white' : 'text-gray-400'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'code' ? 'bg-[#333] text-white' : 'text-gray-400'
            }`}
          >
            Markdown
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {activeTab === 'preview' ? (
            <div className="prose prose-invert max-w-none p-8 bg-component-bg rounded-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          ) : (
            <pre className="p-8 bg-component-bg rounded-lg">
              <code className="text-sm font-mono">{markdown}</code>
            </pre>
          )}
        </motion.div>
      </div>
    </div>
  );
} 