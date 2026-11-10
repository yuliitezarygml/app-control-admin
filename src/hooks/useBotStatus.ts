"use client";

import { useState, useEffect, useCallback } from "react";
import { BotStats, ApiResponse } from "@/types";

export function useBotStatus(apiUrl: string, apiSecret: string) {
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  const [stats, setStats] = useState<BotStats | null>(null);
  const [uptimeTicker, setUptimeTicker] = useState<number>(0);

  const fetchStatus = useCallback(async () => {
    try {
      const headers: Record<string, string> = {};
      if (apiSecret) {
        headers["Authorization"] = `Bearer ${apiSecret}`;
      }

      const res = await fetch(`${apiUrl}/api/status`, { headers });
      if (!res.ok) {
        setApiConnected(false);
        return;
      }
      const json: ApiResponse<BotStats> = await res.json();
      if (json.success && json.data) {
        setStats(json.data);
        setUptimeTicker(json.data.uptime_secs);
        setApiConnected(true);
      } else {
        setApiConnected(false);
      }
    } catch {
      setApiConnected(false);
    }
  }, [apiUrl, apiSecret]);

  // Polling every 4s
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 4000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Local tick every second
  useEffect(() => {
    if (!apiConnected) return;
    const ticker = setInterval(() => {
      setUptimeTicker((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(ticker);
  }, [apiConnected]);

  return {
    apiConnected,
    stats,
    uptimeTicker,
    refreshStatus: fetchStatus,
  };
}
