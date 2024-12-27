import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log(supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection
supabase
  .from("registrations")
  .select("*", { count: "exact", head: true })
  .then(({ error }) => {
    if (error) {
      console.error("Error connecting to Supabase:", error);
    } else {
      console.log("Successfully connected to Supabase");
    }
  });
