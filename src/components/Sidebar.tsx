'use client';

import { motion } from "framer-motion";
import { Search, Package, ChevronDown } from "lucide-react";
import { useState } from "react";
import { componentConfigs, type ComponentConfig } from '@/lib/componentConfig';
import { useDraggable } from '@dnd-kit/core';

const groupedComponents = Object.values(componentConfigs).reduce((acc, config) => {
  const category = config.category || 'Other';
  if (!acc[category]) acc[category] = [];
  acc[category].push(config);
  return acc;
}, {} as Record<string, ComponentConfig[]>);

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredComponents = Object.entries(groupedComponents).reduce((acc, [category, components]) => {
    const filtered = components.filter(component => 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {} as Record<string, ComponentConfig[]>);

  return (
    <aside className="w-80 h-screen flex flex-col bg-[var(--background)] border-r border-[var(--border-color)]">
      <div className="p-5 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#222] flex items-center justify-center">
            <Package className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Components</h2>
            <p className="text-xs text-gray-500">Drag and drop to compose</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-[var(--component-bg)] rounded-lg pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] border border-[var(--border-color)] focus:border-[var(--hover-border)] focus:outline-none"
          />
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3">
        {Object.entries(filteredComponents).map(([category, components]) => (
          <motion.div key={category} className="mb-2 rounded-lg bg-[var(--component-bg)] overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full flex items-center justify-between p-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--text-primary)]"
            >
              {category}
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedCategory === category && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-[var(--border-color)]"
              >
                {components.map((component) => (
                  <DraggableComponentItem key={component.name} component={component} />
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </nav>
    </aside>
  );
} 

const DraggableComponentItem = ({ component }: { component: ComponentConfig }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging
  } = useDraggable({
    id: `new-${component.type}`,
    data: {
      type: 'new',
      component
    }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group p-2 hover:bg-[var(--hover-bg)] cursor-move
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-3 p-2">
        <div className="w-8 h-8 rounded-md bg-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--hover-border)]">
          <component.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-300 group-hover:text-white">{component.name}</p>
          <p className="text-xs text-gray-500 truncate">{component.description}</p>
        </div>
      </div>
    </div>
  );
}; 