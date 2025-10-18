# 🚀 Quick Start Guide

## Getting Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 How to Create Your First Mockup

### Step 1: Upload a Screenshot
1. Click the **"Upload Screenshots"** button or drag & drop images
2. Your uploaded images will appear as thumbnails below
3. Click on any thumbnail to select it

### Step 2: Choose a Device
1. Navigate through the tabs: **iPhone**, **Android**, or **Tablet**
2. Click on any device template to select it
3. The selected device will be highlighted

### Step 3: Customize Background (Optional)
1. Click the **"Background"** button in the Preview section
2. Choose from preset gradients or solid colors
3. Or use the color picker for custom colors

### Step 4: Preview & Download
1. Your mockup will generate automatically
2. Click **"Download PNG"** to save it

### Step 5: Batch Export (Optional)
1. Upload multiple screenshots
2. Select a device template
3. Click **"Apply Template to All"**
4. Click **"Download All as ZIP"** to get all mockups

---

## 🎯 Available Device Templates

### 📱 iPhone (4 templates)
- iPhone 15 Pro
- iPhone 14
- iPhone XR
- iPhone SE

### 🤖 Android (4 templates)
- Samsung Galaxy S24
- Google Pixel 8
- OnePlus 12
- Xiaomi

### 📲 Tablet (5 templates)
- iPad Pro 11" (Portrait)
- iPad Pro 11" (Landscape)
- iPad Pro 12.9"
- Samsung Galaxy Tab
- Generic Android Tablet

---

## 💡 Pro Tips

✅ **High Quality**: Use high-resolution screenshots for best results

✅ **Orientation**: Match your screenshot orientation with the device template

✅ **Backgrounds**: Experiment with different backgrounds to make your mockups pop

✅ **Batch Mode**: Process multiple screenshots at once to save time

✅ **Consistency**: Use the same template and background for a cohesive look

---

## 🎨 Background Options

### Preset Gradients
- Purple (Default)
- Pink
- Blue
- Green
- Sunset

### Solid Colors
- White
- Light Gray
- Dark Gray
- Custom (use color picker)

---

## 📦 Export Options

### Individual Download
- Click **"Download PNG"** in the Preview section
- Saves as: `[screenshot-name]-[device-id].png`

### Batch Download
- Click **"Apply Template to All"** to generate all mockups
- Click **"Download All as ZIP"**
- Saves as: `mockups-[timestamp].zip`

---

## 🔧 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Upload Files | Click upload area |
| Remove Image | Click X on thumbnail |
| Select Image | Click thumbnail |
| Select Template | Click device card |

---

## 🐛 Common Issues

### Mockup Not Generating?
- ✅ Ensure an image is selected (highlighted thumbnail)
- ✅ Ensure a template is selected (highlighted device)
- ✅ Try refreshing the page

### Low Quality Output?
- ✅ Upload higher resolution screenshots
- ✅ Use PNG format for best quality

### ZIP Not Downloading?
- ✅ Check browser pop-up blocker settings
- ✅ Ensure you clicked "Apply Template to All" first

---

## 📱 Best Practices

### For App Store Screenshots
1. Use device-specific screenshots (match resolution)
2. Use white or light backgrounds
3. Export at highest quality

### For Marketing Materials
1. Use gradient backgrounds for visual appeal
2. Batch process for consistency
3. Mix portrait and landscape orientations

### For Portfolio
1. Use realistic device frames
2. Show multiple screens in sequence
3. Use consistent backgrounds

---

## 🎓 Advanced Usage

### Custom Device Frames
1. Add SVG/PNG frames to `/public/templates/`
2. Update `data/templates.ts` with frame specifications
3. Restart the dev server

### Custom Backgrounds
1. Edit `backgroundPresets` in `components/PreviewSection.tsx`
2. Add your custom gradient or color combinations

---

## 📞 Need Help?

- 📖 Check the full [README.md](./README.md)
- 🐛 Report issues on GitHub
- 💬 Join our community discussions

---

**Happy Mocking! 🎉**
