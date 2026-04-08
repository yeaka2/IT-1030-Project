// Handle feature item clicks for navigation
const features = document.querySelectorAll('.feature-item');
const links = [
    'compound-interest-calculator.html',  // Compound Interest
    'exchange-calculator.html',           // Exchange Rate
    'loan.html',                          // Loan
    'saving.html',                        // Savings
    'expense.html'                        // Expense
];

features.forEach((feature, index) => {
    feature.addEventListener('click', function(){
        if (links[index]) {
            document.location.href = links[index];
        }







        
    });
});


