"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

import { Header } from "@/components/Header";
import { SettingsModal } from "@/components/SettingsModal";
import { BotStatsCard } from "@/components/BotStatsCard";
import { MessageSenderCard } from "@/components/MessageSenderCard";
import { TerminalLogs } from "@/components/TerminalLogs";

import { useBotStatus } from "@/hooks/useBotStatus";
import { useLiveLogs } from "@/hooks/useLiveLogs";

export default function AdminDashboard() {
  const [apiUrl, setApiUrl] = useState("http://localhost:3001");
  const [apiSecret, setApiSecret] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Load persisted settings
  useEffect(() => {
    const savedUrl = localStorage.getItem("bot_admin_api_url");
    const savedSecret = localStorage.getItem("bot_admin_api_secret");
    if (savedUrl) setApiUrl(savedUrl);
    if (savedSecret) setApiSecret(savedSecret);
  }, []);

  const handleSaveSettings = (newUrl: string, newSecret: string) => {
    setApiUrl(newUrl);
    setApiSecret(newSecret);
    localStorage.setItem("bot_admin_api_url", newUrl);
    localStorage.setItem("bot_admin_api_secret", newSecret);
    setShowSettings(false);
  };

  // Custom hooks
  const { apiConnected, stats, uptimeTicker, refreshStatus } = useBotStatus(apiUrl, apiSecret);
  const {
    logs,
    totalCount,
    logFilter,
    setLogFilter,
    autoScroll,
    setAutoScroll,
    copiedLogs,
    copyAllLogs,
    clearLogs,
    logsEndRef,
  } = useLiveLogs(apiUrl);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header
        apiConnected={apiConnected}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      {showSettings && (
        <SettingsModal
          initialUrl={apiUrl}
          initialSecret={apiSecret}
          onSave={handleSaveSettings}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="space-y-6 lg:col-span-1">
          <BotStatsCard
            stats={stats}
            uptimeSeconds={uptimeTicker}
            onRefresh={refreshStatus}
          />

          <MessageSenderCard
            apiUrl={apiUrl}
            apiSecret={apiSecret}
          />

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-300 flex gap-3 items-start">
            <Shield className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
            <p className="leading-relaxed">
              Бот на Rust слушает входящую команду{" "}
              <code className="text-white font-mono bg-indigo-950/60 px-1 py-0.5 rounded">
                !ping
              </code>{" "}
              в чатах и автоматически отвечает.
            </p>
          </div>
        </div>

        {/* Live Logs Terminal Column */}
        <TerminalLogs
          logs={logs}
          totalCount={totalCount}
          logFilter={logFilter}
          setLogFilter={setLogFilter}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
          copiedLogs={copiedLogs}
          onCopyLogs={copyAllLogs}
          onClearLogs={clearLogs}
          logsEndRef={logsEndRef}
        />
      </main>
    </div>
  );
}
