import { 
  Text, 
  Image, 
  Heading, 
  List, 
  Table, 
  Code, 
  Terminal, 
  Quote, 
  CheckSquare, 
  Link2, 
  Minus, 
  Shield, 
  FileText,
  AlertCircle,
  GitBranch,
  FunctionSquare,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import type { Component } from "@/app/builder/page";

export interface ComponentConfig {
  type: string;
  name: string;
  icon: any; // IconType from lucide-react
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

export const componentConfigs: Record<string, ComponentConfig> = {
  Headings: {
    type: 'Headings',
    name: 'Headings',
    icon: Heading,
    category: 'Essential',
    description: 'Section titles (H1-H6)',
    examples: ['# H1', '## H2', '### H3'],
    config: [
      {
        name: 'level',
        label: 'Heading Level',
        type: 'select',
        options: [
          { value: 'h1', label: 'H1' },
          { value: 'h2', label: 'H2' },
          { value: 'h3', label: 'H3' },
          { value: 'h4', label: 'H4' },
          { value: 'h5', label: 'H5' },
          { value: 'h6', label: 'H6' },
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
      const level = parseInt(component.config?.level?.charAt(1) || '1');
      const content = component.content;
      const alignment = component.config?.alignment;
      
      if (alignment === 'center') {
        return `<h${level} align="center">${content}</h${level}>`;
      } else if (alignment === 'right') {
        return `<h${level} align="right">${content}</h${level}>`;
      }
      return `${'#'.repeat(level)} ${content}`;
    }
  },

  Text: {
    type: 'Text',
    name: 'Text',
    icon: Text,
    category: 'Essential',
    description: 'Text with formatting',
    examples: ['**Bold**', '*Italic*', '~~Strikethrough~~'],
    config: [
      {
        name: 'style',
        label: 'Text Style',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: 'italic', label: 'Italic' },
          { value: 'strikethrough', label: 'Strikethrough' },
          { value: 'code', label: 'Code' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const style = component.config?.style;
      switch (style) {
        case 'bold': return `**${component.content}**`;
        case 'italic': return `*${component.content}*`;
        case 'strikethrough': return `~~${component.content}~~`;
        case 'code': return `\`${component.content}\``;
        default: return component.content;
      }
    }
  },

  Lists: {
    type: 'Lists',
    name: 'Lists',
    icon: List,
    category: 'Essential',
    description: 'All types of lists',
    examples: ['1. Ordered', '- Unordered', '- [ ] Task'],
    config: [
      {
        name: 'type',
        label: 'List Type',
        type: 'select',
        options: [
          { value: 'unordered', label: 'Unordered' },
          { value: 'ordered', label: 'Ordered' },
          { value: 'task', label: 'Task' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const type = component.config?.type;
      const items = component.content.split('\n');
      
      return items.map(item => {
        switch (type) {
          case 'ordered': return `1. ${item}`;
          case 'task': return `- [ ] ${item}`;
          default: return `- ${item}`;
        }
      }).join('\n');
    }
  },

  // Add other components following the same pattern...
};

export function generateMarkdown(component: Component): string {
  const config = componentConfigs[component.type];
  if (!config?.markdownGenerator) return component.content;
  
  return config.markdownGenerator(component);
} 