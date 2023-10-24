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
  setCssVars();
  addListeners();
  populateCheeses();
}
async function populateCheeses() {
  const cheesesObj = await findAll();
  createCheeseElements(cheesesObj);
}
function createCheeseElements(cheesesObj) {
  const cheesesContent = document.querySelector('.cheesesContent');
  const infoCard = document.createElement('article');
  infoCard.classList.add('infoCard');
  infoCard.innerText = `${cheesesObj.length} results`;
  cheesesContent.appendChild(infoCard);
  cheesesObj.forEach(cheese => {
    const newCard = document.createElement('article');
    newCard.classList.add('cheeseCard');
    const name = document.createElement('h3');
    name.innerText = cheese.name;
    newCard.appendChild(name);
    const description = document.createElement('p');
    description.innerText = cheese.description;
    newCard.appendChild(description);
    const category = document.createElement('p');
    category.innerText = `Category: ${cheese.category}`;
    newCard.appendChild(category);
    const region = document.createElement('p');
    region.innerText = `Country: ${cheese.country_of_origin}`;
    newCard.appendChild(region);
    const price = document.createElement('p');
    price.innerText = `Price: $${cheese.price}`;
    newCard.appendChild(price);
    const weight = document.createElement('p');
    weight.innerText = `Weight: ${cheese.weight} oz`;
    newCard.appendChild(weight);
    const stock = document.createElement('p');
    stock.innerText = `Current Stock: ${cheese.stock} units`;
    newCard.appendChild(stock);
    const id = document.createElement('p');
    id.innerText = `Item Id: ${cheese._id}`;
    newCard.appendChild(id);
    cheesesContent.appendChild(newCard);
  });
}
function setCssVars() {
  const headerHeight = getHeaderHeight();
  const navHeight = getNavHeight();
  const root = document.querySelector(':root');
  root.style.setProperty('--header-height', `${headerHeight}px`);
  root.style.setProperty('--nav-height', `${navHeight}px`);
}
function getHeaderHeight() {
  const header = document.querySelector('header');
  return header.offsetHeight;
}
function getNavHeight() {
  const nav = document.querySelector('.mainContentNav');
  return nav.offsetHeight;
}
function addListeners() {
  const logoutBtn = document.querySelector('#logoutBtn');
  logoutBtn.addEventListener('click', handleLogoutClick);
  const applyBtn = document.querySelector('#applyBtn');
  applyBtn.addEventListener('click', handleApplyClick);
  window.addEventListener('resize', handleResize);
}
async function handleApplyClick() {}
async function findAll() {
  const results = await fetch('/db_query/find_all');
  const cheesesObj = await results.json();
  return cheesesObj;
}
function handleResize() {
  setCssVars();
}
async function handleLogoutClick() {
  window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}
/******/ })()
;
//# sourceMappingURL=homepage.js.map