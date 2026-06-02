import { login, logout, checkSession } from "./auth.js";
import { loadMenu } from "./menu.js";
import { loadEvents } from "./event.js";

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");

async function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  await loadMenu();
  await loadEvents();
}

function showLogin() {
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const success = await login(email, password);

  if (success) {
    showDashboard();
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
  showLogin();
});

if (await checkSession()) {
  showDashboard();
} else {
  showLogin();
}