import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/auth/auth.reducer'
import { transactionReducers } from './reducers/transaction/transaction.reducer'
import { serviceReducers } from './reducers/serives/service.reducer'

export const store = configureStore({
    reducer: {
        auth: authReducers,
        transaction: transactionReducers,
        service: serviceReducers
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch