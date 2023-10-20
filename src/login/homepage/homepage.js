// Javascript for homepage


// ====== IMPORTS ======

// Css
import './homepage.css'


// ====== MAIN =======

main();


// ====== FUNCTIONS ======

function main () {

    console.log('test7');
    addListeners();
}

function addListeners () {
    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', handleLogoutClick);
}

async function handleLogoutClick () {
    window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}