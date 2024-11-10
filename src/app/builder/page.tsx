'use client';

import { DndContext, DragEndEvent, DragStartEvent, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverEvent, DragOverlay, useDroppable } from '@dnd-kit/core';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DraggableComponent } from '@/components/DraggableComponent';
import { Preview } from '@/components/Preview';
import { Sidebar } from "@/components/Sidebar";
import { nanoid } from 'nanoid';
import { Plus, Save, Download, Undo, Command, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { ConfigPanel } from '@/components/ConfigPanel';
import { createPortal } from 'react-dom';

export interface Component {
  id: string;
  type: string;
  content: string;
  config?: Record<string, any>;
}

function DroppableArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'drop-container',
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        h-full overflow-auto p-6
        ${isOver ? 'bg-[var(--component-bg)]' : 'bg-[var(--background)]'}
      `}
    >
      <div className="space-y-3 max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [history, setHistory] = useState<Component[][]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [activeConfig, setActiveConfig] = useState<Component | null>(null);
  const [isDraggingNew, setIsDraggingNew] = useState(false);

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
    console.log('DragStart:', {
      active: event.active,
      id: event.active.id,
      rect: event.active.rect,
      data: event.active.data?.current,
    });
    const { active } = event;
    setActiveId(active.id as string);
    setIsDraggingNew(active.data?.current?.type === 'new');
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    console.log('DragOver:', {
      active: {
        id: event.active.id,
        data: event.active.data?.current,
        rect: event.active.rect
      },
      over: event.over ? {
        id: event.over.id,
        data: event.over.data?.current,
        rect: event.over.rect
      } : null
    });
    setIsDraggingOver(!!event.over);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log('DragEnd:', {
      active: event.active,
      over: event.over,
      activeData: event.active.data?.current,
    });
    
    const { active, over } = event;
    setActiveId(null);
    setIsDraggingOver(false);
    setIsDraggingNew(false);
    
    if (!over) {
      console.log('No drop target found');
      return;
    }

    // Handle new component drops
    if (active.data?.current?.type === 'new') {
      const componentType = active.data.current.component.type;
      const newComponent: Component = {
        id: nanoid(),
        type: componentType,
        content: `New ${componentType}`,
      };
      
      if (over.id === 'drop-container') {
        // Add to the end
        setComponents(prev => [...prev, newComponent]);
      } else {
        // Insert at specific position
        const overIndex = components.findIndex((item) => item.id === over.id);
        const newComponents = [...components];
        newComponents.splice(overIndex, 0, newComponent);
        setComponents(newComponents);
      }
      
      toast.success(`Added ${componentType} component`);
      return;
    }

    // Handle reordering existing components
    if (active.id !== over.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id);
      const newIndex = components.findIndex((item) => item.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponents = [...components];
        const [removed] = newComponents.splice(oldIndex, 1);
        newComponents.splice(newIndex, 0, removed);
        setComponents(newComponents);
      }
    }
  }, [components]);

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleConfigUpdate = useCallback((id: string, updates: Partial<Component>) => {
    setComponents(components.map(component => 
      component.id === id 
        ? { ...component, ...updates } 
        : component
    ));
  }, [components]);

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      collisionDetection={closestCenter}
    >
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen">
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
          <div className="flex-1 grid grid-cols-[1fr,1px,1fr] h-[calc(100vh-3.5rem)]">
            <DroppableArea>
              {components.map((component) => (
                <DraggableComponent 
                  key={component.id} 
                  component={component}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onOpenConfig={setActiveConfig}
                />
              ))}
            </DroppableArea>

            <div className="bg-[#222] w-px h-full" />
            
            <div className="h-full overflow-auto">
              <Preview components={components} />
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {activeConfig && (
          <ConfigPanel
            component={activeConfig}
            onUpdate={handleConfigUpdate}
            onClose={() => setActiveConfig(null)}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      {typeof document !== 'undefined' && createPortal(
        <DragOverlay>
          {activeId && (
            <DraggableComponent 
              component={
                components.find(c => c.id === activeId) || {
                  id: 'new',
                  type: activeId.replace('new-', ''),
                  content: ''
                }
              }
              isDragOverlay
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

