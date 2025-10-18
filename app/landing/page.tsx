'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, Shield, Download, Smartphone, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

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
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID }),
      });

      const { subscriptionId } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: 'Mockup Creator Pro',
        description: 'Monthly Subscription - ₹749/month',
        image: '/icon.svg',
        handler: function (response: any) {
          alert('🎉 Subscription successful! Welcome to Mockup Creator Pro!');
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
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Mockup Creator Pro
                </span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                Try Demo
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-600 font-semibold">Professional Mockup Generator</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Create Stunning
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Device Mockups
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your screenshots into professional mockups with drag-and-drop text, 60+ stickers, and beautiful backgrounds. Perfect for App Store, social media, and marketing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-2xl disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Processing...' : (
                  <>
                    Start Creating - ₹749/month
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-xl border-2 border-gray-200"
              >
                Try Free Demo
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              💳 Secure payment via Razorpay • Cancel anytime • No hidden fees
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600 text-lg">Generate mockups in seconds with our powerful engine. Drag text with your mouse!</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
              <p className="text-gray-600 text-lg">Your images are processed securely in your browser. Never stored on servers.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Export Anywhere</h3>
              <p className="text-gray-600 text-lg">Download in multiple formats: PNG, ZIP. Multiple aspect ratios supported.</p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600">Everything you need to create professional mockups</p>
            </div>

            <div className="relative">
              {/* Popular Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <div className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-xl">
                  ⭐ MOST POPULAR
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-indigo-200 hover:border-indigo-300 transition-colors">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full mb-4">
                    <span className="text-indigo-600 font-bold">PRO PLAN</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹749</span>
                    <span className="text-2xl text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">Approximately $9.99 USD</p>
                  <p className="text-sm text-gray-500 mt-2">That's just ₹25/day - less than a coffee! ☕</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { text: 'Unlimited mockup generation', highlight: true },
                    { text: '19 device templates (iPhone 16/17, Android, Tablets)', highlight: false },
                    { text: 'Drag-and-drop text positioning with mouse', highlight: true },
                    { text: '14 beautiful fonts + custom styling', highlight: false },
                    { text: '60+ stickers & emojis', highlight: false },
                    { text: '18 stunning background templates', highlight: true },
                    { text: 'Transparent background option', highlight: false },
                    { text: 'Multiple aspect ratios (9:16, 1:1, 16:9)', highlight: false },
                    { text: 'Batch export (ZIP & individual PNGs)', highlight: false },
                    { text: 'Priority email support', highlight: false },
                    { text: 'No watermarks ever', highlight: true },
                    { text: 'Cancel anytime - no questions asked', highlight: false },
                  ].map((feature, index) => (
                    <div key={index} className={`flex items-center gap-3 ${feature.highlight ? 'bg-indigo-50 -mx-4 px-4 py-2 rounded-lg' : ''}`}>
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className={`${feature.highlight ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing Payment...' : (
                    <>
                      Subscribe Now & Start Creating
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Secure payment powered by Razorpay • 100% money-back guarantee
                </p>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <Shield className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <p className="font-bold text-green-900">30-Day Money-Back Guarantee</p>
                  <p className="text-sm text-green-700">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes! Cancel your subscription anytime from your account dashboard. No cancellation fees.',
                },
                {
                  q: 'Do you store my images?',
                  a: 'No! All processing happens in your browser. Your images never leave your device.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit/debit cards, UPI, Net Banking via Razorpay.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! Try the demo version for free. Subscribe when you\'re ready for unlimited access.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Create Amazing Mockups?</h2>
            <p className="text-xl mb-8 opacity-90">Join hundreds of creators using Mockup Creator Pro</p>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl"
            >
              {loading ? 'Processing...' : 'Start Your Subscription Now'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-gray-400">© 2025 Mockup Creator Pro. All rights reserved.</p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white">Refund Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
