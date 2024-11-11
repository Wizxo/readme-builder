import { List } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ListsConfig: ComponentConfig = {
  type: 'Lists',
  name: 'Lists',
  icon: List,
  category: 'Essential',
  description: 'All types of lists',
  examples: ['1. Ordered', '- Unordered', '- [ ] Task'],
  config: [
    {
      name: 'type',
      label: 'List Type',
      type: 'select',
      options: [
        { value: 'unordered', label: 'Unordered' },
        { value: 'ordered', label: 'Ordered' },
        { value: 'task', label: 'Task' }
      ]
    },
    {
      name: 'nested',
      label: 'Nested Level',
      type: 'number',
      placeholder: '0'
    }
  ],
  markdownGenerator: (component) => {
    const type = component.config?.type;
    const nested = parseInt(component.config?.nested || '0');
    const indent = '  '.repeat(nested);
    const items = component.content.split('\n');
    
    return items.map(item => {
      switch (type) {
        case 'ordered': return `${indent}1. ${item}`;
        case 'task': return `${indent}- [ ] ${item}`;
        default: return `${indent}- ${item}`;
      }
    }).join('\n');
  }
}; 