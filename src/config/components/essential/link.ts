import { Link } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const LinkConfig: ComponentConfig = {
  type: 'Link',
  name: 'Link',
  icon: Link,
  category: 'Essential',
  description: 'Links with optional title',
  examples: ['[Text](url "title")'],
  config: [
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      placeholder: 'https://example.com'
    },
    {
      name: 'title',
      label: 'Title (tooltip)',
      type: 'text',
      placeholder: 'Optional hover text'
    }
  ],
  markdownGenerator: (component) => {
    const url = component.config?.url;
    const title = component.config?.title;
    return title 
      ? `[${component.content}](${url} "${title}")`
      : `[${component.content}](${url})`;
  }
}; 