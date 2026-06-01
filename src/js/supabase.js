import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://thmgouvftmknpdhnfzpo.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWdvdXZmdG1rbnBkaG5menBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzc1NDksImV4cCI6MjA5NTkxMzU0OX0.DVb-2s5hRPeHsXRF5OC9ypl93CkFhnvSJd-Yx-HSVyQ";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);