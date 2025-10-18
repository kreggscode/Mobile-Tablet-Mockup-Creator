# 🚀 Complete Deployment & Monetization Guide

## 💰 Pricing Strategy: $9.99/month

---

## 📋 Table of Contents
1. [Razorpay Integration (India)](#razorpay-integration)
2. [Landing Page Setup](#landing-page)
3. [Deployment Options](#deployment)
4. [Domain Setup](#domain)
5. [Go Live Checklist](#checklist)

---

## 💳 Razorpay Integration (India)

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Sign up with your business details
3. Complete KYC verification
4. Get your API keys from Dashboard

### Step 2: Install Razorpay SDK
```bash
npm install razorpay
```

### Step 3: Create Payment API Route
Create `app/api/create-subscription/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();
    
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId, // Your plan ID from Razorpay dashboard
      customer_notify: 1,
      total_count: 12, // 12 months
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}
```

### Step 4: Environment Variables
Create `.env.local`:
```
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
```

### Step 5: Create Subscription Plan in Razorpay Dashboard
1. Login to Razorpay Dashboard
2. Go to **Subscriptions** → **Plans**
3. Click **Create Plan**
4. Set:
   - **Plan Name**: "Mockup Creator Pro"
   - **Billing Cycle**: Monthly
   - **Amount**: ₹749 (approximately $9.99)
   - **Currency**: INR
5. Copy the **Plan ID**

---

## 🎨 Landing Page with Pricing

### Create Landing Page Component
Create `app/landing/page.tsx`:

```typescript
'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // Create subscription
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: 'YOUR_PLAN_ID' }),
      });

      const { subscriptionId } = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: 'Mockup Creator Pro',
        description: 'Monthly Subscription',
        image: '/icon.svg',
        handler: function (response: any) {
          // Payment successful
          alert('Subscription successful!');
          router.push('/');
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#6366F1',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-600 font-semibold">Professional Mockup Generator</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Create Stunning
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Device Mockups
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your screenshots into professional mockups with text, stickers, and custom backgrounds. Perfect for App Store, social media, and marketing.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Start Creating - ₹749/month'}
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-xl"
            >
              Try Free Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Generate mockups in seconds with our powerful engine</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your images are processed securely and never stored</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Export Anywhere</h3>
            <p className="text-gray-600">Download in multiple formats and aspect ratios</p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Everything you need to create professional mockups</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-indigo-200">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full mb-4">
                <span className="text-indigo-600 font-bold">PRO PLAN</span>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold">₹749</span>
                <span className="text-2xl text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">Approximately $9.99 USD</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                'Unlimited mockup generation',
                '19 device templates (iPhone, Android, Tablets)',
                'Text overlays with 14 fonts',
                '60+ stickers & emojis',
                '18 background templates',
                'Multiple aspect ratios',
                'Batch export (ZIP & PNG)',
                'Priority support',
                'No watermarks',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-xl disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Razorpay • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
```

### Add Razorpay Script to Layout
Update `app/layout.tsx`:

```typescript
<head>
  <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
</head>
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - FREE)

**Pros**: 
- Free hosting
- Automatic deployments
- Built for Next.js
- Custom domain support
- SSL included

**Steps**:
1. Push code to GitHub
2. Go to https://vercel.com/
3. Click "Import Project"
4. Select your GitHub repo
5. Add environment variables:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
6. Click "Deploy"
7. Done! Your app is live at `your-app.vercel.app`

**Cost**: FREE (Hobby plan)

---

### Option 2: Netlify

**Steps**:
1. Push code to GitHub
2. Go to https://netlify.com/
3. Click "Add new site" → "Import from Git"
4. Select repo
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Add environment variables
8. Deploy

**Cost**: FREE (Starter plan)

---

### Option 3: Railway

**Steps**:
1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub"
3. Select repo
4. Add environment variables
5. Deploy

**Cost**: $5/month (after free trial)

---

## 🌍 Domain Setup

### Buy Domain (India)
**Recommended Providers**:
1. **GoDaddy India**: ₹99/year (.in domain)
2. **Hostinger**: ₹149/year
3. **Namecheap**: $8.88/year

### Connect Domain to Vercel
1. Buy domain from provider
2. In Vercel dashboard, go to your project
3. Click "Settings" → "Domains"
4. Add your domain (e.g., `mockupcreator.in`)
5. Copy the DNS records shown
6. Go to your domain provider
7. Add DNS records:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
8. Wait 24-48 hours for propagation
9. Done! Your site is live at your custom domain

---

## ✅ Go Live Checklist

### Before Launch:
- [ ] Test Razorpay payment flow
- [ ] Add Terms of Service page
- [ ] Add Privacy Policy page
- [ ] Add Refund Policy
- [ ] Test on mobile devices
- [ ] Test all features
- [ ] Setup Google Analytics
- [ ] Add contact email
- [ ] Test subscription cancellation
- [ ] Setup customer support email

### After Launch:
- [ ] Monitor Razorpay dashboard
- [ ] Check error logs in Vercel
- [ ] Respond to customer queries
- [ ] Collect user feedback
- [ ] Market on social media
- [ ] Create tutorial videos
- [ ] Write blog posts
- [ ] Submit to product directories

---

## 💡 Marketing Tips

### Social Media:
- Post mockup examples on Twitter/X
- Share on LinkedIn
- Create Instagram reels
- Join Facebook groups for app developers

### SEO:
- Write blog posts about mockup creation
- Create YouTube tutorials
- Submit to Product Hunt
- List on IndieHackers

### Pricing Psychology:
- ₹749/month = ₹25/day (less than a coffee!)
- Offer annual plan: ₹7,499/year (save ₹1,489)
- First month 50% off for early adopters

---

## 📊 Expected Costs

### Monthly Costs:
- **Hosting (Vercel)**: ₹0 (FREE)
- **Domain**: ₹10/month (₹120/year)
- **Razorpay fees**: 2% + ₹2 per transaction
  - Example: ₹749 subscription = ₹17 fee
  - Your profit: ₹732 per subscriber

### Break-even:
- **10 subscribers** = ₹7,320/month profit
- **50 subscribers** = ₹36,600/month profit
- **100 subscribers** = ₹73,200/month profit

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` to Git
2. **Always validate** payment webhooks
3. **Use HTTPS** only (automatic with Vercel)
4. **Implement rate limiting** for API routes
5. **Log all transactions** for audit trail

---

## 📞 Support

### Razorpay Support:
- Email: support@razorpay.com
- Phone: 1800-102-1281 (India)
- Docs: https://razorpay.com/docs/

### Vercel Support:
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions

---

## 🎉 You're Ready to Launch!

Follow this guide step-by-step and you'll have a fully functional, monetized mockup generator live in India!

**Good luck! 🚀**
