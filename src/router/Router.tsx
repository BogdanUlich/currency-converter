import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from '../components'
import { Converter, ExchangeRates } from '../pages'

const Router: FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="/" element={<Converter />} />
                <Route path="/exchange-rates" element={<ExchangeRates />} />
            </Routes>
        </div>
    )
}

export default Router
