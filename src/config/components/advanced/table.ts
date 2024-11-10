import { Table } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const TableConfig: ComponentConfig = {
  type: 'Table',
  name: 'Table',
  icon: Table,
  category: 'Advanced',
  description: 'Data tables with alignment',
  examples: ['| Header | Header |\n|--------|--------|\n| Cell | Cell |'],
  config: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'number',
      placeholder: '2'
    },
    {
      name: 'alignment',
      label: 'Column Alignment',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const columns = parseInt(component.config?.columns || '2');
    const alignment = component.config?.alignment || 'left';
    const rows = component.content.split('\n');
    
    const alignMap = {
      left: ':---',
      center: ':---:',
      right: '---:'
    };

    const header = `|${' Header |'.repeat(columns)}`;
    const align = `|${` ${alignMap[alignment]} |`.repeat(columns)}`;
    const cells = rows.map(row => `|${' Cell |'.repeat(columns)}`);

    return [header, align, ...cells].join('\n');
  }
}; 