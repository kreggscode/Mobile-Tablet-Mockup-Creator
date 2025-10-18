'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TextOverlay, StickerOverlay } from '@/types';
import { Trash2, Edit3, GripVertical } from 'lucide-react';

interface MockupCanvasProps {
  mockupUrl: string;
  textOverlays: TextOverlay[];
  stickers: StickerOverlay[];
  onTextUpdate: (id: string, updates: Partial<TextOverlay>) => void;
  onTextDelete: (id: string) => void;
  onStickerUpdate: (id: string, updates: Partial<StickerOverlay>) => void;
  onStickerDelete: (id: string) => void;
  onTextSelect: (id: string | null) => void;
  selectedTextId: string | null;
}

export default function MockupCanvas({
  mockupUrl,
  textOverlays,
  stickers,
  onTextUpdate,
  onTextDelete,
  onStickerUpdate,
  onStickerDelete,
  onTextSelect,
  selectedTextId,
}: MockupCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<{ id: string; type: 'text' | 'sticker'; startX: number; startY: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const updateSize = () => {
        const rect = canvasRef.current!.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [mockupUrl]);

  const handleMouseDown = (e: React.MouseEvent, id: string, type: 'text' | 'sticker', currentX: number, currentY: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'text') {
      onTextSelect(id);
    }
    
    const rect = canvasRef.current!.getBoundingClientRect();
    setDragging({
      id,
      type,
      startX: e.clientX - (currentX / 100) * rect.width,
      startY: e.clientY - (currentY / 100) * rect.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const newX = ((e.clientX - dragging.startX) / rect.width) * 100;
      const newY = ((e.clientY - dragging.startY) / rect.height) * 100;

      // Clamp between 0 and 100
      const clampedX = Math.max(0, Math.min(100, newX));
      const clampedY = Math.max(0, Math.min(100, newY));

      if (dragging.type === 'text') {
        onTextUpdate(dragging.id, { x: clampedX, y: clampedY });
      } else {
        onStickerUpdate(dragging.id, { x: clampedX, y: clampedY });
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, onTextUpdate, onStickerUpdate]);

  return (
    <div
      ref={canvasRef}
      className="relative w-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden"
      style={{ aspectRatio: '9/16' }}
      onClick={() => onTextSelect(null)}
    >
      {/* Mockup Image */}
      <img
        src={mockupUrl}
        alt="Mockup"
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      {/* Text Overlays */}
      {textOverlays.map((text, index) => {
        const isSelected = selectedTextId === text.id;
        const isDraggingThis = dragging?.id === text.id;
        return (
          <div
            key={text.id}
            style={{
              position: 'absolute',
              left: `${text.x}%`,
              top: `${text.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${text.fontSize * (canvasSize.width / 400)}px`,
              fontFamily: text.fontFamily,
              color: text.color,
              backgroundColor: text.backgroundColor || 'transparent',
              fontWeight: text.bold ? 'bold' : 'normal',
              fontStyle: text.italic ? 'italic' : 'normal',
              textAlign: text.align || 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: isDraggingThis ? 'grabbing' : 'grab',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              border: isSelected ? '3px solid #3B82F6' : '2px dashed rgba(255,255,255,0.5)',
              boxShadow: isSelected
                ? '0 0 0 4px rgba(59, 130, 246, 0.3), 0 8px 24px rgba(0,0,0,0.4)'
                : '0 4px 12px rgba(0,0,0,0.3)',
              // Fix z-index: selected = highest, dragging = second highest, others by order
              zIndex: isSelected ? 1000 : isDraggingThis ? 900 : 100 + index,
              transition: isDraggingThis ? 'none' : 'all 0.2s ease',
              pointerEvents: 'auto',
            }}
            onMouseDown={(e) => handleMouseDown(e, text.id, 'text', text.x, text.y)}
            onClick={(e) => {
              e.stopPropagation();
              onTextSelect(text.id);
            }}
          >
            {/* Drag Handle */}
            {isSelected && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-blue-600 rounded-lg px-2 py-1.5 shadow-xl">
                <GripVertical className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-bold">DRAG ME</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTextDelete(text.id);
                  }}
                  className="ml-2 p-1 hover:bg-red-600 rounded text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {text.text}
          </div>
        );
      })}

      {/* Sticker Overlays */}
      {stickers.map((sticker, index) => {
        const isDraggingThis = dragging?.id === sticker.id;
        return (
          <div
            key={sticker.id}
            style={{
              position: 'absolute',
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${sticker.size * (canvasSize.width / 400)}px`,
              cursor: isDraggingThis ? 'grabbing' : 'grab',
              userSelect: 'none',
              // Stickers above text but below selected text
              zIndex: isDraggingThis ? 950 : 200 + index,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              pointerEvents: 'auto',
              border: isDraggingThis ? '2px dashed #8B5CF6' : 'none',
              borderRadius: '8px',
              padding: '4px',
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id, 'sticker', sticker.x, sticker.y)}
          >
            {sticker.content}
          </div>
        );
      })}

      {/* Instructions Overlay */}
      {textOverlays.length === 0 && stickers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 text-white px-6 py-4 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">👆 Click "Add Text" or "Add Sticker"</p>
            <p className="text-sm opacity-80">Then drag them with your mouse!</p>
          </div>
        </div>
      )}
    </div>
  );
}
