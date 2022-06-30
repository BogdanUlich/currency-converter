import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
    let location = useLocation()

    return (
        <div className="header">
            <div className="header__container container">
                <Link className={classNames('header__link', location.pathname === '/' ? 'active' : '')} to="/">
                    Converter
                </Link>
                <Link
                    className={classNames('header__link', location.pathname === '/exchange-rates' ? 'active' : '')}
                    to="/exchange-rates"
                >
                    Exchange Rates
                </Link>
            </div>
        </div>
    )
}

export default Header
