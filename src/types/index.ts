export type ConverterData = {
  amount: string
  currencyFrom: string
  currencyTo: string
}
export type ExchangeRatesAction = {
  currentDate: string
  baseCurrency: BaseCurrency
}

export interface IExchangeRates {
  [key: string]: number
}

export interface IConverterResult {
  date: string
  info: { timestamp: number; rate: number }
  query: { from: string; to: string; amount: number }
  result: number
  success: boolean
}

export interface IConverterSliceState {
  converterValue: number | null
  rate: number | null
  amount: string
  currencyFrom: string
  currencyTo: string
  loading: 'success' | 'pending' | 'error'
}

export interface ICurrencySliceState {
  baseCurrency: BaseCurrency
  currencies: any[]
  loading: 'success' | 'pending' | 'error'
}

export type BaseCurrency = 'USD' | 'UAH' | 'EUR' | 'GBP'
