import { supabase } from "./supabase.js";

export async function loadMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  const container = document.getElementById("menuContainer");

  if (error) {
    container.innerHTML = "Failed loading menu";
    return;
  }

  if (!data.length) {
    container.innerHTML = "No menu items found";
    return;
  }

  container.innerHTML = data.map(item => `
    <div>
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <p>$${item.price}</p>
    </div>
  `).join("");
}