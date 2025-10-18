export interface DeviceTemplate {
  id: string;
  name: string;
  category: 'iphone' | 'android' | 'tablet';
  orientation: 'portrait' | 'landscape';
  frameWidth: number;
  frameHeight: number;
  screenArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  framePath: string;
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
}

export interface GeneratedMockup {
  id: string;
  imageId: string;
  templateId: string;
  dataUrl: string;
  fileName: string;
}

export type BackgroundType = 'solid' | 'gradient' | 'image';

export interface BackgroundConfig {
  type: BackgroundType;
  solidColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  gradientDirection?: string;
  imageUrl?: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  rotation?: number;
}

export interface StickerOverlay {
  id: string;
  type: string; // emoji, icon, shape
  content: string; // emoji character or icon name
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  rotation?: number;
}

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5' | '4:3' | 'original';

export interface TextTemplate {
  id: string;
  name: string;
  texts: Omit<TextOverlay, 'id'>[];
}
