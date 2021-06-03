import { createSlice } from '@reduxjs/toolkit'

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

export const { setStatus } = statusSlice.actions
export default statusSlice.reducer
