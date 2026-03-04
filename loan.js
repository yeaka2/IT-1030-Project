document.getElementById('calculateLoan').addEventListener('mouseup', function () {

    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let annualRate = parseFloat(document.getElementById('interestRate').value);
    let years = parseFloat(document.getElementById('loanYears').value);

    if (isNaN(loanAmount) || isNaN(annualRate) || isNaN(years) ||
        loanAmount <= 0 || annualRate <= 0 || years <= 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    let monthlyRate = annualRate / 100 / 12;
    let numberOfPayments = years * 12;

    // Standard amortized loan formula
    let monthlyPayment = 
        loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    let totalPayment = monthlyPayment * numberOfPayments;
    let totalInterest = totalPayment - loanAmount;

    document.getElementById('monthlyPayment').innerText = monthlyPayment.toFixed(2);
    document.getElementById('totalPayment').innerText = totalPayment.toFixed(2);
    document.getElementById('totalInterest').innerText = totalInterest.toFixed(2);
});