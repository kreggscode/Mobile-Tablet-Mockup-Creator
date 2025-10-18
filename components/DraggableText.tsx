'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Move, Trash2, Edit3 } from 'lucide-react';
import { TextOverlay } from '@/types';

interface DraggableTextProps {
  text: TextOverlay;
  containerWidth: number;
  containerHeight: number;
  onUpdate: (updates: Partial<TextOverlay>) => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DraggableText({
  text,
  containerWidth,
  containerHeight,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
}: DraggableTextProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (text.x / 100) * containerWidth,
      y: e.clientY - (text.y / 100) * containerHeight,
    });
    onSelect();
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = ((e.clientX - dragStart.x) / containerWidth) * 100;
      const newY = ((e.clientY - dragStart.y) / containerHeight) * 100;

      // Clamp values between 0 and 100
      const clampedX = Math.max(0, Math.min(100, newX));
      const clampedY = Math.max(0, Math.min(100, newY));

      onUpdate({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, containerWidth, containerHeight, onUpdate]);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${text.x}%`,
    top: `${text.y}%`,
    transform: 'translate(-50%, -50%)',
    fontSize: `${text.fontSize}px`,
    fontFamily: text.fontFamily,
    color: text.color,
    backgroundColor: text.backgroundColor || 'transparent',
    fontWeight: text.bold ? 'bold' : 'normal',
    fontStyle: text.italic ? 'italic' : 'normal',
    textAlign: text.align || 'center',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    border: isSelected ? '2px solid #3B82F6' : '2px dashed rgba(255,255,255,0.3)',
    boxShadow: isSelected
      ? '0 0 0 4px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(0,0,0,0.3)'
      : '0 2px 8px rgba(0,0,0,0.2)',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    zIndex: isSelected ? 20 : 10,
  };

  return (
    <div
      ref={elementRef}
      style={style}
      onMouseDown={handleMouseDown}
      className="group"
    >
      {/* Drag Handle */}
      {isSelected && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 bg-gray-900 rounded-lg p-1 shadow-xl">
          <button
            onClick={onSelect}
            className="p-1.5 hover:bg-gray-700 rounded text-white"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-600 rounded text-white"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Move Icon */}
      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <Move className="w-3 h-3 text-white" />
      </div>

      {text.text}
    </div>
  );
}
