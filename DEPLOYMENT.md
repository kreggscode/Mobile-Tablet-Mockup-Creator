# 🚀 Deployment Guide

Complete guide for deploying your Mobile & Tablet Mockup Generator to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- ✅ All dependencies are installed (`npm install`)
- ✅ Build completes successfully (`npm run build`)
- ✅ No TypeScript errors (`npm run lint`)
- ✅ Application runs locally (`npm run dev`)
- ✅ All features tested and working

---

## 🌐 Deployment Options

### 1️⃣ Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available

#### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? mobile-mockup-generator
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

#### Deploy with Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"

**Your app will be live at**: `https://your-project.vercel.app`

---

### 2️⃣ Netlify

**Why Netlify?**
- Easy deployment
- Continuous deployment
- Form handling
- Free tier available

#### Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

#### Deploy with Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to Git provider
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty)
5. Click "Deploy site"

**Note**: For Next.js on Netlify, you may need the `@netlify/plugin-nextjs` plugin.

Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### 3️⃣ GitHub Pages

**Note**: GitHub Pages is for static sites. You'll need to export Next.js as static HTML.

#### Configure for Static Export

1. Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/your-repo-name', // Only if not using custom domain
}

module.exports = nextConfig
```

2. Add deployment script to `package.json`:
```json
{
  "scripts": {
    "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
  }
}
```

3. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

4. Deploy:
```bash
npm run deploy
```

**Your app will be live at**: `https://username.github.io/repo-name`

---

### 4️⃣ AWS Amplify

**Why AWS Amplify?**
- AWS integration
- Scalable
- CI/CD pipeline
- Custom domains

#### Deploy Steps

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Connect repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Deploy

---

### 5️⃣ Railway

**Why Railway?**
- Simple deployment
- Database support
- Environment variables
- Free tier

#### Deploy Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js
6. Click "Deploy"

**Your app will be live at**: `https://your-app.railway.app`

---

### 6️⃣ Render

**Why Render?**
- Free tier
- Auto-deploy from Git
- Custom domains
- SSL included

#### Deploy Steps

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect repository
4. Configure:
   - Name: mobile-mockup-generator
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Click "Create Web Service"

---

### 7️⃣ DigitalOcean App Platform

**Why DigitalOcean?**
- Simple pricing
- Scalable
- Database options
- Free tier

#### Deploy Steps

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect repository
4. Configure:
   - Type: Web Service
   - Build Command: `npm run build`
   - Run Command: `npm start`
5. Click "Next" → "Create Resources"

---

## 🔧 Environment Variables

If you add environment variables in the future:

### Vercel
```bash
vercel env add VARIABLE_NAME
```

### Netlify
```bash
netlify env:set VARIABLE_NAME value
```

### GitHub Actions
Add to `.github/workflows/deploy.yml`:
```yaml
env:
  VARIABLE_NAME: ${{ secrets.VARIABLE_NAME }}
```

---

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS

### GitHub Pages
1. Add `CNAME` file to `public/` directory
2. Content: `yourdomain.com`
3. Configure DNS:
   - Type: A
   - Host: @
   - Value: GitHub Pages IPs

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Already configured in next.config.js
   images: {
     unoptimized: true,
   }
   ```

2. **Enable Compression**
   - Vercel/Netlify: Automatic
   - Custom server: Add compression middleware

3. **Analyze Bundle**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

   Update `next.config.js`:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })

   module.exports = withBundleAnalyzer(nextConfig)
   ```

   Run:
   ```bash
   ANALYZE=true npm run build
   ```

---

## 🔒 Security Best Practices

### Headers Configuration

Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

---

## 📈 Monitoring & Analytics

### Add Analytics

1. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

   In `app/layout.tsx`:
   ```typescript
   import { Analytics } from '@vercel/analytics/react'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

2. **Google Analytics**
   - Add tracking code to `app/layout.tsx`

---

## 🐛 Troubleshooting Deployment

### Build Fails

**Issue**: Dependencies not found
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: TypeScript errors
```bash
# Solution: Fix type errors
npm run lint
```

### Runtime Errors

**Issue**: 404 on routes
- Check `next.config.js` basePath
- Verify routing configuration

**Issue**: Images not loading
- Ensure `images.unoptimized: true` in config
- Check image paths

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📱 Mobile Testing

After deployment, test on:
- iOS Safari
- Android Chrome
- Various screen sizes
- Different network speeds

Use tools:
- [BrowserStack](https://www.browserstack.com)
- [LambdaTest](https://www.lambdatest.com)
- Chrome DevTools Device Mode

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All features work
- [ ] Images upload successfully
- [ ] Mockups generate properly
- [ ] Downloads work
- [ ] ZIP export functions
- [ ] Responsive on mobile
- [ ] Dark mode works
- [ ] No console errors
- [ ] Performance is good (Lighthouse score)

---

## 🎯 Recommended: Vercel Deployment

For this Next.js application, **Vercel is the recommended platform**:

```bash
# Quick deploy
npm install -g vercel
vercel login
vercel --prod
```

**Done!** Your app is live in minutes.

---

## 📞 Support

If you encounter issues:
- Check deployment platform docs
- Review build logs
- Test locally first
- Check browser console

---

**Happy Deploying! 🚀**
