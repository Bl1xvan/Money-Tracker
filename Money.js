//For the income form
let labelsNameIncome = document.getElementById('labels-name-income');
let labelsPriceIncome = document.getElementById('labels-price-income');
let labelsFormIncome = document.getElementById("labels-form-income");


//For the expense form

let labelsNameExpense = document.getElementById('labels-name-expense');
let labelsPriceExpense = document.getElementById('labels-price-expense');
let labelsFormExpense = document.getElementById("labels-form-expense");

//Exchange list
let totalAmount = document.getElementById("total-amount");
let incomeAmount = document.getElementById("income-amount");
let expenseAmount = document.getElementById("expense-amount");
let exchangeOrder = document.getElementById("exchange-order");

//Main array

const localStorageItemList = JSON.parse(localStorage.getItem('itemList'));
let itemList = localStorage.getItem('itemList') !== null ? localStorageItemList : [];

//Main buttons
labelsFormIncome.addEventListener('submit', addIncome);
labelsFormExpense.addEventListener('submit', addExpense);


let newDate = new Date();


function generateID(){
    return Math.floor(Math.random() * 1000);
}

function addIncome(e){
    e.preventDefault();
    if (labelsNameIncome.value.trim() === "" || labelsPriceIncome.value.trim() === "" ){
        alert('all boxes must be filled');
    } else {
        const newItem = {
            id: generateID(),
            labelname: labelsNameIncome.value,
            date: newDate.toLocaleDateString(),
            price: +labelsPriceIncome.value
        }

        itemList.push(newItem);
        addNewItem(newItem);
        labelsNameIncome.value = "";
        labelsPriceIncome.value = "";
        updateValues();
        updateLocalStorage();
    }

}

function addExpense(e){
    e.preventDefault();
    if (labelsNameExpense.value.trim() === "" || labelsPriceExpense.value.trim() === "" ){
        alert('all boxes must be filled');
    } else {
        const newItem = {
            id: generateID(),
            labelname: labelsNameExpense.value,
            date: newDate.toLocaleDateString(),
            price: -labelsPriceExpense.value
        }

        itemList.push(newItem);
        addNewItem(newItem);
        labelsNameExpense.value = "";
        labelsPriceExpense.value = "";
        updateValues();
        updateLocalStorage();
    }

}


//formats new item
function addNewItem(newItem) {


    const newListItem = document.createElement('li');
    newListItem.classList.add(newItem.price > 0 ? 'exchange-list-item-plus' : 'exchange-list-item-minus');

    let price = newItem.price;
    let format = price.toFixed(2)
  

    newListItem.innerHTML = `
    <div class="itemhalf" id="half1">
        <span class="smallfont">${newItem.id}</span>
        <span class="itemname">${newItem.labelname}</span>
        <span class="smallfont">${newItem.date}</span>
    </div>
    <div class="itemhalf" id="half2">
        <span>${format}</span>
        <button class="delete-button" onclick="removeItem(${newItem.id})">
        X</button>
       
    </div>`;
    exchangeOrder.appendChild(newListItem);
}

function updateValues(){
    const prices = itemList.map(newItem => newItem.price);
    const total = prices.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = prices
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item), 0)
                    .toFixed(2);

    const expense = (prices.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    incomeAmount.innerHTML =`$${income}`;
    expenseAmount.innerHTML = `$${expense}`;
    totalAmount.innerHTML = `$${total}`;
                        
    
}


function removeItem(id){
    itemList = itemList.filter(newItem => newItem.id !== id);
    updateLocalStorage();
    init();
}

function updateLocalStorage(){
    localStorage.setItem('itemList', JSON.stringify(itemList));
}

function init(){
    exchangeOrder.innerHTML = "";
    itemList.forEach(addNewItem);
    updateValues();
}

init();