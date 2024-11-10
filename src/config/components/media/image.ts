import { Image } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ImageConfig: ComponentConfig = {
  type: 'Image',
  name: 'Image',
  icon: Image,
  category: 'Media',
  description: 'Insert images with alt text and title',
  examples: ['![Alt text](image.jpg "Title")'],
  config: [
    {
      name: 'url',
      label: 'Image URL',
      type: 'text',
      placeholder: 'https://example.com/image.jpg'
    },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      placeholder: 'Description of image'
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Image title (optional)'
    },
    {
      name: 'align',
      label: 'Alignment',
      type: 'segmented',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const url = component.config?.url || '';
    const alt = component.config?.alt || '';
    const title = component.config?.title;
    const align = component.config?.align || 'left';

    let markdown = `![${alt}](${url}${title ? ` "${title}"` : ''})`;
    
    if (align === 'center') {
      markdown = `<div align="center">\n\n${markdown}\n\n</div>`;
    } else if (align === 'right') {
      markdown = `<div align="right">\n\n${markdown}\n\n</div>`;
    }

    return markdown;
  }
}; 