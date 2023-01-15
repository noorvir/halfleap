import { load } from "https://deno.land/std@0.172.0/dotenv/mod.ts";

const env = await load();
export const SUPABASE_URL = env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY;
export const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
export const HALFLEAP_API_TOKEN = env.HALFLEAP_API_TOKEN;
