'use client';

import React, { useState } from 'react';
import { Type, Sticker, Download, Trash2, Plus, Move } from 'lucide-react';
import { TextOverlay, StickerOverlay, AspectRatio, GeneratedMockup } from '@/types';
import { textTemplates, stickerLibrary } from '@/data/textTemplates';
import { generateMockup, downloadImage } from '@/utils/mockupGenerator';

interface MockupEditorProps {
  mockup: GeneratedMockup;
  onUpdate: (mockup: GeneratedMockup) => void;
  onDelete: (id: string) => void;
}

export default function MockupEditor({ mockup, onUpdate, onDelete }: MockupEditorProps) {
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [stickers, setStickers] = useState<StickerOverlay[]>([]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('original');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const aspectRatios: { value: AspectRatio; label: string }[] = [
    { value: 'original', label: 'Original' },
    { value: '9:16', label: '9:16 (Story)' },
    { value: '16:9', label: '16:9 (YouTube)' },
    { value: '1:1', label: '1:1 (Square)' },
    { value: '4:5', label: '4:5 (Portrait)' },
    { value: '4:3', label: '4:3 (Standard)' },
  ];

  const addText = (template?: typeof textTemplates[0]) => {
    const newText: TextOverlay = template
      ? {
          id: Date.now().toString(),
          ...template.texts[0],
        }
      : {
          id: Date.now().toString(),
          text: 'Your Text Here',
          x: 50,
          y: 50,
          fontSize: 32,
          fontFamily: 'Arial',
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          bold: false,
          align: 'center',
        };
    setTextOverlays([...textOverlays, newText]);
  };

  const addSticker = (emoji: string) => {
    const newSticker: StickerOverlay = {
      id: Date.now().toString(),
      type: 'emoji',
      content: emoji,
      x: 50,
      y: 50,
      size: 48,
    };
    setStickers([...stickers, newSticker]);
    setShowStickerPicker(false);
  };

  const removeText = (id: string) => {
    setTextOverlays(textOverlays.filter((t) => t.id !== id));
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const handleDownload = async (aspectRatio: AspectRatio = 'original') => {
    // Download with current settings
    downloadImage(mockup.dataUrl, mockup.fileName);
  };

  return (
    <div className="relative group">
      {/* Mockup Preview */}
      <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all">
        <img
          src={mockup.dataUrl}
          alt={mockup.fileName}
          className="w-full h-auto object-contain bg-gray-50 dark:bg-gray-900"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={() => setShowTextEditor(!showTextEditor)}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-110 transition-transform"
              title="Add Text"
            >
              <Type className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={() => setShowStickerPicker(!showStickerPicker)}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-110 transition-transform"
              title="Add Sticker"
            >
              <Sticker className="w-5 h-5 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={() => handleDownload()}
              className="p-3 bg-primary-600 rounded-lg shadow-lg hover:scale-110 transition-transform"
              title="Download"
            >
              <Download className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => onDelete(mockup.id)}
              className="p-3 bg-red-600 rounded-lg shadow-lg hover:scale-110 transition-transform"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* File Name */}
      <div className="mt-2 px-2">
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{mockup.fileName}</p>
      </div>

      {/* Text Editor Panel */}
      {showTextEditor && (
        <div className="absolute top-0 left-full ml-4 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 z-10 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Add Text</h3>
            <button
              onClick={() => setShowTextEditor(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Text Templates */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Templates
            </label>
            <div className="grid grid-cols-2 gap-2">
              {textTemplates.slice(0, 6).map((template) => (
                <button
                  key={template.id}
                  onClick={() => addText(template)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg text-xs font-medium transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text */}
          <button
            onClick={() => addText()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Custom Text
          </button>

          {/* Active Text Overlays */}
          {textOverlays.length > 0 && (
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Active Texts ({textOverlays.length})
              </label>
              {textOverlays.map((text) => (
                <div
                  key={text.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <span className="text-sm truncate flex-1">{text.text}</span>
                  <button
                    onClick={() => removeText(text.id)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sticker Picker Panel */}
      {showStickerPicker && (
        <div className="absolute top-0 left-full ml-4 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 z-10 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Add Sticker</h3>
            <button
              onClick={() => setShowStickerPicker(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {stickerLibrary.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addSticker(emoji)}
                className="aspect-square flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Active Stickers */}
          {stickers.length > 0 && (
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Active Stickers ({stickers.length})
              </label>
              {stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <span className="text-2xl">{sticker.content}</span>
                  <button
                    onClick={() => removeSticker(sticker.id)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Aspect Ratio Selector */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Export Aspect Ratio
        </label>
        <select
          value={selectedAspectRatio}
          onChange={(e) => setSelectedAspectRatio(e.target.value as AspectRatio)}
          className="w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          {aspectRatios.map((ratio) => (
            <option key={ratio.value} value={ratio.value}>
              {ratio.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
