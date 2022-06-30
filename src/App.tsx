import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Converter from './pages/Converter'
import ExchangeRates from './pages/Exchange-rates'

function App() {
    //DUXMb54S3Z9OFeNCYsaE3yVbnOeLBFi3 мой ключ

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

export default App
