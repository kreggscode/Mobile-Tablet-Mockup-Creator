'use client';

import React, { useState } from 'react';
import { Smartphone, Tablet, Check } from 'lucide-react';
import { DeviceTemplate } from '@/types';
import { deviceTemplates, getTemplatesByCategory } from '@/data/templates';

interface TemplateGalleryProps {
  selectedTemplateId?: string;
  onTemplateSelect: (template: DeviceTemplate) => void;
}

type CategoryTab = 'iphone' | 'android' | 'tablet';

export default function TemplateGallery({
  selectedTemplateId,
  onTemplateSelect,
}: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('iphone');

  const categories = [
    { id: 'iphone' as CategoryTab, label: 'iPhone', icon: Smartphone },
    { id: 'android' as CategoryTab, label: 'Android', icon: Smartphone },
    { id: 'tablet' as CategoryTab, label: 'Tablet', icon: Tablet },
  ];

  const templates = getTemplatesByCategory(activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Select Device Template
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a device frame for your mockup
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-colors
                ${activeCategory === category.id
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`
              relative group p-4 rounded-xl border-2 transition-all text-left
              ${selectedTemplateId === template.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-200 dark:ring-primary-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }
            `}
          >
            {/* Device Preview */}
            <div className="mb-3 flex justify-center">
              <div
                className={`
                  relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg
                  ${template.orientation === 'portrait' ? 'w-20 h-32' : 'w-32 h-20'}
                `}
              >
                {/* Screen */}
                <div className="absolute inset-2 bg-white rounded-md overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
                </div>
                
                {/* Notch for iPhone */}
                {template.category === 'iphone' && template.id !== 'iphone-se' && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1.5 bg-gray-800 rounded-full" />
                )}
                
                {/* Camera for Android */}
                {template.category === 'android' && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-700 rounded-full" />
                )}
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {template.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {template.orientation}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {template.screenArea.width} × {template.screenArea.height}
              </p>
            </div>

            {/* Selected Indicator */}
            {selectedTemplateId === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
