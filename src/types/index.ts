export type ConverterData = {
  amount: string
  currencyFrom: string
  currencyTo: string
}
export type ExchangeRatesAction = {
  currentDate: string
  baseCurrency: BaseCurrency
}

export interface ConverterSliceState {
  converterValue: number | null
  rate: number | null
  amount: string
  currencyFrom: string
  currencyTo: string
  loading: 'success' | 'pending' | 'error'
}

export interface CurrencySliceState {
  baseCurrency: BaseCurrency
  currencies: any[]
  loading: 'success' | 'pending' | 'error'
}

export type BaseCurrency = 'USD' | 'UAH' | 'EUR' | 'GBP'
