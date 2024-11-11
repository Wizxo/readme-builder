import type { Component } from '@/app/builder/page';
import { componentConfigs } from '@/config/components';

export function generateMarkdown(component: Component): string {
  const config = componentConfigs[component.type];
  if (!config) {
    console.warn(`No config found for component type: ${component.type}`);
    return '';
  }

  try {
    return config.markdownGenerator(component);
  } catch (error) {
    console.error(`Error generating markdown for ${component.type}:`, error);
    return '';
  }
}