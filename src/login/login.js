// Javascript for login page

console.log('linked');

// ====== IMPORTS ======

// Css
import './login.css';


// ====== MAIN ======

setPath();


// ====== FUNCTIONS ======

function setPath () {
    const path = window.location.pathname.replace('/login', '');
    const pathInput = document.querySelector('#pathMeta');
    pathInput.value = path || '/';
}
