import { Video } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const VideoConfig: ComponentConfig = {
  type: 'Video',
  name: 'Video',
  icon: Video,
  category: 'Media',
  description: 'Embed video content',
  examples: ['[![Video](thumbnail.jpg)](https://youtube.com/watch?v=...)'],
  config: [
    {
      name: 'platform',
      label: 'Platform',
      type: 'select',
      options: [
        { value: 'youtube', label: 'YouTube' },
        { value: 'vimeo', label: 'Vimeo' }
      ]
    },
    {
      name: 'url',
      label: 'Video URL',
      type: 'text',
      placeholder: 'https://youtube.com/watch?v=...'
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail URL (optional)',
      type: 'text',
      placeholder: 'https://example.com/thumbnail.jpg'
    }
  ],
  markdownGenerator: (component) => {
    const url = component.config?.url || '';
    const thumbnail = component.config?.thumbnail;
    
    if (thumbnail) {
      return `[![Video](${thumbnail})](${url})`;
    }
    return `[Video](${url})`;
  }
}; 