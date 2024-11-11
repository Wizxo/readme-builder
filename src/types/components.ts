import type { LucideIcon } from 'lucide-react';
import type { Component } from '@/app/builder/page';

export interface ComponentConfig {
  type: string;
  name: string;
  icon: LucideIcon;
  description: string;
  category: string;
  examples: string[];
  config: ConfigOption[];
  markdownGenerator: (component: Component) => string;
}

export interface ConfigOption {
  name: string;
  label: string;
  type: 'segmented' | 'buttons' | 'select' | 'text' | 'number' | 'boolean' | 'textarea';
  options?: any[];
  placeholder?: string;
  condition?: { field: string; value: string };
} 