/* I feel like there's something wrong to needing state for managing animations and effects
 * but I don't find a better way of doing it */
import { createSlice } from '@reduxjs/toolkit'
import store from './store'

const ERROR_DURATION = 5000
const QUOTE_REFRESH_TIME = 1000

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

export function setShowError(show = true) {
    store.dispatch(visualSlice.actions.setShowError(show))
    setTimeout(() => store.dispatch(visualSlice.actions.setShowError(false)), ERROR_DURATION)
}

export function showQuote() {
    store.dispatch(visualSlice.actions.setShowQuote(false))
    setTimeout(() => store.dispatch(visualSlice.actions.setShowQuote(true)), QUOTE_REFRESH_TIME)
}
