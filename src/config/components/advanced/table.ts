import { Table } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const TableConfig: ComponentConfig = {
  type: 'Table',
  name: 'Markdown Table',
  icon: Table,
  category: 'Advanced',
  description: 'Create formatted markdown tables',
  examples: ['| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |'],
  config: [
    {
      name: 'columns',
      label: 'Number of Columns',
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
    },
    {
      name: 'headers',
      label: 'Headers',
      type: 'text',
      placeholder: 'Header 1, Header 2'
    }
  ],
  markdownGenerator: (component) => {
    const columns = parseInt(component.config?.columns || '2');
    const alignment = component.config?.alignment || 'left';
    const headers = (component.config?.headers || '').split(',').map(h => h.trim());
    
    const alignChar = {
      left: ':---',
      center: ':---:',
      right: '---:'
    };

    let table = '|';
    // Headers
    for (let i = 0; i < columns; i++) {
      table += ` ${headers[i] || `Header ${i + 1}`} |`;
    }
    table += '\n|';
    // Alignment row
    for (let i = 0; i < columns; i++) {
      table += ` ${alignChar[alignment]} |`;
    }
    table += '\n|';
    // Content placeholder
    for (let i = 0; i < columns; i++) {
      table += ` Content ${i + 1} |`;
    }
    
    return table;
  }
}; 