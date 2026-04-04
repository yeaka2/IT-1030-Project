// Interest Rate Calculator - Hong Kong Bank Rates

const API_URL = 'https://api.hkma.gov.hk/public/market-data-and-statistics/monthly-statistical-bulletin/er-ir/hkd-ir-effdates';

let chart = null;
let currentRate = null;

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Set default values first
    document.getElementById('displayPrincipal').textContent = 'HKD 100,000.00';
    document.getElementById('totalInterest').textContent = 'HKD 0.00';
    document.getElementById('finalAmount').textContent = 'HKD 0.00';
    document.getElementById('effectiveRate').textContent = '0.00%';
    
    fetchLatestRate();
    document.getElementById('calculateBtn').addEventListener('click', calculateInterest);
    document.getElementById('refreshRateBtn').addEventListener('click', fetchLatestRate);
    
    // Auto-calculate when inputs change
    document.getElementById('principalAmount').addEventListener('change', calculateInterest);
    document.getElementById('investmentPeriod').addEventListener('change', calculateInterest);
    document.getElementById('compoundingFrequency').addEventListener('change', calculateInterest);
    document.getElementById('bestLendingRate').addEventListener('change', calculateInterest);
});

/**
 * Fetch the latest Best Lending Rate from HKMA API
 */
async function fetchLatestRate() {
    console.log('starting to get interest rate data...');
    const refreshBtn = document.getElementById('refreshRateBtn');
    refreshBtn.classList.add('loading');
    refreshBtn.disabled = true;

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Worked:', data);
        
        // Check if the response is successful
        if (data.header.success && data.result.records && data.result.records.length > 0) {
            // Find the first record with a valid best_lending_rate
            for (let record of data.result.records) {
                if (record.best_lending_rate !== null && record.best_lending_rate !== undefined) {
                    currentRate = record.best_lending_rate;
                    const effectDate = new Date(record.effect_date);
                    
                    console.log('Rate found:', currentRate, 'date:', record.effect_date);
                    
                    // Update the UI
                    document.getElementById('bestLendingRate').value = currentRate.toFixed(4);
                    document.getElementById('currentRate').textContent = currentRate.toFixed(4);
                    document.getElementById('rateUpdateInfo').innerHTML = 
                        `<strong>Last Updated:</strong> ${effectDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
                    
                    // Show success message
                    showNotification(`Rate updated successfully: ${currentRate.toFixed(4)}%`, 'success');
                    
                    // Auto-calculate with new rate
                    console.log('caculating...');
                    calculateInterest();
                    break;
                }
            }
        } else {
            throw new Error('No valid rate data found in API response');
        }
    } catch (error) {
        console.error('XXX failed to get rate:', error);
        showNotification(`Error fetching rate: ${error.message}`, 'error');
        
        // Set default rate if fetch fails
        if (!currentRate) {
            currentRate = 5.0; // Default fallback rate
            console.log(' use default rate:', currentRate);
            document.getElementById('bestLendingRate').value = currentRate.toFixed(4);
            document.getElementById('currentRate').textContent = currentRate.toFixed(4);
            document.getElementById('rateUpdateInfo').innerHTML = 
                `<strong>Last Updated:</strong> Using default rate`;
            // Auto-calculate with default rate
            calculateInterest();
        }
    } finally {
        refreshBtn.classList.remove('loading');
        refreshBtn.disabled = false;
    }
}

/**
 * Calculate compound interest
 * Formula: A = P × (1 + r/n)^(n×t)
 */
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principalAmount').value) || 0;
    const years = parseFloat(document.getElementById('investmentPeriod').value) || 0;
    const rate = parseFloat(document.getElementById('bestLendingRate').value) || 0;
    const n = parseInt(document.getElementById('compoundingFrequency').value) || 12;

    console.log('started to calculate:', { principal, years, rate, n });

    // Validate inputs
    if (principal <= 0 || years <= 0 || rate < 0) {
        console.warn('invalid input!Cleared the result');
        clearResults();
        return;
    }

    // Calculate final amount using compound interest formula
    // A = P × (1 + r/(100*n))^(n*t)
    const rateDecimal = rate / 100;
    const finalAmount = principal * Math.pow(1 + rateDecimal / n, n * years);
    const totalInterest = finalAmount - principal;
    
    // Calculate effective annual rate (EAR)
    // EAR = (1 + r/n)^n - 1
    const effectiveAnnualRate = (Math.pow(1 + rateDecimal / n, n) - 1) * 100;
    
    // Calculate profit margin
    const profitMargin = (totalInterest / principal) * 100;

    console.log('Calculate result:', { finalAmount, totalInterest, effectiveAnnualRate, profitMargin });

    // Get compounding frequency text
    const compoundingTexts = {
        '1': 'Annual',
        '2': 'Semi-Annual',
        '4': 'Quarterly',
        '12': 'Monthly',
        '365': 'Daily'
    };
    const compoundingText = compoundingTexts[n] || 'Monthly';

    // Update all output fields
    updateResultFields(principal, totalInterest, finalAmount, effectiveAnnualRate, 
                      years, rate, compoundingText, profitMargin);

    // Update the growth chart
    updateGrowthChart(principal, years, rate, n);
}

/**
 * Update all result display fields
 */
function updateResultFields(principal, totalInterest, finalAmount, effectiveRate, 
                            years, rate, compounding, profitMargin) {
    // Card-style outputs
    document.getElementById('displayPrincipal').textContent = 
        'HKD ' + principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementById('totalInterest').textContent = 
        'HKD ' + totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementById('finalAmount').textContent = 
        'HKD ' + finalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementById('effectiveRate').textContent = 
        effectiveRate.toFixed(4) + '%';

    // Summary section
    document.getElementById('summaryPeriod').textContent = 
        years + (years === 1 ? ' year' : ' years');
    
    document.getElementById('summaryRate').textContent = 
        rate.toFixed(2) + '%';
    
    document.getElementById('summaryCompounding').textContent = 
        compounding;
    
    document.getElementById('profitMargin').textContent = 
        profitMargin.toFixed(2) + '%';

    // Add animation effect
    animateResults();
}

function clearResults() {
    document.getElementById('displayPrincipal').textContent = 'HKD 0.00';
    document.getElementById('totalInterest').textContent = 'HKD 0.00';
    document.getElementById('finalAmount').textContent = 'HKD 0.00';
    document.getElementById('effectiveRate').textContent = '0.00%';
    document.getElementById('summaryPeriod').textContent = '0 years';
    document.getElementById('summaryRate').textContent = '0.00%';
    document.getElementById('profitMargin').textContent = '0.00%';
}

function animateResults() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'resultPulse 0.5s ease-out';
        }, index * 100);
    });
}

/**
 * Update the growth chart showing how investment grows over time
 */
function updateGrowthChart(principal, years, rate, n) {
    const rateDecimal = rate / 100;
    const labels = [];
    const balanceData = [];
    const interestData = [];

    // Generate data points for each year
    const steps = Math.min(Math.ceil(years * 2), 50); // Max 50 points for performance
    const stepSize = years / steps;

    for (let i = 0; i <= steps; i++) {
        const t = i * stepSize;
        const amount = principal * Math.pow(1 + rateDecimal / n, n * t);
        const interest = amount - principal;
        
        labels.push(t.toFixed(1) + 'y');
        balanceData.push(amount);
        interestData.push(interest);
    }

    const ctx = document.getElementById('growthChart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Amount (HKD)',
                    data: balanceData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Interest Earned (HKD)',
                    data: interestData,
                    borderColor: '#f5576c',
                    backgroundColor: 'rgba(245, 87, 108, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: '#f5576c',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    borderColor: '#667eea',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': HKD ' + parseFloat(context.parsed.y).toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                });
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return 'HKD ' + (value / 1000).toFixed(0) + 'k';
                        },
                        font: { size: 11 }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
