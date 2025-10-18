'use client';

import React, { useState } from 'react';
import { Download, Package, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { DeviceTemplate, UploadedImage, BackgroundConfig, GeneratedMockup } from '@/types';
import { generateMockup } from '@/utils/mockupGenerator';
import { generateZip } from '@/utils/zipGenerator';

interface ExportSectionProps {
  images: UploadedImage[];
  selectedTemplate?: DeviceTemplate;
  background: BackgroundConfig;
}

export default function ExportSection({
  images,
  selectedTemplate,
  background,
}: ExportSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedMockups, setGeneratedMockups] = useState<GeneratedMockup[]>([]);
  const [error, setError] = useState<string>('');

  const handleBatchGenerate = async () => {
    if (!selectedTemplate || images.length === 0) {
      setError('Please select a template and upload at least one image');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProgress(0);
    const mockups: GeneratedMockup[] = [];

    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const dataUrl = await generateMockup(
          image.preview,
          selectedTemplate,
          background
        );

        const fileName = `${image.name.split('.')[0]}-${selectedTemplate.id}.png`;
        
        mockups.push({
          id: `${image.id}-${selectedTemplate.id}`,
          imageId: image.id,
          templateId: selectedTemplate.id,
          dataUrl,
          fileName,
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

  const canGenerate = images.length > 0 && selectedTemplate;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Batch Export
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Apply template to all screenshots and download as ZIP
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Images</p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {images.length}
          </p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Template</p>
          <p className="text-lg font-bold text-purple-900 dark:text-purple-100 truncate">
            {selectedTemplate?.name || 'None'}
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-600 dark:text-green-400 mb-1">Generated</p>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
            {generatedMockups.length}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleBatchGenerate}
          disabled={!canGenerate || isProcessing}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium rounded-lg transition-all
            ${canGenerate && !isProcessing
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing... {progress}%
            </>
          ) : (
            <>
              <Package className="w-5 h-5" />
              Apply Template to All
            </>
          )}
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={generatedMockups.length === 0}
          className={`
            flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium rounded-lg transition-all
            ${generatedMockups.length > 0
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Download className="w-5 h-5" />
          Download All as ZIP
        </button>
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Generating mockups...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Message */}
      {generatedMockups.length > 0 && !isProcessing && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-900 dark:text-green-100">
              Successfully generated {generatedMockups.length} mockups!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Click "Download All as ZIP" to save them to your computer
            </p>
          </div>
        </div>
      )}

      {/* Generated Mockups Preview */}
      {generatedMockups.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Generated Mockups ({generatedMockups.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {generatedMockups.map((mockup) => (
              <div
                key={mockup.id}
                className="group relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all"
              >
                <div className="aspect-[9/16] bg-gray-100 dark:bg-gray-800">
                  <img
                    src={mockup.dataUrl}
                    alt={mockup.fileName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs text-white truncate">{mockup.fileName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
