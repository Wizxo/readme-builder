import { HeadingsConfig } from './headings';
import { TextConfig } from './text';
import { ListsConfig } from './lists';
import { QuoteConfig } from './quote';
import { LinkConfig } from './link';

export const essentialComponents = {
  Headings: HeadingsConfig,
  Text: TextConfig,
  Lists: ListsConfig,
  Quote: QuoteConfig,
  Link: LinkConfig,
} as const; 