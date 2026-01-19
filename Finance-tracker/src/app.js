document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");

    if (!user) {
        window.location.href = "login.html";
        return;
    }
});

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
      <span>- R${exp.amount}</span>
    `;

    expenseList.appendChild(li);
  });
}
renderExpenses();
updateDashboard();

const incomeCard = document.getElementById("incomeCard");
const expenseCard = document.getElementById("expenseCard");

incomeCard.addEventListener("click", function () {
    openModal(
        "Income Sources",
        incomes.map(inc => ({
            label: inc.source,
            amount: inc.amount
        })),
        "income"
    );
});


expenseCard.addEventListener("click", function () {
    openModal(
        "Expense History",
        expenses.map(exp => ({
            label: `${exp.name} (${exp.category})`,
            amount: exp.amount
        })),
        "expense"
    );
});


function openModal(title, items, type) {
    document.getElementById("modalTitle").textContent = title;

    const list = document.getElementById("modalList");
    list.innerHTML = "";

    if (items.length === 0) {
        list.innerHTML = `
          <li class="list-group-item text-center text-muted">
            No data available
          </li>`;
        return;
    }

    items.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const sign = type === "income" ? "+" : "−";
        const colorClass = type === "income" ? "text-success" : "text-danger";

        li.innerHTML = `
            <span>${item.label}</span>
            <strong class="${colorClass}">
              ${sign} R${item.amount}
            </strong>
        `;

        list.appendChild(li);
    });

    const modal = new bootstrap.Modal(
        document.getElementById("detailsModal")
    );
    modal.show();
}

let user = localStorage.getItem("loggedInUser");
let incomeKey = `income_${user}`;
let expenseKey = `expenses_${user}`;

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
incomes = JSON.parse(localStorage.getItem(incomeKey)) || [];
expenses = JSON.parse(localStorage.getItem(expenseKey)) || [];