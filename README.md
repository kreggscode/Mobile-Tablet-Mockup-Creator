# Mobile-Tablet-Mockup-Creator

A modern, feature-rich Next.js web application that allows you to create professional device mockups for your screenshots instantly. Perfect for portfolios, presentations, app store listings, and marketing materials.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 Core Functionality
- **Drag & Drop Upload** - Easy file upload with drag-and-drop support
- **Multiple Device Templates** - 13+ device frames including:
  - iPhone (15 Pro, 14, XR, SE)
  - Android (Samsung S24, Pixel 8, OnePlus 12, Xiaomi)
  - Tablets (iPad Pro 11", iPad Pro 12.9", Galaxy Tab, Android Tablet)
- **Live Preview** - Real-time mockup generation and preview
- **Batch Processing** - Apply templates to multiple screenshots at once
- **Custom Backgrounds** - Choose from solid colors, gradients, or custom images
- **High-Quality Export** - Download individual PNGs or batch export as ZIP

### 🎯 Key Capabilities
- ✅ Client-side rendering (no backend required)
- ✅ Canvas-based image processing
- ✅ Automatic screenshot fitting and cropping
- ✅ Portrait and landscape orientations
- ✅ Responsive design for all screen sizes
- ✅ Dark mode support
- ✅ TypeScript for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "Mobile APPS  mock up Creator"
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Step 1: Upload Screenshots
- Click "Upload Screenshots" or drag and drop your images
- Supports PNG and JPG formats
- Upload multiple files at once
- Click on any thumbnail to select it for preview

### Step 2: Select Device Template
- Browse templates by category (iPhone, Android, Tablet)
- Click on any device to select it
- View device specifications and orientation

### Step 3: Customize Background
- Click the "Background" button to open options
- Choose from preset gradients or solid colors
- Use the color picker for custom colors
- Preview updates in real-time

### Step 4: Preview & Download
- View your mockup in the preview section
- Click "Download PNG" to save individual mockup
- Adjust and regenerate as needed

### Step 5: Batch Export
- Click "Apply Template to All" to generate mockups for all uploaded images
- Monitor progress with the progress bar
- Click "Download All as ZIP" to get all mockups in one file

## 🏗️ Project Structure

```
Mobile APPS mock up Creator/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── UploadSection.tsx   # File upload and image management
│   ├── TemplateGallery.tsx # Device template selection
│   ├── PreviewSection.tsx  # Mockup preview and customization
│   └── ExportSection.tsx   # Batch processing and export
├── data/
│   └── templates.ts        # Device template definitions
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── mockupGenerator.ts  # Canvas-based mockup generation
│   └── zipGenerator.ts     # ZIP file creation
├── public/
│   └── templates/          # Device frame assets (SVG/PNG)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎨 Customization

### Adding New Device Templates

1. **Add template definition** in `data/templates.ts`:
   ```typescript
   {
     id: 'custom-device',
     name: 'Custom Device',
     category: 'android',
     orientation: 'portrait',
     frameWidth: 400,
     frameHeight: 800,
     screenArea: { x: 10, y: 10, width: 380, height: 780 },
     framePath: '/templates/custom-device.svg',
   }
   ```

2. **Add device frame image** to `public/templates/`
   - Use SVG for scalability
   - Ensure transparent screen area
   - Match dimensions in template definition

### Customizing Background Presets

Edit the `backgroundPresets` array in `components/PreviewSection.tsx`:
```typescript
{
  type: 'gradient',
  gradientStart: '#your-color',
  gradientEnd: '#your-color',
  gradientDirection: 'vertical',
  label: 'Your Label'
}
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Image Processing**: HTML5 Canvas API
- **File Handling**: JSZip, FileSaver.js

## 📦 Build for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## 🌐 Deployment

Deploy easily to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🎯 Use Cases

- 📱 App store screenshots
- 💼 Portfolio presentations
- 🎨 Marketing materials
- 📊 Product documentation
- 🌐 Website showcases
- 📧 Email campaigns

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new device templates
- Improve UI/UX
- Fix bugs
- Add features

## 💡 Tips

- Use high-resolution screenshots for best results
- Match screenshot orientation with device template
- Experiment with different backgrounds
- Use batch export for consistent branding

## 🐛 Troubleshooting

**Issue**: Mockup not generating
- Ensure image is properly uploaded
- Check that template is selected
- Try refreshing the page

**Issue**: Low quality output
- Upload higher resolution screenshots
- Ensure original image quality is good

**Issue**: ZIP download not working
- Check browser pop-up settings
- Ensure sufficient disk space

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ using Next.js and React**
