// Javascript for homepage


// ====== IMPORTS ======

// Css
import './homepage.css'

// Icons
import editSvg from '../assets/icons/edit.svg';
import xSvg from '../assets/icons/x.svg';

// ====== STATE ======

let spinning = false;
let cheeseClicked = '';


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

    hideLoading();
    
    createCheeseElements(cheesesObj);

}

function clearCheeses () {
    const cheesesContent = document.querySelector('.cheesesContent');
    cheesesContent.innerHTML = '';
}

function showLoading () {
    const cheesesContent = document.querySelector('.cheesesContent');

    const cheeseWrapper = document.createElement('div');
    cheeseWrapper.classList.add('cheeseWrapper');
    cheesesContent.appendChild(cheeseWrapper);

    const cheeseImg = document.createElement('img');
    cheeseImg.classList.add('cheeseSpinner');
    cheeseImg.src = '/assets/images/cheese.png';

    cheeseWrapper.appendChild(cheeseImg);


    // if (spinning) {
    //     hideLoading();
    // }

    // spinning = true;
    // const loading = document.createElement('div');
    // loading.classList.add('loadingSpinner');
    // loading.innerText = `Loading`;
    // document.querySelector('.cheesesContent').appendChild(loading);
    // updateSpinner();
}

function hideLoading() {
    const cheeseImg = document.querySelector('.cheeseSpinner');
    cheeseImg.remove();

    // spinning = false;
    // const loading = document.querySelector('.loadingSpinner');
    // if (loading) {
    //     loading.remove();
    // }
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



function createCheeseElements (cheesesObj) {
    const cheesesContent = document.querySelector('.cheesesContent');

    const infoCard = document.createElement('article');
    infoCard.classList.add('infoCard');
    infoCard.innerText = `${cheesesObj.length} results`;
    cheesesContent.appendChild(infoCard);

    cheesesObj.forEach((cheese) => {
        const newCard = document.createElement('article');
        newCard.classList.add('cheeseCard');
        newCard.meta = {};

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
        newCard.meta.id = cheese._id;
        newCard.appendChild(id);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttonsDiv');
        newCard.appendChild(buttonsDiv);

        const editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', handleEditBtnClick);
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
        removeBtn.addEventListener('click', handleRemoveBtnClick);
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

    // Buttons
    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', handleLogoutClick);

    const applyBtn = document.querySelector('#applyBtn');
    applyBtn.addEventListener('click', handleApplyClick);

    const addBtn = document.querySelector('.addBtn');
    addBtn.addEventListener('click', handleAddClick);

    const addModalSubmitBtn = document.querySelector('#addModalSubmit');
    addModalSubmitBtn.addEventListener('click', handleAddModalSubmitClick);

    const addModalCancelBtn = document.querySelector('#addModalCancelBtn');
    addModalCancelBtn.addEventListener('click', handleAddModalCancelBtnClick);

    const editModalCancelBtn = document.querySelector('#editModalCancelBtn');
    editModalCancelBtn.addEventListener('click', handleEditCancelBtnClick);

    const confirmRemoveModalCancelBtn = document.querySelector('#confirmRemoveModalCancelBtn');
    confirmRemoveModalCancelBtn.addEventListener('click', handleConfirmRemoveModalCanceBtnClick);

    const confirmRemoveModalBtn = document.querySelector('#confirmRemoveBtn');
    confirmRemoveModalBtn.addEventListener('click', handleConfirmRemoveBtnClick);

    const editSubmitBtn = document.querySelector('#editModalSubmit');
    editSubmitBtn.addEventListener('click', handleEditSubmitBtnClick);

    // Fields
    setFieldsEventListeners();

    // Resize
    window.addEventListener('resize', handleResize);
}

function handleEditCancelBtnClick () {
    hideEditModal();
}

function hideEditModal () {
    cheeseClicked = '';

    hideModalWrapper();
    const editModal = document.querySelector('.editModal');
    editModal.style.display = 'none';
}

async function handleConfirmRemoveBtnClick () {
    const confirmRemoveBtn = document.querySelector('#confirmRemoveBtn');
    confirmRemoveBtn.disabled = true;
    try {
        const response = await fetch('db_query/remove', {
            method: "POST",
            headers: {
                "id": cheeseClicked
            }
        });

        const result = await response.json();

        console.log(result);
    } catch (err) {
        console.log(err);
    } finally {
        hideConfirmRemoveModal();
        confirmRemoveBtn.disabled = false;
        clearCheeses();
        handleApplyClick();
    }
}

function handleConfirmRemoveModalCanceBtnClick () {
    hideConfirmRemoveModal();
}

function hideConfirmRemoveModal () {
    const confirmRemoveModal = document.querySelector('.confirmRemoveModal');
    confirmRemoveModal.style.display = 'none';

    cheeseClicked = '';

    hideModalWrapper();
}

function handleAddModalCancelBtnClick () {
    clearAddModal();
    hideAddModal();
}

function clearAddModal () {
    const fields = getAddModalElements();
    fields.forEach((field) => {
        field.value = '';
    });
}

function getAddModalElements () {
    const inputs = Array.from(document.querySelector('.addModal').querySelectorAll('input'));
    const textAreas = Array.from(document.querySelector('.addModal').querySelectorAll('textarea'));
    const fields = inputs.concat(textAreas);

    return fields;
}

function setFieldsEventListeners () {
    const addFields = getAddModalElements();

    addFields.forEach((field) => {
        field.addEventListener('input', handeFieldChange);
    });

    const editFields = getEditModalElements();

    editFields.forEach((field) => {
        field.addEventListener('input', handleEditFieldChange);
    });
}

function handleEditFieldChange () {
    checkEditModalValidity();
}

function checkEditModalValidity () {
    const fields = getEditModalElements();
    
    let fieldsValid = true;

    fields.forEach((field) => {
        if (field.value === '') {
            field.parentElement.querySelector('span').innerText = 'Field must not be blank';
            fieldsValid = false;
        } else {
            field.parentElement.querySelector('span').innerText = '';
        }
    });

    return fieldsValid;
}

function handeFieldChange () {
    checkAddModalValidity();
}

function checkAddModalValidity () {

    const inputs = Array.from(document.querySelector('.addModal').querySelectorAll('input'));
    const textAreas = Array.from(document.querySelector('.addModal').querySelectorAll('textarea'));
    const fields = inputs.concat(textAreas);
    
    let fieldsValid = true;

    fields.forEach((field) => {
        if (field.value === '') {
            field.parentElement.querySelector('span').innerText = 'Field must not be blank';
            fieldsValid = false;
        } else {
            field.parentElement.querySelector('span').innerText = '';
        }
    });

    return fieldsValid;
}

async function handleAddModalSubmitClick () {
    if (checkAddModalValidity()) {

        const fields = getAddModalFields();
        
        try {
            const result = await submitNewCheese(fields);
            console.log(result);
            if (result) {
                clearAddModal();
                hideAddModal();
                clearCheeses();
                handleApplyClick();
            } else {
                console.log('Not added');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        return;
    }


}

async function submitNewCheese (fieldsObj) {
    const response = await fetch('db_query/add', {
        method: 'POST',
        headers: {
            "fields": JSON.stringify(fieldsObj)
        }
    });

    const result = await response.json();

    return result.docAdded;
}

function getAddModalFields () {
    return {
        name: document.querySelector('#cheeseName').value,
        description: document.querySelector('#cheeseDescription').value,
        category: document.querySelector('#cheesePrice').value,
        region: document.querySelector('#cheeseRegion').value,
        weight: document.querySelector('#cheeseWeight').value,
        stock: document.querySelector('#cheeseStock').value,
        price: document.querySelector('#cheesePrice').value
    }
}

async function handleAddClick () {
    showAddModal();
}

function showAddModal () {
    showModalWrapper();
    const addModal = document.querySelector('.addModal');
    addModal.style.display = 'inline';
}

function hideAddModal () {
    const addModal = document.querySelector('.addModal');
    addModal.style.display = 'none';    
    hideModalWrapper();
}

function showModalWrapper () {
    const addModalWrapper = document.querySelector('.modalWrapper');
    addModalWrapper.style.display = 'flex';
}

function hideModalWrapper () {
    const addModalWrapper = document.querySelector('.modalWrapper');
    addModalWrapper.style.display = 'none';
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

function handleRemoveBtnClick (event) {
    updateCheeseClicked(event)
    showConfirmRemoveModal();
}

function updateCheeseClicked (event) {
    cheeseClicked = event.target.parentElement.parentElement.parentElement.meta.id;
}

function showConfirmRemoveModal () {
    showModalWrapper();

    const confirmRemoveModal = document.querySelector('.confirmRemoveModal');
    confirmRemoveModal.style.display = 'flex';
}

function handleEditBtnClick (event) {
    updateCheeseClicked(event);
    showEditModal();
}

async function showEditModal () {
    showModalWrapper();
    const inputElements = getEditModalElements();

    const response = await fetch('db_query/find_by_id', {
        method: "GET",
        headers: {
            "id": cheeseClicked
        }
    });

    const result = await response.json();

    const cheese = result.result;

    inputElements.forEach((field) => {
        switch (field.id) {
            case 'editCheeseName':
                field.value = cheese.name;
                break;
            case 'editCheeseCategory':
                field.value = cheese.category;
                break;
            case 'editCheesePrice':
                field.value = cheese.price;
                break;
            case 'editCheeseRegion':
                field.value = cheese['country_of_origin'];
                break;
            case 'editCheeseWeight':
                field.value = cheese.weight;
                break;
            case 'editCheeseStock':
                field.value = cheese.stock;
                break;
            case 'editCheeseDescription':
                field.value = cheese.description;
                break;
        }
    });

    checkEditModalValidity();

    const editModal = document.querySelector('.editModal');
    editModal.style.display = 'inline';

}

function getEditModalElements () {
    const inputs = Array.from(document.querySelector('.editModal').querySelectorAll('input'));
    const textAreas = Array.from(document.querySelector('.editModal').querySelectorAll('textarea'));
    const fields = inputs.concat(textAreas);

    return fields;
}

async function handleEditSubmitBtnClick () {
    const fields = getEditModalFields();

    const response = await fetch('db_query/update', {
        method: "POST",
        headers: {
            "fields": JSON.stringify(fields),
            "id": cheeseClicked
        }
    });

    const result = await response.json();

    if (result.result) {
        clearCheeses();
        handleApplyClick();
        hideEditModal();
    } else {
        console.log('Not Updated');
    }
}

function getEditModalFields () {
    return {
        name: document.querySelector('#editCheeseName').value,
        description: document.querySelector('#editCheeseDescription').value,
        category: document.querySelector('#editCheesePrice').value,
        region: document.querySelector('#editCheeseRegion').value,
        weight: document.querySelector('#editCheeseWeight').value,
        stock: document.querySelector('#editCheeseStock').value,
        price: document.querySelector('#editCheesePrice').value
    }
}