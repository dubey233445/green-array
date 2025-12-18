import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string | undefined;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

export const supabase = SUPABASE_URL && (SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY)
  ? createClient(
      SUPABASE_URL,
      (SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY) as string,
      {
        auth: { persistSession: false },
      }
    )
  : null;

export function ensureSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_[ANON_KEY|SERVICE_ROLE_KEY].");
  }
  return supabase;
}
