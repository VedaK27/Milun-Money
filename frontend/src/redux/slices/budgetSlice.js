import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    budgets: [],
    loading: false,
    error: null,
};

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        fetchBudgetsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBudgetsSuccess: (state, action) => {
            state.loading = false;
            state.budgets = action.payload;
        },
        fetchBudgetsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addBudget: (state, action) => {
            state.budgets.push(action.payload);
        },
        updateBudget: (state, action) => {
            const index = state.budgets.findIndex(budget => budget.id === action.payload.id);
            if (index !== -1) {
                state.budgets[index] = action.payload;
            }
        },
        deleteBudget: (state, action) => {
            state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
        },
    },
});