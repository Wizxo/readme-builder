'use client';

import { motion } from 'framer-motion';
import { Component } from '@/app/builder/page';
import { X, Trash2, Type, ChevronRight } from 'lucide-react';
import { componentConfigs } from '@/lib/componentConfig';

interface Props {
  component: Component;
  onUpdate: (id: string, updates: Partial<Component>) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function ConfigPanel({ component, onUpdate, onClose, onDelete }: Props) {
  const config = componentConfigs[component.type];
  const configs = config?.config || [];

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

      case 'text':
        return (
          <input
            type="text"
            value={component.config?.[config.name] || ''}
            onChange={(e) => onUpdate(component.id, {
              config: { ...component.config, [config.name]: e.target.value }
            })}
            className="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-300"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={component.config?.[config.name] || ''}
            onChange={(e) => onUpdate(component.id, {
              config: { ...component.config, [config.name]: e.target.value }
            })}
            className="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-300"
          />
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
      className="fixed right-0 top-0 h-screen w-96 bg-[#1a1a1a] shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-[#333]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#333] rounded-md">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-medium">{component.type}</h3>
            <p className="text-xs text-gray-500">Configure component</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-md text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Content Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Content</label>
          <textarea
            value={component.content}
            onChange={(e) => onUpdate(component.id, { content: e.target.value })}
            className="w-full h-24 bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-sm text-gray-300 resize-none"
          />
        </div>

        {/* Config Inputs */}
        {configs.map((config) => (
          <div key={config.name} className="space-y-2">
            <label className="text-sm text-gray-400">{config.label}</label>
            {renderConfigInput(config, component, onUpdate)}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#333] bg-[#1a1a1a]">
        <button 
          onClick={() => onDelete(component.id)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete Component
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
} 