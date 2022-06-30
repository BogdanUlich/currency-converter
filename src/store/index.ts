import { configureStore } from '@reduxjs/toolkit'
import currency from './slices/currencySlice'
import converter from './slices/converterSlice'

export const store = configureStore({
  reducer: {
    currency,
    converter,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
