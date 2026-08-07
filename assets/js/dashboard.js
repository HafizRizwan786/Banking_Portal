import { UpdateImage, storeHistory, updateBalance } from "./storage.js";


// Updating the Dashboard page when user make changes in balance or image or for displaying the user info when login

const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const welcome = document.getElementById('welcome');
const tbalance= document.getElementById('tbalance');
const tcredit = document.getElementById('tcredit');
const tdebit = document.getElementById('tdebit');
const profileImg=document.getElementById('profileImg');


function executeInfo() {
    
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




// Handling the profile image pick functionality and update the local storage by calling UpdateImage function
const imgInput=document.getElementById('imgInput');
// const profileImg=document.getElementById('profileImg'); already declare above
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





// Handling the transaction button on the dashboard and closing buttons of the pop up
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


// For displaying the transaction history of the user in the table
function history(){
    const existingData = localStorage.getItem('transactions');
    const hist = JSON.parse(existingData);

    const curData = localStorage.getItem('currentUser');
    const curr = JSON.parse(curData);

    body.innerHTML="";

    for(let h of hist){
        if(h.userId===curr[0].id){
            body.innerHTML += `
                <tr>
                    <td>${h.date}</td>
                    <td>${h.time}</td>
                    <td>${h.description}</td>
                    <td>${h.type}</td>
                    <td>${h.amount}</td>
                </tr>
            `
        }
    }
}



// Getting the data of transaction that user make and store the history by calling the storehistory function
// and updating the user balance by calling UpdateBalance function
// and showing the transaction history by calling the history function

function UpdateData(event){

    let am = Number(amount.value);
    let desc = des.value? des.value : "";
    let type="";

    if(credit.checked){
        type='credit';
    }
    else if(debit.checked){
        type='debit';
    }
    else{
        alert('Select the transaction type');
        event.preventDefault();
        return;
    }

    const cur = localStorage.getItem('currentUser');
    const data= JSON.parse(cur);

    let userId = data[0].id;
    const date = new Date();
    const dte=date.toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const existingData = localStorage.getItem('transactions');
    const trans = JSON.parse(existingData) || [];
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


    if(updateBalance(am,type)){
        storeHistory(transaction);
        history();
    }
    else{
        event.preventDefault();
    }
}


save.addEventListener('click',UpdateData);