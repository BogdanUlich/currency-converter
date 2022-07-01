import { FC } from 'react'

type CurrencyProps = {
    currency: string
    rate: number
}

const Currency: FC<CurrencyProps> = ({ currency, rate }) => {
    return (
        <div className="currency">
            <div className="currency__name">{currency}</div>
            <div className="currency__rate">{rate}</div>
        </div>
    )
}

export default Currency
