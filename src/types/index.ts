export interface BotStats {
  is_connected: boolean;
  bot_tag: string;
  guild_count: number;
  uptime_secs: number;
  ping_ms?: number | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ActionNotice {
  text: string;
  isError: boolean;
}
