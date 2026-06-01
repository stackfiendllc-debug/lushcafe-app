import { supabase } from "./supabase.js";

export async function getMenuItems() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  console.log("MENU DATA:", data);

  return data || [];
}

export async function createMenuItem(item) {
  const { data, error } = await supabase
    .from("menu_items")
    .insert([item]);

  if (error) throw error;

  return data;
}