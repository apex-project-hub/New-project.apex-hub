/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Code2, 
  Layout, 
  Rocket, 
  Search, 
  Plus, 
  ChevronRight, 
  Monitor, 
  Smartphone, 
  Save,
  Eye,
  Settings,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type ViewMode = 'landing' | 'builder';
type EditorMode = 'visual' | 'code';
type DeviceMode = 'desktop' | 'mobile';

interface SiteProject {
  id: string;
  name: string;
  html: string;
  css: string;
  lastModified: number;
}

// --- Components ---

const Navbar = ({ onStart }: { onStart: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Rocket className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">APEX</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#" className="hover:text-black transition-colors">المميزات</a>
          <a href="#" className="hover:text-black transition-colors">الأسعار</a>
          <a href="#" className="hover:text-black transition-colors">النطاقات</a>
          <a href="#" className="hover:text-black transition-colors">المجتمع</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">تسجيل الدخول</button>
          <button 
            onClick={onStart}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95"
          >
            ابدأ الآن
          </button>
        </div>
      </div>
    </nav>
  );
};

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen pt-16 bg-[#fcfcfc] overflow-hidden" dir="rtl">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-6 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              جديد: محرر الذكاء الاصطناعي
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
              نمو اعمالك <br />
              <span className="text-zinc-400 italic font-serif">هو هدفنا</span>
            </h1>
            <p className="text-xl text-zinc-600 mb-10 max-w-xl leading-relaxed">
              أنشئ موقعك الإلكتروني الاحترافي في دقائق. سواء كنت تفضل السحب والإفلات أو كتابة الكود البرمجي، نحن نوفر لك كل الأدوات التي تحتاجها للنجاح.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <button 
                onClick={onStart}
                className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-800 transition-all flex items-center gap-3 group shadow-xl shadow-black/10"
              >
                ابدأ بناء موقعك
                <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-zinc-200 text-zinc-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-50 transition-all">
                استكشف القوالب
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 grayscale opacity-50">
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">موثوق من قبل</div>
              <div className="flex gap-8 items-center">
                <span className="font-black text-xl">TECH</span>
                <span className="font-black text-xl">FLOW</span>
                <span className="font-black text-xl">NEXUS</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://myapex0.wordpress.com/wp-content/uploads/2026/02/img_20260220_122320_829.webp?w=1024" 
                alt="Apex Builder Showcase" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 right-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Rocket className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">تم النشر بنجاح</div>
                      <div className="text-white/70 text-xs">my-business.apex.com</div>
                    </div>
                  </div>
                  <div className="text-white font-mono text-xs bg-black/20 px-2 py-1 rounded">
                    2.4s load time
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-400/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-zinc-400/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Domain Search Section */}
      <section className="bg-zinc-900 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">ابحث عن نطاقك المثالي</h2>
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="ابحث عن اسم نطاق... (مثال: mybusiness.com)"
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-8 pr-16 text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-right"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 w-6 h-6" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all">
              بحث
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <span>.com $9.99</span>
            <span>.net $12.99</span>
            <span>.org $11.99</span>
            <span>.me $8.99</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const Builder = () => {
  const [editorMode, setEditorMode] = useState<EditorMode>('visual');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [html, setHtml] = useState('<h1>مرحباً بك في موقعك الجديد</h1><p>ابدأ التعديل الآن...</p>');
  const [css, setCss] = useState('body { font-family: sans-serif; text-align: center; padding: 50px; } h1 { color: #10b981; }');

  const previewContent = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body dir="rtl">
        ${html}
      </body>
    </html>
  `;

  return (
    <div className="h-screen flex flex-col bg-zinc-50 overflow-hidden" dir="rtl">
      {/* Builder Header */}
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <Rocket className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-sm">مشروعي الأول</span>
          </div>
          <div className="h-4 w-px bg-zinc-200 mx-2" />
          <div className="flex bg-zinc-100 p-1 rounded-lg">
            <button 
              onClick={() => setEditorMode('visual')}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-2",
                editorMode === 'visual' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              <Layout className="w-3 h-3" />
              مرئي
            </button>
            <button 
              onClick={() => setEditorMode('code')}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-2",
                editorMode === 'code' ? "bg-white shadow-sm text-black" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              <Code2 className="w-3 h-3" />
              كود
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-100 p-1 rounded-lg">
            <button 
              onClick={() => setDevice('desktop')}
              className={cn(
                "p-1.5 rounded-md transition-all",
                device === 'desktop' ? "bg-white shadow-sm text-black" : "text-zinc-400"
              )}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setDevice('mobile')}
              className={cn(
                "p-1.5 rounded-md transition-all",
                device === 'mobile' ? "bg-white shadow-sm text-black" : "text-zinc-400"
              )}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          <div className="h-4 w-px bg-zinc-200 mx-2" />
          <button className="text-zinc-500 hover:text-black p-2 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all flex items-center gap-2">
            <Save className="w-4 h-4" />
            حفظ ونشر
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Tools */}
        <aside className="w-64 bg-white border-l border-zinc-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-zinc-100">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">العناصر</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[
              { icon: <Plus className="w-4 h-4" />, label: 'قسم جديد' },
              { icon: <Layout className="w-4 h-4" />, label: 'شبكة صور' },
              { icon: <Globe className="w-4 h-4" />, label: 'نموذج اتصال' },
              { icon: <Rocket className="w-4 h-4" />, label: 'زر إجراء' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50 cursor-grab transition-all group">
                <div className="text-zinc-400 group-hover:text-emerald-500">{item.icon}</div>
                <span className="text-sm font-medium text-zinc-600">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-zinc-100">
            <button className="w-full flex items-center justify-between p-2 text-zinc-500 hover:text-black transition-colors">
              <span className="text-xs font-bold">الإعدادات</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 bg-zinc-100 p-8 overflow-y-auto flex flex-col items-center">
          {editorMode === 'code' ? (
            <div className="w-full max-w-5xl h-full grid grid-rows-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-400 mb-2">HTML</label>
                <textarea 
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="flex-1 bg-zinc-900 text-zinc-100 p-4 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-zinc-400 mb-2">CSS</label>
                <textarea 
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="flex-1 bg-zinc-900 text-zinc-100 p-4 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  dir="ltr"
                />
              </div>
            </div>
          ) : (
            <div 
              className={cn(
                "bg-white shadow-2xl transition-all duration-500 overflow-hidden rounded-sm",
                device === 'desktop' ? "w-full max-w-5xl aspect-video" : "w-[375px] h-[667px]"
              )}
            >
              <iframe 
                title="Preview"
                srcDoc={previewContent}
                className="w-full h-full border-none"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewMode>('landing');

  return (
    <div className="font-sans antialiased text-zinc-900">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar onStart={() => setView('builder')} />
            <LandingPage onStart={() => setView('builder')} />
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen"
          >
            <Builder />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
