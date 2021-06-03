import { createSlice } from '@reduxjs/toolkit'
import { showError } from './visual'

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        code: "OK",
    },
    reducers: {
        setStatus: (state, action) => {
            state.code = action.payload.code
        },
    }
})

export const setStatus = (code) => {
    if (code !== "OK") {
        showError()
    }

    return {
        type: "SET_STATUS",
        payload: {
            code: code
        }
    }
}

export default statusSlice.reducer
