"use client";

import { Radio, Sliders } from "lucide-react";

interface HeaderProps {
  apiConnected: boolean | null;
  showSettings: boolean;
  setShowSettings: (val: boolean) => void;
}

export function Header({ apiConnected, showSettings, setShowSettings }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-800 bg-[#111622]/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Radio className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base leading-none text-white tracking-wide">
            Discord Bot Controller
          </h1>
          <span className="text-xs text-gray-400">Tauri + Next.js Control Center</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/80 border border-gray-800 text-xs">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              apiConnected === true
                ? "bg-emerald-500 shadow-emerald-500/50"
                : apiConnected === false
                ? "bg-rose-500 shadow-rose-500/50"
                : "bg-amber-500 shadow-amber-500/50"
            }`}
          />
          <span className="text-gray-300 font-medium">
            API: {apiConnected === true ? "Online" : apiConnected === false ? "Offline" : "Connecting..."}
          </span>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs transition border border-gray-700"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Настройки API</span>
        </button>
      </div>
    </header>
  );
}
