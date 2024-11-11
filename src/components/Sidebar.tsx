'use client';

import { motion } from "framer-motion";
import { Search, Package, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { componentConfigs } from '@/config/components';
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

  const filteredComponents = useMemo(() => 
    Object.entries(groupedComponents).reduce((acc, [category, components]) => {
      const filtered = components.filter(component => 
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    }, {} as Record<string, ComponentConfig[]>),
    [searchQuery]
  );

  return (
    <aside className="w-80 h-screen flex flex-col bg-[var(--background)] border-r border-[var(--border-color)]">
      <div className="p-5 relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[var(--border-color)] before:to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-[#222] flex items-center justify-center backdrop-blur-sm">
              <Package className="w-6 h-6 text-gray-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--component-bg)] flex items-center justify-center">
              <span className="text-[10px] font-bold">{Object.values(filteredComponents).flat().length}</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Components</h2>
            <p className="text-xs text-gray-500 font-medium">Drag & Compose</p>
          </div>
        </div>

        <div className="mt-6 relative group">
          <div className="absolute inset-0 bg-[var(--component-bg)] rounded-xl opacity-50 group-focus-within:opacity-100 transition-opacity" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-300 transition-colors" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-transparent rounded-xl pl-11 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] border border-[var(--border-color)] focus:border-[var(--hover-border)] focus:outline-none transition-all"
          />
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {Object.entries(filteredComponents).map(([category, components]) => (
          <motion.div 
            key={category} 
            className="mb-3 last:mb-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--component-bg)] transition-colors group"
            >
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`} 
              />
              <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
                {category}
              </span>
              <span className="ml-auto text-xs text-gray-500">{components.length}</span>
            </button>
            
            {expandedCategory === category && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 ml-2 pl-2 border-l border-[var(--border-color)]"
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
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${component.type}`,
    data: { type: 'new', component }
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        group p-1.5 rounded-lg hover:bg-[var(--hover-bg)] cursor-move
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-lg bg-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--hover-border)] transition-colors">
            <component.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
          </div>
          <div className="absolute inset-0 bg-[var(--border-color)] rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{component.name}</p>
          <p className="text-xs text-gray-500 truncate group-hover:text-gray-400 transition-colors">{component.description}</p>
        </div>
      </div>
    </motion.div>
  );
}; 