import { UpdateImage, storeHistory, updateBalance } from "./storage.js";

// Adding the username and email to the dashboard
function executeInfo() {
    const userName = document.getElementById('name');
    const userEmail = document.getElementById('email');
    const welcome = document.getElementById('welcome');
    const tbalance= document.getElementById('tbalance');
    const tcredit = document.getElementById('tcredit');
    const tdebit = document.getElementById('tdebit');
    const profileImg=document.getElementById('profileImg');

    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
        window.location.href = '../../index.html';
        return;
    }

    const user = JSON.parse(savedUser);

    if (userName) userName.innerText = user[0].name;
    if (userEmail) userEmail.innerText = user[0].email;
    if (welcome) welcome.innerText = `Welcome to dashboard, ${user[0].name}`;
    if (tbalance) tbalance.innerText = `Rs. ${user[0].balance}`;
    if (tcredit) tcredit.innerText = `Rs. ${user[0].totalCredit}`;
    if (tdebit) tdebit.innerText = `Rs. ${user[0].totalDebit}`;
    
    if(user[0].image!==""){
        profileImg.src=user[0].image;
    }

    history();
}

document.addEventListener('DOMContentLoaded', executeInfo);



// Logout functionality
const logout=document.getElementById('logout');

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../index.html';
}

logout.addEventListener('click',handleLogout);



// Hamburger functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


// Add Profile image
const imgInput=document.getElementById('imgInput');
const profileImg=document.getElementById('profileImg');
const profileIcon=document.getElementById('profileIcon');

profileImg.addEventListener('click',()=>{
    imgInput.click();
})

profileIcon.addEventListener('click',()=>{
    imgInput.click();
})

imgInput.addEventListener('change',(event)=>{
    event.preventDefault();

    const file = imgInput.files[0];

    if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload=function (){
            profileImg.src=reader.result;

            UpdateImage(reader.result);
        }
    }
})



// Handling the transaction button
const transBtn=document.getElementById('transBtn');
const popup=document.getElementById('popup');

const cancel=document.getElementById('cancel');
const cross=document.getElementById('cross');

// Open Popup box
transBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    popup.style.display='flex';
})

// Close the popup
cancel.addEventListener('click',(event)=>{
    popup.style.display='none';
})

cross.addEventListener('click',(event)=>{
    popup.style.display='none';
})





// Handling the balance of the user
const save = document.getElementById('save');
const amount= document.getElementById('amount');
const des= document.getElementById('des');
const credit = document.getElementById('credit');
const debit = document.getElementById('debit');

const body= document.getElementById('body');


function history(){
    const existingData = localStorage.getItem('transactions');
    const hist = JSON.parse(existingData);

    const curData = localStorage.getItem('currentUser');
    const curr = JSON.parse(curData);

    body.innerHTML="";

    for(let h of hist){
        if(h.email===curr.email){
            body.innerHTML += `
                <tr>
                    <td>${h.Date}</td>
                    <td>${h.time}</td>
                    <td>${h.description}</td>
                    <td>${h.type}</td>
                    <td>${h.amount}</td>
                </tr>
            `
        }
    }
}



function UpdateData(){

    let am = Number(amount.value);
    let desc = des.value? des.value : "";
    let type="";

    if(credit.checked){
        type='credit';
    }
    else if(debit.checked){
        type='debit';
        am=-am;
    }
    else{
        alert('Select the transaction type');
        return;
    }

    const cur = localStorage.getItem('currentUser');
    const data= JSON.parse(cur);

    let userId = data[0].id;
    const date = new Date();
    const dte=date.toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const existingData = localStorage.getItem('transactions');
    const trans = existingData? JSON.parse(existingData) : [];
    let id = trans.length+1;

    const transaction = {
        'id': id,
        'userId': userId,
        'amount': am,
        'description':desc,
        'type':type,
        'date':dte,
        'time':time
    }

    storeHistory(transaction);
    updateBalance(am,type);
    history();
}


save.addEventListener('click',UpdateData);