import { Trophy } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const SkillsConfig: ComponentConfig = {
  type: 'Skills',
  name: 'Skills List',
  icon: Trophy,
  category: 'Tech',
  description: 'List your technical skills',
  examples: ['### Languages\n- JavaScript\n- Python\n- Java'],
  config: [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'languages', label: 'Languages' },
        { value: 'frameworks', label: 'Frameworks' },
        { value: 'databases', label: 'Databases' },
        { value: 'tools', label: 'Tools' }
      ]
    },
    {
      name: 'style',
      label: 'Display Style',
      type: 'select',
      options: [
        { value: 'list', label: 'Bullet List' },
        { value: 'inline', label: 'Inline Text' },
        { value: 'table', label: 'Table' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const style = component.config?.style || 'list';
    const category = component.config?.category || 'Skills';
    const items = component.content.split('\n');

    switch (style) {
      case 'inline':
        return `**${category}:** ${items.join(', ')}`;
      case 'table':
        return `| ${category} |\n|---|\n${items.map(item => `| ${item} |`).join('\n')}`;
      default:
        return `### ${category}\n${items.map(item => `- ${item}`).join('\n')}`;
    }
  }
}; 