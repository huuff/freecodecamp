/* I feel like there's something wrong to needing state for managing animations and effects
 * but I don't find a better way of doing it */
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'

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

export const setShowError = createAsyncThunk("visual/setShowErrorTemporarily", async (show = true, thunkAPI) => {
    thunkAPI.dispatch(visualSlice.actions.setShowError(show))
    if (show)
        setTimeout(() => thunkAPI.dispatch(visualSlice.actions.setShowError(false)), ERROR_DURATION)
})

export const setShowQuote = createAsyncThunk("visual/setShowQuoteEffect", async (unused = true, thunkAPI) => {
    thunkAPI.dispatch(visualSlice.actions.setShowQuote(false))
    setTimeout(() => thunkAPI.dispatch(visualSlice.actions.setShowQuote(true)), QUOTE_REFRESH_TIME)
})
