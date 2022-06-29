import { configureStore } from '@reduxjs/toolkit'
import currency from './slices/currencySlice'

export const store = configureStore({
  reducer: {
    currency,
  },
})
