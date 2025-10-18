'use client';

import React, { useState } from 'react';
import { Download, Package, Loader2, CheckCircle, AlertCircle, Image as ImageIcon, FileArchive } from 'lucide-react';
import { DeviceTemplate, UploadedImage, BackgroundConfig, GeneratedMockup, AspectRatio } from '@/types';
import { generateMockup } from '@/utils/mockupGenerator';
import { generateZip } from '@/utils/zipGenerator';
import ImprovedMockupEditor from './ImprovedMockupEditor';

interface EnhancedExportSectionProps {
  images: UploadedImage[];
  selectedTemplate?: DeviceTemplate;
  background: BackgroundConfig;
}

interface MockupWithSource extends GeneratedMockup {
  originalImage: string;
}

export default function EnhancedExportSection({
  images,
  selectedTemplate,
  background,
}: EnhancedExportSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedMockups, setGeneratedMockups] = useState<MockupWithSource[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('original');

  const aspectRatios: { value: AspectRatio; label: string; description: string }[] = [
    { value: 'original', label: 'Original', description: 'Keep original size' },
    { value: '9:16', label: '9:16', description: 'Instagram Story' },
    { value: '16:9', label: '16:9', description: 'YouTube' },
    { value: '1:1', label: '1:1', description: 'Instagram Post' },
    { value: '4:5', label: '4:5', description: 'Instagram Portrait' },
    { value: '4:3', label: '4:3', description: 'Standard' },
  ];

  const handleBatchGenerate = async () => {
    if (!selectedTemplate || images.length === 0) {
      setError('Please select a template and upload at least one image');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProgress(0);
    const mockups: MockupWithSource[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const dataUrl = await generateMockup(
          image.preview,
          selectedTemplate,
          background,
          [],
          [],
          selectedAspectRatio !== 'original' ? selectedAspectRatio : undefined
        );

        const aspectSuffix = selectedAspectRatio !== 'original' ? `-${selectedAspectRatio}` : '';
        const fileName = `${image.name.split('.')[0]}-${selectedTemplate.id}${aspectSuffix}.png`;
        
        mockups.push({
          id: `${image.id}-${selectedTemplate.id}`,
          imageId: image.id,
          templateId: selectedTemplate.id,
          dataUrl,
          fileName,
          originalImage: image.preview, // Store original for regeneration
        });

        setProgress(Math.round(((i + 1) / images.length) * 100));
      }

      setGeneratedMockups(mockups);
    } catch (err) {
      setError('Failed to generate mockups. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (generatedMockups.length === 0) return;

    try {
      await generateZip(generatedMockups);
    } catch (err) {
      setError('Failed to create ZIP file. Please try again.');
      console.error(err);
    }
  };

  const handleDownloadAllPNGs = () => {
    if (generatedMockups.length === 0) return;

    // Download each mockup individually with a small delay
    generatedMockups.forEach((mockup, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.download = mockup.fileName;
        link.href = mockup.dataUrl;
        link.click();
      }, index * 200); // 200ms delay between downloads
    });
  };

  const handleUpdateMockup = (updatedMockup: GeneratedMockup) => {
    setGeneratedMockups(
      generatedMockups.map((m) => (m.id === updatedMockup.id ? { ...m, ...updatedMockup } : m))
    );
  };

  const handleDeleteMockup = (id: string) => {
    setGeneratedMockups(generatedMockups.filter((m) => m.id !== id));
  };

  const canGenerate = images.length > 0 && selectedTemplate;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          🎨 Generate & Export Mockups
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Create professional mockups with custom text, stickers, and export options
        </p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative overflow-hidden p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="relative">
            <p className="text-sm text-blue-100 mb-1 font-medium">Total Images</p>
            <p className="text-4xl font-bold text-white">{images.length}</p>
          </div>
        </div>

        <div className="relative overflow-hidden p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="relative">
            <p className="text-sm text-purple-100 mb-1 font-medium">Device Template</p>
            <p className="text-lg font-bold text-white truncate">
              {selectedTemplate?.name || 'None Selected'}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="relative">
            <p className="text-sm text-green-100 mb-1 font-medium">Generated</p>
            <p className="text-4xl font-bold text-white">{generatedMockups.length}</p>
          </div>
        </div>

        <div className="relative overflow-hidden p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="relative">
            <p className="text-sm text-orange-100 mb-1 font-medium">Aspect Ratio</p>
            <p className="text-lg font-bold text-white">{selectedAspectRatio}</p>
          </div>
        </div>
      </div>

      {/* Aspect Ratio Selector */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-indigo-200 dark:border-gray-600">
        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📐 Export Aspect Ratio
        </label>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => setSelectedAspectRatio(ratio.value)}
              className={`
                p-4 rounded-xl border-2 transition-all text-left
                ${selectedAspectRatio === ratio.value
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 hover:shadow-md'
                }
              `}
            >
              <div className="font-bold text-gray-900 dark:text-white">{ratio.label}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{ratio.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleBatchGenerate}
          disabled={!canGenerate || isProcessing}
          className={`
            flex items-center justify-center gap-3 px-8 py-5 font-bold text-lg rounded-2xl transition-all transform
            ${canGenerate && !isProcessing
              ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Processing... {progress}%
            </>
          ) : (
            <>
              <Package className="w-6 h-6" />
              Generate All Mockups
            </>
          )}
        </button>

        <button
          onClick={handleDownloadAllPNGs}
          disabled={generatedMockups.length === 0}
          className={`
            flex items-center justify-center gap-3 px-8 py-5 font-bold text-lg rounded-2xl transition-all transform
            ${generatedMockups.length > 0
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <ImageIcon className="w-6 h-6" />
          Download All PNGs
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={generatedMockups.length === 0}
          className={`
            flex items-center justify-center gap-3 px-8 py-5 font-bold text-lg rounded-2xl transition-all transform
            ${generatedMockups.length > 0
              ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-xl hover:shadow-2xl hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <FileArchive className="w-6 h-6" />
          Download ZIP
        </button>
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>Generating mockups...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Message */}
      {generatedMockups.length > 0 && !isProcessing && (
        <div className="flex items-center gap-3 p-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-green-900 dark:text-green-100 text-lg">
              🎉 Successfully generated {generatedMockups.length} mockups!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Click individual mockups to add text/stickers, or download all at once
            </p>
          </div>
        </div>
      )}

      {/* Generated Mockups Grid with Editors */}
      {generatedMockups.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ✨ Generated Mockups ({generatedMockups.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generatedMockups.map((mockup) => (
              <ImprovedMockupEditor
                key={mockup.id}
                mockup={mockup}
                originalImage={mockup.originalImage}
                template={selectedTemplate!}
                background={background}
                onUpdate={handleUpdateMockup}
                onDelete={handleDeleteMockup}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
