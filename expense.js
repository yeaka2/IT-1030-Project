'use strict';

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
        categories.forEach(cat => {
            const val = Number(document.querySelector(`.expense.${cat}`).value) || 0;
            monthlyTotal += val;
        });

        const total = monthlyTotal * 12 * years;
        document.querySelector('.output').value = Math.round(total * 100) / 100;
    });
} else {
    console.warn('Expense button (.calc-expense) not found');
}