import { Footprints } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const FootnoteConfig: ComponentConfig = {
  type: 'Footnote',
  name: 'Footnote',
  icon: Footprints,
  category: 'Advanced',
  description: 'Reference-style footnotes',
  examples: ['Here is a footnote[^1]\n\n[^1]: Footnote content'],
  config: [
    {
      name: 'id',
      label: 'Footnote ID',
      type: 'text',
      placeholder: '1'
    }
  ],
  markdownGenerator: (component) => {
    const id = component.config?.id || '1';
    return `[^${id}]: ${component.content}`;
  }
}; 