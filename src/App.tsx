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
  X,
  Check,
  ArrowRight,
  Zap,
  Shield,
  CreditCard,
  Users,
  BarChart3,
  LogOut,
  Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import ApexApp from './components/app/ApexApp';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type ViewMode = 'landing' | 'builder' | 'admin' | 'admin-login' | 'templates' | 'dashboard' | 'apex-app';
type DeviceMode = 'desktop' | 'mobile';
type EditorMode = 'visual' | 'code';

interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  html: string;
  css: string;
}

interface Order {
  id: string;
  plan: string;
  amount: number;
  status: 'pending' | 'completed';
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
}

// --- Mock Data ---
const TEMPLATES: Template[] = [
  {
    id: 'startup',
    name: 'StartUp Modern',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    html: `<section class="hero">
  <div class="container">
    <h1>Build Something Amazing</h1>
    <p>Launch your startup with a professional website in minutes.</p>
    <button class="btn-primary">Get Started</button>
  </div>
</section>`,
    css: `.hero { padding: 4rem 2rem; text-align: center; background: #f8f9fa; }
.container { max-width: 1200px; margin: 0 auto; }
h1 { font-size: 3.5rem; margin-bottom: 1rem; color: #1a1a1a; }
p { font-size: 1.25rem; color: #666; margin-bottom: 2rem; }
.btn-primary { background: #2563eb; color: white; padding: 1rem 2rem; border-radius: 0.5rem; border: none; font-weight: bold; cursor: pointer; }`
  },
  {
    id: 'portfolio',
    name: 'Creative Portfolio',
    category: 'Personal',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    html: `<header class="header">
  <nav>
    <div class="logo">Alex.Design</div>
    <div class="links">
      <a href="#work">Work</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>
  <div class="hero-content">
    <h1>Visual Designer & Art Director</h1>
  </div>
</header>`,
    css: `.header { padding: 2rem; background: #000; color: white; }
nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
.logo { font-weight: bold; font-size: 1.5rem; }
.links a { color: white; text-decoration: none; margin-left: 2rem; }
h1 { font-size: 4rem; max-width: 800px; line-height: 1.1; }`
  }
];

// --- Components ---

import { downloadSourceCode } from './utils/downloadSource';

const AdminDashboard = ({ orders, onLogout, paymentConfig, onSaveConfig }: { orders: Order[]; onLogout: () => void; paymentConfig: any; onSaveConfig: (config: any) => void }) => {
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const [localNum, setLocalNum] = useState(paymentConfig.localNumber);
  const [apiConfig, setApiConfig] = useState(paymentConfig.apiConfig || { apiKey: '', apiUser: '', isSandbox: true });
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Profit Split Logic (The Secret Agreement)
  const split = {
    googleUsers: totalRevenue * 0.25,
    googleDevs: totalRevenue * 0.25,
    projectGrowth: totalRevenue * 0.25,
    personalTools: totalRevenue * 0.25,
  };

  const handleDownloadSource = () => {
    downloadSourceCode(setIsDownloading);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold">مركز إدارة العمليات (خاص)</h1>
            <div className="flex gap-4">
              <button 
                onClick={handleDownloadSource}
                disabled={isDownloading}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري التحميل...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    تحميل الكود المصدري
                  </>
                )}
              </button>
              <button 
                onClick={onLogout}
                className="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-300 transition-all"
              >
                تسجيل الخروج
              </button>
              <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">حالة النظام: نشط</div>
            </div>
          </div>

        {/* Revenue Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'تطوير خدمات جوجل (عام)', amount: split.googleUsers, color: 'bg-blue-500' },
            { label: 'تطوير خدمات جوجل (مطورين)', amount: split.googleDevs, color: 'bg-purple-500' },
            { label: 'نمو وتطوير المشروع', amount: split.projectGrowth, color: 'bg-emerald-500' },
            { label: 'الأدوات الشخصية (شريكي)', amount: split.personalTools, color: 'bg-orange-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-white", item.color)}>
                <Rocket className="w-5 h-5" />
              </div>
              <div className="text-zinc-500 text-xs font-bold mb-1">{item.label}</div>
              <div className="text-2xl font-black">${item.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Payment Settings */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              إعدادات الدفع المحلي
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-zinc-500 mb-2">رقم المحفظة (فودافون كاش)</label>
                <input 
                  type="text" 
                  value={localNum}
                  onChange={(e) => setLocalNum(e.target.value)}
                  className="w-full p-3 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button 
                onClick={() => onSaveConfig({ ...paymentConfig, localNumber: localNum })}
                className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm opacity-50 pointer-events-none">
            <h2 className="font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              إعدادات الدفع الإلكتروني (قريباً)
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-xl text-sm text-zinc-500 text-center">
                سيتم تفعيل الربط مع Stripe و PayPal قريباً
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
          <h2 className="font-bold mb-6">أحدث الطلبات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-zinc-400 text-xs uppercase border-b border-zinc-100">
                  <th className="pb-4 font-bold">العميل</th>
                  <th className="pb-4 font-bold">الباقة</th>
                  <th className="pb-4 font-bold">المبلغ</th>
                  <th className="pb-4 font-bold">التاريخ</th>
                  <th className="pb-4 font-bold">الحالة</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-50 last:border-none hover:bg-zinc-50 transition-colors">
                    <td className="py-4 font-medium">{order.customer.name}</td>
                    <td className="py-4 text-zinc-500">{order.plan}</td>
                    <td className="py-4 font-bold">${order.amount}</td>
                    <td className="py-4 text-zinc-400">{order.date}</td>
                    <td className="py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-bold",
                        order.status === 'completed' ? "bg-emerald-100 text-emerald-600" : "bg-yellow-100 text-yellow-600"
                      )}>
                        {order.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutModal = ({ plan, onClose, localNumber }: { plan: any; onClose: () => void; localNumber: string }) => {
  const [method, setMethod] = useState<'card' | 'local'>('local');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">يلا نبدأ مشروعك</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl mb-8 flex justify-between items-center">
            <div>
              <div className="text-xs text-zinc-400 font-bold uppercase">الباقة اللي اخترتها</div>
              <div className="font-bold">{plan.name}</div>
            </div>
            <div className="text-2xl font-black">${plan.price}</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="text-sm font-bold text-zinc-500 mb-2">هتدفع إزاي؟</div>
            <button 
              onClick={() => setMethod('local')}
              className={cn(
                "w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between",
                method === 'local' ? "border-emerald-500 bg-emerald-50" : "border-zinc-100 hover:border-zinc-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Smartphone className="text-emerald-500 w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">دفع محلي (فودافون كاش / فوري)</div>
                  <div className="text-xs text-zinc-400">تحويل سريع ومباشر</div>
                </div>
              </div>
              {method === 'local' && <div className="w-4 h-4 bg-emerald-500 rounded-full" />}
            </button>

            <button 
              onClick={() => setMethod('card')}
              className={cn(
                "w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between",
                method === 'card' ? "border-emerald-500 bg-emerald-50" : "border-zinc-100 hover:border-zinc-200"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Save className="text-blue-500 w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">فيزا / ماستر كارد</div>
                  <div className="text-xs text-zinc-400">دفع إلكتروني آمن</div>
                </div>
              </div>
              {method === 'card' && <div className="w-4 h-4 bg-emerald-500 rounded-full" />}
            </button>
          </div>

          {method === 'local' ? (
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8">
              <div className="text-xs font-bold text-orange-700 mb-1">إزاي تدفع؟</div>
              <p className="text-xs text-orange-600 leading-relaxed">
                حول المبلغ على رقم الكاش ده: <strong>{localNumber}</strong>، وبعدين ابعت صورة التحويل على الواتساب عشان نفعل لك الحساب في ثواني.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              <input type="text" placeholder="رقم البطاقة" className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500" />
                <input type="text" placeholder="CVC" className="p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          )}

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-emerald-800 mb-1">ضمان استرجاع الأموال</h4>
                <p className="text-xs text-emerald-600">لو الخدمة معجبتكش في أول 14 يوم، فلوسك هترجعلك كاملة.</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            إتمام الدفع وتفعيل الحساب
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const LandingPage = ({ onStart, onSelectPlan, onSelectDomain, paymentConfig, setView }: { onStart: () => void; onSelectPlan: (plan: any) => void; onSelectDomain: (domain: string, price: string) => void; paymentConfig: any; setView: (view: ViewMode) => void }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadSource = () => {
    downloadSourceCode(setIsDownloading);
  };

  return (
    <div className="min-h-screen pt-16 bg-[#fcfcfc] overflow-hidden" dir="rtl">
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${paymentConfig.localNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">تحدث معنا</span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.403 0 6.556-5.332 11.891-11.891 11.891-2.01 0-3.98-.51-5.725-1.479l-6.271 1.697zm6.514-3.419c1.535.913 3.101 1.394 4.661 1.394 5.01 0 9.088-4.078 9.088-9.088 0-2.428-.946-4.711-2.662-6.427-1.717-1.717-4.001-2.662-6.426-2.662-5.01 0-9.088 4.078-9.088 9.088 0 1.745.501 3.45 1.448 4.934l-.959 3.502 3.588-.971zm11.374-5.624c-.273-.137-1.62-.8-1.87-.891-.249-.09-.431-.137-.613.137-.182.273-.706.891-.865 1.072-.158.182-.317.205-.59.069-.273-.137-1.15-.423-2.19-1.353-.809-.721-1.355-1.612-1.513-1.886-.158-.273-.017-.421.12-.557.123-.122.273-.318.409-.477.136-.159.182-.273.273-.454.091-.182.045-.341-.023-.477-.068-.136-.613-1.477-.841-2.023-.222-.533-.444-.46-.613-.468-.157-.008-.337-.01-.517-.01s-.473.067-.721.341c-.248.273-.948.926-.948 2.259 0 1.332.969 2.618 1.105 2.8s1.907 2.911 4.619 4.082c.645.278 1.148.445 1.54.57.648.206 1.238.177 1.703.108.519-.077 1.62-.662 1.848-1.3s.227-1.185.159-1.3-.251-.205-.524-.342z"/>
        </svg>
      </a>

      {/* Live Sale Notification */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          className="fixed bottom-8 left-8 z-50 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 flex items-center gap-4 max-w-sm"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">🎉</div>
          <div>
            <div className="text-sm font-bold">شخص ما من القاهرة</div>
            <div className="text-xs text-zinc-500">اشترى باقة الأعمال منذ 5 دقائق</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <Globe className="w-5 h-5" />
            </div>
            Apex Builder
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#features" className="hover:text-black transition-colors">المميزات</a>
            <a href="#templates" className="hover:text-black transition-colors">القوالب</a>
            <a href="#pricing" className="hover:text-black transition-colors">الأسعار</a>
            <button onClick={() => setView('apex-app')} className="text-cyan-600 font-bold hover:text-cyan-700 transition-colors">Apex App</button>
          </div>
          <button 
            onClick={onStart}
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            ابدأ مشروعك
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-zinc-100 px-4 py-2 rounded-full text-xs font-bold mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              أقوى منصة لبناء المواقع في الشرق الأوسط
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              ابني موقع أحلامك <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">في دقايق معدودة</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              مش محتاج تكون مبرمج ولا مصمم. مع Apex Builder، كل اللي عليك تختار القالب وتعدل عليه، ومبروك عليك موقع احترافي جاهز للشغل.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                ابدأ التجربة المجانية
              </button>
              <div className="flex items-center gap-4 text-sm font-bold text-zinc-500">
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> بدون فيزا</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> تجربة 14 يوم</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2400&q=80" 
              alt="Dashboard Preview" 
              className="rounded-[2.5rem] shadow-2xl border-8 border-white mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Domain Search */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">احجز اسم موقعك المميز</h2>
          <div className="flex gap-4 p-2 bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm">
            <input 
              type="text" 
              placeholder="اكتب اسم موقعك هنا (مثلاً: my-shop)"
              className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-bold px-4"
            />
            <select className="bg-transparent font-bold text-zinc-500 border-none focus:ring-0 cursor-pointer">
              <option>.com</option>
              <option>.net</option>
              <option>.org</option>
              <option>.store</option>
            </select>
            <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-6 h-6 text-yellow-500" />, title: 'سرعة خيالية', desc: 'مواقعنا سريعة جداً ومحسنة لمحركات البحث عشان تطلع في أول النتائج.' },
              { icon: <Layout className="w-6 h-6 text-blue-500" />, title: 'تصميمات عصرية', desc: 'قوالب جاهزة صممها محترفين عشان تناسب كل المجالات والأذواق.' },
              { icon: <Shield className="w-6 h-6 text-emerald-500" />, title: 'حماية وأمان', desc: 'شهادات SSL مجانية وحماية ضد الهجمات عشان بياناتك تكون في أمان.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">باقات تناسب حجم مشروعك</h2>
            <p className="text-zinc-500 mb-8">اختار الباقة اللي تريحك وابدأ رحلة نجاحك معانا النهاردة</p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={cn("text-sm font-bold transition-colors", billingCycle === 'monthly' ? "text-black" : "text-zinc-400")}>شهري</span>
              <button 
                onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                className="w-16 h-8 bg-zinc-100 rounded-full p-1 relative transition-colors hover:bg-zinc-200"
              >
                <motion.div 
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                  animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn("text-sm font-bold transition-colors", billingCycle === 'yearly' ? "text-black" : "text-zinc-400")}>
                سنوي <span className="text-emerald-500 text-xs bg-emerald-50 px-2 py-0.5 rounded-full mr-1">وفر 20%</span>
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                name: 'الباقة المجانية', 
                price: { monthly: '0', yearly: '0' }, 
                features: ['موقع واحد بسيط', 'نطاق فرعي (yourname.apex-builder.com)', 'قالب Apex الرسمي فقط', 'دعم فني محدود'] 
              },
              { 
                name: 'باقة الأعمال', 
                price: { monthly: '15', yearly: '130' }, 
                features: ['3 مواقع كاملة', 'دومين .com مجاني', 'استضافة سحابية سريعة', 'دعم فني متكامل', 'شهادة حماية SSL'] 
              },
              { 
                name: 'الباقة الاحترافية', 
                price: { monthly: '20', yearly: '170' }, 
                features: ['5 مواقع احترافية', 'دومين .com مجاني', 'استضافة سحابية VIP', 'دعم فني 24/7 (Any Time)', 'أولوية في الرد'], 
                popular: true 
              },
              { 
                name: 'باقة الشركات', 
                price: { monthly: 'تواصل معنا', yearly: 'تواصل معنا' }, 
                features: ['عدد مواقع غير محدود', 'حلول مخصصة للشركات', 'مدير حساب خاص', 'سيرفرات خاصة', 'تخصيص كامل للمنصة'] 
              },
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-8 rounded-3xl border transition-all hover:shadow-xl relative overflow-hidden",
                plan.popular ? "border-black shadow-lg scale-105 bg-zinc-900 text-white" : "border-zinc-100 bg-zinc-50"
              )}>
                {plan.popular && <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full w-fit mb-4">الأكثر طلباً</div>}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">
                    {isNaN(Number(billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly)) ? '' : '$'}
                    {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  {!isNaN(Number(billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly)) && (
                    <span className={plan.popular ? "text-zinc-400" : "text-zinc-500"}>/{billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Plus className="w-3 h-3 text-emerald-500" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onSelectPlan({ ...plan, price: billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly, cycle: billingCycle })}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold transition-all",
                    plan.popular ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-black text-white hover:bg-zinc-800"
                  )}
                >
                  {plan.price.yearly === 'تواصل معنا' ? 'تواصل لتحديد خطتك' : 'احجز مكانك دلوقتي'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
                  <Globe className="w-5 h-5" />
                </div>
                Apex Builder
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                المنصة الأولى عربياً لبناء المواقع الاحترافية. بنساعدك تبدأ مشروعك وتكبره بأقل تكلفة وأعلى جودة.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">المنتج</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">المميزات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">القوالب</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسعار</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">الشركة</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">عن الشركة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">قانوني</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2024 Apex Builder. جميع الحقوق محفوظة.</p>
            <div className="flex gap-4 items-center">
              <button 
                onClick={handleDownloadSource}
                disabled={isDownloading}
                className="text-zinc-600 hover:text-white transition-colors text-xs flex items-center gap-1 disabled:opacity-50"
              >
                {isDownloading ? (
                  <span className="animate-pulse">جاري التحميل...</span>
                ) : (
                  <>
                    <Code2 className="w-3 h-3" />
                    تحميل الكود المصدري
                  </>
                )}
              </button>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-zinc-100">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل دخول المسؤول</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-zinc-500 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
              placeholder="أدخل كلمة المرور"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">كلمة المرور غير صحيحة</p>}
          <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState({
    localNumber: '010xxxxxxxxx',
    apiConfig: null
  });

  // Mock Orders
  const [orders] = useState<Order[]>([
    { id: '1', plan: 'باقة الأعمال', amount: 29, status: 'completed', date: '2024-02-20', customer: { name: 'أحمد محمد', email: 'ahmed@example.com', phone: '01012345678' } },
    { id: '2', plan: 'الباقة الاحترافية', amount: 69, status: 'pending', date: '2024-02-21', customer: { name: 'سارة علي', email: 'sara@example.com', phone: '01123456789' } },
  ]);

  // Keyboard shortcut for admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setView('admin-login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage 
            onStart={() => setView('templates')}
            onSelectPlan={(plan) => setSelectedPlan(plan)}
            onSelectDomain={() => {}}
            paymentConfig={paymentConfig}
            setView={setView}
          />
          {selectedPlan && (
            <CheckoutModal 
              plan={selectedPlan} 
              onClose={() => setSelectedPlan(null)}
              localNumber={paymentConfig.localNumber}
            />
          )}
        </motion.div>
      ) : view === 'admin-login' ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginPage onLogin={() => {
            setIsAuthenticated(true);
            setView('dashboard');
          }} />
        </motion.div>
      ) : view === 'dashboard' && isAuthenticated ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AdminDashboard 
            orders={orders}
            onLogout={() => {
              setIsAuthenticated(false);
              setView('landing');
            }}
            paymentConfig={paymentConfig}
            onSaveConfig={setPaymentConfig}
          />
        </motion.div>
      ) : view === 'apex-app' ? (
        <motion.div
          key="apex-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ApexApp onNavigateHome={() => setView('landing')} />
        </motion.div>
      ) : (
        // Fallback for other views (templates, builder) - simplified for this restoration
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">جاري التحميل...</h2>
            <button onClick={() => setView('landing')} className="text-blue-500 underline">العودة للرئيسية</button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
