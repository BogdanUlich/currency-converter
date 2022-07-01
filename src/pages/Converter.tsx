import { ChangeEvent, useState } from 'react'
import Loader from '../components/Loader'
import { useAppDispatch, useAppSelector } from '../hooks'
import { convertCurrency, converterSelector, saveConvertData } from '../store/slices/converterSlice'
import { ConverterData } from '../types'

const Converter = () => {
    const dispatch = useAppDispatch()

    const { converterValue, rate, loading, amount, currencyFrom, currencyTo } = useAppSelector(converterSelector)

    const [converterData, setConverterData] = useState<ConverterData>({
        amount: '',
        currencyFrom: '',
        currencyTo: '',
    })

    const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setConverterData({
            ...converterData,
            amount: e.target.value,
        })
    }
    const onChangeCurrencyFrom = (e: ChangeEvent<HTMLInputElement>) => {
        setConverterData({
            ...converterData,
            currencyFrom: e.target.value,
        })
    }
    const onChangeCurrencyTo = (e: ChangeEvent<HTMLInputElement>) => {
        setConverterData({
            ...converterData,
            currencyTo: e.target.value,
        })
    }
    const onConvert = () => {
        if (converterData.amount && converterData.currencyFrom && converterData.currencyTo) {
            dispatch(saveConvertData(converterData))
            dispatch(convertCurrency(converterData))
        } else {
        }
    }

    return (
        <div className="converter">
            <div className="converter__container container">
                <h1 className="title">Currency converter</h1>

                <div className="input-group">
                    <label className="input-group__wrapper">
                        <span className="input-group__description">Amount</span>
                        <input
                            className="input-group__amount input"
                            type="number"
                            placeholder="100"
                            value={converterData.amount}
                            onChange={(e) => onChangeAmount(e)}
                        />
                    </label>

                    <label className="input-group__wrapper">
                        <span className="input-group__description">Currency</span>
                        <input
                            className="input"
                            type="text"
                            placeholder="USD"
                            value={converterData.currencyFrom}
                            onChange={(e) => onChangeCurrencyFrom(e)}
                            maxLength={3}
                        />
                    </label>

                    <span className="input-group__text">in</span>

                    <label className="input-group__wrapper">
                        <span className="input-group__description">Currency</span>
                        <input
                            type="text"
                            className="input"
                            placeholder="UAH"
                            value={converterData.currencyTo}
                            onChange={(e) => onChangeCurrencyTo(e)}
                            maxLength={3}
                        />
                    </label>

                    <button className="btn" onClick={onConvert}>
                        Convert
                    </button>
                </div>

                <div className="converter__result">
                    {converterValue
                        ? `${amount} ${currencyFrom.toUpperCase()} = ${converterValue.toFixed(
                              2
                          )} ${currencyTo.toUpperCase()} (Rate: ${rate?.toFixed(2)})`
                        : ''}
                    {loading === 'error' ? 'An error has occurred, please try again' : ''}
                </div>
            </div>
            {loading === 'pending' ? <Loader /> : ''}
        </div>
    )
}

export default Converter
