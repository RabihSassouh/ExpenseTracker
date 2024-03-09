let transactions = [];
const transactionsContainer = document.getElementById("transactions-container");
const createTransactionForm = document.getElementById('add-transaction-form');

function createTransaction(description, amount) {
  const newTransaction = { description, amount };
  transactions.push(newTransaction);
  // console.log("test");
  viewTransactions();
}

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

createTransactionForm.addEventListener('submit', function(event) {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  createTransaction(description, amount);
});