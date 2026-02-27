import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">Apex Lo-Fi Beats</h3>
          <p className="text-gray-400 text-sm mb-4">Focus & Code</p>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-cyan-500 text-gray-900 flex items-center justify-center hover:bg-cyan-400 transition"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        <span className="text-xs text-gray-500">1:24</span>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 w-1/3 rounded-full" />
        </div>
        <span className="text-xs text-gray-500">3:45</span>
      </div>
    </div>
  );
}
