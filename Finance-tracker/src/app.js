const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");

const totalIncomeEl = document.getElementById("totalIncome");
const totalExpensesEl = document.getElementById("totalExpenses");
const balanceEl = document.getElementById("balance");
const expenseList = document.getElementById("expenseList");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
incomeForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const source = document.getElementById("incomeSource").value;
  const amount = Number(document.getElementById("incomeAmount").value);

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

  const name = document.getElementById("expenseName").value;
  const category = document.getElementById("expenseCategory").value;
  const amount = Number(document.getElementById("expenseAmount").value);

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
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  totalIncomeEl.textContent = "R" + totalIncome;
  totalExpensesEl.textContent = "R" + totalExpenses;
  balanceEl.textContent = "R" + balance;
}
function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(exp => {
    const li = document.createElement("li");
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
