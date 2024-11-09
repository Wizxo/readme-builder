'use client';

import { motion } from 'framer-motion';
import { Component } from '@/app/builder/page';
import { X } from 'lucide-react';

interface Props {
  component: Component;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onClose: () => void;
}

export function ConfigPanel({ component, onUpdate, onClose }: Props) {
  const configs = {
    Heading: [
      { name: 'level', type: 'select', options: ['1', '2', '3', '4', '5', '6'] },
      { name: 'alignment', type: 'select', options: ['left', 'center', 'right'] },
    ],
    Text: [
      { name: 'style', type: 'select', options: ['normal', 'bold', 'italic'] },
      { name: 'size', type: 'select', options: ['sm', 'base', 'lg', 'xl'] },
    ],
    Images: [
      { name: 'size', type: 'select', options: ['small', 'medium', 'large'] },
      { name: 'alignment', type: 'select', options: ['left', 'center', 'right'] },
    ],
  }[component.type] || [];

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-80 bg-component p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Configure {component.type}</h3>
        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
} 