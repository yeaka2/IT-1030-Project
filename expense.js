'use strict';

let expensePieChart = null;
let expenseBarChart = null;

function generateExpenseCharts(categories, expenseValues) {
    const categoryLabels = [
        'Household', 'Transport', 'Food & Beverage', 'Financial',
        'Family', 'Shopping', 'Lifestyle', 'Personal Care', 'Others'
    ];
    
    const colors = [
        'rgb(173, 196, 255)', 'rgb(150, 175, 255)', 'rgb(100, 150, 255)',
        'rgb(130, 160, 255)', 'rgb(110, 140, 255)', 'rgb(200, 215, 255)',
        'rgb(180, 200, 255)', 'rgb(160, 185, 255)', 'rgb(190, 210, 255)'
    ];
    
    // Pie Chart
    const piCtx = document.getElementById('expensePieChart');
    if (piCtx) {
        if (expensePieChart) {
            expensePieChart.destroy();
        }
        
        expensePieChart = new Chart(piCtx, {
            type: 'doughnut',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: expenseValues,
                    backgroundColor: colors,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11 },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': $' + context.parsed.toLocaleString() + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Bar Chart
    const barCtx = document.getElementById('expenseBarChart');
    if (barCtx) {
        if (expenseBarChart) {
            expenseBarChart.destroy();
        }
        
        expenseBarChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: 'Monthly Expenses ($)',
                    data: expenseValues,
                    backgroundColor: colors,
                    borderColor: 'rgba(173, 196, 255, 0.5)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: { size: 11, weight: 'bold' },
                            padding: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: {
                            color: 'rgba(173, 196, 255, 0.1)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

const btnExp = document.querySelector('.calc-expense');
if (btnExp) {
    btnExp.addEventListener('click', function(e) {
        e.preventDefault();
        const years = Number(document.querySelector('.years').value);

        if (isNaN(years)) {
            alert('Please enter a number of years.');
            return;
        }

        if (years < 0) {
            alert('Please enter a non-negative number of years.');
            return;
        }

        // gather all category inputs by class
        const categories = [
            'household','transport','food','financial','family',
            'shopping','lifestyle','personal','others'
        ];
        let monthlyTotal = 0;
        const monthlyExpenses = [];
        
        categories.forEach(cat => {
            const val = Number(document.querySelector(`.expense.${cat}`).value) || 0;
            monthlyExpenses.push(val);
            monthlyTotal += val;
        });

        const total = monthlyTotal * 12 * years;
        document.querySelector('.output').value = Math.round(total * 100) / 100;
        
        // Show and generate charts
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            generateExpenseCharts(categories, monthlyExpenses);
        }
    });
} else {
    console.warn('Expense button (.calc-expense) not found');
}
