// ===== AUTH GUARD =====
let user = localStorage.getItem("loggedInUser");
if (!user) {
    window.location.href = "login.html";
}

// ===== USER STORAGE KEYS =====
let incomeKey = `income_${user}`;
let expenseKey = `expenses_${user}`;

// ===== ELEMENTS =====
let incomeForm = document.getElementById("incomeForm");
let expenseForm = document.getElementById("expenseForm");

let totalIncomeEl = document.getElementById("totalIncome");
let totalExpensesEl = document.getElementById("totalExpenses");
let balanceEl = document.getElementById("balance");
let expenseList = document.getElementById("expenseList");

// ===== LOAD USER DATA =====
let incomes = JSON.parse(localStorage.getItem(incomeKey)) || [];
let expenses = JSON.parse(localStorage.getItem(expenseKey)) || [];

// ===== SAVE FUNCTION =====
function saveData() {
    localStorage.setItem(incomeKey, JSON.stringify(incomes));
    localStorage.setItem(expenseKey, JSON.stringify(expenses));
}

// ===== DASHBOARD =====
function updateDashboard() {
    let totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    let totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    let balance = totalIncome - totalExpenses;

    totalIncomeEl.textContent = "R" + totalIncome;
    totalExpensesEl.textContent = "R" + totalExpenses;
    balanceEl.textContent = "R" + balance;
}

// ===== EXPENSE LIST =====
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

// ===== ADD INCOME =====
incomeForm.addEventListener("submit", e => {
    e.preventDefault();

    let source = incomeSource.value;
    let amount = Number(incomeAmount.value);

    incomes.push({ id: Date.now(), source, amount });

    saveData();
    updateDashboard();
    incomeForm.reset();
});

// ===== ADD EXPENSE =====
expenseForm.addEventListener("submit", e => {
    e.preventDefault();

    let name = expenseName.value;
    let category = expenseCategory.value;
    let amount = Number(expenseAmount.value);

    expenses.push({ id: Date.now(), name, category, amount });

    saveData();
    renderExpenses();
    updateDashboard();
    updateChart();   
    expenseForm.reset();
});

// ===== MODALS =====
incomeCard.addEventListener("click", () => {
    openModal(
        "Income Sources",
        incomes.map(i => ({ label: i.source, amount: i.amount })),
        "income"
    );
});

expenseCard.addEventListener("click", () => {
    openModal(
        "Expense History",
        expenses.map(e => ({
            label: `${e.name} (${e.category})`,
            amount: e.amount
        })),
        "expense"
    );
});

function openModal(title, items, type) {
    modalTitle.textContent = title;
    modalList.innerHTML = "";

    if (items.length === 0) {
        modalList.innerHTML = `<li class="list-group-item text-center text-muted">No data</li>`;
    } else {
        items.forEach(item => {
            let li = document.createElement("li");
            let sign = type === "income" ? "+" : "−";
            let color = type === "income" ? "text-success" : "text-danger";

            li.className = "list-group-item d-flex justify-content-between";
            li.innerHTML = `
                <span>${item.label}</span>
                <strong class="${color}">${sign} R${item.amount}</strong>
            `;
            modalList.appendChild(li);
        });
    }

    new bootstrap.Modal(detailsModal).show();
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// ===== INIT =====
renderExpenses();
updateDashboard();
