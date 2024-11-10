import { Mail } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const ContactConfig: ComponentConfig = {
  type: 'Contact',
  name: 'Contact Info',
  icon: Mail,
  category: 'Social',
  description: 'Add contact information',
  examples: ['📧 Email: example@domain.com'],
  config: [
    {
      name: 'type',
      label: 'Contact Type',
      type: 'select',
      options: [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'website', label: 'Website' },
        { value: 'location', label: 'Location' }
      ]
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      placeholder: 'Contact information'
    },
    {
      name: 'showIcon',
      label: 'Show Icon',
      type: 'boolean'
    }
  ],
  markdownGenerator: (component) => {
    const type = component.config?.type;
    const value = component.config?.value;
    const showIcon = component.config?.showIcon;

    const icons = {
      email: '📧',
      phone: '📱',
      website: '🌐',
      location: '📍'
    };

    return showIcon 
      ? `${icons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`
      : `${type.charAt(0).toUpperCase() + type.slice(1)}: ${value}`;
  }
}; 