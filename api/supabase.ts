import { createClient } from '../deps/deps.ts';
import { Database } from '../interfaces/database.types.ts';

import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from './constants.ts';

const supabaseAdmin = createClient<Database>(
	SUPABASE_URL,
	SUPABASE_SERVICE_ROLE_KEY,
	{
		db: { schema: 'halfleap' },
	},
);

export { supabaseAdmin };
