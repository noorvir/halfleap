import { createClient } from "../deps/deps.ts";
import { Database } from "./database.types.ts";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./constants.ts";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: "halfleap" },
});

export default supabase;
