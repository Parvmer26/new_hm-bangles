const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("ENV CHECK:", SUPABASE_URL, SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Supabase ENV variables missing");
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);