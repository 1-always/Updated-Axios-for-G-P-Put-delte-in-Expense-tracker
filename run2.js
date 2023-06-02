// Retrieve existing expenses from the API
let expenses = [];

function getExpenses() {
axios.get("https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense")
.then((res) => {
    expenses = res.data;
    updateExpenseList();
})
.catch((error) => {
    console.log("Error fetching expenses:", error);
});
}

// Function to add an expense
function addExpense() {
// Get expense details from the form
const expenseDate = document.getElementById('expense-date').value;
const expenseCategory = document.getElementById('expense-category').value;
const expenseAmount = document.getElementById('expense-amount').value;
const expenseDescription = document.getElementById('expense-description').value;

// Create a new expense object
const newExpense = {
date: expenseDate,
category: expenseCategory,
amount: expenseAmount,
description: expenseDescription
};

// Save the new expense to the API
axios.post("https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense", newExpense)
.then((res) => {
    expenses.push(res.data);
    updateExpenseList();
    clearFormFields();
})
.catch((err) => {
    console.log("Error adding expense:", err);
});
}

// Function to update an expense
function updateExpense(expenseId) {
const expenseIndex = expenses.findIndex(expense => expense._id === expenseId);

if (expenseIndex !== -1) {
const updatedExpense = {
    date: document.getElementById('expense-date').value,
    category: document.getElementById('expense-category').value,
    amount: document.getElementById('expense-amount').value,
    description: document.getElementById('expense-description').value
};

// Update the expense in the API
axios.put(`https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense/${expenseId}`, updatedExpense)
    .then((res) => {
    expenses[expenseIndex] = res.data;
    updateExpenseList();
    clearFormFields();
    resetAddButton();
    })
    .catch((err) => {
    console.log("Error updating expense:", err);
    });
}
}

// Function to delete an expense
function deleteExpense(expenseId) {
axios.delete(`https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense/${expenseId}`)
.then(() => {
    expenses = expenses.filter(expense => expense._id !== expenseId);
    updateExpenseList();
})
.catch((err) => {
    console.log("Error deleting expense:", err);
});
}

// Function to update the expense list display
function updateExpenseList() {
const expenseList = document.getElementById('expense-list');
expenseList.innerHTML = '';

expenses.forEach(expense => {
const expenseItem = document.createElement('li');
expenseItem.innerHTML = `
    <div>Date: ${expense.date}</div>
    <div>Category: ${expense.category}</div>
    <div>Amount: ${expense.amount}</div>
    <div>Description: ${expense.description}</div>
    <button onclick="editExpense('${expense._id}')">Edit</button>
    <button onclick="deleteExpense('${expense._id}')">Delete</button>
`;
expenseList.appendChild(expenseItem);
});
}

// Function to edit an expense
function editExpense(expenseId) {
const expenseIndex = expenses.findIndex(expense => expense._id === expenseId);

if (expenseIndex !== -1) {
const expense = expenses[expenseIndex];

// Populate the form with the expense details
document.getElementById('expense-date').value = expense.date;
document.getElementById('expense-category').value = expense.category;
document.getElementById('expense-amount').value = expense.amount;
document.getElementById('expense-description').value = expense.description;

// Change the add button to an update button
const addButton = document.getElementById('add-button');
addButton.innerText = 'Update Expense';
addButton.onclick = function () {
    updateExpense(expenseId);
};
}
}

// Function to clear the form fields
function clearFormFields() {
document.getElementById('expense-date').value = '';
document.getElementById('expense-category').value = '';
document.getElementById('expense-amount').value = '';
document.getElementById('expense-description').value = '';
}

// Function to reset the add button
function resetAddButton() {
const addButton = document.getElementById('add-button');
addButton.innerText = 'Add Expense';
addButton.onclick = addExpense;
}

// Display the initial expense list
getExpenses();
