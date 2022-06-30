import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { ConverterData, ConverterSliceState } from '../../types'

export const convertCurrency = createAsyncThunk<any, ConverterData>('converter/currencyConvert', async (data) => {
  let headers = new Headers()
  headers.append('apikey', 'DUXMb54S3Z9OFeNCYsaE3yVbnOeLBFi3')

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
  } catch {
    alert('Произошла ошибка')
  }
})

const initialState: ConverterSliceState = {
  converterValue: null,
  rate: null,
  loading: 'success',
}

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(convertCurrency.fulfilled, (state, action) => {
        if (action.payload.info?.rate) {
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

export const converterSelector = (state: RootState) => state.converter

export default converterSlice.reducer
