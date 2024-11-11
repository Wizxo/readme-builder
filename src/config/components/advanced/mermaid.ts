import { GitGraph } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const MermaidConfig: ComponentConfig = {
  type: 'Mermaid',
  name: 'Mermaid Diagram',
  icon: GitGraph,
  category: 'Advanced',
  description: 'Mermaid.js diagrams',
  examples: ['```mermaid\ngraph TD;\nA-->B;\n```'],
  config: [
    {
      name: 'type',
      label: 'Diagram Type',
      type: 'select',
      options: [
        { value: 'graph', label: 'Flowchart' },
        { value: 'sequenceDiagram', label: 'Sequence' },
        { value: 'classDiagram', label: 'Class' },
        { value: 'stateDiagram', label: 'State' },
        { value: 'erDiagram', label: 'Entity Relationship' },
        { value: 'gantt', label: 'Gantt' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    return `\`\`\`mermaid\n${component.content}\n\`\`\``;
  }
}; 