# 🏦FinanceHub - Investment & Finance Platform

FinanceHub is a browser-based personal finance and investment toolkit built with HTML, CSS, and Vanilla JavaScript. It combines multiple financial calculators into one clean web interface, including tools for compound interest, Hong Kong bank rates, currency exchange, loans, savings, and expenses.

> **Start file:** `Register-Login.html`  
> **Alternative dashboard:** `nav.html`

> No installation, package manager, or build step is required. Just download the project files and open the main HTML page.

## 🚀 Download & Quick Start

### Download the project
You can get the source files from GitHub:

- **Repository:** [yeaka2/IT-1030-Project](https://github.com/yeaka2/IT-1030-Project)
- **Browse files online:** [Project files](https://github.com/yeaka2/IT-1030-Project/tree/main)
- **Download ZIP:** [main.zip](https://github.com/yeaka2/IT-1030-Project/archive/refs/heads/main.zip)

Or clone it with Git:

```bash
git clone https://github.com/yeaka2/IT-1030-Project.git
cd IT-1030-Project
```

### Run the project
You can launch the app in any of the following ways:

#### Option 1: Open directly in your browser
- Open `Register-Login.html` to start from the login/register screen
- Or open `nav.html` to go directly to the main dashboard

#### Option 2: Use Visual Studio Code Live Server
- Open the project folder in Visual Studio Code
- Right-click `Register-Login.html`
- Select **Open with Live Server**

#### Option 3: Run with a local server
A local server is recommended, especially for features that call external APIs.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/Register-Login.html
```

You can also open:

```text
http://localhost:8000/nav.html
```

### Requirements
- A modern web browser
- Internet access for live exchange-rate data and HKMA rate refresh

---

## ✨ Overview

This project is designed to help users quickly perform common financial calculations and visualize the results through charts, tables, and summary panels.

### Main capabilities
- 🔐 Login / Register user interface
- 📈 Compound interest calculation
- 🏦 Hong Kong Best Lending Rate calculation
- 💱 Currency exchange conversion
- 🏠 Loan repayment and amortization analysis
- 💰 Savings growth estimation
- 🧾 Expense tracking and visualization

---

## 🧩 Features

### 1. 🔐 Login / Register
A simple banking-style entry page with:
- Username field
- Password field
- Status display

> Note: In the provided files, this page functions as a front-end UI screen only.

### 2. 📈 Compound Interest Calculator
This module allows users to:
- Enter principal amount
- Enter investment time in years
- Enter annual interest rate
- Calculate the final total

It also includes:
- Compound interest growth chart
- Simple vs. compound interest comparison chart

### 3. 🏦 Hong Kong Interest Rate Calculator
This module is tailored to Hong Kong bank rates and supports:
- Principal amount input
- Investment period input
- Best Lending Rate input
- Refreshing the latest rate
- Multiple compounding frequencies:
  - Annual
  - Semi-annual
  - Quarterly
  - Monthly
  - Daily

Displayed results include:
- Principal amount
- Total interest earned
- Final amount
- Effective annual rate
- Profit margin
- Growth chart over time

### 4. 💱 Currency Exchange Calculator
This module supports:
- Selecting source currency
- Entering an amount
- Selecting target currency
- Viewing the exchange rate
- Calculating converted amount

It also includes charts for:
- Exchange rate comparison
- Top currencies
- Conversion analysis

### 5. 🏠 Loan Calculator
This module provides:
- Loan amount input
- Loan term in years
- Annual interest rate input

Outputs include:
- Monthly payment
- Total interest
- Total payment

Additional analysis features:
- Remaining balance by year chart
- Principal vs. interest chart
- Cumulative paid by year chart
- Monthly amortization schedule
- Loan bill summary modal

### 6. 💰 Savings Calculator
This tool estimates future savings using:
- Initial balance
- Monthly deposit
- Annual interest rate
- Time in years

It calculates projected savings based on compound growth logic.

### 7. 🧾 Expense Calculator
This tool estimates total expenses across the selected period using monthly spending in categories such as:
- Household
- Transport
- Food & Beverage
- Financial
- Family
- Shopping
- Lifestyle
- Personal Care
- Others

It also provides:
- Spending distribution chart
- Category breakdown chart

---

## 🛠️ Tech Stack

- **HTML5** for structure
- **CSS3** for layout, styling, and responsiveness
- **Vanilla JavaScript** for logic and interactions
- **Chart.js** for charts and visualizations
- **External APIs** for live financial data

---

## 📁 Project Structure

```text
.
├── Register-Login.html
├── nav.html
├── navstyle.css
├── navactions.js
├── style.css
├── compound-interest-calculator.html
├── compound-interest-calculator.js
├── interest-rate-calculator.html
├── interest-rate-calculator.css
├── interest-rate-calculator.js
├── exchange-calculator.html
├── exchange-calculator.css
├── exchange-calculator.js
├── loan.html
├── loan.css
├── loan.js
├── saving.html
├── savings.js
├── expense.html
└── expense.js
```

---

## 📐 Module Details

### Compound Interest Calculator
Calculates final value using annual compounding.

**Formula:**
```text
A = P × (1 + r)^t
```

Where:
- `A` = final amount
- `P` = principal
- `r` = annual interest rate
- `t` = time in years

### Hong Kong Interest Rate Calculator
Calculates compound interest using selectable compounding frequency.

**Formula:**
```text
A = P × (1 + r / n)^(n × t)
```

Where:
- `A` = final amount
- `P` = principal
- `r` = annual rate
- `n` = compounding frequency
- `t` = time in years

### Savings Calculator
The savings logic:
- Compounds the initial balance monthly
- Adds the future value of recurring monthly deposits

This makes it suitable for long-term savings planning.

### Loan Calculator
Uses a standard fixed-rate amortization model with monthly payments.

Outputs include:
- Monthly repayment
- Total interest paid
- Total amount paid over the loan term
- Full monthly amortization table

### Expense Calculator
The total expense is based on:

```text
(sum of all monthly categories) × 12 × years
```

This helps estimate multi-year spending.

### Currency Exchange Calculator
The app:
- Fetches exchange rates
- Computes the rate between two selected currencies
- Converts the entered amount

Basic conversion logic:

```text
Converted Amount = Amount × Exchange Rate
```

---

## 🧭 Navigation Flow

1. Open the login page or main dashboard
2. Select a financial tool
3. Enter the required values
4. Click **Calculate** or **Convert**
5. Review the numeric output, charts, and tables

---

## 🌐 External Data Sources

### 1. ExchangeRate-API
Used by the currency exchange calculator to retrieve live conversion rates.

### 2. Hong Kong Monetary Authority (HKMA) API
Used by the Hong Kong interest rate calculator to retrieve the latest Best Lending Rate.

---

## 📝 Notes

- This project appears to be a front-end web application.
- No backend, database, or server-side authentication logic is included in the provided files.
- The login/register page currently behaves as a UI screen rather than a complete authentication system.
- Internet access is required for live exchange-rate data and HKMA rate refresh.
- Some pages include UI sections that can be expanded further with additional logic.

---

## 💡 Possible Improvements

- Add real user authentication and session management
- Store user calculation history
- Add backend support for secure data handling
- Move API credentials to a secure environment
- Improve error handling and validation across all tools
- Expand the savings page with full chart and summary logic
- Add test coverage and deployment instructions
- Improve accessibility and mobile responsiveness further

---

## 🙏 Acknowledgements

- Hong Kong Monetary Authority (HKMA)
- ExchangeRate-API
- This project is made by:
- ZHU Jinze (Most contributions, Core member)
- WEI Boyuan (Core member)
- LIAO Junming (Group leader, Core member)
- XIE Zhiyuan (Core member)
- LUO Wenqi
- CHAN Wing Yiu
- GAN Lu
- LUO Zhenyu

---

## 🙏 Dear Dr.Ndudi Ezeamuzie:

- Thank you, teacher, for teaching us a new programming language, JavaScript. It enables us to learn to think logically about how to solve some problems in our social life, thus turning some difficult things into something new.

---

## 📄 License

No license file was included in the provided source set.  
If needed, add a license such as MIT before publishing.
