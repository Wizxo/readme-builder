'use client';

import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DraggableComponent } from '@/components/DraggableComponent';
import { DragOverlay } from '@/components/DragOverlay';
import { Preview } from '@/components/Preview';
import { nanoid } from 'nanoid';
import { Plus, Save, Download, Undo, Command, Settings } from 'lucide-react';
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
  const [history, setHistory] = useState<Component[][]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeConfig, setActiveConfig] = useState<Component | null>(null);

  // Load saved components on mount
  useEffect(() => {
    const saved = localStorage.getItem('readme-components');
    if (saved) {
      try {
        setComponents(JSON.parse(saved));
      } catch (error) {
        toast.error('Failed to load saved components');
      }
    }
  }, []);

  // Update history when components change
  useEffect(() => {
    if (components.length > 0) {
      setHistory(prev => [...prev.slice(-9), components]);
    }
  }, [components]);

  const handleUndo = useCallback(() => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
      setComponents(history[history.length - 2]);
    }
  }, [history]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setComponents(prev => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        
        const newComponents = [...prev];
        const [removed] = newComponents.splice(oldIndex, 1);
        newComponents.splice(newIndex, 0, removed);
        
        return newComponents;
      });
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const componentType = e.dataTransfer.getData('componentType');
    if (!componentType) return;
    
    const newComponent: Component = {
      id: nanoid(),
      type: componentType,
      content: `New ${componentType}`,
    };
    
    setComponents(prev => [...prev, newComponent]);
    toast.success(`Added ${componentType} component`);
  }, []);

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
    <div className="h-screen flex flex-col bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--background)] z-10">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium">
              README Builder
            </span>
            <div className="h-3 w-px bg-[#333]" />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Command className="w-3.5 h-3.5" />
              <span>Editor</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="p-2 rounded-md hover:bg-[#222] disabled:opacity-30 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-md hover:bg-[#222]"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-[1fr,1px,1fr] overflow-hidden">
        {/* Builder Panel */}
        <div 
          className={`
            overflow-auto p-6 transition-colors
            ${isDraggingOver ? 'bg-[var(--component-bg)]' : 'bg-[var(--background)]'}
          `}
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
              <motion.div layout className="space-y-3 max-w-2xl mx-auto">
                <AnimatePresence mode="popLayout">
                  {components.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-[#222] rounded-lg p-8 text-center bg-[#111]"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-3 rounded-full bg-[#191919]">
                          <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-200 mb-1">
                            Start Building Your README
                          </p>
                          <p className="text-sm text-gray-400">
                            Drag components from the sidebar to get started
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

        <div className="bg-[#222] w-px h-full" />
        
        <div className="overflow-auto">
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

