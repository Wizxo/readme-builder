import { Quote } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const QuoteConfig: ComponentConfig = {
  type: 'Quote',
  name: 'Blockquote',
  icon: Quote,
  category: 'Essential',
  description: 'Quoted text blocks',
  examples: ['> Quote'],
  config: [
    {
      name: 'nested',
      label: 'Nested Level',
      type: 'number',
      placeholder: '1'
    }
  ],
  markdownGenerator: (component) => {
    const nested = parseInt(component.config?.nested || '1');
    return component.content.split('\n')
      .map(line => `${'> '.repeat(nested)}${line}`)
      .join('\n');
  }
}; 