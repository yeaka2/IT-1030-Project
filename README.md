FinanceHub (IT-1030-Project)
FinanceHub is a comprehensive Investment & Finance Management Platform designed to help users calculate, track, and manage their personal finances smartly 
nav.html
. It offers a suite of interactive calculators for loans, savings, expenses, and currency exchange, complete with dynamic visual charts.

🌟 Features
The platform includes several modular financial tools:

Compound Interest Calculator (compound-interest-calculator.html): Calculates compound interest over time and visualizes principal versus interest growth using interactive line and doughnut charts 
compound-intere...lator.html +1
 .
Savings Calculator (saving.html): Computes future savings based on an initial balance, monthly deposits, and annual interest rates. It focuses solely on deposit growth over time 
README.md +2
 .
Expense Calculator (expense.html): Calculates total outlay over time based on monthly expenses across categories such as Household, Transport, Food & Beverage, and Lifestyle. Includes category breakdown charts 
expense.html +2
 .
Loan Calculator (loan.html): Computes fixed-rate amortizing loans to determine monthly payments, total interest, and total payment. It features a detailed monthly amortization schedule and generates a formatted "Loan Bill" 
loan.html +1
 .
Currency Exchange Calculator (exchange-calculator.html): Provides real-time currency conversions using the ExchangeRate-API. It features a conversion analysis chart and an exchange rate comparison for top currencies 
exchange-calculator.html +1
 .
Hong Kong Bank Interest Rate Calculator (interest-rate-calculator.html): Fetches the latest Best Lending Rate live from the Hong Kong Monetary Authority (HKMA) API to calculate exact investment returns and profit margins 
interest-rate-calculator.html +1
 .
Virtual Bank Login (zhu_IT1030.html): A secure login and registration interface for accessing user profiles 
Personal.html +2
 .
🛠️ Technologies Used
Frontend: HTML5, CSS3, and Vanilla JavaScript 
exchange-calculator.css +3
 .
Data Visualization: Chart.js is heavily utilized across the platform to render dynamic line charts, pie/doughnut charts, and bar charts for visual financial analysis 
compound-intere...culator.js +4
 .
External APIs:
ExchangeRate-API for fetching real-time global currency rates 
exchange-calculator.js
.
HKMA API for retrieving the latest Hong Kong Best Lending Rates 
interest-rate-calculator.js
.
🚀 How to Use
Clone or download the repository to your local machine.
No backend server or build process is required for the core calculators.
Open nav.html in your web browser to access the main navigation dashboard 
nav.html
.
Click on any of the feature cards (Compound Interest, Exchange Rate, Loan, Savings, Expense, or Profile) to launch the respective tool 
nav.html +1
 .
Note: The Currency Exchange and Hong Kong Bank Interest Rate calculators require an active internet connection to fetch real-time data from their respective APIs [5, 11].
