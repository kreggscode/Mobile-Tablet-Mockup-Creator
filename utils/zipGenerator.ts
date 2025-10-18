import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const generateZip = async (
  mockups: Array<{ dataUrl: string; fileName: string }>
): Promise<void> => {
  const zip = new JSZip();
  
  // Add each mockup to the zip
  for (const mockup of mockups) {
    // Convert data URL to blob
    const base64Data = mockup.dataUrl.split(',')[1];
    const blob = base64ToBlob(base64Data, 'image/png');
    zip.file(mockup.fileName, blob);
  }
  
  // Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `mockups-${Date.now()}.zip`);
};

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
