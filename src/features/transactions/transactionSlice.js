import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTransaction, addTransaction, deleteTransaction, editTransaction } from "./transactionAPI"

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
}




export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransaction();
    return transactions;
})
export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
})
export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({ id, data }) => {
    const transaction = await addTransaction(id, data);
    return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id, data) => {
    const transaction = await addTransaction(id);
    return transaction;
})

// create slice -----------------------------------------


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(fetchTransactions.pending, (state) => {
                    state.isError = false;
                    state.isLoading = true;
                })
                .addCase(fetchTransactions.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.transactions = action.payload
                })
                .addCase(fetchTransactions.rejected, (state, action) => {

                    state.isLoading = false;
                    state.isError = true;
                    state.transactions = [];
                    state.error = action.error?.message
                })
                // create transactions------------------------
                .addCase(createTransaction.pending, (state) => {
                    state.isError = false;
                    state.isLoading = true;
                })
                .addCase(createTransaction.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.transactions.push(action.payload)
                })
                .addCase(createTransaction.rejected, (state, action) => {

                    state.isLoading = false;
                    state.isError = true;
                    state.error = action.error?.message
                })
                // edit transaction --------------
                .addCase(changeTransaction.pending, (state) => {
                    state.isError = false;
                    state.isLoading = true;
                })
                .addCase(changeTransaction.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id)
                    state.transactions[indexToUpdate] = action.payload
                })
                .addCase(changeTransaction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.error = action.error?.message
                })
                // Delete transaction --------------
                .addCase(removeTransaction.pending, (state) => {
                    state.isError = false;
                    state.isLoading = true;
                })
                .addCase(removeTransaction.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.transactions = state.transactions.filter(t => t.id !== action.payload.id)
                })
                .addCase(removeTransaction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.error = action.error?.message
                })
        }
});
export default transactionSlice.reducer;