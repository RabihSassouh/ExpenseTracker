let transactions = [];
const transactionsContainer = document.getElementById("transactions-container");
const createTransactionForm = document.getElementById("add-transaction-form");

function viewTransactions() {
  transactionsContainer.innerHTML = "";

  transactions.forEach((transaction, index) => {
    const transactionItem = document.createElement("div");
    transactionItem.innerHTML = `
        <div>${transaction.description}</div>
        <div>${transaction.amount}</div>
        <button onclick="editTransaction(${index})">Edit</button>
        <button onclick="deleteTransaction(${index})">Delete</button>
      `;
    transactionsContainer.appendChild(transactionItem);
  });
}

function createTransaction(description, amount) {
  const newTransaction = { description, amount };
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

createTransactionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  createTransaction(description, amount);
  createTransactionForm.reset();
});
