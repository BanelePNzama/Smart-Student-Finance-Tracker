const MONTHLY_BUDGET = 5000;
let incomeForm = document.getElementById("incomeForm");
let expenseForm = document.getElementById("expenseForm");

let totalIncomeEl = document.getElementById("totalIncome");
let totalExpensesEl = document.getElementById("totalExpenses");
let balanceEl = document.getElementById("balance");
let expenseList = document.getElementById("expenseList");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
incomeForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let source = document.getElementById("incomeSource").value;
  let amount = Number(document.getElementById("incomeAmount").value);

  const income = {
    id: Date.now(),
    source,
    amount
  };

  incomes.push(income);
  saveData();
  updateDashboard();
  incomeForm.reset();
});
expenseForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("expenseName").value;
  let category = document.getElementById("expenseCategory").value;
  let amount = Number(document.getElementById("expenseAmount").value);

  const expense = {
    id: Date.now(),
    name,
    category,
    amount
  };

  expenses.push(expense);
  saveData();
  renderExpenses();
  updateDashboard();
  expenseForm.reset();
});
function saveData() {
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
function updateDashboard() {
  let totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  let totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  let balance = totalIncome - totalExpenses;

  totalIncomeEl.textContent = "R" + totalIncome;
  totalExpensesEl.textContent = "R" + totalExpenses;
  balanceEl.textContent = "R" + balance;
}
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(exp => {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
      ${exp.name} (${exp.category})
      <span>R${exp.amount}</span>
    `;

    expenseList.appendChild(li);
  });
}
renderExpenses();
updateDashboard();
