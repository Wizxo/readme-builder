import { Heading, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const HeadingsConfig: ComponentConfig = {
  type: 'Headings',
  name: 'Headings',
  icon: Heading,
  category: 'Essential',
  description: 'Section titles (H1-H6)',
  examples: ['# H1', '## H2', '### H3'],
  config: [
    {
      name: 'level',
      label: 'Heading Level',
      type: 'select',
      options: [
        { value: 'h1', label: 'H1' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h4', label: 'H4' },
        { value: 'h5', label: 'H5' },
        { value: 'h6', label: 'H6' },
      ]
    },
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'buttons',
      options: [
        { value: 'left', icon: AlignLeft },
        { value: 'center', icon: AlignCenter },
        { value: 'right', icon: AlignRight }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const level = parseInt(component.config?.level?.charAt(1) || '1');
    const content = component.content;
    const alignment = component.config?.alignment;
    
    if (alignment === 'center') {
      return `<h${level} align="center">${content}</h${level}>`;
    } else if (alignment === 'right') {
      return `<h${level} align="right">${content}</h${level}>`;
    }
    return `${'#'.repeat(level)} ${content}`;
  }
}; 