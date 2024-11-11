import { Eye } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ProfileViewsConfig: ComponentConfig = {
  type: 'ProfileViews',
  name: 'Profile Views',
  icon: Eye,
  category: 'Social',
  description: 'Add profile view counter',
  examples: ['![Profile Views](https://komarev.com/ghpvc/?username=yourusername)'],
  config: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'GitHub username'
    },
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      options: [
        { value: 'flat', label: 'Flat' },
        { value: 'flat-square', label: 'Flat Square' },
        { value: 'plastic', label: 'Plastic' }
      ]
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
        { value: 'purple', label: 'Purple' }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const username = component.config?.username;
    const style = component.config?.style || 'flat';
    const color = component.config?.color || 'blue';
    
    return `![Profile Views](https://komarev.com/ghpvc/?username=${username}&style=${style}&color=${color})`;
  }
}; 