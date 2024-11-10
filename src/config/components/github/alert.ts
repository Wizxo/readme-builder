import { AlertTriangle, Info, CheckCircle, FileWarning, XCircle } from 'lucide-react';
import type { ComponentConfig } from '@/types/components';

export const AlertConfig: ComponentConfig = {
  type: 'Alert',
  name: 'Alert',
  icon: AlertTriangle,
  category: 'GitHub',
  description: 'GitHub-style alert boxes',
  examples: [
    '> [!NOTE]\n> Useful information',
    '> [!TIP]\n> Helpful advice',
    '> [!IMPORTANT]\n> Crucial information',
    '> [!WARNING]\n> Concerning information',
    '> [!CAUTION]\n> Negative potential consequences'
  ],
  config: [
    {
      name: 'type',
      label: 'Alert Type',
      type: 'select',
      options: [
        { value: 'note', label: 'Note', icon: Info },
        { value: 'tip', label: 'Tip', icon: CheckCircle },
        { value: 'important', label: 'Important', icon: AlertTriangle },
        { value: 'warning', label: 'Warning', icon: FileWarning },
        { value: 'caution', label: 'Caution', icon: XCircle }
      ]
    }
  ],
  markdownGenerator: (component) => {
    const type = (component.config?.type || 'note').toUpperCase();
    return `> [!${type}]\n> ${component.content.split('\n').join('\n> ')}`;
  }
}; 