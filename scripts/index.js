let transactions = [];
const transactionsContainer = document.getElementById("transactions-container");
const createTransactionForm = document.getElementById("add-transaction-form");
const applyFilters = document.getElementById("applyFilter");
const convertCurrencyForm = document.getElementById("convert-form");

function viewTransactions() {
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const transactionItem = document.createElement("div");
    transactionItem.innerHTML = `<div class="container4">
        <div>Description: ${transaction.description}</div>
        <div>Amount: ${transaction.amount}</div>
        <div>Transaction type: ${transaction.transactionType}</div>
        <div>Currency: ${transaction.currency}</div>
        <button onclick="editTransaction(${index})">Edit</button>
        <button onclick="deleteTransaction(${index})">Delete</button>
        </div>
      `;
    transactionsContainer.appendChild(transactionItem);
  });
}

function createTransaction(description, amount, transactionType, currency) {
  const newTransaction = { description, amount, transactionType, currency };
  transactions.push(newTransaction);
  viewTransactions();
  saveToLocalStorage(transactions);
  displayTotalBalance();
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

    transactionItemJson.innerHTML = `  <div class="container4">
    <div>Description: ${filteredTransaction.description}</div>
      <div>Amount: ${filteredTransaction.amount}</div>
      <div>Transaction type: ${filteredTransaction.transactionType}</div>
      <div>Currency: ${filteredTransaction.currency}</div>
      <button onclick="editTransaction(${index})">Edit</button>
      <button onclick="deleteTransaction(${index})">Delete</button>
      </div>
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
  fetch("https://rich-erin-angler-hem.cyclic.app/students/available", {
    method: "GET",
  })
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      const selectCurrency = document.getElementById("currency");
      const currencyFrom = document.getElementById("currencyFrom");
      const currencyTo = document.getElementById("currencyTo");
      selectCurrency.innerHTML = "";
      currencyFrom.innerHTML = "";
      currencyTo.innerHTML = "";

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

  fetch("https://rich-erin-angler-hem.cyclic.app/students/convert", {
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

function displayTotalBalance() {
  let totalBalanceUSD = 0;

  transactions.forEach((transaction) => {
    if (transaction.currency !== "USD") {
      let amountUSD = convertCurrency(
        transaction.currency,
        "USD",
        transaction.amount
      );
      if (transaction.transactionType === "income") {
        totalBalanceUSD += amountUSD;
      } else if (transaction.transactionType === "expense") {
        totalBalanceUSD -= amountUSD;
      }
    } else {
      if (transaction.transactionType === "income") {
        totalBalanceUSD += transaction.amount;
      } else if (transaction.transactionType === "expense") {
        totalBalanceUSD -= transaction.amount;
      }
    }
  });

  const totalBalance = document.getElementById("totalBalance");
  totalBalance.textContent = totalBalanceUSD.toFixed(2);
}

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

convertCurrencyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const fromCurrency = document.getElementById("currencyFrom").value;
  const toCurrency = document.getElementById("currencyTo").value;
  const amount = parseFloat(document.getElementById("amountToConvert").value);
  convertCurrency(fromCurrency, toCurrency, amount);
});
