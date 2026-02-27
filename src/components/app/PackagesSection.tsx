import React from 'react';
import { Check, Star } from 'lucide-react';

export default function PackagesSection({ highlightPackage }: { highlightPackage: string | null }) {
  const packages = [
    { id: 'basic', name: 'الباقة الأساسية', price: '$29', features: ['استضافة سريعة', 'دومين .com مجاني', 'دعم فني 24/7'] },
    { id: 'premium', name: 'باقة الأعمال', price: '$69', features: ['استضافة فائقة السرعة', 'دومين .com مجاني', 'دعم فني VIP', 'تحليل SEO متقدم', 'تصميم مخصص'], popular: true },
    { id: 'enterprise', name: 'الباقة الاحترافية', price: '$129', features: ['سيرفر خاص مخصص', 'دومينات متعددة مجانية', 'دعم فني مباشر', 'تحليل SEO شامل', 'تصميم متكامل', 'بوابات دفع جاهزة'] },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {packages.map(pkg => (
        <div 
          key={pkg.id} 
          className={`relative p-6 rounded-2xl border transition-all ${
            highlightPackage === pkg.id 
              ? 'bg-green-400/10 border-green-400/50 shadow-[0_0_30px_rgba(74,222,128,0.2)]' 
              : pkg.popular 
                ? 'bg-cyan-500/10 border-cyan-500/50' 
                : 'bg-gray-900/50 border-gray-800'
          }`}
        >
          {pkg.popular && !highlightPackage && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> الأكثر طلباً
            </div>
          )}
          {highlightPackage === pkg.id && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> الجائزة المجانية
            </div>
          )}
          
          <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
          <div className="text-3xl font-black text-white mb-6">
            {highlightPackage === pkg.id ? 'مجاناً' : pkg.price}
            {highlightPackage !== pkg.id && <span className="text-sm text-gray-500 font-normal">/شهرياً</span>}
          </div>
          
          <ul className="space-y-3 mb-8">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <Check className={`w-4 h-4 ${highlightPackage === pkg.id ? 'text-green-400' : 'text-cyan-400'}`} />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className={`w-full py-3 rounded-xl font-bold transition-all ${
            highlightPackage === pkg.id 
              ? 'bg-green-400 text-gray-900 hover:bg-green-500' 
              : pkg.popular 
                ? 'bg-cyan-500 text-gray-900 hover:bg-cyan-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}>
            {highlightPackage === pkg.id ? 'تفعيل الآن' : 'اختر الباقة'}
          </button>
        </div>
      ))}
    </div>
  );
}
