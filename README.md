# 📊 Montly: Personal Finance Assessment

A comprehensive, responsive financial dashboard built to demonstrate clean state management, intuitive UX, and professional data visualization. This project was developed as a technical assessment to showcase modern frontend engineering patterns.

## 🚀 Live Demo
**[(https://finance-dashboard-five-iota.vercel.app/)]**

---

## 🛠️ Tech Stack & Architecture
* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS (with dynamic theme variables)
* **Icons:** Lucide-React
* **Data Visualization:** Recharts
* **State Management:** `useContext` + `useReducer` (Global State Pattern)
* **Persistence:** LocalStorage

---

## ✨ Key Features

### 1. Dashboard & Insights
* **Dynamic Summary Cards:** Real-time calculation of **Total Balance, Income, Expenses, and Savings Rate** with month-over-month trend indicators.
* **Interactive Trend Chart:** A toggleable line chart allowing users to switch between **Balance, Income, and Expense** views.
* **Spending Breakdown:** A Donut chart with an interactive legend showing both absolute currency values (₹) and percentage distribution.
* **Smart Observations:** Automated data analysis identifying spending spikes, savings benchmarks, and income-vs-expense alerts.

### 2. Transaction Management
* **Advanced Filtering:** Multi-layered filtering by **Category**, **Transaction Type** (Income/Expense), and **Month**.
* **Instant Search:** Zero-latency search by description—updates as you type.
* **Data Grid:** Features include **Sortable Headers** (Date & Amount), and clean pagination.

### 3. Role-Based UI (RBAC Simulation)
* **Live Role Switcher:** A toggle at the profile allows for instant switching between **Viewer** and **Admin** roles.
* **Dynamic Permissions:** * **Viewer:** Read-only access; management actions (Add/Edit/Delete) are hidden.
    * **Admin:** Full CRUD capabilities unlocked. Includes a modal-based "Add Transaction" flow and row-level editing.

---

## 🧠 Design Decisions & Logic

### State Management Strategy
I implemented **React's Native `useReducer` + `Context API`** instead of external libraries like Redux. This demonstrates an ability to manage complex global state (Transactions, Filters, Roles) using core React patterns, keeping the bundle size small and the architecture scalable.

### Responsive UX & Interaction
* **Mobile-First Approach:** The sidebar collapses into a hamburger menu, and the header features a "Smart Scroll" behavior (hiding on scroll-down, appearing on scroll-up).
* **Adaptive Layout:** On mobile, the Data transforms into a vertical  list to ensure readability.
* **Animations:** Subtle "Zoom on Hover" effects on key text and "Scale on Click" interactions for buttons to provide tactile feedback.

### Professional Polish
* **Optimistic Updates & Persistence:** All Admin actions update the UI immediately and are persisted via `localStorage` so they survive a page refresh.
* **Data Utilities:** Centralized logic for clean Currency (₹) and Date formatting across the entire application.

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YA-Sowmya/finance-dashboard]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 📝 Assessment Requirements Checklist
- [x] **Summary Cards** with trend indicators
- [x] **Time-based toggleable chart** (Balance/Income/Expense)
- [x] **Donut chart** with detailed legend
- [x] **Filterable/Sortable** Transaction list (Date & Amount)
- [x] **Role Switcher** (Viewer vs Admin)
- [x] **CRUD Operations** (Add, Edit, Delete)
- [x] **Automated Insights** & Observations
- [x] **Responsive Design** (Mobile View)
- [x] **Data Persistence** (LocalStorage)
- [x] **Bonus:** CSV Export functionality
- [x] **Bonus:** Dark Mode support

---
