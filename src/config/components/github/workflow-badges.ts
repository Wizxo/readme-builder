import { GitBranch } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const WorkflowBadgesConfig: ComponentConfig = {
  type: 'WorkflowBadges',
  name: 'Workflow Badges',
  icon: GitBranch,
  category: 'GitHub',
  description: 'GitHub Actions and workflow status badges',
  examples: ['![GitHub Actions](https://github.com/username/repo/workflows/CI/badge.svg)'],
  config: [
    {
      name: 'type',
      label: 'Badge Type',
      type: 'select',
      options: [
        { value: 'workflow', label: 'Workflow Status' },
        { value: 'coverage', label: 'Code Coverage' },
        { value: 'license', label: 'License' },
        { value: 'version', label: 'Version' }
      ]
    },
    {
      name: 'repo',
      label: 'Repository',
      type: 'text',
      placeholder: 'username/repository'
    }
  ],
  markdownGenerator: (component) => {
    const type = component.config?.type;
    const repo = component.config?.repo;
    
    switch (type) {
      case 'workflow':
        return `![GitHub Actions](https://github.com/${repo}/workflows/CI/badge.svg)`;
      case 'coverage':
        return `![Coverage](https://img.shields.io/codecov/c/github/${repo})`;
      case 'license':
        return `![License](https://img.shields.io/github/license/${repo})`;
      case 'version':
        return `![Version](https://img.shields.io/github/v/release/${repo})`;
      default:
        return '';
    }
  }
}; 