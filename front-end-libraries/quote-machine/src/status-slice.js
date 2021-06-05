import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { setShowError } from './visual'

export const statusSlice = createSlice({
    name: 'status',
    initialState: {
        code: "OK",
    },
    reducers: {
        setStatus: {
            reducer: (state, action) => {
                state.code = action.payload
            },
            prepate: (code) => {
                return { payload: {code} }
            }
        }
    }
})

export const setStatus = createAsyncThunk("status/setStatusAndError", async (code, thunkAPI) => {
    if (code !== "OK") {
        thunkAPI.dispatch(setShowError())
    }

    thunkAPI.dispatch(statusSlice.actions.setStatus(code))
})

export default statusSlice.reducer
