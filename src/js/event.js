import { supabase } from "./supabase.js";

export async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date");

  const container = document.getElementById("eventsContainer");

  if (error) {
    container.innerHTML = "Failed loading events";
    return;
  }

  if (!data.length) {
    container.innerHTML = "No upcoming events";
    return;
  }

  container.innerHTML = data.map(event => `
    <div>
      <h4>${event.title}</h4>
      <p>${event.description}</p>
      <p>${event.event_date}</p>
      <p>${event.start_time} - ${event.end_time}</p>
      ${event.featured ? "<strong>Featured Event</strong>" : ""}
    </div>
  `).join("");
}