import { GitGraph } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ContributionsConfig: ComponentConfig = {
  type: 'Contributions',
  name: 'Contribution Graph',
  icon: GitGraph,
  category: 'GitHub',
  description: 'Display GitHub contribution graph',
  examples: ['![Contributions](https://github-readme-streak-stats.herokuapp.com/?user=username)'],
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
      name: 'hide_border',
      label: 'Hide Border',
      type: 'boolean'
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username || 'username';
    const theme = component.config?.theme || 'default';
    const hideBorder = component.config?.hide_border ? '&hide_border=true' : '';
    
    return `![Contributions](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}${hideBorder})`;
  }
}; 