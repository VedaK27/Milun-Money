import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import budgetReducer from "./slices/budgetSlice.js";
import expenseReducer from "./slices/expenseSlice.js";
import groupExpensesReducer from "./slices/groupExpensesSlice.js";
import paymentReducer from "./slices/paymentSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    expenses: expenseReducer,
    groupExpenses: groupExpensesReducer,
    payment: paymentReducer,
  },
});

export default store;
