import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qoqkdquijeegwtgizzgi.supabase.co";
const supabaseAnonKey = "sb_publishable_ay3PLnVMR3Z-dfIJ3S5rmQ_-wFG3_eZ";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);