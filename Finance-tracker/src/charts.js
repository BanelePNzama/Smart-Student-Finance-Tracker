function getChartData() {
    let categories = {};

    expenses.forEach(exp => {
        categories[exp.category] =
            (categories[exp.category] || 0) + exp.amount;
    });

    return {
        labels: Object.keys(categories),
        data: Object.values(categories)
    };
}

let ctx = document.getElementById("expenseChart").getContext("2d");

let chartData = getChartData();

let expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: chartData.labels,
        datasets: [{
            data: chartData.data,
            backgroundColor: [
                "#FF9800", 
                "#21977e", 
                "#0d6efd", 
                "#fff", 
                "#ca569a", 
                "#f05b62", 
                "rgb(202, 4, 202)", 
                "blueviolet"  

            ],
            borderWidth: 1
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
     let newData = getChartData();

    expenseChart.data.labels = newData.labels;
    expenseChart.data.datasets[0].data = newData.data;

    expenseChart.update();
}

updateChart();
