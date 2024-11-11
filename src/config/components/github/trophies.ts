import { Trophy } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const TrophiesConfig: ComponentConfig = {
  type: 'Trophies',
  name: 'GitHub Trophies',
  icon: Trophy,
  category: 'GitHub',
  description: 'Display GitHub profile trophies',
  examples: ['![Trophies](https://github-profile-trophy.vercel.app/?username=username)'],
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
        { value: 'flat', label: 'Flat' },
        { value: 'onedark', label: 'One Dark' },
        { value: 'gruvbox', label: 'Gruvbox' },
        { value: 'dracula', label: 'Dracula' },
        { value: 'monokai', label: 'Monokai' }
      ]
    },
    {
      name: 'row',
      label: 'Number of Rows',
      type: 'number',
      placeholder: '1'
    },
    {
      name: 'column',
      label: 'Number of Columns',
      type: 'number',
      placeholder: '6'
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username || 'username';
    const theme = component.config?.theme || 'flat';
    const row = component.config?.row || '1';
    const column = component.config?.column || '6';
    
    return `![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&row=${row}&column=${column})`;
  }
};