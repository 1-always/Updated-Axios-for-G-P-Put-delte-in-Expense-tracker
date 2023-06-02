// Retrieve existing expenses from local storage or initialize an empty arra

//let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let expenses = [];
function getExpenses(){
axios.get("https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense")
.then((res)=>{
expenses=res.data
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

  // Add the new expense to the expenses array

  // Save the updated expenses array to local storage
  //localStorage.setItem('expenses', JSON.stringify(expenses));
  axios.post("https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense" , newExpense)

  .then((res)=>{
    expenses.push(res.data)
    updateExpenseList()
    document.getElementById('expense-date').value = '';
  document.getElementById('expense-category').value = '';
  document.getElementById('expense-amount').value = '';
  document.getElementById('expense-description').value = '';
    //updateExpenseList(res)
  })
  .catch((err)=>{
    console.log("Error adding expense:", err);

  })
  // Clear the form fields
  // document.getElementById('expense-date').value = '';
  // document.getElementById('expense-category').value = '';
  // document.getElementById('expense-amount').value = '';
  // document.getElementById('expense-description').value = '';

  // Update the expense list display

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
      <button onclick="editExpense(${expense._id})">Edit</button>
      <button onclick="deleteExpense(${expense._id})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}
function updateExpense(expenseId) {
  const expenseIndex = expenses.findIndex(expense => expense._id === expenseId);

    if (expenseIndex !== -1) {
    const updatedExpense = {
      date: document.getElementById('expense-date').value,
      category: document.getElementById('expense-category').value,
      amount: document.getElementById('expense-amount').value,
      description: document.getElementById('expense-description').value
    };

    // Update the expense in the expenses array
    // expenses[expenseIndex] = updatedExpense;

    // Save the updated expenses array to local storage
    //localStorage.setItem('expenses', JSON.stringify(expenses));
    axios.put(`https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense/${expenseId}`, updatedExpense)

    .then((res)=>{
    //const index = expenses.findIndex(expense => expense.id === expenseId);
    //if(index!=-1){
     expenses[expenseIndex] = res.data;
      updateExpenseList();
      document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').value = '';
    //
    const addButton = document.getElementById('add-button');
    addButton.innerText = 'Add Expense';
    addButton.onclick = addExpense;
   // }
      //console.log(res);
    })
    .catch((err)=>
    console.log(err));
    // Clear the form fields
    // document.getElementById('expense-date').value = '';
    // document.getElementById('expense-category').value = '';
    // document.getElementById('expense-amount').value = '';
    // document.getElementById('expense-description').value = '';

    //    // Change the update button back to an add button
    // const addButton = document.getElementById('add-button');
    // addButton.innerText = 'Add Expense';
    // addButton.onclick = addExpense;

    // Update the expense list display
 }
}

// Function to edit an expense
function editExpense(expenseId) {
  const expenseIndex = expenses.findIndex(expense => expense._id === expenseId);
  console.log(expenseIndex)
  if (expenseIndex!==-1) {
    const expense = expenses[expenseIndex];
    //console.log(expense)
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

// Function to update an expense


// Function to delete an expense
function deleteExpense(expenseId) {
  //expenses = expenses.filter(expense => expense.id !== expenseId);
  //console.log(expenses)
  // Save the updated expenses array to local storage
  //localStorage.setItem('expenses', JSON.stringify(expenses));
  axios.delete(`https://crudcrud.com/api/7c7aa12c75c44c018291c832c9c3db00/expense/${expenseId}`)

  .then((res)=>{
  expenses = expenses.filter(expense => expense._id !== expenseId);
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })

  // Update the expense list display
  updateExpenseList();
}

// Display the initial expense list
getExpenses();

