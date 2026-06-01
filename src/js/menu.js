import { supabase } from "./supabase.js";

export async function getMenuItems() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error) throw error;
  return data;
}

export async function createMenuItem(item) {
  const { data, error } = await supabase
    .from("menu_items")
    .insert([item]);

  if (error) throw error;
  return data;
}

export async function updateMenuItem(id, updates) {
  const { data, error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
}