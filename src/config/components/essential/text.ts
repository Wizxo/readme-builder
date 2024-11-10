import { Text as TextIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const TextConfig: ComponentConfig = {
  type: 'Text',
  name: 'Text',
  icon: TextIcon,
  category: 'Essential',
  description: 'Basic text with formatting',
  examples: ['Regular text', '**Bold text**', '*Italic text*'],
  config: [
    {
      name: 'style',
      label: 'Text Style',
      type: 'segmented',
      options: [
        { value: 'regular', label: 'Regular' },
        { value: 'bold', label: 'Bold' },
        { value: 'italic', label: 'Italic' },
        { value: 'strikethrough', label: 'Strikethrough' }
      ]
    },
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'buttons',
      options: [
        { value: 'left', icon: AlignLeft },
        { value: 'center', icon: AlignCenter },
        { value: 'right', icon: AlignRight }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const style = component.config?.style || 'regular';
    const content = component.content;
    const alignment = component.config?.alignment;

    let formattedText = content;
    if (style === 'bold') formattedText = `**${content}**`;
    if (style === 'italic') formattedText = `*${content}*`;
    if (style === 'strikethrough') formattedText = `~~${content}~~`;

    if (alignment === 'center') {
      return `<div align="center">\n\n${formattedText}\n\n</div>`;
    } else if (alignment === 'right') {
      return `<div align="right">\n\n${formattedText}\n\n</div>`;
    }
    return formattedText;
  }
}; 