'use client';

import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { 
  Text, 
  Image, 
  Heading, 
  List, 
  Table, 
  Video, 
  Code, 
  Terminal, 
  Quote, 
  CheckSquare, 
  Link2, 
  Minus, 
  Shield, 
  ChevronDown,
  FileText,
  AlertCircle
} from "lucide-react";

const components = [
  // Documentation Essentials
  {
    category: "Essential",
    items: [
      { 
        name: "Headings", 
        icon: Heading,
        description: "Section titles (H1-H6)",
        examples: ["# Main Title", "## Section", "### Subsection"]
      },
      { 
        name: "Text", 
        icon: Text,
        description: "Paragraphs with markdown support",
        examples: ["Regular text", "**Bold**", "*Italic*", "~~Strikethrough~~"]
      },
      { 
        name: "Lists", 
        icon: List,
        description: "Ordered and unordered lists",
        examples: ["- Bullet point", "1. Numbered", "- [ ] Task"]
      }
    ]
  },
  // Code & Technical
  {
    category: "Code",
    items: [
      {
        name: "CodeBlock",
        icon: Code,
        description: "Syntax-highlighted code blocks",
        examples: ["```javascript\ncode here\n```"]
      },
      {
        name: "InlineCode",
        icon: Terminal,
        description: "Inline code snippets",
        examples: ["`code`"]
      }
    ]
  },
  // Media & Links
  {
    category: "Media",
    items: [
      { 
        name: "Images", 
        icon: Image,
        description: "Images, badges, and icons",
        examples: ["![Alt text](url)"]
      },
      {
        name: "Badge",
        icon: Shield,
        description: "Status and info badges",
        examples: ["![Badge](https://shields.io/badge/...)"]
      },
      {
        name: "Link",
        icon: Link2,
        description: "Hyperlinks and references",
        examples: ["[Text](url)"]
      }
    ]
  },
  // Advanced Elements
  {
    category: "Advanced",
    items: [
      {
        name: "Blockquote",
        icon: Quote,
        description: "Quote blocks and callouts",
        examples: ["> Quote text"]
      },
      {
        name: "TaskList",
        icon: CheckSquare,
        description: "GitHub-style task lists",
        examples: ["- [x] Completed", "- [ ] Todo"]
      },
      {
        name: "Tables",
        icon: Table,
        description: "Data tables and grids",
        examples: ["| Header | Header |\n|--------|--------|"]
      },
      {
        name: "Collapsible",
        icon: ChevronDown,
        description: "Expandable content sections",
        examples: ["<details>\n<summary>Title</summary>\nContent\n</details>"]
      }
    ]
  }
];

export function Sidebar() {
  return (
    <aside className="sidebar w-80 h-screen flex flex-col">
      <div className="p-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#333] rounded-full" />
          <div>
            <h2 className="text-lg font-bold">Components</h2>
            <p className="text-xs text-gray-500">Drag and drop to compose</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <NavigationMenu>
          {components.map((category) => (
            <section key={category.category} className="category-section">
              <div className="px-6 py-3">
                <h3 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>
              
              <div>
                {category.items.map((component) => (
                  <div
                    key={component.name}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentType', component.name);
                      e.dataTransfer.effectAllowed = 'copy';
                    }}
                    className="component-card"
                  >
                    <div className="flex items-center gap-3 px-6 py-2.5 hover:bg-[#1a1a1a] cursor-move group">
                      <div className="icon-wrapper">
                        <component.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white">
                          {component.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {component.description}
                        </p>
                      </div>
                      
                      <div className="drag-indicator">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </NavigationMenu>
      </nav>
    </aside>
  );
} 