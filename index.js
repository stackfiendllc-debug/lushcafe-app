import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://thmgouvftmknpdhnfzpo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWdvdXZmdG1rbnBkaG5menBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzc1NDksImV4cCI6MjA5NTkxMzU0OX0.DVb-2s5hRPeHsXRF5OC9ypl93CkFhnvSJd-Yx-HSVyQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const menuContainer = document.getElementById("menuContainer");
const eventsContainer = document.getElementById("eventsContainer");

const reservationForm = document.getElementById("reservationForm");

// LOGIN
loginBtn?.addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    alert(error.message);
  } else {
    loadDashboard();
  }
});

// LOGOUT
logoutBtn?.addEventListener("click", async () => {
  await supabase.auth.signOut();
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

// AUTH CHECK
async function checkUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    loadDashboard();
  } else {
    loginScreen.classList.remove("hidden");
    dashboard.classList.add("hidden");
  }
}

// LOAD DASHBOARD
async function loadDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  loadMenu();
  loadEvents();
}

// MENU
async function loadMenu() {
  const { data, error } = await supabase
    .from("menu")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  menuContainer.innerHTML = data.map(item => `
    <div>
      <h4>${item.name}</h4>
      <p>${item.price}</p>
      <small>${item.description}</small>
    </div>
  `).join("");
}

// EVENTS
async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  eventsContainer.innerHTML = data.map(event => `
    <div>
      <h4>${event.title}</h4>
      <p>${event.description}</p>
      <small>${event.event_date}</small>
    </div>
  `).join("");
}

// RESERVATIONS
reservationForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const reservation = {
    guest_name: document.getElementById("guestName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("reservationEmail").value,
    party_size: document.getElementById("partySize").value,
    reservation_date: document.getElementById("reservationDate").value,
    reservation_time: document.getElementById("reservationTime").value,
    special_requests: document.getElementById("specialRequests").value
  };

  const { error } = await supabase
    .from("reservations")
    .insert([reservation]);

  if (error) {
    alert(error.message);
  } else {
    alert("Reservation submitted!");
    reservationForm.reset();
  }
});

checkUser();