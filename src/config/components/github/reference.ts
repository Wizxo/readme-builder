import { Hash } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ReferenceConfig: ComponentConfig = {
  type: 'Reference',
  name: 'GitHub Reference',
  icon: Hash,
  category: 'GitHub',
  description: 'GitHub-specific references',
  examples: ['#123', '@username', 'username/repo#123'],
  config: [
    {
      name: 'type',
      label: 'Reference Type',
      type: 'select',
      options: [
        { value: 'issue', label: 'Issue/PR' },
        { value: 'user', label: 'User' },
        { value: 'commit', label: 'Commit' },
        { value: 'repository', label: 'Repository' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const type = component.config?.type;
    const content = component.content;
    
    switch (type) {
      case 'issue': return `#${content}`;
      case 'user': return `@${content}`;
      case 'commit': return `${content.slice(0, 7)}`;
      case 'repository': return `${content}`;
      default: return content;
    }
  }
}; 