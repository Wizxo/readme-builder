import { Code } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const LanguagesConfig: ComponentConfig = {
  type: 'Languages',
  name: 'Top Languages',
  icon: Code,
  category: 'GitHub',
  description: 'Display most used programming languages',
  examples: ['![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=username)'],
  config: [
    {
      name: 'username',
      label: 'GitHub Username',
      type: 'text',
      placeholder: 'your-username'
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      options: [
        { value: 'compact', label: 'Compact' },
        { value: 'default', label: 'Default' },
        { value: 'donut', label: 'Donut Chart' },
        { value: 'pie', label: 'Pie Chart' }
      ]
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'dark', label: 'Dark' },
        { value: 'radical', label: 'Radical' },
        { value: 'merko', label: 'Merko' },
        { value: 'tokyonight', label: 'Tokyo Night' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username || 'username';
    const layout = component.config?.layout || 'compact';
    const theme = component.config?.theme || 'default';
    
    return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=${layout}&theme=${theme})`;
  }
}; 