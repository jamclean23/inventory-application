/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for homepage

// ====== IMPORTS ======

// Css


// ====== MAIN =======

main();

// ====== FUNCTIONS ======

function main() {
  console.log('test10');
  addListeners();
}
function addListeners() {
  const logoutBtn = document.querySelector('#logoutBtn');
  logoutBtn.addEventListener('click', handleLogoutClick);
}
async function handleLogoutClick() {
  window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}
/******/ })()
;
//# sourceMappingURL=homepage.js.map