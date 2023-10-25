// Javascript for homepage


// ====== IMPORTS ======

// Css
import './homepage.css'

// Icons
import editSvg from '../assets/icons/edit.svg';
import xSvg from '../assets/icons/x.svg';

// ====== STATE ======

let spinning = false;


// ====== MAIN =======

main();


// ====== FUNCTIONS ======

function main () {
    setCssVars();
    addListeners();
    populateCheeses();
}

async function populateCheeses () {
    showLoading();
    const cheesesObj = await find();
    hideLoading();
    createCheeseElements(cheesesObj);
}

async function updateCheeses () {
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

function clearCheeses () {
    const cheesesContent = document.querySelector('.cheesesContent');
    cheesesContent.innerHTML = '';
}

function showLoading () {

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

async function updateSpinner (dots = 0) {
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
        return
    }
        function timer () {
            return new Promise((resolve) => {
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

function createCheeseElements (cheesesObj) {
    const cheesesContent = document.querySelector('.cheesesContent');

    const infoCard = document.createElement('article');
    infoCard.classList.add('infoCard');
    infoCard.innerText = `${cheesesObj.length} results`;
    cheesesContent.appendChild(infoCard);

    cheesesObj.forEach((cheese) => {
        const newCard = document.createElement('article');
        newCard.classList.add('cheeseCard');

        const name = document.createElement('h3');
        name.innerText = cheese.name;
        newCard.appendChild(name);

        const description = document.createElement('p');
        description.innerText = cheese.description;
        newCard.appendChild(description);

        const category = document.createElement('p');
        category.innerText = `Category: ${cheese.category}`
        newCard.appendChild(category);

        const region = document.createElement('p');
        region.innerText = `Country: ${cheese.country_of_origin}`
        newCard.appendChild(region);

        const price = document.createElement('p');
        price.innerText = `Price: $${cheese.price}`
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
        editIcon.src = editSvg;
        editIcon.classList.add('editImg');
        editBtn.appendChild(editIcon);
        buttonsDiv.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBtn');
        const closeIcon = document.createElement('img');
        closeIcon.src = xSvg;
        closeIcon.classList.add('closeIcon');
        removeBtn.appendChild(closeIcon);
        buttonsDiv.appendChild(removeBtn);



        cheesesContent.appendChild(newCard);
    });
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

    const applyBtn = document.querySelector('#applyBtn');
    applyBtn.addEventListener('click', handleApplyClick);

    window.addEventListener('resize', handleResize);
}

async function handleApplyClick () {

    const applyBtn = document.querySelector('#applyBtn');
    applyBtn.disabled = true;

    await updateCheeses();

    applyBtn.disabled = false;
}

async function find (sortBy = 'name', sortDirection = 'ascending', keyword = '') {

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

function handleResize () {
    setCssVars();
}

async function handleLogoutClick () {
    window.location.replace(`${window.location.origin}/login/handleLogoutRequest`);
}