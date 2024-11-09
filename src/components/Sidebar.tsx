'use client';

import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { Text, Image, Heading, List, Table, Video } from "lucide-react";

const components = [
  { 
    name: "Text", 
    icon: Text,
    description: "Regular paragraphs and text blocks"
  },
  { 
    name: "Images", 
    icon: Image,
    description: "Images, badges, and icons"
  },
  { 
    name: "Headings", 
    icon: Heading,
    description: "Section titles and subtitles"
  },
  { 
    name: "Lists", 
    icon: List,
    description: "Ordered and unordered lists"
  },
  { 
    name: "Tables", 
    icon: Table,
    description: "Data tables and grids"
  },
  { 
    name: "Media", 
    icon: Video,
    description: "Videos and animated content"
  },
];

export function Sidebar() {
  return (
    <aside className="sidebar w-80 h-screen p-8">
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Components</h2>
        <p className="text-sm text-gray-400">Drag and drop to build your README</p>
      </div>
      
      <NavigationMenu>
        <div className="grid gap-4">
          {components.map((component) => (
            <div
              key={component.name}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('componentType', component.name);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              className="component-card group cursor-move p-4 hover:border-gray-700 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-black/20">
                  <component.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium mb-1">{component.name}</p>
                  <p className="text-sm text-gray-400">{component.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NavigationMenu>
    </aside>
  );
} 