import { AtSign } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const SocialLinksConfig: ComponentConfig = {
  type: 'SocialLinks',
  name: 'Social Links',
  icon: AtSign,
  category: 'Social',
  description: 'Add social media profile links',
  examples: ['[![Twitter](twitter-badge)](https://twitter.com/username)'],
  config: [
    {
      name: 'platform',
      label: 'Platform',
      type: 'select',
      options: [
        { value: 'github', label: 'GitHub' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'dev', label: 'Dev.to' },
        { value: 'medium', label: 'Medium' }
      ]
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: '@username'
    },
    {
      name: 'showStats',
      label: 'Show Stats',
      type: 'boolean'
    }
  ],
  markdownGenerator: (component) => {
    const platform = component.config?.platform;
    const username = component.config?.username;
    const showStats = component.config?.showStats;

    if (platform === 'github' && showStats) {
      return `[![GitHub followers](https://img.shields.io/github/followers/${username}?label=Follow&style=social)](https://github.com/${username})`;
    }

    return `[![${platform}](https://img.shields.io/badge/${platform}-${username}-blue?style=flat-square&logo=${platform})](https://${platform}.com/${username})`;
  }
}; 