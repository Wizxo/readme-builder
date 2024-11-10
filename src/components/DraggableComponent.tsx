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

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`
        group relative bg-component-bg rounded-xl
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isDragOverlay ? 'shadow-2xl ring-1 ring-white/10 w-[200px]' : 'hover:ring-1 hover:ring-white/10'}
      `}
      {...attributes}
    >
      <div
        {...listeners}
        className="absolute left-0 inset-y-0 w-12 flex items-center justify-center cursor-move hover:bg-white/5 rounded-l-xl"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>

      <div className={`pl-12 ${isDragOverlay ? 'pr-4' : 'pr-24'} py-4`}>
        <span className="text-sm font-medium text-gray-300">{component.type}</span>
        {!isDragOverlay && (
          <p className="text-sm text-gray-400 mt-2 line-clamp-1">{component.content}</p>
        )}
      </div>

      {!isDragOverlay && (
        <div className="absolute right-0 inset-y-0 flex items-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => onOpenConfig?.(component)}
            className="h-full px-4 hover:bg-white/5 text-gray-500"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete?.(component.id)}
            className="h-full px-4 hover:bg-red-500/10 hover:text-red-400 text-gray-500 rounded-r-xl"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

