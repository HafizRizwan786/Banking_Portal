const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
});

// Close menu when clicking any nav link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});



const login=document.getElementById('login');
const signup=document.getElementById('signup');
const start=document.getElementById('start');

login.addEventListener('click',()=>{
    window.location.href="assets/pages/login.html";
})


signup.addEventListener('click',()=>{
    window.location.href="assets/pages/signup.html";
})


start.addEventListener('click',()=>{
    window.location.href="assets/pages/signup.html";
})


