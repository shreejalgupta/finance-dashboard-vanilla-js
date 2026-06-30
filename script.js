let userNameArr = JSON.parse(localStorage.getItem("userInfo")) || [];
let prefrence = JSON.parse(localStorage.getItem("prefrence")) || false;
let loginCheker = JSON.parse(localStorage.getItem("isLogin")) || false;

const body = document.querySelector("body");
const showLogin = document.querySelector(".login-window");
const showMainHero = document.querySelector(".main-hero");
const dashboardBtn = document.querySelector("#dashboard-btn");
const settingBtn = document.querySelector("#setting-btn");
const dashboardShow = document.querySelector("#dashboard-section");
const settingShow = document.querySelector("#setting-section");
const prefrenceBtn = document.querySelector("#prfrence-btn")


function prefrenceFunction() {
    if (prefrence === false) {
        prefrenceBtn.checked = false;
        body.classList.remove("dark");
    } else {
        prefrenceBtn.checked = true;
        body.classList.add("dark");
    }
}
prefrenceFunction();

prefrenceBtn.addEventListener("change", (e) => {
    if (e.target.checked) {
        prefrence = true;
        localStorage.setItem("prefrence", JSON.stringify(prefrence));
        prefrenceFunction();
    } else {
        prefrence = false
        localStorage.removeItem("prefrence");
        prefrenceFunction();
    }
})


let userNameStore = "";
let updateUserNameArr = -1;
function loginChekerfunction() {
    if (loginCheker) {
        showLogin.style.display = "none";
        showMainHero.style.display = "flex";
        userNameDisplay();
        dashboardBtn.classList.toggle("active-nav");
    } else {
        showLogin.style.display = "flex";
        showMainHero.style.display = "none";
        loginRegester();
    }
}
loginChekerfunction();

function chart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
chart();
let bool = false;
function loginRegester() {
    const loginBtn = document.querySelector("#login-btn");
    const registerBtn = document.querySelector("#register-btn");
    const showRegister = document.querySelector(".register-window");
    const regesterSelectInLogin = document.querySelector(".regester-tag")
    const loginSelectInRegester = document.querySelector(".login-tag")
    const loginForm = document.querySelector(".login-form");
    const regesterForm = document.querySelector(".register-form");


    regesterSelectInLogin.addEventListener("click", () => {
        if (showRegister.style.display = "none") {
            showLogin.style.display = "none";
            showRegister.style.display = "flex";
        }
        // showRegister.classList.toggle("flex");
        // showLogin.classList.toggle("flex");
    })
    loginSelectInRegester.addEventListener("click", () => {
        if (showLogin.style.display = "none") {
            showLogin.style.display = "flex";
            showRegister.style.display = "none";
        }
        // showLogin.classList.toggle("flex");
        // showRegister.classList.toggle("flex");
    })



    regesterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let userName = e.target[0].value.trim();
        let password = e.target[1].value.trim();

        let userInfoObj = {
            userName,
            password,
            login: false
        }

        if (userInfoObj.userName == "" || userInfoObj.password == "") {
            alert("Please fill all Input")
            return;
        };

        console.log(userInfoObj);

        userNameArr.push(userInfoObj);
        localStorage.setItem("userInfo", JSON.stringify(userNameArr));


        alert("Registration successfull! You can now log in.")
        regesterForm.reset();
        showRegister.style.display = "none";
        showLogin.style.display = "flex";
    })
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let userName = e.target[0].value.trim();
        let password = e.target[1].value.trim();



        for (let e of userNameArr) {

            if (userName === e.userName && password === e.password) {
                bool = true;
                break;
            }
        }

        if (!bool) {
            alert("Incorrect Username of Password");
            loginForm.reset();
            return;
        } else {
            let userInfoObj = {
                userName,
                password,
                login: true
            }
            updateUserNameArr = userNameArr.findIndex(e => e.userName === userName);

            if (updateUserNameArr !== -1) {
                userNameArr[updateUserNameArr] = userInfoObj;
                localStorage.setItem("userInfo", JSON.stringify(userNameArr));
                localStorage.setItem("isLogin", JSON.stringify(true));
                loginCheker = true;

            }
            // showLogin.classList.toggle("flex");
        }

        loginChekerfunction();
        window.location.reload();
        loginForm.reset();
    })

}

// UserName code 
function userNameDisplay() {
    const userNamedisplay = document.querySelector(".userName-display");
    userNameArr.forEach(e => {
        if (e.login) {
            userNameStore = e.userName;
        }
    })

    userNamedisplay.innerHTML = userNameStore;
}

// Logout code 

const logoutBtn = document.querySelector("#log-out-btn");

logoutBtn.addEventListener("click", () => {
    localStorage.setItem("isLogin", JSON.stringify(false));
    loginCheker = false;
    bool = false;

    userNameArr.forEach((e, i) => {
        if (e.login) {
            userNameArr[i].login = false;
        }
    });

    localStorage.setItem("userInfo", JSON.stringify(userNameArr));
    userNameStore = "";
    loginChekerfunction();

})


dashboardBtn.addEventListener("click", () => {
    if (!dashboardBtn.classList.contains("active-nav")) {
        dashboardBtn.classList.toggle("active-nav");
        settingBtn.classList.toggle("active-nav");

        settingShow.style.display = "none";
        dashboardShow.style.display = "flex";
    }
})
settingBtn.addEventListener("click", () => {
    if (!settingBtn.classList.contains("active-nav")) {
        settingBtn.classList.toggle("active-nav");
        dashboardBtn.classList.toggle("active-nav");

        dashboardShow.style.display = "none";
        settingShow.style.display = "flex";
    }
})

// All Transaction part 

let transactionsArr = JSON.parse(localStorage.getItem("transactionsInfo")) || [];

const addingExpenseBtn = document.querySelector("#adding-btn")
const addingExpenseForm = document.querySelector(".adding-expense")
const closeExpenseForm = document.querySelector(".closeFormAdd");
const addingForm = document.querySelector("#form-expense-adding")
const addingFormSubmit = document.querySelector(".adding-form-btn");
const uiBlock = document.querySelector(".dom-blocks");
const totalbalance = document.querySelector(".total-balance");
const totalincome = document.querySelector(".total-income");
const totalexpense = document.querySelector(".total-expense");
const totaltransaction = document.querySelector(".total-transaction");
const filterBtn = document.querySelector("#transaction-select");
const searchBtn = document.querySelector("#search-btn");
const settingCurrency = document.querySelector("#setting-currency");

let currencySymbol = document.querySelectorAll(".currency-feature");
let currencyUpdater = JSON.parse(localStorage.getItem("currency")) || "$";

settingCurrency.value = currencyUpdater;

function currencyLoader() {
    currencySymbol = document.querySelectorAll(".currency-feature");
    
    currencySymbol.forEach(span => {
        span.innerText = currencyUpdater;
    });

}
currencyLoader();
let totalBalance = 0;
let totalIncome = 0;
let totalExpenses = 0;
let totalTransaction = 0;
transactionsArr.forEach(e => totalTransaction++);

addingExpenseBtn.addEventListener("click", () => {
    addingExpenseForm.classList.toggle("flex");
    // closingAddForm();
})
closeExpenseForm.addEventListener("click", () => {
    addingExpenseForm.classList.toggle("flex");
})

function uiTransaction() {
    uiBlock.innerHTML = "";
    transactionsArr.forEach((e, i) => {
        uiBlock.innerHTML += `<div class="block-div" id="${i}">
                                    <p id="date-block" class="center">${e.dateOf}</p>
                                    <p id="description-block" class="bold center">${e.description}</p>
                                    <p class="center">
                                        <span id="category-block" class="block-category">${e.category}</span>
                                    </p>
                                    <p class="center"><span class="currency-feature">$</span><span class="amount-block">${e.amount}</span></p>
                                    <div class="action-money-section center">
                                        <i onclick="updateTransaction(${e.id})" class="block-edit ri-pencil-fill"></i>
                                        <i onclick="deleteTransaction(${e.id})" class="block-delete ri-delete-bin-fill"></i>
                                    </div>
                                </div>`
    })
    currencyLoader();
}
uiTransaction();
function featureUi() {
    totalBalance = 0;
    totalIncome = 0;
    totalExpenses = 0;
    transactionsArr.forEach((e, i) => {
        let amount = Number(e.amount)

        if (e.typeOfIncome === "expense") {
            totalBalance -= amount;
            totalExpenses += amount
        } else {
            totalBalance += amount;
            totalIncome += amount;
        }

    })
    totalbalance.innerHTML = totalBalance;
    totalincome.innerHTML = totalIncome;
    totalexpense.innerHTML = totalExpenses;
    totaltransaction.innerHTML = totalTransaction;
}
featureUi();

function idGenerator() {
    let id = Math.floor(Math.random() * 99999999 + 1);
    return id;
}
idGenerator();

let updateIndex = null;
addingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let typeOfIncome = e.target[0].value.trim();
    let description = e.target[1].value.trim();
    let amount = e.target[2].value.trim();
    let dateOf = e.target[3].value.trim();
    let category = e.target[4].value.trim();

    let transactions = {
        typeOfIncome,
        description,
        amount,
        dateOf,
        category,
        id: idGenerator()
    }
    if (description === "" || amount === "" || dateOf === "") {
        alert("Please fill all input");
        return;
    }
    if (updateIndex != null) {
        transactionsArr[updateIndex] = transactions;
        updateIndex = null;
    } else {
        transactionsArr.push(transactions);

        totalTransaction++;
    }
    localStorage.setItem("transactionsInfo", JSON.stringify(transactionsArr));
    addingExpenseForm.classList.toggle("flex");
    currencyLoader();
    featureUi();
    filterBtn.value = "all";
    uiTransaction();
    
    addingForm.reset();
    window.location.reload();

})
function updateTransaction(index) {
    addingExpenseForm.classList.toggle("flex");
    let transactionHistory = transactionsArr.find(e => e.id === index);
    updateIndex = transactionsArr.findIndex(e => e.id === index)

    addingForm[0].value = transactionHistory.typeOfIncome;

    addingForm[1].value = transactionHistory.description;
    addingForm[2].value = transactionHistory.amount;
    addingForm[3].value = transactionHistory.dateOf;
    addingForm[4].value = transactionHistory.category;
}

function deleteTransaction(i) {
    let index = transactionsArr.findIndex(e => e.id === i);
    transactionsArr.splice(index, 1);
    totalTransaction--;
    localStorage.setItem("transactionsInfo", JSON.stringify(transactionsArr));
    featureUi();
    uiTransaction();
}

const resetBtn = document.querySelector("#reset-all-data");
resetBtn.addEventListener("click", () => {
    currencyLoader();
    localStorage.removeItem("transactionsInfo");
    transactionsArr = [];
    totalTransaction = 0;
    featureUi();
    uiTransaction();
    window.location.reload();
})


function selectFilter(name) {
    if (name === "all") {
        uiTransaction();
        return;
    }
    uiBlock.innerHTML = "";
    transactionsArr.forEach((e, i) => {
        if (e.typeOfIncome === name) {
            uiBlock.innerHTML += `<div class="block-div" id="${i}">
                                    <p id="date-block" class="center">${e.dateOf}</p>
                                    <p id="description-block" class="bold center">${e.description}</p>
                                    <p class="center">
                                        <span id="category-block" class="block-category">${e.category}</span>
                                    </p>
                                    <p class="center"><span class="currency-feature">$</span><span class="amount-block">${e.amount}</span></p>
                                    <div class="action-money-section center">
                                        <i onclick="updateTransaction(${e.id})" class="block-edit ri-pencil-fill"></i>
                                        <i onclick="deleteTransaction(${e.id})" class="block-delete ri-delete-bin-fill"></i>
                                    </div>
                                </div>`
        }
    })
    currencyLoader();

}

filterBtn.addEventListener("change", () => {
    let filterName = filterBtn.value;
    selectFilter(filterName)
})

searchBtn.addEventListener("input", () => {
    let searchName = searchBtn.value;
    if (searchName.trim() === "") {
        uiTransaction();
        return;
    }
    uiBlock.innerHTML = "";
    transactionsArr.filter((e, i) => {
        if (e.description.toLowerCase().includes(searchName.toLowerCase())) {
            uiBlock.innerHTML += `<div class="block-div" id="${i}">
                                    <p id="date-block" class="center">${e.dateOf}</p>
                                    <p id="description-block" class="bold center">${e.description}</p>
                                    <p class="center">
                                        <span id="category-block" class="block-category">${e.category}</span>
                                    </p>
                                    <p class="center"><span class="currency-feature">$</span><span class="amount-block">${e.amount}</span></p>
                                    <div class="action-money-section center">
                                        <i onclick="updateTransaction(${e.id})" class="block-edit ri-pencil-fill"></i>
                                        <i onclick="deleteTransaction(${e.id})" class="block-delete ri-delete-bin-fill"></i>
                                    </div>
                                </div>`
        }
    })
    currencyLoader();
})


// Setting Section 

const profileDetailForm = document.querySelector("#profile-detail");



profileDetailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userNamedisplay = document.querySelector(".userName-display");
    let changedName = e.target[0].value.trim();
    let changedCurency = e.target[1].value;
    console.log(currencySymbol)
    currencySymbol.forEach(span => {
        span.innerText = changedCurency;
    });
    localStorage.setItem("currency", JSON.stringify(changedCurency));
    let loginInfoIndex = userNameArr.findIndex(e => e.login === true);

    if (changedName !== "") {
        // loginInfo.userName = changedName;
        let loginInfo = userNameArr.find(e => {
            if (e.login === true) {
                e.userName = changedName;
                return e;
            }
        });
        userNameArr[loginInfoIndex] = loginInfo;
        userNamedisplay.innerHTML = changedName;
        localStorage.setItem("userInfo", JSON.stringify(userNameArr));
    }

})

