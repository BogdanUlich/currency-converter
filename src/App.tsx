import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Converter from './pages/Converter'
import ExchangeRates from './pages/Exchange-rates'

function App() {
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
