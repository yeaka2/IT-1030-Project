let exchangeRates = {};

// 从API获取汇率数据
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/0178c98586b4f4fbf9e3c7db/latest/USD');
        
        if (!response.ok) {
            throw new Error('API Request Failed');
        }
        
        const data = await response.json();
        exchangeRates = data.conversion_rates;
        
        // 填充两个货币选择下拉框
        populateCurrencyDropdown('.input1'); // From Currency
        populateCurrencyDropdown('.input3'); // To Currency
        console.log('Success! The exchange rate: ', exchangeRates);
        
    } catch (error) {
        console.error('Fail to get the exchange rate: ', error);
        alert('Cannot get the exchange rate, please check your network connection');
    }
}

// 填充货币选择下拉框
function populateCurrencyDropdown(selector) {
    const select = document.querySelector(selector);
    const currencies = Object.keys(exchangeRates).sort();
    
    // 清空现有选项（除了第一个提示选项）
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

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    fetchExchangeRates();
    
    const fromCurrency = document.querySelector('.input1');
    const toCurrency = document.querySelector('.input3');
    const fromAmount = document.querySelector('.input2');
    
    // 当源货币或目标货币改变时，自动计算汇率
    fromCurrency.addEventListener('change', updateExchangeRate);
    toCurrency.addEventListener('change', updateExchangeRate);
    
    // 输入金额时实时转换
    fromAmount.addEventListener('input', convertCurrency);
    
    // 绑定转换按钮
    document.querySelector('.btn1').addEventListener('click', convertCurrency);
});

// 更新汇率显示
function updateExchangeRate() {
    const fromCurrency = document.querySelector('.input1').value;
    const toCurrency = document.querySelector('.input3').value;
    
    if (!fromCurrency || !toCurrency) {
        document.querySelector('.input4').value = '';
        return;
    }
    
    // 计算汇率：目标货币汇率 / 源货币汇率
    const rateFrom = exchangeRates[fromCurrency] || 1;
    const rateTo = exchangeRates[toCurrency] || 1;
    const exchangeRate = (rateTo / rateFrom).toFixed(4);
    
    document.querySelector('.input4').value = exchangeRate;
    
    // 自动转换
    convertCurrency();
}

// 汇率转换函数
function convertCurrency() {
    const fromAmount = parseFloat(document.querySelector('.input2').value);
    const fromCurrency = document.querySelector('.input1').value;
    const toCurrency = document.querySelector('.input3').value;
    const exchangeRate = parseFloat(document.querySelector('.input4').value);
    
    // 验证输入
    if (isNaN(fromAmount) || fromAmount <= 0) {
        document.querySelector('.output').value = '';
        return;
    }
    
    if (!fromCurrency || !toCurrency) {
        alert('请选择源货币和目标货币');
        return;
    }
    
    // 计算转换后的金额
    const convertedAmount = (fromAmount * exchangeRate).toFixed(2);
    document.querySelector('.output').value = convertedAmount;
    
    // 更新图表
    updateCharts(fromAmount, fromCurrency, toCurrency, convertedAmount);
}

// 更新图表
function updateCharts(fromAmount, fromCurrency, toCurrency, convertedAmount) {
    // 图表1：汇率对比（与USD的汇率）
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
    
    // 图表2：转换对比（折线图）
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
    
    // 图表3：饼图
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
