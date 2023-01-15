import { createClient } from "../deps/deps.ts";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./constants.ts";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
