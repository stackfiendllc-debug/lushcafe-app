import { supabase } from "./supabase.js";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date");

  if (error) throw error;
  return data;
}

export async function createEvent(event) {
  const { data, error } = await supabase
    .from("events")
    .insert([event]);

  if (error) throw error;
  return data;
}