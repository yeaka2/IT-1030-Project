// Handle feature item clicks for navigation
const features = document.querySelectorAll('.feature-item');
const links = [
    'compound-interest-calculator.html',  
    'exchange-calculator.html',           
    'loan.html',                         
    'saving.html',                      
    'expense.html',                      
    'Personal.html'                      
];

features.forEach((feature, index) => {
    feature.addEventListener('click', function(){
        if (links[index]) {
            document.location.href = links[index];
        }
    });
});


