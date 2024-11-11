import { Eye } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ProfileViewsConfig: ComponentConfig = {
  type: 'ProfileViews',
  name: 'Profile Views Counter',
  icon: Eye,
  category: 'GitHub',
  description: 'Add a profile views counter',
  examples: ['![Profile Views](https://komarev.com/ghpvc/?username=username)'],
  config: [
    {
      name: 'username',
      label: 'GitHub Username',
      type: 'text',
      placeholder: 'your-username'
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      options: [
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
        { value: 'orange', label: 'Orange' },
        { value: 'brightgreen', label: 'Bright Green' }
      ]
    },
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      options: [
        { value: 'flat', label: 'Flat' },
        { value: 'flat-square', label: 'Flat Square' },
        { value: 'plastic', label: 'Plastic' },
        { value: 'for-the-badge', label: 'For The Badge' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username || 'username';
    const color = component.config?.color || 'blue';
    const style = component.config?.style || 'flat';
    
    return `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=${color}&style=${style})`;
  }
};