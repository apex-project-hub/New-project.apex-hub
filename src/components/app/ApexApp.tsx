import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Brain, Package, Home, ChevronRight, Sparkles } from "lucide-react";
import MusicPlayer from "./MusicPlayer";
import ApexQuiz from "./ApexQuiz";
import PackagesSection from "./PackagesSection";

const tabs = [
  { id: "music", label: "Music", labelAr: "الموسيقى", icon: Music },
  { id: "quiz", label: "Quiz", labelAr: "الكويز", icon: Brain },
  { id: "packages", label: "Packages", labelAr: "الباكدجات", icon: Package },
];

export default function ApexApp({ onNavigateHome }: { onNavigateHome: () => void }) {
  const [activeTab, setActiveTab] = useState("music");
  const [wonPackage, setWonPackage] = useState<string | null>(null);

  const handleQuizComplete = ({ score, package: pkg }: any) => {
    if (score >= 6) {
      setWonPackage(pkg.id);
      setTimeout(() => setActiveTab("packages"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-400/30" dir="rtl">
      {/* Header */}
      <div className="border-b border-gray-800/50 sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onNavigateHome} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-xs">A</span>
            </div>
            <span className="text-white font-bold text-sm">Apex App</span>
            <span className="text-cyan-400 text-[10px] font-mono border border-cyan-400/20 px-1.5 py-0.5 rounded-full">BETA</span>
          </div>
          <button onClick={onNavigateHome} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors">
            الرئيسية <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                activeTab === tab.id
                  ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.labelAr}</span>
              {tab.id === "quiz" && wonPackage && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 text-right">
        <AnimatePresence mode="wait">
          {activeTab === "music" && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Now Playing</p>
                <h2 className="text-xl font-bold text-white">Apex <span className="text-cyan-400">Music</span></h2>
                <p className="text-gray-500 text-sm">موسيقى حصرية من Apex Digital</p>
              </div>
              <MusicPlayer />
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">Challenge</p>
                <h2 className="text-xl font-bold text-white">Apex <span className="text-cyan-400">Quiz</span></h2>
                <p className="text-gray-500 text-sm">8 أسئلة · اكسب خدمة مجانية</p>
              </div>

              {wonPackage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 text-sm">🎉 مبروك! جيت على الباكدجات عشان تشوف جايزتك</p>
                </motion.div>
              )}

              <ApexQuiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {activeTab === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <PackagesSection highlightPackage={wonPackage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
