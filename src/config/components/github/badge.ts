import { Shield } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const BadgeConfig: ComponentConfig = {
  type: 'Badge',
  name: 'Badge',
  icon: Shield,
  category: 'GitHub',
  description: 'Add status badges and shields',
  examples: ['![License](https://img.shields.io/badge/license-MIT-blue)'],
  config: [
    {
      name: 'type',
      label: 'Badge Type',
      type: 'select',
      options: [
        { value: 'custom', label: 'Custom' },
        { value: 'license', label: 'License' },
        { value: 'version', label: 'Version' },
        { value: 'build', label: 'Build Status' }
      ]
    },
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      placeholder: 'license',
      condition: { field: 'type', value: 'custom' }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'text',
      placeholder: 'MIT',
      condition: { field: 'type', value: 'custom' }
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      options: [
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'orange', label: 'Orange' },
        { value: 'purple', label: 'Purple' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const type = component.config?.type || 'custom';
    const label = component.config?.label || 'badge';
    const message = component.config?.message || 'message';
    const color = component.config?.color || 'blue';

    return `![${label}](https://img.shields.io/badge/${label}-${message}-${color})`;
  }
}; 