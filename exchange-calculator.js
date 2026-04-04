let exchangeRates = {};

async function fetchExchangeRates() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/0178c98586b4f4fbf9e3c7db/latest/USD');
        
        if (!response.ok) {
            throw new Error('API Request Failed');
        }
        
        const data = await response.json();
        exchangeRates = data.conversion_rates;
        
        populateCurrencyDropdown('.input1'); // From Currency
        populateCurrencyDropdown('.input3'); // To Currency
        console.log('Success! The exchange rate: ', exchangeRates);
        
    } catch (error) {
        console.error('Fail to get the exchange rate: ', error);
        alert('Cannot get the exchange rate, please check your network connection');
    }
}
function populateCurrencyDropdown(selector) {
    const select = document.querySelector(selector);
    const currencies = Object.keys(exchangeRates).sort();
    
    const options = select.querySelectorAll('option');
    options.forEach((opt, index) => {
        if (index > 0) opt.remove();
    });
    
    currencies.forEach(currency => {
        const option = document.createElement('option');
        option.value = currency;
        option.textContent = `${currency}`;
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchExchangeRates();
    
    const fromCurrency = document.querySelector('.input1');
    const toCurrency = document.querySelector('.input3');
    const fromAmount = document.querySelector('.input2');
    
    fromCurrency.addEventListener('change', updateExchangeRate);
    toCurrency.addEventListener('change', updateExchangeRate);
    
    fromAmount.addEventListener('input', convertCurrency);
    
    document.querySelector('.btn1').addEventListener('click', convertCurrency);
});

function updateExchangeRate() {
    const fromCurrency = document.querySelector('.input1').value;
    const toCurrency = document.querySelector('.input3').value;
    
    if (!fromCurrency || !toCurrency) {
        document.querySelector('.input4').value = '';
        return;
    }
    
    const rateFrom = exchangeRates[fromCurrency] || 1;
    const rateTo = exchangeRates[toCurrency] || 1;
    const exchangeRate = (rateTo / rateFrom).toFixed(4);
    
    document.querySelector('.input4').value = exchangeRate;
    
    convertCurrency();
}

function convertCurrency() {
    const fromAmount = parseFloat(document.querySelector('.input2').value);
    const fromCurrency = document.querySelector('.input1').value;
    const toCurrency = document.querySelector('.input3').value;
    const exchangeRate = parseFloat(document.querySelector('.input4').value);
    
    if (isNaN(fromAmount) || fromAmount <= 0) {
        document.querySelector('.output').value = '';
        return;
    }
    
    if (!fromCurrency || !toCurrency) {
        alert('Please Choose Original Currency And Target Currency');
        return;
    }
    

    const convertedAmount = (fromAmount * exchangeRate).toFixed(2);
    document.querySelector('.output').value = convertedAmount;
    
    updateCharts(fromAmount, fromCurrency, toCurrency, convertedAmount);
}


function updateCharts(fromAmount, fromCurrency, toCurrency, convertedAmount) {

    const topCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY'];
    const rates = topCurrencies.map(c => exchangeRates[c] || 0);
    
    const ctx1 = document.getElementById('compoundChart');
    if (ctx1.chart) ctx1.chart.destroy();
    ctx1.chart = new Chart(ctx1.getContext('2d'), {
        type: 'bar',
        data: {
            labels: topCurrencies,
            datasets: [{
                label: 'Exchange Rate to USD',
                data: rates,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    const ctx2 = document.getElementById('comparisonChart');
    if (ctx2.chart) ctx2.chart.destroy();
    ctx2.chart = new Chart(ctx2.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Original (' + fromCurrency + ')', 'Converted (' + toCurrency + ')'],
            datasets: [{
                label: 'Amount',
                data: [fromAmount, parseFloat(convertedAmount)],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.1)',
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
    
    const ctx3 = document.getElementById('pieChart');
    if (ctx3.chart) ctx3.chart.destroy();
    ctx3.chart = new Chart(ctx3.getContext('2d'), {
        type: 'pie',
        data: {
            labels: [fromCurrency + ' Amount', 'Gain/Loss'],
            datasets: [{
                data: [fromAmount, Math.abs(parseFloat(convertedAmount) - fromAmount)],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}
