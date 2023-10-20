// Javascript for homepage


// ====== IMPORTS ======

// Css
import './homepage.css'

console.log('linked');


// ====== MAIN =======

main();


// ====== FUNCTIONS ======

function main () {
    addListeners();
}

function addListeners () {
    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', handleLogoutClick);
}

async function handleLogoutClick () {
    window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}