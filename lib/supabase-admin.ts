import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Use a proxy or a lazy-initialized client to prevent build-time crashes
export const supabaseAdmin = new Proxy({}, {
  get: (_, prop) => {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Missing Supabase Service Role environment variables');
    }

    const client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    return (client as any)[prop];
  },
});
