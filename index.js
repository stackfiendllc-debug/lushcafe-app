import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Correct Supabase Project
const supabaseUrl = "https://thmgouvftmknpdhnfzpo.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWdvdXZmdG1rbnBkaG5menBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzc1NDksImV4cCI6MjA5NTkxMzU0OX0.DVb-2s5hRPeHsXRF5OC9ypl93CkFhnvSJd-Yx-HSVyQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const menuContainer = document.getElementById("menuContainer");
const eventsContainer = document.getElementById("eventsContainer");

// Show Dashboard
async function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  await loadMenu();
  await loadEvents();
}

// Show Login
function showLogin() {
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

// Login
loginBtn.addEventListener("click", async () => {
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

  alert("Login successful");
  await showDashboard();
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showLogin();
});

// Check existing session
async function checkSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    await showDashboard();
  } else {
    showLogin();
  }
}

// Load Menu
async function loadMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error || !data.length) {
    menuContainer.innerHTML = "<p>No menu items found</p>";
    return;
  }

  menuContainer.innerHTML = data.map(item => `
    <div class="card">
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <strong>$${item.price}</strong>
    </div>
  `).join("");
}

// Load Events
async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*");

  if (error || !data.length) {
    eventsContainer.innerHTML = "<p>No events found</p>";
    return;
  }

  eventsContainer.innerHTML = data.map(event => `
    <div class="card">
      <h4>${event.title}</h4>
      <p>${event.description}</p>
      <strong>${event.event_date}</strong>
    </div>
  `).join("");
}

// Start app
checkSession();