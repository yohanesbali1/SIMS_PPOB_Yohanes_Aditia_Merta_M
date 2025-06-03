import { configureStore } from '@reduxjs/toolkit'
import { authReducers } from './reducers/auth/auth.reducer'

export const store = configureStore({
    reducer: {
        auth: authReducers
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch