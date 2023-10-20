// Javascript for login page


// ====== MAIN ======

setPath();


// ====== FUNCTIONS ======

function setPath () {
    const path = window.location.pathname.replace('/login', '');
    const pathInput = document.querySelector('#pathMeta');
    pathInput.value = path || '/';
}
