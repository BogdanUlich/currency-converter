import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resourceLimits } from 'worker_threads'
import { RootState } from '..'
import { ConverterData, IConverterResult, IConverterSliceState } from '../../types'

export const convertCurrency = createAsyncThunk<IConverterResult, ConverterData>(
  'converter/currencyConvert',
  async (data) => {
    let headers = new Headers()
    headers.append('apikey', 'YwPp31W76McBsbQPbiSyaHThkuwzYgXb')

    const requestOptions: any = {
      method: 'GET',
      redirect: 'follow',
      headers,
    }

    try {
      const response = await fetch(
        `https://api.apilayer.com/fixer/convert?to=${data.currencyTo}&from=${data.currencyFrom}&amount=${data.amount}`,
        requestOptions
      )
      const result = await response.json()

      return result
    } catch (e) {
      console.log(e)
    }
  }
)

const initialState: IConverterSliceState = {
  converterValue: null,
  rate: null,
  amount: '',
  currencyFrom: '',
  currencyTo: '',
  loading: 'success',
}

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    saveConvertData: (state, action: PayloadAction<ConverterData>) => {
      state.amount = action.payload.amount
      state.currencyFrom = action.payload.currencyFrom
      state.currencyTo = action.payload.currencyTo
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertCurrency.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.converterValue = action.payload.result
          state.rate = action.payload.info.rate
          state.loading = 'success'
        } else {
          state.loading = 'error'
        }
      })
      .addCase(convertCurrency.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(convertCurrency.rejected, (state) => {
        state.loading = 'error'
      })
  },
})

export const { saveConvertData } = converterSlice.actions

export const converterSelector = (state: RootState) => state.converter

export default converterSlice.reducer
