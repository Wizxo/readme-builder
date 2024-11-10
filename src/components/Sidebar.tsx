'use client';

import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { componentConfigs, type ComponentConfig } from '@/lib/componentConfig';

// Group components by category
const groupedComponents = Object.values(componentConfigs).reduce((acc, config) => {
  const category = config.category || 'Other';
  if (!acc[category]) acc[category] = [];
  acc[category].push(config);
  return acc;
}, {} as Record<string, ComponentConfig[]>);

export function Sidebar() {
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    e.dataTransfer.effectAllowed = 'copy';
    
    // Add a drag preview
    const preview = document.createElement('div');
    preview.className = 'bg-component-bg p-4 rounded-lg shadow-lg';
    preview.textContent = componentType;
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, 0, 0);
    setTimeout(() => preview.remove(), 0);
  };

  return (
    <aside className="sidebar w-80 h-screen flex flex-col">
      <div className="p-6 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#333] rounded-full" />
          <div>
            <h2 className="text-lg font-bold">Components</h2>
            <p className="text-xs text-gray-500">Drag and drop to compose</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <NavigationMenu>
          {Object.entries(groupedComponents).map(([category, components]) => (
            <section key={category} className="category-section">
              <div className="px-6 py-3">
                <h3 className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  {category}
                </h3>
              </div>
              
              <div>
                {components.map((component) => (
                  <div
                    key={component.name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component.type)}
                    className="component-card"
                  >
                    <div className="flex items-center gap-3 px-6 py-2.5 hover:bg-[#1a1a1a] cursor-move group">
                      <div className="icon-wrapper">
                        <component.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white">
                          {component.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {component.description}
                        </p>
                      </div>
                      
                      <div className="drag-indicator">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </NavigationMenu>
      </nav>
    </aside>
  );
} 