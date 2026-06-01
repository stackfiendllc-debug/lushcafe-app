import { supabase } from "./supabase.js";

export async function createReservation(reservation) {
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        ...reservation,
        status: "pending"
      }
    ]);

  if (error) throw error;
  return data;
}

export async function getReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*");

  if (error) throw error;
  return data;
}