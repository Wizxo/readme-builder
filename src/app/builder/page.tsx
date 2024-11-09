'use client';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DraggableComponent } from '@/components/DraggableComponent';
import { Preview } from '@/components/Preview';
import { nanoid } from 'nanoid';
import { Plus, Save, Download } from 'lucide-react';

export interface Component {
  id: string;
  type: string;
  content: string;
  config?: Record<string, string>;
}

export default function BuilderPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id);
      const newIndex = components.findIndex((item) => item.id === over.id);
      
      const newComponents = [...components];
      const [removed] = newComponents.splice(oldIndex, 1);
      newComponents.splice(newIndex, 0, removed);
      
      setComponents(newComponents);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingOver(false);
    const componentType = e.dataTransfer.getData('componentType');
    if (!componentType) return;
    
    const newComponent: Component = {
      id: nanoid(),
      type: componentType,
      content: `New ${componentType}`,
    };
    
    setComponents([...components, newComponent]);
  }

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-[#222] p-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <h1 className="text-xl font-bold">README Builder</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-component-bg hover:bg-[#252525] transition-colors">
              <Save className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-[1fr_1px_1fr] overflow-hidden">
        <div 
          className={`overflow-auto p-8 transition-colors ${isDraggingOver ? 'bg-[#1a1a1a]/50' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDraggingOver(true);
          }}
          onDragLeave={() => setIsDraggingOver(false)}
        >
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={components} strategy={verticalListSortingStrategy}>
              <motion.div layout className="space-y-4 max-w-2xl mx-auto">
                <AnimatePresence mode="popLayout">
                  {components.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-2 border-dashed border-gray-800 rounded-lg p-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-4 rounded-full bg-gray-800/50">
                          <Plus className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-lg text-gray-400 mb-2">
                            Start Building Your README
                          </p>
                          <p className="text-sm text-gray-500">
                            Drag components from the sidebar or click to add
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    components.map((component) => (
                      <DraggableComponent 
                        key={component.id} 
                        component={component}
                      />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </SortableContext>
          </DndContext>
        </div>

        <div className="bg-[#222222] w-px h-full" />
        
        <div className="overflow-auto p-8">
          <Preview components={components} />
        </div>
      </div>
    </div>
  );
}