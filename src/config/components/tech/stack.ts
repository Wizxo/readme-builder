import { Flame } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';
import { getTechConfig } from '@/config/tech-stack';

export const TechStackConfig: ComponentConfig = {
  type: 'TechStack',
  name: 'Tech Stack',
  icon: Flame,
  category: 'Tech',
  description: 'Display technology badges',
  examples: ['![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)'],
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
      name: 'technology',
      label: 'Technology',
      type: 'select',
      options: [] // Dynamically populated based on category
    },
    {
      name: 'style',
      label: 'Badge Style',
      type: 'select',
      options: [
        { value: 'flat', label: 'Flat' },
        { value: 'flat-square', label: 'Flat Square' },
        { value: 'for-the-badge', label: 'For The Badge' },
        { value: 'plastic', label: 'Plastic' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const tech = getTechConfig(component.config?.technology);
    if (!tech) return '';
    
    const style = component.config?.style || 'for-the-badge';
    return `![${tech.name}](https://img.shields.io/badge/${tech.name}-${tech.color}?style=${style}&logo=${tech.logo}&logoColor=${tech.logoColor})`;
  }
}; 