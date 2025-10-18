'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Download, Palette, Image as ImageIcon, Sparkles } from 'lucide-react';
import { DeviceTemplate, UploadedImage, BackgroundConfig } from '@/types';
import { generateMockup, downloadImage } from '@/utils/mockupGenerator';
import { backgroundTemplates } from '@/data/backgroundTemplates';

interface PreviewSectionProps {
  selectedImage?: UploadedImage;
  selectedTemplate?: DeviceTemplate;
  background: BackgroundConfig;
  onBackgroundChange: (background: BackgroundConfig) => void;
}

export default function PreviewSection({
  selectedImage,
  selectedTemplate,
  background,
  onBackgroundChange,
}: PreviewSectionProps) {
  const [mockupUrl, setMockupUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);

  useEffect(() => {
    if (selectedImage && selectedTemplate) {
      generatePreview();
    } else {
      setMockupUrl('');
    }
  }, [selectedImage, selectedTemplate, background]);

  const generatePreview = async () => {
    if (!selectedImage || !selectedTemplate) return;

    setIsGenerating(true);
    try {
      const url = await generateMockup(
        selectedImage.preview,
        selectedTemplate,
        background
      );
      setMockupUrl(url);
    } catch (error) {
      console.error('Failed to generate mockup:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (mockupUrl && selectedImage && selectedTemplate) {
      const fileName = `${selectedImage.name.split('.')[0]}-${selectedTemplate.id}.png`;
      downloadImage(mockupUrl, fileName);
    }
  };

  const backgroundPresets = [
    { type: 'solid' as const, solidColor: '#ffffff', label: 'White' },
    { type: 'solid' as const, solidColor: '#f3f4f6', label: 'Light Gray' },
    { type: 'solid' as const, solidColor: '#1f2937', label: 'Dark Gray' },
    { type: 'gradient' as const, gradientStart: '#667eea', gradientEnd: '#764ba2', gradientDirection: 'vertical', label: 'Purple' },
    { type: 'gradient' as const, gradientStart: '#f093fb', gradientEnd: '#f5576c', gradientDirection: 'vertical', label: 'Pink' },
    { type: 'gradient' as const, gradientStart: '#4facfe', gradientEnd: '#00f2fe', gradientDirection: 'vertical', label: 'Blue' },
    { type: 'gradient' as const, gradientStart: '#43e97b', gradientEnd: '#38f9d7', gradientDirection: 'vertical', label: 'Green' },
    { type: 'gradient' as const, gradientStart: '#fa709a', gradientEnd: '#fee140', gradientDirection: 'vertical', label: 'Sunset' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Preview & Adjust
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preview your mockup and customize the background
          </p>
        </div>

        <button
          onClick={() => setShowBackgroundOptions(!showBackgroundOptions)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
        >
          <Palette className="w-5 h-5" />
          Background
        </button>
      </div>

      {/* Background Options */}
      {showBackgroundOptions && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Beautiful Background Templates
            </h3>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mb-6">
            {backgroundTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => onBackgroundChange(template.config)}
                className="group relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:scale-105 transition-all shadow-md hover:shadow-xl"
                title={template.name}
              >
                <div
                  className="w-full h-full"
                  style={{ background: template.preview }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-semibold text-center truncate">
                    {template.name}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Color Picker */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Solid Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={background.type === 'solid' ? background.solidColor : '#ffffff'}
                onChange={(e) =>
                  onBackgroundChange({
                    type: 'solid',
                    solidColor: e.target.value,
                  })
                }
                className="w-16 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={background.type === 'solid' ? background.solidColor : '#ffffff'}
                onChange={(e) =>
                  onBackgroundChange({
                    type: 'solid',
                    solidColor: e.target.value,
                  })
                }
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      )}

      {/* Preview Area */}
      <div className="relative min-h-[600px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {!selectedImage || !selectedTemplate ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <ImageIcon className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No Preview Available</p>
            <p className="text-sm">Select an image and template to generate mockup</p>
          </div>
        ) : isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Generating mockup...</p>
          </div>
        ) : mockupUrl ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[600px]">
            <img
              src={mockupUrl}
              alt="Mockup preview"
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-2xl"
            />
            
            <button
              onClick={handleDownload}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </button>
          </div>
        ) : null}
      </div>

      {/* Info Cards */}
      {selectedImage && selectedTemplate && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Selected Image</p>
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {selectedImage.name}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Device Template</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {selectedTemplate.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
