"use client";

import { useState, useEffect, useRef } from "react";

export function useLiveLogs(apiUrl: string) {
  const [logs, setLogs] = useState<string[]>([]);
  const [logFilter, setLogFilter] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [copiedLogs, setCopiedLogs] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const sseUrl = `${apiUrl}/api/logs/stream`;
      const es = new EventSource(sseUrl);
      eventSourceRef.current = es;

      es.onmessage = (event) => {
        if (event.data) {
          setLogs((prev) => [...prev.slice(-400), event.data]);
        }
      };

      es.onerror = () => {
        // SSE disconnected / reconnecting automatically
      };
    } catch (e) {
      console.error("SSE stream error", e);
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [apiUrl]);

  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, autoScroll]);

  const copyAllLogs = () => {
    navigator.clipboard.writeText(logs.join("\n"));
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter((line) =>
    line.toLowerCase().includes(logFilter.toLowerCase())
  );

  return {
    logs: filteredLogs,
    totalCount: logs.length,
    logFilter,
    setLogFilter,
    autoScroll,
    setAutoScroll,
    copiedLogs,
    copyAllLogs,
    clearLogs,
    logsEndRef,
  };
}
