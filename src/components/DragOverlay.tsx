'use client';

import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { motion } from 'framer-motion';

export function DragOverlay({ children }: { children: React.ReactNode }) {
  return (
    <DndDragOverlay>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: 'none', opacity: 0.9 }}
      >
        {children}
      </motion.div>
    </DndDragOverlay>
  );
} 