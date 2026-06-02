import { supabase } from "./supabase.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const bookBtn = document.getElementById("bookBtn");

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");

const menuContainer = document.getElementById("menuContainer");
const eventsContainer = document.getElementById("eventsContainer");
const reservationContainer = document.getElementById("reservationContainer");

// LOGIN
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  await showDashboard();
});

// LOGOUT
logoutBtn?.addEventListener("click", async () => {
  await supabase.auth.signOut();

  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

// SHOW DASHBOARD
async function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  await Promise.all([
    loadMenu(),
    loadEvents(),
    loadReservations()
  ]);
}

// LOAD MENU
async function loadMenu() {
  const { data, error } = await supabase.from("menu").select("*");

  if (error) {
    console.error("Menu error:", error);
    menuContainer.innerHTML = "<p>Menu unavailable</p>";
    return;
  }

  menuContainer.innerHTML = data.map(item => `
    <div class="card">
      <h4>${item.name || "Menu Item"}</h4>
      <p>${item.price || ""}</p>
    </div>
  `).join("");
}

// LOAD EVENTS
async function loadEvents() {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Events error:", error);
    eventsContainer.innerHTML = "<p>Events unavailable</p>";
    return;
  }

  eventsContainer.innerHTML = data.map(event => `
    <div class="card">
      <h4>${event.title || "Event"}</h4>
      <p>${event.description || ""}</p>
    </div>
  `).join("");
}

// BOOK RESERVATION
bookBtn?.addEventListener("click", async () => {
  const { error } = await supabase
    .from("reservations")
    .insert([{
      guest_name: document.getElementById("customerName").value,
      phone: document.getElementById("customerPhone").value,
      email: document.getElementById("customerEmail").value,
      reservation_date: document.getElementById("reservationDate").value,
      reservation_time: document.getElementById("reservationTime").value,
      party_size: parseInt(document.getElementById("partySize").value),
      special_requests: document.getElementById("specialRequest").value,
      status: "pending"
    }]);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Reservation booked successfully");
  await loadReservations();
});

// LOAD RESERVATIONS
async function loadReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Reservations error:", error);
    return;
  }

  reservationContainer.innerHTML = data.map(r => `
    <div class="card">
      <h4>${r.guest_name}</h4>
      <p>${r.phone}</p>
      <p>${r.email}</p>
      <p>${r.reservation_date} at ${r.reservation_time}</p>
      <p>Party of ${r.party_size}</p>
      <p>${r.special_requests || "No special requests"}</p>
      <p>Status: ${r.status}</p>
    </div>
  `).join("");
}

// SESSION CHECK
async function checkSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    await showDashboard();
  }
}

checkSession();