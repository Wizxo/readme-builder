'use client';

import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import { Search, Package, ChevronDown } from "lucide-react";
import { useState } from "react";
import { componentConfigs, type ComponentConfig } from '@/lib/componentConfig';

const groupedComponents = Object.values(componentConfigs).reduce((acc, config) => {
  const category = config.category || 'Other';
  if (!acc[category]) acc[category] = [];
  acc[category].push(config);
  return acc;
}, {} as Record<string, ComponentConfig[]>);

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';
    
    const preview = document.createElement('div');
    preview.className = 'bg-[#1a1a1a] border border-[#333] p-3 rounded-lg shadow-2xl';
    preview.textContent = componentType;
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, 0, 0);
    setTimeout(() => preview.remove(), 0);
  };

  const filteredComponents = Object.entries(groupedComponents).reduce((acc, [category, components]) => {
    const filtered = components.filter(component => 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {} as Record<string, ComponentConfig[]>);

  return (
    <aside className="w-80 h-screen flex flex-col bg-[#1a1a1a] border-r border-[#333]">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-[#333] flex items-center justify-center">
            <Package className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <h2 className="text-base font-medium text-white">Components</h2>
            <p className="text-xs text-gray-500">Configure component</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[#222] rounded-lg pl-9 pr-4 text-sm text-gray-300 placeholder:text-gray-400 border border-[#333] focus:border-[#444] focus:outline-none transition-colors"
          />
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3">
        <NavigationMenu>
          {Object.entries(filteredComponents).map(([category, components]) => (
            <motion.div
              key={category}
              className="mb-2 rounded-lg bg-[#222] overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {category}
                <ChevronDown 
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    expandedCategory === category ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedCategory === category && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-[#333]"
                >
                  {components.map((component) => (
                    <div
                      key={component.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component.type)}
                      className="group p-2 hover:bg-white/5 cursor-move transition-colors"
                    >
                      <div className="flex items-center gap-3 p-2 rounded-md">
                        <div className="w-8 h-8 rounded-md bg-[#333] flex items-center justify-center group-hover:bg-[#444] transition-colors">
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
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </NavigationMenu>
      </nav>
    </aside>
  );
} 