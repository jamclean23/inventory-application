/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../../";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/assets/icons/edit.svg
const edit_namespaceObject = __webpack_require__.p + "assets/images/4275c76a6db68c66d788.svg";
;// CONCATENATED MODULE: ./src/assets/icons/x.svg
const x_namespaceObject = __webpack_require__.p + "assets/images/c8494eb2642084db1817.svg";
;// CONCATENATED MODULE: ./src/homepage/homepage.js
// Javascript for homepage

// ====== IMPORTS ======

// Css


// Icons



// ====== STATE ======

let spinning = false;

// ====== MAIN =======

main();

// ====== FUNCTIONS ======

function main() {
  setCssVars();
  addListeners();
  populateCheeses();
}
async function populateCheeses() {
  showLoading();
  const cheesesObj = await find();
  hideLoading();
  createCheeseElements(cheesesObj);
}
async function updateCheeses() {
  clearCheeses();
  showLoading();

  // Navbar elements
  const category = document.querySelector('#sort');
  const sortOrder = document.querySelector('#sortOrder');
  const keyword = document.querySelector('#keyword');
  const cheesesObj = await find(category.value, sortOrder.value, keyword.value);
  createCheeseElements(cheesesObj);
  hideLoading();
}
function clearCheeses() {
  const cheesesContent = document.querySelector('.cheesesContent');
  cheesesContent.innerHTML = '';
}
function showLoading() {
  if (spinning) {
    hideLoading();
  }
  spinning = true;
  const loading = document.createElement('div');
  loading.classList.add('loadingSpinner');
  loading.innerText = `Loading`;
  document.querySelector('.cheesesContent').appendChild(loading);
  updateSpinner();
}
async function updateSpinner(dots = 0) {
  if (!spinning) {
    return;
  }
  const spinner = document.querySelector('.loadingSpinner');
  if (spinner) {
    await timer();
    if (dots > 2) {
      spinner.innerText = 'Loading.';
      dots = 0;
    } else {
      spinner.innerText += '.';
    }
    updateSpinner(++dots);
  } else {
    return;
  }
  function timer() {
    return new Promise(resolve => {
      setTimeout(resolve, 500);
    });
  }
}
function hideLoading() {
  spinning = false;
  const loading = document.querySelector('.loadingSpinner');
  if (loading) {
    loading.remove();
  }
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
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttonsDiv');
    newCard.appendChild(buttonsDiv);
    const editBtn = document.createElement('button');
    editBtn.classList.add('editBtn');
    const editIcon = document.createElement('img');
    editIcon.src = edit_namespaceObject;
    editIcon.classList.add('editImg');
    editBtn.appendChild(editIcon);
    buttonsDiv.appendChild(editBtn);
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    const closeIcon = document.createElement('img');
    closeIcon.src = x_namespaceObject;
    closeIcon.classList.add('closeIcon');
    removeBtn.appendChild(closeIcon);
    buttonsDiv.appendChild(removeBtn);
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
async function handleApplyClick() {
  const applyBtn = document.querySelector('#applyBtn');
  applyBtn.disabled = true;
  await updateCheeses();
  applyBtn.disabled = false;
}
async function find(sortBy = 'name', sortDirection = 'ascending', keyword = '') {
  const parameters = JSON.stringify({
    "sortBy": sortBy,
    "sortDirection": sortDirection,
    "keyword": keyword
  });
  const results = await fetch('/db_query/find', {
    method: "GET",
    headers: {
      parameters
    }
  });
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