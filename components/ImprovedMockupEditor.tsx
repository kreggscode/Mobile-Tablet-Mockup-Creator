'use client';

import React, { useState, useEffect } from 'react';
import { Type, Sticker, Download, Trash2, Plus, RefreshCw, Move, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { TextOverlay, StickerOverlay, AspectRatio, GeneratedMockup, DeviceTemplate, BackgroundConfig } from '@/types';
import { textTemplates, stickerLibrary } from '@/data/textTemplates';
import { generateMockup, downloadImage } from '@/utils/mockupGenerator';
import { deviceTemplates } from '@/data/templates';
import MockupCanvas from './MockupCanvas';

interface ImprovedMockupEditorProps {
  mockup: GeneratedMockup;
  originalImage: string;
  template: DeviceTemplate;
  background: BackgroundConfig;
  onUpdate: (mockup: GeneratedMockup) => void;
  onDelete: (id: string) => void;
}

const beautifulFonts = [
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Arial Black',
  'Palatino',
  'Garamond',
  'Bookman',
  'Avant Garde',
];

export default function ImprovedMockupEditor({
  mockup,
  originalImage,
  template,
  background,
  onUpdate,
  onDelete,
}: ImprovedMockupEditorProps) {
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [stickers, setStickers] = useState<StickerOverlay[]>([]);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const addText = async (templateData?: typeof textTemplates[0]) => {
    const newText: TextOverlay = templateData
      ? {
          id: Date.now().toString(),
          ...templateData.texts[0],
        }
      : {
          id: Date.now().toString(),
          text: 'Your Text Here',
          x: 50,
          y: 20,
          fontSize: 36,
          fontFamily: 'Arial',
          color: '#ffffff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          bold: true,
          align: 'center',
        };
    
    const newTexts = [...textOverlays, newText];
    setTextOverlays(newTexts);
    setSelectedText(newText.id);
    
    // Regenerate mockup with new text
    await regenerateMockup(newTexts, stickers);
  };

  const updateText = async (id: string, updates: Partial<TextOverlay>) => {
    const newTexts = textOverlays.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTextOverlays(newTexts);
    await regenerateMockup(newTexts, stickers);
  };

  const removeText = async (id: string) => {
    const newTexts = textOverlays.filter((t) => t.id !== id);
    setTextOverlays(newTexts);
    setSelectedText(null);
    await regenerateMockup(newTexts, stickers);
  };

  const addSticker = async (emoji: string) => {
    const newSticker: StickerOverlay = {
      id: Date.now().toString(),
      type: 'emoji',
      content: emoji,
      x: 50,
      y: 50,
      size: 48,
    };
    const newStickers = [...stickers, newSticker];
    setStickers(newStickers);
    setShowStickerPicker(false);
    await regenerateMockup(textOverlays, newStickers);
  };

  const removeSticker = async (id: string) => {
    const newStickers = stickers.filter((s) => s.id !== id);
    setStickers(newStickers);
    await regenerateMockup(textOverlays, newStickers);
  };

  const regenerateMockup = async (texts: TextOverlay[], stickersData: StickerOverlay[]) => {
    setIsRegenerating(true);
    try {
      const newDataUrl = await generateMockup(
        originalImage,
        template,
        background,
        texts,
        stickersData
      );
      
      onUpdate({
        ...mockup,
        dataUrl: newDataUrl,
      });
    } catch (error) {
      console.error('Failed to regenerate mockup:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const selectedTextData = textOverlays.find((t) => t.id === selectedText);

  return (
    <div className="relative group">
      {/* Mockup Preview with Draggable Canvas */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all shadow-lg">
        {isRegenerating && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-white animate-spin mx-auto mb-2" />
              <p className="text-white font-bold">Updating mockup...</p>
            </div>
          </div>
        )}
        
        <MockupCanvas
          mockupUrl={mockup.dataUrl}
          textOverlays={textOverlays}
          stickers={stickers}
          onTextUpdate={updateText}
          onTextDelete={removeText}
          onStickerUpdate={(id, updates) => {
            const newStickers = stickers.map((s) => (s.id === id ? { ...s, ...updates } : s));
            setStickers(newStickers);
            regenerateMockup(textOverlays, newStickers);
          }}
          onStickerDelete={removeSticker}
          onTextSelect={setSelectedText}
          selectedTextId={selectedText}
        />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
          <button
            onClick={() => setShowTextEditor(!showTextEditor)}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-2xl hover:scale-110 transition-transform group"
            title="Add Text"
          >
            <Type className="w-5 h-5 text-white" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Add Text
            </span>
          </button>
          <button
            onClick={() => setShowStickerPicker(!showStickerPicker)}
            className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-2xl hover:scale-110 transition-transform group"
            title="Add Sticker"
          >
            <Sticker className="w-5 h-5 text-white" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Add Sticker
            </span>
          </button>
          <button
            onClick={() => downloadImage(mockup.dataUrl, mockup.fileName)}
            className="p-3 bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-2xl hover:scale-110 transition-transform group"
            title="Download"
          >
            <Download className="w-5 h-5 text-white" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Download
            </span>
          </button>
          <button
            onClick={() => onDelete(mockup.id)}
            className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-2xl hover:scale-110 transition-transform group"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-white" />
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Delete
            </span>
          </button>
        </div>
      </div>

      {/* File Name */}
      <div className="mt-3 px-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate font-medium">{mockup.fileName}</p>
      </div>

      {/* Text Editor Panel */}
      {showTextEditor && (
        <div className="absolute top-0 left-full ml-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-30 border-2 border-primary-200 dark:border-primary-800 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Type className="w-5 h-5" />
              Add Text
            </h3>
            <button
              onClick={() => setShowTextEditor(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Text Templates */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Quick Templates
            </label>
            <div className="grid grid-cols-2 gap-2">
              {textTemplates.slice(0, 8).map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => addText(tmpl)}
                  className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 rounded-lg text-xs font-semibold transition-all border border-blue-200 dark:border-blue-800"
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Text Button */}
          <button
            onClick={() => addText()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Custom Text
          </button>

          {/* Active Text Overlays */}
          {textOverlays.length > 0 && (
            <div className="mt-6 space-y-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Active Texts ({textOverlays.length})
              </label>
              {textOverlays.map((text) => (
                <div
                  key={text.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedText === text.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <input
                      type="text"
                      value={text.text}
                      onChange={(e) => updateText(text.id, { text: e.target.value })}
                      onClick={() => setSelectedText(text.id)}
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-medium"
                      placeholder="Enter text..."
                    />
                    <button
                      onClick={() => removeText(text.id)}
                      className="ml-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {selectedText === text.id && (
                    <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      {/* Font Family */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Font
                        </label>
                        <select
                          value={text.fontFamily}
                          onChange={(e) => updateText(text.id, { fontFamily: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                        >
                          {beautifulFonts.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Font Size */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          Size: {text.fontSize}px
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="120"
                          value={text.fontSize}
                          onChange={(e) => updateText(text.id, { fontSize: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>

                      {/* Position */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            X: {text.x}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={text.x}
                            onChange={(e) => updateText(text.id, { x: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            Y: {text.y}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={text.y}
                            onChange={(e) => updateText(text.id, { y: parseInt(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            Text Color
                          </label>
                          <input
                            type="color"
                            value={text.color}
                            onChange={(e) => updateText(text.id, { color: e.target.value })}
                            className="w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            Background
                          </label>
                          <input
                            type="color"
                            value={text.backgroundColor?.replace(/rgba?\([^)]+\)/, '') || '#000000'}
                            onChange={(e) => {
                              const opacity = text.backgroundColor?.match(/[\d.]+\)$/)?.[0].replace(')', '') || '0.7';
                              updateText(text.id, { backgroundColor: `rgba(${parseInt(e.target.value.slice(1, 3), 16)}, ${parseInt(e.target.value.slice(3, 5), 16)}, ${parseInt(e.target.value.slice(5, 7), 16)}, ${opacity})` });
                            }}
                            className="w-full h-10 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Background Transparency */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400">
                            Background Opacity
                          </label>
                          <button
                            onClick={() => updateText(text.id, { backgroundColor: 'transparent' })}
                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                          >
                            Transparent
                          </button>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={text.backgroundColor === 'transparent' ? 0 : parseFloat(text.backgroundColor?.match(/[\d.]+\)$/)?.[0].replace(')', '') || '0.7')}
                          onChange={(e) => {
                            const opacity = e.target.value;
                            if (opacity === '0') {
                              updateText(text.id, { backgroundColor: 'transparent' });
                            } else {
                              const color = text.backgroundColor?.replace(/rgba?\([^)]+\)/, '') || '#000000';
                              const r = parseInt(color.slice(1, 3), 16);
                              const g = parseInt(color.slice(3, 5), 16);
                              const b = parseInt(color.slice(5, 7), 16);
                              updateText(text.id, { backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})` });
                            }
                          }}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Transparent</span>
                          <span>Solid</span>
                        </div>
                      </div>

                      {/* Alignment */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          Alignment
                        </label>
                        <div className="flex gap-2">
                          {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                              key={align}
                              onClick={() => updateText(text.id, { align })}
                              className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                                text.align === align
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {align === 'left' && <AlignLeft className="w-4 h-4 mx-auto" />}
                              {align === 'center' && <AlignCenter className="w-4 h-4 mx-auto" />}
                              {align === 'right' && <AlignRight className="w-4 h-4 mx-auto" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Style Toggles */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateText(text.id, { bold: !text.bold })}
                          className={`flex-1 px-3 py-2 rounded-lg border-2 font-bold transition-all ${
                            text.bold
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          Bold
                        </button>
                        <button
                          onClick={() => updateText(text.id, { italic: !text.italic })}
                          className={`flex-1 px-3 py-2 rounded-lg border-2 italic transition-all ${
                            text.italic
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          Italic
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sticker Picker Panel */}
      {showStickerPicker && (
        <div className="absolute top-0 left-full ml-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-30 border-2 border-purple-200 dark:border-purple-800 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sticker className="w-5 h-5" />
              Add Sticker
            </h3>
            <button
              onClick={() => setShowStickerPicker(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-8 gap-2 mb-6">
            {stickerLibrary.map((emoji, index) => (
              <button
                key={index}
                onClick={() => addSticker(emoji)}
                className="aspect-square flex items-center justify-center text-3xl hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-all hover:scale-125 border-2 border-transparent hover:border-purple-300"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Active Stickers */}
          {stickers.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Active Stickers ({stickers.length})
              </label>
              {stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800"
                >
                  <span className="text-3xl">{sticker.content}</span>
                  <button
                    onClick={() => removeSticker(sticker.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
