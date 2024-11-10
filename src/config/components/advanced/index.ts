import { TableConfig } from './table';
import { CodeConfig } from './code';
import { MermaidConfig } from './mermaid';
import { DetailsConfig } from './details';
import { MathConfig } from './math';
import { FootnoteConfig } from './footnote';

export const advancedComponents = {
  Table: TableConfig,
  Code: CodeConfig,
  Mermaid: MermaidConfig,
  Details: DetailsConfig,
  Math: MathConfig,
  Footnote: FootnoteConfig,
} as const; 