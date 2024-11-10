import { Code } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const CodeConfig: ComponentConfig = {
  type: 'Code',
  name: 'Code Block',
  icon: Code,
  category: 'Advanced',
  description: 'Syntax highlighted code',
  examples: ['```js\nconst x = 1;\n```'],
  config: [
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      options: [
        { value: 'plaintext', label: 'Plain Text' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'json', label: 'JSON' },
        { value: 'markdown', label: 'Markdown' },
        { value: 'yaml', label: 'YAML' },
        { value: 'bash', label: 'Bash' }
      ]
    },
    {
      name: 'filename',
      label: 'Filename (optional)',
      type: 'text',
      placeholder: 'example.js'
    }
  ],
  markdownGenerator: (component) => {
    const language = component.config?.language || 'plaintext';
    const filename = component.config?.filename;
    
    if (filename) {
      return `\`\`\`${language}:${filename}\n${component.content}\n\`\`\``;
    }
    return `\`\`\`${language}\n${component.content}\n\`\`\``;
  }
}; 