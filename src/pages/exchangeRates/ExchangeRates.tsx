import { useEffect } from 'react'
import { Currency, Loader, Select } from '../../components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { currencySelector, fetchExchangeRates } from '../../store/slices/currencySlice'

const ExchangeRates = () => {
    const dispatch = useAppDispatch()
    const { baseCurrency, currencies, loading } = useAppSelector(currencySelector)

    const date: number = Date.now()

    const formatDate = (date: number) => (date < 10 ? `0${date}` : date.toString())

    const getDateString = (timestamp: number) => {
        const date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${year}-${formatDate(month)}-${formatDate(day)}`
    }

    const currentDate = getDateString(date)

    useEffect(() => {
        dispatch(fetchExchangeRates({ currentDate, baseCurrency }))
    }, [baseCurrency])

    return (
        <div className="exchange-rates">
            <div className="exchange-rates__container container">
                <h1 className="exchange-rates__title title">Exchange rates</h1>

                <div className="exchange-rates__body">
                    <div className="exchange-rates__list">
                        {currencies.map((arr) => (
                            <Currency currency={arr[0]} rate={arr[1]} key={arr[0]} />
                        ))}
                    </div>

                    <Select />
                </div>
            </div>
            {loading === 'pending' ? <Loader /> : ''}
        </div>
    )
}

export default ExchangeRates
