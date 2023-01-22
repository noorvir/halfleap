import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

export const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
export const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || '';
export const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
export const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') || '';
export const HALFLEAP_API_TOKEN = Deno.env.get('HALFLEAP_API_TOKEN') || '';
