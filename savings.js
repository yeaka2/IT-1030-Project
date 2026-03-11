'use strict';


const btn = document.querySelector('.calc-savings');
if (btn) {
    btn.addEventListener('click', function () {
        const P = Number(document.querySelector('.initial').value) || 0;
    const monthly = Number(document.querySelector('.monthly').value) || 0;
    const r = (Number(document.querySelector('.rate').value) || 0) / 100;
    const years = Number(document.querySelector('.years').value) || 0;

    if (years < 0) {
        alert('Please enter a non-negative number of years.');
        return;
    }
    
    const months = years * 12;
    const monthlyRate = r / 12;

    // initial principal compounded monthly
    const FVprincipal = P * Math.pow(1 + monthlyRate, months);
    let FVdeposits = 0;

    // Monthly deposits compounded monthly
    if (monthlyRate !== 0) {
        FVdeposits = monthly *
            (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    } else {
        FVdeposits = monthly * months;
    }

    const total = FVprincipal + FVdeposits;

    document.querySelector('.output').value =
        Math.round(total * 100) / 100;
    });
} else {
    console.warn('Savings button (.calc-savings) not found on the page.');
}