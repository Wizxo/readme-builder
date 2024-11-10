import { AlertCircle } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const DetailsConfig: ComponentConfig = {
  type: 'Details',
  name: 'Collapsible Section',
  icon: AlertCircle,
  category: 'Advanced',
  description: 'Expandable content section',
  examples: ['<details>\n<summary>Title</summary>\nContent\n</details>'],
  config: [
    {
      name: 'summary',
      label: 'Summary',
      type: 'text',
      placeholder: 'Click to expand'
    }
  ],
  markdownGenerator: (component) => {
    const summary = component.config?.summary || 'Details';
    return `<details>\n<summary>${summary}</summary>\n\n${component.content}\n</details>`;
  }
}; 