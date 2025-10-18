import { TextTemplate } from '@/types';

export const textTemplates: TextTemplate[] = [
  {
    id: 'app-store-title',
    name: 'App Store Title',
    texts: [
      {
        text: 'Your App Name',
        x: 50,
        y: 15,
        fontSize: 48,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bold: true,
        align: 'center',
      },
    ],
  },
  {
    id: 'feature-highlight',
    name: 'Feature Highlight',
    texts: [
      {
        text: '✨ New Feature',
        x: 50,
        y: 10,
        fontSize: 36,
        fontFamily: 'Arial',
        color: '#6366F1',
        bold: true,
        align: 'center',
      },
      {
        text: 'Amazing functionality',
        x: 50,
        y: 20,
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#4B5563',
        align: 'center',
      },
    ],
  },
  {
    id: 'step-by-step',
    name: 'Step by Step',
    texts: [
      {
        text: 'Step 1',
        x: 10,
        y: 10,
        fontSize: 32,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#6366F1',
        bold: true,
        align: 'left',
      },
    ],
  },
  {
    id: 'call-to-action',
    name: 'Call to Action',
    texts: [
      {
        text: 'Download Now!',
        x: 50,
        y: 85,
        fontSize: 42,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#10B981',
        bold: true,
        align: 'center',
      },
    ],
  },
  {
    id: 'pricing-tag',
    name: 'Pricing Tag',
    texts: [
      {
        text: '$9.99',
        x: 80,
        y: 15,
        fontSize: 56,
        fontFamily: 'Arial',
        color: '#EF4444',
        bold: true,
        align: 'right',
      },
      {
        text: 'Limited Time',
        x: 80,
        y: 25,
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#6B7280',
        align: 'right',
      },
    ],
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    texts: [
      {
        text: '⭐⭐⭐⭐⭐',
        x: 50,
        y: 12,
        fontSize: 36,
        fontFamily: 'Arial',
        color: '#F59E0B',
        align: 'center',
      },
      {
        text: '10,000+ Users',
        x: 50,
        y: 22,
        fontSize: 24,
        fontFamily: 'Arial',
        color: '#374151',
        bold: true,
        align: 'center',
      },
    ],
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    texts: [
      {
        text: '"Best app ever!"',
        x: 50,
        y: 50,
        fontSize: 28,
        fontFamily: 'Georgia',
        color: '#1F2937',
        italic: true,
        align: 'center',
      },
      {
        text: '- Happy Customer',
        x: 50,
        y: 60,
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#6B7280',
        align: 'center',
      },
    ],
  },
  {
    id: 'badge',
    name: 'Badge',
    texts: [
      {
        text: 'NEW',
        x: 85,
        y: 12,
        fontSize: 28,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#EF4444',
        bold: true,
        align: 'center',
      },
    ],
  },
  {
    id: 'watermark',
    name: 'Watermark',
    texts: [
      {
        text: '© Your Brand 2025',
        x: 50,
        y: 95,
        fontSize: 18,
        fontFamily: 'Arial',
        color: 'rgba(107, 114, 128, 0.6)',
        align: 'center',
      },
    ],
  },
  {
    id: 'coming-soon',
    name: 'Coming Soon',
    texts: [
      {
        text: 'COMING SOON',
        x: 50,
        y: 50,
        fontSize: 48,
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: 'rgba(99, 102, 241, 0.9)',
        bold: true,
        align: 'center',
        rotation: -15,
      },
    ],
  },
];

export const stickerLibrary = [
  // Emojis
  '🎉', '✨', '🚀', '💡', '⭐', '🔥', '💯', '👍', '❤️', '🎯',
  '📱', '💻', '🎨', '📸', '🎵', '🎮', '⚡', '🌟', '💪', '🏆',
  '🎁', '🔔', '📢', '💬', '📍', '🌈', '☀️', '🌙', '⚙️', '🔒',
  
  // Arrows
  '→', '←', '↑', '↓', '↗', '↘', '↙', '↖', '⇒', '⇐',
  
  // Symbols
  '✓', '✗', '★', '☆', '♥', '♦', '♣', '♠', '●', '○',
  '■', '□', '▲', '△', '▼', '▽', '◆', '◇', '►', '◄',
];
