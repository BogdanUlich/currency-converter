import { createSlice } from '@reduxjs/toolkit'

interface initialState {}

const initialState: initialState = {}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
})

export default currencySlice.reducer
