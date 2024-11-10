import { FunctionSquare } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const MathConfig: ComponentConfig = {
  type: 'Math',
  name: 'Math Equation',
  icon: FunctionSquare,
  category: 'Advanced',
  description: 'Mathematical equations',
  examples: ['$E = mc^2$', '$$\ny = mx + b\n$$'],
  config: [
    {
      name: 'display',
      label: 'Display Mode',
      type: 'select',
      options: [
        { value: 'inline', label: 'Inline' },
        { value: 'block', label: 'Block' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const display = component.config?.display === 'block';
    return display ? `$$\n${component.content}\n$$` : `$${component.content}$`;
  }
}; 