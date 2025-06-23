import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupExpenses: [],
    loading: false,
    error: null,
};

const groupExpenseSlice = createSlice({
    name: "groupExpense",
    initialState,
    reducers: {
        fetchGroupExpensesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGroupExpensesSuccess: (state, action) => {
            state.loading = false;
            state.groupExpenses = action.payload;
        },
        fetchGroupExpensesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addGroupExpense: (state, action) => {
            state.groupExpenses.push(action.payload);
        },
        updateGroupExpense: (state, action) => {
            const index = state.groupExpenses.findIndex(groupExpense => groupExpense.id === action.payload.id);
            if (index !== -1) {
                state.groupExpenses[index] = action.payload;
            }
        },
        deleteGroupExpense: (state, action) => {
            state.groupExpenses = state.groupExpenses.filter(groupExpense => groupExpense.id !== action.payload);
        },
    },
});