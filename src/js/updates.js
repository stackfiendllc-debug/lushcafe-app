import { supabase } from "./supabase.js";

export async function getWeeklyUpdates() {
  const { data, error } = await supabase
    .from("weekly_updates")
    .select("*");

  if (error) throw error;
  return data;
}

export async function createUpdate(update) {
  const { data, error } = await supabase
    .from("weekly_updates")
    .insert([update]);

  if (error) throw error;
  return data;
}