"use client";

import { RefObject } from "react";
import { Terminal, Copy, Check, Trash2, Activity } from "lucide-react";

interface TerminalLogsProps {
  logs: string[];
  totalCount: number;
  logFilter: string;
  setLogFilter: (val: string) => void;
  autoScroll: boolean;
  setAutoScroll: (val: boolean) => void;
  copiedLogs: boolean;
  onCopyLogs: () => void;
  onClearLogs: () => void;
  logsEndRef: RefObject<HTMLDivElement | null>;
}

export function TerminalLogs({
  logs,
  totalCount,
  logFilter,
  setLogFilter,
  autoScroll,
  setAutoScroll,
  copiedLogs,
  onCopyLogs,
  onClearLogs,
  logsEndRef,
}: TerminalLogsProps) {
  return (
    <div className="lg:col-span-2 flex flex-col bg-[#0d121c] rounded-2xl border border-gray-800/80 shadow-2xl overflow-hidden min-h-[550px]">
      {/* Terminal Top Bar */}
      <div className="h-12 bg-[#121824] border-b border-gray-800/80 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-gray-200">
            Live Server Logs (SSE Stream)
          </span>
          <span className="text-[10px] text-gray-500 ml-1">({totalCount} событий)</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Фильтр по слову..."
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
            className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-36"
          />

          <button
            onClick={onCopyLogs}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            title="Скопировать логи"
          >
            {copiedLogs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
            title="Очистить терминал"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 bg-[#090d15] text-gray-300 select-text">
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2 py-20">
            <Activity className="w-6 h-6 animate-pulse" />
            <p>Ожидание потока логов от бэкенда на Rust...</p>
            <p className="text-[11px] text-gray-600">
              (Запустите backend-bot, чтобы увидеть логи в реальном времени)
            </p>
          </div>
        ) : (
          logs.map((log, idx) => {
            let colorClass = "text-gray-300";
            if (log.includes("[ERROR]")) colorClass = "text-rose-400 font-medium";
            else if (log.includes("[WARN]")) colorClass = "text-amber-400";
            else if (log.includes("[INFO]")) colorClass = "text-emerald-300";
            else if (log.includes("[DEBUG]")) colorClass = "text-cyan-400";

            return (
              <div key={idx} className="leading-relaxed hover:bg-gray-900/40 px-1 rounded flex">
                <span className="text-gray-600 mr-2 select-none">{idx + 1}</span>
                <span className={colorClass}>{log}</span>
              </div>
            );
          })
        )}
        <div ref={logsEndRef} />
      </div>

      {/* Terminal Bottom Bar */}
      <div className="h-9 bg-[#111622] border-t border-gray-800 px-4 flex items-center justify-between text-[11px] text-gray-400">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="rounded bg-gray-900 border-gray-700 text-indigo-500 focus:ring-0"
          />
          <span>Автоскролл вниз</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Поток активен</span>
        </div>
      </div>
    </div>
  );
}
