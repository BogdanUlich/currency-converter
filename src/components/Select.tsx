import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { currencySelector, setBaseCurrency } from '../store/slices/currencySlice'
import arrowDown from '../assets/icons/arrow-down.svg'
import { BaseCurrency } from '../types'

const Select: FC = () => {
    const dispatch = useAppDispatch()
    const { baseCurrency } = useAppSelector(currencySelector)

    const [baseCurrensies] = useState<BaseCurrency[]>(['USD', 'UAH', 'EUR', 'GBP'])
    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)

    const sortRef = useRef<HTMLHeadingElement>(null)

    const onSelectItem = (currency: BaseCurrency) => {
        dispatch(setBaseCurrency(currency))
        setVisiblePopup(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', closePopup)

        return () => document.body.removeEventListener('click', closePopup)
    }, [])

    const closePopup = (event: any) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false)
        }
    }

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup)
    }

    return (
        <div className="select-wrapper">
            <div className="select">
                <div className="select__label" ref={sortRef} onClick={toggleVisiblePopup}>
                    Base currency:
                    <span>{baseCurrency}</span>
                    <img src={arrowDown} className={classNames('select__icon', visiblePopup ? 'open' : '')} />
                </div>
                {visiblePopup && (
                    <ul className="select__popup">
                        {baseCurrensies.map((currency) => (
                            <li
                                className={classNames('select__link', currency === baseCurrency ? 'active' : '')}
                                key={`${currency}`}
                                onClick={() => onSelectItem(currency)}
                            >
                                {currency}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Select
