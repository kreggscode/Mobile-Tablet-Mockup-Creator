import { DeviceTemplate, BackgroundConfig, TextOverlay, StickerOverlay } from '@/types';

export const generateMockup = async (
  imageUrl: string,
  template: DeviceTemplate,
  background: BackgroundConfig,
  textOverlays: TextOverlay[] = [],
  stickers: StickerOverlay[] = [],
  aspectRatio?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Set canvas size with padding for background
    const padding = 100;
    canvas.width = template.frameWidth + padding * 2;
    canvas.height = template.frameHeight + padding * 2;

    // Draw background
    drawBackground(ctx, canvas.width, canvas.height, background);

    // Load screenshot image
    const screenshot = new Image();
    screenshot.crossOrigin = 'anonymous';
    
    screenshot.onload = () => {
      // First, draw the screenshot in the screen area
      const screenX = padding + template.screenArea.x;
      const screenY = padding + template.screenArea.y;
      const screenWidth = template.screenArea.width;
      const screenHeight = template.screenArea.height;

      // Calculate aspect ratios
      const imageAspect = screenshot.width / screenshot.height;
      const screenAspect = screenWidth / screenHeight;

      let drawWidth, drawHeight, drawX, drawY;

      // Cover the screen area (crop if necessary)
      if (imageAspect > screenAspect) {
        // Image is wider
        drawHeight = screenHeight;
        drawWidth = drawHeight * imageAspect;
        drawX = screenX - (drawWidth - screenWidth) / 2;
        drawY = screenY;
      } else {
        // Image is taller
        drawWidth = screenWidth;
        drawHeight = drawWidth / imageAspect;
        drawX = screenX;
        drawY = screenY - (drawHeight - screenHeight) / 2;
      }

      // Clip to screen area and draw screenshot FIRST
      ctx.save();
      ctx.beginPath();
      ctx.rect(screenX, screenY, screenWidth, screenHeight);
      ctx.clip();
      ctx.drawImage(screenshot, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Now load and draw device frame ON TOP
      const frame = new Image();
      frame.crossOrigin = 'anonymous';
      
      frame.onload = () => {
        // Draw device frame OVER the screenshot
        ctx.drawImage(frame, padding, padding, template.frameWidth, template.frameHeight);

        // Draw text overlays
        textOverlays.forEach(overlay => {
          drawTextOverlay(ctx, overlay, screenX, screenY, screenWidth, screenHeight);
        });

        // Draw stickers
        stickers.forEach(sticker => {
          drawSticker(ctx, sticker, screenX, screenY, screenWidth, screenHeight);
        });

        // Apply aspect ratio if specified
        if (aspectRatio) {
          const finalCanvas = applyAspectRatio(canvas, aspectRatio);
          resolve(finalCanvas.toDataURL('image/png'));
        } else {
          resolve(canvas.toDataURL('image/png'));
        }
      };

      frame.onerror = () => {
        // If frame image fails to load, still return the mockup without frame
        console.warn('Frame image failed to load, using screenshot only');
        resolve(canvas.toDataURL('image/png'));
      };

      // Use a placeholder frame or generate SVG frame
      frame.src = generateDeviceFrame(template);
    };

    screenshot.onerror = () => {
      reject(new Error('Failed to load screenshot'));
    };

    screenshot.src = imageUrl;
  });
};

const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  background: BackgroundConfig
) => {
  switch (background.type) {
    case 'solid':
      ctx.fillStyle = background.solidColor || '#ffffff';
      ctx.fillRect(0, 0, width, height);
      break;
      
    case 'gradient':
      const gradient = ctx.createLinearGradient(
        0, 0,
        background.gradientDirection === 'horizontal' ? width : 0,
        background.gradientDirection === 'horizontal' ? 0 : height
      );
      gradient.addColorStop(0, background.gradientStart || '#667eea');
      gradient.addColorStop(1, background.gradientEnd || '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      break;
      
    case 'image':
      if (background.imageUrl) {
        const bgImage = new Image();
        bgImage.src = background.imageUrl;
        bgImage.onload = () => {
          ctx.drawImage(bgImage, 0, 0, width, height);
        };
      } else {
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, width, height);
      }
      break;
      
    default:
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
  }
};

// Generate SVG device frame dynamically
const generateDeviceFrame = (template: DeviceTemplate): string => {
  const { frameWidth, frameHeight, screenArea } = template;
  const borderRadius = template.category === 'tablet' ? 30 : 40;
  const borderWidth = 12;
  
  // Determine device color based on category
  let frameColor = '#1f2937'; // Default dark gray
  if (template.category === 'iphone') {
    frameColor = '#1f2937'; // Space gray
  } else if (template.category === 'android') {
    frameColor = '#374151'; // Darker gray
  } else {
    frameColor = '#4b5563'; // Medium gray for tablets
  }

  const svg = `
    <svg width="${frameWidth}" height="${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${frameColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.8" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
        </filter>
        
        <!-- Mask to create cutout for screen -->
        <mask id="frameMask">
          <!-- White fills the entire frame -->
          <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" fill="white"/>
          <!-- Black creates the cutout for the screen -->
          <rect x="${screenArea.x}" y="${screenArea.y}" 
                width="${screenArea.width}" height="${screenArea.height}" 
                rx="${borderRadius - 5}" ry="${borderRadius - 5}" 
                fill="black"/>
        </mask>
      </defs>
      
      <!-- Device body with mask applied (creates actual cutout) -->
      <rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" 
            rx="${borderRadius}" ry="${borderRadius}" 
            fill="url(#frameGradient)" 
            filter="url(#shadow)"
            mask="url(#frameMask)"/>
      
      <!-- Dynamic Island for iPhone 16/17 -->
      ${(template.id.includes('iphone-16') || template.id.includes('iphone-17')) ? `
        <!-- Dynamic Island (pill shape) -->
        <rect x="${frameWidth / 2 - 55}" y="${screenArea.y + 15}" 
              width="110" height="35" 
              rx="18" ry="18" 
              fill="#0a0a0a"/>
        <!-- Camera cutout inside Dynamic Island -->
        <circle cx="${frameWidth / 2 - 20}" cy="${screenArea.y + 32}" r="8" fill="#1a1a2e"/>
        <circle cx="${frameWidth / 2 + 20}" cy="${screenArea.y + 32}" r="6" fill="#2a2a3e"/>
      ` : template.category === 'iphone' && template.id !== 'iphone-se' ? `
        <!-- Traditional Notch for older iPhones -->
        <rect x="${frameWidth / 2 - 60}" y="${screenArea.y}" 
              width="120" height="28" 
              rx="14" ry="14" 
              fill="${frameColor}"/>
        <!-- Camera in notch -->
        <circle cx="${frameWidth / 2 - 15}" cy="${screenArea.y + 14}" r="5" fill="#1a1a2e"/>
      ` : ''}
      
      <!-- Camera for Android -->
      ${template.category === 'android' ? `
        <!-- Punch-hole camera (modern Android) -->
        <circle cx="${frameWidth / 2}" cy="${screenArea.y + 15}" r="8" fill="#000000"/>
        <circle cx="${frameWidth / 2}" cy="${screenArea.y + 15}" r="6" fill="#1a1a2e"/>
        <!-- Camera ring -->
        <circle cx="${frameWidth / 2}" cy="${screenArea.y + 15}" r="9" fill="none" stroke="#333" stroke-width="0.5"/>
      ` : ''}
      
      <!-- Side buttons -->
      <rect x="${frameWidth - 3}" y="${frameHeight * 0.2}" width="3" height="60" 
            rx="1.5" fill="#0f172a"/>
      <rect x="${frameWidth - 3}" y="${frameHeight * 0.35}" width="3" height="40" 
            rx="1.5" fill="#0f172a"/>
      <rect x="0" y="${frameHeight * 0.25}" width="3" height="50" 
            rx="1.5" fill="#0f172a"/>
    </svg>
  `;

  return 'data:image/svg+xml;base64,' + btoa(svg);
};

const drawTextOverlay = (
  ctx: CanvasRenderingContext2D,
  overlay: TextOverlay,
  screenX: number,
  screenY: number,
  screenWidth: number,
  screenHeight: number
) => {
  const x = screenX + (overlay.x / 100) * screenWidth;
  const y = screenY + (overlay.y / 100) * screenHeight;

  ctx.save();
  
  // Apply rotation if specified
  if (overlay.rotation) {
    ctx.translate(x, y);
    ctx.rotate((overlay.rotation * Math.PI) / 180);
    ctx.translate(-x, -y);
  }

  // Set font
  let fontStyle = '';
  if (overlay.italic) fontStyle += 'italic ';
  if (overlay.bold) fontStyle += 'bold ';
  ctx.font = `${fontStyle}${overlay.fontSize}px ${overlay.fontFamily}`;
  ctx.textAlign = overlay.align || 'left';

  // Draw background if specified
  if (overlay.backgroundColor) {
    const metrics = ctx.measureText(overlay.text);
    const padding = 10;
    ctx.fillStyle = overlay.backgroundColor;
    ctx.fillRect(
      x - padding,
      y - overlay.fontSize - padding,
      metrics.width + padding * 2,
      overlay.fontSize + padding * 2
    );
  }

  // Draw text
  ctx.fillStyle = overlay.color;
  ctx.fillText(overlay.text, x, y);
  
  ctx.restore();
};

const drawSticker = (
  ctx: CanvasRenderingContext2D,
  sticker: StickerOverlay,
  screenX: number,
  screenY: number,
  screenWidth: number,
  screenHeight: number
) => {
  const x = screenX + (sticker.x / 100) * screenWidth;
  const y = screenY + (sticker.y / 100) * screenHeight;

  ctx.save();
  
  // Apply rotation if specified
  if (sticker.rotation) {
    ctx.translate(x, y);
    ctx.rotate((sticker.rotation * Math.PI) / 180);
    ctx.translate(-x, -y);
  }

  // Draw emoji or icon
  ctx.font = `${sticker.size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(sticker.content, x, y);
  
  ctx.restore();
};

const applyAspectRatio = (sourceCanvas: HTMLCanvasElement, ratio: string): HTMLCanvasElement => {
  const newCanvas = document.createElement('canvas');
  const ctx = newCanvas.getContext('2d');
  
  if (!ctx) return sourceCanvas;

  let targetWidth = sourceCanvas.width;
  let targetHeight = sourceCanvas.height;

  switch (ratio) {
    case '9:16': // Instagram Story
      targetWidth = 1080;
      targetHeight = 1920;
      break;
    case '16:9': // YouTube
      targetWidth = 1920;
      targetHeight = 1080;
      break;
    case '1:1': // Instagram Post
      targetWidth = 1080;
      targetHeight = 1080;
      break;
    case '4:5': // Instagram Portrait
      targetWidth = 1080;
      targetHeight = 1350;
      break;
    case '4:3': // Standard
      targetWidth = 1600;
      targetHeight = 1200;
      break;
    default:
      return sourceCanvas;
  }

  newCanvas.width = targetWidth;
  newCanvas.height = targetHeight;

  // Fill with white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Calculate scaling to fit
  const scale = Math.min(targetWidth / sourceCanvas.width, targetHeight / sourceCanvas.height);
  const scaledWidth = sourceCanvas.width * scale;
  const scaledHeight = sourceCanvas.height * scale;
  const x = (targetWidth - scaledWidth) / 2;
  const y = (targetHeight - scaledHeight) / 2;

  ctx.drawImage(sourceCanvas, x, y, scaledWidth, scaledHeight);

  return newCanvas;
};

export const downloadImage = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
};
