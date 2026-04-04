'use strict'

let compoundChart = null;
let comparisonChart = null;

document.querySelector('.btn1').addEventListener('click',function(){
    const thePrin = Number(document.querySelector('.input1').value) || 0;
    const theTime = Number(document.querySelector('.input2').value) || 0;
    const theRate = Number(document.querySelector('.input3').value) / 100 || 0;

    const total = thePrin * Math.pow(1 + theRate, theTime);
    const interest = total - thePrin;
    document.querySelector('.output').value = Math.round(total*100)/100;

    updateCompoundChart(thePrin, theRate, theTime);
    updateComparisonChart(thePrin, theRate, theTime);
});

// Auto-click the calculate button on page load to display the initial chart
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn1').click();
});



// updateCompoundChart
function updateCompoundChart(principal, rate, years) {
    const labels = [];
    const data = [];
    for (let y = 0; y <= years; y++) {
        labels.push(y + '(years)');
        data.push(principal * Math.pow(1 + rate, y));
    }
    if (compoundChart) {
        compoundChart.destroy();
    }
    const ctx = document.getElementById('compoundChart').getContext('2d');
    compoundChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '($)',
                data: data,
                borderColor: 'rgb(173, 196, 255)',
                backgroundColor: 'rgba(173, 196, 255, 0.15)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } },
            plugins: { legend: { labels: { font: { size: 14 } }, onClick: null } },
            scales: {
                y: { beginAtZero: true, ticks: { font: { size: 12 } } },
                x: { ticks: { font: { size: 12 } } }
            }
        }
    });
}

// Update Comparison Chart: Simple Interest vs Compound Interest
function updateComparisonChart(principal, rate, years) {
    if (comparisonChart) comparisonChart.destroy();
    const labels = [];
    const compoundData = [];
    const simpleData = [];
    for (let y = 0; y <= years; y++) {
        labels.push(y + ' yr');
        compoundData.push(principal * Math.pow(1 + rate, y));
        simpleData.push(principal + principal * rate * y);
    }
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Compound',
                    data: compoundData,
                    borderColor: 'rgb(173, 196, 255)',
                    fill: false
                },
                {
                    label: 'Simple',
                    data: simpleData,
                    borderColor: 'rgb(200, 210, 255)',
                    borderDash: [5,5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } },
            plugins: { legend: { labels: { font: { size: 14 } }, onClick: null } },
            scales: {
                y: { beginAtZero: true, ticks: { font: { size: 12 } } },
                x: { ticks: { font: { size: 12 } } }
            }
        }
    });
}
