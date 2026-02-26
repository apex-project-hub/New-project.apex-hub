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
  ArrowRight,
  ShoppingBag,
  Utensils,
  Briefcase,
  Hammer,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DomainService } from './services/domainService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---

type ViewMode = 'landing' | 'builder' | 'admin' | 'admin-login' | 'templates' | 'dashboard';
type EditorMode = 'visual' | 'code';
type DeviceMode = 'desktop' | 'mobile';

interface UserSite {
  id: string;
  name: string;
  html: string;
  css: string;
  updatedAt: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  html: string;
  css: string;
}

interface Order {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  status: 'pending' | 'completed';
  date: string;
}

interface SiteProject {
  id: string;
  name: string;
  html: string;
  css: string;
  lastModified: number;
}

// --- Components ---

const AdminDashboard = ({ orders, onLogout, paymentConfig, onSaveConfig }: { orders: Order[]; onLogout: () => void; paymentConfig: any; onSaveConfig: (config: any) => void }) => {
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const [localNum, setLocalNum] = useState(paymentConfig.localNumber);
  const [apiConfig, setApiConfig] = useState(paymentConfig.apiConfig || { apiKey: '', apiUser: '', isSandbox: true });
  
  // Profit Split Logic (The Secret Agreement)
  const split = {
    googleUsers: totalRevenue * 0.25,
    googleDevs: totalRevenue * 0.25,
    projectGrowth: totalRevenue * 0.25,
    personalTools: totalRevenue * 0.25,
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">لوحة تحكم الشركاء (سري)</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                alert('جاري تجهيز ملفات المنصة... سيتم التحميل خلال لحظات');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              تحميل سورس المنصة
            </button>
            <button 
              onClick={onLogout}
              className="bg-zinc-200 text-zinc-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-300 transition-all"
            >
              تسجيل الخروج
            </button>
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">متصل بالخادم الرئيسي</div>
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
                <label className="block text-xs font-bold text-zinc-400 mb-2">رقم فودافون كاش الخاص بك</label>
                <input 
                  type="text" 
                  value={localNum}
                  onChange={(e) => setLocalNum(e.target.value)}
                  className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="010XXXXXXXX"
                />
              </div>
              <button 
                onClick={() => onSaveConfig({ ...paymentConfig, localNumber: localNum })}
                className="w-full bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all"
              >
                حفظ الرقم
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h2 className="font-bold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              إعدادات Namecheap API
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">API Key</label>
                <input 
                  type="password" 
                  value={apiConfig.apiKey}
                  onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                  className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل الـ API Key هنا"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2">API Username</label>
                <input 
                  type="text" 
                  value={apiConfig.apiUser}
                  onChange={(e) => setApiConfig({ ...apiConfig, apiUser: e.target.value })}
                  className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل اسم المستخدم هنا"
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <input 
                  type="checkbox" 
                  id="sandbox"
                  checked={apiConfig.isSandbox}
                  onChange={(e) => setApiConfig({ ...apiConfig, isSandbox: e.target.checked })}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="sandbox" className="text-sm font-bold text-blue-800 cursor-pointer">تفعيل وضع التجربة (Sandbox Mode)</label>
              </div>
              <button 
                onClick={() => onSaveConfig({ ...paymentConfig, apiConfig })}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                ربط المحرك الحقيقي
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
            <h2 className="font-bold">آخر عمليات الشراء</h2>
            <button className="text-sm text-emerald-600 font-bold">تصدير البيانات</button>
          </div>
          <table className="w-full text-right">
            <thead className="bg-zinc-50 text-zinc-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4">العميل</th>
                <th className="p-4">الباقة</th>
                <th className="p-4">المبلغ</th>
                <th className="p-4">طريقة الدفع</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-left">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-bold">{order.customer}</td>
                  <td className="p-4 text-zinc-600">{order.plan}</td>
                  <td className="p-4 font-mono font-bold">${order.amount}</td>
                  <td className="p-4">
                    <span className="bg-zinc-100 px-2 py-1 rounded text-[10px] font-bold">محلي (فودافون كاش)</span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      order.status === 'completed' ? "bg-emerald-100 text-emerald-700" : 
                      order.status === 'pending' ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {order.status === 'completed' ? 'تم التفعيل' : 
                       order.status === 'pending' ? 'بانتظار المراجعة' : 'جاري الحجز'}
                    </span>
                  </td>
                  <td className="p-4 text-left">
                    {order.status === 'pending' && (
                      <button className="text-[10px] font-black text-blue-600 hover:underline">تأكيد وبدء الحجز</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (user: string, pass: string) => void }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'apex2026') {
      onLogin(user, pass);
    } else {
      setError('بيانات الدخول غير صحيحة يا شريكي');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-6" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2">دخول الشركاء</h2>
          <p className="text-zinc-500">أهلاً بك يا شريكي، أدخل كلمة السر للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2 mr-2">اسم المستخدم</label>
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-4 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500" 
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase mb-2 mr-2">كلمة المرور</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-4 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500" 
              placeholder="••••••••"
            />
          </div>
          
          {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
          >
            تسجيل الدخول
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onStart }: { onStart: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Rocket className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">RELATE STUDIO</span>
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

const DomainSearch = ({ onSelect, paymentConfig }: { onSelect: (domain: string, price: string) => void; paymentConfig: any }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ domain: string; available: boolean; price: string }[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show apex builder by default
    const showDefaultResults = async () => {
      setQuery('relate studio');
      setLoading(true);
      const extensions = ['.com', '.net', '.xyz', '.site', '.online', '.ai'];
      const defaultResults = await Promise.all(
        extensions.map(ext => DomainService.checkAvailability('relatestudio' + ext, paymentConfig.apiConfig))
      );
      setResults(defaultResults);
      setLoading(false);
    };
    showDefaultResults();
  }, [paymentConfig.apiConfig]);

  const checkDomain = async () => {
    if (!query) return;
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const extensions = ['.com', '.net', '.xyz', '.site', '.online', '.ai'];
    const results = await Promise.all(
      extensions.map(ext => DomainService.checkAvailability(query.split('.')[0] + ext, paymentConfig.apiConfig))
    );
    
    setResults(results);
    setLoading(false);
  };

  return (
    <section className="bg-zinc-900 py-24 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">ابحث عن نطاقك المثالي</h2>
        <div className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
            placeholder="ابحث عن اسم نطاق... (مثال: mybusiness)"
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-8 pr-16 text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-right"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 w-6 h-6" />
          <button 
            onClick={checkDomain}
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all disabled:opacity-50"
          >
            {loading ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>

        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 grid gap-4 max-w-2xl mx-auto"
            >
              {results.map((res, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-3 h-3 rounded-full", res.available ? "bg-emerald-500" : "bg-red-500")} />
                    <span className="text-lg font-mono">{res.domain}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">${res.price}/yr</span>
                    <button 
                      disabled={!res.available}
                      onClick={() => onSelect(res.domain, res.price)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                        res.available ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      )}
                    >
                      {res.available ? 'حجز الآن' : 'غير متوفر'}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!results && (
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <span>.com $9.99</span>
            <span>.net $12.99</span>
            <span>.org $11.99</span>
            <span>.me $8.99</span>
          </div>
        )}
      </div>
    </section>
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
            <h2 className="text-2xl font-bold">إتمام الاشتراك</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl mb-8 flex justify-between items-center">
            <div>
              <div className="text-xs text-zinc-400 font-bold uppercase">الباقة المختارة</div>
              <div className="font-bold">{plan.name}</div>
            </div>
            <div className="text-2xl font-black">${plan.price}</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="text-sm font-bold text-zinc-500 mb-2">اختر طريقة الدفع:</div>
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
                  <div className="text-xs text-zinc-400">تحويل مباشر سريع</div>
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
                  <div className="font-bold text-sm">بطاقة ائتمان</div>
                  <div className="text-xs text-zinc-400">Visa / Mastercard</div>
                </div>
              </div>
              {method === 'card' && <div className="w-4 h-4 bg-emerald-500 rounded-full" />}
            </button>
          </div>

          {method === 'local' ? (
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8">
              <div className="text-xs font-bold text-orange-700 mb-1">تعليمات الدفع:</div>
              <p className="text-xs text-orange-600 leading-relaxed">
                قم بتحويل المبلغ إلى الرقم <strong>{localNumber}</strong> ثم أرسل صورة التحويل عبر واتساب لتفعيل الحساب فوراً.
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
                  <h3 className="font-bold text-emerald-900 mb-2">ماذا يحدث بعد الدفع؟</h3>
                  <ul className="text-xs text-emerald-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      سيتم مراجعة التحويل خلال دقائق.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      سنقوم بحجز النطاق العالمي (Domain) فوراً.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      تستغرق عملية ربط الخوادم (DNS) من 15 إلى 30 دقيقة.
                    </li>
                  </ul>
                </div>
                <button 
                  onClick={onClose}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all"
                >
                  تم التحويل، بانتظار التفعيل
                </button>
        </div>
      </motion.div>
    </div>
  );
};

const LandingPage = ({ onStart, onSelectPlan, onSelectDomain, paymentConfig, setView }: { onStart: () => void; onSelectPlan: (plan: any) => void; onSelectDomain: (domain: string, price: string) => void; paymentConfig: any; setView: (view: ViewMode) => void }) => {
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
              Relate Studio <br />
              <span className="text-zinc-400 italic font-serif">حيث يبدأ الإبداع</span>
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

      {/* Categories Section */}
      <section className="py-16 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">تصفح حسب الفئة</h2>
            <button onClick={() => setView('templates')} className="text-emerald-600 font-bold text-sm">عرض الكل</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'تجارة إلكترونية', icon: <ShoppingBag className="w-5 h-5" />, category: 'ecommerce' },
              { name: 'مطاعم', icon: <Utensils className="w-5 h-5" />, category: 'restaurants' },
              { name: 'شركات', icon: <Briefcase className="w-5 h-5" />, category: 'corporate' },
              { name: 'بناء', icon: <Hammer className="w-5 h-5" />, category: 'construction' },
              { name: 'طب', icon: <Stethoscope className="w-5 h-5" />, category: 'medical' },
              { name: 'تعليم', icon: <BookOpen className="w-5 h-5" />, category: 'education' },
            ].map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setView('templates')}
                className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group text-center"
              >
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-zinc-400 group-hover:text-emerald-500 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-sm font-bold text-zinc-600 group-hover:text-emerald-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Search Section */}
      <DomainSearch onSelect={onSelectDomain} paymentConfig={paymentConfig} />

      {/* Testimonials Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">ماذا يقول شركاؤنا؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'محمد العتيبي', role: 'رائد أعمال', text: 'أفضل منصة استخدمتها لبناء موقعي. السرعة والسهولة لا تصدق!' },
              { name: 'ليلى حسن', role: 'مصممة جرافيك', text: 'المحرر المرئي أعطاني حرية كاملة في التصميم دون الحاجة لكود.' },
              { name: 'ياسين كمال', role: 'مطور ويب', text: 'إمكانية التعديل على الكود مباشرة جعلتني أفضل هذه المنصة على ووردبريس.' },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                <p className="text-zinc-400 italic mb-6">"{t.text}"</p>
                <div className="font-bold">{t.name}</div>
                <div className="text-emerald-500 text-xs">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">خطط تناسب طموحك</h2>
            <p className="text-zinc-500">اختر الخطة المناسبة وابدأ رحلة نجاحك اليوم</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'المبتدئ', price: '0', features: ['موقع واحد', 'نطاق فرعي apex.com', 'قوالب أساسية', 'دعم عبر البريد'] },
              { name: 'الاحترافي', price: '19', features: ['5 مواقع', 'نطاق .com مجاني', 'قوالب متميزة', 'بدون إعلانات', 'دعم فني 24/7'], popular: true },
              { name: 'الشركات', price: '49', features: ['مواقع غير محدودة', 'نطاقات متعددة', 'أدوات سيو متقدمة', 'مدير حساب مخصص', 'تخزين غير محدود'] },
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-8 rounded-3xl border transition-all hover:shadow-xl",
                plan.popular ? "border-black shadow-lg scale-105 bg-zinc-900 text-white" : "border-zinc-100 bg-zinc-50"
              )}>
                {plan.popular && <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full w-fit mb-4">الأكثر شيوعاً</div>}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={plan.popular ? "text-zinc-400" : "text-zinc-500"}>/شهرياً</span>
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
                  onClick={() => onSelectPlan(plan)}
                  className={cn(
                    "w-full py-3 rounded-xl font-bold transition-all",
                    plan.popular ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-black text-white hover:bg-zinc-800"
                  )}
                >
                  اشترك الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            {[
              { q: 'هل يمكنني ربط دومين خاص بي؟', a: 'نعم، يمكنك ربط أي دومين تملكه أو شراء دومين جديد من خلالنا.' },
              { q: 'هل المواقع متجاوبة مع الجوال؟', a: 'بالتأكيد، كل القوالب والمكونات مصممة لتعمل بشكل مثالي على كافة الأجهزة.' },
              { q: 'هل هناك دعم فني بالعربي؟', a: 'نعم، فريقنا متاح 24/7 لدعمك باللغة العربية والإنجليزية.' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                <h3 className="font-bold mb-2">{f.q}</h3>
                <p className="text-zinc-500 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">خارطة طريق المشروع</h2>
          <div className="space-y-12">
            {[
              { step: '01', title: 'إطلاق المنصة التجريبية', desc: 'توفير المحرر المرئي ومحرك البحث عن النطاقات (الحالة الحالية).', status: 'done' },
              { step: '02', title: 'ربط بوابات الدفع', desc: 'تفعيل Stripe و PayPal لاستقبال المدفوعات الحقيقية.', status: 'next' },
              { step: '03', title: 'أتمتة حجز النطاقات', desc: 'ربط API مع Namecheap لحجز الدومين فور الشراء.', status: 'pending' },
              { step: '04', title: 'نظام الاستضافة السحابية', desc: 'نشر مواقع العملاء بضغطة زر على خوادم فائقة السرعة.', status: 'pending' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0",
                  item.status === 'done' ? "bg-emerald-500 text-white" : 
                  item.status === 'next' ? "bg-black text-white animate-pulse" : "bg-zinc-200 text-zinc-500"
                )}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                    {item.title}
                    {item.status === 'done' && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">مكتمل</span>}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <Rocket className="text-white w-4 h-4" />
            </div>
            <span className="font-bold">APEX BUILDER</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-black">الشروط والأحكام</a>
            <a href="#" className="hover:text-black">سياسة الخصوصية</a>
            <a href="#" className="hover:text-black">اتصل بنا</a>
          </div>
          <div className="text-sm text-zinc-400">© 2026 جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  );
};

const TemplateGallery = ({ onSelect }: { onSelect: (template: Template) => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'ecommerce', name: 'تجارة إلكترونية' },
    { id: 'restaurants', name: 'مطاعم' },
    { id: 'corporate', name: 'شركات' },
    { id: 'construction', name: 'بناء' },
    { id: 'medical', name: 'طب' },
    { id: 'education', name: 'تعليم' },
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'مطعم عصري',
      description: 'تصميم أنيق للمطاعم والكافيهات مع قائمة طعام جذابة.',
      category: 'restaurants',
      thumbnail: 'https://picsum.photos/seed/restaurant/800/600',
      html: '<header><h1>مطعمنا المتميز</h1><p>أشهى المأكولات في قلب المدينة</p></header><section><h2>قائمة الطعام</h2><ul><li>بيتزا إيطالية</li><li>باستا طازجة</li></ul></section>',
      css: 'body { font-family: serif; background: #fffaf0; color: #4a3728; text-align: center; padding: 40px; } header { border-bottom: 2px solid #d4a373; margin-bottom: 40px; padding-bottom: 20px; } h1 { font-size: 3rem; color: #bc6c25; } ul { list-style: none; padding: 0; } li { font-size: 1.2rem; margin: 10px 0; }'
    },
    {
      id: '2',
      name: 'محفظة أعمال (Portfolio)',
      description: 'مثالي للمصممين والمطورين لعرض أعمالهم بشكل احترافي.',
      category: 'corporate',
      thumbnail: 'https://picsum.photos/seed/portfolio/800/600',
      html: '<nav><span>أحمد المطور</span></nav><main><h1>أصنع تجارب رقمية مذهلة</h1><div class="grid"><div class="card">مشروع 1</div><div class="card">مشروع 2</div></div></main>',
      css: 'body { font-family: sans-serif; background: #0a0a0a; color: #fff; padding: 40px; } nav { margin-bottom: 60px; font-weight: bold; font-size: 1.2rem; } h1 { font-size: 4rem; letter-spacing: -2px; margin-bottom: 40px; } .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; } .card { background: #1a1a1a; padding: 60px; border-radius: 20px; border: 1px solid #333; text-align: center; }'
    },
    {
      id: '3',
      name: 'متجر إلكتروني بسيط',
      description: 'ابدأ بيع منتجاتك اليوم مع هذا القالب المتجاوب.',
      category: 'ecommerce',
      thumbnail: 'https://picsum.photos/seed/shop/800/600',
      html: '<header><h1>متجري الذكي</h1></header><div class="products"><div class="item"><h3>ساعة ذكية</h3><p>$99</p><button>شراء الآن</button></div><div class="item"><h3>سماعات لاسلكية</h3><p>$59</p><button>شراء الآن</button></div></div>',
      css: 'body { font-family: system-ui; background: #f4f4f5; padding: 20px; } header { background: #000; color: #fff; padding: 20px; border-radius: 15px; margin-bottom: 30px; text-align: center; } .products { display: flex; gap: 20px; justify-content: center; } .item { background: #fff; padding: 20px; border-radius: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); text-align: center; width: 200px; } button { background: #10b981; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin-top: 10px; }'
    }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-50 py-20 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black mb-2">اختر قالبك المفضل</h1>
            <p className="text-zinc-500">ابدأ بموقع مصمم باحترافية وعدله كما تشاء.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all",
                  activeCategory === cat.id ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-white text-zinc-500 hover:bg-zinc-100"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <motion.div 
              key={template.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-zinc-100 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => onSelect(template)}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold shadow-xl"
                  >
                    اختيار هذا القالب
                  </button>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UserDashboard = ({ sites, onEdit, onCreate }: { sites: UserSite[]; onEdit: (site: UserSite) => void; onCreate: () => void }) => {
  return (
    <div className="min-h-screen bg-zinc-50 py-20 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">مرحباً بك مجدداً</h1>
            <p className="text-zinc-500">إليك قائمة بمواقعك الإلكترونية</p>
          </div>
          <button 
            onClick={onCreate}
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
          >
            <Plus className="w-5 h-5" />
            إنشاء موقع جديد
          </button>
        </div>

        {sites.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-zinc-100">
            <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Globe className="text-zinc-400 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">لا توجد مواقع بعد</h2>
            <p className="text-zinc-500 mb-8">ابدأ الآن وأنشئ أول موقع احترافي لك</p>
            <button onClick={onCreate} className="text-emerald-500 font-bold hover:underline">ابدأ من هنا</button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {sites.map((site) => (
              <div key={site.id} className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                  <Globe className="text-emerald-500 w-6 h-6 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-1">{site.name}</h3>
                <p className="text-zinc-400 text-xs mb-6">آخر تعديل: {new Date(site.updatedAt).toLocaleDateString('ar-EG')}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => onEdit(site)}
                    className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-all"
                  >
                    تعديل الموقع
                  </button>
                  <button className="p-3 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-all">
                    <Eye className="w-5 h-5 text-zinc-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Builder = ({ initialHtml, initialCss, onSave }: { initialHtml?: string; initialCss?: string; onSave: (html: string, css: string) => void }) => {
  const [editorMode, setEditorMode] = useState<EditorMode>('visual');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [html, setHtml] = useState(initialHtml || '<h1>مرحباً بك في موقعك الجديد</h1><p>ابدأ التعديل الآن...</p>');
  const [css, setCss] = useState(initialCss || 'body { font-family: sans-serif; text-align: center; padding: 50px; } h1 { color: #10b981; }');

  const [showExport, setShowExport] = useState(false);
  const [showSeoAssistant, setShowSeoAssistant] = useState(false);
  const [seoQuery, setSeoQuery] = useState('');
  const [seoAnalysis, setSeoAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addComponent = (type: string) => {
    let newHtml = '';
    if (type === 'section') {
      newHtml = '<section style="padding: 60px; background: #f9f9f9; border-radius: 20px; margin: 20px 0;"><h2>قسم جديد</h2><p>أضف محتواك هنا...</p></section>';
    } else if (type === 'grid') {
      newHtml = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;"><div style="background: #eee; padding: 40px; border-radius: 15px;">عنصر 1</div><div style="background: #eee; padding: 40px; border-radius: 15px;">عنصر 2</div></div>';
    } else if (type === 'button') {
      newHtml = '<button style="background: #000; color: #fff; padding: 15px 30px; border-radius: 10px; border: none; font-weight: bold; cursor: pointer; margin: 10px 0;">اضغط هنا</button>';
    }
    setHtml(prev => prev + newHtml);
  };

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
          <button 
            onClick={() => setShowSeoAssistant(true)}
            className="text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-bold">مساعد SEO</span>
          </button>
          <div className="h-4 w-px bg-zinc-200 mx-2" />
          <button 
            onClick={() => setShowExport(true)}
            className="text-zinc-500 hover:text-black p-2 transition-colors flex items-center gap-2"
          >
            <Code2 className="w-5 h-5" />
            <span className="text-xs font-bold">تصدير الكود</span>
          </button>
          <div className="h-4 w-px bg-zinc-200 mx-2" />
          <button className="text-zinc-500 hover:text-black p-2 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onSave(html, css)}
            className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all flex items-center gap-2"
          >
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
              { icon: <Plus className="w-4 h-4" />, label: 'قسم جديد', type: 'section' },
              { icon: <Layout className="w-4 h-4" />, label: 'شبكة صور', type: 'grid' },
              { icon: <Rocket className="w-4 h-4" />, label: 'زر إجراء', type: 'button' },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => addComponent(item.type)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50 cursor-pointer transition-all group text-right"
              >
                <div className="text-zinc-400 group-hover:text-emerald-500">{item.icon}</div>
                <span className="text-sm font-medium text-zinc-600">{item.label}</span>
              </button>
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

      {/* SEO Assistant Sidebar */}
      <AnimatePresence>
        {showSeoAssistant && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-[250] border-r border-zinc-200 flex flex-col"
            dir="rtl"
          >
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-purple-50">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-600" />
                <h2 className="font-bold text-purple-900">مساعد Relate AI الذكي</h2>
              </div>
              <button onClick={() => setShowSeoAssistant(false)} className="p-2 hover:bg-purple-100 rounded-full">
                <X className="w-5 h-5 text-purple-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-zinc-50 p-4 rounded-2xl mb-6 border border-zinc-100">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  أنا هنا لمساعدتك في تصدر نتائج البحث. يمكنني تحليل محتوى موقعك واقتراح كلمات مفتاحية بناءً على بيانات جوجل الحقيقية.
                </p>
              </div>

              {seoAnalysis && (
                <div className="prose prose-sm mb-8 text-zinc-600 bg-white p-4 rounded-xl border border-purple-100">
                  <div className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-widest">تحليل الذكاء الاصطناعي:</div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{seoAnalysis}</div>
                </div>
              )}

              <div className="space-y-4">
                <label className="text-xs font-bold text-zinc-400">ماذا تريد أن تعرف؟</label>
                <textarea 
                  value={seoQuery}
                  onChange={(e) => setSeoQuery(e.target.value)}
                  placeholder="مثال: كيف أحسن ترتيب موقعي لكلمة 'عقارات في القاهرة'؟"
                  className="w-full p-4 bg-zinc-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500 text-sm h-32"
                />
                <button 
                  onClick={async () => {
                    setIsAnalyzing(true);
                    try {
                      const { GoogleGenAI } = await import("@google/genai");
                      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
                      const response = await ai.models.generateContent({
                        model: "gemini-3-flash-preview",
                        contents: `بصفتك خبير سيو (SEO Expert)، قم بتحليل هذا الاستفسار المتعلق بموقع "Relate Studio": ${seoQuery}. 
                        الموقع هو منصة إبداعية لبناء المواقع وحجز النطاقات. قدم نصائح عملية باللغة العربية بناءً على أحدث اتجاهات البحث.`,
                        config: {
                          tools: [{ googleSearch: {} }]
                        }
                      });
                      setSeoAnalysis(response.text || "عذراً، لم أتمكن من تحليل الطلب حالياً.");
                    } catch (error) {
                      console.error("Gemini Error:", error);
                      setSeoAnalysis("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى التأكد من إعدادات الـ API.");
                    } finally {
                      setIsAnalyzing(false);
                    }
                  }}
                  disabled={isAnalyzing || !seoQuery}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAnalyzing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Rocket className="w-5 h-5" />}
                  تحليل SEO الآن
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" dir="rtl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold">كود موقعك جاهز!</h2>
                <button onClick={() => setShowExport(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">HTML Content</label>
                  <pre className="bg-zinc-900 text-emerald-400 p-6 rounded-2xl font-mono text-sm overflow-x-auto" dir="ltr">
                    {html}
                  </pre>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase mb-2">CSS Styles</label>
                  <pre className="bg-zinc-900 text-blue-400 p-6 rounded-2xl font-mono text-sm overflow-x-auto" dir="ltr">
                    {css}
                  </pre>
                </div>
              </div>
              <div className="p-8 bg-zinc-50 flex justify-end gap-4">
                <button 
                  onClick={() => {
                    const fullHtml = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي المشرق</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ${css}
        body { margin: 0; padding: 0; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
                    const blob = new Blob([fullHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'index.html';
                    a.click();
                  }}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all"
                >
                  تحميل ملف HTML
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [userSites, setUserSites] = useState<UserSite[]>([]);
  const [currentEditingSite, setCurrentEditingSite] = useState<UserSite | null>(null);
  const [paymentConfig, setPaymentConfig] = useState({ 
    localNumber: '010XXXXXXXX',
    apiConfig: { apiKey: '', apiUser: '', isSandbox: true }
  });
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', customer: 'أحمد محمد', plan: 'الاحترافي', amount: 19, status: 'completed', date: '2026-02-22' },
    { id: '2', customer: 'سارة علي', plan: 'الشركات', amount: 49, status: 'pending', date: '2026-02-22' },
  ]);

  // Load data from localStorage
  useEffect(() => {
    const savedSites = localStorage.getItem('apex_user_sites');
    if (savedSites) setUserSites(JSON.parse(savedSites));
    
    const savedConfig = localStorage.getItem('apex_payment_config');
    if (savedConfig) setPaymentConfig(JSON.parse(savedConfig));
  }, []);

  const savePaymentConfig = (newConfig: any) => {
    setPaymentConfig(newConfig);
    localStorage.setItem('apex_payment_config', JSON.stringify(newConfig));
    alert('تم تحديث الإعدادات بنجاح!');
  };

  const saveSite = (html: string, css: string) => {
    const newSite: UserSite = {
      id: currentEditingSite?.id || Math.random().toString(36).substr(2, 9),
      name: currentEditingSite?.name || `موقعي الجديد ${userSites.length + 1}`,
      html,
      css,
      updatedAt: new Date().toISOString(),
    };

    const updatedSites = currentEditingSite 
      ? userSites.map(s => s.id === currentEditingSite.id ? newSite : s)
      : [...userSites, newSite];

    setUserSites(updatedSites);
    localStorage.setItem('apex_user_sites', JSON.stringify(updatedSites));
    alert('تم حفظ الموقع بنجاح!');
    setView('dashboard');
  };

  // Secret key combo to access Admin Login (Ctrl+Shift+A)
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
    <div className="font-sans antialiased text-zinc-900">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar onStart={() => setView('dashboard')} />
            <LandingPage 
              onStart={() => setView('dashboard')} 
              onSelectPlan={(plan) => setSelectedPlan(plan)}
              onSelectDomain={(domain, price) => setSelectedPlan({ name: `نطاق: ${domain}`, price })}
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
        ) : view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UserDashboard 
              sites={userSites} 
              onEdit={(site) => {
                setCurrentEditingSite(site);
                setSelectedTemplate({
                  id: 'custom',
                  name: site.name,
                  description: '',
                  category: 'custom',
                  thumbnail: '',
                  html: site.html,
                  css: site.css
                });
                setView('builder');
              }}
              onCreate={() => {
                setCurrentEditingSite(null);
                setView('templates');
              }}
            />
            <button 
              onClick={() => setView('landing')}
              className="fixed bottom-8 left-8 bg-black text-white px-6 py-3 rounded-full font-bold shadow-xl"
            >
              العودة للرئيسية
            </button>
          </motion.div>
        ) : view === 'templates' ? (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TemplateGallery onSelect={(template) => {
              setSelectedTemplate(template);
              setView('builder');
            }} />
          </motion.div>
        ) : view === 'builder' ? (
          <motion.div
            key="builder"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen"
          >
            <Builder 
              initialHtml={selectedTemplate?.html} 
              initialCss={selectedTemplate?.css} 
              onSave={saveSite}
            />
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
              setView('admin');
            }} />
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isAuthenticated ? (
              <>
                <AdminDashboard 
                  orders={orders} 
                  onLogout={() => {
                    setIsAuthenticated(false);
                    setView('landing');
                  }} 
                  paymentConfig={paymentConfig}
                  onSaveConfig={savePaymentConfig}
                />
                <button 
                  onClick={() => setView('landing')}
                  className="fixed bottom-8 left-8 bg-black text-white px-6 py-3 rounded-full font-bold shadow-xl"
                >
                  العودة للموقع
                </button>
              </>
            ) : (
              <div className="h-screen flex items-center justify-center">
                <button onClick={() => setView('admin-login')} className="bg-black text-white px-8 py-4 rounded-2xl font-bold">
                  يجب تسجيل الدخول أولاً
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
