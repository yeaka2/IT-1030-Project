'use strict';

let balanceChart = null;
let pieChart = null;
let cumulativeChart = null;

document.querySelector('.btn1').addEventListener('click', function () {
    const thePrin = Number(document.querySelector('.input1').value) || 0;
    const theTime = Number(document.querySelector('.input2').value) || 0;
    const theRate = Number(document.querySelector('.input3').value) / 100 || 0;

    const result = calculateLoan(thePrin, theRate, theTime);

    document.querySelector('.output-monthly').value = money(result.monthlyPayment);
    document.querySelector('.output-interest').value = money(result.totalInterest);
    document.querySelector('.output-total').value = money(result.totalPayment);

    updateBalanceChart(result.yearlyLabels, result.yearlyBalances);
    updatePieChart(thePrin, result.totalInterest);
    updateCumulativeChart(result.yearlyLabels, result.yearlyCumPrincipal, result.yearlyCumInterest);
    updateAmortTable(result.schedule);

    // add account
        const billData = {
        "Loan Amount": money(thePrin),
        "Term (years)": theTime,
        "Annual Rate": (theRate * 100).toFixed(2) + "%",
        "Monthly Payment": money(result.monthlyPayment),
        "Total Interest": money(result.totalInterest),
        "Total Payment": money(result.totalPayment)
    };
        showLoanBill(billData); 
});

// Auto-calc on load (same behavior as your existing page) [2]
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn1').click();
});

document.querySelector('.btn2').addEventListener('click', function () {
    document.location.href = 'nav.html';
    history.back();
});

function money(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
}

/**
 * Fixed-rate amortizing loan with monthly payments.
 * Inputs:
 *  - principal: loan amount
 *  - annualRate: decimal (e.g., 0.05)
 *  - years: number of years
 */
function calculateLoan(principal, annualRate, years) {
    const months = Math.round(years * 12);
    const r = annualRate / 12;

    if (principal <= 0 || months <= 0) {
        return {
            monthlyPayment: 0,
            totalInterest: 0,
            totalPayment: 0,
            schedule: [],
            yearlyLabels: ['0 yr'],
            yearlyBalances: [principal],
            yearlyCumPrincipal: [0],
            yearlyCumInterest: [0]
        };
    }

    const monthlyPayment =
        r === 0
            ? principal / months
            : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

    let balance = principal;
    let cumInterest = 0;
    let cumPrincipal = 0;
    const schedule = [];

    for (let m = 1; m <= months; m++) {
        const interest = balance * r;
        let principalPaid = monthlyPayment - interest;

        // last-payment / float guard
        if (m === months || principalPaid > balance) principalPaid = balance;

        balance = balance - principalPaid;
        if (balance < 1e-8) balance = 0;

        cumInterest += interest;
        cumPrincipal += principalPaid;

        schedule.push({
            month: m,
            payment: principalPaid + interest,
            principal: principalPaid,
            interest: interest,
            balance: balance,
            cumPrincipal: cumPrincipal,
            cumInterest: cumInterest
        });
    }

    const totalInterest = cumInterest;
    const totalPayment = principal + totalInterest;

    // Sample once per year for charts (similar “year labels” approach) [2]
    const yearsForChart = Math.ceil(months / 12);
    const yearlyLabels = ['0 yr'];
    const yearlyBalances = [principal];
    const yearlyCumPrincipal = [0];
    const yearlyCumInterest = [0];

    for (let y = 1; y <= yearsForChart; y++) {
        const idx = Math.min(y * 12, schedule.length) - 1;
        const row = schedule[idx];

        yearlyLabels.push(`${y} yr`);
        yearlyBalances.push(row.balance);
        yearlyCumPrincipal.push(row.cumPrincipal);
        yearlyCumInterest.push(row.cumInterest);
    }

    return {
        monthlyPayment,
        totalInterest,
        totalPayment,
        schedule,
        yearlyLabels,
        yearlyBalances,
        yearlyCumPrincipal,
        yearlyCumInterest
    };
}

// Chart 1: Remaining balance
function updateBalanceChart(labels, data) {
    if (balanceChart) balanceChart.destroy();

    const ctx = document.getElementById('balanceChart').getContext('2d');
    balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Balance ($)',
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

// Chart 2: Principal vs Interest
function updatePieChart(principal, interest) {
    if (pieChart) pieChart.destroy();

    const ctx = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal.toFixed(2), interest.toFixed(2)],
                backgroundColor: ['rgb(173, 196, 255)', 'rgb(200, 210, 255)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            layout: { padding: { top: 10, bottom: 10 } },
            plugins: { legend: { labels: { font: { size: 14 } }, onClick: null } }
        }
    });
}

// Chart 3: Cumulative paid (principal vs interest)
function updateCumulativeChart(labels, principalData, interestData) {
    if (cumulativeChart) cumulativeChart.destroy();

    const ctx = document.getElementById('cumulativeChart').getContext('2d');
    cumulativeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Principal paid',
                    data: principalData,
                    borderColor: 'rgb(173, 196, 255)',
                    fill: false
                },
                {
                    label: 'Interest paid',
                    data: interestData,
                    borderColor: 'rgb(200, 210, 255)',
                    borderDash: [5, 5],
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

// Table: amortization schedule
function updateAmortTable(schedule) {
    const tbody = document.getElementById('amortBody');
    tbody.innerHTML = '';

    const frag = document.createDocumentFragment();

    for (let i = 0; i < schedule.length; i++) {
        const row = schedule[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.month}</td>
            <td>${money(row.payment)}</td>
            <td>${money(row.principal)}</td>
            <td>${money(row.interest)}</td>
            <td>${money(row.balance)}</td>
        `;
        frag.appendChild(tr);
    }

    tbody.appendChild(frag);
}


function showLoanBill(loanData) {
  const modal = document.getElementById('billModal');
  const content = document.getElementById('billContent');
  const overlay = document.querySelector('.overlay');
  const modalContent = document.querySelector('.modal-content');

  content.innerHTML = '';

  for (const key in loanData) {
    if (loanData.hasOwnProperty(key)) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${key}:</strong> ${loanData[key]}`;
      content.appendChild(p);
    }
  }
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden'); 
  modalContent.classList.remove('hidden');

  document.querySelector('.close-btn').onclick = function() {
    modal.classList.add('hidden'); 
    overlay.classList.add('hidden'); 
    modalContent.classList.add('hidden');
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
      modalContent.classList.add('hidden');
    }
  }
}