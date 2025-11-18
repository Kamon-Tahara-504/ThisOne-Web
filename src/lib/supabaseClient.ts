import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // 開発中にすぐ気づけるようにエラーを投げる
  throw new Error('Supabase URL または ANON KEY が設定されていません。 .env を確認してください。');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);