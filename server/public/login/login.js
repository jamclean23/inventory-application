/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// Javascript for login page

console.log('linked');

// ====== IMPORTS ======

// Css


// ====== MAIN ======

setPath();

// ====== FUNCTIONS ======

function setPath() {
  const path = window.location.pathname.replace('/login', '');
  const pathInput = document.querySelector('#pathMeta');
  if (!pathInput.value) {
    pathInput.value = path || '/';
  }
}
/******/ })()
;
//# sourceMappingURL=login.js.map