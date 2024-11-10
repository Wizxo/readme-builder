'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Settings, GripVertical, Trash2 } from 'lucide-react';
import type { Component } from '@/app/builder/page';

interface Props {
  component: Component;
  onOpenConfig?: (component: Component) => void;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updates: Partial<Component>) => void;
  isDragOverlay?: boolean;
}

export function DraggableComponent({ 
  component, 
  onOpenConfig,
  onDelete,
  onUpdate,
  isDragOverlay 
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: component.id.toString(),
    disabled: isDragOverlay,
    data: {
      type: 'component',
      component
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-[var(--component-bg)] rounded-xl cursor-default
        ${isDragging ? 'opacity-50' : ''}
        ${isDragOverlay ? 'shadow-lg' : ''}
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
            aria-label="Configure component"
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
    </div>
  );
}

