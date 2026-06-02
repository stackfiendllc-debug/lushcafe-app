import { supabase } from "./supabase.js";

export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return false;
  }

  return true;
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function checkSession() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}