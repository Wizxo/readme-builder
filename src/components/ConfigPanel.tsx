'use client';

import { motion } from 'framer-motion';
import { Component } from '@/app/builder/page';
import { X, Plus, AlignLeft, AlignCenter, AlignRight, Trash2 } from 'lucide-react';

interface Props {
  component: Component;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function ConfigPanel({ component, onUpdate, onClose, onDelete }: Props) {
  const configs = {
    Headings: [
      {
        name: 'level',
        label: 'Heading Level',
        type: 'segmented',
        options: ['H1', 'H2', 'H3', 'H4']
      },
      {
        name: 'alignment',
        label: 'Alignment',
        type: 'buttons',
        options: [
          { value: 'left', icon: AlignLeft },
          { value: 'center', icon: AlignCenter },
          { value: 'right', icon: AlignRight }
        ]
      }
    ],
    Text: [
      {
        name: 'style',
        label: 'Text Style',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'bold', label: 'Bold' },
          { value: 'italic', label: 'Italic' },
          { value: 'code', label: 'Code Block' }
        ]
      }
    ],
    Lists: [
      {
        name: 'type',
        label: 'List Type',
        type: 'select',
        options: [
          { value: 'unordered', label: 'Bullet Points' },
          { value: 'ordered', label: 'Numbered' },
          { value: 'tasks', label: 'Task List' }
        ]
      }
    ]
  }[component.type] || [];

  function renderConfigInput(config: any, component: Component, onUpdate: (id: string, updates: Partial<Component>) => void) {
    switch (config.type) {
      case 'segmented':
        return (
          <div className="flex gap-1 bg-[#222] p-1 rounded-lg">
            {config.options.map((option: string) => (
              <button
                key={option}
                onClick={() => onUpdate(component.id, {
                  config: { ...component.config, [config.name]: option }
                })}
                className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                  component.config?.[config.name] === option 
                    ? 'bg-[#333] text-white' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'buttons':
        return (
          <div className="flex gap-2">
            {config.options.map((option: { value: string; icon: any }) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => onUpdate(component.id, {
                    config: { ...component.config, [config.name]: option.value }
                  })}
                  className={`p-2 rounded-md transition-colors ${
                    component.config?.[config.name] === option.value 
                      ? 'bg-[#333] text-white' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        );

      case 'select':
        return (
          <select
            value={component.config?.[config.name] || ''}
            onChange={(e) => onUpdate(component.id, {
              config: { ...component.config, [config.name]: e.target.value }
            })}
            className="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-300"
          >
            {config.options.map((option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed right-0 top-0 h-screen w-96 bg-[#1a1a1a] border-l border-[#333] p-6"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Configure {component.type}</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onDelete?.(component.id)}
              className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/5 rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {configs.map((config) => (
            <div key={config.name} className="space-y-2">
              <label className="text-sm text-gray-400">{config.label}</label>
              {renderConfigInput(config, component, onUpdate)}
            </div>
          ))}
        </div>

        {component.type === 'Lists' && (
          <div className="mt-6">
            <button
              onClick={() => handleAddListItem(component, onUpdate)}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              <Plus className="w-4 h-4" />
              Add List Item
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
} 