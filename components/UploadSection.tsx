'use client';

import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '@/types';

interface UploadSectionProps {
  images: UploadedImage[];
  onImagesAdd: (images: UploadedImage[]) => void;
  onImageRemove: (id: string) => void;
  selectedImageId?: string;
  onImageSelect: (id: string) => void;
}

export default function UploadSection({
  images,
  onImagesAdd,
  onImageRemove,
  selectedImageId,
  onImageSelect,
}: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = `${Date.now()}-${Math.random()}`;
        const preview = URL.createObjectURL(file);
        newImages.push({
          id,
          file,
          preview,
          name: file.name,
        });
      }
    });

    if (newImages.length > 0) {
      onImagesAdd(newImages);
    }
  }, [onImagesAdd]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Screenshots
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your screenshots to create professional device mockups
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-400'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Screenshots
            </label>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            or drag and drop your images here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            PNG, JPG up to 10MB each
          </p>
        </div>
      </div>

      {/* Uploaded Images Grid */}
      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Uploaded Images ({images.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => onImageSelect(image.id)}
                className={`
                  relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImageId === image.id
                    ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }
                `}
              >
                <div className="aspect-[9/16] bg-gray-100 dark:bg-gray-800">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove(image.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {selectedImageId === image.id && (
                  <div className="absolute inset-0 bg-primary-500/10 flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-xs text-white truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
