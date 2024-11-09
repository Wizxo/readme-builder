'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Settings, GripVertical } from 'lucide-react';
import type { Component } from '@/app/builder/page';

interface Props {
  component: Component;
}

export function DraggableComponent({ component }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      className="component-card group relative"
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" {...attributes} {...listeners}>
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="p-4 pl-12">
        <div className="flex items-center justify-between">
          <span className="font-medium">{component.type}</span>
          <button className="p-1.5 rounded-md hover:bg-white/5 transition-colors">
            <Settings className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-400">{component.content}</p>
        </div>
      </div>
    </motion.div>
  );
} 