import { GitGraph } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const StatsConfig: ComponentConfig = {
  type: 'Stats',
  name: 'GitHub Stats',
  icon: GitGraph,
  category: 'GitHub',
  description: 'Display GitHub statistics',
  examples: ['![Stats](https://github-readme-stats.vercel.app/api?username=username)'],
  config: [
    {
      name: 'username',
      label: 'GitHub Username',
      type: 'text',
      placeholder: 'your-username'
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
    },
    {
      name: 'showIcons',
      label: 'Show Icons',
      type: 'boolean'
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username || 'username';
    const theme = component.config?.theme || 'default';
    const showIcons = component.config?.showIcons ? '&show_icons=true' : '';

    return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}${showIcons})`;
  }
}; 