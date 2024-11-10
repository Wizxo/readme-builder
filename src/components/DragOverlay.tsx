'use client';

import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';

export function DragOverlay({ children }: { children: React.ReactNode }) {
  return (
    <DndDragOverlay>
      <AnimatePresence>
        {children && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8, y: 0 }}
            animate={{ 
              scale: 1.03,
              opacity: 0.9,
              y: -4,
              transition: {
                duration: 0.2,
                ease: [0.32, 0.72, 0, 1]
              }
            }}
            exit={{ 
              scale: 1,
              opacity: 0,
              transition: { duration: 0.2 } 
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DndDragOverlay>
  );
} 