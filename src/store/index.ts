import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/auth/auth.reducer'
import { transactionReducers } from './reducers/transaction/transaction.reducer'

export const store = configureStore({
    reducer: {
        auth: authReducers,
        transaction: transactionReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch