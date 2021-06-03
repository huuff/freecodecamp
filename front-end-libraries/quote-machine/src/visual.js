/* I feel like there's something wrong to needing state for managing animations and effects
 * but I don't find a better way of doing it */
import { createSlice } from '@reduxjs/toolkit'
import store from './store'

export const visualSlice = createSlice({
    name: 'visual',
    initialState: {
        showQuote: false,
        showError: false
    },
    reducers: {
        setShowQuote: (state, action) => {
            state.showQuote = action.payload
        },
        setShowError: (state, action) => {
            state.showError = action.payload
        }
    }
})

export default visualSlice.reducer

export function showError() {
    store.dispatch(visualSlice.actions.setShowError(true))
    setTimeout(() => store.dispatch(visualSlice.actions.setShowError(false)), 5000)
}

export function showQuote() {
    store.dispatch(visualSlice.actions.setShowQuote(false))
    setTimeout(() => store.dispatch(visualSlice.actions.setShowQuote(true)), 1000)
}
