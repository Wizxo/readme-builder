import { essentialComponents } from './essential';
import { advancedComponents } from './advanced';
import { githubComponents } from './github';
import { mediaComponents } from './media';
import { techComponents } from './tech';
import { socialComponents } from './social';

export const componentConfigs = {
  ...essentialComponents,
  ...advancedComponents,
  ...githubComponents,
  ...mediaComponents,
  ...techComponents,
  ...socialComponents
} as const;

export type ComponentType = keyof typeof componentConfigs; 