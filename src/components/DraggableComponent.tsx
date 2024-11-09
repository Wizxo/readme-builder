'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Component } from '@/app/builder/page';
import { ConfigPanel } from './ConfigPanel';

interface Props {
  component: Component;
  onUpdate?: (id: string, updates: Partial<Component>) => void;
  onDelete?: (id: string) => void;
}

export function DraggableComponent({ component, onUpdate, onDelete }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  function handleUpdate(id: string, updates: Partial<Component>) {
    onUpdate?.(id, updates);
    setShowConfig(false);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        ref={setNodeRef}
        style={style}
        className={`component-card group relative bg-component-bg rounded-lg ${isDragging ? 'z-50' : ''}`}
      >
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" 
          {...attributes} 
          {...listeners}
        >
          <GripVertical className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="p-4 pl-12">
          <div className="flex items-center justify-between">
            <span className="font-medium">{component.type}</span>
            <button 
              onClick={() => setShowConfig(true)}
              className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-400">{component.content}</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConfig && (
          <ConfigPanel
            component={component}
            onUpdate={handleUpdate}
            onClose={() => setShowConfig(false)}
            onDelete={onDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
}

