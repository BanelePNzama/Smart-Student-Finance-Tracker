function getChartData() {
    const categories = {};

    expenses.forEach(exp => {
        categories[exp.category] =
            (categories[exp.category] || 0) + exp.amount;
    });

    return {
        labels: Object.keys(categories),
        data: Object.values(categories)
    };
}

const ctx = document.getElementById("expenseChart").getContext("2d");

const chartData = getChartData();

const expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: chartData.labels,
        datasets: [{
            data: chartData.data
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});

function updateChart() {
    const newData = getChartData();

    expenseChart.data.labels = newData.labels;
    expenseChart.data.datasets[0].data = newData.data;

    expenseChart.update();
}

const user = localStorage.getItem("loggedInUser");
const expenses = JSON.parse(localStorage.getItem(`expenses_${user}`)) || [];

window.addEventListener("load", () => {
    if (window.expenseChart) {
        window.expenseChart.resize();
    }
});

updateChart();
