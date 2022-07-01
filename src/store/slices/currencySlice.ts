import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { BaseCurrency, CurrencySliceState, ExchangeRatesAction } from '../../types'

export const fetchExchangeRates = createAsyncThunk<any, ExchangeRatesAction>(
  'currency/fetchExchangeRates',
  async (fetchInfo) => {
    let headers = new Headers()
    headers.append('apikey', 'YwPp31W76McBsbQPbiSyaHThkuwzYgXb')

    const requestOptions: any = {
      method: 'GET',
      redirect: 'follow',
      headers,
    }

    const response = await fetch(
      `https://api.apilayer.com/fixer/latest&base=${fetchInfo.baseCurrency}&date=${fetchInfo.currentDate}`,
      requestOptions
    )

    const result = await response.json()

    return result.rates
  }
)

const initialState: CurrencySliceState = {
  baseCurrency: 'USD',
  currencies: [],
  loading: 'pending',
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<BaseCurrency>) => {
      state.baseCurrency = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        const arr = Object.entries(action.payload)
        state.currencies = arr
        state.loading = 'success'
      })
      .addCase(fetchExchangeRates.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchExchangeRates.rejected, (state) => {
        state.loading = 'error'
      })
  },
})

export const { setBaseCurrency } = currencySlice.actions

export const currencySelector = (state: RootState) => state.currency

export default currencySlice.reducer
