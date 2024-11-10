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
  AlignRight,
  Image as ImageIcon,
  Link,
  Table2,
  FileVideo,
  Footprints,
  Hash,
  AtSign,
  Keyboard,
  GitGraph,
  FileWarning,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Eye,
  Flame,
  Trophy,
  Share2
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
    examples: ['**Bold**', '*Italic*', '~~Strikethrough~~', '`Code`', '<sub>Subscript</sub>'],
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
          { value: 'code', label: 'Code' },
          { value: 'subscript', label: 'Subscript' },
          { value: 'superscript', label: 'Superscript' },
          { value: 'highlight', label: 'Highlighted' }
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
      const style = component.config?.style;
      const alignment = component.config?.alignment;
      let content = component.content;

      switch (style) {
        case 'bold': content = `**${content}**`; break;
        case 'italic': content = `*${content}*`; break;
        case 'strikethrough': content = `~~${content}~~`; break;
        case 'code': content = `\`${content}\``; break;
        case 'subscript': content = `<sub>${content}</sub>`; break;
        case 'superscript': content = `<sup>${content}</sup>`; break;
        case 'highlight': content = `<mark>${content}</mark>`; break;
      }

      if (alignment === 'center') {
        return `<div align="center">${content}</div>`;
      } else if (alignment === 'right') {
        return `<div align="right">${content}</div>`;
      }
      return content;
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
      },
      {
        name: 'nested',
        label: 'Nested Level',
        type: 'number',
        placeholder: '0'
      }
    ],
    markdownGenerator: (component) => {
      const type = component.config?.type;
      const nested = parseInt(component.config?.nested || '0');
      const indent = '  '.repeat(nested);
      const items = component.content.split('\n');
      
      return items.map(item => {
        switch (type) {
          case 'ordered': return `${indent}1. ${item}`;
          case 'task': return `${indent}- [ ] ${item}`;
          default: return `${indent}- ${item}`;
        }
      }).join('\n');
    }
  },

  Table: {
    type: 'Table',
    name: 'Table',
    icon: Table,
    category: 'Advanced',
    description: 'Data tables with alignment',
    examples: ['| Header | Header |\n|--------|--------|\n| Cell | Cell |'],
    config: [
      {
        name: 'columns',
        label: 'Columns',
        type: 'number',
        placeholder: '2'
      },
      {
        name: 'alignment',
        label: 'Column Alignment',
        type: 'select',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const columns = parseInt(component.config?.columns || '2');
      const alignment = component.config?.alignment || 'left';
      const rows = component.content.split('\n');
      
      const alignMap = {
        left: ':---',
        center: ':---:',
        right: '---:'
      };

      const header = `|${' Header |'.repeat(columns)}`;
      const align = `|${` ${alignMap[alignment]} |`.repeat(columns)}`;
      const cells = rows.map(row => `|${' Cell |'.repeat(columns)}`);

      return [header, align, ...cells].join('\n');
    }
  },

  Code: {
    type: 'Code',
    name: 'Code Block',
    icon: Code,
    category: 'Advanced',
    description: 'Syntax highlighted code',
    examples: ['```js\nconst x = 1;\n```'],
    config: [
      {
        name: 'language',
        label: 'Language',
        type: 'select',
        options: [
          { value: 'plaintext', label: 'Plain Text' },
          { value: 'javascript', label: 'JavaScript' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'html', label: 'HTML' },
          { value: 'css', label: 'CSS' },
          { value: 'json', label: 'JSON' },
          { value: 'markdown', label: 'Markdown' },
          { value: 'yaml', label: 'YAML' },
          { value: 'bash', label: 'Bash' }
        ]
      },
      {
        name: 'filename',
        label: 'Filename (optional)',
        type: 'text',
        placeholder: 'example.js'
      }
    ],
    markdownGenerator: (component) => {
      const language = component.config?.language || 'plaintext';
      const filename = component.config?.filename;
      
      if (filename) {
        return `\`\`\`${language}:${filename}\n${component.content}\n\`\`\``;
      }
      return `\`\`\`${language}\n${component.content}\n\`\`\``;
    }
  },

  Quote: {
    type: 'Quote',
    name: 'Blockquote',
    icon: Quote,
    category: 'Essential',
    description: 'Quoted text blocks',
    examples: ['> Quote'],
    config: [
      {
        name: 'nested',
        label: 'Nested Level',
        type: 'number',
        placeholder: '1'
      }
    ],
    markdownGenerator: (component) => {
      const nested = parseInt(component.config?.nested || '1');
      return component.content.split('\n')
        .map(line => `${'> '.repeat(nested)}${line}`)
        .join('\n');
    }
  },

  Details: {
    type: 'Details',
    name: 'Collapsible Section',
    icon: AlertCircle,
    category: 'Advanced',
    description: 'Expandable content section',
    examples: ['<details>\n<summary>Title</summary>\nContent\n</details>'],
    config: [
      {
        name: 'summary',
        label: 'Summary',
        type: 'text',
        placeholder: 'Click to expand'
      }
    ],
    markdownGenerator: (component) => {
      const summary = component.config?.summary || 'Details';
      return `<details>\n<summary>${summary}</summary>\n\n${component.content}\n</details>`;
    }
  },

  Math: {
    type: 'Math',
    name: 'Math Equation',
    icon: FunctionSquare,
    category: 'Advanced',
    description: 'Mathematical equations',
    examples: ['$E = mc^2$', '$$\ny = mx + b\n$$'],
    config: [
      {
        name: 'display',
        label: 'Display Mode',
        type: 'select',
        options: [
          { value: 'inline', label: 'Inline' },
          { value: 'block', label: 'Block' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const display = component.config?.display === 'block';
      return display ? `$$\n${component.content}\n$$` : `$${component.content}$`;
    }
  },

  Image: {
    type: 'Image',
    name: 'Image',
    icon: ImageIcon,
    category: 'Media',
    description: 'Images with optional alignment',
    examples: ['![Alt text](url)'],
    config: [
      {
        name: 'url',
        label: 'Image URL',
        type: 'text',
        placeholder: 'https://example.com/image.png'
      },
      {
        name: 'alt',
        label: 'Alt Text',
        type: 'text',
        placeholder: 'Description of image'
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
      },
      {
        name: 'size',
        label: 'Size',
        type: 'text',
        placeholder: '100px or 50%'
      }
    ],
    markdownGenerator: (component) => {
      const url = component.config?.url;
      const alt = component.config?.alt || '';
      const alignment = component.config?.alignment;
      const size = component.config?.size;
      
      let img = `![${alt}](${url})`;
      if (size) {
        img = `<img src="${url}" alt="${alt}" width="${size}">`;
      }
      
      if (alignment === 'center') {
        return `<div align="center">${img}</div>`;
      } else if (alignment === 'right') {
        return `<div align="right">${img}</div>`;
      }
      return img;
    }
  },

  Link: {
    type: 'Link',
    name: 'Link',
    icon: Link,
    category: 'Essential',
    description: 'Links with optional title',
    examples: ['[Text](url "title")'],
    config: [
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://example.com'
      },
      {
        name: 'title',
        label: 'Title (tooltip)',
        type: 'text',
        placeholder: 'Optional hover text'
      }
    ],
    markdownGenerator: (component) => {
      const url = component.config?.url;
      const title = component.config?.title;
      return title 
        ? `[${component.content}](${url} "${title}")`
        : `[${component.content}](${url})`;
    }
  },

  Reference: {
    type: 'Reference',
    name: 'GitHub Reference',
    icon: Hash,
    category: 'GitHub',
    description: 'GitHub-specific references',
    examples: ['#123', '@username', 'username/repo#123'],
    config: [
      {
        name: 'type',
        label: 'Reference Type',
        type: 'select',
        options: [
          { value: 'issue', label: 'Issue/PR' },
          { value: 'user', label: 'User' },
          { value: 'commit', label: 'Commit' },
          { value: 'repository', label: 'Repository' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const type = component.config?.type;
      const content = component.content;
      
      switch (type) {
        case 'issue': return `#${content}`;
        case 'user': return `@${content}`;
        case 'commit': return `${content.slice(0, 7)}`;
        case 'repository': return `${content}`;
        default: return content;
      }
    }
  },

  Alert: {
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
  },

  Mermaid: {
    type: 'Mermaid',
    name: 'Mermaid Diagram',
    icon: GitGraph,
    category: 'Advanced',
    description: 'Mermaid.js diagrams',
    examples: ['```mermaid\ngraph TD;\nA-->B;\n```'],
    config: [
      {
        name: 'type',
        label: 'Diagram Type',
        type: 'select',
        options: [
          { value: 'graph', label: 'Flowchart' },
          { value: 'sequenceDiagram', label: 'Sequence' },
          { value: 'classDiagram', label: 'Class' },
          { value: 'stateDiagram', label: 'State' },
          { value: 'erDiagram', label: 'Entity Relationship' },
          { value: 'gantt', label: 'Gantt' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      return `\`\`\`mermaid\n${component.content}\n\`\`\``;
    }
  },

  Keyboard: {
    type: 'Keyboard',
    name: 'Keyboard Keys',
    icon: Keyboard,
    category: 'GitHub',
    description: 'Keyboard key combinations',
    examples: ['<kbd>Ctrl</kbd> + <kbd>C</kbd>'],
    config: [
      {
        name: 'keys',
        label: 'Keys',
        type: 'text',
        placeholder: 'Ctrl+C, Command+V, etc.'
      }
    ],
    markdownGenerator: (component) => {
      return component.content
        .split('+')
        .map(key => `<kbd>${key.trim()}</kbd>`)
        .join(' + ');
    }
  },

  Footnote: {
    type: 'Footnote',
    name: 'Footnote',
    icon: Footprints,
    category: 'Advanced',
    description: 'Reference-style footnotes',
    examples: ['Here is a footnote[^1]\n\n[^1]: Footnote content'],
    config: [
      {
        name: 'id',
        label: 'Footnote ID',
        type: 'text',
        placeholder: '1'
      }
    ],
    markdownGenerator: (component) => {
      const id = component.config?.id || '1';
      return `[^${id}]: ${component.content}`;
    }
  },

  Stats: {
    type: 'Stats',
    name: 'GitHub Stats',
    icon: GitGraph,
    category: 'GitHub',
    description: 'GitHub profile statistics',
    examples: ['![GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername)'],
    config: [
      {
        name: 'username',
        label: 'GitHub Username',
        type: 'text',
        placeholder: 'yourusername'
      },
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'dark', label: 'Dark' },
          { value: 'radical', label: 'Radical' },
          { value: 'merko', label: 'Merko' },
          { value: 'tokyonight', label: 'Tokyo Night' }
        ]
      },
      {
        name: 'showIcons',
        label: 'Show Icons',
        type: 'boolean'
      }
    ],
    markdownGenerator: (component) => {
      const username = component.config?.username;
      const theme = component.config?.theme;
      const showIcons = component.config?.showIcons;
      return `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=${showIcons})`;
    }
  },

  TopLanguages: {
    type: 'TopLanguages',
    name: 'Top Languages',
    icon: Code,
    category: 'GitHub',
    description: 'Most used programming languages',
    examples: ['![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername)'],
    config: [
      {
        name: 'username',
        label: 'GitHub Username',
        type: 'text',
        placeholder: 'yourusername'
      },
      {
        name: 'layout',
        label: 'Layout',
        type: 'select',
        options: [
          { value: 'compact', label: 'Compact' },
          { value: 'default', label: 'Default' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const username = component.config?.username;
      const layout = component.config?.layout;
      return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=${layout})`;
    }
  },

  VisitorsBadge: {
    type: 'VisitorsBadge',
    name: 'Visitors Count',
    icon: Eye,
    category: 'GitHub',
    description: 'Profile visitors counter',
    examples: ['![Visitors](https://visitor-badge.laobi.icu/badge?page_id=username.username)'],
    config: [
      {
        name: 'username',
        label: 'GitHub Username',
        type: 'text',
        placeholder: 'yourusername'
      }
    ],
    markdownGenerator: (component) => {
      const username = component.config?.username;
      return `![Visitors](https://visitor-badge.laobi.icu/badge?page_id=${username}.${username})`;
    }
  },

  Streak: {
    type: 'Streak',
    name: 'GitHub Streak',
    icon: Flame,
    category: 'GitHub',
    description: 'GitHub streak statistics',
    examples: ['![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=yourusername)'],
    config: [
      {
        name: 'username',
        label: 'GitHub Username',
        type: 'text',
        placeholder: 'yourusername'
      },
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'dark', label: 'Dark' },
          { value: 'highcontrast', label: 'High Contrast' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const username = component.config?.username;
      const theme = component.config?.theme;
      return `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme})`;
    }
  },

  TrophyStats: {
    type: 'TrophyStats',
    name: 'GitHub Trophies',
    icon: Trophy,
    category: 'GitHub',
    description: 'GitHub profile trophies',
    examples: ['![Trophies](https://github-profile-trophy.vercel.app/?username=yourusername)'],
    config: [
      {
        name: 'username',
        label: 'GitHub Username',
        type: 'text',
        placeholder: 'yourusername'
      },
      {
        name: 'theme',
        label: 'Theme',
        type: 'select',
        options: [
          { value: 'flat', label: 'Flat' },
          { value: 'onedark', label: 'One Dark' },
          { value: 'gruvbox', label: 'Gruvbox' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const username = component.config?.username;
      const theme = component.config?.theme;
      return `![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme})`;
    }
  },

  SocialBadges: {
    type: 'SocialBadges',
    name: 'Social Badges',
    icon: Share2,
    category: 'Social',
    description: 'Social media badges and links',
    examples: ['[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/username)'],
    config: [
      {
        name: 'platform',
        label: 'Platform',
        type: 'select',
        options: [
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'twitter', label: 'Twitter' },
          { value: 'dev', label: 'Dev.to' },
          { value: 'medium', label: 'Medium' },
          { value: 'hashnode', label: 'Hashnode' }
        ]
      },
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'yourusername'
      }
    ],
    markdownGenerator: (component) => {
      const platform = component.config?.platform;
      const username = component.config?.username;
      const badges = {
        linkedin: {
          badge: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white',
          url: `https://linkedin.com/in/${username}`
        },
        twitter: {
          badge: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white',
          url: `https://twitter.com/${username}`
        },
        dev: {
          badge: 'https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white',
          url: `https://dev.to/${username}`
        }
        // Add more platforms as needed
      };
      
      const badge = badges[platform];
      return `[![${platform}](${badge.badge})](${badge.url})`;
    }
  },

  TechStack: {
    type: 'TechStack',
    name: 'Tech Stack',
    icon: Code,
    category: 'Skills',
    description: 'Technology stack and skills badges',
    examples: ['![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)'],
    config: [
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: 'programming', label: 'Programming Languages' },
          { value: 'frontend', label: 'Frontend Development' },
          { value: 'backend', label: 'Backend Development' },
          { value: 'mobile', label: 'Mobile Development' },
          { value: 'ai', label: 'AI/ML' },
          { value: 'database', label: 'Database' },
          { value: 'dataViz', label: 'Data Visualization' },
          { value: 'devops', label: 'DevOps' },
          { value: 'baas', label: 'Backend as a Service' },
          { value: 'framework', label: 'Frameworks' },
          { value: 'testing', label: 'Testing' },
          { value: 'static', label: 'Static Site Generators' },
          { value: 'game', label: 'Game Engines' },
          { value: 'automation', label: 'Automation' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        name: 'technology',
        label: 'Technology',
        type: 'select',
        options: [], // This will be dynamically populated based on category
      },
      {
        name: 'style',
        label: 'Badge Style',
        type: 'select',
        options: [
          { value: 'for-the-badge', label: 'Large' },
          { value: 'flat', label: 'Flat' },
          { value: 'plastic', label: 'Plastic' }
        ]
      }
    ],
    markdownGenerator: (component) => {
      const tech = getTechConfig(component.config?.technology);
      const style = component.config?.style || 'for-the-badge';
      return `![${tech.name}](https://img.shields.io/badge/${tech.name}-${tech.color}?style=${style}&logo=${tech.logo}&logoColor=${tech.logoColor})`;
    }
  },

  WorkflowBadges: {
    type: 'WorkflowBadges',
    name: 'Workflow Badges',
    icon: GitBranch,
    category: 'GitHub',
    description: 'GitHub Actions and workflow status badges',
    examples: ['![GitHub Actions](https://github.com/username/repo/workflows/CI/badge.svg)'],
    config: [
      {
        name: 'type',
        label: 'Badge Type',
        type: 'select',
        options: [
          { value: 'workflow', label: 'Workflow Status' },
          { value: 'coverage', label: 'Code Coverage' },
          { value: 'license', label: 'License' },
          { value: 'version', label: 'Version' }
        ]
      },
      {
        name: 'repo',
        label: 'Repository',
        type: 'text',
        placeholder: 'username/repository'
      }
    ],
    markdownGenerator: (component) => {
      const type = component.config?.type;
      const repo = component.config?.repo;
      
      switch (type) {
        case 'workflow':
          return `![GitHub Actions](https://github.com/${repo}/workflows/CI/badge.svg)`;
        case 'coverage':
          return `![Coverage](https://img.shields.io/codecov/c/github/${repo})`;
        case 'license':
          return `![License](https://img.shields.io/github/license/${repo})`;
        case 'version':
          return `![Version](https://img.shields.io/github/v/release/${repo})`;
        default:
          return '';
      }
    }
  }
};

// Add this comprehensive tech stack configuration
const techStackConfig = {
  programming: {
    javascript: {
      name: 'JavaScript',
      color: '%23323330',
      logo: 'javascript',
      logoColor: '%23F7DF1E'
    },
    typescript: {
      name: 'TypeScript',
      color: '%23007ACC',
      logo: 'typescript',
      logoColor: 'white'
    },
    python: {
      name: 'Python',
      color: '%233776AB',
      logo: 'python',
      logoColor: 'white'
    },
    // Add more programming languages...
  },
  frontend: {
    react: {
      name: 'React',
      color: '%2361DAFB',
      logo: 'react',
      logoColor: '%23000000'
    },
    vue: {
      name: 'Vue.js',
      color: '%234FC08D',
      logo: 'vuedotjs',
      logoColor: 'white'
    },
    angular: {
      name: 'Angular',
      color: '%23DD0031',
      logo: 'angular',
      logoColor: 'white'
    },
    // Add more frontend technologies...
  },
  backend: {
    nodejs: {
      name: 'Node.js',
      color: '%23339933',
      logo: 'nodedotjs',
      logoColor: 'white'
    },
    express: {
      name: 'Express.js',
      color: '%23000000',
      logo: 'express',
      logoColor: 'white'
    },
    // Add more backend technologies...
  },
  mobile: {
    react_native: {
      name: 'React Native',
      color: '%2361DAFB',
      logo: 'react',
      logoColor: '%23000000'
    },
    flutter: {
      name: 'Flutter',
      color: '%2302569B',
      logo: 'flutter',
      logoColor: 'white'
    },
    // Add more mobile technologies...
  },
  ai: {
    tensorflow: {
      name: 'TensorFlow',
      color: '%23FF6F00',
      logo: 'tensorflow',
      logoColor: 'white'
    },
    pytorch: {
      name: 'PyTorch',
      color: '%23EE4C2C',
      logo: 'pytorch',
      logoColor: 'white'
    },
    // Add more AI/ML technologies...
  },
  database: {
    mongodb: {
      name: 'MongoDB',
      color: '%2347A248',
      logo: 'mongodb',
      logoColor: 'white'
    },
    postgresql: {
      name: 'PostgreSQL',
      color: '%23316192',
      logo: 'postgresql',
      logoColor: 'white'
    },
    // Add more databases...
  },
  devops: {
    docker: {
      name: 'Docker',
      color: '%232496ED',
      logo: 'docker',
      logoColor: 'white'
    },
    kubernetes: {
      name: 'Kubernetes',
      color: '%23326CE5',
      logo: 'kubernetes',
      logoColor: 'white'
    },
    // Add more DevOps tools...
  },
  baas: {
    firebase: {
      name: 'Firebase',
      color: '%23FFCA28',
      logo: 'firebase',
      logoColor: '%23000000'
    },
    supabase: {
      name: 'Supabase',
      color: '%233ECF8E',
      logo: 'supabase',
      logoColor: 'white'
    },
    // Add more BaaS options...
  },
  testing: {
    jest: {
      name: 'Jest',
      color: '%23C21325',
      logo: 'jest',
      logoColor: 'white'
    },
    cypress: {
      name: 'Cypress',
      color: '%2317202C',
      logo: 'cypress',
      logoColor: 'white'
    },
    // Add more testing frameworks...
  }
  // Add more categories...
};

// Helper function to get tech configuration
function getTechConfig(techKey: string) {
  // Traverse through categories to find the tech config
  for (const category of Object.values(techStackConfig)) {
    if (category[techKey]) {
      return category[techKey];
    }
  }
  return null;
}

// Add this function to dynamically update technology options based on category
function updateTechnologyOptions(category: string) {
  const technologies = techStackConfig[category] || {};
  return Object.entries(technologies).map(([value, tech]) => ({
    value,
    label: tech.name
  }));
}

export function generateMarkdown(component: Component): string {
  const config = componentConfigs[component.type];
  if (!config?.markdownGenerator) return component.content;
  
  return config.markdownGenerator(component);
} 