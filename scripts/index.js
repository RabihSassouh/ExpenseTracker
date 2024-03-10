let transactions = [];
const transactionsContainer = document.getElementById("transactions-container");
const createTransactionForm = document.getElementById("add-transaction-form");
const applyFilters=document.getElementById("applyFilter");

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

function createTransaction(description, amount,transactionType,currency) {
  const newTransaction = { description, amount,transactionType,currency };
  transactions.push(newTransaction);
  // console.log("test");
  viewTransactions();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  viewTransactions();
}

function editTransaction(index) {
  const newDescription = prompt("Enter new description:");
  const newAmount = parseFloat(prompt("enter new amount:"));
  transactions[index].description = newDescription;
  transactions[index].amount = newAmount;
  viewTransactions();
}

function applyFilter(){
    const filterByType=document.getElementById("filterByType").value;
    const amountFrom=parseFloat(document.getElementById("amountFrom").value);
    const amountTo=parseFloat(document.getElementById("amountTo").value);
    const filterCurrency=document.getElementById("filterCurrency").value;

    const filteredTransactions= transactions.filter(transaction =>{
        for (let i=0;i<transactions.length;i++){
        return (transaction.transactionType===filterByType) && (transaction.amount>amountFrom)
        && (transaction.amount<amountTo) && (transaction.currency===filterCurrency);
        }
    })
    console.log(filterByType);
    console.log(amountFrom);
    console.log(amountTo);
    console.log(filterCurrency);
    console.log(filteredTransactions);
    viewTransactions(filteredTransactions);
}

createTransactionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const transactionType=document.getElementById("transactionType").value;
  const currency=document.getElementById("currency").value;
  createTransaction(description, amount,transactionType,currency);
  createTransactionForm.reset();
});

applyFilters.addEventListener("click",function(){
    applyFilter();
})