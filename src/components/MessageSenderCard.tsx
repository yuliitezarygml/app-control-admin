"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { ActionNotice } from "@/types";

interface MessageSenderCardProps {
  apiUrl: string;
  apiSecret: string;
}

export function MessageSenderCard({ apiUrl, apiSecret }: MessageSenderCardProps) {
  const [channelId, setChannelId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState<ActionNotice | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelId || !messageContent) return;

    setIsSending(true);
    setNotice(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (apiSecret) {
        headers["Authorization"] = `Bearer ${apiSecret}`;
      }

      const res = await fetch(`${apiUrl}/api/action/send-message`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          channel_id: Number(channelId),
          content: messageContent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotice({ text: "Сообщение успешно отправлено в Discord!", isError: false });
        setMessageContent("");
      } else {
        setNotice({ text: data.error || "Ошибка отправки", isError: true });
      }
    } catch (err: unknown) {
      setNotice({ text: String(err), isError: true });
    } finally {
      setIsSending(false);
      setTimeout(() => setNotice(null), 5000);
    }
  };

  return (
    <div className="bg-[#121824] rounded-2xl border border-gray-800/80 p-5 shadow-xl">
      <h2 className="text-sm font-semibold text-gray-200 flex items-center gap-2 mb-4">
        <Send className="w-4 h-4 text-purple-400" />
        Отправить сообщение от бота
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            ID Канала Discord
          </label>
          <input
            type="text"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Например: 123456789012345678"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Текст сообщения
          </label>
          <textarea
            rows={3}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Введите текст сообщения..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {notice && (
          <div
            className={`text-xs p-2.5 rounded-lg ${
              notice.isError
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}
          >
            {notice.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSending || !channelId || !messageContent}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-medium text-xs transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSending ? "Отправка..." : "Отправить в Discord"}</span>
        </button>
      </form>
    </div>
  );
}
