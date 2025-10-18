'use client';

import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import UploadSection from '@/components/UploadSection';
import TemplateGallery from '@/components/TemplateGallery';
import PreviewSection from '@/components/PreviewSection';
import EnhancedExportSection from '@/components/EnhancedExportSection';
import { UploadedImage, DeviceTemplate, BackgroundConfig } from '@/types';

export default function Home() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string>();
  const [selectedTemplate, setSelectedTemplate] = useState<DeviceTemplate>();
  const [background, setBackground] = useState<BackgroundConfig>({
    type: 'gradient',
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    gradientDirection: 'vertical',
  });

  const handleImagesAdd = (newImages: UploadedImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
    // Auto-select first image if none selected
    if (!selectedImageId && newImages.length > 0) {
      setSelectedImageId(newImages[0].id);
    }
  };

  const handleImageRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedImageId === id) {
      setSelectedImageId(images[0]?.id);
    }
  };

  const handleTemplateSelect = (template: DeviceTemplate) => {
    setSelectedTemplate(template);
  };

  const selectedImage = images.find((img) => img.id === selectedImageId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mobile & Tablet Mockup Creator
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                ✨ Create stunning device mockups with text, stickers & custom exports
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          {/* Upload Section */}
          <section className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
            <UploadSection
              images={images}
              onImagesAdd={handleImagesAdd}
              onImageRemove={handleImageRemove}
              selectedImageId={selectedImageId}
              onImageSelect={setSelectedImageId}
            />
          </section>

          {/* Template Gallery */}
          <section className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
            <TemplateGallery
              selectedTemplateId={selectedTemplate?.id}
              onTemplateSelect={handleTemplateSelect}
            />
          </section>

          {/* Preview Section */}
          <section className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
            <PreviewSection
              selectedImage={selectedImage}
              selectedTemplate={selectedTemplate}
              background={background}
              onBackgroundChange={setBackground}
            />
          </section>

          {/* Enhanced Export Section */}
          <section className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
            <EnhancedExportSection
              images={images}
              selectedTemplate={selectedTemplate}
              background={background}
            />
          </section>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Mockup Creator</h3>
            </div>
            <p className="text-indigo-200 text-base mb-2">
              Create stunning device mockups with text, stickers, and custom exports
            </p>
            <p className="text-indigo-300 text-sm">
              Perfect for App Store, social media, portfolios & marketing materials
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-indigo-400 text-xs">
                Built with ❤️ using Next.js, React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
