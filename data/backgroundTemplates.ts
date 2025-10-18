export interface BackgroundTemplate {
  id: string;
  name: string;
  type: 'gradient' | 'solid';
  preview: string;
  config: {
    type: 'gradient' | 'solid';
    gradientStart?: string;
    gradientEnd?: string;
    gradientDirection?: 'horizontal' | 'vertical' | 'diagonal';
    solidColor?: string;
  };
}

export const backgroundTemplates: BackgroundTemplate[] = [
  // Gradients
  {
    id: 'sunset',
    name: 'Sunset',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#FF6B6B',
      gradientEnd: '#FFE66D',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#667eea',
      gradientEnd: '#764ba2',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#11998e',
      gradientEnd: '#38ef7d',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'candy',
    name: 'Candy',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#f093fb',
      gradientEnd: '#f5576c',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'sky',
    name: 'Sky',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'fire',
    name: 'Fire',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#fa709a',
      gradientEnd: '#fee140',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'purple-dream',
    name: 'Purple Dream',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#a8edea',
      gradientEnd: '#fed6e3',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#2c3e50',
      gradientEnd: '#3498db',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'peach',
    name: 'Peach',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#ffecd2',
      gradientEnd: '#fcb69f',
      gradientDirection: 'diagonal',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    type: 'gradient',
    preview: 'linear-gradient(135deg, #a1ffce 0%, #faffd1 100%)',
    config: {
      type: 'gradient',
      gradientStart: '#a1ffce',
      gradientEnd: '#faffd1',
      gradientDirection: 'diagonal',
    },
  },
  
  // Solid Colors
  {
    id: 'white',
    name: 'White',
    type: 'solid',
    preview: '#ffffff',
    config: {
      type: 'solid',
      solidColor: '#ffffff',
    },
  },
  {
    id: 'black',
    name: 'Black',
    type: 'solid',
    preview: '#000000',
    config: {
      type: 'solid',
      solidColor: '#000000',
    },
  },
  {
    id: 'light-gray',
    name: 'Light Gray',
    type: 'solid',
    preview: '#f3f4f6',
    config: {
      type: 'solid',
      solidColor: '#f3f4f6',
    },
  },
  {
    id: 'dark-gray',
    name: 'Dark Gray',
    type: 'solid',
    preview: '#1f2937',
    config: {
      type: 'solid',
      solidColor: '#1f2937',
    },
  },
  {
    id: 'blue',
    name: 'Blue',
    type: 'solid',
    preview: '#3B82F6',
    config: {
      type: 'solid',
      solidColor: '#3B82F6',
    },
  },
  {
    id: 'red',
    name: 'Red',
    type: 'solid',
    preview: '#EF4444',
    config: {
      type: 'solid',
      solidColor: '#EF4444',
    },
  },
  {
    id: 'green',
    name: 'Green',
    type: 'solid',
    preview: '#10B981',
    config: {
      type: 'solid',
      solidColor: '#10B981',
    },
  },
  {
    id: 'purple',
    name: 'Purple',
    type: 'solid',
    preview: '#8B5CF6',
    config: {
      type: 'solid',
      solidColor: '#8B5CF6',
    },
  },
];
