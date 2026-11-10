"use client";

import { useState } from "react";

interface SettingsModalProps {
  initialUrl: string;
  initialSecret: string;
  onSave: (url: string, secret: string) => void;
}

export function SettingsModal({ initialUrl, initialSecret, onSave }: SettingsModalProps) {
  const [url, setUrl] = useState(initialUrl);
  const [secret, setSecret] = useState(initialSecret);

  return (
    <div className="border-b border-gray-800 bg-[#131a29] px-6 py-4 transition-all">
      <div className="max-w-4xl mx-auto flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            URL Бэкенда (API)
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://localhost:3001 или https://vps-domain.com"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-100 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            API Secret Token (Bearer)
          </label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Оставьте пустым, если без пароля"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-100 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          onClick={() => onSave(url, secret)}
          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-md shadow-indigo-600/30"
        >
          Сохранить и подключиться
        </button>
      </div>
    </div>
  );
}
