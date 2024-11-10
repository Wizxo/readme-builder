'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Settings, GripVertical, Trash2 } from 'lucide-react';
import type { Component } from '@/app/builder/page';

interface Props {
  component: Component;
  onUpdate?: (id: string, updates: Partial<Component>) => void;
  onOpenConfig?: (component: Component) => void;
  onDelete?: (id: string) => void;
  isDragOverlay?: boolean;
}

export function DraggableComponent({ 
  component, 
  onUpdate, 
  onOpenConfig,
  onDelete,
  isDragOverlay 
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: component.id,
    disabled: isDragOverlay 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-component-bg rounded-xl
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isDragOverlay ? 'shadow-2xl ring-2 ring-white/10' : 'hover:ring-2 hover:ring-white/10'}
        transition-all duration-200
      `}
      {...attributes}
    >
      {/* Drag Handle - Always Visible */}
      <div
        {...listeners}
        className="absolute left-0 inset-y-0 w-12 flex items-center justify-center cursor-move hover:bg-white/5 transition-colors rounded-l-xl"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>

      {/* Action Buttons - Appear on Hover */}
      {!isDragOverlay && (
        <div className="absolute right-0 inset-y-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onOpenConfig?.(component)}
            className="h-full px-4 hover:bg-white/5 text-gray-500 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete?.(component.id)}
            className="h-full px-4 hover:bg-red-500/10 hover:text-red-400 text-gray-500 transition-colors rounded-r-xl"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="pl-12 pr-24 py-4">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{component.type}</span>
        </div>
        <p className="text-sm text-gray-400">{component.content}</p>
      </div>
    </motion.div>
  );
}

