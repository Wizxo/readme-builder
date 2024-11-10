'use client';

import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DraggableComponent } from '@/components/DraggableComponent';
import { DragOverlay } from '@/components/DragOverlay';
import { Preview } from '@/components/Preview';
import { nanoid } from 'nanoid';
import { Plus, Save, Download } from 'lucide-react';
import { toast } from 'sonner';
import { ConfigPanel } from '@/components/ConfigPanel';

export interface Component {
  id: string;
  type: string;
  content: string;
  config?: Record<string, any>;
}

export default function BuilderPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeConfig, setActiveConfig] = useState<Component | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
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

  function handleSave() {
    try {
      localStorage.setItem('readme-components', JSON.stringify(components));
      toast.success('Progress saved successfully');
    } catch (error) {
      toast.error('Failed to save progress');
    }
  }

  function handleDownload() {
    try {
      const markdown = components
        .map((component) => {
          switch (component.type) {
            case 'CodeBlock':
              return `\`\`\`${component.config?.language || ''}\n${component.content}\n\`\`\``;
            case 'InlineCode':
              return `\`${component.content}\``;
            case 'Blockquote':
              return `> ${component.content}`;
            case 'TaskList':
              return `- [${component.config?.checked ? 'x' : ' '}] ${component.content}`;
            case 'Link':
              return `[${component.content}](${component.config?.url || '#'})`;
            case 'Divider':
              return '---';
            case 'Badge':
              return `![${component.config?.label || ''}](${component.content})`;
            case 'Collapsible':
              return `<details>\n<summary>${component.config?.summary || 'Details'}</summary>\n\n${component.content}\n</details>`;
            case 'Headings':
              const level = parseInt(component.config?.level?.charAt(1) || '1');
              return `${'#'.repeat(level)} ${component.content}`;
            case 'Text':
              return component.content;
            case 'Images':
              return `![${component.config?.alt || ''}](${component.content})`;
            case 'Lists':
              return `- ${component.content}`;
            case 'Tables':
              const columns = (component.config?.columns || 'Column 1, Column 2').split(',').map((c: string) => c.trim());
              return [
                `| ${columns.join(' | ')} |`,
                `| ${columns.map(() => '---').join(' | ')} |`,
                `| ${columns.map(() => component.content).join(' | ')} |`
              ].join('\n');
            default:
              return component.content;
          }
        })
        .join('\n\n');

      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'README.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('README.md downloaded successfully');
    } catch (error) {
      toast.error('Failed to download README');
    }
  }

  function handleDelete(id: string) {
    setComponents(components.filter(component => component.id !== id));
    toast.success('Component deleted');
  }

  function handleUpdate(id: string, updates: Partial<Component>) {
    setComponents(components.map(component => 
      component.id === id 
        ? { 
            ...component, 
            ...updates,
            config: {
              ...component.config,
              ...updates.config
            }
          }
        : component
    ));
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="border-b border-[#222] p-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <h1 className="text-xl font-bold">README Builder</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-component-bg hover:bg-[#252525] transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-[1fr_1px_1fr] overflow-hidden">
        <div 
          className={`overflow-auto p-8 transition-colors ${isDraggingOver ? 'bg-[#1a1a1a]/50' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <DndContext 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd} 
            collisionDetection={closestCenter}
          >
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
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onOpenConfig={setActiveConfig}
                      />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </SortableContext>
            
            <DragOverlay>
              {activeId ? (
                <DraggableComponent 
                  component={components.find(c => c.id === activeId)!}
                  isDragOverlay
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        <div className="bg-[#222222] w-px h-full" />
        
        <div className="overflow-auto p-8">
          <Preview components={components} />
        </div>

        <AnimatePresence>
          {activeConfig && (
            <ConfigPanel
              component={activeConfig}
              onUpdate={handleUpdate}
              onClose={() => setActiveConfig(null)}
              onDelete={(id) => {
                handleDelete(id);
                setActiveConfig(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

