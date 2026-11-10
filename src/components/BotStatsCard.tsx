"use client";

import { Server, RefreshCw } from "lucide-react";
import { BotStats } from "@/types";

interface BotStatsCardProps {
  stats: BotStats | null;
  uptimeSeconds: number;
  onRefresh: () => void;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
}

export function BotStatsCard({ stats, uptimeSeconds, onRefresh }: BotStatsCardProps) {
  return (
    <div className="bg-[#121824] rounded-2xl border border-gray-800/80 p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          Состояние бота
        </h2>
        <button
          onClick={onRefresh}
          className="text-gray-400 hover:text-white transition p-1"
          title="Обновить"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">Discord Gateway</span>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              stats?.is_connected
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}
          >
            {stats?.is_connected ? "Подключен 🟢" : "Ожидание токена 🟡"}
          </span>
        </div>

        <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">Имя бота</span>
          <span className="text-xs font-semibold text-white">
            {stats?.bot_tag || "—"}
          </span>
        </div>

        <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">Серверов (Guilds)</span>
          <span className="text-xs font-semibold text-white">
            {stats?.guild_count ?? 0}
          </span>
        </div>

        <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">Аптайм (Uptime)</span>
          <span className="text-xs font-mono font-medium text-indigo-300">
            {formatUptime(uptimeSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
