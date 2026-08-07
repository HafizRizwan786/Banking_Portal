import { storeData } from "./storage.js";

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const createBtn = document.getElementById('create');


function handleSignUp(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    const existingData = localStorage.getItem('users');
    const data = existingData ? JSON.parse(existingData) : [];
    const id = data.length + 1;
    // console.log(id);

    const balance=0;
    const totalCredit=0;
    const totalDebit=0;
    const image="";

    const user = {
        id,
        name,
        email,
        password,
        balance,
        totalCredit,
        totalDebit,
        image
    };

    let res=storeData(user);
    if(res){
        window.location.href='login.html';
    }
}

createBtn.addEventListener('click', handleSignUp);