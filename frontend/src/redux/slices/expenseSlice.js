import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    expenses: [],
    loading: false,
    error: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        fetchExpensesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchExpensesSuccess: (state, action) => {
            state.loading = false;
            state.expenses = action.payload;
        },
        fetchExpensesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        updateExpense: (state, action) => {
            const index = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        },
    },
});