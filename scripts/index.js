let transactions = [];
const transactionsContainer = document.getElementById("transactions-container");
const createTransactionForm = document.getElementById("add-transaction-form");
const applyFilters = document.getElementById("applyFilter");

function viewTransactions() {
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const transactionItem = document.createElement("div");
    transactionItem.innerHTML = `
        <div>${transaction.description}</div>
        <div>${transaction.amount}</div>
        <div>${transaction.transactionType}</div>
        <div>${transaction.currency}</div>
        <button onclick="editTransaction(${index})">Edit</button>
        <button onclick="deleteTransaction(${index})">Delete</button>
      `;
    transactionsContainer.appendChild(transactionItem);
  });
}

function createTransaction(description, amount, transactionType, currency) {
  const newTransaction = { description, amount, transactionType, currency };
  transactions.push(newTransaction);
  viewTransactions();
  saveToLocalStorage(transactions);
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveToLocalStorage(transactions);
  viewTransactions();
}

function editTransaction(index) {
  const newDescription = prompt("Enter new description:");
  const newAmount = parseFloat(prompt("enter new amount:"));
  transactions[index].description = newDescription;
  transactions[index].amount = newAmount;
  saveToLocalStorage(transactions);
  viewTransactions();
}

function applyFilter() {
  const filterByType = document.getElementById("filterByType").value;
  const amountFrom = parseFloat(document.getElementById("amountFrom").value);
  const amountTo = parseFloat(document.getElementById("amountTo").value);
  const filterCurrency = document.getElementById("filterCurrency").value;

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (filterByType === "all" ||
        transaction.transactionType === filterByType) &&
      (isNaN(amountFrom) || transaction.amount > amountFrom) &&
      (isNaN(amountTo) || transaction.amount < amountTo) &&
      (filterCurrency === "all" || transaction.currency === filterCurrency)
    );
  });

  filteredTransactionsJson = JSON.stringify(filteredTransactions);
  console.log(filteredTransactionsJson);
  transactionsContainer.innerHTML = "";

  filteredTransactions.forEach((filteredTransaction, index) => {
    transactionItemJson = document.createElement("div");

    transactionItemJson.innerHTML = `  <div>${filteredTransaction.description}</div>
      <div>${filteredTransaction.amount}</div>
      <div>${filteredTransaction.transactionType}</div>
      <div>${filteredTransaction.currency}</div>
      <button onclick="editTransaction(${index})">Edit</button>
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;

    transactionsContainer.appendChild(transactionItemJson);
  });
}

function saveToLocalStorage(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getFromLocalStorage() {
  const transactionsJson = localStorage.getItem("transactions");
  if (transactionsJson) {
    return JSON.parse(transactionsJson);
  } else {
    return [];
  }
}

function fetchCurrencies() {
  fetch("https://crowded-cyan-wildebeest.cyclic.app/students/available", {
    method: "GET",
  })
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      const selectCurrency = document.getElementById("currency");
      const currencyFrom=document.getElementById("currencyFrom");
      const currencyTo=document.getElementById("currencyTo");
      selectCurrency.innerHTML = "";
      currencyFrom.innerHTML="";
      currencyTo.innerHTML="";

      data.forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        
        option1.value = currency.code;
        option1.textContent = currency.code;
        option2.value = currency.code;
        option2.textContent = currency.code;
        option3.value = currency.code;
        option3.textContent = currency.code;

        selectCurrency.appendChild(option1);
        currencyFrom.appendChild(option2);
        currencyTo.appendChild(option3);
      });
    });
}

function convertCurrency(fromCurrency, toCurrency, amount) {
  const data = {
    from: fromCurrency,
    to: toCurrency,
    amount: amount,
  };
  
  fetch("https://crowded-cyan-wildebeest.cyclic.app/students/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
convertCurrency("USD", "LBP", 100);

createTransactionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const transactionType = document.getElementById("transactionType").value;
  const currency = document.getElementById("currency").value;

  createTransaction(description, amount, transactionType, currency);
  createTransactionForm.reset();
});

applyFilters.addEventListener("click", function () {
  applyFilter();
});

fetchCurrencies();
