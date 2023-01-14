import { config } from "https://deno.land/std@0.172.0/dotenv/mod.ts";

const configData = await config();
export const SUPABASE_URL = configData.SUPABASE_URL;
export const SUPABASE_ANON_KEY = configData.SUPABASE_ANON_KEY;
