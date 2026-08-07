import { validateUser } from "./storage.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');

function handleLogin(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const res = validateUser(email, password);

    if (res) {
        window.location.href = 'dashboard.html';
    } else {
        alert("Invalid email or password.");
    }
}


loginForm.addEventListener('submit', handleLogin);
