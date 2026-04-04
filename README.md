# FinanceHub (IT-1030-Project)

**FinanceHub** is a comprehensive Investment & Finance Management Platform designed to help users calculate, track, and manage their personal finances [17]. It offers a suite of interactive calculators for loans, savings, expenses, and currency exchange, complete with dynamic visual charts.

## 🌟 Features

The platform includes several modular financial tools:

*   **Compound Interest Calculator** (`compound-interest-calculator.html`): Calculates compound interest over time and visualizes principal versus interest growth using interactive line and doughnut charts [1, 2].
*   **Savings Calculator** (`saving.html`): Computes future savings based on an initial balance, monthly deposits, and annual interest rates. It focuses solely on deposit growth over time [21, 22, 23].
*   **Expense Calculator** (`expense.html`): Calculates total outlay over time based on monthly expenses across categories such as Household, Transport, Food & Beverage, and Lifestyle. Includes category breakdown charts [7, 8, 21].
*   **Loan Calculator** (`loan.html`): Computes fixed-rate amortizing loans to determine monthly payments, total interest, and total payment. It features a detailed monthly amortization schedule and generates a formatted "Loan Bill" [13, 14].
*   **Currency Exchange Calculator** (`exchange-calculator.html`): Provides real-time currency conversions using the ExchangeRate-API. It features a conversion analysis chart and an exchange rate comparison for top currencies [4, 5].
*   **Hong Kong Bank Interest Rate Calculator** (`interest-rate-calculator.html`): Fetches the latest Best Lending Rate live from the Hong Kong Monetary Authority (HKMA) API to calculate exact investment returns and profit margins [10, 11].
*   **Virtual Bank Login ** (`Register-Login.html`): A secure login and registration interface [20, 27].

## 🛠️ Technologies Used

*   **Frontend**: HTML5, CSS3, and Vanilla JavaScript.
*   **Data Visualization**: **Chart.js** is utilized across the platform to render dynamic line charts, pie/doughnut charts, and bar charts for visual financial analysis [2, 5, 8, 11, 14].
*   **External APIs**: 
    *   `ExchangeRate-API` for fetching real-time global currency rates [5].
    *   `HKMA API` for retrieving the latest Hong Kong Best Lending Rates [11].

## 🚀 How to Use

1. Clone or download the repository to your local machine.
2. No backend server or build process is required for the core calculators.
3. Open `nav.html` in your web browser to access the main navigation dashboard [17].
4. Click on any of the feature cards (Compound Interest, Exchange Rate, Loan, Savings, Expense, or Profile) to launch the respective tool.

*Note: The Currency Exchange and Hong Kong Bank Interest Rate calculators require an active internet connection to fetch real-time data from their respective APIs [5, 11].*
