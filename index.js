import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://vjalivzqoiqnuadbkrce.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWdvdXZmdG1rbnBkaG5menBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMzc1NDksImV4cCI6MjA5NTkxMzU0OX0.DVb-2s5hRPeHsXRF5OC9ypl93CkFhnvSJd-Yx-HSVyQ";

const supabase = createClient(supabaseUrl, supabaseKey);

// Elements
const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const menuContainer = document.getElementById("menuContainer");
const eventsContainer = document.getElementById("eventsContainer");

// LOGIN
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

  showDashboard();
});

// LOGOUT
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showLogin();
});

// UI SWITCHES
function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  loadMenu();
  loadEvents();
}

function showLogin() {
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

// SESSION CHECK
async function checkSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    showDashboard();
  }
}

// LOAD MENU
async function loadMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*");

  if (error) {
    menuContainer.innerHTML = "No menu items found";
    return;
  }

  menuContainer.innerHTML = data.map(item => `
    <div>
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <strong>$${item.price}</strong>
    </div>
  `).join("");
}

// LOAD EVENTS
async function loadEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*");

  if (error) {
    eventsContainer.innerHTML = "No events found";
    return;
  }

  eventsContainer.innerHTML = data.map(event => `
    <div>
      <h4>${event.title}</h4>
      <p>${event.description}</p>
      <strong>${event.event_date}</strong>
    </div>
  `).join("");
}

checkSession();