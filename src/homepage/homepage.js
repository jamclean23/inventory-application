// Javascript for homepage


// ====== IMPORTS ======

// Css
import './homepage.css'


// ====== MAIN =======

main();


// ====== FUNCTIONS ======

function main () {
    setCssVars();
    addListeners();
}

function setCssVars () {
    const headerHeight = getHeaderHeight();
    const navHeight = getNavHeight();
    const root = document.querySelector(':root');
    root.style.setProperty('--header-height', `${headerHeight}px`);
    root.style.setProperty('--nav-height', `${navHeight}px`);

}

function getHeaderHeight () {
    const header = document.querySelector('header');
    return header.offsetHeight;
}

function getNavHeight () {
    const nav = document.querySelector('.mainContentNav');
    return nav.offsetHeight;
}

function addListeners () {
    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', handleLogoutClick);

    window.addEventListener('resize', handleResize);
}

function handleResize () {
    setCssVars();
}

async function handleLogoutClick () {
    window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}